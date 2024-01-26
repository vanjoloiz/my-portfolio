import React from "react";
import Head from "next/head";

const HeadTags = () => {
  return (
    <Head>
      <title>Salvador Loiz</title>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <meta
        name="description"
        content="Portfolio website of Salvador Loiz showcasing skills and projects."
      />
      <meta
        name="keywords"
        content="Salvador Loiz, portfolio, skills, projects"
      />
      <meta property="og:title" content="Salvador Loiz" />
      <meta
        property="og:description"
        content="Portfolio website of Salvador Loiz showcasing skills and projects."
      />
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
