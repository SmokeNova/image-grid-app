import { useParams } from "react-router-dom";
import { ImageGrid } from "../../components";

export default function SearchResults() {
  const { term } = useParams();

  return (
    <div className="flex flex-col gap-4 mt-4">
      <h1 className="self-center text-xl font-semibold tracking-normal">
        Search results for "{term}"
      </h1>
      <ImageGrid filter={term?.toLowerCase()} />
    </div>
  );
}
