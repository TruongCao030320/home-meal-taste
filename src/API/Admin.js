import axios from "axios";
import { Axis } from "victory";
import { direction } from "./Direction";
import { tokenAPI } from "./Login";

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
      "https://homemealtaste.azurewebsites.net/api/Order/get-all-order",
      {
        headers: {
          Authorization: `Bearer ${tokenAPI}`,
        },
      }
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
      `https://homemealtaste.azurewebsites.net/api/Kitchen/get-single-kitchen-by-kitchen-id?id=${id}`
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
  await axios.delete(
    `https://homemealtaste.azurewebsites.net/api/Session?sessionid=${id}`
  );
};
export const updateStatusMealSession = async (id, status) => {
  await axios.patch(
    `https://homemealtaste.azurewebsites.net/api/MealSession/update-status-meal-session?mealSessionid=${id}&status=${status}`
  );
};
export const AddNewUser = async (values) => {
  await axios.post(
    "https://homemealtaste.azurewebsites.net/api/User/register-for-chef",
    values
  );
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
export const getAllKitchenBySessionId = async (id) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/Kitchen/get-all-kitchen-by-session-id?sessionid=${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Error At get all kitchen by session Id");
  }
};
export const getSingleSessionById = async (id) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/Session/get-single-session-by-session-id?sessionid=${id}`
    );
    return response.data.result;
  } catch (error) {
    console.log("Error at get single session by id", error);
  }
};
export const getAllOrderByMealSessionId = async (id) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/Order/get-all-order-by-mealsession-id?mealsessionid=${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Error at get all order by meal session id", error);
  }
};
export const getTotalPriceInEveryMealSession = async (id) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/Order/get-total-price-of-mealsession-by-meal-session-id?mealsessionid=${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Error at total price in evert meal session", error);
  }
};
export const getAllMealSessionByKitchenInSession = async (
  kitchenId,
  sessionId
) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/MealSession/get-all-meal-session-by-kitchen-id-in-session?kitchenid=${kitchenId}&sessionid=${sessionId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error At get all meal session by kitchen in session", error);
  }
};
export const getTotalInSessionOfSingleKitchen = async (
  sessionId,
  kitchenId
) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/Order/get-total-price-of-mealsession-by-session-id-and-kitchen-id?sessionId=${sessionId}&kitchenId=${kitchenId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error At get total in session of single kitchen", error);
  }
};
export const getAllTransactionOrderType = async () => {
  try {
    const response = await axios.get(
      "https://homemealtaste.azurewebsites.net/api/Transaction/get-transaction-by-transaction-type-with-orderid"
    );
    return response.data;
  } catch (error) {
    console.log("Error at get all transaction", error);
  }
};
export const getAllTransactionWithoutOrderType = async () => {
  try {
    const response = await axios.get(
      "https://homemealtaste.azurewebsites.net/api/Transaction/get-transaction-by-transaction-type-without-orderid"
    );
    return response.data;
  } catch (error) {
    console.log("Error at get all transaction", error);
  }
};
export const countAllOrder = async () => {
  try {
    const response = await axios.get(
      "https://homemealtaste.azurewebsites.net/api/Order/count-order-in-system"
    );
    return response.data;
  } catch (error) {
    console.log("Error at count all order", error);
  }
};
export const countCustomer = async () => {
  try {
    const response = await axios.get(
      "https://homemealtaste.azurewebsites.net/api/User/count-all-user-with-roleid-2"
    );
    return response.data;
  } catch (error) {
    console.log("Error at count Customer", error);
  }
};
export const getTotalIn12Month = async () => {
  try {
    const response = await axios.get(
      "https://homemealtaste.azurewebsites.net/api/Order/total-price-of-order-in-system"
    );
    return response.data;
  } catch (error) {
    console.log("Error at get total 12 month", error);
  }
};
export const getTop5Customer = async () => {
  try {
    const response = await axios.get(
      "https://homemealtaste.azurewebsites.net/api/Order/get-top-5-customer-order-times"
    );
    return response.data;
  } catch (error) {
    console.log("Error at get top 5 customer");
  }
};
export const getTop5Chef = async () => {
  try {
    const response = await axios.get(
      "https://homemealtaste.azurewebsites.net/api/Order/get-top-5-chef-order-times"
    );
    return response.data;
  } catch (error) {
    console.log("Error at get top 5 chef", error);
  }
};
export const getKitchenByUserId = async (id) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/Kitchen/get-single-kitchen-by-user-id?userid=${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Error at get kitchen by user id", error);
  }
};
