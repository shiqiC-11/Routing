from typing import List, Optional
from fastapi import APIRouter, Query, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.route import RouteRequest, AbstractedRoute, RouteError, Route, RouteCreate, Waypoint, Coordinates
from app.db.models import RouteModel
from app.services.route_service import RouteService

router = APIRouter()
route_service = RouteService()

@router.post("/route/calculate/")
async def calculate_route(
    response: Response,
    request: RouteRequest
) -> AbstractedRoute:
    """Calculate a route with waypoints."""
    try:
        # Set response headers for CORS
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"

        result = await route_service.calculate_route(request)
        if isinstance(result, RouteError):
            raise HTTPException(status_code=400, detail=result.details)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/routes/", response_model=Route)
async def create_route_db(route: RouteCreate, db: Session = Depends(get_db)):
    """Save a route to the database."""
    try:
        print("Received route data:", route.dict())
        
        # Extract origin and destination from waypoints if they exist
        if not route.waypoints:
            route.waypoints = []
        
        # Convert waypoints to list of dicts for JSON storage
        waypoints_json = [
            {
                "coordinates": {
                    "latitude": wp.coordinates.latitude,
                    "longitude": wp.coordinates.longitude
                },
                "name": wp.name if wp.name else None
            }
            for wp in route.waypoints
        ]
        print("Converted waypoints:", waypoints_json)

        # Convert route coordinates to list of dicts for JSON storage
        route_json = [
            {
                "latitude": coord.latitude,
                "longitude": coord.longitude
            }
            for coord in route.route
        ]
        print("Converted route:", route_json)

        # Convert origin and destination to dicts for JSON storage
        origin_json = {
            "latitude": route.origin.latitude,
            "longitude": route.origin.longitude
        }
        
        destination_json = {
            "latitude": route.destination.latitude,
            "longitude": route.destination.longitude
        }
        print("Origin:", origin_json)
        print("Destination:", destination_json)

        db_route = RouteModel(
            title=route.title,
            description=route.description,
            origin=origin_json,
            destination=destination_json,
            waypoints=waypoints_json,
            route=route_json,
            distance=route.distance,
            duration=route.duration,
        )
        print("Created RouteModel instance")
        db.add(db_route)
        print("Added to session")
        db.commit()
        print("Committed to database")
        db.refresh(db_route)
        return Route.from_orm(db_route)
    except Exception as e:
        print("Error saving route:", str(e))
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/routes/", response_model=List[Route])
async def list_routes(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """List saved routes."""
    try:
        print("Fetching routes from database...")
        routes = db.query(RouteModel).offset(skip).limit(limit).all()
        print(f"Found {len(routes)} routes")
        
        result = []
        for route in routes:
            try:
                print(f"Converting route {route.id}...")
                print("Route data:", {
                    'id': route.id,
                    'title': route.title,
                    'description': route.description,
                    'origin': route.origin,
                    'destination': route.destination,
                    'waypoints': route.waypoints,
                    'route': route.route,
                    'distance': route.distance,
                    'duration': route.duration,
                    'created_at': route.created_at
                })
                converted_route = Route.from_orm(route)
                result.append(converted_route)
            except Exception as e:
                print(f"Error converting route {route.id}: {str(e)}")
                raise
        
        return result
    except Exception as e:
        print("Error in list_routes:", str(e))
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/routes/{route_id}", response_model=Route)
async def get_route_by_id(route_id: str, db: Session = Depends(get_db)):
    """Get a specific route by ID."""
    route = db.query(RouteModel).filter(RouteModel.id == route_id).first()
    if route is None:
        raise HTTPException(status_code=404, detail="Route not found")
    return Route.from_orm(route)

@router.delete("/routes/{route_id}")
async def delete_route(route_id: str, db: Session = Depends(get_db)):
    """Delete a route by ID."""
    try:
        route = db.query(RouteModel).filter(RouteModel.id == route_id).first()
        if route is None:
            raise HTTPException(status_code=404, detail="Route not found")
        db.delete(route)
        db.commit()
        return {"message": "Route deleted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e)) 