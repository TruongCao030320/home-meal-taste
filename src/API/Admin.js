import axios from "axios";
import { Axis } from "victory";
import { direction } from "./Direction";

export const getSingleUser = async (id, navigate) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/User/get-user-by-id?id=${id}`
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return null; // Return null or some other value to handle the error case
  }
};
export const changeIsActive = async (id, toast) => {
  try {
    await axios.patch(
      `https://homemealtaste.azurewebsites.net/api/User/update-user-status?userid=${id}`
    );
    toast.success("Updated status completed.");
    return getAllUser(toast);
  } catch (error) {
    toast.error("Update status failed.");
    return null;
  }
};
export const getAllUser = async (toast, navigate) => {
  try {
    const response = await axios.get(
      "https://homemealtaste.azurewebsites.net/api/User/get-all-user-with-role-customer-chef"
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    navigate(`/${direction.error}`);
    console.log(error);
  }
};
export const getOrderByUserId = async (id) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/Order/get-order-by-customer-id?id=${id}`
    );
    return response.data;
  } catch (error) {
    console.log("get order by user id", error);
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
export const getAllKitchen = async (navigate) => {
  try {
    const response = await axios.get(
      "https://homemealtaste.azurewebsites.net/api/Kitchen/get-all-kitchen"
    );
    return response.data;
  } catch (error) {
    console.log(error);
    navigate(`/${direction.error}`);
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
      "https://homemealtaste.azurewebsites.net/api/Session/get-all-session"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const createNewSession = async (values, toast) => {
  console.log("value la2", values);
  try {
    const response = await axios.post(
      "https://homemealtaste.azurewebsites.net/api/Session",
      values
    );
    if (response.status == 200) {
      toast.success("Create New Session Successfully.");
    }
  } catch (error) {
    console.log("Create new session", error);
    toast.error("Create New Session Failed.");
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
export const getSingleMeal = async (id) => {
  try {
    const reponse = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/Meal/get-single-meal-by-meal-id?mealid=${id}`
    );
    return reponse.data;
  } catch (error) {
    console.log(error);
  }
};
export const patchSessionStatus = async (id) => {
  try {
    await axios.patch(
      `https://homemealtaste.azurewebsites.net/api/Session/change-status-session?sessionid=${id}`
    );
    return getAllSession();
  } catch (error) {
    console.log(error);
  }
};
export const getAllArea = async () => {
  try {
    const response = await axios.get(
      "https://homemealtaste.azurewebsites.net/api/Area/get-all-area"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllSessionByAreaId = async (id) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/Session/get-all-session-by-area-id?areaid=${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const createNewArea = async (values, toast) => {
  try {
    await axios.post(
      "https://homemealtaste.azurewebsites.net/api/Area/create-area",
      values
    );
    toast.success("Create New Successfully.");
  } catch (error) {
    return toast.error("Create failed!");
  }
};
export const deleteArea = async (id) => {
  await axios.delete(
    `https://homemealtaste.azurewebsites.net/api/Area?areaid=${id}`
  );
};
export const updateArea = async (values) => {
  try {
    const response = await axios.put(
      "https://homemealtaste.azurewebsites.net/api/Area/update-area",
      values
    );
  } catch (error) {
    console.log(error);
  }
};
export const getAllMealSession = async () => {
  try {
    const response = await axios.get(
      "https://homemealtaste.azurewebsites.net/api/MealSession/get-all-meal-session"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getSingleMealSessionById = async (id) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/MealSession/get-single-meal-session-by-meal-session-id?mealsessionid=${id}`
    );
    console.log("resonse.data", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getDishByMealId = async (id) => {
  try {
    if (id) {
      const response = await axios.get(
        `https://homemealtaste.azurewebsites.net/api/Meal/get-single-meal-by-meal-id?mealid=${id}`
      );
      return response.data;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
  }
};
export const deleteSession = async (id) => {
  try {
    const response = await axios.delete(
      `https://homemealtaste.azurewebsites.net/api/Session?sessionid=${id}`
    );
    if (response.status === 200) {
      console.log("thong canh", response.status);
    }
  } catch (error) {
    console.log("Delete session", error);
  }
};
export const updateStatusMealSession = async (id, status) => {
  try {
    await axios.patch(
      `https://homemealtaste.azurewebsites.net/api/MealSession/update-status-meal-session?mealSessionid=${id}&status=${status}`
    );
  } catch (error) {
    console.log("update status ", error);
  }
};
export const AddNewUser = async (values) => {
  console.log("add chef", values);
  try {
    await axios.post(
      "https://homemealtaste.azurewebsites.net/api/User/register-for-chef",
      values
    );
  } catch (error) {
    console.log("Add new user", error);
  }
};
export const getOrderById = async (id) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/Order/get-order-by-order-id?id=${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllMealSessionBySessionId = async (id) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/MealSession/get-all-meal-session-by-session-id?sessionid=${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Get all meal session by session id", error);
  }
};
export const getAllMealSessionByKitchenId = async (id) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/MealSession/get-all-meal-session-by-kitchen-id?kitchenId=${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Get all meal session by session id", error);
  }
};
export const getAllDishType = async () => {
  try {
    const response = await axios.get(
      "https://homemealtaste.azurewebsites.net/api/DishType/get-all-dish-type"
    );
    return response.data.data;
  } catch (error) {
    console.log("get all dish type", error);
  }
};
export const deleteDishType = async (id) => {
  await axios.delete(
    `https://homemealtaste.azurewebsites.net/api/DishType?id=${id}`
  );
};
export const createNewDishType = async (values) => {
  try {
    await axios.post(
      "https://homemealtaste.azurewebsites.net/api/DishType",
      values
    );
  } catch (error) {
    console.log("create new dish type", error);
  }
};
export const getAllFeedbackByKitchenId = async (id) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/Feedback/get-feedback-by-kitchen-id?kitchenid=${id}`
    );
    return response.data;
  } catch (error) {
    console.log("get all feedback by kitchen id", error);
  }
};
export const getAllTransactionByUserId = async (id) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/Transaction/get-all-transaction-by-user-id?userid=${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Get all transaction", error);
  }
};
// transaction
export const getAllTransactionOrdered = async () => {
  try {
    const response = await axios.get(
      "https://homemealtaste.azurewebsites.net/api/Transaction/get-transaction-by-transaction-type-OREDER"
    );
    return response.data;
  } catch (error) {
    console.log("transaction order error", error);
  }
};
export const getAllTransactionRecharge = async () => {
  try {
    const response = await axios.get(
      "https://homemealtaste.azurewebsites.net/api/Transaction/get-transaction-by-transaction-type-RECHARGED"
    );
    return response.data;
  } catch (error) {
    console.log("get all transaction recharge", error);
  }
};
export const AdminCancelledOrder = async (id) => {
  try {
    await axios.post(
      "https://homemealtaste.azurewebsites.net/api/Order/refund-money-when-order-cancel",
      id
    );
  } catch (error) {
    console.log("cancelled order ", error);
  }
};
export const getAllRevenue = async () => {
  try {
    const response = await axios.get(
      "https://homemealtaste.azurewebsites.net/api/Wallet/get-revenue-in-system"
    );
    return response.data;
  } catch (error) {
    console.log("get all revenue ", error);
  }
};
