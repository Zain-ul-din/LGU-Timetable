import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import MainAnimator from '~/components/design/MainAnimator';
import PastPapers from '~/components/pastpaper/pastpapers';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // todo: Get all subjects here
  return {
    props: {}
  };
}

interface GetStaticPropsReturnType {
  data: {};
}

export default function PastPaperPage({}: GetStaticPropsReturnType) {
  return (
    <>
      <Head>
        <title>Past Papers</title>
      </Head>
      <MainAnimator>
        <PastPapers />
      </MainAnimator>
    </>
  );
}
