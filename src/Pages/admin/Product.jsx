import React, { useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard";
import ProductList from "../../Components/ProductList";
import { Table } from "antd";
import { getAllMeal } from "../../API/Admin";
const Product = () => {
  return <ProductList />;
};

export default Product;
