import mapboxgl from "mapbox-gl";
import { generateMarkerElement, generateMarker } from "./services/mapServices";

import {
  createPinRequest,
  updatePinRequest,
  getUserPinsRequest,
  simulateRouteRequest,
  sendMatchingAPIRequest,
  deletePinRequest,
} from "./services/webServices";

describe("generateMarkerElement", () => {
  it("should generate a new marker element with the given ID", () => {
    const id = "test-marker";
    const element = generateMarkerElement(id);
    expect(element.className).toBe("marker");
    expect(element.getAttribute("id")).toBe(id);
  });
});

describe("generateMarker", () => {
  let element;
  let mapboxglMock;

  beforeAll(() => {
    element = document.createElement("div");
    mapboxglMock = {
      Marker: jest.fn().mockImplementation(() => {
        return { addTo: jest.fn() };
      }),
    };
  });

  it("should create a new marker with the given element", () => {
    const marker = generateMarker(element, mapboxglMock);
    expect(marker).toBeDefined();
    expect(mapboxglMock.Marker).toHaveBeenCalledWith({
      element: element,
      draggable: true,
    });
  });
});

describe("requests", () => {
  describe("createPinRequest", () => {
    it("should make a POST request with the correct data", async () => {
      const mockResponse = { id: 1, long: 123, lat: 456, userId: "1" };
      jest.spyOn(window, "fetch").mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        })
      );

      const long = 123;
      const lat = 456;
      const userId = 1;
      const response = await createPinRequest(long, lat);

      expect(window.fetch).toHaveBeenCalledWith(
        `${process.env.REACT_APP_WEB_SERVER}/pins`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            long,
            lat,
            userId: "1",
          }),
        }
      );

      expect(response).toEqual(mockResponse);
    });
  });

  describe("updatePinRequest", () => {
    it("should make a PUT request with the correct data", async () => {
      const mockResponse = { id: 1, long: 789, lat: 101112 };
      jest.spyOn(window, "fetch").mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        })
      );

      const pinId = 1;
      const long = 789;
      const lat = 101112;
      const response = await updatePinRequest(pinId, long, lat);

      expect(window.fetch).toHaveBeenCalledWith(
        `${process.env.REACT_APP_WEB_SERVER}/pins/${pinId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            long,
            lat,
          }),
        }
      );

      expect(response).toEqual(mockResponse);
    });
  });

  describe("getUserPinsRequest", () => {
    it("should return user pins from the server", async () => {
      const mockResponse = { pins: [{ id: 1, long: 123, lat: 456 }] };
      jest.spyOn(global, "fetch").mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      const userPins = await getUserPinsRequest();

      expect(global.fetch).toHaveBeenCalledWith(
        `${process.env.REACT_APP_WEB_SERVER}/users/1/pins`
      );
      expect(userPins).toEqual(mockResponse);
    });
  });

  describe("simulateRouteRequest", () => {
    it("should simulate the route for a pin", async () => {
      const mockResponse = { message: "Route simulation started." };
      jest.spyOn(global, "fetch").mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      const pinId = 1;
      const simulationResult = await simulateRouteRequest(pinId);

      expect(global.fetch).toHaveBeenCalledWith(
        `${process.env.REACT_APP_WEB_SERVER}/users/1/pins/${pinId}/simulate-route`
      );
      expect(simulationResult).toEqual(mockResponse);
    });
  });

  describe("sendMatchingAPIRequest", () => {
    it("should send matching API request to Mapbox", async () => {
      const mockResponse = { code: "Ok" };
      jest.spyOn(global, "fetch").mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      const waypointString = "a;b;c";
      const accessToken = "ACCESS_TOKEN";
      const matchingResult = await sendMatchingAPIRequest(
        waypointString,
        accessToken
      );

      expect(global.fetch).toHaveBeenCalledWith(
        `${process.env.REACT_APP_MAP_BOX_MATCHING_API}/${waypointString}?access_token=${accessToken}&geometries=geojson`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      expect(matchingResult).toEqual(mockResponse);
    });
  });

  describe("deletePinRequest", () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({}),
        })
      );
    });

    afterEach(() => {
      global.fetch.mockClear();
      delete global.fetch;
    });

    it("should call the DELETE method with the correct data", async () => {
      const id = 1;
      await deletePinRequest(id);

      expect(fetch).toHaveBeenCalledWith(
        `${process.env.REACT_APP_WEB_SERVER}/pins/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    });
  });
});
