# gs-to-page

구글 스프레드 시트를 페이지로 만들어주는 프로젝트

## 사용방법

- 구글 스프레드 시트를 생성하세요.
- 첫번째 시트를 사용하세요.
- 시트의 가장 맨 위 Row는 필드명입니다.
  - `link` 필드는 필수 값 입니다.
  - `name` 필드는 Item의 제목이 생성됩니다.
  - 그 외 필드는 자유롭게 추가하셔도 됩니다. (그 외 필드들은 카테고리로 사용됩니다.)
- 스프레드 시트를 전체 공개로 공유하세요.
- 스트레드 시트의 id 값을 복사하세요.
  - `https://docs.google.com/spreadsheets/d/{id}/edit#gid=0`
- `https://ryum91.github.io/gs-to-page?id={id}` 로 접속합니다.
