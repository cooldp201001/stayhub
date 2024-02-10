// Load JSON data from a file
var jsonData = cat('');

// Parse JSON data
var data = JSON.parse(jsonData);

// Insert data into a collection
db.your_collection_name.insertMany(data);
