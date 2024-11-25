import { Flex } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface Post {
  content: {
    rendered: string;
  };
  title: {
    rendered: string;
  };
}

export const getStaticPaths = (async () => {
  // const res = await fetch('https://sneakword.online/wp-json/wp/v2/posts?_fields=id');
  // const posts = await res.json();

  const paths = [].map((post: any) => ({
    params: { id: post.id + '' }
  }));

  return {
    paths,
    fallback: true
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  // const res = await fetch(`https://sneakword.online/wp-json/wp/v2/posts/${id}`);
  // const post = (await res.json()) as Post | undefined;
  return {
    props: { post: undefined },
    revalidate: 60 * 60 * 12
  };
}) satisfies GetStaticProps<{
  post: Post | undefined;
}>;

export default function BlogDetailPage({ post }: { post: Post }) {
  const router = useRouter();

  useEffect(() => {
    if (!post) router.push('/blogs');
  }, [post, router]);

  if (!post) return <></>;

  return (
    <>
      <Head>
        <title>{post.title.rendered}</title>
        <meta name="description" content={`${post.content.rendered.slice(0, 100)}`} />
      </Head>
      <Flex maxWidth={'1250px'} mx={'auto'} w={'full'} p={2}>
        <div
          className="mark-down"
          dangerouslySetInnerHTML={{
            __html: `
          <h1>${post.title.rendered}</h1>
          ${post.content.rendered}`
          }}></div>
      </Flex>
    </>
  );
}
