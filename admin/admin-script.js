// 전역 변수
let sliderConfig = {
    slides: []
};

let currentFile = null;
let cropArea = null;
let isDragging = false;
let isResizing = false;
let dragStart = { x: 0, y: 0 };
let resizeHandle = null;

// Cloudinary 설정 변수
let cloudinaryConfig = {
    cloudName: '',
    uploadPreset: '',
    apiKey: ''
};

// Cloudinary 업로드 위젯 변수
let cloudinaryWidget = null;

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('관리자 페이지 로드 완료');
    loadSliderConfig();
    setupEventListeners();
    renderSlides();
    updatePositionSelect();
    
    // Cloudinary 설정 로드
    loadCloudinaryConfig();
    
    // Cloudinary 라이브러리 로드 확인
    if (typeof cloudinary !== 'undefined') {
        console.log('Cloudinary 라이브러리 로드됨');
    } else {
        console.warn('Cloudinary 라이브러리가 로드되지 않았습니다');
    }
});

// 설정 로드
function loadSliderConfig() {
    const savedConfig = localStorage.getItem('sliderConfig');
    if (savedConfig) {
        try {
            sliderConfig = JSON.parse(savedConfig);
            console.log('저장된 설정 로드:', sliderConfig.slides.length, '개 슬라이드');
        } catch (error) {
            console.error('설정 로드 오류:', error);
            sliderConfig = { slides: [] };
        }
    } else {
        sliderConfig = { slides: [] };
        console.log('새로운 설정 시작');
    }
}

// 이벤트 리스너 설정
function setupEventListeners() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const saveButton = document.getElementById('saveButton');
    const confirmUpload = document.getElementById('confirmUpload');
    const cancelUpload = document.getElementById('cancelUpload');
    const cropOption = document.getElementById('cropOption');
    const uploadMethod = document.getElementById('uploadMethod');
    const cloudUploadBtn = document.getElementById('cloudUploadBtn');
    const exportConfig = document.getElementById('exportConfig');
    const importConfig = document.getElementById('importConfig');
    const importFileInput = document.getElementById('importFileInput');

    // 업로드 방식 변경
    uploadMethod.addEventListener('change', (e) => {
        toggleUploadMethod(e.target.value);
    });

    // 클라우드 업로드 버튼
    cloudUploadBtn.addEventListener('click', openCloudinaryWidget);

    // 설정 내보내기
    exportConfig.addEventListener('click', exportConfiguration);

    // 설정 가져오기
    importConfig.addEventListener('click', () => {
        importFileInput.click();
    });

    importFileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            importConfiguration(e.target.files[0]);
        }
    });

    // 파일 업로드 영역 클릭
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    // 드래그 앤 드롭
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    });

    // 파일 선택
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileSelect(e.target.files[0]);
        }
    });

    // 미리보기 버튼들
    confirmUpload.addEventListener('click', confirmImageUpload);
    cancelUpload.addEventListener('click', cancelImageUpload);

    // 설정 저장
    saveButton.addEventListener('click', saveConfig);

    // 크롭 영역 이벤트 설정
    setupCropEvents();

    // 크롭 옵션 변경
    cropOption.addEventListener('change', (e) => {
        toggleCropOverlay(e.target.value === 'crop');
    });
}

// 파일 선택 처리
function handleFileSelect(file) {
    // 파일 형식 검증
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
        showMessage('지원하지 않는 파일 형식입니다. (JPG, PNG, GIF, WebP만 지원)', 'error');
        return;
    }

    // 파일 크기 검증 (5MB)
    if (file.size > 5 * 1024 * 1024) {
        showMessage('파일 크기는 5MB 이하만 가능합니다.', 'error');
        return;
    }

    currentFile = file;
    showPreview(file);
}

// 미리보기 표시
function showPreview(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const previewImage = document.getElementById('previewImage');
        const previewSection = document.getElementById('previewSection');
        
        previewImage.src = e.target.result;
        previewSection.style.display = 'block';
        
        // 크롭 영역 초기화
        resetCropArea();
        
        // 업로드 영역 숨기기
        document.getElementById('uploadArea').style.display = 'none';
    };
    
    reader.readAsDataURL(file);
}

