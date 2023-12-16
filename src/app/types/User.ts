import { ObjectId } from "mongodb";

type User = {
  _id?: string;
  name: string;
  email: string;
  image: string;
  emailVerified: boolean;
  recipes: { name: string; recipe: string }[];
};

export default User;
