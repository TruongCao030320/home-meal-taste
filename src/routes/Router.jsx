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
const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/error" element={<ErrorPage />}></Route>
        <Route path="/dashboard/" element={<Dashboard />}>
          <Route path="" element={<DashboardPage />} />
          <Route path="account" element={<Account />} />
          <Route path="kitchen" element={<Kitchen />} />
          <Route path="kitchen/:id" element={<KitchenDetail />} />
          <Route path="kitchen/productCreating" element={<ProductCreating />} />
          <Route path="account/accountCreating" element={<AccountCreating />} />
          <Route path="account/:id" element={<AccountDetail />} />
          <Route path="admin/:id" element={<AdminProfile />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="product" element={<Product />} />
          <Route path="session" element={<Session />} />
          <Route path="payment" element={<Payment />} />
          <Route path="order" element={<Order />} />
          <Route path="order/:id" element={<OrderTracking />} />

          <Route path="chatbox" element={<Chatbox />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
