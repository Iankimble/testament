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

export const allUserPm = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/all/pm/${userId}`, {
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

export const singlePmPrayer = postId => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const createPm = (userId, token, data) => {
  return fetch(`${process.env.REACT_APP_API_URL}/create/new/pm/${userId}`, {
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
