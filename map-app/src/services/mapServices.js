export const generateMap = (mapboxgl, mapContainer, lng, lat, zoom) => {
  return new mapboxgl.Map({
    container: mapContainer.current,
    style: "mapbox://styles/mapbox/streets-v12",
    center: [lng, lat],
    zoom: zoom,
  });
};

export const generateMarkerElement = (Id) => {
  const el = document.createElement("div");
  el.className = "marker";
  el.setAttribute("id", Id);
  return el;
};

export const generateMarker = (element, mapboxgl) => {
  return new mapboxgl.Marker({
    element: element,
    draggable: true,
  });
};
