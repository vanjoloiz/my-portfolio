import express from "express";
//@ts-ignore
import NewsAPI from "newsapi";

const router = express.Router();

router.get("/", async (req, res) => {
  const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

  try {
    const news = await newsapi.v2.everything({
      q: "JavaScript",
      language: "en",
      page: 1,
      pageSize: 20,
    });

    res.status(200).json(news);
  } catch (err) {
    res.status(500).send("Server error.");
    console.error(err);
  }
});

export default router;
