import React from "react";
import { Form, Input, Button, Row } from "antd";

class EveryItem extends React.Component {

  componentDidMount() {
    const { $list, name } = this.props;
    console.log($list.form.getFieldValue(name));
  };

  handleRemove = () => {
    const { $list, index } = this.props;
    $list.remove(index)
  };

  render() {
    const { $list, name, index } = this.props;
    const { form: { getFieldDecorator } } = $list;
    return (
      <Row type="flex" justify="space-around">
        <Form.Item label="type">
          {getFieldDecorator(`${name}[${index}][age]`, {
            rules: [{ required: true }]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="first">
          {getFieldDecorator(`${name}[${index}][first]`, {
            rules: [{ required: true }]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="last">
          {getFieldDecorator(`${name}[${index}][last]`, {
            rules: [{ required: true }]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label={<div />}>
          <Button onClick={this.handleRemove}>删除</Button>
        </Form.Item>
      </Row>)
  };

}
export default EveryItem