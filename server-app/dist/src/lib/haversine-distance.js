"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.haversineDistance = void 0;
const haversineDistance = (lat1, long1, lat2, long2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(long2 - long1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
};
exports.haversineDistance = haversineDistance;
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
