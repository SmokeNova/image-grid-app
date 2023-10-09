import { useState } from "react";
import { Button, Image, TagsInput, Modal } from "@mantine/core";
import { useAppDispatch } from "../store";
import { deleteImage, addTagToImage, addImageToCollection, removeImageFromCollection } from "../slices/imagesSlice";
import { IImage } from "../types";
import { addToCollection, removeFromCollection } from "../slices/collectionSlice";
import { CardOverlay } from ".";
import { useLocation } from "react-router-dom";

export default function ImageCard(props: IImage) {
  const { id, url, tags, addedToCollection } = props;
  const [opened, setOpened] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const addFn = () => {
    if (addedToCollection) {
      dispatch(removeImageFromCollection(id));
      dispatch(removeFromCollection(id));
    } else {
      dispatch(addImageToCollection(id));
      dispatch(addToCollection(props));
    }
  };
  const settingsFn = () => {};
  const downloadFn = () => {
    const link = document.createElement("a");
    link.href = url;
    link.target = "main";
    link.download = "image";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const deleteFn = () => setOpened(true);

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="w-full relative cursor-pointer card">
        <Image src={url} fallbackSrc="./fallback-image.jpg" />

        <CardOverlay
          addedToCollection={addedToCollection}
          addFn={addFn}
          deleteFn={deleteFn}
          downloadFn={downloadFn}
          settingsFn={settingsFn}
        />
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
                pathname === "/collection" ? addFn() : dispatch(deleteImage(id))
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
