import React from "react";
import PropTypes from "prop-types"
import withDynamicList from "../services/withDynamicList";
import RenderOptimize from "./RenderOptimize"


@withDynamicList
class RenderEvery extends React.Component {

  static propsTypes = {
    component: PropTypes.element
  };

  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    const { $list, component: Component, ...otherProps } = this.props;
    const dynamicItems = $list.form.getFieldValue($list.tempName);
    return dynamicItems.map((id) => (
      <RenderOptimize key={id}>
        <Component name={$list.name} index={id} $list={$list} {...otherProps} />
      </RenderOptimize>
    ));
  };

}
export default RenderEvery;