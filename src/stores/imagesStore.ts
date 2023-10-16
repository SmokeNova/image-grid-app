import { makeAutoObservable, runInAction } from "mobx";
import { IImage, ISelectedImage } from "../types";
import { generateId } from "../utils";

const url = `https://api.thecatapi.com/v1/images/search?limit=20&api_key=${
  import.meta.env.VITE_CAT_API_KEY
}`;

class ImagesStore {
  images: IImage[] = [];
  isLoading = true;
  hasFailed = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchImages() {
    try {
      const res = await fetch(url);
      const data = await res.json();
      const images = data.map((element: any) => ({
        ...element,
        tags: ["cats"],
        addedToCollection: false,
      }));
      runInAction(() => {
        this.images = images;
        this.isLoading = false;
      });
    } catch (error: any) {
      runInAction(() => {
        this.isLoading = false;
        this.hasFailed = true;
      });
    }
  }

  addImage(image: ISelectedImage) {
    const { url, dimensions } = image;
    this.images.push({
      id: generateId(),
      url,
      tags: [],
      addedToCollection: false,
      width: dimensions.width,
      height: dimensions.height,
    });
  }

  deleteImage(id: string) {
    this.images = this.images.filter((image) => image.id !== id);
  }

  addTagToImage(imageInfo: { id: string; tags: string[] }) {
    const { id, tags } = imageInfo;
    this.images = this.images.map((image) => {
      return image.id === id ? { ...image, tags } : image;
    });
  }

  addImageToCollection(id: string) {
    this.images = this.images.map((image) => {
      return image.id === id ? { ...image, addedToCollection: true } : image;
    });
  }

  removeImageFromCollection(id: string) {
    this.images = this.images.map((image) => {
      return image.id === id ? { ...image, addedToCollection: false } : image;
    });
  }
}

const imagesStore = new ImagesStore();

export default imagesStore;
