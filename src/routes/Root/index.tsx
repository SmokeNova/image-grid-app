import { Outlet } from "react-router-dom";
import { Navbar } from "../../components";
import { useEffect } from "react";
import { fetchImages } from "../../slices/imagesSlice";
import { useAppDispatch } from "../../store";

export default function Root() {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchImages());
  }, []);

  return (
    <div className="w-screen min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}
