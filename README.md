# Team Project
 'React'와 'Node.js', 'Springboot'를 결합한 풀스택 과정의 팀 프로젝트

</br>

## 🖼️ 프로젝트 제목
: DDD ⇒ Diverse Different Display - 다양하고도 다른 전시회 정보를 한 곳에 담은 전시 예매 사이트

</br>

## 📖 개요
다양한 분야의 전시 정보와 편리한 결제 서비스 이용이 가능하며, 다이어리를 통해 나만의 기록을 소장할 수 있는 공간 마련 및 회원들 간에 정보를 공유할 수 있는 커뮤니티 제공을 담은 전시 사이트

</br>

## DEMO Capture
![DDDpj](https://github.com/yunwoo0301/portfolio/assets/121915009/78fd896e-130e-43f1-a715-c29d2bfc8748)
![DDDpj2](https://github.com/yunwoo0301/portfolio/assets/121915009/8d327694-7510-49ac-8192-8d9a1601577d)
![DDDpj3](https://github.com/yunwoo0301/portfolio/assets/121915009/4dd0161e-bb9a-44e6-b90e-e2ed5443c051)
![DDDpj4](https://github.com/yunwoo0301/portfolio/assets/121915009/551bba95-43ee-4bd5-9869-b4aaf2e4e9d0)
![DDDpj5](https://github.com/yunwoo0301/portfolio/assets/121915009/431c2974-ebbf-4aeb-b885-f740356d0e0c)
![DDDpj6](https://github.com/yunwoo0301/portfolio/assets/121915009/1c698453-0e1f-48b3-9891-9071fac02d9d)
![DDDpj7](https://github.com/yunwoo0301/portfolio/assets/121915009/f8a5ebf5-54ed-4a7a-8f86-02169a964329)
![DDDpj8](https://github.com/yunwoo0301/portfolio/assets/121915009/66b482c9-428c-4d5c-a90e-b3df4f083884)
![DDDpj9](https://github.com/yunwoo0301/portfolio/assets/121915009/e04f5297-f93e-4963-b14a-529fdbb56694)
![DDDpj10](https://github.com/yunwoo0301/portfolio/assets/121915009/18e35b10-c7d1-4cd9-94fc-c8d7f0ec4e94)
![DDDpj11](https://github.com/yunwoo0301/portfolio/assets/121915009/2146aaf3-1fbc-4c0d-8031-4a3828bfc0b6)
![DDDpj12](https://github.com/yunwoo0301/portfolio/assets/121915009/a4e50f71-3fe3-45ae-933f-0b20cff68e7d)


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

## 🎀 프로젝트 주요 기능
- 회원가입 / 로그인 페이지 : 로그인 유지, 비밀번호 찾기를 위한 이메일 인증
- 마이페이지 : 회원정보 수정 및 탈퇴, 다이어리, 게시물 및 예약 관리
- 메인페이지 : 전시 및 기상청 API, 인기순 & 추천별 전시 리스트, 챗봇 라이브러리
- 전시페이지 : 인기/추천/지역별 전시 목록, 예매(온라인 티켓)및 카카오 페이 결제 기능, 전시 한줄평
- 게시판페이지 : 카테고리 별 게시글 리스트(테이블, 갤러리형) /  게시글 CRUD(이미지 업로드, 조회수, 지역별 필터링) / 게시글 상세 페이지(이전글/다음글/목록) 및 검색, 댓글 기능
- 관리자페이지 : 가입 현황 및 전시별 통계, 예매 & 게시판 & 전시 관리

</br>

## 📍 설계의 주안점 
- 전시 API 연동을 통해 한눈에 알아볼 수 있도록 전시 서비스 제공
- 카카오 페이 API 연동을 통한 편리한 결제기능
- 다이어리(평점, 한줄평)을 통해 마이페이지 내 나만의 공간 제공
- 자유 게시판을 통해 회원들간에 정보 공유 커뮤니티 공간 제공
  
</br>

## :hammer_and_wrench: 개발 환경 및 기술 스택
- OS : Window 10, MAC OS
- IDE : VS Code, IntelliJ Community, MySql WorkBench
- Language : Java, Javascript ES6
- FrontEnd : HTML / CSS, React
- BackEnd: Spring Boot
- Framework : Spring Framework, React JS
- DB : MySQL
- Server : Tomcat
- Deployment : Amazon AWS
- etc: GitHub, FireBase, Notion
