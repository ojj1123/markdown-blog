import Head from 'next/head';
import Date from '../components/date';
import Layout from '../components/layout';
import { getAllPostIds, getPostData } from '../lib/posts';

type Context = {
  params: { id: string };
};
interface Props {
  postData: {
    id: string;
    contentHTML: string;
    title: string;
    date: string;
  };
}
const Post: React.FC<Props> = ({ postData }) => {
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

export async function getStaticProps({ params }: Context) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default Post;
