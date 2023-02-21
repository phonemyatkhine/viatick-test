"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistances = exports.getDistArr = exports.getFurtherestPinId = exports.haversineDistance = void 0;
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
const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
};
const getFurtherestPinId = (distArr) => {
    const distanceValuesArr = new Array();
    distArr.forEach((distFromStart) => {
        distanceValuesArr.push(distFromStart.distance);
    });
    const furtherestDistanceValue = Math.max(...distanceValuesArr);
    var furtherestPinId = 0;
    distArr.forEach((distFromStart) => {
        if (furtherestDistanceValue == distFromStart.distance) {
            furtherestPinId = distFromStart.pinId;
        }
    });
    return furtherestPinId;
};
exports.getFurtherestPinId = getFurtherestPinId;
const getDistArr = (startPin, pins) => {
    var distArr = new Array();
    pins.forEach((pin) => {
        var distFromStart = new Object();
        distFromStart["pinId"] = pin.id;
        distFromStart["distance"] = (0, exports.haversineDistance)(startPin.lat, startPin.long, pin.lat, pin.long);
        distArr.push(distFromStart);
    });
    return distArr;
};
exports.getDistArr = getDistArr;
const getDistances = (pins) => {
    var distances = new Array();
    pins.forEach((pin) => {
        var distForEachPin = new Array();
        distForEachPin = (0, exports.getDistArr)(pin, pins);
        distances.push(distForEachPin);
    });
    return distances;
};
exports.getDistances = getDistances;
