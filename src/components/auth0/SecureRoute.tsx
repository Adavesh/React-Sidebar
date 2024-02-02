import React from "react";

import { withAuthenticationRequired, type WithAuthenticationRequiredOptions } from "@auth0/auth0-react";

const SecureRoute = ({
  component,
  ...args
}: WithAuthenticationRequiredOptions & {
  component: React.ComponentType<object>;
}) => {
  const Component = withAuthenticationRequired(component, args);

  return <Component />;
};

export default SecureRoute;
