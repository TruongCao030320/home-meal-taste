import { Layout, List, Avatar, Input, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import avt01 from "../../assets/images/avatar01.png";
const scrollInfor = () => {
  const [active, setActive] = useState(null);
  const [search, setSearch] = useState("");
  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];

  return (
    <div className="bg-bgBtnColor p-4 w-[100%] rounded-tr-3xl rounded-br-3xl">
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item
            className={`hover:bg-white hover:cursor-pointer rounded-3xl duration-500 transition-all ${
              active == index ? "bg-white" : ""
            }`}
            onClick={() => setActive(index)}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                />
              }
              title={<a href="#">{item.title}</a>}
              description="Ant Design, a design..."
            />
          </List.Item>
        )}
      />
    </div>
  );
};
const chatPeople = [
  {
    avt: avt01,
    name: "Tuanung",
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, veritatis!",
  },
  {
    avt: avt01,
    name: "Tuanung",
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, veritatis!",
  },
  {
    avt: avt01,
    name: "Tuanung",
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, veritatis!",
  },
  {
    avt: avt01,
    name: "Tuanung",
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, veritatis!",
  },
  {
    avt: avt01,
    name: "Tuanung",
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, veritatis!",
  },
];
const chatTag = (item, index) => {
  const isEven = index % 2 == 0;
  return (
    <div className={`w-full flex ${isEven ? "justify-start" : "justify-end"}`}>
      <div
        className={`w-[40%] flex justify-between items-center ${
          isEven ? "" : "flex-row-reverse"
        }`}
      >
        <div className="w-[20%] flex justify-center items-center">
          <img src={item.avt} className="w-[50px] h-[50px] rounded-full"></img>
        </div>
        <div className="w-[90%]">
          <h1 className="text-[15px]">{item.name}</h1>
          <p className="text-bgColorBtn p-2 bg-blue-100 rounded-lg">
            {item.title}
          </p>
        </div>
      </div>
    </div>
  );
};
const Chatbox = () => {
  return (
    <div className="w-full h-full p-4 bg-colorBg rounded-lg">
      <Layout className="">
        <Sider className="customSider !bg-white rounded-3xl">
          {scrollInfor()}
        </Sider>
        <Content className="customContent !bg-white p-4 h-full w-full rounded-3xl">
          <div className=" w-[20%]">
            <div className="my-2">
              <h2 className="mb-1">Search</h2>
              <Input className="box__shadow" />
            </div>
          </div>
          <div className="h-full w-full bg-colorBg p-4 rounded-lg">
            <div className="border-b-2 py-1">
              <h1>Truong Cao</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Corrupti, obcaecati.
              </p>
            </div>
            <div className="min-h-[500px] w-full bg-white rounded-lg p-4">
              {chatPeople.map((item, index) => chatTag(item, index))}
            </div>
            <div className="w-full flex justify-between items-center border-t-2 p-2">
              <TextArea
                placeholder="Type a message here!"
                className="w-[95%] border-none outline-none focus:!outline-none bg-colorBg focus:!border-none active:!outline-none focus:!shadow-none"
              ></TextArea>
              <Button className="rounded-full p-2">
                <BsFillSendFill />
              </Button>
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  );
};
export default Chatbox;