// 크롭 영역 초기화
function resetCropArea() {
    const cropAreaElement = document.getElementById('cropArea');
    const previewImage = document.getElementById('previewImage');
    
    // 이미지가 로드되면 비율에 맞게 크롭 영역 설정
    previewImage.onload = function() {
        const imageAspectRatio = previewImage.naturalWidth / previewImage.naturalHeight;
        
        if (imageAspectRatio > 1.5) {
            // 가로가 긴 이미지 (16:9 비율에 맞춤)
            cropAreaElement.style.top = '25%';
            cropAreaElement.style.left = '10%';
            cropAreaElement.style.width = '80%';
            cropAreaElement.style.height = '50%';
        } else if (imageAspectRatio < 0.8) {
            // 세로가 긴 이미지 (9:16 비율에 맞춤)
            cropAreaElement.style.top = '10%';
            cropAreaElement.style.left = '25%';
            cropAreaElement.style.width = '50%';
            cropAreaElement.style.height = '80%';
        } else {
            // 정사각형에 가까운 이미지
            cropAreaElement.style.top = '20%';
            cropAreaElement.style.left = '20%';
            cropAreaElement.style.width = '60%';
            cropAreaElement.style.height = '60%';
        }
    };
}

// 크롭 오버레이 표시/숨김
function toggleCropOverlay(showCrop) {
    const cropOverlay = document.querySelector('.crop-overlay');
    if (showCrop) {
        cropOverlay.classList.remove('hidden');
    } else {
        cropOverlay.classList.add('hidden');
    }
}

// 업로드 방식 전환
function toggleUploadMethod(method) {
    const localSection = document.getElementById('localUploadSection');
    const cloudSection = document.getElementById('cloudUploadSection');
    
    if (method === 'cloudinary') {
        localSection.style.display = 'none';
        cloudSection.style.display = 'block';
        
        // Cloudinary 설정 확인
        if (CLOUDINARY_CONFIG.cloudName === 'YOUR_CLOUD_NAME' || 
            CLOUDINARY_CONFIG.uploadPreset === 'YOUR_UPLOAD_PRESET') {
            showMessage('Cloudinary 설정이 필요합니다. admin-script.js 파일에서 CLOUDINARY_CONFIG를 수정해주세요.', 'error');
        }
    } else {
        localSection.style.display = 'block';
        cloudSection.style.display = 'none';
    }
}

// Cloudinary 업로드 위젯 열기
function openCloudinaryWidget() {
    if (CLOUDINARY_CONFIG.cloudName === 'YOUR_CLOUD_NAME' || 
        CLOUDINARY_CONFIG.uploadPreset === 'YOUR_UPLOAD_PRESET') {
        showMessage('Cloudinary 설정을 먼저 완료해주세요.', 'error');
        return;
    }

    const widget = cloudinary.createUploadWidget({
        cloudName: CLOUDINARY_CONFIG.cloudName,
        uploadPreset: CLOUDINARY_CONFIG.uploadPreset,
        sources: ['local', 'url', 'camera'],
        multiple: false,
        maxFileSize: 5000000, // 5MB
        clientAllowedFormats: ['jpeg', 'jpg', 'png', 'gif', 'webp'],
        cropping: true,
        croppingAspectRatio: 16/9, // 기본 비율
        croppingShowBackButton: true,
        croppingCoordinatesMode: 'custom',
        folder: 'slider-images', // Cloudinary 폴더
        resourceType: 'image'
    }, (error, result) => {
        if (error) {
            console.error('Cloudinary 업로드 오류:', error);
            showMessage('이미지 업로드 중 오류가 발생했습니다.', 'error');
            return;
        }

        if (result.event === 'success') {
            const imageUrl = result.info.secure_url;
            addCloudSlideToConfig(imageUrl, result.info);
            showMessage('클라우드 이미지가 성공적으로 추가되었습니다!', 'success');
        }
    });

    widget.open();
}

// 클라우드 이미지를 설정에 추가
function addCloudSlideToConfig(imageUrl, imageInfo) {
    const slideData = {
        id: Date.now(),
        image: imageUrl,
        type: 'cloud',
        cloudInfo: {
            publicId: imageInfo.public_id,
            width: imageInfo.width,
            height: imageInfo.height,
            format: imageInfo.format
        }
    };
    
    sliderConfig.slides.push(slideData);
    
    // UI 업데이트
    renderSlides();
    updatePositionSelect();
}

