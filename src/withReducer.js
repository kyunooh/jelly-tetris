import React from "react";
import PropTypes from "prop-types";

const withReducer = (key, reducer) => WrappedComponent => {
  const Extended = (props, context) => {
    context.store.injectReducer(key, reducer);
    return <WrappedComponent {...props} />;
  };

  Extended.contextTypes = {
    store: PropTypes.object
  };

  return Extended;
};

export { withReducer };
