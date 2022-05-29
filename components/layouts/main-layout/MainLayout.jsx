import Header from '/containers/header/Header';
import Footer from '/components/footer/Footer';
import Head from 'next/head';

export default function Layout({ children, ...rest }) {
  const { category } = rest;
  const upperCaseCategory = category.charAt(0).toUpperCase() + category.slice(1); //prettier-ignore
  return (
    <>
      <Head>
        <title>Neo Snowboards - {upperCaseCategory}</title>
      </Head>
      <Header />
      <main> {children} </main>
      <Footer />
    </>
  );
}
