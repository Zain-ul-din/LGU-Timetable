import { Flex } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';

interface Post {
  content: {
    rendered: string;
  };
  title: {
    rendered: string;
  };
}

export const getStaticPaths = (async () => {
  const res = await fetch('https://sneakword.online/wp-json/wp/v2/posts?_fields=id');
  const posts = await res.json();
  const paths = posts.map((post: any) => ({
    params: { id: post.id + '' }
  }));

  return {
    paths,
    fallback: true
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const res = await fetch(`https://sneakword.online/wp-json/wp/v2/posts/${id}`);
  const post = (await res.json()) as Post;
  return {
    props: { post: post }
  };
}) satisfies GetStaticProps<{
  post: Post;
}>;

export default function BlogDetailPage({ post }: { post: Post }) {
  return (
    <Flex maxWidth={'1250px'} mx={'auto'} w={'full'} p={2}>
      <div
        className="mark-down"
        dangerouslySetInnerHTML={{
          __html: `
          <h1>${post.title.rendered}</h1>
          ${post.content.rendered}`
        }}></div>
    </Flex>
  );
}
