import React from "react";
import { Button } from "antd";


export default function TestFunction(props) {

  const handleClick = () => {
    // console.log("当前数组=>", window.arr);

    // window.arr.forEach((current, index) => {
    //   // 得出的结论是,每个setAction都是一样的,所以stateHook是不会被重复定义
    //   if (index >= 1) {
    //     console.log(current === window.arr[index - 1])
    //   };
    // });
    console.log(window.renderToken);

  };

  return (
    <Button onClick={handleClick}>
      比较数组每一项
    </Button>)
};