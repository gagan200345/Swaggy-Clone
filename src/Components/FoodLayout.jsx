import { Outlet } from "react-router-dom";
import Prohead from "./Prohead";

function FoodLayout() {
  return (
    <>
      <Prohead />
      <Outlet />
    </>
  );
}

export default FoodLayout;