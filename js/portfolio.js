// Portfolio Data Management
const portfolioData = [
    {
        id: 1,
        title: "강남 아파트 리모델링",
        description: "모던하고 세련된 아파트 인테리어로 완전히 새로운 공간을 만들어냈습니다.",
        location: "서울 강남구",
        area: "32평",
        date: "2024.03",
        category: "residential",
        thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1574691250077-03a929faece5?w=800&h=600&fit=crop"
        ],
        details: {
            client: "김○○님",
            duration: "6주",
            budget: "3,000만원",
            style: "모던 미니멀"
        }
    },
    {
        id: 2,
        title: "카페 인테리어 디자인",
        description: "따뜻하고 아늑한 분위기의 카페 공간을 연출했습니다.",
        location: "서울 홍대",
        area: "25평",
        date: "2024.02",
        category: "commercial",
        thumbnail: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1572448862527-d3c904757de6?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&h=600&fit=crop"
        ],
        details: {
            client: "○○카페",
            duration: "4주",
            budget: "2,500만원",
            style: "빈티지 모던"
        }
    },
    {
        id: 3,
        title: "사무실 공간 설계",
        description: "효율적이고 창의적인 업무 환경을 조성한 사무실 인테리어입니다.",
        location: "서울 강남구",
        area: "50평",
        date: "2024.01",
        category: "office",
        thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop"
        ],
        details: {
            client: "○○테크",
            duration: "8주",
            budget: "5,000만원",
            style: "컨템포러리"
        }
    },
    {
        id: 4,
        title: "빌라 전체 리모델링",
        description: "오래된 빌라를 현대적이고 실용적인 공간으로 완전히 변화시켰습니다.",
        location: "서울 마포구",
        area: "28평",
        date: "2023.12",
        category: "residential",
        thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop"
        ],
        details: {
            client: "박○○님",
            duration: "10주",
            budget: "4,000만원",
            style: "스칸디나비안"
        }
    },
    {
        id: 5,
        title: "레스토랑 인테리어",
        description: "고급스럽고 편안한 분위기의 레스토랑 공간을 연출했습니다.",
        location: "서울 이태원",
        area: "35평",
        date: "2023.11",
        category: "commercial",
        thumbnail: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop"
        ],
        details: {
            client: "○○레스토랑",
            duration: "6주",
            budget: "3,500만원",
            style: "인더스트리얼"
        }
    },
    {
        id: 6,
        title: "단독주택 인테리어",
        description: "가족의 라이프스타일을 반영한 따뜻한 단독주택 인테리어입니다.",
        location: "경기 성남시",
        area: "45평",
        date: "2023.10",
        category: "residential",
        thumbnail: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400&h=300&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=600&fit=crop"
        ],
        details: {
            client: "이○○님",
            duration: "12주",
            budget: "6,000만원",
            style: "모던 클래식"
        }
    }
];

// Portfolio Display Variables
let currentPortfolioIndex = 0;
let displayedPortfolios = 6; // Show all portfolios initially
let currentModalIndex = 0;
let currentModalSlide = 0;

// Initialize Portfolio Display
function initPortfolio() {
    try {
        // Hide loading indicator immediately
        const loadingIndicator = document.getElementById('loadingIndicator');
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
        
        renderPortfolioGrid();
        setupPortfolioEventListeners();
    } catch (error) {
        console.error('Portfolio initialization error:', error);
        // Fallback: show error message
        const portfolioGrid = document.getElementById('portfolioGrid');
        if (portfolioGrid) {
            portfolioGrid.innerHTML = '<p>포트폴리오를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>';
        }
    }
}

// Render Portfolio Grid
function renderPortfolioGrid() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    if (!portfolioGrid) {
        console.warn('Portfolio grid element not found');
        return;
    }

    try {
        portfolioGrid.innerHTML = '';
        
        const portfoliosToShow = portfolioData.slice(0, displayedPortfolios);
        
        portfoliosToShow.forEach((portfolio, index) => {
            const portfolioItem = createPortfolioItem(portfolio, index);
            portfolioGrid.appendChild(portfolioItem);
        });

        // Hide more button since all portfolios are shown
        const moreBtn = document.querySelector('.more-btn');
        if (moreBtn) {
            moreBtn.style.display = 'none';
        }
    } catch (error) {
        console.error('Error rendering portfolio grid:', error);
        portfolioGrid.innerHTML = '<p>포트폴리오를 불러오는 중 오류가 발생했습니다.</p>';
    }
}

