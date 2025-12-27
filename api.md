# HHBookClub API 명세서

## 공통 정보

- **Base URL (Local)**: `http://localhost:8080`
- **Content-Type**: `application/json`
- **인증 방식**: Bearer Token (JWT)

### 표준 응답 형식 (ApiResponse)

```json
{
"status":"SUCCESS",
"message":"Message string",
"data":{}
}

```

- `status`: `SUCCESS | FAIL | ERROR`
- `message`: 처리 결과 메시지
- `data`: 응답 payload

### 공통 인증 헤더

| Header | Value |
| --- | --- |
| Authorization | `Bearer <access_token>` |

---

## 1. Authentication

### 1) Google Login Redirect (OAuth2)

- **Method**: `GET`
- **URL**: `/oauth2/authorization/google`
- **Description**: 구글 로그인 페이지로 리다이렉트 → 로그인 성공 시 서버가 토큰 발급 후 `(/oauth/callback)`로 전달 (Dev/Test 용)

**Response**

- 브라우저 리다이렉트 기반 동작 (JSON 응답 X)

---

### 2) Token Callback (Dev/Test)

- **Method**: `GET`
- **URL**: `/oauth/callback`
- **Query Params**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| accessToken | string | ✅ | JWT Access Token |
| refreshToken | string | ✅ | JWT Refresh Token |
- **Description**: 서버가 발급한 토큰을 전달받는 콜백 엔드포인트 (현재 테스트용 HTML 응답)

---

### 3) Logout

- **Method**: `POST`
- **URL**: `/api/auth/logout`
- **Headers**: Authorization 필요
- **Description**: 토큰 유효성 검증 후 성공 응답 반환 (클라이언트는 토큰 폐기)

**Response (Example)**

```json
{
"status":"SUCCESS",
"message":"Logout success",
"data":null
}

```

---

### 4) Refresh Token

- **Method**: `POST`
- **URL**: `/api/auth/refresh`
- **Body**

```json
{
"refreshToken":"eyJ..."
}

```

**Response 200 (Example)**

```json
{
"status":"SUCCESS",
"message":"Token refreshed",
"data":{
"accessToken":"eyJ...",
"refreshToken":"eyJ..."
}
}

```

---

## 2. Users

### 1) Get My Info

- **Method**: `GET`
- **URL**: `/api/users/me`
- **Headers**: Authorization 필요

**Response 200 (Example)**

```json
{
"status":"SUCCESS",
"message":"OK",
"data":{
"id":1,
"email":"user@example.com",
"nickname":"BookLover",
"profileImage":"https://...",
"favoriteGenres":["NOVEL","ESSAY"]
}
}

```

---

### 2) Update My Info

- **Method**: `PATCH`
- **URL**: `/api/users/me`
- **Headers**: Authorization 필요
- **Body (모두 optional)**

```json
{
"nickname":"NewName",
"profileImage":"https://...",
"favoriteGenres":["SF","HISTORY"]
}

```

**Response (Example)**

```json
{
"status":"SUCCESS",
"message":"Updated",
"data":null
}

```

---

## 3. Posts

### 1) List Posts

- **Method**: `GET`
- **URL**: `/api/posts`
- **Query Params**

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| page | number | ❌ | 1 | 페이지 번호 |
| limit | number | ❌ | 20 | 페이지당 개수 |
| sort | string | ❌ | latest | 정렬 기준 |
| search | string | ❌ | - | 검색 키워드 |

**Response 200**

- 페이징 리스트 반환 (구조는 프로젝트 구현에 따라 달라질 수 있음)

---

### 2) Get Post Detail

- **Method**: `GET`
- **URL**: `/api/posts/{id}`
- **Path Params**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| id | number | ✅ | 게시글 ID |

---

### 3) Create Post

- **Method**: `POST`
- **URL**: `/api/posts`
- **Headers**: Authorization 필요
- **Body**

```json
{
"title":"My Review",
"content":"# Markdown Content",
"contentFormat":"MD"
}

```

- `contentFormat`: optional (default: `"MD"`)

---

### 4) Update Post

- **Method**: `PATCH`
- **URL**: `/api/posts/{id}`
- **Headers**: Authorization 필요
- **Body**: Create Post와 동일한 구조 (필드 모두 optional)

```json
{
"title":"Updated title",
"content":"Updated content",
"contentFormat":"MD"
}

```

---

### 5) Delete Post

- **Method**: `DELETE`
- **URL**: `/api/posts/{id}`
- **Headers**: Authorization 필요

---

## 4. Comments

### 1) List Comments

- **Method**: `GET`
- **URL**: `/api/posts/{postId}/comments`
- **Path Params**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| postId | number | ✅ | 게시글 ID |

---

### 2) Create Comment

- **Method**: `POST`
- **URL**: `/api/posts/{postId}/comments`
- **Headers**: Authorization 필요
- **Body**

```json
{
"content":"Great review!"
}

```

---

### 3) Update Comment

- **Method**: `PATCH`
- **URL**: `/api/comments/{id}`
- **Headers**: Authorization 필요
- **Body**

```json
{
"content":"Updated content"
}

```

---

### 4) Delete Comment

- **Method**: `DELETE`
- **URL**: `/api/comments/{id}`
- **Headers**: Authorization 필요

---

## 5. Uploads

### 1) Get Presigned URL

- **Method**: `GET`
- **URL**: `/api/upload/presigned-url`
- **Headers**: Authorization 필요
- **Query Params**

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| filename | string | ✅ | - | 원본 파일명 (예: `image.png`) |
| contentType | string | ❌ | `image/png` | MIME 타입 |

**Response 200 (Example)**

```json
{
"status":"SUCCESS",
"message":"OK",
"data":{
"presignedUrl":"https://s3.ap-northeast-2.amazonaws.com/...",
"imageUrl":"https://s3.ap-northeast-2.amazonaws.com/..."
}
}

```

> 업로드는 presignedUrl로 클라이언트가 S3에 직접 PUT 하고, 게시글/프로필 등에 저장할 URL은 imageUrl을 사용.
> 

---

## 6. Test & Debug

### 1) Authentication Check

- **Method**: `GET`
- **URL**: `/api/test/check`
- **Headers**: Authorization 필요

**Response 200 (Example)**

```json
{
"status":"SUCCESS",
"message":"Ok",
"data":null
}

```