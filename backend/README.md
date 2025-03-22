# Abstract Route Backend

FastAPI backend service for the Abstract Route application. This service provides endpoints for route management and navigation with route abstraction capabilities.

## Features

- Route creation and management with SQLAlchemy
- Pydantic models for data validation
- Support for waypoints in route calculations
- Automatic environment variable loading
- CORS configuration for development and production
- Route abstraction and coordinate processing
- SQLite database integration

## Models

### Core Models
- `Coordinates`: Represents geographical coordinates (latitude, longitude)
- `Waypoint`: Represents a point on the route with coordinates and optional name
- `Route`: Main route model with:
  - Title and description
  - Origin and destination coordinates
  - List of waypoints
  - Calculated route coordinates
  - Distance and duration
  - Creation timestamp

## Setup

1. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration settings.

## Configuration

The application uses environment variables for configuration. Key settings include:

- `DATABASE_URL`: SQLite database URL (default: sqlite:///./app/routes.db)
- `ALLOW_CORS_ALL`: Enable all origins for CORS (development only)
- `CORS_ORIGINS`: List of allowed origins for CORS
- `API_V1_STR`: API version prefix
- `PROJECT_NAME`: Project name
- `VERSION`: API version

## Running the Application

Start the development server:

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, you can access:
- Swagger UI documentation: `http://localhost:8000/docs`
- ReDoc documentation: `http://localhost:8000/redoc`

## API Endpoints

### Routes

#### GET /api/v1/routes/
Get all saved routes

#### GET /api/v1/routes/{route_id}
Get a specific route by ID

#### POST /api/v1/routes/
Create a new route

Request Body:
```json
{
    "title": "string",
    "description": "string",
    "origin": {
        "latitude": float,
        "longitude": float
    },
    "destination": {
        "latitude": float,
        "longitude": float
    },
    "waypoints": [
        {
            "coordinates": {
                "latitude": float,
                "longitude": float
            },
            "name": "string"
        }
    ]
}
```

#### PUT /api/v1/routes/{route_id}
Update an existing route

#### DELETE /api/v1/routes/{route_id}
Delete a route

## Error Handling

The API includes comprehensive error handling for:
- Database operations
- Invalid coordinates or waypoints
- Missing or invalid route data
- Route not found errors
- Validation errors for request data 