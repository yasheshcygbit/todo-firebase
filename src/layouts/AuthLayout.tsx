import { Outlet } from "react-router-dom";
import AuthHeader from "../components/AuthHeader";
import AuthCheck from "../containers/AuthCheck";

function AuthLayout() {
  return (
    <AuthCheck>
      <div className="flex flex-1 flex-col ">
        <AuthHeader />
        <div className="main-wrapper flex flex-1 flex-col ">
          <Outlet />
        </div>
      </div>
    </AuthCheck>
  );
}

export default AuthLayout;
