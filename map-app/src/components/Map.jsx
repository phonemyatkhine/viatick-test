import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import {
  createPinRequest,
  getUserPinsRequest,
  sendMatchingAPIRequest,
  simulateRouteRequest,
  updatePinRequest,
  deletePinRequest,
} from "../services/webServices";
import {
  generateMap,
  generateMarkerElement,
  generateMarker,
} from "../services/mapServices";
mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_TOKEN;

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lng] = useState(process.env.REACT_APP_MAP_LONG);
  const [lat] = useState(process.env.REACT_APP_MAP_LAT);
  const [zoom] = useState(process.env.REACT_APP_MAP_ZOOM);

  const [active, setActive] = useState(0); //check activated pin with pin id
  const [isPinsLoaded, setIsPinsLoaded] = useState(false); //check if pins are loaded
  const [markers, setMarkers] = useState([]); //store markers
  const [layers, setLayers] = useState([]); //store layer ids for geometery
  const [isRouteDrawn, setIsRouteDrawn] = useState(false); // check if routes are drawn

  const [simulatedPins, setSimulatedPins] = useState([]);
  const simulatedPinsRef = useRef();
  const markersRef = useRef([]);
  const addPinButton = useRef(false);

  //load map
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = generateMap(mapboxgl, mapContainer, lng, lat, zoom);
  });
  //load map

  //map onclick
  useEffect(() => {
    map.current.on("click", (event) => {
      if (!!addPinButton.current) {
        createPinRequest(event.lngLat.lng, event.lngLat.lat).then((json) => {
          createMarker(event.lngLat.lng, event.lngLat.lat, json.data.id);
        });
        addPinButton.current = false;
      }
    });
  });
  //map onclick

  //load Pins
  useEffect(() => {
    if (!isPinsLoaded) {
      loadPins();
    }
  }, [isPinsLoaded]);
  //load pins
  const loadPins = () => {
    console.log("load pins");
    removeAllMarkers();
    getUserPinsRequest().then((json) => {
      json.data.forEach((element) => {
        createMarker(element.long, element.lat, element.id);
      });
    });
    setIsPinsLoaded(true);
  };
  useEffect(() => {
    markersRef.current = markers;
  }, [markers]);

  const addPin = () => {
    addPinButton.current = true;
  };

  //createMarker
  const createMarker = (long, lat, pinId) => {
    const el = generateMarkerElement(pinId);
    const marker = generateMarker(el, mapboxgl)
      .setLngLat([long, lat])
      .addTo(map.current);
    marker.getElement().addEventListener("click", setActivePin);
    marker.on("dragend", () => updateMarker(marker));
    setMarkers((prevMarkers) => [...prevMarkers, marker]);
  };
  //createMarkers

  //deletePin
  const deletePin = (id, marker) => {
    deletePinRequest(id)
      .then((request) => {
        const newMarkers = markers.filter((i) => i !== marker);
        setMarkers(newMarkers);
        loadPins();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //deletePin

  //update marker location send to server
  const updateMarker = (marker) => {
    const lngLat = marker.getLngLat();
    const pinId = marker.getElement().getAttribute("id");
    updatePinRequest(pinId, lngLat.lng, lngLat.lat).catch((err) =>
      console.log(err)
    );
  };
  //update marker location send to server

  //removeMarkers
  const removeAllMarkers = () => {
    markers.forEach((marker) => marker.remove());
    setMarkers([]);
  };
  //removeMarkers
  useEffect(() => {
    markers.forEach((marker) => {
      const markerElement = marker.getElement();
      markerElement.classList.remove("marker-active");
      if (markerElement.getAttribute("id") == active) {
        markerElement.classList.add("marker-active");
      }
    });
  }, [active]);
  //set Active Pin
  const setActivePin = (event) => {
    setActive(event.target.getAttribute("id"));
    markersRef.current.forEach((marker) => {
      const markerElement = marker.getElement();
      markerElement.classList.remove("marker-active");
    });
    event.target.classList.add("marker-active");
  };
  //set Active Pin

  //way point string
  const getWayPointString = (json) => {
    var waypointString = "";
    for (const key in json.data) {
      if (Object.hasOwnProperty.call(json.data, key)) {
        waypointString = `${waypointString}${json.data[key].long},${json.data[key].lat};`;
        // }
      }
    }
    waypointString = `${waypointString}${json.data[0].long},${json.data[0].lat}`;
    return waypointString;
  };
  //way point string

  //find route
  const findRoute = () => {
    if (!!isRouteDrawn) {
      layers.forEach((layer) => {
        map.current.removeLayer(layer);
        map.current.removeSource(layer);
      });
      setLayers([]);
    }
    if (!active) {
      alert("Please select a pin!");
    } else if (active) {
      simulateRouteRequest(active).then((json) => {
        setSimulatedPins(json);
        simulatedPinsRef.current = json.data;
        console.log("a");
        console.log(simulatedPinsRef);
        console.log("b");
        const waypointString = getWayPointString(json);
        sendMatchingAPIRequest(waypointString, mapboxgl.accessToken).then(
          (data) => {
            data.matchings.forEach((matching, index) => {
              drawGeometry(matching, index);
            });
          }
        );
        setIsRouteDrawn(true);
      });
    }
  };
  //find route

  //draw geometry
  const drawGeometry = (matching, index) => {
    const geometry = matching.geometry;
    setLayers((prevLayers) => [...prevLayers, `route${index}`]);
    map.current.addLayer({
      id: "route" + index,
      type: "line",
      source: {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: geometry,
        },
      },
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": `#888`,
        "line-width": 1,
      },
    });
  };
  //draw geometry

  return (
    <div>
      <div className="col row">
        <div className="col-3">
          <div className="total-pins" id="totalPin">
            <h4 className="row">
              Total Pins : <p className="total-pins-count">{markers.length}</p>/
              25
            </h4>
          </div>
          <div className="button-div row">
            <button
              type="button"
              onClick={addPin}
              className="btn btn-outline-primary"
            >
              Add Pin
            </button>

            <button
              onClick={findRoute}
              type="button"
              className="btn btn-outline-warning"
            >
              Find Route
            </button>
          </div>
          {!isRouteDrawn &&
            markers.map((marker, index) => (
              <div
                key={marker.id}
                className={` card ${
                  marker.getElement().getAttribute("id") === active
                    ? "marker-card-active"
                    : "marker-card"
                }`}
                onClick={() =>
                  setActive(marker.getElement().getAttribute("id"))
                }
              >
                <h4 className="row">
                  Pin : <p className="total-pins-count">{index + 1}</p>
                </h4>
                <div className="row">
                  <div className="row col-9">
                    <div className="col-6"> Lat : {marker._lngLat.lat}</div>
                    <div className="col-6"> Long : {marker._lngLat.lng}</div>
                  </div>
                  <button
                    className="btn btn-outline-danger delete-btn"
                    onClick={() =>
                      deletePin(marker.getElement().getAttribute("id"), marker)
                    }
                  ></button>
                </div>
              </div>
            ))}
          {isRouteDrawn &&
            Object.keys(simulatedPinsRef.current).map((key) => {
              const marker = simulatedPinsRef.current[key];
              console.log(marker);
              return (
                <div
                  key={marker.id}
                  className={` card ${
                    marker.id === active ? "marker-card-active" : "marker-card"
                  }`}
                  onClick={() => setActive(marker.id)}
                >
                  <h4 className="row">
                    Pin : <p className="total-pins-count">{Number(key) + 1}</p>
                  </h4>
                  <div className="row">
                    <div className="row col-9">
                      <div className="col-6"> Lat : {marker.lat}</div>
                      <div className="col-6"> Long : {marker.long}</div>
                    </div>
                    <button
                      className="btn btn-outline-danger delete-btn"
                      onClick={() => deletePin(marker.id, marker)}
                    ></button>
                  </div>
                </div>
              );
            })}
        </div>

        <div ref={mapContainer} className="map-container col-9" />
      </div>
    </div>
  );
}

export default Map;
