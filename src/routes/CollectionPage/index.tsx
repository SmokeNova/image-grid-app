import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ImageGrid } from "../../components";

export default function CollectionPage() {
    const { images } = useSelector((store: RootState) => store.collection);

  return (
    <div className="flex flex-col gap-4 mt-4">
      <h1 className="self-center text-xl font-semibold tracking-normal">
        Your Collection
      </h1>

      <ImageGrid images={images} upload={false} />
    </div>
  );
}
