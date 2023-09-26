# 어푸어푸

## 수영하는 사람들의 커뮤니티

### 기획의도
1. 일반 헬스 어플은 여러 가지 있지만 수영전용 커뮤니티 어플은 없었습다.
1. 네이버 카페에 일반 코디관련 커뮤니티는 있지만 정보들을 통합해서 볼 수있는 어플은 별도로 없었습니다.
1. 수영 일지를 기록할 수 있는 기록어플도 같이 관리 가능했으면 좋아서 제작하게 되었습니다.

---

### 기술스택
1. React
1. Vite
1. TailwindCss
1. Zustand

---

### 폴더트리
```
📦src
 ┣ 📂assets
 ┣ 📂components
 ┃ ┣ 📂Button
 ┃ ┃ ┣ 📜ButtonComfirm.jsx
 ┃ ┃ ┣ 📜ButtonLog.jsx
 ┃ ┃ ┣ 📜ButtonMyCount.jsx
 ┃ ┃ ┗ 📜ButtonSubmit.jsx
 ┃ ┣ 📂Category
 ┃ ┃ ┣ 📜CategoryRadio.jsx
 ┃ ┃ ┣ 📜CategoryRadioForm.jsx
 ┃ ┃ ┣ 📜CategoryRadioGroup.jsx
 ┃ ┃ ┗ 📜CategoryTag.jsx
 ┃ ┣ 📂Icon
 ┃ ┃ ┣ 📜Account.jsx
 ┃ ┃ ┣ 📜Airplane.jsx
 ┃ ┃ ┣ 📜Back.jsx
 ┃ ┃ ┣ 📜Chat.jsx
 ┃ ┃ ┣ 📜Circle.jsx
 ┃ ┃ ┣ 📜Crown.jsx
 ┃ ┃ ┣ 📜Direction.jsx
 ┃ ┃ ┣ 📜DuckFoot.jsx
 ┃ ┃ ┣ 📜Heart.jsx
 ┃ ┃ ┣ 📜Hide.jsx
 ┃ ┃ ┣ 📜House.jsx
 ┃ ┃ ┣ 📜Location.jsx
 ┃ ┃ ┣ 📜Minus.jsx
 ┃ ┃ ┣ 📜Paper.jsx
 ┃ ┃ ┣ 📜Pencil.jsx
 ┃ ┃ ┣ 📜People.jsx
 ┃ ┃ ┣ 📜Plus.jsx
 ┃ ┃ ┣ 📜PoolMarker.jsx
 ┃ ┃ ┣ 📜Search.jsx
 ┃ ┃ ┣ 📜Show.jsx
 ┃ ┃ ┣ 📜Star.jsx
 ┃ ┃ ┣ 📜StarForRating.jsx
 ┃ ┃ ┣ 📜SwimmingKickBoard.jsx
 ┃ ┃ ┣ 📜Top.jsx
 ┃ ┃ ┗ 📜X.jsx
 ┃ ┣ 📂Input
 ┃ ┃ ┣ 📜LogInText.jsx
 ┃ ┃ ┣ 📜LogText.jsx
 ┃ ┃ ┣ 📜RatingStar.jsx
 ┃ ┃ ┣ 📜ReviewTag.jsx
 ┃ ┃ ┣ 📜ReviewTagCheckbox.jsx
 ┃ ┃ ┣ 📜ReviewTagCheckboxGroup.jsx
 ┃ ┃ ┗ 📜SearchInput.jsx
 ┃ ┣ 📂Login
 ┃ ┃ ┣ 📜PrivateRoute.jsx
 ┃ ┃ ┗ 📜PublicRoute.jsx
 ┃ ┣ 📜.DS_Store
 ┃ ┣ 📜AWSUpLoadFile.jsx
 ┃ ┣ 📜CommentList.jsx
 ┃ ┣ 📜CommunityList.jsx
 ┃ ┣ 📜DatePicker.jsx
 ┃ ┣ 📜DatePickerMonth.jsx
 ┃ ┣ 📜DatePickerYear.jsx
 ┃ ┣ 📜LogList.jsx
 ┃ ┣ 📜LogSearchList.jsx
 ┃ ┣ 📜Logo.jsx
 ┃ ┣ 📜MapComponent.jsx
 ┃ ┣ 📜ModalComplex.jsx
 ┃ ┣ 📜ModalComponent.jsx
 ┃ ┣ 📜MyCalendar.jsx
 ┃ ┣ 📜PoolList.jsx
 ┃ ┣ 📜PoolMap.jsx
 ┃ ┣ 📜ReviewList.jsx
 ┃ ┣ 📜SendingForm.jsx
 ┃ ┣ 📜Spinner.jsx
 ┃ ┣ 📜TextArea.jsx
 ┃ ┣ 📜Timer.jsx
 ┃ ┗ 📜UpLoadFile.jsx
 ┣ 📂hooks
 ┃ ┣ 📜useFetchData.js
 ┃ ┣ 📜useFetchDeleteData.js
 ┃ ┣ 📜useFetchPostData.js
 ┃ ┣ 📜useFetchPutData.js
 ┃ ┗ 📜useStorage.js
 ┣ 📂layout
 ┃ ┣ 📜Header.jsx
 ┃ ┣ 📜LoginLayout.jsx
 ┃ ┣ 📜Nav.jsx
 ┃ ┗ 📜RootLayout.jsx
 ┣ 📂pages
 ┃ ┣ 📂Community
 ┃ ┃ ┣ 📜Community.jsx
 ┃ ┃ ┣ 📜CommunityDetail.jsx
 ┃ ┃ ┣ 📜CommunityDetailEdit.jsx
 ┃ ┃ ┗ 📜CommunityWrite.jsx
 ┃ ┣ 📂Main
 ┃ ┃ ┣ 📜Main.jsx
 ┃ ┃ ┣ 📜PoolSearch.jsx
 ┃ ┃ ┣ 📜PoolSearchList.jsx
 ┃ ┃ ┗ 📜PoolSearchReview.jsx
 ┃ ┣ 📂MyAccount
 ┃ ┃ ┣ 📜MyAccount.jsx
 ┃ ┃ ┣ 📜MyAccountComment.jsx
 ┃ ┃ ┣ 📜MyAccountDelete.jsx
 ┃ ┃ ┣ 📜MyAccountEdit.jsx
 ┃ ┃ ┣ 📜MyAccountReview.jsx
 ┃ ┃ ┗ 📜MyAccountWrited.jsx
 ┃ ┣ 📂MyLog
 ┃ ┃ ┣ 📜MyLog.jsx
 ┃ ┃ ┣ 📜MyLogEdit.jsx
 ┃ ┃ ┣ 📜MyLogList.jsx
 ┃ ┃ ┣ 📜MyLogSearchMonth.jsx
 ┃ ┃ ┣ 📜MyLogSearchYear.jsx
 ┃ ┃ ┗ 📜MyLogWrite.jsx
 ┃ ┣ 📂Review
 ┃ ┃ ┣ 📜ReviewDetail.jsx
 ┃ ┃ ┣ 📜ReviewEdit.jsx
 ┃ ┃ ┗ 📜ReviewWrite.jsx
 ┃ ┣ 📜FindAccount.jsx
 ┃ ┣ 📜Home.jsx
 ┃ ┣ 📜Login.jsx
 ┃ ┗ 📜SignUp.jsx
 ┣ 📂styles
 ┃ ┣ 📜.DS_Store
 ┃ ┣ 📜datePicker.css
 ┃ ┣ 📜map.css
 ┃ ┣ 📜reviewTagCheckbox.module.css
 ┃ ┣ 📜swiper.css
 ┃ ┗ 📜tailwind.css
 ┣ 📂utils
 ┃ ┣ 📂animation
 ┃ ┃ ┗ 📜createShakeAnimation.js
 ┃ ┣ 📜debounce.js
 ┃ ┣ 📜expireTime.js
 ┃ ┣ 📜isAuth.js
 ┃ ┗ 📜throttle.js
 ┣ 📂zustand
 ┃ ┣ 📜useAuthStore.jsx
 ┃ ┣ 📜useCalenderStore.jsx
 ┃ ┣ 📜useMapStore.jsx
 ┃ ┗ 📜useModalStore.jsx
 ┣ 📜App.jsx
 ┗ 📜main.jsx
```

