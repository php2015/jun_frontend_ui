import React from "react"
import hoistNonReactStatics from "hoist-non-react-statics";

import DynamicListContext from "./DynamicListContext";

export default function withDynamicList(SourceComponent) {
  function TargetComponent(props, ref) {
    return (
      <DynamicListContext.Consumer>
        {(context) => (<SourceComponent {...props} $list={context} ref={ref} />)}
      </DynamicListContext.Consumer>)
  }
  hoistNonReactStatics(SourceComponent, TargetComponent)
  return React.forwardRef(TargetComponent)
};