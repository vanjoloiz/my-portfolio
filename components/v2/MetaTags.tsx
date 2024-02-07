import Head from "next/head";

const MetaTags = ({ title }: { title: string }) => {
  const siteName = "Salvador Loiz";
  const titleContent = `${siteName} | ${title}`;

  return (
    <Head>
      <title>{titleContent}</title>
    </Head>
  );
};

export default MetaTags;
