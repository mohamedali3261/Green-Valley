// Calendar Page JavaScript - Circular Layout

// Calendar data management
class CalendarManager {
    constructor() {
        this.selectedMonth = null;
        this.monthNames = {
            ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
            en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        };
        this.seasonNames = {
            ar: ['شتاء', 'ربيع', 'صيف', 'خريف'],
            en: ['Winter', 'Spring', 'Summer', 'Autumn']
        };
        this.seasons = {
            winter: ['ديسمبر', 'يناير', 'فبراير'],
            spring: ['مارس', 'أبريل', 'مايو'],
            summer: ['يونيو', 'يوليو', 'أغسطس'],
            autumn: ['سبتمبر', 'أكتوبر', 'نوفمبر']
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupSeasonFilters();
    }

    setupEventListeners() {
        // Month circle interactions
        document.querySelectorAll('.month-position').forEach(monthEl => {
            monthEl.addEventListener('click', (e) => {
                console.log('Month clicked:', monthEl);
                const monthNumber = parseInt(monthEl.dataset.month);
                console.log('Month number:', monthNumber);
                this.selectMonth(monthNumber);
                this.showProductsForMonth(monthNumber);
            });
        });
    }

    setupSeasonFilters() {
        const seasonBtns = document.querySelectorAll('.season-btn');
        seasonBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class from all buttons
                seasonBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const season = btn.dataset.season;
                this.filterMonthsBySeason(season);
            });
        });
    }

    filterMonthsBySeason(season) {
        const months = document.querySelectorAll('.month-position');
        months.forEach(month => {
            if (season === 'all') {
                month.style.opacity = '1';
                month.style.pointerEvents = 'auto';
            } else {
                if (month.dataset.season === season) {
                    month.style.opacity = '1';
                    month.style.pointerEvents = 'auto';
                } else {
                    month.style.opacity = '0.3';
                    month.style.pointerEvents = 'none';
                }
            }
        });
    }

    selectMonth(monthNumber) {
        // Remove active class from all months
        document.querySelectorAll('.month-position').forEach(month => {
            month.classList.remove('active');
        });

        // Add active class to selected month
        const selectedMonthEl = document.querySelector(`.month-${monthNumber}`);
        if (selectedMonthEl) {
            selectedMonthEl.classList.add('active');
        }

        this.selectedMonth = monthNumber;
        console.log('Selected month:', monthNumber);
    }

    showProductsForMonth(monthNumber) {
        console.log('showProductsForMonth called for month:', monthNumber);
        console.log('products object:', typeof products);
        console.log('products data:', products);
        
        // Get products from the products.js file
        if (typeof products !== 'undefined' && products) {
            console.log('Products available, getting products for month...');
            const monthProducts = this.getProductsForMonth(monthNumber, products);
            console.log('Month products found:', monthProducts.length);
            console.log('Month products data:', monthProducts);
            
            if (monthProducts.length > 0) {
                this.displayProductsModal(monthNumber, monthProducts);
            } else {
                console.log('No products found for this month');
                // Still display modal with empty message
                this.displayProductsModal(monthNumber, []);
            }
        } else {
            console.error('Products data not available');
            console.log('Checking if products.js loaded properly...');
        }
    }

    getProductsForMonth(monthNumber, allProducts) {
        const monthProducts = [];
        const monthSeasons = this.getMonthSeasons(monthNumber);
        
        Object.keys(allProducts).forEach(productName => {
            const product = allProducts[productName];
            const productSeasons = this.getProductSeasons(product);
            
            // Check if product is available in any of the month's seasons
            const isAvailable = monthSeasons.some(season => 
                productSeasons.includes(season)
            );
            
            if (isAvailable) {
                // Get translated product name from i18n
                const translatedName = this.getProductTranslation(productName);
                
                monthProducts.push({
                    name: productName,
                    nameEn: translatedName,
                    category: product.category || 'غير محدد',
                    categoryEn: product.categoryEn || 'Not specified',
                    origin: product.origin || 'غير محدد',
                    originEn: product.originEn || 'Not specified',
                    rating: product.rating || '0',
                    stock: product.stock || 'غير متوفر',
                    image: product.image || '../images/img/vegetables/default.jpg'
                });
            }
        });
        
        return monthProducts;
    }

    getMonthSeasons(monthNumber) {
        const seasonMap = {
            1: ['شتاء', 'winter'],
            2: ['شتاء', 'winter'],
            3: ['ربيع', 'spring'],
            4: ['ربيع', 'spring'],
            5: ['ربيع', 'spring'],
            6: ['صيف', 'summer'],
            7: ['صيف', 'summer'],
            8: ['صيف', 'summer'],
            9: ['خريف', 'autumn'],
            10: ['خريف', 'autumn'],
            11: ['خريف', 'autumn'],
            12: ['شتاء', 'winter']
        };
        return seasonMap[monthNumber] || [];
    }

    getProductSeasons(product) {
        const seasonField = product.season || '';
        const seasons = [];
        
        // Extract Arabic seasons
        if (seasonField.includes('شتاء')) seasons.push('شتاء');
        if (seasonField.includes('ربيع')) seasons.push('ربيع');
        if (seasonField.includes('صيف')) seasons.push('صيف');
        if (seasonField.includes('خريف')) seasons.push('خريف');
        
        // Extract English seasons
        if (seasonField.includes('Winter')) seasons.push('winter');
        if (seasonField.includes('Spring')) seasons.push('spring');
        if (seasonField.includes('Summer')) seasons.push('summer');
        if (seasonField.includes('Autumn')) seasons.push('autumn');
        
        // Handle year-round products
        if (seasonField.includes('عام') || seasonField.includes('Year') || 
            seasonField.includes('طوال') || seasonField.includes('year-round')) {
            seasons.push('شتاء', 'ربيع', 'صيف', 'خريف', 'winter', 'spring', 'summer', 'autumn');
        }
        
        return seasons;
    }

    displayProductsModal(monthNumber, products) {
        console.log('displayProductsModal called with:', { monthNumber, products });
        
        const currentLang = (typeof i18n !== 'undefined' && i18n.currentLanguage) ? i18n.currentLanguage : 'ar';
        const monthName = this.monthNames[currentLang][monthNumber - 1];
        
        // Check if elements exist
        const productsTitle = document.getElementById('products-title');
        const container = document.getElementById('products-table-container');
        const section = document.getElementById('products-section');
        
        console.log('Elements check:', {
            productsTitle: !!productsTitle,
            container: !!container,
            section: !!section
        });
        
        if (!productsTitle || !container || !section) {
            console.error('Required elements not found in DOM');
            return;
        }
        
        // Store original products
        this.allProducts = products;
        this.currentMonthNumber = monthNumber;
        
        // Update section title with translation
        const availableInText = this.getTranslation('calendar.availableIn');
        productsTitle.textContent = `${availableInText} ${monthName}`;
        console.log('Title updated:', productsTitle.textContent);
        
        // Reset filters
        this.resetFilters();
        
        // Generate products table
        const tableHTML = this.generateProductsTable(this.allProducts, currentLang);
        console.log('Generated table HTML length:', tableHTML.length);
        
        // Insert table into section
        container.innerHTML = tableHTML;
        console.log('Table inserted into container');
        
        // Show section with smooth scroll
        section.style.display = 'block';
        console.log('Section display set to block');
        
        // Setup filter listeners
        this.setupFilterListeners();
        
        // Scroll to products section
        setTimeout(() => {
            console.log('Scrolling to section...');
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    setupFilterListeners() {
        const categoryFilter = document.getElementById('category-filter');
        const searchInput = document.getElementById('product-search');

        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => this.applyFilters());
        }
        if (searchInput) {
            searchInput.addEventListener('input', () => this.applyFilters());
        }
    }

    applyFilters() {
        const currentLang = (typeof i18n !== 'undefined' && i18n.currentLanguage) ? i18n.currentLanguage : 'ar';
        const categoryFilter = document.getElementById('category-filter').value;
        const searchInput = document.getElementById('product-search').value.toLowerCase();

        let filteredProducts = this.allProducts.filter(product => {
            const matchCategory = !categoryFilter || product.category === categoryFilter;
            const matchSearch = !searchInput || 
                product.name.toLowerCase().includes(searchInput) ||
                product.nameEn.toLowerCase().includes(searchInput);
            
            return matchCategory && matchSearch;
        });

        const tableHTML = this.generateProductsTable(filteredProducts, currentLang);
        const container = document.getElementById('products-table-container');
        container.innerHTML = tableHTML;
    }

    resetFilters() {
        document.getElementById('category-filter').value = '';
        document.getElementById('product-search').value = '';
        
        const currentLang = (typeof i18n !== 'undefined' && i18n.currentLanguage) ? i18n.currentLanguage : 'ar';
        const tableHTML = this.generateProductsTable(this.allProducts, currentLang);
        const container = document.getElementById('products-table-container');
        container.innerHTML = tableHTML;
    }

    generateProductsTable(products, language) {
        if (products.length === 0) {
            const noProductsMsg = this.getTranslation('calendar.noProducts');
            return `<div class="no-products">${noProductsMsg}</div>`;
        }
        
        const headers = [
            this.getTranslation('calendar.productName'),
            this.getTranslation('calendar.productCategory'),
            this.getTranslation('calendar.productOrigin'),
            this.getTranslation('calendar.productStatus')
        ];
        
        let tableHTML = `
            <div class="products-table-wrapper">
                <table class="products-table">
                    <thead>
                        <tr>
                            <th>${headers[0]}</th>
                            <th>${headers[1]}</th>
                            <th>${headers[2]}</th>
                            <th>${headers[3]}</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        products.forEach((product, index) => {
            const name = language === 'ar' ? product.name : product.nameEn;
            const category = language === 'ar' ? product.category : product.categoryEn;
            const origin = language === 'ar' ? product.origin : product.originEn;
            const stock = this.translateStock(product.stock, language);
            const stockClass = product.stock === 'متوفر' ? 'in-stock' : 'out-of-stock';
            const rowClass = index % 2 === 0 ? 'even-row' : 'odd-row';
            const productImage = product.image || '../images/img/vegetables/default.jpg';
            
            tableHTML += `
                <tr class="${rowClass}">
                    <td class="product-name">
                        <img src="${productImage}" alt="${name}" class="product-icon">
                        ${name}
                    </td>
                    <td class="product-category">${category}</td>
                    <td class="product-origin">${origin}</td>
                    <td class="product-stock ${stockClass}">
                        <span class="stock-badge">${stock}</span>
                    </td>
                </tr>
            `;
        });
        
        tableHTML += `
                    </tbody>
                </table>
            </div>
        `;
        
        return tableHTML;
    }

    generateStars(rating) {
        const numRating = parseFloat(rating) || 0;
        const fullStars = Math.floor(numRating);
        const hasHalfStar = numRating % 1 >= 0.5;
        let starsHTML = '';
        
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="far fa-star"></i>';
        }
        
        return starsHTML;
    }

    translateStock(stock, language) {
        if (language === 'en') {
            const stockMap = {
                'متوفر': 'Available',
                'غير متوفر': 'Unavailable',
                'محدود': 'Limited'
            };
            return stockMap[stock] || stock;
        }
        return stock;
    }

    getTranslation(key) {
        if (typeof i18n !== 'undefined' && i18n.currentLanguage) {
            return i18n.getTranslation(key);
        }
        return key;
    }

    getProductTranslation(productName) {
        if (typeof i18n !== 'undefined' && i18n.currentLanguage) {
            // Try to get product translation from i18n
            const translation = i18n.getTranslation(`calendar.products.${productName}`);
            // If translation found (doesn't return the key itself), return it
            if (translation !== `calendar.products.${productName}`) {
                return translation;
            }
        }
        // Fallback to product name if no translation found
        return productName;
    }
}

// Global function to close modal
function closeProductsModal() {
    const modal = document.getElementById('products-modal');
    modal.classList.remove('active');
}

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new CalendarManager();
});