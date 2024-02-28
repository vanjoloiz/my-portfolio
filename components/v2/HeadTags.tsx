import Head from "next/head";

const HeadTags = ({ title }: { title: string }) => {
  const siteName = title === "Salvador Loiz" ? "" : "Salvador Loiz |";
  const titleContent = `${siteName} ${title}`;

  return (
    <Head>
      <title>{titleContent}</title>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <meta
        name="description"
        content="Welcome to see, the portfolio website of Salvador Loiz. Here, Salvador showcases his diverse skills and a collection of impressive projects. Explore the fusion of creativity and expertise in design and development as you browse through Salvador's work. Welcome to the world of Salvador Loiz's skills and projects!"
      />
      <meta
        name="keywords"
        content="Salvador Loiz, Vanjo Loiz, portfolio, skills, projects"
      />
      <meta property="og:title" content="Salvador Loiz" />
      <meta
        property="og:description"
        content="Welcome to SEE, the portfolio website of Salvador Loiz. Here, Salvador showcases his diverse skills and a collection of impressive projects. Explore the fusion of creativity and expertise in design and development as you browse through Salvador's work. Welcome to the world of Salvador Loiz's skills and projects!"
      />
      <meta property="og:site_name" content="Salvador Loiz" />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://avatars.githubusercontent.com/u/55220938?v=4"
      />
      <meta name="author" content="Salvador Loiz" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://salvadorloizjr.com/" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default HeadTags;
