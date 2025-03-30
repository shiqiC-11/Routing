from fastapi import APIRouter, HTTPException
from typing import List, Optional
import googlemaps
from pydantic import BaseModel, Field
from app.core.config import get_settings

settings = get_settings()
gmaps = googlemaps.Client(key=settings.GOOGLE_MAPS_API_KEY)

router = APIRouter(
    prefix="/places",
    tags=["places"],
)

class PlaceAutocompleteRequest(BaseModel):
    input: str = Field(..., description="The text string on which to search")
    types: Optional[List[str]] = Field(
        default=["geocode", "establishment"],
        description="The types of place results to return"
    )
    region: Optional[str] = Field(
        default=None,
        description="The region code (e.g., 'us' for United States) to bias results"
    )
    language: Optional[str] = Field(
        default=None,
        description="The language code for results"
    )
    location: Optional[dict] = Field(
        default=None,
        description="Location bias coordinates {latitude: number, longitude: number}"
    )

class PlacePrediction(BaseModel):
    place_id: str
    description: str
    main_text: str
    secondary_text: str

class PlaceAutocompleteResponse(BaseModel):
    suggestions: List[PlacePrediction]

class PlaceLocation(BaseModel):
    latitude: float
    longitude: float

class PlaceDetailsResponse(BaseModel):
    name: str
    address: str
    coordinates: PlaceLocation

@router.post("/autocomplete", response_model=PlaceAutocompleteResponse)
async def get_place_suggestions(request: PlaceAutocompleteRequest):
    """
    Get place suggestions using Google Places API.
    This endpoint is used by Android clients only.
    iOS clients use native MapKit directly on the device.
    """
    try:
        # Prepare location bias if provided
        location_bias = None
        if request.location:
            location_bias = {
                "location": (
                    request.location["latitude"],
                    request.location["longitude"]
                ),
                "radius": 50000  # 50km radius
            }

        # Call Google Places API
        predictions = gmaps.places_autocomplete(
            input_text=request.input,
            types=request.types,
            language=request.language or settings.GOOGLE_PLACES_LANGUAGE,
            components={"country": request.region or settings.GOOGLE_PLACES_REGION} if request.region else None,
            location=location_bias["location"] if location_bias else None,
            radius=location_bias["radius"] if location_bias else None
        )
        
        return PlaceAutocompleteResponse(
            suggestions=[
                PlacePrediction(
                    place_id=pred["place_id"],
                    description=pred["description"],
                    main_text=pred["structured_formatting"]["main_text"],
                    secondary_text=pred["structured_formatting"]["secondary_text"]
                )
                for pred in predictions
            ]
        )
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/details/{place_id}", response_model=PlaceDetailsResponse)
async def get_place_details(place_id: str):
    """
    Get detailed information about a place using Google Places API.
    This endpoint is used by Android clients only.
    iOS clients use native MapKit directly on the device.
    """
    try:
        # Get place details from Google Places API
        place = gmaps.place(
            place_id,
            fields=['name', 'formatted_address', 'geometry', 'type']
        )
        
        if not place or 'result' not in place:
            raise HTTPException(status_code=404, detail="Place not found")
            
        result = place['result']
        return PlaceDetailsResponse(
            name=result.get('name', ''),
            address=result.get('formatted_address', ''),
            coordinates=PlaceLocation(
                latitude=result['geometry']['location']['lat'],
                longitude=result['geometry']['location']['lng']
            )
        )
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 