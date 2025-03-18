from typing import List, Tuple, Dict, Any
import httpx
import logging
from app.core.config import get_settings
from app.models.route import Coordinates, Route, RouteError, Waypoint

settings = get_settings()
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)  # Set to DEBUG level

async def get_route(origin: str, destination: str) -> Dict[str, Any]:
    """Get a route from OSRM service."""
    try:
        # Parse coordinates
        origin_lat, origin_lon = map(float, origin.split(','))
        dest_lat, dest_lon = map(float, destination.split(','))

        # Log coordinates for debugging
        logger.debug(f"Calculating route from ({origin_lat}, {origin_lon}) to ({dest_lat}, {dest_lon})")

        # Validate coordinates
        if not (-90 <= origin_lat <= 90 and -180 <= origin_lon <= 180 and
                -90 <= dest_lat <= 90 and -180 <= dest_lon <= 180):
            raise ValueError("Invalid coordinates")

        # Build OSRM request URL - Note: OSRM expects coordinates as lon,lat
        coordinates = f"{origin_lon},{origin_lat};{dest_lon},{dest_lat}"
        url = f"{settings.OSRM_SERVER_URL}/route/v1/driving/{coordinates}"
        params = {
            "overview": "full",
            "geometries": "geojson",
            "steps": "false",
            "alternatives": "false"
        }

        full_url = f"{url}?{'&'.join(f'{k}={v}' for k, v in params.items())}"
        logger.debug(f"Full OSRM request URL: {full_url}")

        async with httpx.AsyncClient(timeout=10.0) as client:
            logger.debug("Sending request to OSRM server...")
            response = await client.get(url, params=params)
            logger.debug(f"OSRM response status: {response.status_code}")
            
            response.raise_for_status()
            data = response.json()

            logger.debug(f"OSRM response code: {data.get('code')}")

            if data.get("code") != "Ok":
                error_msg = f"OSRM error: {data.get('code', 'Unknown error')} - {data.get('message', 'No message')}"
                logger.error(error_msg)
                raise ValueError(error_msg)

            if not data.get("routes") or len(data["routes"]) == 0:
                error_msg = "No route found"
                logger.error(error_msg)
                raise ValueError(error_msg)

            route = data["routes"][0]
            if not route.get("geometry") or not route["geometry"].get("coordinates"):
                error_msg = "Invalid route geometry"
                logger.error(error_msg)
                raise ValueError(error_msg)

            # Convert OSRM coordinates (lon,lat) to our format (lat,lon)
            coordinates = [
                Coordinates(latitude=coord[1], longitude=coord[0])
                for coord in route["geometry"]["coordinates"]
            ]

            if not coordinates:
                error_msg = "No coordinates in route"
                logger.error(error_msg)
                raise ValueError(error_msg)

            result = {
                "route": coordinates,
                "distance": route.get("distance", 0),  # in meters
                "duration": route.get("duration", 0),  # in seconds
            }
            logger.debug(f"Route calculated successfully with {len(coordinates)} points")
            return result

    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise
    except httpx.HTTPStatusError as e:
        error_msg = f"HTTP error {e.response.status_code}: {e.response.text if hasattr(e.response, 'text') else str(e)}"
        logger.error(error_msg)
        raise ValueError(error_msg)
    except httpx.RequestError as e:
        error_msg = f"Request error: {str(e)}"
        logger.error(error_msg)
        raise ValueError(error_msg)
    except Exception as e:
        error_msg = f"Failed to calculate route: {str(e)}"
        logger.error(error_msg)
        raise ValueError(error_msg)

async def get_route_with_waypoints(waypoints: List[Waypoint]) -> Dict[str, Any]:
    """Get a route from OSRM service with multiple waypoints."""
    try:
        # Validate coordinates
        for wp in waypoints:
            lat = wp.coordinates.latitude
            lon = wp.coordinates.longitude
            if not (-90 <= lat <= 90 and -180 <= lon <= 180):
                raise ValueError(f"Invalid coordinates for waypoint: ({lat}, {lon})")

        # Build OSRM request URL - Note: OSRM expects coordinates as lon,lat
        coordinates = ";".join(
            f"{wp.coordinates.longitude},{wp.coordinates.latitude}"
            for wp in waypoints
        )
        
        url = f"{settings.OSRM_SERVER_URL}/route/v1/driving/{coordinates}"
        params = {
            "overview": "full",
            "geometries": "geojson",
            "steps": "false",
            "alternatives": "false"
        }

        full_url = f"{url}?{'&'.join(f'{k}={v}' for k, v in params.items())}"
        logger.debug(f"Full OSRM request URL: {full_url}")

        async with httpx.AsyncClient(timeout=10.0) as client:
            logger.debug("Sending request to OSRM server...")
            response = await client.get(url, params=params)
            logger.debug(f"OSRM response status: {response.status_code}")
            
            response.raise_for_status()
            data = response.json()

            logger.debug(f"OSRM response code: {data.get('code')}")

            if data.get("code") != "Ok":
                error_msg = f"OSRM error: {data.get('code', 'Unknown error')} - {data.get('message', 'No message')}"
                logger.error(error_msg)
                raise ValueError(error_msg)

            if not data.get("routes") or len(data["routes"]) == 0:
                error_msg = "No route found"
                logger.error(error_msg)
                raise ValueError(error_msg)

            route = data["routes"][0]
            if not route.get("geometry") or not route["geometry"].get("coordinates"):
                error_msg = "Invalid route geometry"
                logger.error(error_msg)
                raise ValueError(error_msg)

            # Convert OSRM coordinates (lon,lat) to our format (lat,lon)
            coordinates = [
                Coordinates(latitude=coord[1], longitude=coord[0])
                for coord in route["geometry"]["coordinates"]
            ]

            if not coordinates:
                error_msg = "No coordinates in route"
                logger.error(error_msg)
                raise ValueError(error_msg)

            result = {
                "route": coordinates,
                "distance": route.get("distance", 0),  # in meters
                "duration": route.get("duration", 0),  # in seconds
            }
            logger.debug(f"Route calculated successfully with {len(coordinates)} points")
            return result

    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise
    except httpx.HTTPStatusError as e:
        error_msg = f"HTTP error {e.response.status_code}: {e.response.text if hasattr(e.response, 'text') else str(e)}"
        logger.error(error_msg)
        raise ValueError(error_msg)
    except httpx.RequestError as e:
        error_msg = f"Request error: {str(e)}"
        logger.error(error_msg)
        raise ValueError(error_msg)
    except Exception as e:
        error_msg = f"Failed to calculate route: {str(e)}"
        logger.error(error_msg)
        raise ValueError(error_msg) 