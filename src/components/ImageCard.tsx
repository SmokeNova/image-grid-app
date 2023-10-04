import { Button, Image, Tooltip } from "@mantine/core";
import { DeleteIcon, DownloadIcon, PlusIcon, SettingsIcon } from "lucide-react";
import { useAppDispatch } from "../store";
import { deleteImage } from "../slices/imagesSlice";

export default function ImageCard({ id, url }: { id: string; url: string }) {
  const dispatch = useAppDispatch();

  return (
    <div className="w-full relative cursor-pointer card">
      <Image src={url} fallbackSrc="./fallback-image.jpg" />

      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10 hidden overlay">
        <div className="w-full h-full relative">
          <div className="flex gap-2 absolute top-3 right-3 z-100">
            <Button
              size="compact-lg"
              className="bg-slate-200 hover:bg-white text-slate-800 transition-normal"
              onClick={() => {}}
            >
              <SettingsIcon />
            </Button>
            <Tooltip label="Add to collection">
              <Button
                size="compact-lg"
                className="bg-slate-200 hover:bg-white text-slate-800 transition-normal"
                onClick={() => {}}
              >
                <PlusIcon />
              </Button>
            </Tooltip>
          </div>

          <Tooltip label="Download image">
            <Button
              size="compact-lg"
              className="absolute bottom-3 right-3 bg-slate-200 hover:bg-white text-slate-800 transition-normal"
              onClick={() => {}}
            >
              <DownloadIcon />
            </Button>
          </Tooltip>

          <Tooltip label="Delete image">
            <Button
              size="compact-lg"
              className="absolute bottom-3 left-3 bg-slate-200 hover:bg-white text-slate-800 transition-normal"
              onClick={() => dispatch(deleteImage(id))}
            >
              <DeleteIcon />
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
