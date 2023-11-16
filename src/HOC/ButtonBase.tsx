import React from "react";
import ButtonBase from "@mui/material/ButtonBase";

const withRipple = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    return (
      <ButtonBase
        style={{ width: "100%" }}
        TouchRippleProps={{ center: true }}
        onClick={props.onClick}
      >
        <WrappedComponent {...props} />
      </ButtonBase>
    );
  };
};

export default withRipple;
