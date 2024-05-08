import { Locale } from '../../../../../i18n.config';
import SEO from '@/components/SEO/SEO';
import MenuComponent from './components/MenuComponents';
import { Metadata, ResolvingMetadata } from 'next';
import axiosInstance, { baseURL } from '@/api/api';
import { cache } from 'react';
type Props = {
  params: { id: string };
};

const fetchBlog = cache(async (id: string) => {
  const product: any = await axiosInstance.get(`/get/product/${id}`);
  return product;
});

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  const product: any = await fetchBlog(id);
  const previousImages = (await parent).openGraph?.images || [];
  const desc = product?.data?.description;

  return {
    title: product?.data?.title,
    description: desc,
    openGraph: {
      images: [`${baseURL}/${product?.data?.image}`, ...previousImages],
    },
  };
}

export default function Menu({
  params: { lang, id },
}: {
  params: { lang: Locale; id: string };
}) {
  fetchBlog(id);
  return (
    <section>
      <SEO />
      <MenuComponent params={lang} id={id} />
    </section>
  );
}
