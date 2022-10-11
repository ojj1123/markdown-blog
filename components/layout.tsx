import Head from 'next/head';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
  home?: boolean;
}
const Layout: React.FC<Props> = ({ children, home }) => {
  return (
    <>
      <Head>
        <meta name='description' content='Next.js Sample blog' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>{children}</main>
      {!home && (
        <Link href='/'>
          <a className='backToHome'>Back to home</a>
        </Link>
      )}
    </>
  );
};

export default Layout;