// 크롭 영역 이벤트 설정
function setupCropEvents() {
    const cropAreaElement = document.getElementById('cropArea');
    const handles = document.querySelectorAll('.resize-handle');

    // 크롭 영역 드래그
    cropAreaElement.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('resize-handle')) return;
        
        isDragging = true;
        dragStart.x = e.clientX;
        dragStart.y = e.clientY;
        
        const rect = cropAreaElement.getBoundingClientRect();
        const containerRect = cropAreaElement.parentElement.getBoundingClientRect();
        
        dragStart.cropLeft = rect.left - containerRect.left;
        dragStart.cropTop = rect.top - containerRect.top;
        
        e.preventDefault();
    });

    // 리사이즈 핸들 드래그
    handles.forEach(handle => {
        handle.addEventListener('mousedown', (e) => {
            isResizing = true;
            resizeHandle = handle.className.split(' ')[1]; // top-left, top-right 등
            
            dragStart.x = e.clientX;
            dragStart.y = e.clientY;
            
            const rect = cropAreaElement.getBoundingClientRect();
            const containerRect = cropAreaElement.parentElement.getBoundingClientRect();
            
            dragStart.cropLeft = rect.left - containerRect.left;
            dragStart.cropTop = rect.top - containerRect.top;
            dragStart.cropWidth = rect.width;
            dragStart.cropHeight = rect.height;
            
            e.preventDefault();
            e.stopPropagation();
        });
    });

    // 마우스 이동
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            handleCropDrag(e);
        } else if (isResizing) {
            handleCropResize(e);
        }
    });

    // 마우스 업
    document.addEventListener('mouseup', () => {
        isDragging = false;
        isResizing = false;
        resizeHandle = null;
    });
}

// 크롭 영역 드래그 처리
function handleCropDrag(e) {
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    const container = document.getElementById('cropArea').parentElement;
    const containerRect = container.getBoundingClientRect();
    
    const newLeft = dragStart.cropLeft + deltaX;
    const newTop = dragStart.cropTop + deltaY;
    
    const cropArea = document.getElementById('cropArea');
    const cropRect = cropArea.getBoundingClientRect();
    
    // 경계 체크
    if (newLeft >= 0 && newLeft + cropRect.width <= containerRect.width) {
        cropArea.style.left = ((newLeft / containerRect.width) * 100) + '%';
    }
    
    if (newTop >= 0 && newTop + cropRect.height <= containerRect.height) {
        cropArea.style.top = ((newTop / containerRect.height) * 100) + '%';
    }
}

// 크롭 영역 리사이즈 처리
function handleCropResize(e) {
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    const container = document.getElementById('cropArea').parentElement;
    const containerRect = container.getBoundingClientRect();
    const cropArea = document.getElementById('cropArea');
    
    let newLeft = dragStart.cropLeft;
    let newTop = dragStart.cropTop;
    let newWidth = dragStart.cropWidth;
    let newHeight = dragStart.cropHeight;
    
    switch (resizeHandle) {
        case 'top-left':
            newLeft = dragStart.cropLeft + deltaX;
            newTop = dragStart.cropTop + deltaY;
            newWidth = dragStart.cropWidth - deltaX;
            newHeight = dragStart.cropHeight - deltaY;
            break;
        case 'top-right':
            newTop = dragStart.cropTop + deltaY;
            newWidth = dragStart.cropWidth + deltaX;
            newHeight = dragStart.cropHeight - deltaY;
            break;
        case 'bottom-left':
            newLeft = dragStart.cropLeft + deltaX;
            newWidth = dragStart.cropWidth - deltaX;
            newHeight = dragStart.cropHeight + deltaY;
            break;
        case 'bottom-right':
            newWidth = dragStart.cropWidth + deltaX;
            newHeight = dragStart.cropHeight + deltaY;
            break;
    }
    
    // 최소 크기 및 경계 체크
    const minSize = 50;
    if (newWidth >= minSize && newHeight >= minSize &&
        newLeft >= 0 && newTop >= 0 &&
        newLeft + newWidth <= containerRect.width &&
        newTop + newHeight <= containerRect.height) {
        
        cropArea.style.left = ((newLeft / containerRect.width) * 100) + '%';
        cropArea.style.top = ((newTop / containerRect.height) * 100) + '%';
        cropArea.style.width = ((newWidth / containerRect.width) * 100) + '%';
        cropArea.style.height = ((newHeight / containerRect.height) * 100) + '%';
    }
}

