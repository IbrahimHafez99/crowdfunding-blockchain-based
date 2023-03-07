import mongoose from 'mongoose';

const connectDB = async () => {
  const DB = process.env.DB_URI.replace('<password>', process.env.DB_PASSWORD);

  await mongoose
    .connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    .then((conn) => {
      console.log(
        `✅ DB connection successful with host ${conn.connection.host.bold}`
          .green.inverse
      );
    })
    .catch((error) => {
      console.error(`🛑 Error! ${error.message.bold}`.red.inverse, error);
      process.exit(1);
    });
};

export default connectDB;
