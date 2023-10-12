import { Loader } from "@mantine/core";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { HeroSection, ImageGrid } from "../../components";

export default function Homepage() {
  const { images, isLoading, hasFailed } = useSelector(
    (store: RootState) => store.images
  );

  if (isLoading) return <Loader />;
  if (hasFailed)
    return (
      <div className="flex items-center justify-center w-full h-[80vh]">
        <p className="text-slate-700 text-2xl font-semibold">
          Something went wrong. Please check your internet connection and try
          again.
        </p>
      </div>
    );

  return (
    <>
      <HeroSection />
      <ImageGrid images={images} />
    </>
  );
}
