import type { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import { getSortedPostsData } from '../lib/posts';

const siteTitle = 'Next.js Sample blog';

const Home = ({
  allPostsData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <h2>Blog</h2>
        <ul>
          {allPostsData.map(({ id, date, title }) => {
            return (
              <Link key={id} href={`/${id}`}>
                <a>
                  <li>
                    {title}
                    <br />
                    {date}
                  </li>
                </a>
              </Link>
            );
          })}
        </ul>
      </section>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

export default Home;
