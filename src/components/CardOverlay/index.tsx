import { Button, Tooltip } from "@mantine/core";
import { DeleteIcon, DownloadIcon, PlusIcon, CheckIcon } from "lucide-react";

interface CardOverlayProps {
  addedToCollection: boolean;
  addFn: () => void;
  sizeMenu: JSX.Element;
  downloadFn: () => void;
  deleteFn: () => void;
}

export default function CardOverlay(props: CardOverlayProps) {
  const { addedToCollection, addFn, deleteFn, downloadFn, sizeMenu } = props;

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10 hidden overlay">
      <div className="w-full h-full relative">
        <div className="flex gap-2 absolute top-3 right-3 z-100">
          <div className="relative">{sizeMenu}</div>
          <Tooltip
            label={
              addedToCollection ? "Added to collection" : "Add to collection"
            }
          >
            <Button
              size="compact-lg"
              className="bg-slate-200 hover:bg-white text-slate-800 transition-normal"
              onClick={addFn}
            >
              {addedToCollection ? <CheckIcon /> : <PlusIcon />}
            </Button>
          </Tooltip>
        </div>

        <Tooltip label="Download image">
          <Button
            size="compact-lg"
            className="absolute bottom-3 right-3 bg-slate-200 hover:bg-white text-slate-800 transition-normal"
            onClick={downloadFn}
          >
            <DownloadIcon />
          </Button>
        </Tooltip>

        <Tooltip label="Delete image">
          <Button
            size="compact-lg"
            className="absolute bottom-3 left-3 bg-slate-200 hover:bg-white text-slate-800 transition-normal"
            onClick={deleteFn}
          >
            <DeleteIcon />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