// Create Portfolio Item Element
function createPortfolioItem(portfolio, index) {
    try {
        const item = document.createElement('div');
        item.className = 'portfolio-item fade-in';
        item.onclick = () => openPortfolioModal(index);
        
        // Remove animation delay completely
        item.style.animationDelay = '0s';
        
        item.innerHTML = `
            <div class="portfolio-image">
                <img src="${portfolio.thumbnail}" alt="${portfolio.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x300?text=이미지+없음'">
            </div>
            <div class="portfolio-info">
                <h3>${portfolio.title}</h3>
                <p>${portfolio.description}</p>
                <div class="portfolio-meta">
                    <span>${portfolio.location}</span>
                    <span>${portfolio.area}</span>
                    <span>${portfolio.date}</span>
                </div>
            </div>
        `;
        
        return item;
    } catch (error) {
        console.error('Error creating portfolio item:', error);
        const errorItem = document.createElement('div');
        errorItem.className = 'portfolio-item';
        errorItem.innerHTML = '<p>포트폴리오 항목을 불러올 수 없습니다.</p>';
        return errorItem;
    }
}

// Load More Portfolios
function loadMorePortfolio() {
    const oldCount = displayedPortfolios;
    displayedPortfolios = Math.min(displayedPortfolios + 3, portfolioData.length);
    renderPortfolioGrid();
    
    // Animate new items with staggered effect
    setTimeout(() => {
        const allItems = document.querySelectorAll('.portfolio-item.fade-in');
        const newItems = Array.from(allItems).slice(oldCount);
        
        newItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
                // Add elastic animation
                if (window.animationUtils) {
                    window.animationUtils.triggerElasticAnimation(item);
                }
            }, index * 100);
        });
    }, 100);
}

// Open Portfolio Modal
function openPortfolioModal(index) {
    currentModalIndex = index;
    currentModalSlide = 0;
    
    const modal = document.getElementById('portfolioModal');
    const portfolio = portfolioData[index];
    
    if (!modal || !portfolio) return;
    
    // Update modal content
    document.getElementById('modalTitle').textContent = portfolio.title;
    document.getElementById('modalDescription').textContent = portfolio.description;
    document.getElementById('modalLocation').textContent = portfolio.location;
    document.getElementById('modalArea').textContent = portfolio.area;
    document.getElementById('modalDate').textContent = portfolio.date;
    
    // Create modal slides
    const modalSlides = document.getElementById('modalSlides');
    modalSlides.innerHTML = '';
    
    portfolio.images.forEach((image, imgIndex) => {
        const slide = document.createElement('div');
        slide.className = `modal-slide ${imgIndex === 0 ? 'active' : ''}`;
        slide.innerHTML = `<img src="${image}" alt="${portfolio.title} - Image ${imgIndex + 1}" loading="lazy">`;
        modalSlides.appendChild(slide);
    });
    
    // Update navigation buttons
    updateModalNavButtons();
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Portfolio Modal
function closePortfolioModal() {
    const modal = document.getElementById('portfolioModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Navigate Modal Slides
function navigateModalSlide(direction) {
    const portfolio = portfolioData[currentModalIndex];
    if (!portfolio) return;
    
    const slides = document.querySelectorAll('.modal-slide');
    if (slides.length === 0) return;
    
    slides[currentModalSlide].classList.remove('active');
    
    if (direction === 'next') {
        currentModalSlide = (currentModalSlide + 1) % portfolio.images.length;
    } else {
        currentModalSlide = (currentModalSlide - 1 + portfolio.images.length) % portfolio.images.length;
    }
    
    slides[currentModalSlide].classList.add('active');
}

// Navigate Between Portfolios
function navigatePortfolio(direction) {
    if (direction === 'next') {
        currentModalIndex = (currentModalIndex + 1) % portfolioData.length;
    } else {
        currentModalIndex = (currentModalIndex - 1 + portfolioData.length) % portfolioData.length;
    }
    
    openPortfolioModal(currentModalIndex);
}

// Update Modal Navigation Buttons
function updateModalNavButtons() {
    const prevBtn = document.querySelector('.prev-portfolio');
    const nextBtn = document.querySelector('.next-portfolio');
    
    if (prevBtn && nextBtn) {
        prevBtn.onclick = () => navigatePortfolio('prev');
        nextBtn.onclick = () => navigatePortfolio('next');
        
        // Update button text with portfolio titles
        const prevIndex = (currentModalIndex - 1 + portfolioData.length) % portfolioData.length;
        const nextIndex = (currentModalIndex + 1) % portfolioData.length;
        
        prevBtn.textContent = `← ${portfolioData[prevIndex].title}`;
        nextBtn.textContent = `${portfolioData[nextIndex].title} →`;
    }
}

// Setup Portfolio Event Listeners
function setupPortfolioEventListeners() {
    // Modal close button
    const closeBtn = document.querySelector('#portfolioModal .close');
    if (closeBtn) {
        closeBtn.onclick = closePortfolioModal;
    }
    
    // Modal background click
    const modal = document.getElementById('portfolioModal');
    if (modal) {
        modal.onclick = (e) => {
            if (e.target === modal) {
                closePortfolioModal();
            }
        };
    }
    
    // Modal slide navigation
    const modalPrevBtn = document.querySelector('.modal-prev');
    const modalNextBtn = document.querySelector('.modal-next');
    
    if (modalPrevBtn) {
        modalPrevBtn.onclick = () => navigateModalSlide('prev');
    }
    
    if (modalNextBtn) {
        modalNextBtn.onclick = () => navigateModalSlide('next');
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('portfolioModal');
        if (modal && modal.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closePortfolioModal();
                    break;
                case 'ArrowLeft':
                    navigateModalSlide('prev');
                    break;
                case 'ArrowRight':
                    navigateModalSlide('next');
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    navigatePortfolio('prev');
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    navigatePortfolio('next');
                    break;
            }
        }
    });
}

// Filter Portfolio by Category
function filterPortfolio(category) {
    const filteredData = category === 'all' 
        ? portfolioData 
        : portfolioData.filter(item => item.category === category);
    
    const portfolioGrid = document.getElementById('portfolioGrid');
    if (!portfolioGrid) return;
    
    portfolioGrid.innerHTML = '';
    
    filteredData.forEach((portfolio, index) => {
        const portfolioItem = createPortfolioItem(portfolio, index);
        portfolioGrid.appendChild(portfolioItem);
    });
    
    // Animate filtered items
    setTimeout(() => {
        const items = document.querySelectorAll('.portfolio-item.fade-in');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 100);
        });
    }, 100);
}

