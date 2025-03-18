from typing import List, Dict, Any, Union, Optional
import httpx
import logging
from app.models.route import Coordinates, AbstractedRoute, RouteError, Waypoint, RouteRequest
from app.core.config import get_settings
from app.services.osrm import get_route_with_waypoints

settings = get_settings()
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

class RouteService:
    @staticmethod
    def validate_coordinates(coords: Coordinates) -> bool:
        """Validate coordinates"""
        try:
            lat = coords.latitude
            lon = coords.longitude
            return -90 <= lat <= 90 and -180 <= lon <= 180
        except:
            return False

    @staticmethod
    def validate_waypoint(waypoint: Waypoint) -> bool:
        """Validate waypoint coordinates"""
        try:
            return RouteService.validate_coordinates(waypoint.coordinates)
        except:
            return False

    @staticmethod
    async def calculate_route(request: RouteRequest) -> AbstractedRoute:
        """Calculate route with waypoints"""
        try:
            if len(request.waypoints) < 2:
                raise ValueError("At least two waypoints (origin and destination) are required")

            logger.debug(f"Calculating route with {len(request.waypoints)} waypoints")
            
            # Validate waypoint coordinates
            invalid_waypoints = [wp for wp in request.waypoints if not RouteService.validate_waypoint(wp)]
            if invalid_waypoints:
                raise ValueError(f"Invalid coordinates in waypoints: {[f'({wp.coordinates.latitude}, {wp.coordinates.longitude})' for wp in invalid_waypoints]}")

            # Get route from OSRM service
            route_data = await get_route_with_waypoints(request.waypoints)
            
            # Create and return AbstractedRoute
            return AbstractedRoute(
                route=route_data["route"],
                distance=route_data["distance"],
                duration=route_data["duration"]
            )

        except ValueError as e:
            logger.error(f"Route service error: {str(e)}")
            raise ValueError(str(e))
        except Exception as e:
            logger.error(f"Unexpected error in route service: {str(e)}")
            raise ValueError(f"Route processing failed: {str(e)}") 