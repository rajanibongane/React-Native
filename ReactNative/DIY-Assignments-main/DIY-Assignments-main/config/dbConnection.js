const mongoose = require("mongoose");
const connectDb = async () => {
  // MongoDB connection URL
  const dbURI = process.env.DATABASE_URL;
  // Connect to MongoDB
  try {
    const connect = await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      "Connected to MongoDB :",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectDb;
