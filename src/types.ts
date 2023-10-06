export interface IImage {
  id: string;
  url: string;
  width?: number;
  height?: number;
  tags: string[];
  addedToCollection: boolean
}

export interface IImages {
  images: IImage[];
  isLoading: boolean;
  hasFailed: boolean;
}
