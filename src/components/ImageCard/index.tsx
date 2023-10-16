import { useState, useEffect } from "react";
import { observer } from 'mobx-react-lite';
import { Button, Image, TagsInput, Modal } from "@mantine/core";
import { useResizeObserver } from "@mantine/hooks";
import imagesStore from "../../stores/imagesStore";
import collectionStore from "../../stores/collectionStore";
import { IImage } from "../../types";
import { CardOverlay, SizeMenu } from "../";
import { useLocation } from "react-router-dom";
import { calculateRows } from "../../utils";

function ImageCard(props: IImage) {
  const { id, url, tags, addedToCollection, width, height } = props;
  const [opened, setOpened] = useState(false);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState<1 | 2 | 3>(1);
  const [ref, { width: divWidth }] = useResizeObserver();
  const { pathname } = useLocation();

  useEffect(() => {
    if (divWidth != 0) {
      setRows(() => calculateRows(width, height, divWidth));
    };
    if (divWidth <= 1030 && divWidth > 760 && cols == 3) {
      setCols(2);
    }
    if (divWidth <= 760 && cols > 1) {
      setCols(1);
    }
  }, [divWidth]);

  const addFn = () => {
    if (addedToCollection) {
      imagesStore.removeImageFromCollection(id);
      collectionStore.removeFromCollection(id);
    } else {
      imagesStore.addImageToCollection(id);
      collectionStore.addToCollection(props);
    }
  };
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
    <div ref={ref} className="w-full flex flex-col gap-1" style={{ gridRow: `span ${rows}`, overflow: "hidden", gridColumn: `span ${cols}`} }>
      {rows != 0 ? (
        <>
        <div className="w-full relative cursor-pointer card">
        <Image src={url} fallbackSrc="./fallback-image.jpg" />

        <CardOverlay
          addedToCollection={addedToCollection}
          addFn={addFn}
          deleteFn={deleteFn}
          downloadFn={downloadFn}
          sizeMenu={<SizeMenu setCols={setCols} />}
        />
      </div>

      <TagsInput
        label="tags"
        placeholder="Add tags"
        maxTags={5}
        value={tags}
        onChange={(tags) => {
          if (addedToCollection) {
            collectionStore.addTagToAddedImage({ id, tags })
          }
          imagesStore.addTagToImage({ id, tags });
        }}
      />

      <Modal opened={opened} onClose={() => setOpened(false)} centered>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold self-center">Are you sure?</h2>
          <div className="self-center flex gap-2 text-white">
            <Button
              size="md"
              className="bg-red-600"
              onClick={() => {
                pathname === "/collection" ? addFn() : imagesStore.deleteImage(id)
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
        </>
      ): null}
    </div>
  );
}

export default observer(ImageCard);
