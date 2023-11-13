import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Table, Input, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
const ProductDetail = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [image, setImage] = useState([]);
  const [mainImg, setMainImg] = useState();
  const [revImg, setRevImg] = useState();
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setImage(data.images);
      });
  }, [id]);
  const { title, description, price, thumbnail } = data;

  return (
    <div className="w-full h-full p-4">
      <div className="account-search h-[10%] flex items-center  justify-end mb-3">
        <div className="h-[40%] add-btn flex justify-between items-center w-full">
          <h1>Product Settings</h1>
          <div>
            <Link to="/dashboard/product">
              <Button className="border-none mr-3">Cancel</Button>
            </Link>
            <Link to="accountCreating">
              <button className="btn rounded-xl py-3 bg-bgBtnColor">
                Update
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-white  p-4 rounded-lg ">
        <div className="flex justify-between">
          <div className="image flex items-center h-[60%] my-5">
            <div className="image-item grid gap-3">
              {image?.map((item, index) => (
                <img
                  src={item}
                  key={index}
                  className="w-[50px] h-[50px] rounded-xl shadow-lg border border-black cursor-pointer hover:border-red-400 hover:shadow "
                  onMouseEnter={() => setRevImg(item)}
                  onMouseLeave={() => setRevImg("")}
                ></img>
              ))}
            </div>
            <div className="main-image ml-4">
              <img
                src={revImg ? revImg : thumbnail}
                className="w-[450px] h-[280px] rounded-lg shadow-xl border opacity-0 animate-appear"
              ></img>
            </div>
          </div>

          <div className="information w-[50%]">
            <div className="infor-item mb-4">
              <label htmlFor="">Product Name</label>
              <Input className="mt-2 box__shadow"></Input>
            </div>
            <div className="infor-item flex justify-between mb-4">
              <div className="w-[45%]">
                <label htmlFor="">Chef</label>
                <Input className="mt-2 box__shadow"></Input>
              </div>
              <div className="w-[45%]">
                <label htmlFor="">Type</label>
                <Input className="mt-2 box__shadow"></Input>
              </div>
            </div>
            <div className="infor-item flex justify-between mb-4">
              <div className="w-[45%]">
                <label htmlFor="">Regular Price</label>
                <Input className="mt-2 box__shadow"></Input>
              </div>
              <div className="w-[45%]">
                <label htmlFor="">Sale Price</label>
                <Input className="mt-2 box__shadow"></Input>
              </div>
            </div>
            <div className="infor-item mb-4">
              <label htmlFor="">Schedule</label>
              <Input className="mt-2 box__shadow"></Input>
            </div>
            <div className="infor-item flex justify-between mb-4">
              <div className="w-[45%]">
                <label htmlFor="">Session</label>
                <Input className="mt-2 box__shadow"></Input>
              </div>
              <div className="w-[45%]">
                <label htmlFor="">Quantity In Stock</label>
                <Input
                  className="mt-2 box__shadow"
                  type="number"
                  placeholder="1"
                ></Input>
              </div>
            </div>
            <div className="infor-item flex justify-between mb-4">
              <div className="w-[100%]">
                <label htmlFor="">Description</label>
                <TextArea
                  className="mt-2 box__shadow"
                  value={description}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
