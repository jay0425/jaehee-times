const API_KEY = `b3bcbacde44c40eaaf12b35006d52252`;
let newsList = [];

const getLatestNews = async () => {
  const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
  // const url = new URL(`https://lovely-hummingbird-ed40c1.netlify.app/top-headlines?category=science`);
  // const url = new URL(`http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`);
  // let url = new URL(`https://lovely-hummingbird-ed40c1.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`);

  console.log('uuu', url);

  const response = await fetch(url); // 데이터를 가져오는 함수. fetch // await 서버와 통신 관련된 것은 기다려 줘야 한다.
  const data = await response.json(); // json -> 텍스트 타입인 데이터인데 객체처럼 생긴 것.
  newsList = data.articles;
  render();
  console.log('ddd', newsList);

  console.log('rrr', response);
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">
  <div class="col-lg-4">
    <img
      class="news-img-size"
      src=${news.urlToImage}
      alt="뉴스 이미지"
    />
  </div>
  <div class="col-lg-8">
    <h2>${news.title}</h2>
    <p>${news.description}</p>
    <div>${news.source.name} * ${news.publishedAt}</div>
  </div>
</div>`
    )
    .join('');

  document.getElementById('news-board').innerHTML = newsHTML;
};

getLatestNews();
