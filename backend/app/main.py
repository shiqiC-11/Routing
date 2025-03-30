from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings
from app.routes.route import router
from app.db.database import engine
from app.db import models
from .routes import route, places

settings = get_settings()

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Backend API for Abstract Route Application with support for waypoints",
)

# Configure CORS
origins = ["*"] if settings.ALLOW_CORS_ALL else settings.CORS_ORIGINS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(router, prefix=settings.API_V1_STR)
app.include_router(places.router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {
        "message": "Welcome to Abstract Route API",
        "docs": "/docs",
        "version": settings.VERSION,
        "endpoints": {
            "routes": f"{settings.API_V1_STR}/routes/",
            "calculate": f"{settings.API_V1_STR}/route/",
            "places": f"{settings.API_V1_STR}/places/"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 