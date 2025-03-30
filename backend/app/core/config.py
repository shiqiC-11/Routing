from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import List, Optional
import os
from dotenv import load_dotenv

# Load .env file automatically
load_dotenv()

class Settings(BaseSettings):
    # API Configuration
    PROJECT_NAME: str = "Abstract Route API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Google Maps Configuration
    GOOGLE_MAPS_API_KEY: str
    GOOGLE_PLACES_REGION: Optional[str] = "US"  # Default region for Places API
    GOOGLE_PLACES_LANGUAGE: str = "en"  # Default language for Places API

    # Server Configuration
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # CORS Configuration
    CORS_ORIGINS: List[str] = ["*"]
    ALLOW_CORS_ALL: bool = True  # Set to True during development
    ALLOWED_ORIGINS: List[str] = ["*"]

    # Database settings
    DATABASE_URL: str = "sqlite:///./app/routes.db"
    
    # OSRM settings
    OSRM_SERVER_URL: str = "http://router.project-osrm.org"
    OSRM_PROFILE: str = "driving"

    # Apple MapKit Configuration
    APPLE_TEAM_ID: Optional[str] = None
    APPLE_KEY_ID: Optional[str] = None
    APPLE_PRIVATE_KEY: Optional[str] = None

    class Config:
        env_file = ".env"
        case_sensitive = True

    @property
    def is_development(self) -> bool:
        """Check if we're in development mode"""
        return self.ALLOW_CORS_ALL

@lru_cache()
def get_settings() -> Settings:
    """
    Get cached settings instance.
    Uses environment variables and .env file for configuration.
    """
    return Settings() 