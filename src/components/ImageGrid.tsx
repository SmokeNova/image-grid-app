import { Loader } from "@mantine/core";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ImageCard, ImageUploader } from ".";

export default function ImageGrid({ filter }: { filter?: string }) {
  const { images, isLoading, hasFailed } = useSelector(
    (store: RootState) => store.images
  );

  if (isLoading) return <Loader />;
  if (hasFailed) return <div>Something went wrong!</div>;

  const results = filter
    ? images.filter((image) => image.tags.includes(filter))
    : images;

  const div1Images = [] as typeof images;
  const div2Images = [] as typeof images;
  const div3Images = [] as typeof images;

  results.forEach((image, index) => {
    switch (index % 3) {
      case 0:
        div1Images.push(image);
        break;
      case 1:
        div2Images.push(image);
        break;
      case 2:
        div3Images.push(image);
        break;
      default:
        break;
    }
  });

  return (
    <div className="flex flex-col gap-4 my-10">
      {!filter && (
        <div className="self-center">
          <ImageUploader size="md" />
        </div>
      )}

      <div className="flex flex-wrap justify-between max-base:px-4 w-full max-w-7xl mx-auto">
        <div className="flex flex-col gap-5 w-[410px] max-base:w-[300px] max-sm:w-full">
          {div1Images.map((image) => (
            <ImageCard
              key={image.id}
              id={image.id}
              url={image.url}
              tags={image.tags}
            />
          ))}
        </div>

        <div className="flex flex-col gap-5 w-[410px] max-base:w-[300px] max-sm:w-full">
          {div2Images.map((image) => (
            <ImageCard
              key={image.id}
              id={image.id}
              url={image.url}
              tags={image.tags}
            />
          ))}
        </div>

        <div className="flex flex-col gap-5 w-[410px] max-base:w-[300px] max-sm:w-full">
          {div3Images.map((image) => (
            <ImageCard
              key={image.id}
              id={image.id}
              url={image.url}
              tags={image.tags}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
