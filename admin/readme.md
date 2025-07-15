# 슬라이더 이미지 관리 시스템 - Cloudinary 설정 가이드

## 📋 개요
이 시스템은 Netlify와 같은 정적 호스팅 환경에서도 이미지가 영구적으로 저장되도록 Cloudinary 클라우드 서비스를 사용합니다.

## 🔧 Cloudinary 설정 방법

### 1단계: Cloudinary 계정 생성
1. [Cloudinary 웹사이트](https://cloudinary.com)에 접속
2. "Sign up for free" 클릭하여 무료 계정 생성
3. 이메일 인증 완료

### 2단계: 클라우드 정보 확인
1. Cloudinary 대시보드에 로그인
2. 상단에 표시된 **Cloud name** 확인 및 복사
   - 예: `your-cloud-name`

### 3단계: Upload Preset 생성
1. 대시보드에서 **Settings(톱니바퀴 아이콘)** 클릭
2. **Upload** 탭 클릭
3. **Upload presets** 섹션에서 **Add upload preset** 클릭
4. 다음과 같이 설정:
   - **Preset name**: `slider_images` (원하는 이름으로 변경 가능)
   - **Signing Mode**: `Unsigned` 선택 (중요!)
   - **Folder**: `slider-images` (선택사항)
   - **Auto-tagging**: 원하는 태그 추가 (선택사항)
5. **Save** 클릭

### 4단계: 설정 파일 수정
`admin/admin-script.js` 파일에서 다음 부분을 수정:

```javascript
// 이 부분을 찾아서 수정하세요
const CLOUDINARY_CONFIG = {
    cloudName: 'your-actual-cloud-name', // 2단계에서 확인한 Cloud name
    uploadPreset: 'slider_images' // 3단계에서 생성한 Preset name
};
```

**예시:**
```javascript
const CLOUDINARY_CONFIG = {
    cloudName: 'dh2k3l9x8', // 실제 클라우드 이름으로 변경
    uploadPreset: 'slider_images'
};
```

## 🎯 사용 방법

### 업로드 방식 선택
1. 관리자 페이지에서 **"업로드 방식"** 드롭다운 확인
2. **"클라우드 업로드 (영구)"** 선택

### 이미지 업로드
1. **"☁️ 클라우드에 이미지 업로드"** 버튼 클릭
2. Cloudinary 업로드 위젯이 열림
3. 이미지 선택 방법:
   - **Local**: 컴퓨터에서 파일 선택
   - **URL**: 인터넷 이미지 URL 입력
   - **Camera**: 웹캠으로 촬영 (지원 브라우저만)
4. **크롭 기능**: 자동으로 16:9 비율로 크롭 영역 표시
   - 크롭 영역 조정 가능
   - 건너뛰기도 가능
5. **Upload** 클릭

### 이미지 관리
- **✅ 영구 저장됨**: 클라우드 이미지는 삭제하지 않는 한 영구 보존
- **원본 보기**: 클라우드 이미지의 "원본 보기" 버튼으로 실제 URL 확인
- **설정 백업**: "설정 내보내기"로 JSON 파일 다운로드

## 🔍 문제 해결

### "Cloudinary 설정이 필요합니다" 오류
- `admin-script.js`의 `CLOUDINARY_CONFIG`에서 `YOUR_CLOUD_NAME`과 `YOUR_UPLOAD_PRESET`을 실제 값으로 변경했는지 확인

### 업로드 위젯이 열리지 않음
- 인터넷 연결 확인
- 브라우저의 팝업 차단 해제
- Upload Preset의 Signing Mode가 "Unsigned"인지 확인

### 이미지가 표시되지 않음
- Cloudinary 계정이 활성화되어 있는지 확인
- 업로드된 이미지가 Public으로 설정되어 있는지 확인

## 📊 Cloudinary 무료 플랜 제한
- **저장 용량**: 25GB
- **월간 대역폭**: 25GB
- **월간 변환**: 25,000회
- 일반적인 슬라이더 사용에는 충분함

## 💡 팁
1. **이미지 최적화**: Cloudinary가 자동으로 WebP 등 최적 포맷으로 변환
2. **빠른 로딩**: 전 세계 CDN을 통해 빠른 이미지 로딩
3. **반응형**: URL 파라미터로 다양한 크기 생성 가능
4. **백업**: 정기적으로 "설정 내보내기"로 백업 권장 