import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_TOKEN;

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(96.12561859128857);
  const [lat] = useState(16.81);
  const [zoom] = useState(15);
  const [active, setActive] = useState(0);
  const [isLoadButtonDisabled, setIsLoadButtonDisabled] = useState(false);
  const [isFindButtonDisabled, setIsFindButtonDisabled] = useState(false);
  const [isRouteDrawn, setIsRouteDrawn] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [layers, setLayers] = useState([]);
  const markersRef = useRef();
  const addPinButton = useRef(false);

  const setActivePin = (event) => {
    setActive(event.target.getAttribute("id"));
    markersRef.current.forEach((marker) => {
      const markerElement = marker.getElement();
      markerElement.classList.remove("marker-active");
    });
    event.target.classList.add("marker-active");
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
    loadPins();
    map.current.on("click", (event) => {
      const lngLat = event.lngLat;
      console.log(
        `Clicked at longitude: ${lngLat.lng}, latitude: ${lngLat.lat}`
      );

      if (!!addPinButton.current) {
        console.log("aaas");
        if (isLoadButtonDisabled) {
          setIsLoadButtonDisabled(false);
        }
        fetch(process.env.REACT_APP_WEB_SERVER + "/pins", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            long: lngLat.lng,
            lat: lngLat.lat,
            userId: "1",
          }),
        })
          .then((response) => response.json())
          .then((json) => {
            createMarker(lngLat.lng, lngLat.lat, json.data.id);
          });
        addPinButton.current = false;
      }
    });
  });

  const addPin = () => {
    addPinButton.current = true;
  };

  const createMarker = (long, lat, pinId) => {
    const el = document.createElement("div");
    el.className = "marker";
    el.setAttribute("id", pinId);
    const marker = new mapboxgl.Marker({
      element: el,
      draggable: true,
    })
      .setLngLat([long, lat])
      .addTo(map.current);

    marker.getElement().addEventListener("click", setActivePin);

    marker.on("dragend", () => {
      const lngLat = marker.getLngLat();
      const pinId = marker.getElement().getAttribute("id");
      console.log(`LONG : ${lngLat.lng}. LAT : ${lngLat.lat}`);
      fetch(`${process.env.REACT_APP_WEB_SERVER}/pins/${pinId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          long: lngLat.lng,
          lat: lngLat.lat,
        }),
      })
        .then((response) => response.json())
        .catch((err) => console.log(err));
    });
    setMarkers((prevMarkers) => [...prevMarkers, marker]);
  };

  const loadPins = async () => {
    removeAllMarkers();
    fetch(process.env.REACT_APP_WEB_SERVER + "/users/1/pins")
      .then((response) => response.json())
      .then((json) => {
        json.data.forEach((element) => {
          createMarker(element.long, element.lat, element.id);
        });
        setIsLoadButtonDisabled(true);
      });
  };

  const removeAllMarkers = () => {
    markers.forEach((marker) => marker.remove());
    setMarkers([]);
  };

  const findRoute = () => {
    if (!!isRouteDrawn) {
      layers.forEach((layer) => {
        map.current.removeLayer(layer);
        map.current.removeSource(layer);
      });
      // geometries.forEach((geometry) => {});
      setLayers([]);
    }
    if (!active) {
      alert("Please select a pin!");
    } else if (active) {
      fetch(
        process.env.REACT_APP_WEB_SERVER +
          `/users/1/pins/${active}/simulate-route`
      )
        .then((response) => response.json())
        .then((json) => {
          const waypoints = new Array();
          var waypointString = "";
          for (const key in json.data) {
            const innerArr = new Array();
            if (Object.hasOwnProperty.call(json.data, key)) {
              const element = json.data[key];

              innerArr[0] = element.long;
              innerArr[1] = element.lat;
              waypointString = `${waypointString}${innerArr[0]},${innerArr[1]};`;
              waypoints.push(innerArr);
              // }
            }
          }
          waypointString = `${waypointString}${json.data[0].long},${json.data[0].lat}`;

          const url =
            "https://api.mapbox.com/matching/v5/mapbox/driving-traffic";
          const params = {
            access_token: mapboxgl.accessToken,
            geometries: "geojson",
          };
          fetch(`${url}/${waypointString}?${new URLSearchParams(params)}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              data.matchings.forEach((matching, index) => {
                drawGeometry(matching, index);
              });
            });
          setIsRouteDrawn(true);
        });
    }
  };
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
        "line-width": 2,
      },
    });
  };

  useEffect(() => {
    markersRef.current = markers;
    markers.forEach((marker) => {
      const markerElement = marker.getElement();
      console.log(markerElement);
    });
  }, [markers]);
  return (
    <div>
      <div class="col">
        <div className="col-3">
          <div class="total-pins" id="totalPin"></div>
          <div class="button-div">
            <button
              type="button"
              onClick={addPin}
              class="btn btn-outline-primary"
            >
              Add Pin
            </button>
            <button
              onClick={findRoute}
              type="button"
              class="btn btn-outline-warning"
              disabled={isFindButtonDisabled}
            >
              Find Route
            </button>
          </div>
          <div class="pin"></div>
        </div>
        <div ref={mapContainer} className="map-container" />
      </div>
    </div>
  );
}

export default Map;
