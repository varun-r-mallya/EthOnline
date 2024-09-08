export interface Location {
    latitude: number |null;
    longitude: number |null;
}
export interface Ride {
    startLocation: Location;
    endLocation: Location;
}
