import React from "react";
import uuidv4 from "uuid/v4";

import comboItems from "../utils/comboItems";
import mapValueToState from "../utils/mapValueToState";
import DynamicListContext from "../services/DynamicListContext";



class DynamicList extends React.Component {

  static defaultProps = {
    form: {}
  };

  constructor(props) {
    super(props);
    this.id = 0;
    this.state = {};
  };

  getDynamicListContext = () => ({

    form: (() => {
      const { form } = this.props;
      return form;
    })(),

    name: (() => {
      const { name } = this.props;
      return name;
    })(),

    tempName: (() => {
      const { name } = this.props;
      return `${name}-temp`;
    })(),

    insert: () => {
      const { form, name } = this.props;
      const nameArray = form.getFieldValue(`${name}-temp`);
      form.setFieldsValue({
        [`${name}-temp`]: nameArray.concat(this.id++)
      });
    },

    remove: (index) => {
      const { form, name } = this.props;
      const keys = form.getFieldValue(`${name}-temp`);
      form.setFieldsValue({
        [`${name}-temp`]: keys.filter(key => key !== index),
      });
      console.log(form.getFieldValue(name));
    }

  });

  render() {
    const { form, name, children } = this.props;
    form.getFieldDecorator(`${name}-temp`, { initialValue: [] });
    if (children instanceof Function) {
      const { keysArray } = form.getFieldValue(`${name}-temp`);
      return children(keysArray)
    };
    return (
      <DynamicListContext.Provider value={this.getDynamicListContext()}>
        {children}
      </DynamicListContext.Provider>)
  };
};

export default DynamicList;

/*
  <DynamicList value={} onChange={}>
    {()=>{

    }}
  </DynamicList>
 */