import { useParams } from "react-router-dom";
import { ImageGrid } from "../../components";
import imagesStore from "../../stores/imagesStore";

export default function SearchResults() {
  const { images } = imagesStore;
  const { term } = useParams();

  const filteredImages = images.filter((image) => {
    const tags = image.tags.map(tag => tag.toLowerCase());
    return tags.includes((term as string).toLowerCase())
  }
  );

  return (
    <div className="flex flex-col gap-4 mt-4">
      <h1 className="self-center text-xl font-semibold tracking-normal">
        Search results for "{term}"
      </h1>

      {filteredImages.length === 0 ? (
        <h2 className="self-center text-lg font-semibold tracking-normal">
          Nothing Found
        </h2>
      ) : (
        <ImageGrid images={filteredImages} upload={false} />
      )}
    </div>
  );
}
