const mongoose = require("mongoose");
const axios = require("axios");
const hotelnamesArr = require("./raw");

//hotelImage Schema
const hotelImageSchema = new mongoose.Schema({
  imagesUrl: {
    image1: String,
    image2: String,
    image3: String,
    image4: String,
    image5: String,
  },
});
const hotelImagesColl = mongoose.model("hotelImagesColl", hotelImageSchema);

const DBconnect = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://kuldeeppatel23:F1zDRSOkYl3T0BIJ@cluster0.0c2ried.mongodb.net/sample_airbnb"
    );
    const hotelImageCollection = conn.connection.collection("hotelImages");
    console.log("Database connected successfully");

    for (const [index, hotel] of hotelnamesArr.entries()) {
      const encodedHotelName = encodeURIComponent(hotel);
      const apiKey = "C3rWtYYRLGGGqaLYAhiogcYkxo5fESlHCZTIvQMt6W1NO6qYfGVtPfQY";
      const apiUrl = `https://api.pexels.com/v1/search?query=${encodedHotelName}&per_page=5`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: apiKey,
        },
      });

      const images = response.data.photos;

      hotelImagesColl
        .insertMany([
          {
            imagesUrl: {
              image1: images[0].src.original,
              image2: images[1].src.original,
              image3: images[2].src.original,
              image4: images[3].src.original,
              image5: images[4].src.original,
            },
          },
        ])
        .then((result) => {
          console.log(`Data inserted successfully:${index}`);
        })
        .catch((error) => {
          console.error("Error inserting data:", error);
          // Close the connection if an error occurs (optional)
          mongoose.connection.close();
        });
    }
  } catch (error) {
    console.error(error, "error in connecting DB");
  }
};

DBconnect();

// Call the function to get hotel images and store the result
// getHotelImages(HotelNamesData)
//   .then(images => {
//     // console.log(images);
//     // images.map(image=>{
//     //   console.log(image.src);
//     // })
//       // Store the images array into another variable or process further
//   })
//   .catch(error => {
//       console.error('Error fetching hotel images:', error);
//   });

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
