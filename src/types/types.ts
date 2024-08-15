// others
export interface Image {
  imageId: number;
  url: string;
  sequence?: number;
  isRepresentative?: boolean;
}

export interface ItemType {
  purchaseId: number;
  menuId: number;
  name: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
}
