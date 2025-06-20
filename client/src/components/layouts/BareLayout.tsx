// components/layouts/BareLayout.tsx
import { Outlet } from "react-router-dom";

const BareLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default BareLayout;
