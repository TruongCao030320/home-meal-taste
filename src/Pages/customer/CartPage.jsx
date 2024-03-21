import { faDeleteLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ConfigProvider, Drawer, Table } from "antd";
import React from "react";
import CartDrawer from "./CartDrawer";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllItems, removeItem } from "../../redux/productCart";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.productSlice) || [];
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  const columns = [
    {
      title: <h1>Product</h1>,
      dataIndex: "title",
      key: "name",
      render: (text) => {
        return <h1>{text}</h1>;
      },
    },
    {
      title: <h1>Price</h1>,
      dataIndex: "price",
      render: (text) => {
        return <h1>${text}</h1>;
      },
    },
    {
      title: <h1>Quantity</h1>,
      width: 200,
      dataIndex: "quantity",
      render: (text) => {
        return <h1>${text}</h1>;
      },
    },
    {
      title: "",
      render: (record) => (
        <div>
          <FontAwesomeIcon
            icon={faTrash}
            className="cursor-pointer hover:text-red-400"
            onClick={() => {
              console.log("record", record);
              dispatch(removeItem(record));
            }}
          />
        </div>
      ),
    },
  ];
  return (
    <div className="w-full flex justify-center items-center mt-36 flex-col">
      <h1 className="font-extrabold my-10">Your Cart</h1>
      <div className="bg-white w-full min-h-[300px] flex flex-col gap-4 p-4 justify-around lg:flex lg:flex-row">
        <div className="lg:w-[70%] w-full md:w-full">
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  headerBg: "white",
                },
              },
            }}
          >
            <Table
              columns={columns}
              dataSource={cartItems}
              footer={() => (
                <div className="w-full flex justify-end">
                  <Button
                    className="border-none bg-[#D4B19E]"
                    onClick={() => {
                      dispatch(deleteAllItems());
                    }}
                  >
                    Delete All
                  </Button>
                </div>
              )}
            ></Table>
          </ConfigProvider>
        </div>
        <div className="lg:w-[25%] p-4 border-2 rounded-2xl drop-shadow-lg w-full">
          <h1 className="border-b-2 border-black">Cart Totals:</h1>
          <h1 className="my-10">Check out: ${totalPrice}</h1>
          <PayPalScriptProvider options={{ clientId: "test" }}>
            <PayPalButtons style={{ layout: "horizontal" }} />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
