const axios = require('axios')
const hotel = "double bed Room"


const encodedHotelName = encodeURIComponent(hotel);
const apiKey = "C3rWtYYRLGGGqaLYAhiogcYkxo5fESlHCZTIvQMt6W1NO6qYfGVtPfQY";
const apiUrl = `https://api.pexels.com/v1/search?query=${encodedHotelName}&per_page=1`;

const apiCall = async ()=>{
    const response = await axios.get(apiUrl, {
        headers: {
          Authorization: apiKey,
        },
      });
      
      const images = response.data.photos;
      
      images.map(image=>{
        console.log(image.src.original);
      })
}

apiCall()


// fetch("https://api.pexels.com/v1/search?query=Secret-Point-Hotel&per_page=3", {
//     headers: {
//         Authorization: "C3rWtYYRLGGGqaLYAhiogcYkxo5fESlHCZTIvQMt6W1NO6qYfGVtPfQY" // Replace with your Pexels API key
//     }
// })
// .then(response => response.json())
// .then(data => {

//     data.photos.forEach((photo, index) => {
//         const imageUrl = photo.src.large;
//         console.log(imageUrl)
//     });

// })
// .catch(error => console.error('Error fetching data:', error));


