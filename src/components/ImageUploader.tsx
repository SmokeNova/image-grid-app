import { Button, Tooltip, Modal, Image as ImageComponent } from "@mantine/core";
import { UploadIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../store";
import { addImage } from "../slices/imagesSlice";
import { ISelectedImage } from "../types";

export default function ImageUploader({size = "sm"}: {size?: string}) {
  const dispatch = useAppDispatch();
  const [opened, setOpened] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ISelectedImage | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const width = img.width;
          const height = img.height;
          setSelectedImage({url: reader.result as string, dimensions: {width, height}});
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const closeModal = () => {
    setOpened(false);
    setSelectedImage(null);
  };

  const uploadImage = () => {
    dispatch(addImage(selectedImage as ISelectedImage));
    closeModal();
  };

  return (
    <>
      <Tooltip label="Upload an image">
        <Button
          radius="sm"
          size={size}
          leftSection={<UploadIcon size={20} />}
          className="border border-slate-700/30 text-slate-700/60 hover:border-slate-700 hover:text-slate-700 transition-normal"
          onClick={() => setOpened(true)}
        >
          Upload
        </Button>
      </Tooltip>

      <Modal opened={opened} onClose={closeModal} size="auto" centered>
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl text-center font-semibold">
            Upload an image:
          </h2>
          <input
            type="file"
            accept="image/*"
            id="image-upload"
            className="hidden"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image-upload"
            className="flex-center cursor-pointer w-full sm:min-w-[500px] p-6 border-2 border-dashed border-slate-700/40 self-center"
          >
            <UploadIcon className="text-slate-700/70" />
          </label>
        </div>

        {selectedImage && (
          <div className="flex flex-col gap-4 mt-6">
            <Button
              radius="sm"
              className="self-center border border-slate-700/30 text-slate-700/60 hover:border-slate-700 hover:text-slate-700 transition-normal"
              onClick={uploadImage}
            >
              Confirm
            </Button>
            <ImageComponent src={selectedImage.url} />
          </div>
        )}
      </Modal>
    </>
  );
}
