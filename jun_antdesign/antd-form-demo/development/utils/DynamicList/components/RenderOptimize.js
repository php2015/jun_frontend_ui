import React from "react";
import withDynamicList from "../services/withDynamicList";


class RenderOptimize extends React.PureComponent {

  // shouldComponentUpdate(nextProps) {
  //   const { currentId, currentChangeId } = nextProps;
  //   return currentId === currentChangeId;
  // };

  render() {
    const { children } = this.props;
    return children;
  };

}
export default RenderOptimize;