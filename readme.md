# 더원디자인그룹 스타일 인테리어 디자인 홈페이지

더원디자인그룹 스타일의 모던하고 세련된 인테리어 디자인 회사 홈페이지입니다.

## 📋 프로젝트 개요

- **기술 스택**: HTML5, CSS3, JavaScript (바닐라)
- **반응형 디자인**: 모바일, 태블릿, PC 모든 기기 대응
- **디자인 컨셉**: 미니멀하고 전문적인 블랙/그레이 톤
- **주요 기능**: 이미지 슬라이더, 포트폴리오 관리, 모달 시스템, 반응형 네비게이션

## 🚀 시작하기

### 1. 파일 구조
```
프로젝트 폴더/
├── index.html              # 메인 페이지
├── css/
│   ├── style.css          # 메인 스타일시트
│   └── responsive.css     # 반응형 스타일시트
├── js/
│   ├── main.js           # 메인 JavaScript 기능
│   └── portfolio.js      # 포트폴리오 관리 기능
├── images/
│   ├── slider/           # 메인 슬라이더 이미지
│   └── portfolio/        # 포트폴리오 이미지
└── README.md
```

### 2. 웹사이트 실행
1. 모든 파일을 웹 서버에 업로드하거나 로컬 서버에서 실행
2. `index.html` 파일을 브라우저에서 열기
3. 모든 기능이 정상적으로 작동하는지 확인

## 🎨 커스터마이징 가이드

### 회사 정보 수정

#### 1. 기본 정보 변경 (`index.html`)
```html
<!-- 회사명 변경 -->
<h1>더원디자인그룹</h1>

<!-- 전화번호 변경 -->
<a href="tel:1833-6535" class="call-btn">📞 전화하기</a>

<!-- 주소 변경 -->
<p>서울시 강남구 테헤란로 123길 45</p>
```

#### 2. 회사 소개 텍스트 수정
`index.html`의 About 섹션에서 회사 소개 내용을 수정할 수 있습니다.

### 메인 슬라이더 관리

#### 1. 슬라이더 텍스트 변경 (`index.html`)
```html
<div class="slide-content">
    <h2>공간을 예술로 만드는</h2>
    <h3>더원디자인그룹</h3>
    <p>당신의 꿈을 현실로 만들어드립니다</p>
    <a href="#contact" class="cta-btn">상담 문의하기</a>
</div>
```

#### 2. 슬라이더 이미지 변경
- `images/slider/` 폴더에 이미지 파일 추가
- CSS에서 배경 이미지 경로 수정:

```css
.slide:nth-child(1) .slide-bg {
    background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('../images/slider/slide1.jpg');
    background-size: cover;
    background-position: center;
}
```

### 포트폴리오 관리

#### 1. 포트폴리오 추가 (`js/portfolio.js`)
```javascript
const portfolioData = [
    {
        id: 1,
        title: "프로젝트 제목",
        description: "프로젝트 설명",
        location: "위치",
        area: "면적",
        date: "완공일",
        category: "residential", // residential, commercial, office
        thumbnail: "썸네일 이미지 URL",
        images: [
            "이미지1 URL",
            "이미지2 URL",
            "이미지3 URL"
        ],
        details: {
            client: "고객명",
            duration: "기간",
            budget: "예산",
            style: "스타일"
        }
    }
    // 추가 포트폴리오...
];
```

#### 2. 포트폴리오 이미지 관리
- `images/portfolio/` 폴더에 이미지 파일 업로드
- 고해상도 이미지 사용 권장 (최소 800x600px)
- 웹 최적화된 형식 사용 (JPG, WebP)

### 색상 테마 변경

#### 1. 메인 색상 변경 (`css/style.css`)
```css
:root {
    --primary-color: #333;      /* 메인 색상 */
    --secondary-color: #666;    /* 보조 색상 */
    --accent-color: #555;       /* 강조 색상 */
    --text-color: #333;         /* 텍스트 색상 */
    --background-color: #fff;   /* 배경 색상 */
    --light-gray: #f8f9fa;     /* 연한 회색 */
}
```

#### 2. 그라데이션 색상 변경
```css
.slide:nth-child(1) .slide-bg {
    background: linear-gradient(135deg, #새로운색상1 0%, #새로운색상2 100%);
}
```

### 연락처 정보 수정

#### 1. 연락처 변경 (`index.html`)
```html
<div class="contact-item">
    <strong>📞 대표번호</strong>
    <p>새로운 전화번호</p>
</div>
```

#### 2. 전화 링크 수정
```html
<a href="tel:새로운번호" class="call-btn">📞 전화하기</a>
```

## 🔧 고급 설정

### 1. 이미지 최적화
- 이미지 압축 도구 사용 (TinyPNG, ImageOptim 등)
- WebP 형식 사용으로 로딩 속도 개선
- 적절한 이미지 크기 사용

### 2. SEO 최적화
```html
<!-- 메타 태그 추가 -->
<meta name="description" content="더원디자인그룹 - 전문 인테리어 디자인 회사">
<meta name="keywords" content="인테리어, 디자인, 리모델링, 인테리어업체">
<meta property="og:title" content="더원디자인그룹">
<meta property="og:description" content="전문 인테리어 디자인 서비스">
<meta property="og:image" content="대표이미지URL">
```

### 3. 성능 최적화
- CSS/JS 파일 압축
- 이미지 지연 로딩 (Lazy Loading) 활용
- 캐싱 설정

### 4. 폼 연동
실제 서비스에서는 폼 제출 시 서버로 데이터 전송:

```javascript
// 실제 서버 연동 예시
async function handleConsultSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
        const response = await fetch('/api/consultation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            alert('상담 신청이 접수되었습니다.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
```

## 📱 반응형 디자인

### 브레이크포인트
- **PC**: 1024px 이상
- **태블릿**: 768px - 1024px
- **모바일**: 768px 이하
- **소형 모바일**: 480px 이하

### 모바일 최적화
- 터치 친화적 버튼 크기
- 읽기 쉬운 폰트 크기
- 간소화된 네비게이션

## 🌐 브라우저 지원

- **Chrome**: 최신 버전
- **Firefox**: 최신 버전
- **Safari**: 최신 버전
- **Edge**: 최신 버전
- **IE**: 11 이상 (제한적 지원)

## 🚀 배포 가이드

### 1. 웹 호스팅 서비스
- GitHub Pages
- Netlify
- Vercel
- AWS S3

### 2. 배포 전 체크리스트
- [ ] 모든 이미지 경로 확인
- [ ] 연락처 정보 실제 정보로 변경
- [ ] 포트폴리오 데이터 실제 데이터로 변경
- [ ] 메타 태그 및 SEO 설정
- [ ] 모바일 테스트 완료
- [ ] 브라우저 호환성 테스트

## 🛠️ 문제 해결

### 자주 발생하는 문제

1. **이미지가 표시되지 않음**
   - 이미지 경로 확인
   - 파일 권한 확인
   - 이미지 파일 존재 여부 확인

2. **모바일에서 레이아웃 깨짐**
   - viewport 메타 태그 확인
   - CSS 미디어 쿼리 확인

3. **슬라이더가 작동하지 않음**
   - JavaScript 오류 확인
   - 콘솔 로그 확인

## 📞 지원

웹사이트 사용 중 문제가 발생하면:
1. 브라우저 콘솔에서 오류 메시지 확인
2. 파일 경로 및 권한 확인
3. 브라우저 캐시 삭제 후 재시도

---

**더원디자인그룹 스타일 홈페이지** - 전문적이고 세련된 인테리어 디자인 회사를 위한 완벽한 솔루션 