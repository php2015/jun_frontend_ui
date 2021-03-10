import React from "react";
import PropTypes from "prop-types"
import withDynamicList from "../services/withDynamicList";


@withDynamicList
class CreateDynamic extends React.Component {

  static propsTypes = {
    component: PropTypes.element
  };

  handleInsert = () => {
    const { $list } = this.props;
    $list.insert();
  };

  render() {
    const { $list, component: Component, ...otherProps } = this.props;
    if (Component) {
      return <Component $list={$list} {...otherProps} />
    };
    return (
      <button type="button" onClick={this.handleInsert}>
        新增动态项
      </button>)
  };

};
export default CreateDynamic;