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

export const singlePmPrayer = postId => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
    method: "GET"
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

export const singlePrayer = prayerId => {
  return fetch(`${process.env.REACT_APP_API_URL}/prayer/${prayerId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

//////////////////////////

// export const list = page => {
//   return fetch(`${process.env.REACT_APP_API_URL}/prayers/?page=${page}`, {
//     method: "GET"
//   })
//     .then(response => {
//       return response.json();
//     })
//     .catch(err => console.log(err));
// };
