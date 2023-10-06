import { useState } from "react";
import { Button, Image, Tooltip, TagsInput, Modal } from "@mantine/core";
import { DeleteIcon, DownloadIcon, PlusIcon, SettingsIcon, CheckIcon} from "lucide-react";
import { useAppDispatch } from "../store";
import { deleteImage, addTagToImage, addImageToCollection, removeImageFromCollection } from "../slices/imagesSlice";
import { IImage } from "../types";
import { addToCollection, removeFromCollection } from "../slices/collectionSlice";

export default function ImageCard(props: IImage) {
  const { id, url, tags, addedToCollection } = props;
  const [opened, setOpened] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <div className="w-full flex flex-col gap-1">
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
              <Tooltip label={addedToCollection ? "Added to collection" : "Add to collection"}>
                <Button
                  size="compact-lg"
                  className="bg-slate-200 hover:bg-white text-slate-800 transition-normal"
                  onClick={() => {
                    if (addedToCollection) {
                      dispatch(removeImageFromCollection(id));
                      dispatch(removeFromCollection(id));
                    } else {
                      dispatch(addImageToCollection(id));
                      dispatch(addToCollection(props));
                    }
                  }}
                >
                  {addedToCollection ? <CheckIcon /> : <PlusIcon />}
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
                onClick={() => setOpened(true)}
              >
                <DeleteIcon />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>

      <TagsInput
        label="tags"
        placeholder="Add tags"
        maxTags={5}
        value={tags}
        onChange={(tags) => dispatch(addTagToImage({ id, tags }))}
      />

      <Modal opened={opened} onClose={() => setOpened(false)} centered>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold self-center">Are you sure?</h2>
          <div className="self-center flex gap-2 text-white">
            <Button
              size="md"
              className="bg-red-600"
              onClick={() => {
                dispatch(deleteImage(id));
                setOpened(false);
              }}
            >
              Delete
            </Button>
            <Button
              size="md"
              className="bg-slate-500"
              onClick={() => setOpened(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
