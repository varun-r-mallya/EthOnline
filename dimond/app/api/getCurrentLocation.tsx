interface currLocation {
    latitude: number;
    longitude: number;
}

function calculateDistance(loc1: currLocation, loc2: currLocation): number {
    const R = 6371;
    const dLat = (loc2.latitude - loc1.latitude) * (Math.PI / 180);
    const dLon = (loc2.longitude - loc1.longitude) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(loc1.latitude * (Math.PI / 180)) * Math.cos(loc2.latitude * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export function getCurrentLocation(
    initial: currLocation,
    final: currLocation,
    speed: 40, 
    timeElapsed: number 
): currLocation {
    const totalDistance = calculateDistance(initial, final);

    const distanceTraveled = speed * timeElapsed;

    const proportionTravelled = Math.min(distanceTraveled / totalDistance, 1);

    const currentLatitude = initial.latitude + (final.latitude - initial.latitude) * proportionTravelled;
    const currentLongitude = initial.longitude + (final.longitude - initial.longitude) * proportionTravelled;

    return { latitude: currentLatitude, longitude: currentLongitude };
}


// To use the function, pass the location interface containing the latitude and 
// longitude of the initial and final locations, the speed, and the time elapsed.