----

## 화면구성 및  기능


1. 로그인
   - 로그인 페이지
   - 아이디/비밀번호 찾기

  <p align="center"><img alt="로그인" src="https://github.com/swimming-sis/swimming-community-app-frontend/assets/116139215/84c1fc0c-01f4-40f5-943f-0a375296d2dc" height="600px" width="300px"></p>

<br />

---

<br />

2. 회원가입
   - 중복 확인
   - 유효성 검사
   - 휴대전화 번호 인증

  <p align="center"><img  alt="회원가입"  src="https://github.com/swimming-sis/swimming-community-app-frontend/assets/116139215/4c920ee5-1fb3-4573-aa18-e603fa08aceb" height="600px" width="300px"></p>


<br />

---

<br />

3. 내 계정
   - 내 계정 정보 조회
   - 내 계정 수정
   - 로그아웃
   - 회원탈퇴

  <p align="center"><img alt="내계정 페이지" src="https://github.com/swimming-sis/swimming-community-app-frontend/assets/116139215/7bd10742-7009-4c38-b107-3d4c834fc2b1" height="600px" width="300px"></p>

<br />

---

<br />

4. 메인 페이지
   - 최근 항목 리스트

<p align="center"><img alt="메인페이지" src="https://github.com/swimming-sis/swimming-community-app-frontend/assets/116139215/3bce659c-ac3e-472a-912a-9055b0a7a78d" height="600px" width="300px"></p>

