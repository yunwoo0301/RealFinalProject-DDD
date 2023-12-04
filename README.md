# Team Project
'React'와 MVC 디자인 패턴의 'Spring Boot'를 활용한 서버 사이드 렌더링 방식의 풀스택 과정 기반 팀 프로젝트

</br>

## 🖼️ 프로젝트 제목
: DDD ⇒ Diverse Different Display - 다양하고도 다른 전시회 정보를 한 곳에 담은 전시 예매 사이트

</br>

## 📖 개요
다양한 분야의 전시 정보와 편리한 결제 서비스 이용이 가능하며, 다이어리를 통해 나만의 기록을 소장할 수 있는 공간 마련 및 회원들 간에 정보를 공유할 수 있는 커뮤니티 제공을 담은 전시 사이트

</br>
</br>

## Build

```
$ git clone https://github.com/yunwoo0301/RealFinalProject-DDD.git
$ yarn install
$ ./gradlew build
$ java -jar build/libs/DDD-0.0.1-SNAPSHOT.jar 
```

</br>

## 🗓️ 개발 기간
- 개발 : 2023.06.15 ~ 2023.07.24

</br>

## 📍 설계의 주안점 
- 전시 API 연동을 통해 한눈에 알아볼 수 있도록 전시 서비스 제공
- 카카오 페이 API 연동을 통한 편리한 결제 기능
- 다이어리(평점, 한줄평)을 통해 마이페이지 내 나만의 공간 제공
- 자유 게시판을 통해 회원들간에 정보 공유 커뮤니티 공간 제공

</br>
  
## 🎀 프로젝트 기능 구현 및 설명
- Styled-Component 라이브러리를 활용한 게시판 별 레이아웃 스타일링 차별화.
![DDDpj1](https://github.com/yunwoo0301/portfolio/assets/121915009/66b482c9-428c-4d5c-a90e-b3df4f083884)
![DDDpj2](https://github.com/yunwoo0301/portfolio/assets/121915009/e04f5297-f93e-4963-b14a-529fdbb56694)

- 페이지별 RESTful API를 연동한 게시판 및 댓글 CRUD.
![DDDpj3](https://github.com/yunwoo0301/portfolio/assets/121915009/e84664bc-0e9e-498f-9360-e991a40d3b5b)

</br>

- 지역별 필터링을 활용한 테마별 주제 선정(동행찾기).
![DDDpj4](https://github.com/yunwoo0301/portfolio/assets/121915009/180e2cc3-baaf-436e-85e3-1eb856000c15)

</br>

- 제목 키워드 검색 기능(추천, 질문) 및 예외처리 구현으로 사용자 편의성을 고려한 UX디자인.
![DDDpj5](https://github.com/yunwoo0301/portfolio/assets/121915009/dd24ed83-5e65-4bde-b8cc-5edc4fd73bad)
![DDDpj6](https://github.com/yunwoo0301/portfolio/assets/121915009/a15e8d79-1c3d-4082-8d56-3b5f29100847)

- 해당 카테고리 내 게시판 번호(PK) 설정을 이용해 게시판 상세페이지 내 이전글, 다음글 & 조회수 기능을 추가한 디테일 강조.
![DDDpj7](https://github.com/yunwoo0301/portfolio/assets/121915009/91f1c0dc-b79a-4216-9083-eb6e9d31e1f1)

</br>

- 라이브러리를 활용한 페이지네이션 및 디자인 통일성을 위한 모달창 공통 컴포넌트 공유.
![DDDpj8](https://github.com/yunwoo0301/portfolio/assets/121915009/e8aa5d47-707e-4255-8f2d-caf42ab895b1)
![DDDpj9](https://github.com/yunwoo0301/portfolio/assets/121915009/b9fdcff4-2804-4d3c-b397-e086dcc628bf)

</br>

- 마이페이지 내 게시물 & 댓글 리스트 공동 작업 기여.
![DDDpj10](https://github.com/yunwoo0301/portfolio/assets/121915009/bd335baf-9a38-4da3-91e1-b6518c8635e5)

</br>


  


## :hammer_and_wrench: 개발 환경 및 기술 스택
- OS : Window 10, MAC OS
- IDE : VS Code, IntelliJ Community, MySql WorkBench
- Language : Java, Javascript ES6
- FrontEnd : HTML / CSS, React
- BackEnd: Spring Boot
- Framework : Spring Framework
- DB : MySQL
- Server : Tomcat
- Deployment : Amazon AWS
- etc: GitHub, FireBase, Notion
