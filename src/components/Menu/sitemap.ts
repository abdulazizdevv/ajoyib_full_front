import axiosInstance from '@/api/api';
import { MetadataRoute } from 'next';

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const products = await axiosInstance.get('/get/all/product');

  return products?.data?.map((product: any) => ({
    url: `https://ajoyib-fastfood.uz/ru/menu/${id}`,
    lastModified: product.createdAt,
  }));
}
