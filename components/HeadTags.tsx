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
      <meta property="og:title" content="Salvador Loiz - Portfolio" />
      <meta
        property="og:description"
        content="Portfolio website of Salvador Loiz showcasing skills and projects."
      />
      <meta property="og:type" content="website" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default HeadTags;
