export const createPinRequest = async (long, lat) => {
  const response = await fetch(process.env.REACT_APP_WEB_SERVER + "/pins", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      long: long,
      lat: lat,
      userId: "1",
    }),
  });
  return response.json();
};

export const updatePinRequest = async (pinId, long, lat) => {
  const response = await fetch(
    `${process.env.REACT_APP_WEB_SERVER}/pins/${pinId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        long: long,
        lat: lat,
      }),
    }
  );
  return response.json();
};

export const getUserPinsRequest = async () => {
  const response = await fetch(
    process.env.REACT_APP_WEB_SERVER + "/users/1/pins"
  );
  return response.json();
};

export const simulateRouteRequest = async (pinId) => {
  const response = await fetch(
    process.env.REACT_APP_WEB_SERVER + `/users/1/pins/${pinId}/simulate-route`
  );
  return response.json();
};

export const sendMatchingAPIRequest = async (waypointString, accessToken) => {
  const url = process.env.REACT_APP_MAP_BOX_MATCHING_API;
  const params = {
    access_token: accessToken,
    geometries: "geojson",
  };
  const response = await fetch(
    `${url}/${waypointString}?${new URLSearchParams(params)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};

export const deletePinRequest = async (id) => {
  const response = await fetch(
    process.env.REACT_APP_WEB_SERVER + `/pins/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};
