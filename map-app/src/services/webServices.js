export const createPin = async (long, lat) => {
  fetch(process.env.REACT_APP_WEB_SERVER + "/pins", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      long: long,
      lat: lat,
      userId: "1",
    }).then((response) => {
      return response.json();
    }),
  });
};

export const updatePin = async (pinId, long, lat) => {
  fetch(`${process.env.REACT_APP_WEB_SERVER}/pins/${pinId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      long: long,
      lat: lat,
    }),
  });
};

export const getAllPins = async () => {
  fetch(process.env.REACT_APP_WEB_SERVER + "/users/1/pins").then((response) => {
    return response.json();
  });
};

export const simulateRoute = async () => {
  fetch(
    process.env.REACT_APP_WEB_SERVER + "/users/1/pins/18/simulate-route"
  ).then((response) => {
    return response.json();
  });
};
