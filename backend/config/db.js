import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://mpofu7085_db_user:cCjG5eFKqM2iqy6W@imbesu.ojaqnhx.mongodb.net/?appName=imbesu"
    )
    .then(() => console.log("DB Connected Successfully "));
};


