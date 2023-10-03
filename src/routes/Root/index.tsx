import { Outlet } from "react-router-dom";
import { Navbar } from "../../components";

export default function Root() {
  return (
    <div className="w-screen min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}
