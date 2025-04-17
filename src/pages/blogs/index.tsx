import { Flex, List, ListItem, Stack, Text } from '@chakra-ui/react';
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import StructuredData from '~/components/StructuredData';

type Posts = {
  id: string;
  title: {
    rendered: string;
  };
}[];

export const getStaticProps = (async (context) => {
  // const res = await fetch('https://sneakword.online/wp-json/wp/v2/posts?_fields=title,id');
  // const posts = (await res.json()) as Posts;
  const posts = [] as Posts;
  return { props: { posts }, revalidate: 60 * 60 * 12 };
}) satisfies GetStaticProps<{
  posts: Posts;
}>;

export default function Page({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Blogs</title>
        <meta
          name="description"
          content="Discover leading educational blogs that provide insights and knowledge on various topics."
        />

        <StructuredData path="/blogs" />
      </Head>
      <Flex maxWidth={'1200px'} mx={'auto'} w={'full'} p={2} justify={'center'} flexDir={'column'}>
        <Stack mt={6}>
          <Text as="h1" fontSize="3xl" fontWeight="bold">
            Blogs
          </Text>
          <Text fontSize="lg">
            Explore our collection of blogs that cover a wide range of educational topics, designed
            to inform and inspire you.
          </Text>
        </Stack>
        <List mt={'6'} w={'full'}>
          {posts.map((post, idx) => (
            <Link href={`/blogs/${post.id}`} key={idx}>
              <ListItem
                p={4}
                rounded={'md'}
                border={'1px solid var(--border-color)'}
                fontSize={'xl'}
                fontWeight={'medium'}
                _hover={{
                  bg: 'var(--card-dark-color)',
                  cursor: 'pointer'
                }}
                my={3}
                bg={'var(--card-color)'}>
                {post.title.rendered}
              </ListItem>
            </Link>
          ))}
        </List>
      </Flex>
    </>
  );
}
