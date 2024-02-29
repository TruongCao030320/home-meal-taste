import React, { useEffect, useState } from "react";
import image from "../../assets/images/headphone.jpg";
import image2 from "../../assets/images/watch.jpg";
import image3 from "../../assets/images/camera.jpg";
import ProductCard from "./child/ProductCard";
import { Input } from "antd";
import { FaSearch } from "react-icons/fa";
import { faker } from "@faker-js/faker";
const products = [
  {
    id: faker.string.uuid(),
    title: "Smart Headphone",
    image: image,
    description: "Description",
    price: 21,
    isLike: false,
  },
  {
    id: faker.string.uuid(),
    title: "Smart Watch",
    image: image2,
    description: "Description",
    price: 22,
    isLike: false,
  },
  {
    id: faker.string.uuid(),
    title: "Smart Camera",
    image: image3,
    description: "Description",
    price: 25,
    isLike: false,
  },
  {
    id: faker.string.uuid(),
    title: "Smart Headphone",
    image: image,
    description: "Description",
    price: 27,
    isLike: false,
  },
  {
    id: faker.string.uuid(),
    title: "Smart Watch",
    image: image2,
    description: "Description",
    price: 32,
    isLike: false,
  },
  {
    id: faker.string.uuid(),
    title: "Smart Camera",
    image: image3,
    description: "Description",
    price: 54,
    isLike: true,
  },
  {
    id: faker.string.uuid(),
    title: "Smart Headphone",
    image: image,
    description: "Description",
    price: 15,
    isLike: true,
  },
  {
    id: faker.string.uuid(),
    title: "Smart Watch",
    image: image2,
    description: "Description",
    price: 86,
    isLike: true,
  },
  {
    id: faker.string.uuid(),
    title: "Smart Camera",
    image: image3,
    description: "Description",
    price: 90,
    isLike: true,
  },
];
const ShopPage = () => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    let filteredData = products;
    if (search) {
      filteredData = products.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredData(filteredData);
  }, [search]);
  return (
    <div className="w-full flex flex-col items-center justify-center bg-white ">
      <h1 className="font-bold text-2xl my-10">Shop</h1>
      <div className="search-bar w-full lg:ml-[450px]">
        <Input
          prefix={<FaSearch />}
          className="w-[90%] ml-[30px] drop-shadow-2xl border-none border-blue-300 md:w-[50%] md:ml-[40px] lg:w-[30%]"
          placeholder="Enter product want to find...."
          onChange={(e) => {
            setSearch(e.target.value);
            console.log(e.target.value);
          }}
        />
      </div>
      <div className="grid grid-cols-1 gap-2 my-5 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3">
        {filteredData?.map((item) => (
          <ProductCard product={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
