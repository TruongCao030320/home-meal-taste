import React, { useEffect, useState } from "react";
import image from "../../assets/images/headphone.jpg";
import image2 from "../../assets/images/watch.jpg";
import image3 from "../../assets/images/camera.jpg";
import ProductCard from "./child/ProductCard";
import { Dropdown, Empty, Input, Pagination, Select } from "antd";
import { FaSearch } from "react-icons/fa";
import { da, faker } from "@faker-js/faker";
import {
  getAllCategories,
  getAllProducts,
  getAllProductsLimit,
} from "../../API/newApi";
import { useQuery } from "@tanstack/react-query";
const ShopPage = () => {
  const [search, setSearch] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedOther, setSelectedOther] = useState();
  const [products, setProducts] = useState([]);

  const handleSelectCategory = (value) => {
    console.log(value);
    setSelectedCategory(value);
  };
  const handleSelectOther = (value) => {
    console.log(value);
    setSelectedOther(value);
  };
  const totalPages = Math.ceil(
    filteredData.length ? filteredData.length / 8 : products.length / 8
  );

  useEffect(() => {
    getAllProducts().then((res) => {
      setProducts(res.products);
      setFilteredData(res.products);
    });
    getAllCategories().then((res) => {
      setCategories(res);
    });
  }, []);
  useEffect(() => {
    let filteredData = products || [];
    if (search) {
      filteredData = filteredData.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    // if (page) {
    //   filteredData = filteredData.splice(page, page + 8);
    // }
    if (selectedCategory) {
      filteredData = filteredData.filter((item) =>
        item.category.includes(selectedCategory)
      );
    }
    if (selectedOther) {
      if (selectedOther === 3) {
        filteredData = filteredData.sort((a, b) => a.price - b.price);
      } else if (selectedOther === 4) {
        filteredData = filteredData.sort((a, b) => b.price - a.price);
      }
    }
    setFilteredData(filteredData);
  }, [search, page, selectedCategory, selectedOther]);
  return (
    <div className="w-full flex flex-col items-center justify-around bg-white">
      <h1 className="font-bold text-2xl mt-32 mb-16">Shop</h1>
      <div className="search-bar w-full flex justify-center gap-4 items-center">
        <Input
          prefix={<FaSearch />}
          className="w-[90%] ml-[30px]  border-none border-blue-300 md:w-[50%] md:ml-[40px] lg:w-[30%]"
          style={{
            boxShadow: "0 0 10px #F8DFEC",
          }}
          placeholder="Enter product want to find...."
          onChange={(e) => {
            setSearch(e.target.value);
            console.log(e.target.value);
          }}
        />
        <Select
          className="min-w-[150px]  h-full"
          placeholder="Categories"
          options={categories?.map((item) => ({
            value: item,
            label: item,
          }))}
          onChange={handleSelectCategory}
        ></Select>
        <Select
          className="min-w-[150px]  h-full"
          placeholder="Others"
          options={[
            {
              value: 1,
              label: "A-Z",
            },
            {
              value: 2,
              label: "Z-A",
            },
            {
              value: 3,
              label: "Highest Price",
            },
            {
              value: 4,
              label: "Lowest Price",
            },
          ]}
          onChange={handleSelectOther}
        ></Select>
      </div>
      <div className="grid grid-cols-1 gap-2 my-5 md:grid md:grid-cols-2 lg:grid lg:grid-cols-4 p-4">
        {products?.length > 0 ? (
          filteredData?.map((item) => (
            <ProductCard product={item} key={item.id} />
          ))
        ) : (
          <div className="w-[98vw] h-[500px] flex justify-center items-center bg-gray-100 rounded-sm">
            <Empty />
          </div>
        )}
      </div>
      {/* {products.length > 0 && (
        <Pagination
          current={page}
          className="my-5"
          total={16}
          pageSize={8}
          // item per page
          onChange={(page) => {
            setPage(page);
          }}
        />
      )} */}
    </div>
  );
};

export default ShopPage;
