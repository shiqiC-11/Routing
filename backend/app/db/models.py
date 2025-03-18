from datetime import datetime
from sqlalchemy import Column, String, Float, DateTime, JSON, event
from sqlalchemy.orm import validates
import uuid
from .database import Base
import json

class RouteModel(Base):
    __tablename__ = "routes"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    description = Column(String)
    origin = Column(JSON, nullable=False)  # Origin point coordinates
    destination = Column(JSON, nullable=False)  # Destination point coordinates
    waypoints = Column(JSON, nullable=False, default=list)  # List of intermediate waypoints
    route = Column(JSON, nullable=False)  # List of coordinates forming the route
    distance = Column(Float, nullable=False)
    duration = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    @validates('origin', 'destination')
    def validate_point(self, key, value):
        if isinstance(value, str):
            value = json.loads(value)
        
        if not isinstance(value, dict):
            raise ValueError(f"{key} must be a dictionary")
        
        if 'latitude' not in value or 'longitude' not in value:
            raise ValueError(f"{key} must have latitude and longitude")
        
        return value

    @validates('waypoints')
    def validate_waypoints(self, key, value):
        if value is None:
            return []
            
        if isinstance(value, str):
            value = json.loads(value)
        
        if not isinstance(value, list):
            raise ValueError("Waypoints must be a list")
        
        # Validate each waypoint
        for i, wp in enumerate(value):
            if not isinstance(wp, dict):
                raise ValueError(f"Waypoint at position {i} must be a dictionary")
            
            if 'coordinates' not in wp:
                raise ValueError(f"Waypoint at position {i} missing coordinates")
            
            coords = wp['coordinates']
            if not isinstance(coords, dict) or 'latitude' not in coords or 'longitude' not in coords:
                raise ValueError(f"Waypoint at position {i} has invalid coordinates")
        
        return value 