import { GetServerSidePropsContext } from 'next';

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
  return <>Past Papers</>;
}
