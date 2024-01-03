import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Signup from "../Pages/SignUp";
import Login from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";
import Account from "../Pages/admin/Account";
import Product from "../Pages/admin/Product";
import Session from "../Pages/admin/Session";
import AccountDetail from "../Pages/admin/details/AccountDetail";
import Payment from "../Pages/admin/Payment";
import Order from "../Pages/admin/Order";
import Chatbox from "../Pages/admin/Chatbox";
import AccountCreating from "../Pages/admin/details/AccountCreating";
import DashboardPage from "../Pages/admin/DashboardPage";
import AdminProfile from "../Pages/admin/details/AdminProfile";
import ProductDetail from "../Pages/admin/details/ProductDetail";
import Kitchen from "../Pages/admin/Kitchen";
import OrderTracking from "../Pages/admin/details/OrderTracking";
import ProductCreating from "../Pages/admin/details/ProductCreating";
import KitchenDetail from "../Pages/admin/details/KitchenDetail";
import ErrorPage from "../Pages/ErrorPage";
import Area from "../Pages/admin/Area";
import { direction } from "../API/Direction";
import DishType from "../Pages/admin/DishType";
import Transaction from "../Pages/admin/Transaction";
import ManageMealSessionInKitchen from "../Pages/admin/sessions/ManageMealSessionInKitchen";
import SessionCreating from "../Pages/admin/details/SessionCreating";
import ManageAreaInSession from "../Pages/admin/sessions/ManageAreaInSession";
import ManageChefInArea from "../Pages/admin/sessions/ManageChefInArea";
const Router = () => {
  return (
    <>
      <Routes>
        <Route path={`/${direction.register}`} element={<Signup />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path={`/${direction.error}`} element={<ErrorPage />}></Route>
        <Route path={`/${direction.dashboard}/`} element={<Dashboard />}>
          <Route path="" element={<DashboardPage />} />
          <Route path={direction.user} element={<Account />} />
          <Route path={direction.kitchen} element={<Kitchen />} />
          <Route
            path={`${direction.kitchen}/:id`}
            element={<KitchenDetail />}
          />
          <Route
            path={`${direction.kitchen}/${direction.productCreating}`}
            element={<ProductCreating />}
          />
          <Route
            path={`${direction.user}/${direction.accountCreating}`}
            element={<AccountCreating />}
          />
          <Route path={`${direction.user}/:id`} element={<AccountDetail />} />
          <Route path={`${direction.admin}/:id`} element={<AdminProfile />} />
          <Route path={`${direction.meal}/:id`} element={<ProductDetail />} />
          <Route path={`${direction.meal}`} element={<Product />} />
          <Route path={`${direction.dishType}`} element={<DishType />} />

          <Route path={`${direction.area}`} element={<Area />} />
          <Route path={`${direction.chat}`} element={<Chatbox />} />
          <Route path={`${direction.transaction}`} element={<Transaction />} />

          <Route path={`${direction.payment}`} element={<Payment />} />
          <Route path={`${direction.order}`} element={<Order />} />
          <Route path={`${direction.order}/:id`} element={<OrderTracking />} />
          <Route path={`${direction.session}`} element={<Session />} />
          <Route
            path={`${direction.session}/${direction.sessionCreating}/:sessionId`}
            element={<SessionCreating />}
          />

          <Route
            path={`${direction.session}/${direction.areaInSession}/:sessionId`}
            element={<ManageAreaInSession />}
          />
          <Route
            path={`${direction.session}/${direction.areaInSession}/:sessionId/${direction.manageChefInArea}/:areaId`}
            element={<ManageChefInArea />}
          />
          <Route
            path={`${direction.session}/${direction.areaInSession}/:sessionId/${direction.manageChefInArea}/:areaId/${direction.mealSessionInKitchen}/:kitchenId`}
            element={<ManageMealSessionInKitchen />}
          />

          <Route path="chatbox" element={<Chatbox />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
