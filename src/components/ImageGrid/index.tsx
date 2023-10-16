import { ImageCard, ImageUploader } from "../";
import { IImage } from "../../types";
import { observer } from "mobx-react-lite";

function ImageGrid({ images, upload = true }: { images: IImage[], upload?: boolean }) {

  return (
    <div className="flex flex-col gap-4 my-10">
      {upload && (
        <div className="self-center">
        <ImageUploader size="md" />
      </div>
      )}

      <div className="image-gallery max-lg:px-8 w-full max-w-7xl mx-auto">
        {images.map((image) => (
          <ImageCard key={image.id} {...image} />
        ))}
      </div>
    </div>
  );
}

export default observer(ImageGrid);
