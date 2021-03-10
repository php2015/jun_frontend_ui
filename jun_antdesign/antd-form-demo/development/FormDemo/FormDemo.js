import React from "react";
import { Form, Button } from "antd";

import { DynamicList, CreateDynamic, RenderEvery } from "@/utils/DynamicList";

import EveryItem from "./EveryItem";

@Form.create({ name: "FormDemo" })
class FormDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  };

  handleSubmit = async () => {
    const { form } = this.props;
    const result = await form.validateFields();
    console.log(result);
  };


  render() {
    const { form } = this.props;
    return (
      <Form style={{ width: 1000, margin: "0px auto" }}>
        <Form.Item label="name" required wrapperCol={{ offset: 2 }}>
          <DynamicList name="collection" form={form}>
            <CreateDynamic />
            <RenderEvery component={EveryItem} />
          </DynamicList>
        </Form.Item>


        <Form.Item>
          <Button onClick={this.handleSubmit}>提交</Button>
        </Form.Item>
      </Form>)
  };

}
export default FormDemo