import React from "react";
import image1 from "../../../assets/images/filter&discovering.png";
import image2 from "../../../assets/images/addtobag.png";
import image3 from "../../../assets/images/fashshipping.png";
import image4 from "../../../assets/images/enjoyproduct.png";

const TrackingCard = () => {
  return (
    <div className="grid grid-cols-1 lg:flex lg:flex-row lg:justify-around md:grid md:grid-cols-2 gap-4">
      <div className="flex flex-col justify-center items-center">
        <img
          src={image1}
          alt=""
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="text-white">Step 1</div>
        <h1 className="text-white">Filter & Discover</h1>
        <p className="text-white">
          Smart filtering and suggestions make it easy to find
        </p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <img
          src={image2}
          alt=""
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="text-white">Step 2</div>
        <h1 className="text-white">Add to bag</h1>
        <p className="text-white">
          Easily select the correct items and add them to the cart
        </p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <img
          src={image3}
          alt=""
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="text-white">Step 3</div>
        <h1 className="text-white">Fast Shipping</h1>
        <p className="text-white">
          The carrier will confirm and ship quickly to you
        </p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <img
          src={image4}
          alt=""
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="text-white">Step 4</div>
        <h1 className="text-white">Enjoy the product</h1>
        <p className="text-white">
          Have fun and enjoy your 5-star quality products
        </p>
      </div>
    </div>
  );
};

export default TrackingCard;
