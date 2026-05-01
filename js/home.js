document.addEventListener('DOMContentLoaded', () => {

    // Professional Loading Screen
    const loadingScreen = document.getElementById('loading-screen');
    const progressFill = document.querySelector('.progress-fill');
    const progressPercentage = document.querySelector('.progress-percentage');
    const loadingText = document.querySelector('.loading-text');
    
    function updateLoadingProgress() {
        let progress = 0;
        const loadingMessages = {
            ar: ['جاري التحميل...', 'تحضير المحتوى...', 'تجهيز الواجهة...', 'الإعداد النهائي...'],
            en: ['Loading...', 'Preparing content...', 'Setting up interface...', 'Finalizing...']
        };
        
        const currentLang = typeof i18n !== 'undefined' ? i18n.currentLanguage : 'ar';
        const messages = loadingMessages[currentLang] || loadingMessages.ar;
        
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            // Update progress bar
            if (progressFill) {
                progressFill.style.width = progress + '%';
            }
            
            // Update percentage
            if (progressPercentage) {
                progressPercentage.textContent = Math.floor(progress) + '%';
            }
            
            // Update loading message
            if (loadingText) {
                const messageIndex = Math.min(Math.floor(progress / 25), messages.length - 1);
                loadingText.textContent = messages[messageIndex];
            }
            
            // Complete loading
            if (progress >= 100) {
                clearInterval(progressInterval);
                
                setTimeout(() => {
                    if (loadingScreen) {
                        loadingScreen.classList.add('fade-out');
                        
                        setTimeout(() => {
                            loadingScreen.style.display = 'none';
                        }, 800);
                    }
                }, 500);
            }
        }, 100);
    }
    
    // Start loading animation
    if (loadingScreen) {
        updateLoadingProgress();
    }

    // Initialize Hero Image Slider with title and background update
    const heroTitleElement = document.getElementById('hero-title');
    const heroBgElement = document.querySelector('.hero-background');
    const heroImageSlider = new Swiper('.hero-image-slider', {
        effect: 'slide',
        loop: true,
        speed: 1200, // Slightly faster for better feel
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        slidesPerView: 'auto',
        spaceBetween: 30,
        on: {
            init: function() {
                const initialSlide = this.slides[this.activeIndex];
                const initialTitle = initialSlide.getAttribute('data-title');
                const initialBg = initialSlide.getAttribute('data-background');
                if(heroTitleElement && initialTitle) {
                    // Check if i18n is available and get translation
                    if (typeof i18n !== 'undefined' && i18n.currentLanguage === 'en') {
                        const translatedTitle = getSectionTitleTranslation(initialTitle);
                        heroTitleElement.textContent = translatedTitle;
                    } else {
                        heroTitleElement.textContent = initialTitle;
                    }
                }
                if(heroBgElement && initialBg) {
                    heroBgElement.style.backgroundImage = `url(${initialBg})`;
                }
            },
            slideChange: function () {
                // Update Title with translation support
                const currentSlide = this.slides[this.activeIndex];
                const newTitle = currentSlide.getAttribute('data-title');
                const newBg = currentSlide.getAttribute('data-background');
                
                if (heroTitleElement && newTitle) {
                    heroTitleElement.style.opacity = 0;
                    setTimeout(() => {
                        // Check if i18n is available and get translation
                        if (typeof i18n !== 'undefined' && i18n.currentLanguage === 'en') {
                            const translatedTitle = getSectionTitleTranslation(newTitle);
                            heroTitleElement.textContent = translatedTitle;
                        } else {
                            heroTitleElement.textContent = newTitle;
                        }
                        heroTitleElement.style.opacity = 1;
                    }, 200);
                }

                // Update Background
                if (heroBgElement && newBg) {
                    heroBgElement.style.opacity = 0;
                    setTimeout(() => {
                        heroBgElement.style.backgroundImage = `url(${newBg})`;
                        heroBgElement.style.opacity = 1;
                    }, 300); // Wait for fade out before changing image
                }
            },
        },
    });

    // Helper function to get section translations
    function getSectionTitleTranslation(arabicTitle) {
        const translations = {
            'فواكه': 'Fruits',
            'خضروات': 'Vegetables',
            'أعشاب': 'Herbs',
            'مكسرات': 'Nuts',
            'توابل': 'Spices',
            'بقوليات': 'Legumes',
            'حبوب': 'Grains'
        };
        return translations[arabicTitle] || arabicTitle;
    }

    // Initialize Brands Slider
    if (document.querySelector('.brands-slider')) {
        const brandsSlider = new Swiper('.brands-slider', {
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            slidesPerView: 2,
            spaceBetween: 30,
            breakpoints: {
                640: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 50,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 60,
                },
            },
        });
    }

    // Skewed Pages Scroll Navigation
    var curPage = 1;
    var numOfPages = document.querySelectorAll(".skw-page").length;
    var animTime = 1000;
    var scrolling = false;
    var pgPrefix = ".skw-page-";

    function pagination() {
        scrolling = true;
        
        var currentPageEl = document.querySelector(pgPrefix + curPage);
        var prevPageEl = document.querySelector(pgPrefix + (curPage - 1));
        var nextPageEl = document.querySelector(pgPrefix + (curPage + 1));
        
        if (currentPageEl) {
            currentPageEl.classList.remove("inactive");
            currentPageEl.classList.add("active");
        }
        
        if (prevPageEl) {
            prevPageEl.classList.add("inactive");
        }
        
        if (nextPageEl) {
            nextPageEl.classList.remove("active");
        }
        
        setTimeout(function() {
            scrolling = false;
        }, animTime);
    }

    function navigateUp() {
        if (curPage === 1) return;
        curPage--;
        pagination();
    }

    function navigateDown() {
        if (curPage === numOfPages) return;
        curPage++;
        pagination();
    }

    document.addEventListener("mousewheel", function(e) {
        if (scrolling) return;
        if (e.deltaY < 0) {
            navigateUp();
        } else {
            navigateDown();
        }
    });

    document.addEventListener("keydown", function(e) {
        if (scrolling) return;
        if (e.which === 38) {
            navigateUp();
        } else if (e.which === 40) {
            navigateDown();
        }
    });
    
}); 