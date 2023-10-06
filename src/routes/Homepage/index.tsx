import { Loader } from "@mantine/core";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { HeroSection, ImageGrid } from "../../components";

export default function Homepage() {
  const { images, isLoading, hasFailed } = useSelector(
    (store: RootState) => store.images
  );

  if (isLoading) return <Loader />;
  if (hasFailed) return <div>Something went wrong!</div>;

  return (
    <>
      <HeroSection />
      <ImageGrid images={images} />
    </>
  );
}
