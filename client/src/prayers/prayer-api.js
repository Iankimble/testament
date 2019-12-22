export const read = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const allPrayers = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/all/prayers/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const createPrayer = (userId, token, data) => {
  return fetch(`${process.env.REACT_APP_API_URL}/new/prayer/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: data
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const single = prayerId => {
  return fetch(`${process.env.REACT_APP_API_URL}/prayer/${prayerId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const update = (prayerId, token, prayer) => {
  console.log(prayerId, token, prayer);
  return fetch(`${process.env.REACT_APP_API_URL}/prayer/${prayerId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: prayer
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
