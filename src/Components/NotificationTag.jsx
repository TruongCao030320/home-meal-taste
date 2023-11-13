import React from "react";
import avt from "../assets/images/avatar01.png";
import { toast } from "react-toastify";
import { List, Avatar } from "antd";
const NotificationTag = ({ tag }) => {
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
  const { title, timeStamp, description } = tag;
  return (
    // <div className="flex flex-col items-start px-2 hover:cursor-pointer hover:bg-slate-300">
    //   <h1 className="font-semibold top-0 text-[15px]">{title}</h1>
    //   <div className="w-full text-start">
    //     <p className="leading-5">{description.slice(0, 70)}...</p>
    //   </div>
    //   <div className="w-full leading-5 text-end">{timeStamp}</div>
    // </div>
    <div>
      <List
        className="p-4"
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default NotificationTag;
