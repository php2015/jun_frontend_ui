import React from "react"
import hoistNonReactStatics from "hoist-non-react-statics";

import withDynamicList from "./withDynamicList";

export default function withOptimize(config = { id: "tempId" }) {
  return function RenderOptimize(SourceComponent) {
    @withDynamicList
    class TargetComponent extends React.PureComponent {

      // shouldComponentUpdate(nextProps) {
      //   const { $list } = nextProps;
      //   return nextProps[config.id] === $list.currentChangeId;
      // };

      render() {
        const { $list } = this.props;
        return <SourceComponent $list={$list} {...this.props} />;
      };
    };
    hoistNonReactStatics(SourceComponent, TargetComponent);
    return TargetComponent;
  };
};





