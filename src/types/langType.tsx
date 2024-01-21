export type Translations = {
  home: string;
  about: string;
  benefit: string;
  contact: string;
  menu: string;
  hero: string;
  aboutSection: string;
  mainAbout: string;
  bottomAbout: string;
  service: string;
  hotdog: string;
  burger: string;
  lavash: string;
  water: string;
  allView: string;
  serviceTxt: string;
  serviceP: string;
  service1: string;
  service2: string;
  service3: string;
  links: string;
  socialMedia: string;
  workTime: string;
  monday: string;
  sunday: string;
  allDelete: string;
  freeCartH1: string;
  freeCartP: string;
  allPrice: string;
  cartH: string;
  basket: string;
  cartCount: string;
};

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  categoryId: number;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICategory {
  createdAt: string;
  id: number;
  name: string;
  updatedAt: string;
}
