//  현준님의 뉴스카드 관련 코드입니다.


const newsContainer = document.getElementById("news-container"); // 뉴스 카드를 담을 컨테이너
const prevBtn = document.getElementById("prevBtn"); // 이전 버튼
const nextBtn = document.getElementById("nextBtn"); // 다음 버튼
let currentScreenIndex = 0; // 현재 스크린의 인덱스를 추적합니다. 초기값은 0입니다.
const batchSize = 6; // 한 번에 보여지는 뉴스 카드의 개수를 정의합니다.
const totalCards = 12; // 전체 뉴스 카드의 개수를 정의합니다.
// 주어진 뉴스 정보를 이용하여 뉴스 카드를 생성하는 함수입니다.
const createNewsCard = (news) => {
    // 뉴스 카드를 감싸는 열을 생성합니다.
    const cardColumn = document.createElement("div");
    cardColumn.classList.add("col-md-2", "card-column");
    // 카드 요소를 생성합니다.
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    // 이미지 요소를 생성하고 속성을 설정합니다.
    const image = document.createElement("img");
    image.src = news.imgUrl; // 이미지 URL 설정
    image.classList.add("card-img-top");
    image.alt = news.title; // 대체 텍스트 설정
    // 카드 본문을 생성합니다.
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    // 제목 요소를 생성하고 텍스트를 설정합니다.
    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = news.title; // 뉴스 제목 설정
    // 본문 요소를 생성합니다.
    const content = document.createElement("p");
    // 뉴스 기사 링크를 생성하고 속성을 설정합니다.
    const articleLink = document.createElement("a");
    articleLink.href = news.source; // 링크 URL 설정
    articleLink.classList.add("stretched-link");
    // 뉴스 카드를 클릭할 때 해당 기사 페이지로 이동하도록 설정합니다.
    cardDiv.addEventListener("click", () => {
        window.location.href = news.source;
    });
    // 생성된 요소들을 조립합니다.
    cardBody.appendChild(title);
    cardBody.appendChild(content);
    cardDiv.appendChild(image);
    cardDiv.appendChild(cardBody);
    cardDiv.appendChild(articleLink);
    cardColumn.appendChild(cardDiv);
    newsContainer.appendChild(cardColumn);
};
// 주어진 범위의 뉴스 카드를 렌더링하는 함수입니다.
const renderNewsCards = (startIndex, endIndex) => {
    for (let i = startIndex; i < endIndex; i++) {
        // 인덱스가 뉴스 데이터의 길이를 벗어나면 함수를 종료합니다.
        if (i >= newsData.length) return;
        createNewsCard(newsData[i]); // 뉴스 카드 생성
    }
};
// 뉴스 컨테이너를 비우는 함수입니다.
const clearNewsContainer = () => {
    newsContainer.innerHTML = ""; // 내용을 비웁니다.
};
// 뉴스 카드를 업데이트하고 슬라이드 효과를 적용하는 함수입니다.
const updateNewsCards = (startIndex, endIndex) => {
    clearNewsContainer(); // 기존 카드를 제거합니다.
    renderNewsCards(startIndex, endIndex); // 새로운 범위의 카드를 렌더링합니다.
};
// 이전 버튼 클릭 시 호출되는 이벤트 리스너입니다.
prevBtn.addEventListener("click", () => {
    if (currentScreenIndex > 0) {
        currentScreenIndex--; // 현재 스크린 인덱스를 감소시킵니다.
        const startIndex = currentScreenIndex * batchSize; // 시작 인덱스 계산
        const endIndex = startIndex + batchSize; // 종료 인덱스 계산
        updateNewsCards(startIndex, endIndex); // 뉴스 카드 업데이트
    }
});
// 다음 버튼 클릭 시 호출되는 이벤트 리스너입니다.
nextBtn.addEventListener("click", () => {
    if (currentScreenIndex < totalCards / batchSize - 1) {
        currentScreenIndex++; // 현재 스크린 인덱스를 증가시킵니다.
        const startIndex = currentScreenIndex * batchSize; // 시작 인덱스 계산
        const endIndex = startIndex + batchSize; // 종료 인덱스 계산
        updateNewsCards(startIndex, endIndex); // 뉴스 카드 업데이트
    }
});
// 초기 뉴스 카드를 생성합니다.
updateNewsCards(0, batchSize);