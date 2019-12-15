export const dailyBread = () => {
  fetch(
    "https://ajith-holy-bible.p.rapidapi.com/GetVerses?Book=Job&chapter=4&VerseFrom=5&VerseTo=10",
    {
      mode: "cors",
      method: "GET",
      headers: {
        "x-rapidapi-host": "ajith-holy-bible.p.rapidapi.com",
        "x-rapidapi-key": "vvGe6mgKVamsh6lwgjlpLJnxM7oKp1qiE7OjsnFW2o2Lpl9caf"
      }
    }
  )
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
};
