export interface RoutePoint {
  latitude: number;
  longitude: number;
}

export interface RouteStyle {
  color: string;
  strokeWidth: number;
  handDrawnEffect: boolean;
}

export interface MapIcon {
  id: string;
  type: string;  // e.g., 'landmark', 'cafe', 'museum'
  position: RoutePoint;
  color?: string;
  scale?: number;
}

export interface RouteData {
  points: RoutePoint[];
  distance: number;
  duration: number;
  geometry: string;  // Encoded polyline or GeoJSON
}

export interface MapState {
  routePoints: RoutePoint[];
  icons: MapIcon[];
  style: RouteStyle;
  isHandDrawnMode: boolean;
}

export interface HandDrawnRouteProps {
  points: RoutePoint[];
  style: RouteStyle;
  width: number;
  height: number;
}

export interface MapIconsProps {
  icons: MapIcon[];
  onIconMove: (id: string, position: RoutePoint) => void;
} 