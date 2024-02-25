import axios from "axios";
import { toast } from "react-toastify";
import { all, put, takeLatest } from "redux-saga/effects";
import { getUserInforAction } from "../redux/userSlice";

export function* helloSaga() {
  yield toast.success("Waiting for get user's information");
}

export function* getUserInfor(action) {
  const user = yield fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "kminchelle",
      password: "0lelplR",
      // expiresInMins: 60, // optional
    }),
  })
    .then((res) => res.json())
    .then((res) => res);

  yield put(getUserInforAction(user));
}

export function* watchGetUserInfor() {
  yield takeLatest("LOGIN", getUserInfor); // Use action type instead of action creator
}

export default function* rootSaga() {
  yield all([watchGetUserInfor()]);
}
