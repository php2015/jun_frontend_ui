import React, { useState, useCallback } from "react";
import moment from "moment";
import { Button } from "antd";

window.arr = [];

window.renderToken = {

};

// 每次更新后hook函数都会重新运行,产生一个新的函数作用域

export default function TestCount(props) {
  const [count, setCount] = useState(60);
  const token = moment().toDate().getTime();
  window.renderToken[token] = count;
  // 使用useCallback后每次刷新handleClick就不会被重新定义了
  const handleClick = useCallback(() => {
    let cloneCount = count;
    setInterval(() => {
      console.log("定时器中的token是=>", token);
      cloneCount = cloneCount - 1;
      setCount(cloneCount);
    }, 1000);
  }, []);

  window.arr.push(handleClick);

  return (
    <Button type="primary" onClick={handleClick}>
      {`总计${count}秒`}
    </Button>)
};