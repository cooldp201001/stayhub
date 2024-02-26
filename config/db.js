const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://kuldeeppatel23:F1zDRSOkYl3T0BIJ@cluster0.0c2ried.mongodb.net/hotel_database');

        console.log('Database connected successfully');
1
        // Access the "users" collection
      const   usersCollection =   conn.connection.collection('hotel_info');
        // return usersCollection;
         
        return   await usersCollection.find().toArray();
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}


module.exports = connectDB;
