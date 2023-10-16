import { ImageGrid } from "../../components";
import { observer } from "mobx-react-lite";
import collectionStore from "../../stores/collectionStore";

function CollectionPage() {
  const { images } = collectionStore;

  return (
    <div className="flex flex-col gap-4 mt-4">
      <h1 className="self-center text-xl font-semibold tracking-normal">
        Your Collection
      </h1>

      <ImageGrid images={images} upload={false} />
    </div>
  );
}

export default observer(CollectionPage);
