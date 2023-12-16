import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./src/app/api/auth/[...nextauth]/lib/mongobd"; // Adjust the import path as per your project structure

export default MongoDBAdapter(clientPromise);
