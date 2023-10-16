import { Loader } from "@mantine/core";
import { HeroSection, ImageGrid } from "../../components";
import imagesStore from "../../stores/imagesStore";
import { observer } from "mobx-react-lite";

function Homepage() {
  const { images, isLoading, hasFailed } = imagesStore;

  if (isLoading) return <Loader />;
  if (hasFailed) {
    return (
      <div className="flex items-center justify-center w-full h-[80vh]">
        <p className="text-slate-700 text-2xl font-semibold">
          Something went wrong. Please check your internet connection and try
          again.
        </p>
      </div>
    );
  }

  return (
    <>
      <HeroSection />
      <ImageGrid images={images} />
    </>
  );
}

export default observer(Homepage);
