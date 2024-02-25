import axios from "axios";

export const getAllProducts = async () => {
  try {
    const products = await axios.get("https://dummyjson.com/products");
    if (!products) throw Error;
    return products.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllUsers = async () => {
  try {
    const users = await axios.get("https://dummyjson.com/users");
    if (!users) throw Error;
    return users.data;
  } catch (error) {}
};
export const getAllCategories = async () => {
  try {
    const categories = await axios.get(
      "https://dummyjson.com/products/categories"
    );
    if (!categories) throw Error;
    return categories.data;
  } catch (error) {
    console.log(error);
  }
};
