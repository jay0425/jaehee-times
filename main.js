const API_KEY = `b3bcbacde44c40eaaf12b35006d52252`;
let news = [];

const getLatestNews = async () => {
  // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
  // const url = new URL(`https://lovely-hummingbird-ed40c1.netlify.app/top-headlines?category=science`);
  const url = new URL(`http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`);

  console.log('uuu', url);

  const response = await fetch(url); // 데이터를 가져오는 함수. fetch // await 서버와 통신 관련된 것은 기다려 줘야 한다.
  const data = await response.json(); // json -> 텍스트 타입인 데이터인데 객체처럼 생긴 것.
  news = data.articles;
  console.log('ddd', news);

  console.log('rrr', response);
};

getLatestNews();
