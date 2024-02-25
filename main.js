const API_KEY = `b3bcbacde44c40eaaf12b35006d52252`;
let newsList = [];
const menus = document.querySelectorAll('.menus button');
menus.forEach((menu) => menu.addEventListener('click', (event) => getNewsByCategory(event)));
const sideMenuList = document.querySelectorAll('.side-menu-list button');
sideMenuList.forEach((menu) => menu.addEventListener('click', (event) => getNewsByCategory(event)));
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

// let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
// const url = new URL(`https://lovely-hummingbird-ed40c1.netlify.app/top-headlines?category=science`);
// const url = new URL(`http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`);
let url = new URL(`https://lovely-hummingbird-ed40c1.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`);

const getNews = async () => {
  try {
    url.searchParams.set('page', page); // => &page=page
    url.searchParams.set('pageSize', pageSize);

    const response = await fetch(url); // 데이터를 가져오는 함수. fetch // await 서버와 통신 관련된 것은 기다려 줘야 한다.
    const data = await response.json(); // json -> 텍스트 타입인 데이터인데 객체처럼 생긴 것.

    console.log('ddd', data);
    if (response.status === 200) {
      if (data.articles.length === 0) {
        // 뉴스가 아무것도 없다면
        throw new Error('No result for this search');
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log('error', error.message);
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  getNews(url);
};

// 1. 버튼들에 클릭 이벤트를 준다.
// 2. 카테고리 별 뉴스를 가져온다.
// 3. 가져온 뉴스를 보여준다.

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log('category', category);
  // url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`);
  url = new URL(
    `https://lovely-hummingbird-ed40c1.netlify.app/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
  );

  getNews(url);
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `
      <div class="row news">
        <div class="col-lg-4">
          <img
            class="news-img-size"
            src=${news.urlToImage ? news.urlToImage : 'images/no-image.png'}
            onerror="this.onerror=null; this.src='images/no-image.png';"
            alt="뉴스 이미지"
          />
        </div>
        <div class="col-lg-8">
          <h2>${news.title}</h2>
          <p class="news-text">${news.description}</p>
          <div>${news.source.name} * ${news.publishedAt}</div>
        </div>
      </div>
      `
    )
    .join('');

  document.getElementById('news-board').innerHTML = newsHTML;
};

// 페이지네이션

const paginationRender = () => {
  // totalResult
  // page
  // pageSize
  // groupSize
  //totalPages
  const totalPages = Math.ceil(totalResults / pageSize);
  // pageGroup
  const pageGroup = Math.ceil(page / groupSize);
  // lastPage
  let lastPage = pageGroup * groupSize;
  // 마지막 페이지 그룹이 그룹 사이즈보다 작다면? lastPage = totalPage
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }

  // firstPage
  const firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  let paginationHTML = `
  <li class="page-item" onclick="moveToPage(${page - 1})">
          <a class="page-link" href="#">Previous</a>
        </li>
  `;

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `
    <li class="page-item ${i === page ? 'active' : ''}" onclick="moveToPage(${i})">
    <a class="page-link">
      ${i}
    </a>
  </li>`;
  }
  paginationHTML += `  <li class="page-item" onclick="moveToPage(${page + 1})">
  <a class="page-link" href="#">Next</a>
</li>`;
  document.querySelector('.pagination').innerHTML = paginationHTML;

  // <nav aria-label="Page navigation example">
  //   <ul class="pagination justify-content-center">
  //     <li class="page-item disabled">
  //       <a class="page-link">Previous</a>
  //     </li>
  // <li class="page-item">
  //   <a class="page-link" href="#">
  //     1
  //   </a>
  // </li>
  //     <li class="page-item">
  //       <a class="page-link" href="#">
  //         2
  //       </a>
  //     </li>
  //     <li class="page-item">
  //       <a class="page-link" href="#">
  //         3
  //       </a>
  //     </li>
  //     <li class="page-item">
  //       <a class="page-link" href="#">
  //         Next
  //       </a>
  //     </li>
  //   </ul>
  // </nav>;
};

const moveToPage = (pageNum) => {
  console.log('moveToPage', pageNum);
  page = pageNum;

  getNews();
};

getLatestNews();

// 에러
const errorRender = (errorMessage) => {
  const errorHTML = `
    <div class="alert alert-danger" role="alert">
      ${errorMessage}
    </div>
  `;

  document.getElementById('news-board').innerHTML = errorHTML;
};

// 검색
const getNewsByKeyword = async () => {
  const keyword = document.getElementById('search-input').value;
  console.log('keyword', keyword);
  // url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`);
  url = new URL(
    `https://lovely-hummingbird-ed40c1.netlify.app/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`
  );

  getNews(url);
};

// 사이드 바
const openNav = () => {
  document.getElementById('mySidenav').style.width = '250px';
};

const closeNav = () => {
  document.getElementById('mySidenav').style.width = '0';
};

// 검색창
const openSearchBox = () => {
  let inputArea = document.getElementById('input-area');
  if (inputArea.style.display === 'inline') {
    inputArea.style.display = 'none';
  } else {
    inputArea.style.display = 'inline';
  }
};
