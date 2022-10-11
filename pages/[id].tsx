import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Date from '../components/date';
import Layout from '../components/layout';
import { getAllPostIds, getPostData } from '../lib/posts';

interface Props {
  postData: {
    id: string;
    contentHTML: string;
    title: string;
    date: string;
  };
}
const Post = ({ postData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <h2>{postData.title}</h2>
      <Date dateString={postData.date} />
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHTML }} />
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.id || Array.isArray(params.id)) {
    return {
      props: {},
    };
  }

  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
};

export default Post;
