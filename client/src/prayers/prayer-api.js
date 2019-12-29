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

export const remove = (prayerId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/prayer/${prayerId}`, {
    method: "DELETE",
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
export const allPg = (userId, token, page, limit) => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/all/${userId}?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const addNote = (userId, token, prayerId, note) => {
  return fetch(`${process.env.REACT_APP_API_URL}/prayer/addnote`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ userId, prayerId, note })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const removeNote = (userId, token, prayerId, note) => {
  return fetch(`${process.env.REACT_APP_API_URL}/prayer/removenote`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ userId, prayerId, note })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
