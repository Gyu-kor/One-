// 슬라이더 관련 변수
let currentSlide = 0;
let slides = [];
let slideInterval;

// 고정 슬라이드 텍스트
const fixedSlideTexts = [
    {
        title: '안전한 식품, 의약품 환경을 위한',
        subtitle: 'HACCP, GMP 인증 전문 컨설팅'
    },
    {
        title: '스마트팜과 클린룸의 전문가',
        subtitle: '혁신적인 기술로 미래 농업과 청정 환경을 선도합니다'
    },
    {
        title: '20년 경험의 신뢰할 수 있는 파트너',
        subtitle: '고객과 함께 성장하는 전문 컨설팅 기업'
    }
];

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    console.log('페이지 로드 완료');
    initializeSlider();
    initializePortfolio();
    initializeNavigation();
    initializeContactForm();
    initializeKeyboardControls(); // 키보드 제어 초기화 추가
    
    // 관리자에서 슬라이더 업데이트 메시지 수신
    window.addEventListener('message', function(event) {
        if (event.data.type === 'updateSlider') {
            console.log('관리자로부터 슬라이더 업데이트 수신');
            updateSliderFromAdmin(event.data.config);
        }
    });
});

// 키보드 제어 초기화
function initializeKeyboardControls() {
    document.addEventListener('keydown', function(event) {
        // 입력 필드나 텍스트 에리어에서는 키보드 제어 비활성화
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }
        
        switch(event.key) {
            case 'ArrowLeft':
                event.preventDefault();
                previousSlide();
                break;
            case 'ArrowRight':
                event.preventDefault();
                nextSlide();
                break;
        }
    });
}

// 슬라이더 초기화
function initializeSlider() {
    console.log('슬라이더 초기화 시작');
    loadSliderData();
    createSlider();
    startAutoSlide();
}

// 슬라이더 데이터 로드
function loadSliderData() {
    // 로컬스토리지에서 이미지만 가져오기
    const savedConfig = localStorage.getItem('sliderConfig');
    let sliderImages = [];
    
    if (savedConfig) {
        try {
            const config = JSON.parse(savedConfig);
            sliderImages = config.slides || [];
            console.log('로컬스토리지에서 이미지 로드:', sliderImages.length, '개');
        } catch (error) {
            console.error('로컬스토리지 파싱 오류:', error);
        }
    }
    
    // 슬라이드 생성 - 텍스트는 고정, 이미지만 동적
    slides = [];
    for (let i = 0; i < Math.max(fixedSlideTexts.length, sliderImages.length); i++) {
        const textIndex = i % fixedSlideTexts.length; // 텍스트는 순환
        slides.push({
            id: i + 1,
            title: fixedSlideTexts[textIndex].title,
            subtitle: fixedSlideTexts[textIndex].subtitle,
            image: sliderImages[i] ? sliderImages[i].image : '',
            active: true
        });
    }
    
    // 최소 3개는 보장
    if (slides.length < 3) {
        for (let i = slides.length; i < 3; i++) {
            const textIndex = i % fixedSlideTexts.length;
            slides.push({
                id: i + 1,
                title: fixedSlideTexts[textIndex].title,
                subtitle: fixedSlideTexts[textIndex].subtitle,
                image: '',
                active: true
            });
        }
    }
    
    console.log('최종 슬라이드:', slides.length, '개');
}

// 슬라이더 생성
function createSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    if (!sliderContainer) {
        console.error('슬라이더 컨테이너를 찾을 수 없습니다');
        return;
    }
    
    if (!slides || slides.length === 0) {
        console.error('슬라이드 데이터가 없습니다');
        return;
    }

    console.log('슬라이더 생성:', slides.length, '개 슬라이드');

    // 슬라이더 HTML 생성
    const slidesHTML = slides.map((slide, index) => `
        <div class="slide ${index === 0 ? 'active' : ''}" style="background-image: ${slide.image ? `url('${slide.image}')` : 'linear-gradient(135deg, #1e3a8a 0%, #0d9488 100%)'}">
            <div class="slide-logo">
                <img src="logo.png" alt="더원디자인그룹(주)" class="company-logo">
                <div class="company-name">
                    <h2>더원디자인그룹(주)</h2>
                    <p>HACCP, GMP 인증 전문 컨설팅</p>
                </div>
            </div>
        </div>
    `).join('');

    // 좌우 화살표 컨트롤 추가
    const controlsHTML = `
        <div class="slider-controls">
            <button class="prev-btn" onclick="previousSlide()">‹</button>
            <button class="next-btn" onclick="nextSlide()">›</button>
        </div>
    `;

    sliderContainer.innerHTML = slidesHTML + controlsHTML;
    console.log('슬라이더 HTML 생성 완료');
}

// 관리자에서 업데이트 받기
function updateSliderFromAdmin(config) {
    console.log('관리자로부터 설정 업데이트 받음');
    
    // 로컬스토리지 업데이트
    localStorage.setItem('sliderConfig', JSON.stringify(config));
    
    // 슬라이더 다시 로드
    loadSliderData();
    createSlider();
    startAutoSlide();
    
    console.log('슬라이더 업데이트 완료');
}

// 자동 슬라이드
function startAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
    
    slideInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}

function nextSlide() {
    const currentSlideElement = document.querySelector('.slide.active');
    if (currentSlideElement) {
        currentSlideElement.classList.remove('active');
    }
    
    currentSlide = (currentSlide + 1) % slides.length;
    
    const nextSlideElement = document.querySelectorAll('.slide')[currentSlide];
    if (nextSlideElement) {
        nextSlideElement.classList.add('active');
    }
}

function previousSlide() {
    const currentSlideElement = document.querySelector('.slide.active');
    if (currentSlideElement) {
        currentSlideElement.classList.remove('active');
    }
    
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    
    const previousSlideElement = document.querySelectorAll('.slide')[currentSlide];
    if (previousSlideElement) {
        previousSlideElement.classList.add('active');
    }
}

// 포트폴리오 초기화
function initializePortfolio() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const imageSrc = this.querySelector('img').src;
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            
            openPortfolioModal(imageSrc, title, description);
        });
    });
}

// 포트폴리오 모달 열기
function openPortfolioModal(imageSrc, title, description) {
    const modal = document.getElementById('portfolioModal');
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    if (modal && modalImg && modalTitle && modalDescription) {
        modalImg.src = imageSrc;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modal.style.display = 'block';
    }
}

// 포트폴리오 모달 닫기
function closePortfolioModal() {
    const modal = document.getElementById('portfolioModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// 네비게이션 초기화
function initializeNavigation() {
    // 모바일 메뉴 토글
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // 스크롤 시 네비게이션 스타일 변경
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (nav) {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    });

    // 부드러운 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // 모바일 메뉴 닫기
                const navLinks = document.querySelector('.nav-links');
                if (navLinks) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
}

// 연락처 폼 초기화
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 폼 데이터 수집
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // 간단한 유효성 검사
            if (!data.name || !data.email || !data.message) {
                alert('필수 항목을 모두 입력해주세요.');
                return;
            }
            
            // 이메일 형식 검사
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('올바른 이메일 주소를 입력해주세요.');
                return;
            }
            
            // 실제 서비스에서는 서버로 데이터를 전송
            alert('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
            this.reset();
        });
    }
}

// 페이지 로드 애니메이션
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// 스크롤 애니메이션
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// 페이지 로드 완료 시 스크롤 애니메이션 초기화
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeScrollAnimations, 100);
}); 