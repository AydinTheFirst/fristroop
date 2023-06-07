import mongoose, { Schema } from "mongoose";

mongoose.set("strictQuery", true);
await mongoose
	.connect(process.env.mongodb)
	.then(() => console.log("Mongoose connection is successfull!"))
	.catch((err) => {
		throw new Error(err);
	});

// User Model
export const userModel = mongoose.model(
	"user",
	new Schema({
		id: { type: String, required: true, unique: true },
		email: { type: String, unique: true },
		username: { type: String, unique: true },
		password: String,
	})
);
