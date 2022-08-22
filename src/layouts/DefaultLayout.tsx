import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import AuthCheck from "../containers/AuthCheck";

function DefaultLayout() {
  return (
    <AuthCheck>
      <div className="flex flex-1 flex-col ">
        <DashboardHeader />
        <div className="">
          <Outlet />
        </div>
      </div>
    </AuthCheck>
  );
}

export default DefaultLayout;
