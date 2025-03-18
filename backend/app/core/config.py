from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import List
import os
from dotenv import load_dotenv

# Load .env file automatically
load_dotenv()

class Settings(BaseSettings):
    # API Configuration
    PROJECT_NAME: str = "Abstract Route API"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    
    # Google Maps Configuration
    GOOGLE_MAPS_API_KEY: str

    # Server Configuration
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # CORS Configuration
    CORS_ORIGINS: List[str] = ["http://localhost:3000"]
    ALLOW_CORS_ALL: bool = True  # Set to True during development

    # Database settings
    DATABASE_URL: str = "sqlite:///./routes.db"
    
    # OSRM settings
    OSRM_SERVER_URL: str = "http://router.project-osrm.org"
    OSRM_PROFILE: str = "driving"

    class Config:
        env_file = ".env"
        case_sensitive = True

        @classmethod
        def parse_env_var(cls, field_name: str, raw_val: str) -> any:
            if field_name == "CORS_ORIGINS" and raw_val:
                return [origin.strip() for origin in raw_val.split(",")]
            return raw_val

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