import { Outlet } from "react-router-dom";
import { Navbar } from "../../components";
import { useEffect } from "react";
import imagesStore from "../../stores/imagesStore";

export default function Root() {
  
  useEffect(() => {
    imagesStore.fetchImages();
  }, []);

  return (
    <div className="w-screen min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}
