const API_KEY = `b3bcbacde44c40eaaf12b35006d52252`;

const getLatestNews = () => {
  const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);

  console.log('uuu', url);
  const response = fetch(url);
};

getLatestNews();
