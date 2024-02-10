const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://kuldeeppatel23:F1zDRSOkYl3T0BIJ@cluster0.0c2ried.mongodb.net/sample_airbnb');

        console.log('Database connected successfully');
1
        // Access the "users" collection
      const   usersCollection =  await conn.connection.collection('hotel_inventory');
        // return usersCollection;
         
        return   await usersCollection.find().toArray();
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}


module.exports = connectDB;
