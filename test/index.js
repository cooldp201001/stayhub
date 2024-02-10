const mongoose = require("mongoose");
const axios = require("axios");

const HotelNamesData = [
  "Secret Point Hotel",
  "Twin Dome Motel",
  "Triple Landscape Hotel",
  "Sublime Cliff Hotel",
  "Scarlet Harbor Hotel",
  "King's Palace Hotel",
  "Rose Motel",
  "Sapphire Suites",
  "Smile Hotel",
  "Country Home",
  "Regal Orb Residence Inn",
  "Winter Panorama Resort",
  "Historic Lion Resort",
  "Twin Vertex Hotel",
  "Peaceful Market Hotel",
  "Double Sanctuary Resort",
  "Antiquity Hotel",
  "Oceanside Resort",
  "Universe Motel",
  "Esport Resort",
  "Nova Hotel",
  "Stone Lion Inn",
  "Days Hotel",
  "La Vista Hotel",
  "Scottish Inn",
  "Marquis Plaza & Suites",
  "Super Deluxe Inn & Suites",
  "Inoku hotel",
  "Thompson House",
  "Catfish Creek Fishing Cabins",
  "Athens Residence Hotel",
  "Goldmoor Inn",
  "Mottelers Thunderbird Motel",
  "Cap'n Jack's Waterfront Inn",
  "Suites At Bellevue Square",
  "Pelham Hotel",
  "Commander Hotel",
  "Lady Of The Lake B & B",
  "Whitefish Lodge & Suites",
  "Trails End Motel",
  "Ocean Air Motel",
  "Bar C Resort & Campground",
  "Johnson's Resort",
  "Monrovia Motor Inn",
  "Arcadia Resort & Restaurant",
  "Swan Point Inn",
  "South Court Inn",
  "Nordick's B & B",
  "Old Carrabelle Hotel",
  "Summer Wind Resort",
];
const HotelNamesData2 =[
"Thompson House",
"Catfish Creek Fishing Cabins",
"Athens Residence Hotel",
"Goldmoor Inn",
"Mottelers Thunderbird Motel",
"Cap'n Jack's Waterfront Inn",
"Suites At Bellevue Square",
"Pelham Hotel",
"Commander Hotel",
"Lady Of The Lake B & B",
"Whitefish Lodge & Suites",
"Trails End Motel",
"Ocean Air Motel",
"Bar C Resort & Campground",
"Johnson's Resort",
"Monrovia Motor Inn",
"Arcadia Resort & Restaurant",
"Swan Point Inn",
"South Court Inn",
"Nordick's B & B",
"Old Carrabelle Hotel",
"Summer Wind Resort",
]
const demoArray = [
  "Secret Point Hotel",
  "Twin Dome Motel",
  "Triple Landscape Hotel",
];

//hotelImage Schema
const hotelImageSchema = new mongoose.Schema({
  image1: String,
  image2: String,
  image3: String,
  image4: String,
  image5: String,
});
const hotelImage = mongoose.model("hotelImage", hotelImageSchema, "hotel");

const DBconnect = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://kuldeeppatel23:F1zDRSOkYl3T0BIJ@cluster0.0c2ried.mongodb.net/sample_airbnb"
    );
    const collection = await conn.connection.collection("hotels");
    const hotelImageCollection = await conn.connection.collection(
      "hotelImages"
    );
    console.log("Database connected successfully");

    for (const [index, hotelName] of HotelNamesData.entries()) {
      const encodedHotelName = encodeURIComponent(hotelName);
      const apiKey = "C3rWtYYRLGGGqaLYAhiogcYkxo5fESlHCZTIvQMt6W1NO6qYfGVtPfQY";
      const apiUrl = `https://api.pexels.com/v1/search?query=${encodedHotelName}&per_page=5`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: apiKey,
        },
      });

      const images = response.data.photos;

      hotelImage
        .insertMany([
          {
            image1: images[0].src.original,
            image2: images[1].src.original,
            image3: images[2].src.original,
            image4: images[3].src.original,
            image5: images[4].src.original,
          },
        ])
        .then((result) => {
          console.log(`Data inserted successfully:${index}`);
        })
        .catch((error) => {
          console.error("Error inserting data:", error);

          mongoose.connection.close();
        });
    }
  } catch (error) {
    console.error("error in connecting DB");
  }
};

DBconnect();