// Search Portfolio
function searchPortfolio(query) {
    const searchResults = portfolioData.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.location.toLowerCase().includes(query.toLowerCase())
    );
    
    const portfolioGrid = document.getElementById('portfolioGrid');
    if (!portfolioGrid) return;
    
    portfolioGrid.innerHTML = '';
    
    if (searchResults.length === 0) {
        portfolioGrid.innerHTML = '<p class="no-results">검색 결과가 없습니다.</p>';
        return;
    }
    
    searchResults.forEach((portfolio, index) => {
        const portfolioItem = createPortfolioItem(portfolio, index);
        portfolioGrid.appendChild(portfolioItem);
    });
    
    // Animate search results
    setTimeout(() => {
        const items = document.querySelectorAll('.portfolio-item.fade-in');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 100);
        });
    }, 100);
}

// Get Portfolio by ID
function getPortfolioById(id) {
    return portfolioData.find(item => item.id === id);
}

// Add New Portfolio (for admin use)
function addPortfolio(newPortfolio) {
    const id = Math.max(...portfolioData.map(p => p.id)) + 1;
    newPortfolio.id = id;
    portfolioData.unshift(newPortfolio);
    renderPortfolioGrid();
}

// Update Portfolio (for admin use)
function updatePortfolio(id, updatedData) {
    const index = portfolioData.findIndex(p => p.id === id);
    if (index !== -1) {
        portfolioData[index] = { ...portfolioData[index], ...updatedData };
        renderPortfolioGrid();
    }
}

// Delete Portfolio (for admin use)
function deletePortfolio(id) {
    const index = portfolioData.findIndex(p => p.id === id);
    if (index !== -1) {
        portfolioData.splice(index, 1);
        renderPortfolioGrid();
    }
}

// Export functions for external use
window.portfolioManager = {
    init: initPortfolio,
    loadMore: loadMorePortfolio,
    filter: filterPortfolio,
    search: searchPortfolio,
    getById: getPortfolioById,
    add: addPortfolio,
    update: updatePortfolio,
    delete: deletePortfolio,
    data: portfolioData
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initPortfolio); 