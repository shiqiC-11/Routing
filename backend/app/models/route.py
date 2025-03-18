from pydantic import BaseModel, Field, field_validator
from typing import List, Optional, Dict, Any
from datetime import datetime
from uuid import UUID, uuid4

class Coordinates(BaseModel):
    latitude: float
    longitude: float

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Coordinates':
        if isinstance(data, dict):
            return cls(latitude=float(data['latitude']), longitude=float(data['longitude']))
        return data

class Waypoint(BaseModel):
    coordinates: Coordinates
    name: Optional[str] = None

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Waypoint':
        if isinstance(data, dict):
            return cls(
                coordinates=Coordinates.from_dict(data['coordinates']),
                name=data.get('name')
            )
        return data

class RouteRequest(BaseModel):
    waypoints: List[Waypoint] = Field(..., description="List of waypoints including origin and destination")

class AbstractedRoute(BaseModel):
    route: List[Coordinates] = Field(..., description="List of coordinates forming the route")
    distance: float = Field(..., description="Total distance in meters")
    duration: float = Field(..., description="Total duration in seconds")
    created_at: datetime = Field(default_factory=datetime.utcnow)

class RouteError(BaseModel):
    error: str = Field(..., description="Error type or category")
    details: str = Field(..., description="Detailed error message")

class RouteBase(BaseModel):
    title: str
    description: str
    origin: Coordinates
    destination: Coordinates
    waypoints: List[Waypoint] = Field(default_factory=list)
    route: List[Coordinates]
    distance: float
    duration: float

    @field_validator('origin', 'destination', mode='before')
    @classmethod
    def validate_coordinates(cls, v):
        if isinstance(v, dict):
            return Coordinates.from_dict(v)
        return v

    @field_validator('waypoints', mode='before')
    @classmethod
    def validate_waypoints(cls, v):
        if v is None:
            return []
        if isinstance(v, list):
            return [Waypoint.from_dict(wp) for wp in v]
        return v

    @field_validator('route', mode='before')
    @classmethod
    def validate_route(cls, v):
        if isinstance(v, list):
            return [Coordinates.from_dict(coord) for coord in v]
        return v

class RouteCreate(RouteBase):
    pass

class Route(RouteBase):
    id: UUID = Field(default_factory=uuid4)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True 