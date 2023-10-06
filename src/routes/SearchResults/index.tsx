import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ImageGrid } from "../../components";

export default function SearchResults() {
  const { images } = useSelector((store: RootState) => store.images);
  const { term } = useParams();

  const filteredImages = images.filter((image) =>
    image.tags.includes((term as string).toLowerCase())
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
        <ImageGrid images={filteredImages} />
      )}
    </div>
  );
}