<br />

---

<br />

5. 수영장 검색페이지
   - 카카오맵 API를 이용한 지도 구현
   - 현재위치찾기
   - 지도기준 검색리스트
   - 키워드 검색리스트

  <table>
  <tr>
    <td><img alt="수영장 검색어 검색" src="https://github.com/swimming-sis/swimming-community-app-frontend/assets/116139215/9bc770f7-07d6-467b-8b7e-906ddb9ac0fb"  height="600px" width="300px" /></td><td><img alt="수영장 현재 위치 검색" src="https://github.com/swimming-sis/swimming-community-app-frontend/assets/116139215/cc1d9ec9-1259-45ae-8eaf-3fade8891208"  height="600px" width="300px" /></td>
  <tr>
</table>

<br />

---

<br />

6. 수영장 리뷰페이지
   - 리뷰목록 및 상세 페이지
   - 리뷰 목록 작성 / 수정 / 삭제


  <p align="center"><img alt="내계정 페이지" src="https://github.com/swimming-sis/swimming-community-app-frontend/assets/116139215/ceccce0e-1bb0-43f3-aa95-95b3e1dc9085" height="600px" width="300px"></p>

<br />

---

<br />

7. 커뮤니티
   - 커뮤니티 목록 카테고리 검색 및 키워드 검색
   - 커뮤니티 게시글 작성 / 수정 / 삭제

  <p align="center"><img alt="커뮤니티" src="https://github.com/swimming-sis/swimming-community-app-frontend/assets/116139215/ceccce0e-1bb0-43f3-aa95-95b3e1dc9085" height="600px" width="300px"></p>

<br />

---

<br />

8. 수영 일지
   - 수영 일지 날짜별 조회 캘린더
   - 수영 일지 작성 및 평균 조회
   - 일지 목록 작성 / 수정 / 삭제
  <table>
  <tr>
    <td><img alt="일지 조회 수정" src="https://github.com/swimming-sis/swimming-community-app-frontend/assets/116139215/269848e5-70c1-45da-9a41-ab9e8ccd71b5" /></td><td><img alt="일지 삭제" src="https://github.com/swimming-sis/swimming-community-app-frontend/assets/116139215/2631501f-6eed-4406-a549-3cde5e9b1ed6" /></td>
  <tr>
</table>

<br />

---

<br />

[어푸어푸 배포 사이트](https://upuhupuh.netlify.app/)
