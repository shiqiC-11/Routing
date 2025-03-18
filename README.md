# Abstract Route App

A full-stack route planning application built with React Native and FastAPI. The app allows users to create, save, and manage abstract routes with customizable waypoints.

## Features

- Interactive map interface for route creation and visualization
- Support for both map selection and manual coordinate input
- Route abstraction and optimization
- CRUD operations for routes (Create, Read, Update, Delete)
- Waypoint management with optional naming
- Display route statistics (distance and duration)
- Modern, responsive UI with dark/light mode support
- Persistent storage with SQLite database

## Tech Stack

### Frontend
- React Native with Expo
- TypeScript
- React Navigation
- React Native Maps
- Axios for API communication
- Expo Vector Icons
- Styled Components for styling

### Backend
- FastAPI
- SQLite database
- SQLAlchemy ORM
- Pydantic for data validation
- Route abstraction algorithms
- SQLite for persistent storage

## Prerequisites

- Node.js (v14 or higher)
- Python 3.8 or higher
- Expo CLI
- pip (Python package manager)

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd abstract-route-app/backend
```

2. Create a virtual environment (optional but recommended):
```bash
python -m venv env
source env/bin/activate  # On Windows: .\env\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the backend server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd abstract-route-app/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `config.ts` file in the frontend directory:
```typescript
export const config = {
  API_HOST: 'localhost',  // Use your machine's IP when testing on physical devices
  API_PORT: '8000'
};
```

4. Start the Expo development server:
```bash
npm start
```

## Usage

1. **Creating a Route**
   - Tap the + button to start creating a new route
   - Enter a title and description for your route
   - Choose between map selection or manual input mode
   - Select origin and destination points
   - Add optional waypoints with custom names
   - Save the route

2. **Managing Routes**
   - View all saved routes on the home screen
   - Use the search functionality to filter routes
   - Tap a route to view its details
   - Edit or delete existing routes
   - View route statistics and waypoint information

## API Documentation

The backend API documentation is available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Project Structure

```
abstract-route-app/
├── backend/
│   ├── app/
│   │   ├── core/          # Core configurations
│   │   ├── db/           # Database models and setup
│   │   ├── models/       # Pydantic models
│   │   ├── routes/       # API endpoints
│   │   ├── services/     # Business logic
│   │   └── main.py       # Application entry point
│   ├── tests/           # Backend tests
│   └── requirements.txt
└── frontend/
    ├── components/       # Reusable React components
    ├── screens/         # Screen components
    ├── styles/         # Styling and theme
    ├── services/       # API services
    ├── types/          # TypeScript type definitions
    ├── utils/          # Utility functions
    └── App.tsx         # Root component
```

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 