import { IImage } from "../types";
import { makeAutoObservable } from "mobx";

class CollectionStore {
  images: IImage[] = [];

  constructor() {
    this.loadImagesFromLocalStorage();
    makeAutoObservable(this);
  }

  addToCollection(image: IImage) {
    const previousInstance = this.images.find((img) => img.id === image.id);
    if (!previousInstance) {
      this.images.push({...image, addedToCollection: true});
      this.saveImagesToLocalStorage();
    }
  }

  removeFromCollection(id: string) {
    this.images = this.images.filter((img) => img.id !== id);
    this.saveImagesToLocalStorage();
  }

  addTagToAddedImage(imageInfo: { id: string; tags: string[] }) {
    const { id, tags } = imageInfo;
    this.images = this.images.map((image) => {
      return image.id === id ? { ...image, tags } : image;
    });
    this.saveImagesToLocalStorage();
  }

  private loadImagesFromLocalStorage() {
    try {
      const images = localStorage.getItem("collection");
      if (images) {
        this.images = JSON.parse(images);
      }
    } catch (error) {
      console.error("Error loading collection from local storage:", error);
      this.clearCollection();
    }
  }

  private saveImagesToLocalStorage() {
    localStorage.setItem('collection', JSON.stringify(this.images));
  }

  clearCollection() {
    this.images = [];
    localStorage.removeItem('collection');
  }
}

const collectionStore = new CollectionStore();

export default collectionStore;
