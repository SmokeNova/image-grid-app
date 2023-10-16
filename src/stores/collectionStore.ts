import { IImage } from "../types";
import { makeAutoObservable } from "mobx";

class CollectionStore {
  images: IImage[] = [];

  constructor() {
    this.images = (() => {
      const images = localStorage.getItem("collection");
      return images ? JSON.parse(images) : [];
    })();
    makeAutoObservable(this);
  }

  addToCollection(image: IImage) {
    const previousInstance = this.images.find((img) => img.id === image.id);
    if (!previousInstance) {
      this.images.push({...image, addedToCollection: true});
      localStorage.setItem("collection", JSON.stringify(this.images));
    }
  }

  removeFromCollection(id: string) {
    this.images = this.images.filter((img) => img.id !== id);
    localStorage.setItem("collection", JSON.stringify(this.images));
  }

  addTagToAddedImage(imageInfo: { id: string; tags: string[] }) {
    const { id, tags } = imageInfo;
    this.images = this.images.map((image) => {
      return image.id === id ? { ...image, tags } : image;
    });
    localStorage.setItem("collection", JSON.stringify(this.images));
  }
}

const collectionStore = new CollectionStore();

export default collectionStore;
