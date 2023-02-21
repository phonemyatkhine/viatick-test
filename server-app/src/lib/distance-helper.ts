//helper for calculating haversine distance between long and lats , furtherest pin etc
import { PinOutPutData } from "../database/models/Pin";

export const haversineDistance = (
  lat1: number,
  long1: number,
  lat2: number,
  long2: number
) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(long2 - long1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

export const getFurtherestPinId = (distArr: any) => {
  const distanceValuesArr = new Array();
  distArr.forEach((distFromStart: any) => {
    distanceValuesArr.push(distFromStart.distance);
  });

  const furtherestDistanceValue = Math.max(...distanceValuesArr);

  var furtherestPinId: number = 0;
  distArr.forEach((distFromStart: any) => {
    if (furtherestDistanceValue == distFromStart.distance) {
      furtherestPinId = distFromStart.pinId;
    }
  });
  return furtherestPinId;
};

export const getDistArr = (startPin: PinOutPutData, pins: PinOutPutData[]) => {
  var distArr: any = new Array();

  pins.forEach((pin) => {
    var distFromStart: any = new Object();
    distFromStart["pinId"] = pin.id;
    distFromStart["distance"] = haversineDistance(
      startPin.lat,
      startPin.long,
      pin.lat,
      pin.long
    );
    distArr.push(distFromStart);
  });
  return distArr;
};

export const getDistances = (pins: PinOutPutData[]) => {
  var distances = new Array();
  pins.forEach((pin) => {
    var distForEachPin = new Array();
    distForEachPin = getDistArr(pin, pins);
    distances.push(distForEachPin);
  });
  return distances;
};