// 이미지 업로드 확인
function confirmImageUpload() {
    if (!currentFile) return;
    
    const cropOption = document.getElementById('cropOption').value;
    const reader = new FileReader();
    
    reader.onload = function(e) {
        if (cropOption === 'original') {
            // 원본 그대로 처리
            processOriginalImage(e.target.result);
        } else {
            // 크롭된 이미지 생성
            const croppedImage = cropImage(e.target.result);
            
            croppedImage.then(croppedDataURL => {
                addSlideToConfig(croppedDataURL);
            }).catch(error => {
                console.error('이미지 크롭 오류:', error);
                showMessage('이미지 처리 중 오류가 발생했습니다.', 'error');
            });
        }
    };
    
    reader.readAsDataURL(currentFile);
}

// 원본 이미지 처리
function processOriginalImage(imageSrc) {
    const img = new Image();
    img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // 최대 크기 제한 (선택사항)
        const maxWidth = 1920;
        const maxHeight = 1080;
        let outputWidth = img.naturalWidth;
        let outputHeight = img.naturalHeight;
        
        // 이미지가 너무 크면 비율을 유지하면서 축소
        if (outputWidth > maxWidth || outputHeight > maxHeight) {
            const scale = Math.min(maxWidth / outputWidth, maxHeight / outputHeight);
            outputWidth = outputWidth * scale;
            outputHeight = outputHeight * scale;
        }
        
        canvas.width = outputWidth;
        canvas.height = outputHeight;
        
        // 원본 이미지 그리기
        ctx.drawImage(img, 0, 0, outputWidth, outputHeight);
        
        const dataURL = canvas.toDataURL('image/jpeg', 0.9);
        addSlideToConfig(dataURL);
    };
    
    img.onerror = function() {
        showMessage('이미지 처리 중 오류가 발생했습니다.', 'error');
    };
    
    img.src = imageSrc;
}

// 슬라이더 설정에 슬라이드 추가
function addSlideToConfig(imageDataURL) {
    const position = document.getElementById('slidePosition').value;
    const slideData = {
        id: Date.now(),
        image: imageDataURL
    };
    
    if (position === 'end') {
        sliderConfig.slides.push(slideData);
    } else {
        const index = parseInt(position);
        sliderConfig.slides.splice(index, 0, slideData);
    }
    
    const cropOption = document.getElementById('cropOption').value;
    const message = cropOption === 'original' ? 
        '원본 이미지가 추가되었습니다.' : 
        '크롭된 이미지가 추가되었습니다.';
    
    showMessage(message, 'success');
    
    // 미리보기 숨기기 및 초기화
    cancelImageUpload();
    
    // UI 업데이트
    renderSlides();
    updatePositionSelect();
}

// 이미지 크롭 함수
function cropImage(imageSrc) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            const previewContainer = document.getElementById('previewSection');
            const previewImage = document.getElementById('previewImage');
            const cropArea = document.getElementById('cropArea');
            
            // 크롭 영역의 실제 위치와 크기 계산
            const containerRect = previewContainer.getBoundingClientRect();
            const imageRect = previewImage.getBoundingClientRect();
            const cropRect = cropArea.getBoundingClientRect();
            
            // 이미지 내에서의 상대적 위치 계산 (퍼센트)
            const relativeX = (cropRect.left - imageRect.left) / imageRect.width;
            const relativeY = (cropRect.top - imageRect.top) / imageRect.height;
            const relativeWidth = cropRect.width / imageRect.width;
            const relativeHeight = cropRect.height / imageRect.height;
            
            // 실제 이미지 좌표로 변환
            const cropX = Math.max(0, relativeX * img.naturalWidth);
            const cropY = Math.max(0, relativeY * img.naturalHeight);
            const cropWidth = Math.min(relativeWidth * img.naturalWidth, img.naturalWidth - cropX);
            const cropHeight = Math.min(relativeHeight * img.naturalHeight, img.naturalHeight - cropY);
            
            // 캔버스 크기 설정 (최대 1920x1080으로 제한)
            const maxWidth = 1920;
            const maxHeight = 1080;
            let outputWidth = cropWidth;
            let outputHeight = cropHeight;
            
            if (outputWidth > maxWidth || outputHeight > maxHeight) {
                const scale = Math.min(maxWidth / outputWidth, maxHeight / outputHeight);
                outputWidth = outputWidth * scale;
                outputHeight = outputHeight * scale;
            }
            
            canvas.width = outputWidth;
            canvas.height = outputHeight;
            
            // 크롭된 이미지 그리기
            ctx.drawImage(
                img,
                cropX, cropY, cropWidth, cropHeight,
                0, 0, outputWidth, outputHeight
            );
            
            resolve(canvas.toDataURL('image/jpeg', 0.9));
        };
        
        img.onerror = reject;
        img.src = imageSrc;
    });
}

