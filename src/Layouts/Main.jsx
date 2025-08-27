import { Outlet } from "react-router";

const Main = () => {
  return (
    <div className="bg-[#E5E5E5]">
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
