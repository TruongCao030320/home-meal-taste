import React, { useEffect } from "react";
import { useState } from "react";
import buncha from "../assets/images/buncha.png";
import { Button, Input, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import { toast } from "react-toastify";
const RightTagProduct = ({ toggleRef, toggleRef2 }) => {
  const [hidden, setHidden] = useState(true);
  const [mainImage, setMainImage] = useState();
  const [value, setValue] = useState(1);
  const [product, setProduct] = useState({});
  const { thumbnail, title, price, description, images } = product || {};
  console.log(images);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const toggle = () => {
    if (toggleRef.current) {
      toggleRef.current.classList.toggle("hidden");
      toggleRef2.current.classList.toggle("hidden");
    }
  };
  const saveProduct = () => {
    console.log("hehe");
    toast.success("Update status successfully.");
    toggle();
  };
  useEffect(() => {
    fetch("https://dummyjson.com/products/1")
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  return (
    <div>
      {" "}
      <div
        className={`coverTag fixed w-full h-full bg-black left-0 right-0 z-[9998] top-0 opacity-30 hidden
        }`}
        onClick={toggle}
        ref={toggleRef2}
      ></div>
      <div
        className="detailProduct w-[25%] h-full bg-white fixed right-0 top-0 z-[9999] p-1  animate-skewRightTag hidden"
        ref={toggleRef}
      >
        <div className="h-[10%]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer hover:text-blue-400"
            onClick={toggle}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <form action="" className="p-5 grid gap-5 h-[90vh] overflow-auto">
          <div className="form-item">
            <img
              src={mainImage ? mainImage : thumbnail}
              alt=""
              className="rounded-lg shadow-md mb-3 w-[350px] h-[200px]"
            />
            <div className="flex justify-between">
              {images?.map((item, index) => (
                <img
                  className="w-[50px] h-[50px] max-h-[50px] rounded-lg hover:cursor-pointer hover:animate-wiggle hover:shadow-md"
                  src={item}
                  key={index}
                  onMouseEnter={() => setMainImage(item)}
                ></img>
              ))}
            </div>
          </div>
          <div className="form-item">
            <label htmlFor="">Title</label>
            <Input className="my-2" value={title} disabled />
          </div>

          <div className="form-item ">
            <label htmlFor="">Price</label>
            <Input className="my-2" value={price} disabled />
          </div>
          <div className="form-item  ">
            <label htmlFor="">Selling quantity</label>
            <Input
              className="my-2"
              type="number"
              min={1}
              max={8}
              defaultValue={1}
              disabled
            />
          </div>
          <div className="form-item">
            <label htmlFor="">Chef</label>
            <Input className="my-2" disabled />
          </div>
          <div className="form-item">
            <label htmlFor="">Description</label>
            <TextArea className="" value={description} disabled />
          </div>
          <div className="form-item">
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>Accept</Radio>
              <Radio value={2}>Reject</Radio>
            </Radio.Group>
          </div>
          <div className="form-item">
            <Button className="w-full" onClick={saveProduct}>
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RightTagProduct;
