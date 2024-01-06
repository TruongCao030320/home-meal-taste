import axios from "axios";
import { direction } from "./Direction";
import { getUserInfor } from "../redux/userSlice";
export const login = async (values, navigate, message) => {
  try {
    // Make an API request to your authentication endpoint
    const response = await axios.post(
      "https://homemealtaste.azurewebsites.net/api/User/login",
      values,
      {
        headers: {
          "Content-Type": "application/json", // Adjust the content type as needed
        },
      }
    );
    const { token, userId, roleId } = response.data; // Assuming your API returns a token
    if (userId) {
      if (roleId == 1) {
        localStorage.setItem("userId", userId);
        // dispatch(getUserInfor(response.data))
        navigate(`/${direction.dashboard}`);
        message.success("Login completed.");
        return response.data;
      } else {
        message.error("Login failed. Your account can not log in.");
      }
    } else {
      message.error("Login failed. Please check your credentials.");
    }
  } catch (error) {
    console.error("Login failed", error);
    message.error("Login failed. Please check your credentials.");
  }
};