// 이미지 업로드 취소
function cancelImageUpload() {
    document.getElementById('previewSection').style.display = 'none';
    document.getElementById('uploadArea').style.display = 'block';
    document.getElementById('fileInput').value = '';
    currentFile = null;
}

// 슬라이드 위치 선택 업데이트
function updatePositionSelect() {
    const select = document.getElementById('slidePosition');
    const slideCount = sliderConfig.slides.length;
    
    // 기존 옵션 제거
    select.innerHTML = '';
    
    // 마지막에 추가 옵션
    const endOption = document.createElement('option');
    endOption.value = 'end';
    endOption.textContent = `마지막에 추가 (${slideCount + 1}번째)`;
    select.appendChild(endOption);
    
    // 기존 슬라이드 앞에 추가하는 옵션들
    for (let i = 0; i < slideCount; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i + 1}번째 슬라이드 앞에 추가`;
        select.appendChild(option);
    }
    
    // 첫 번째가 기본 선택되도록
    if (slideCount === 0) {
        select.value = 'end';
    }
}

// 슬라이드 목록 렌더링
function renderSlides() {
    const slidesList = document.getElementById('slidesList');
    
    if (sliderConfig.slides.length === 0) {
        slidesList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📷</div>
                <h3>등록된 이미지가 없습니다</h3>
                <p>새로운 이미지를 업로드하여 슬라이더를 시작해보세요.</p>
            </div>
        `;
        return;
    }
    
    slidesList.innerHTML = sliderConfig.slides.map((slide, index) => {
        const isCloudImage = slide.type === 'cloud';
        const imageType = isCloudImage ? '☁️ 클라우드' : '💾 로컬';
        const persistentWarning = !isCloudImage ? 
            '<div class="persistence-warning">⚠️ 임시 이미지 (새로고침 시 사라질 수 있음)</div>' : 
            '<div class="persistence-info">✅ 영구 저장됨</div>';
        
        return `
            <div class="slide-item ${isCloudImage ? 'cloud-slide' : 'local-slide'}">
                <img src="${slide.image}" alt="슬라이드 ${index + 1}" class="slide-image">
                <div class="slide-info">
                    <div class="slide-header">
                        <div class="slide-number">슬라이드 ${index + 1}</div>
                        <div class="slide-type">${imageType}</div>
                    </div>
                    ${persistentWarning}
                    ${isCloudImage && slide.cloudInfo ? 
                        `<div class="cloud-info">
                            <small>크기: ${slide.cloudInfo.width}×${slide.cloudInfo.height}</small>
                            <small>형식: ${slide.cloudInfo.format.toUpperCase()}</small>
                        </div>` : ''
                    }
                    <div class="slide-actions">
                        <button class="btn-danger" onclick="removeSlide(${slide.id})">
                            삭제
                        </button>
                        ${isCloudImage ? 
                            `<a href="${slide.image}" target="_blank" class="btn-secondary view-btn">원본 보기</a>` : 
                            ''
                        }
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// 슬라이드 삭제
function removeSlide(slideId) {
    if (confirm('이 슬라이드를 삭제하시겠습니까?')) {
        sliderConfig.slides = sliderConfig.slides.filter(slide => slide.id !== slideId);
        renderSlides();
        updatePositionSelect();
        showMessage('슬라이드가 삭제되었습니다.', 'info');
    }
}

// 설정 저장
function saveConfig() {
    try {
        localStorage.setItem('sliderConfig', JSON.stringify(sliderConfig));
        showMessage('설정이 저장되었습니다. 메인 웹사이트에 반영됩니다.', 'success');
        
        // 메인 웹사이트에 업데이트 신호 전송 (같은 도메인인 경우)
        try {
            if (window.opener && !window.opener.closed) {
                window.opener.postMessage({
                    type: 'updateSlider',
                    data: sliderConfig
                }, '*');
            }
        } catch (error) {
            console.log('부모 창에 메시지 전송 실패:', error);
        }
        
    } catch (error) {
        console.error('설정 저장 오류:', error);
        showMessage('설정 저장 중 오류가 발생했습니다.', 'error');
    }
}

// 메시지 표시
function showMessage(message, type = 'info') {
    // 기존 메시지 제거
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // 헤더 다음에 삽입
    const header = document.querySelector('.admin-header');
    header.insertAdjacentElement('afterend', messageDiv);
    
    // 3초 후 자동 제거
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 3000);
}

// ===========================================
// Cloudinary 기능
// ===========================================

// Cloudinary 설정 로드
function loadCloudinaryConfig() {
    const savedConfig = localStorage.getItem('cloudinaryConfig');
    if (savedConfig) {
        try {
            cloudinaryConfig = JSON.parse(savedConfig);
            console.log('Cloudinary 설정 로드됨');
            
            // UI 업데이트
            const cloudNameInput = document.getElementById('cloudinaryCloudName');
            const presetInput = document.getElementById('cloudinaryUploadPreset');
            const apiKeyInput = document.getElementById('cloudinaryApiKey');
            
            if (cloudNameInput) cloudNameInput.value = cloudinaryConfig.cloudName || '';
            if (presetInput) presetInput.value = cloudinaryConfig.uploadPreset || '';
            if (apiKeyInput) apiKeyInput.value = cloudinaryConfig.apiKey || '';
            
            updateCloudinaryStatus();
        } catch (error) {
            console.error('Cloudinary 설정 로드 오류:', error);
        }
    }
}

// Cloudinary 설정 저장
function saveCloudinaryConfig() {
    const cloudName = document.getElementById('cloudinaryCloudName').value.trim();
    const uploadPreset = document.getElementById('cloudinaryUploadPreset').value.trim();
    const apiKey = document.getElementById('cloudinaryApiKey').value.trim();
    
    if (!cloudName || !uploadPreset) {
        showMessage('Cloud Name과 Upload Preset은 필수 항목입니다.', 'error');
        return;
    }
    
    cloudinaryConfig = {
        cloudName,
        uploadPreset,
        apiKey
    };
    
    try {
        localStorage.setItem('cloudinaryConfig', JSON.stringify(cloudinaryConfig));
        showMessage('Cloudinary 설정이 저장되었습니다.', 'success');
        updateCloudinaryStatus();
        initializeCloudinaryWidget();
    } catch (error) {
        console.error('Cloudinary 설정 저장 오류:', error);
        showMessage('설정 저장 중 오류가 발생했습니다.', 'error');
    }
}

// Cloudinary 연결 테스트
async function testCloudinaryConnection() {
    if (!cloudinaryConfig.cloudName || !cloudinaryConfig.uploadPreset) {
        showMessage('먼저 Cloudinary 설정을 저장해주세요.', 'error');
        return;
    }
    
    try {
        showMessage('Cloudinary 연결을 테스트하고 있습니다...', 'info');
        
        // 테스트용 작은 이미지 생성 (1x1 픽셀 투명 PNG)
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const testImageData = canvas.toDataURL('image/png');
        
        const formData = new FormData();
        formData.append('file', testImageData);
        formData.append('upload_preset', cloudinaryConfig.uploadPreset);
        
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            const result = await response.json();
            showMessage('✅ Cloudinary 연결이 성공적으로 확인되었습니다!', 'success');
            
            // 테스트 이미지 삭제 (선택사항)
            if (cloudinaryConfig.apiKey && result.public_id) {
                deleteTestImage(result.public_id);
            }
        } else {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
    } catch (error) {
        console.error('Cloudinary 연결 테스트 오류:', error);
        showMessage('Cloudinary 연결 실패: ' + error.message, 'error');
    }
}

// 테스트 이미지 삭제
async function deleteTestImage(publicId) {
    try {
        // 테스트 이미지 삭제는 API Key가 필요하므로 스킵
        console.log('테스트 이미지 업로드 완료:', publicId);
    } catch (error) {
        console.log('테스트 이미지 삭제 실패 (무시해도 됨):', error);
    }
}

// Cloudinary 위젯 초기화
function initializeCloudinaryWidget() {
    if (!cloudinaryConfig.cloudName || !cloudinaryConfig.uploadPreset) {
        console.log('Cloudinary 설정이 완료되지 않음');
        return;
    }
    
    if (typeof cloudinary === 'undefined') {
        console.error('Cloudinary 라이브러리가 로드되지 않았습니다.');
        showMessage('Cloudinary 라이브러리 로드 오류', 'error');
        return;
    }
    
    try {
        cloudinaryWidget = cloudinary.createUploadWidget({
            cloudName: cloudinaryConfig.cloudName,
            uploadPreset: cloudinaryConfig.uploadPreset,
            multiple: false,
            maxFiles: 1,
            resourceType: 'image',
            clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
            maxFileSize: 10000000, // 10MB
            folder: 'slider-images',
            sources: [
                'local',
                'url',
                'camera'
            ],
            showAdvancedOptions: true,
            cropping: true,
            croppingAspectRatio: 16/9,
            theme: 'minimal'
        }, function(error, result) {
            if (error) {
                console.error('Cloudinary 업로드 오류:', error);
                showMessage('업로드 오류: ' + error.message, 'error');
                return;
            }
            
            if (result && result.event === 'success') {
                console.log('Cloudinary 업로드 성공:', result.info);
                handleCloudinaryUploadSuccess(result.info);
            }
        });
        
        console.log('Cloudinary 위젯 초기화 완료');
        updateCloudinaryStatus();
        
    } catch (error) {
        console.error('Cloudinary 위젯 초기화 오류:', error);
        showMessage('Cloudinary 위젯 초기화 실패', 'error');
    }
}

// Cloudinary 업로드 버튼 클릭
function openCloudinaryWidget() {
    if (!cloudinaryWidget) {
        showMessage('먼저 Cloudinary 설정을 완료해주세요.', 'error');
        return;
    }
    
    try {
        cloudinaryWidget.open();
    } catch (error) {
        console.error('Cloudinary 위젯 열기 오류:', error);
        showMessage('업로드 위젯을 열 수 없습니다.', 'error');
    }
}

// Cloudinary 업로드 성공 처리
function handleCloudinaryUploadSuccess(info) {
    try {
        const newSlide = {
            id: Date.now().toString(),
            backgroundImage: info.secure_url,
            type: 'cloudinary',
            cloudinaryData: {
                public_id: info.public_id,
                secure_url: info.secure_url,
                width: info.width,
                height: info.height,
                format: info.format,
                resource_type: info.resource_type,
                created_at: info.created_at
            },
            uploadedAt: new Date().toISOString()
        };
        
        sliderConfig.slides.push(newSlide);
        renderSlides();
        updatePositionSelect();
        
        showMessage('✅ 클라우드 업로드가 완료되었습니다!', 'success');
        
        // 설정 자동 저장
        saveSliderConfig();
        
    } catch (error) {
        console.error('슬라이드 추가 오류:', error);
        showMessage('슬라이드 추가 중 오류가 발생했습니다.', 'error');
    }
}

// Cloudinary 상태 업데이트
function updateCloudinaryStatus() {
    const statusDiv = document.getElementById('cloudinaryStatus');
    if (!statusDiv) return;
    
    if (cloudinaryConfig.cloudName && cloudinaryConfig.uploadPreset) {
        statusDiv.innerHTML = '<p class="status-success">✅ Cloudinary 설정이 완료되었습니다. 이제 이미지를 업로드할 수 있습니다.</p>';
        
        // 업로드 버튼 활성화
        const uploadBtn = document.getElementById('cloudUploadBtn');
        if (uploadBtn) {
            uploadBtn.disabled = false;
            uploadBtn.textContent = '☁️ 클라우드에 이미지 업로드';
        }
    } else {
        statusDiv.innerHTML = '<p class="status-warning">⚠️ Cloudinary 설정을 완료해주세요.</p>';
        
        // 업로드 버튼 비활성화
        const uploadBtn = document.getElementById('cloudUploadBtn');
        if (uploadBtn) {
            uploadBtn.disabled = true;
            uploadBtn.textContent = '설정 완료 후 업로드 가능';
        }
    }
} 