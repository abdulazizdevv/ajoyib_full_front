import { Locale } from '../../../../i18n.config';
import SEO from '@/components/SEO/SEO';
import { Metadata } from 'next';
import CartComponent from './components/CartComponent';
export const metadata: Metadata = {
  title: 'Cart fast-food',
};
export default function Cart({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <>
      <SEO />
      <CartComponent params={lang} />
    </>
  );
}
