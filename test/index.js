const mongoose = require("mongoose");
const axios = require ("axios")

const  hotelNameData = [
  'Smile Hotel',
  'Secret Point Hotel',
  'Regal Orb Residence Inn',
  'Historic Lion Resort',
  'Twin Vertex Hotel',
  'Oceanside Resort',
  'Stone Lion Inn',
  'Days Hotel',
  'Catfish Creek Fishing Cabins',
  'Mottelers Thunderbird Motel',
  'Lady Of The Lake B & B',
  'Trails End Motel',
  'Arcadia Resort & Restaurant',
  'South Court Inn',
  'Old Carrabelle Hotel',
  'Summer Wind Resort',
  'Sublime Cliff Hotel',
  'Triple Landscape Hotel',
  'Peaceful Market Hotel',
  'Esport Resort',
  'Marquis Plaza & Suites',
  'Super Deluxe Inn & Suites',
  'Inoku Hotel',
  'Athens Residence Hotel',
  'Goldmoor Inn',
  'Suites At Bellevue Square',
  'Commander Hotel',
  'Whitefish Lodge & Suites',
  'Swan Point hotel',
  "King's Palace Hotel",
  'Rose Motel',
  'Winter Panorama Resort',
  'Double Sanctuary Resort',
  'La Vista Hotel',
  'Scottish Inn',
  'Pelham Hotel',
  'Bar C Resort & Campground',
  "Johnson's Resort",
  "Nordick's B & B",
  'Twin Dome Motel',
  'Scarlet Harbor Hotel',
  'Sapphire Suites',
  'Country Home',
  'Antiquity Hotel',
  'Universe Motel',
  'Nova Hotel',
  'Thompson House',
  "Cap'n Jack's Waterfront Inn",
  'Ocean Air Motel',
  'Monrovia Motor Inn'
]


//hotelImage Schema
   const hotelImageSchema = new  mongoose.Schema({
    image1: String,
    image2: String,
    image3: String,
    image4: String,
    image5: String,

   })
   const hotelImage = mongoose.model('hotelImage',hotelImageSchema,'hotel');
       
  
const DBconnect = async ()=>{

try{
    const conn = await mongoose.connect('mongodb+srv://kuldeeppatel23:F1zDRSOkYl3T0BIJ@cluster0.0c2ried.mongodb.net/sample_airbnb');
    const collection = await conn.connection.collection('hotels');
    const hotelImageCollection = await conn.connection.collection('hotelImages')
    console.log('Database connected successfully')

    // const hotelNames = await collection.find({}).limit(10).toArray()
   
      //get images fun def
      
      for (const [index, hotel] of hotelNameData.entries() ) {
        console.log(hotel);
        // const encodedHotelName = encodeURIComponent(hotelName);
        // const apiKey = 'C3rWtYYRLGGGqaLYAhiogcYkxo5fESlHCZTIvQMt6W1NO6qYfGVtPfQY';
        // const apiUrl = `https://api.pexels.com/v1/search?query=${encodedHotelName}&per_page=5`;
        // const response = await axios.get(apiUrl, {
        //     headers: {
        //         Authorization: apiKey
        //     }
        // });

        // // console.log(response.data.photos.length);
        // const images = response.data.photos;


        //   //  console.log();
        //    hotelImage.insertMany([
        //         {
        //             image1:images[0].src.original,
        //             image2:images[1].src.original,
        //             image3:images[2].src.original,
        //             image4:images[3].src.original,
        //             image5:images[4].src.original
        //         }
        //     ]
        //     )
        //     .then(result => {
        //         console.log(`Data inserted successfully:${index}`);
        //         // Close the connection after insertion (optional)
        //         // mongoose.connection.close();
        //     })
        //     .catch(error => {
        //         console.error('Error inserting data:', error);
        //         // Close the connection if an error occurs (optional)
        //         mongoose.connection.close();
        //     });

              // images.map(image=>{

                


              //   console.log(image.src.original);
              // })
        // Store the images in MongoDB for the current hotel
        // await collection.insertOne({ hotelName, images });
        // console.log(`Images inserted for hotel: ${hotelName}`);
    }
} catch (error) {
    console.error('error in connecting DB');
} 
}

    

  
  // delete all documents
      // const result = await hotelImageCollection.deleteMany({})
      // console.log(`Sucessfully deleted ${result.deletedCount}`);
      



DBconnect()


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