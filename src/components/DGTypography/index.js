import { forwardRef } from "react";
import DGTypographyRoot from "./DBTypographyRoot";

const DGTypography = forwardRef(({ type, children, ...rest }, ref) => {
  const color = type === "error" ? "error" : "text";
  return (
    <DGTypographyRoot 
      fontSize="24px" 
      ref={ref}
      color = {color}
      {...rest} 
    >
      {children}
    </DGTypographyRoot>
  );
});

export default DGTypography;
