import axios from "axios";
import { Axis } from "victory";

export const getSingleUser = async (id, navigate) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/User/get-user-by-id?id=${id}`
    );

    if (response.data) {
      return response.data;
    } else {
      console.log("notfound");
      navigate("/error");
      return null; // Return null or some other value to handle the error case
    }
  } catch (error) {
    console.log(error);
    navigate("/error");
    return null; // Return null or some other value to handle the error case
  }
};
export const changeIsActive = async (id, toast) => {
  try {
    await axios.patch(
      `https://homemealtaste.azurewebsites.net/api/User/update-user-status?userid=${id}`
    );
    toast.success("Update status successfully.");
    return getAllUser(toast);
  } catch (error) {
    toast.error("Update status failed.");
    return null;
  }
};
export const getAllUser = async (toast) => {
  try {
    const response = await axios.get(
      "https://homemealtaste.azurewebsites.net/api/User/get-all-user"
    );
    if (response.data) {
      return response.data.data;
    }
  } catch (error) {
    toast.error("Something wrong from sever ! Please reload page.");
    console.log(error);
  }
};
export const getOrderByUserId = async (id) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/Order/get-order-by-user-id?id=${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllOrder = async () => {
  try {
    const response = await axios.get(
      "https://homemealtaste.azurewebsites.net/api/Order/get-all-order"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllKitchen = async () => {
  try {
    const response = await axios.get(
      "https://homemealtaste.azurewebsites.net/api/Kitchen/get-all-kitchen"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllMeal = async () => {
  try {
    const response = await axios(
      "https://homemealtaste.azurewebsites.net/api/Meal/get-all"
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllDistrict = async () => {
  try {
    const response = await axios(
      "https://homemealtaste.azurewebsites.net/api/District/get-all-district"
    );
    return response.data;
  } catch (error) {}
};
export const getAllMealByKitchenId = async (id) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/Meal/get-all-meal-by-kitchen-id?id=${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getKitchenByKitchenId = async (id) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/Kitchen/get-all-kitchen-by-kitchen-id?id=${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllSession = async () => {
  try {
    const response = await axios.get(
      "https://homemealtaste.azurewebsites.net/api/Session/get-all"
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const createNewSession = async (value, toast) => {
  console.log("value la2", value);
  try {
    const response = axios.post(
      "https://homemealtaste.azurewebsites.net/api/Session",
      value
    );
    toast.success("Create new session completed.");
  } catch (error) {
    console.log("loi64 la", error);
    toast.error("Can not create new session.");
  }
};
export const getOrderByKitchenId = async (id) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/Order/get-order-by-kitchen-id?kitchenid=${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
