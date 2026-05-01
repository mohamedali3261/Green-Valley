// Toggle mobile sidebar
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const sidebarNav = document.getElementById('sidebarNav');

// إظهار/إخفاء القائمة الجانبية في الأجهزة المحمولة
if (mobileMenuToggle && sidebarNav) {
    mobileMenuToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        sidebarNav.classList.toggle('active');
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function (event) {
        if (window.innerWidth <= 992 && !sidebarNav.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
            sidebarNav.classList.remove('active');
        }
    });

    // إغلاق القائمة عند النقر على رابط
    const navLinks = document.querySelectorAll('.categories-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 992) {
                sidebarNav.classList.remove('active');
            }
        });
    });

    // إخفاء زر القائمة في الشاشات الكبيرة
    function handleResize() {
        if (window.innerWidth > 992) {
            mobileMenuToggle.style.display = 'none';
            sidebarNav.classList.remove('active');
        } else {
            mobileMenuToggle.style.display = 'flex';
        }
    }

    // تشغيل الدالة عند تحميل الصفحة وتغيير حجم النافذة
    window.addEventListener('load', handleResize);
    window.addEventListener('resize', handleResize);
    handleResize(); // تنفيذ الدالة مرة واحدة عند التحميل
}

// ============ Product Rendering and Search ============
let allProducts = {};
let filteredProducts = {};
let currentFilters = {
    search: '',
    category: '',
    season: 'all'
};

// Product data with more details
const products = {
    'النخاع الأبيض': {
        description: 'نود أن نقدم لكم خضروات مصرية بأفضل جودة نتأكد دائما من أن منتجاتنا مطابقة للمواصفات الأوروبية',
        descriptionEn: 'We are pleased to offer you Egyptian vegetables of the best quality. We always ensure that our products meet European standards',
        category: 'خضروات',
        categoryEn: 'Vegetables',
        image: '../images/img/vegetables/White Marrow.jpg',
        origin: 'الدقهلية، مصر',
        originEn: 'Dakahlia, Egypt',
        benefits: 'غني بالفيتامينات، يقوي المناعة، يحسن الهضم، يدعم صحة العظام، يحمي من الأمراض، ينظم ضغط الدم، يحسن صحة البشرة، يزيد الطاقة',
        benefitsEn: 'Rich in vitamins, boosts immunity, improves digestion, supports bone health, protects from diseases, regulates blood pressure, improves skin health, increases energy',
        features: [
            'مصدر غني بالفيتامينات',
            'يحتوي على ألياف غذائية',
            'منخفض السعرات الحرارية',
            'يدعم صحة الجهاز الهضمي',
            'يساعد في بناء العضلات',
            'يعزز المناعة',
            'مطابق للمواصفات الأوروبية',
            'جودة مصرية أصيلة'
        ],
        featuresEn: [
            'Rich source of vitamins',
            'Contains dietary fiber',
            'Low in calories',
            'Supports digestive system health',
            'Helps build muscles',
            'Boosts immunity',
            'Complies with European standards',
            'Authentic Egyptian quality'
        ],
        season: 'شتاء وربيع',
        seasonEn: 'Winter and Spring',
        storage: 'في الثلاجة لمدة 3-5 أيام',
        storageEn: 'In refrigerator for 3-5 days',
        packaging: '3.5 كجم و 5 كجم علبة كرتون - صناديق خشبية وبلاستيكية',
        packagingEn: '3.5 kg and 5 kg carton boxes - wooden and plastic boxes',
        sizes: 'حسب طلب العميل',
        sizesEn: 'According to customer request',
        shipping: 'عن طريق التحميل الجوي',
        shippingEn: 'Via air freight',
        exportMarkets: 'أوروبا ومنطقة الخليج',
        exportMarketsEn: 'Europe and Gulf region',
        specialNotes: 'ربما يتم شحنها عن طريق الجو - تغيير الحجم والتعبئة وفقا لطلب العميل',
        rating: '4.6',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'بامية': {
        description: 'بامية خضراء طازجة، ناعمة وغنية بالعناصر الغذائية',
        descriptionEn: 'Fresh green okra, smooth and rich in nutrients',
        category: 'خضروات',
        categoryEn: 'Vegetables',
        image: '../images/img/vegetables/Okra.jpg',
        origin: 'المنوفية، مصر',
        originEn: 'Menoufia, Egypt',
        varieties: 'زارا، كليمسون',
        varietiesEn: 'Zara, Clemson',
        benefits: 'تنظم السكر، تحسن الهضم، تقوي المناعة، تدعم صحة القلب، غنية بالفيتامينات، تساعد في إنقاص الوزن، تحسن صحة العين، تقلل الالتهابات',
        benefitsEn: 'Regulates blood sugar, improves digestion, boosts immunity, supports heart health, rich in vitamins, helps with weight loss, improves eye health, reduces inflammation',
        features: [
            'غنية بالألياف الغذائية',
            'منخفضة السعرات الحرارية',
            'تساعد في تنظيم سكر الدم',
            'تحسن صحة الجهاز الهضمي',
            'مصدر جيد للفيتامينات',
            'تدعم صحة القلب'
        ],
        featuresEn: [
            'Rich in dietary fiber',
            'Low in calories',
            'Helps regulate blood sugar',
            'Improves digestive system health',
            'Good source of vitamins',
            'Supports heart health'
        ],
        season: 'صيف وخريف',
        seasonEn: 'Summer and Autumn',
        storage: 'درجة الحرارة المثلى 7-10 درجة مئوية - الرطوبة النسبية المثلى 95-100%',
        storageEn: 'Optimal temperature 7-10°C - Optimal relative humidity 95-100%',
        packaging: 'كرتون أو صندوق بلاستيك 3، 4 كجم فضفاض وحسب طلب العميل',
        packagingEn: 'Carton or plastic box 3, 4 kg loose and according to customer request',
        sizes: 'حسب طلب العميل',
        sizesEn: 'According to customer request',
        shipping: 'عن طريق التحميل الجوي',
        shippingEn: 'Via air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        exportMarketsEn: 'Europe, Gulf region, Middle East',
        rating: '4.5',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'ملوخية (طازجة)': {
        description: 'ملوخية خضراء طازجة من أفضل المزارع، غنية بالعناصر الغذائية',
        descriptionEn: 'Fresh green molokhia from the best farms, rich in nutrients',
        category: 'خضروات',
        categoryEn: 'Vegetables',
        image: '../images/img/vegetables/Molokhia (Fresh).jpg',
        origin: 'الغربية، مصر',
        originEn: 'Gharbia, Egypt',
        benefits: 'غنية بالحديد، تحسن الهضم، تقوي الدم، تدعم المناعة، تحسن صحة العظام، غنية بالفيتامينات، تزيد الطاقة، تحسن صحة البشرة',
        benefitsEn: 'Rich in iron, improves digestion, strengthens blood, supports immunity, improves bone health, rich in vitamins, increases energy, improves skin health',
        features: [
            'مصدر غني بالحديد',
            'تحتوي على فيتامينات متعددة',
            'غنية بالألياف الغذائية',
            'تدعم إنتاج خلايا الدم',
            'تحسن صحة الجهاز الهضمي',
            'تعزز الطاقة',
            'متوافقة مع المواصفات الأوروبية',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'Rich source of iron',
            'Contains multiple vitamins',
            'Rich in dietary fiber',
            'Supports blood cell production',
            'Improves digestive system health',
            'Boosts energy',
            'Complies with European standards',
            'Authentic Egyptian quality'
        ],
        season: 'صيف وخريف',
        seasonEn: 'Summer and Autumn',
        storage: 'في الثلاجة لمدة 2-3 أيام',
        storageEn: 'In refrigerator for 2-3 days',
        packaging: 'كرتون أو صندوق بلاستيك - 14 حزمة، 16 حزمة، 20 حزمة، 35 حزمة - وكما يتطلب العميل',
        packagingEn: 'Carton or plastic box - 14 bundles, 16 bundles, 20 bundles, 35 bundles - as customer requires',
        clusterPackaging: 'كرتون أو صندوق بلاستيك - 10 عناقيد أو حسب طلب العميل',
        sizes: 'ناعم، متوسط، جامبو - حسب طلب العميل',
        sizesEn: 'Small, Medium, Jumbo - according to customer request',
        shipping: 'عن طريق التحميل الجوي',
        shippingEn: 'Via air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        exportMarketsEn: 'Europe, Gulf region, Middle East',
        rating: '4.7',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'خيار': {
        description: 'خيار طازج أخضر، مقرمش ومنعش',
        descriptionEn: 'Fresh green cucumber, crispy and refreshing',
        category: 'خضروات',
        categoryEn: 'Vegetables',
        image: '../images/img/vegetables/Cucumber.jpg',
        origin: 'الإسماعيلية، مصر',
        originEn: 'Ismailia, Egypt',
        benefits: 'يرطب الجسم، يرطب البشرة، يقلل الوزن، ينظم ضغط الدم، يدعم صحة الكلى، غني بالماء، يحسن الهضم، يزيل السموم',
        benefitsEn: 'Hydrates body, moisturizes skin, reduces weight, regulates blood pressure, supports kidney health, rich in water, improves digestion, detoxifies',
        features: [
            'عالي المحتوى المائي',
            'منخفض السعرات الحرارية',
            'غني بالفيتامينات',
            'يساعد في ترطيب الجسم',
            'يدعم صحة البشرة',
            'يحسن الهضم',
            'متوافق مع المواصفات الأوروبية',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'High water content',
            'Low in calories',
            'Rich in vitamins',
            'Helps hydrate body',
            'Supports skin health',
            'Improves digestion',
            'Complies with European standards',
            'Authentic Egyptian quality'
        ],
        season: 'صيف وربيع',
        seasonEn: 'Summer and Spring',
        storage: 'في الثلاجة لمدة أسبوع',
        storageEn: 'In refrigerator for one week',
        packaging: '3.5 كجم و 5 كجم علبة كرتون - صناديق خشبية وبلاستيكية',
        packagingEn: '3.5 kg and 5 kg carton boxes - wooden and plastic boxes',
        sizes: 'حسب طلب العميل',
        sizesEn: 'According to customer request',
        shipping: 'عن طريق التحميل الجوي',
        shippingEn: 'Via air freight',
        exportMarkets: 'أوروبا ومنطقة الخليج',
        exportMarketsEn: 'Europe and Gulf region',
        specialNotes: 'ربما يتم شحنها عن طريق الجو - تغيير الحجم والتعبئة وفقا لطلب العميل',
        rating: '4.8',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'الباذنجان': {
        description: 'باذنجان بنفسجي طازج، ناعم الملمس ولذيذ',
        descriptionEn: 'Fresh purple eggplant, smooth texture and delicious',
        category: 'خضروات',
        categoryEn: 'Vegetables',
        image: '../images/img/vegetables/Eggplant - Aubergine.jpg',
        origin: 'القليوبية، مصر',
        originEn: 'Qalyubia, Egypt',
        benefits: 'غني بمضادات الأكسدة، يدعم صحة القلب، يحسن الهضم، يقلل الكوليسترول، يحمي من السرطان، يدعم صحة الدماغ، يقلل الالتهابات، ينظم الوزن',
        benefitsEn: 'Rich in antioxidants, supports heart health, improves digestion, reduces cholesterol, protects from cancer, supports brain health, reduces inflammation, regulates weight',
        features: [
            'غني بمضادات الأكسدة',
            'منخفض السعرات الحرارية',
            'يدعم صحة القلب',
            'يحسن الهضم',
            'يقلل من الكوليسترول',
            'مصدر جيد للألياف',
            'جودة مصرية مضمونة',
            'مختار بعناية'
        ],
        featuresEn: [
            'Rich in antioxidants',
            'Low in calories',
            'Supports heart health',
            'Improves digestion',
            'Reduces cholesterol',
            'Good source of fiber',
            'Authentic Egyptian quality',
            'Carefully selected'
        ],
        season: 'صيف وخريف',
        seasonEn: 'Summer and Autumn',
        storage: 'في درجة حرارة الغرفة أو الثلاجة',
        storageEn: 'At room temperature or refrigerator',
        packaging: '5 كجم / كرتون قياسي مفتوح أو وفقا لاحتياجات العملاء',
        packagingEn: '5 kg / standard open carton or according to customer needs',
        sizes: 'حسب احتياجات العملاء',
        sizesEn: 'According to customer needs',
        shipping: 'عن طريق الحاوية المبردة، تحميل الهواء - حاوية 40 قدم 17 طن / باذنجان كرتون / منصة نقالة 3400 كرتون - حاوية 20 لوحة / حاوية كرتون / منصة نقالة 3400 كرتون',
        shippingEn: 'Via refrigerated container, air freight - 40ft container 17 tons / eggplant carton / pallet 3400 cartons',
        exportMarkets: 'أوروبا، منطقة الخليج',
        exportMarketsEn: 'Europe, Gulf region',
        rating: '4.6',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'البطاطا': {
        description: 'بطاطا صفراء طازجة من أفضل المزارع، غنية بالنشويات',
        descriptionEn: 'Fresh yellow potatoes from the best farms, rich in starch',
        category: 'خضروات',
        categoryEn: 'Vegetables',
        image: '../images/img/vegetables/Potatoes.png',
        origin: 'الشرقية، مصر',
        originEn: 'Sharqia, Egypt',
        benefits: 'تزود الطاقة، تدعم صحة الجهاز الهضمي، تقوي المناعة، غنية بالبوتاسيوم، تحسن صحة العظام، تقلل التوتر، تدعم صحة القلب',
        benefitsEn: 'Provides energy, supports digestive system health, boosts immunity, rich in potassium, improves bone health, reduces stress, supports heart health',
        features: [
            'غنية بالنشويات',
            'مصدر جيد للطاقة',
            'تدعم صحة الجهاز الهضمي',
            'غنية بالبوتاسيوم',
            'تحسن صحة العظام',
            'تقلل التوتر',
            'تدعم صحة القلب',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'Rich in starch',
            'Good source of energy',
            'Supports digestive system health',
            'Rich in potassium',
            'Improves bone health',
            'Reduces stress',
            'Supports heart health',
            'Authentic Egyptian quality'
        ],
        season: 'شتاء وربيع',
        seasonEn: 'Winter and Spring',
        storage: 'في مكان جاف وبارد',
        storageEn: 'In a dry and cool place',
        varieties: 'سبونتا، مونديال، نيكولا، ديامونت، ليدي روزيتا، هيرمس',
        varietiesEn: 'Spunta, Mondial, Nicola, Diamond, Lady Rosetta, Hermes',
        packaging: 'أكياس PP 10 كجم أو 25 كجم - تفاصيل التعبئة للحاوية 40 قدما، أو حسب طلب العميل',
        packagingEn: 'PP bags 10 kg or 25 kg - 40ft container details, or according to customer request',
        sizes: 'أحجام البطاطس: من 40/45 مم - حتى 90 مم',
        sizesEn: 'Potato sizes: from 40/45 mm - up to 90 mm',
        shipping: 'عن طريق الحاوية المبردة، تحميل الهواء - 18 منصة نقالة خشبية/حاوية - 2750 كيس (10 كجم) أو 1100 كيس (25 كجم) أو 1250 كجم أكياس جامبو',
        shippingEn: 'Via refrigerated container, air freight - 18 wooden pallets/container - 2750 bags (10 kg) or 1100 bags (25 kg) or 1250 kg jumbo bags',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        exportMarketsEn: 'Europe, Gulf region, Middle East',
        specialNotes: 'يتم استخدام الطحلب أثناء تعبئة البطاطس الطازجة داخل الأكياس لأنه يحافظ على جودة البطاطس بدءا من بيت التعبئة حتى توصيلها إلى العميل النهائي. Peat Moss يحافظ على بيئة صحية وطبيعية للبطاطس لإبقائها طازجة لعمر افتراضي طويل',
        rating: '4.7',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'ثوم جاف': {
        description: 'ثوم جاف عالي الجودة، حاد المذاق وغني بالعناصر الغذائية',
        descriptionEn: 'High-quality dried garlic, pungent taste and rich in nutrients',
        category: 'خضروات',
        categoryEn: 'Vegetables',
        image: '../images/img/vegetables/Dry Garlic.png',
        origin: 'المنيا، مصر',
        originEn: 'Minya, Egypt',
        benefits: 'يقاوم البكتيريا، يقوي المناعة، يخفض ضغط الدم، يحسن صحة القلب، يقي من السرطان، يطهر الجسم، يحسن الهضم، يقلل الالتهابات',
        benefitsEn: 'Fights bacteria, boosts immunity, lowers blood pressure, improves heart health, prevents cancer, detoxifies body, improves digestion, reduces inflammation',
        features: [
            'خصائص مضادة للبكتيريا',
            'يحتوي على مركبات الكبريت',
            'يدعم صحة القلب',
            'يخفض ضغط الدم',
            'يقوي جهاز المناعة',
            'طبيعي 100%',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'Antibacterial properties',
            'Contains sulfur compounds',
            'Supports heart health',
            'Lowers blood pressure',
            'Boosts immune system',
            '100% natural',
            'Authentic Egyptian quality'
        ],
        season: 'متوفر على مدار العام',
        seasonEn: 'Available year-round',
        storage: 'في مكان بارد وجاف',
        storageEn: 'In a cool and dry place',
        packaging: 'تفاصيل التعبئة للحاوية 40 قدما: (علبة كرتون 10 كجم T/C) أو (صندوق بلاستيكي مفتوح 10 كجم)، أو حسب طلب العميل',
        packagingEn: '40ft container details: (10 kg carton T/C) or (10 kg open plastic box), or according to customer request',
        sizes: 'الثوم الجاف الأحجام: 4.5/5 سم - حتى 7/8 سم',
        sizesEn: 'Dried garlic sizes: 4.5/5 cm - up to 7/8 cm',
        shipping: 'عن طريق الحاويات المبردة والتحميل الجوي والشاحنات وسفن الشحن العامة - 2400 كرتون على 20 منصة خشبية أو 2000 صندوق بلاستيكي على 20 منصة خشبية',
        shippingEn: 'Via refrigerated containers, air freight, trucks and general cargo ships - 2400 cartons on 20 wooden pallets or 2000 plastic boxes on 20 wooden pallets',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        exportMarketsEn: 'Europe, Gulf region, Middle East',
        specialNotes: 'تفاصيل الحاوية 40 قدما: علبة كرتون (29*39*21 سم) - صندوق بلاستيكي (30*40*22 سم) - الوزن الصافي 10 كجم - الوزن الإجمالي 11 كجم',
        rating: '4.9',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'فليفلة': {
        description: 'فليفلة خضراء حلوة طازجة، مقرمشة وغنية بالفيتامينات',
        descriptionEn: 'Fresh sweet green pepper, crispy and rich in vitamins',
        category: 'خضروات',
        categoryEn: 'Vegetables',
        image: '../images/img/vegetables/Capsicum.jpg',
        origin: 'الإسماعيلية، مصر',
        originEn: 'Ismailia, Egypt',
        benefits: 'غنية بفيتامين C، تقوي المناعة، تحسن صحة العين، تدعم صحة القلب، تحسن الهضم، غنية بمضادات الأكسدة، تقلل الالتهابات، تحسن صحة البشرة',
        benefitsEn: 'Rich in vitamin C, boosts immunity, improves eye health, supports heart health, improves digestion, rich in antioxidants, reduces inflammation, improves skin health',
        features: [
            'مصدر ممتاز لفيتامين C',
            'غنية بمضادات الأكسدة',
            'منخفضة السعرات الحرارية',
            'تدعم صحة العين',
            'تحسن صحة الجهاز الهضمي',
            'تقوي المناعة',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'Excellent source of vitamin C',
            'Rich in antioxidants',
            'Low in calories',
            'Supports eye health',
            'Improves digestive system health',
            'Boosts immunity',
            'Authentic Egyptian quality'
        ],
        season: 'صيف وخريف',
        seasonEn: 'Summer and Autumn',
        storage: 'في الثلاجة لمدة أسبوع',
        storageEn: 'In refrigerator for one week',
        varieties: 'أخضر - أحمر - أصفر - برتقالي',
        varietiesEn: 'Green - Red - Yellow - Orange',
        packaging: 'تفاصيل التعبئة للحاوية 40 قدما: (5 كجم كرتون مفتوح / صندوق بلاستيكي)، أو حسب طلب العميل',
        packagingEn: '40ft container details: (5 kg open carton / plastic box), or according to customer request',
        sizes: 'الفليفلة الأحجام: متوسطة - كبيرة - × كبيرة',
        sizesEn: 'Pepper sizes: Medium - Large - X Large',
        shipping: 'عن طريق الحاوية المبردة، تحميل الهواء - 2400 كرتون على 20 منصة نقالة خشبية (أبعاد 30*40*18 سم)',
        shippingEn: 'Via refrigerated container, air freight - 2400 cartons on 20 wooden pallets',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        exportMarketsEn: 'Europe, Gulf region, Middle East',
        specialNotes: 'تفاصيل الحاوية 40 قدما: 20 منصة نقالة خشبية - 120 كرتون لكل منصة - الوزن الصافي 5 كجم - الوزن الإجمالي 6 كجم',
        rating: '4.6',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'قرنبيط': {
        description: 'قرنبيط أبيض طازج، صحي ولذيذ',
        descriptionEn: 'Fresh white cauliflower, healthy and delicious',
        category: 'خضروات',
        categoryEn: 'Vegetables',
        image: '../images/img/vegetables/Cauliflower.png',
        origin: 'البحيرة، مصر',
        originEn: 'Beheira, Egypt',
        benefits: 'يقي من السرطان، يدعم صحة القلب، يحسن الهضم، يقوي العظام، غني بالفيتامينات، يقلل الالتهابات، يدعم صحة الدماغ، يساعد في إنقاص الوزن',
        benefitsEn: 'Prevents cancer, supports heart health, improves digestion, strengthens bones, rich in vitamins, reduces inflammation, supports brain health, helps with weight loss',
        features: [
            'غني بفيتامين C و K',
            'يحتوي على مضادات الأكسدة',
            'منخفض السعرات الحرارية',
            'يدعم صحة القلب',
            'يحسن الهضم',
            'مصدر جيد للألياف',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'Rich in vitamin C and K',
            'Contains antioxidants',
            'Low in calories',
            'Supports heart health',
            'Improves digestion',
            'Good source of fiber',
            'Authentic Egyptian quality'
        ],
        season: 'شتاء وربيع',
        seasonEn: 'Winter and Spring',
        storage: 'في الثلاجة لمدة 5-7 أيام',
        storageEn: 'In refrigerator for 5-7 days',
        packaging: 'تفاصيل التعبئة للحاوية 40 قدما: (صندوق بلاستيكي مفتوح 5 كجم)، أو حسب طلب العميل',
        packagingEn: '40ft container details: (5 kg open plastic box), or according to customer request',
        sizes: 'عدد الرأس / صندوق 5-10 وزن الرأس / جرام 500-1000 جرام',
        sizesEn: 'Number of heads / box 5-10, head weight / gram 500-1000 gram',
        shipping: 'عن طريق الحاوية المبردة، تحميل الهواء - 1440 صندوق بلاستيكي على 20 منصة نقالة خشبية (أبعاد 40*50*18 سم)',
        shippingEn: 'Via refrigerated container, air freight - 1440 plastic boxes on 20 wooden pallets',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        exportMarketsEn: 'Europe, Gulf region, Middle East',
        specialNotes: 'تفاصيل الحاوية 40 قدما: 20 منصة نقالة خشبية - 72 صندوق لكل منصة - الوزن الصافي 5 كجم - الوزن الإجمالي 6 كجم',
        rating: '4.7',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'بروكلي': {
        description: 'بروكلي أخضر طازج من أفضل المزارع، غني بالعناصر الغذائية',
        descriptionEn: 'Fresh green broccoli from the best farms, rich in nutrients',
        category: 'خضروات',
        categoryEn: 'Vegetables',
        image: '../images/img/vegetables/Broccoli.png',
        origin: 'الإسماعيلية، مصر',
        originEn: 'Ismailia, Egypt',
        benefits: 'يقي من السرطان، يقوي العظام، يحسن الهضم، يدعم صحة القلب، غني بالفيتامينات، يقلل الالتهابات، يحسن صحة العين، يقوي المناعة',
        benefitsEn: 'Prevents cancer, strengthens bones, improves digestion, supports heart health, rich in vitamins, reduces inflammation, improves eye health, boosts immunity',
        features: [
            'مصدر غني بفيتامين C و K',
            'يحتوي على مضادات الأكسدة',
            'يدعم صحة العظام',
            'يحسن الهضم',
            'يقوي المناعة',
            'منخفض السعرات الحرارية',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'Rich source of vitamin C and K',
            'Contains antioxidants',
            'Supports bone health',
            'Improves digestion',
            'Boosts immunity',
            'Low in calories',
            'Authentic Egyptian quality'
        ],
        season: 'شتاء وربيع',
        seasonEn: 'Winter and Spring',
        storage: 'في الثلاجة لمدة 3-5 أيام',
        storageEn: 'In refrigerator for 3-5 days',
        packaging: 'تفاصيل التعبئة للحاوية 40 قدما: (5/6 كجم صندوق بلاستيكي مفتوح علوي) أو (صندوق رغوة 7 كجم)، أو حسب طلب العميل',
        packagingEn: '40ft container details: (5/6 kg open plastic box) or (7 kg foam box), or according to customer request',
        sizes: 'عدد الرؤوس / الصندوق 6-12 رأسا / صندوق وزن الرأس / جرام 400-900 جرام',
        sizesEn: 'Number of heads / box 6-12 heads / box, head weight / gram 400-900 gram',
        shipping: 'عن طريق الحاوية المبردة، تحميل الهواء - 1600 صندوق بلاستيكي (5/6 كجم) على 20 منصة خشبية أو 800 صندوق رغوة (7 كجم) على 20 منصة خشبية',
        shippingEn: 'Via refrigerated container, air freight - 1600 plastic boxes (5/6 kg) on 20 wooden pallets or 800 foam boxes (7 kg) on 20 wooden pallets',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        exportMarketsEn: 'Europe, Gulf region, Middle East',
        specialNotes: 'تفاصيل الحاوية 40 قدما: صندوق بلاستيكي (30*50*22 سم) - 80 صندوق لكل منصة / صندوق رغوة (40*60*22 سم) - 40 صندوق لكل منصة',
        rating: '4.8',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'الماندرين': {
        description: 'ماندرين برتقالي حلو المذاق، سهل التقشير وغني بفيتامين سي',
        descriptionEn: 'Sweet orange mandarin, easy to peel and rich in vitamin C',
        category: 'فواكه',
        categoryEn: 'Fruits',
        image: '../images/img/fruits/Mandarins.png',
        origin: 'وادي النطرون، مصر',
        originEn: 'Wadi El-Natrun, Egypt',
        benefits: 'يعزز المناعة، يحسن صحة البشرة، يقوي العظام، يساعد في امتصاص الحديد، يحمي الخلايا من التلف، يدعم صحة القلب، ينظم ضغط الدم، يقلل من الالتهابات',
        benefitsEn: 'Boosts immunity, improves skin health, strengthens bones, helps iron absorption, protects cells from damage, supports heart health, regulates blood pressure, reduces inflammation',
        features: [
            'مصدر غني بفيتامين C',
            'سهل التقشير',
            'يحتوي على مضادات الأكسدة',
            'منخفض السعرات الحرارية',
            'يحسن امتصاص الحديد',
            'يدعم صحة الجهاز الهضمي',
            'جودة مصرية مضمونة'
        ],
        featuresEn: ['Rich source of vitamin C', 'Easy to peel', 'Contains antioxidants', 'Low in calories', 'Improves iron absorption', 'Supports digestive system health', 'Authentic Egyptian quality'],
        season: 'شتاء',
        seasonEn: 'Winter',
        storage: 'في درجة حرارة الغرفة أو الثلاجة',
        storageEn: 'At room temperature or refrigerator',
        varieties: 'Easy Peelers الماندرين (فريمونت) - الماندرين المتأخر: (عسل موركوت)',
        varietiesEn: 'Easy Peelers Mandarin (Fremont) - Late Mandarin: (Honey Murcott)',
        packaging: 'تفاصيل التعبئة للحاوية 40 قدما: (7.5 كجم علبة كرتون مفتوحة علوي) أو (علبة كرتون مفتوحة 10 كجم)، أو حسب طلب العميل',
        packagingEn: '40ft container details: (7.5 kg open top carton) or (10 kg open carton), or according to customer request',
        sizes: 'أحجام فريمونت ماندرين 42/48/54/63/72/80/88/100 - أحجام الماندرين الطازج 36/42/45/54/63/70/80/90',
        sizesEn: 'Fremont mandarin sizes 42/48/54/63/72/80/88/100 - Fresh mandarin sizes 36/42/45/54/63/70/80/90',
        shipping: 'عن طريق الحاوية المبردة، تحميل الهواء - 2912 كرتون (7.5 كجم) أو 2080 كرتون (10 كجم) على 21 منصة نقالة (20 رقاقة + 1 يورو)',
        shippingEn: 'Via refrigerated container, air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        exportMarketsEn: 'Europe, Gulf region, Middle East',
        specialNotes: 'تفاصيل الحاوية 40 قدما: علبة 7.5 كجم (30*40*16 سم) - 140 كرتون لكل منصة / علبة 10 كجم (30*40*22 سم) - 100 كرتون لكل منصة',
        rating: '4.7',
        stock: 'متوفر',
        stockEn: 'Available'
        ,
        descriptionEn: "Sweet orange mandarin, easy to peel and rich in vitamin C",
        categoryEn: "Fruits",
        originEn: "Wadi El-Natrun, Egypt",
        benefitsEn: "Boosts immunity, improves skin health, strengthens bones, helps iron absorption, protects cells from damage, supports heart health, regulates blood pressure, reduces inflammation",
        featuresEn: ["Rich source of vitamin C", "Easy to peel", "Contains antioxidants", "Low in calories", "Improves iron absorption", "Supports digestive system health", "Authentic Egyptian quality"],
        seasonEn: "Winter",
        storageEn: "At room temperature or refrigerator",
        varietiesEn: "Easy Peelers Mandarin (Fremont) - Late Mandarin: (Honey Murcott)",
        packagingEn: "40ft container details: (7.5 kg open top carton) or (10 kg open carton), or according to customer request",
        sizesEn: "Fremont mandarin sizes 42/48/54/63/72/80/88/100 - Fresh mandarin sizes 36/42/45/54/63/70/80/90",
        shippingEn: "Via refrigerated container, air freight",
        exportMarketsEn: "Europe, Gulf region, Middle East",
        stockEn: "Available"
    },
    'أصفر أداليا ليمون': {
        description: 'ليمون أصفر حامض طازج، عالي الجودة وغني بفيتامين سي',
        descriptionEn: 'Fresh yellow sour lemon, high quality and rich in vitamin C',
        category: 'فواكه',
        categoryEn: 'Fruits',
        image: '../images/img/fruits/Yellow Adalia Lemon.jpg',
        origin: 'الفيوم، مصر',
        originEn: 'Fayoum, Egypt',
        benefits: 'يعزز المناعة، يحسن الهضم، يطهر الجسم، يقي من السرطان، يقلل من الالتهابات، يدعم صحة البشرة، يساعد في إنقاص الوزن، يزيل السموم',
        benefitsEn: 'Boosts immunity, improves digestion, detoxifies body, prevents cancer, reduces inflammation, supports skin health, helps with weight loss, eliminates toxins',
        features: [
            'مصدر غني بفيتامين C',
            'يحتوي على مضادات الأكسدة',
            'يدعم صحة الجهاز الهضمي',
            'منخفض السعرات الحرارية',
            'يحسن صحة البشرة',
            'يقتل البكتيريا والفيروسات',
            'جودة مصرية مضمونة'
        ],
        featuresEn: ['Rich source of vitamin C', 'Contains antioxidants', 'Supports digestive system health', 'Low in calories', 'Improves skin health', 'Kills bacteria and viruses', 'Authentic Egyptian quality'],
        season: 'صيف وشتاء',
        seasonEn: 'Summer and Winter',
        storage: 'في الثلاجة لمدة 2-4 أسابيع',
        storageEn: 'In refrigerator for 2-4 weeks',
        packaging: 'تفاصيل التعبئة للحاوية 40 قدما: (علبة كرتون تلسكوبية 15 كجم)، أو حسب طلب العميل',
        packagingEn: '40ft container details: (15 kg telescopic carton), or according to customer request',
        sizes: 'أحجام الليمون الطازج 80/88/100/113/125/138/150/160',
        sizesEn: 'Fresh lemon sizes 80/88/100/113/125/138/150/160',
        shipping: 'عن طريق الحاوية المبردة، تحميل الهواء - 1664 كرتون على 21 منصة نقالة (20 رقاقة + 1 يورو)',
        shippingEn: 'Via refrigerated container, air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        exportMarketsEn: 'Europe, Gulf region, Middle East',
        specialNotes: 'تفاصيل الحاوية 40 قدما: علبة كرتون تلسكوبية (30*40*27 سم) - 80 كرتون لكل منصة - الوزن الصافي 15 كجم - الوزن الإجمالي 16 كجم',
        rating: '4.8',
        stock: 'متوفر',
        stockEn: 'Available'
        ,
        descriptionEn: "Fresh yellow sour lemon, high quality and rich in vitamin C",
        categoryEn: "Fruits",
        originEn: "Fayoum, Egypt",
        benefitsEn: "Boosts immunity, improves digestion, detoxifies body, prevents cancer, reduces inflammation, supports skin health, helps with weight loss, eliminates toxins",
        featuresEn: ["Rich source of vitamin C", "Contains antioxidants", "Supports digestive system health", "Low in calories", "Improves skin health", "Kills bacteria and viruses", "Authentic Egyptian quality"],
        seasonEn: "Summer and Winter",
        storageEn: "In refrigerator for 2-4 weeks",
        packagingEn: "40ft container details: (15 kg telescopic carton), or according to customer request",
        sizesEn: "Fresh lemon sizes 80/88/100/113/125/138/150/160",
        shippingEn: "Via refrigerated container, air freight",
        exportMarketsEn: "Europe, Gulf region, Middle East",
        stockEn: "Available"
    },
    'الجير الطازج': {
        description: 'جير ليمون أخضر حامض طازج، عالي الجودة وغني بالعناصر الغذائية',
        descriptionEn: 'Fresh green lime lemon, high quality and rich in nutrients',
        category: 'فواكه',
        categoryEn: 'Fruits',
        image: '../images/img/fruits/Fresh Lime.jpg',
        origin: 'القاهرة، مصر',
        originEn: 'Cairo, Egypt',
        benefits: 'يعزز المناعة، يحسن الهضم، يطهر الجسم، يقي من السرطان، يقلل من الالتهابات، يدعم صحة البشرة، يساعد في إنقاص الوزن، يزيل السموم',
        benefitsEn: 'Boosts immunity, improves digestion, detoxifies body, prevents cancer, reduces inflammation, supports skin health, helps with weight loss, eliminates toxins',
        features: [
            'مصدر غني بفيتامين C',
            'يحتوي على مضادات الأكسدة',
            'يساعد في الهضم',
            'يطهر الجسم',
            'يدعم صحة البشرة',
            'منخفض السعرات الحرارية',
            'جودة مصرية مضمونة'
        ],
        featuresEn: ['Rich source of vitamin C', 'Contains antioxidants', 'Helps digestion', 'Detoxifies body', 'Supports skin health', 'Low in calories', 'Authentic Egyptian quality'],
        season: 'طوال العام',
        seasonEn: 'Year-round',
        storage: 'في درجة حرارة الغرفة أو الثلاجة',
        storageEn: 'At room temperature or refrigerator',
        varieties: 'الدببة الخضراء الخالية من البذور الجير والجير الأخضر (Banzaheer)',
        varietiesEn: 'Seedless green bears lime and green lime (Banzaheer)',
        packaging: 'تفاصيل التعبئة للحاوية 40 قدما: (4.5 كجم علبة كرتون مفتوحة علوي)، أو حسب طلب العميل',
        packagingEn: '40ft container details: (4.5 kg open top carton), or according to customer request',
        sizes: '100/113/125/138/150/160',
        sizesEn: '100/113/125/138/150/160',
        shipping: 'عن طريق الحاوية المبردة، تحميل الهواء - 3736 كرتون على 21 منصة نقالة (20 رقاقة + 1 يورو)',
        shippingEn: 'Via refrigerated container, air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        exportMarketsEn: 'Europe, Gulf region, Middle East',
        specialNotes: 'تفاصيل الحاوية 40 قدما: علبة كرتون (30*40*12 سم) - 180 كرتون لكل منصة - الوزن الصافي 4.5 كجم - الوزن الإجمالي 5.5 كجم - الجير الأخضر المصنف (Banzaheer) متاح على مدار السنة',
        rating: '4.7',
        stock: 'متوفر',
        stockEn: 'Available'
        ,
        descriptionEn: "Fresh green lime lemon, high quality and rich in nutrients",
        categoryEn: "Fruits",
        originEn: "Cairo, Egypt",
        benefitsEn: "Boosts immunity, improves digestion, detoxifies body, prevents cancer, reduces inflammation, supports skin health, helps with weight loss, eliminates toxins",
        featuresEn: ["Rich source of vitamin C", "Contains antioxidants", "Helps digestion", "Detoxifies body", "Supports skin health", "Low in calories", "Authentic Egyptian quality"],
        seasonEn: "Year-round",
        storageEn: "At room temperature or refrigerator",
        varietiesEn: "Seedless green bears lime and green lime (Banzaheer)",
        packagingEn: "40ft container details: (4.5 kg open top carton), or according to customer request",
        sizesEn: "100/113/125/138/150/160",
        shippingEn: "Via refrigerated container, air freight",
        exportMarketsEn: "Europe, Gulf region, Middle East",
        stockEn: "Available"
    },
    'برتقال فالنسيا': {
        description: 'برتقال فالنسيا حلو المذاق، عالي العصير وجودة ممتازة',
        descriptionEn: 'Sweet Valencia orange, high juice and excellent quality',
        category: 'فواكه',
        categoryEn: 'Fruits',
        image: '../images/img/fruits/Valencia Oranges.jpg',
        origin: 'الإسكندرية، مصر',
        originEn: 'Alexandria, Egypt',
        benefits: 'يعزز المناعة، يحسن صحة البشرة، يقوي العظام، يساعد في امتصاص الحديد، يحمي الخلايا من التلف، يدعم صحة القلب، ينظم ضغط الدم، يقلل من الالتهابات',
        benefitsEn: 'Boosts immunity, improves skin health, strengthens bones, helps iron absorption, protects cells from damage, supports heart health, regulates blood pressure, reduces inflammation',
        features: [
            'مصدر غني بفيتامين C',
            'عالي العصير',
            'يحتوي على مضادات الأكسدة',
            'منخفض السعرات الحرارية',
            'يحسن امتصاص الحديد',
            'يدعم صحة الجهاز الهضمي',
            'جودة مصرية مضمونة'
        ],
        featuresEn: ['Rich source of vitamin C', 'High juice content', 'Contains antioxidants', 'Low in calories', 'Improves iron absorption', 'Supports digestive system health', 'Authentic Egyptian quality'],
        season: 'شتاء وربيع',
        seasonEn: 'Winter and Spring',
        storage: 'في درجة حرارة الغرفة أو الثلاجة',
        storageEn: 'At room temperature or refrigerator',
        packaging: 'تفاصيل التعبئة للحاوية 40 قدما: (علبة كرتون مفتوحة 15 كجم) أو (علبة كرتون تلسكوبية 15 كجم، كرتون T/C)، أو حسب طلب العميل',
        packagingEn: '40ft container details: (15 kg open carton) or (15 kg telescopic carton, T/C carton), or according to customer request',
        sizes: 'أحجام البرتقال الطازج 42/48/56/64 (علبة مفتوحة) - 48/56/64/72/80/88/100/113/125 (علبة تلسكوبية)',
        sizesEn: 'Fresh orange sizes 42/48/56/64 (open box) - 48/56/64/72/80/88/100/113/125 (telescopic box)',
        shipping: 'عن طريق الحاوية المبردة - 1332 كرتون مفتوح أو 1664 كرتون تلسكوبي على 21 منصة نقالة (20 رقاقة + 1 يورو)',
        shippingEn: 'Via refrigerated container',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        exportMarketsEn: 'Europe, Gulf region, Middle East',
        specialNotes: 'تفاصيل الحاوية 40 قدما: علبة مفتوحة (40*60*16.5 سم) - 65 كرتون لكل منصة / علبة تلسكوبية (30*40*27 سم) - 80 كرتون لكل منصة - الوزن الصافي 15 كجم - الوزن الإجمالي 16 كجم',
        rating: '4.8',
        stock: 'متوفر',
        stockEn: 'Available'
        ,
        descriptionEn: "Sweet Valencia orange, high juice and excellent quality",
        categoryEn: "Fruits",
        originEn: "Alexandria, Egypt",
        benefitsEn: "Boosts immunity, improves skin health, strengthens bones, helps iron absorption, protects cells from damage, supports heart health, regulates blood pressure, reduces inflammation",
        featuresEn: ["Rich source of vitamin C", "High juice content", "Contains antioxidants", "Low in calories", "Improves iron absorption", "Supports digestive system health", "Authentic Egyptian quality"],
        seasonEn: "Winter and Spring",
        storageEn: "At room temperature or refrigerator",
        packagingEn: "40ft container details: (15 kg open carton) or (15 kg telescopic carton, T/C carton), or according to customer request",
        sizesEn: "Fresh orange sizes 42/48/56/64 (open box) - 48/56/64/72/80/88/100/113/125 (telescopic box)",
        shippingEn: "Via refrigerated container",
        exportMarketsEn: "Europe, Gulf region, Middle East",
        stockEn: "Available"
    },
    'برتقال السرة': {
        description: 'برتقال السرة حلو المذاق، سهل التقشير وعالي الجودة',
        category: 'فواكه',
        image: '../images/img/fruits/Navel Oranges.jpg',
        origin: 'المنصورة، مصر',
        benefits: 'يعزز المناعة، يحسن صحة البشرة، يقوي العظام، يساعد في امتصاص الحديد، يحمي الخلايا من التلف، يدعم صحة القلب، ينظم ضغط الدم، يقلل من الالتهابات',
        features: [
            'مصدر غني بفيتامين C',
            'سهل التقشير',
            'يحتوي على مضادات الأكسدة',
            'منخفض السعرات الحرارية',
            'يحسن امتصاص الحديد',
            'يدعم صحة الجهاز الهضمي',
            'جودة مصرية مضمونة'
        ],
        season: 'شتاء',
        storage: 'في درجة حرارة الغرفة أو الثلاجة',
        varieties: 'برتقال السرة المبكر: نافالينا. برتقال السرة المتوسطة: واشنطن. السرة البرتقال المتأخر: السرة المتأخرة',
        packaging: 'تفاصيل التعبئة للحاوية 40 قدما: (علبة كرتون مفتوحة 15 كجم)، أو حسب طلب العميل',
        sizes: 'أحجام البرتقال الطازج 42/48/56/64/72 (علبة 40*60*16.5 سم) - 48/56/64/72/80/88/100 (علبة 30*40*27 سم)',
        shipping: 'عن طريق الحاوية المبردة - 1332 كرتون (40*60*16.5 سم) أو 1664 كرتون (30*40*27 سم) على 21 منصة نقالة (20 رقاقة + 1 يورو)',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        specialNotes: 'تفاصيل الحاوية 40 قدما: علبة (40*60*16.5 سم) - 65 كرتون لكل منصة / علبة (30*40*27 سم) - 80 كرتون لكل منصة - الوزن الصافي 15 كجم - الوزن الإجمالي 16 كجم',
        rating: '4.8',
        stock: 'متوفر',
        stockEn: 'Available',
        descriptionEn: "Sweet navel orange, easy to peel and high quality",
        categoryEn: "Fruits",
        originEn: "Mansoura, Egypt",
        benefitsEn: "Boosts immunity, improves skin health, strengthens bones, helps iron absorption, protects cells from damage, supports heart health, regulates blood pressure, reduces inflammation",
        featuresEn: ["Rich source of vitamin C", "Easy to peel", "Contains antioxidants", "Low in calories", "Improves iron absorption", "Supports digestive system health", "Authentic Egyptian quality"],
        seasonEn: "Winter",
        storageEn: "At room temperature or refrigerator",
        varietiesEn: "Early Navel Orange: Navalina. Medium Navel Orange: Washington. Late Navel Orange: Late Navel",
        packagingEn: "40ft container details: (15 kg open carton), or according to customer request",
        sizesEn: "Fresh orange sizes 42/48/56/64/72 (40*60*16.5 cm box) - 48/56/64/72/80/88/100 (30*40*27 cm box)",
        shippingEn: "Via refrigerated container",
        exportMarketsEn: "Europe, Gulf region, Middle East"
    },
    'خوخ': {
        description: 'خوخ أصفر طازج، حلو المذاق وعالي الجودة',
        descriptionEn: "Fresh yellow peach, sweet taste and high quality",
        category: 'فواكه',
        categoryEn: "Fruits",
        image: '../images/img/fruits/Peach.jpg',
        origin: 'الوادي الجديد، مصر',
        originEn: "New Valley, Egypt",
        benefits: 'يحسن الهضم، يقوي المناعة، مفيد للبشرة، غني بالفيتامينات، يدعم صحة العين، يحمي من السرطان، ينظم ضغط الدم، يقوي العظام',
        benefitsEn: "Improves digestion, boosts immunity, beneficial for skin, rich in vitamins, supports eye health, protects from cancer, regulates blood pressure, strengthens bones",
        features: [
            'غني بفيتامين A و C',
            'يحتوي على مضادات الأكسدة',
            'يدعم صحة الجهاز الهضمي',
            'يحسن صحة البشرة',
            'يقوي المناعة',
            'مصدر طبيعي للطاقة',
            'جودة مصرية مضمونة'
        ],
        featuresEn: ["Rich in vitamin A and C", "Contains antioxidants", "Supports digestive system health", "Improves skin health", "Boosts immunity", "Natural source of energy", "Authentic Egyptian quality"],
        season: 'صيف',
        seasonEn: "Summer",
        storage: 'في درجة حرارة الغرفة حتى النضج ثم في الثلاجة',
        storageEn: "At room temperature until ripe then refrigerator",
        varieties: 'الخوخ فلوريدا الأمير - خوخ صحراء أحمر - تورم الخوخ المبكر',
        varietiesEn: "Florida Prince Peach - Red Desert Peach - Early Turm Peach",
        packaging: 'تفاصيل التعبئة للحاوية 40 قدما: (2.5 كجم علبة كرتون مفتوحة علوي) أو (علبة كرتون مفتوحة 5 كجم، 10 × 500 جم)، أو حسب طلب العميل',
        packagingEn: "40ft container details: (2.5 kg open top carton) or (5 kg open carton, 10 × 500 g), or according to customer request",
        sizes: 'أحجام الخوخ: 16/18/20/23/25 معبأة في كرتون يحتوي على صواني بلاستيكية أو في سلال بلاستيكية 250/500 جم',
        sizesEn: "Peach sizes: 16/18/20/23/25 packed in carton with plastic trays or in 250/500 g plastic baskets",
        shipping: 'عن طريق الحاويات المبردة والتحميل الجوي والشاحنات وسفن الشحن العامة - 5200 كرتون (2.5 كجم) أو 2500 كرتون (5 كجم) على 20 منصة نقالة خشبية',
        shippingEn: "Via refrigerated containers, air freight, trucks and general cargo ships",
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        exportMarketsEn: "Europe, Gulf region, Middle East",
        specialNotes: 'تفاصيل الحاوية 40 قدما: علبة (30*40*9 سم) - 260 كرتون لكل منصة / علبة (40*60*9 سم) - 125 كرتون لكل منصة - الشحن الجوي: AKE (240 كرتون)، LD3 (450 كرتون)، PAG (750 كرتون)',
        rating: '4.7',
        stock: 'متوفر',
        stockEn: "Available"
    },
    'كمون': {
        description: 'كمون مصري عالي الجودة، غني بالنكهة والفوائد الصحية',
        descriptionEn: 'High quality Egyptian cumin, rich in flavor and health benefits',
        category: 'توابل وبهارات',
        categoryEn: 'Spices',
        image: '../images/img/spices/Cumin.jpg',
        origin: 'الفيوم، مصر',
        originEn: 'Fayoum, Egypt',
        benefits: 'يحسن الهضم، يعزز المناعة، يساعد في إنقاص الوزن، ينظم السكر، يقلل الكوليسترول، يحسن النوم، يعالج فقر الدم، يقوي الذاكرة',
        benefitsEn: 'Improves digestion, boosts immunity, helps weight loss, regulates sugar, reduces cholesterol, improves sleep, treats anemia, strengthens memory',
        features: [
            'نكهة قوية ومميزة',
            'غني بالحديد',
            'يساعد في الهضم',
            'مضاد للالتهابات',
            'يعزز المناعة',
            'طبيعي 100%',
            'جودة مصرية فاخرة'
        ],
        featuresEn: ['Strong and distinctive flavor', 'Rich in iron', 'Helps digestion', 'Anti-inflammatory', 'Boosts immunity', '100% natural', 'Premium Egyptian quality'],
        season: 'طوال العام',
        seasonEn: 'Year-round',
        storage: 'في مكان بارد وجاف ومظلم',
        storageEn: 'In a cool, dry, and dark place',
        packaging: 'أكياس 25 كجم أو حسب طلب العميل',
        packagingEn: '25 kg bags or according to customer request',
        sizes: 'حبوب كاملة أو مطحون',
        sizesEn: 'Whole seeds or ground',
        shipping: 'شحن بحري أو جوي',
        shippingEn: 'Sea or air freight',
        exportMarkets: 'أوروبا، أمريكا، الدول العربية',
        exportMarketsEn: 'Europe, America, Arab countries',
        rating: '4.8',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'كركم': {
        description: 'كركم مصري طبيعي، غني بالكركمين والفوائد الصحية',
        descriptionEn: 'Natural Egyptian turmeric, rich in curcumin and health benefits',
        category: 'توابل وبهارات',
        categoryEn: 'Spices',
        image: '../images/img/spices/Turmeric.jpg',
        origin: 'أسوان، مصر',
        originEn: 'Aswan, Egypt',
        benefits: 'مضاد قوي للالتهابات، يحسن وظائف الدماغ، يقلل خطر الإصابة بأمراض القلب، يقي من السرطان، يعالج الاكتئاب، يؤخر الشيخوخة',
        benefitsEn: 'Strong anti-inflammatory, improves brain function, reduces heart disease risk, prevents cancer, treats depression, delays aging',
        features: [
            'غني بالكركمين',
            'مضاد قوي للأكسدة',
            'يحسن صحة المفاصل',
            'يعزز وظائف الدماغ',
            'يدعم صحة القلب',
            'لون طبيعي جذاب',
            'جودة ممتازة'
        ],
        featuresEn: ['Rich in curcumin', 'Strong antioxidant', 'Improves joint health', 'Boosts brain function', 'Supports heart health', 'Attractive natural color', 'Excellent quality'],
        season: 'طوال العام',
        seasonEn: 'Year-round',
        storage: 'في مكان بارد وجاف بعيداً عن الضوء',
        storageEn: 'In a cool, dry place away from light',
        packaging: 'أكياس متعددة الطبقات للحفاظ على الجودة',
        packagingEn: 'Multi-layer bags to maintain quality',
        sizes: 'أصابع كاملة أو مطحون',
        sizesEn: 'Whole fingers or ground',
        shipping: 'شحن بحري أو جوي',
        shippingEn: 'Sea or air freight',
        exportMarkets: 'أوروبا، آسيا، أفريقيا',
        exportMarketsEn: 'Europe, Asia, Africa',
        rating: '4.9',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'فلفل أسود': {
        description: 'فلفل أسود مصري حار، غني بالنكهة والفوائد',
        descriptionEn: 'Egyptian black pepper, spicy and rich in flavor and benefits',
        category: 'توابل وبهارات',
        categoryEn: 'Spices',
        image: '../images/img/spices/Black Pepper.jpg',
        origin: 'مصر',
        originEn: 'Egypt',
        benefits: 'يحسن امتصاص العناصر الغذائية، يعزز الهضم، مضاد للأكسدة، يحسن صحة الدماغ، يضبط السكر، يخفض الكوليسترول، يحارب السرطان',
        benefitsEn: 'Improves nutrient absorption, boosts digestion, antioxidant, improves brain health, regulates sugar, lowers cholesterol, fights cancer',
        features: [
            'نكهة حارة قوية',
            'يعزز امتصاص الكركمين',
            'غني بمضادات الأكسدة',
            'يحسن الهضم',
            'يدعم صحة الأمعاء',
            'جودة عالية',
            'نقي 100%'
        ],
        featuresEn: ['Strong spicy flavor', 'Boosts curcumin absorption', 'Rich in antioxidants', 'Improves digestion', 'Supports gut health', 'High quality', '100% pure'],
        season: 'طوال العام',
        seasonEn: 'Year-round',
        storage: 'في وعاء محكم الغلق',
        storageEn: 'In an airtight container',
        packaging: 'أكياس أو عبوات حسب الطلب',
        packagingEn: 'Bags or packages as requested',
        sizes: 'حبوب كاملة أو مطحون',
        sizesEn: 'Whole corns or ground',
        shipping: 'شحن بحري أو جوي',
        shippingEn: 'Sea or air freight',
        exportMarkets: 'عالمي',
        exportMarketsEn: 'Global',
        rating: '4.8',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'قرفة': {
        description: 'قرفة مصرية طبيعية، عطرية وحلوة المذاق',
        descriptionEn: 'Natural Egyptian cinnamon, aromatic and sweet tasting',
        category: 'توابل وبهارات',
        categoryEn: 'Spices',
        image: '../images/img/spices/Cinnamon.jpg',
        origin: 'مصر',
        originEn: 'Egypt',
        benefits: 'تضبط سكر الدم، تحارب الالتهابات، تحمي القلب، تحسن حساسية الأنسولين، تحارب البكتيريا والفطريات، تحمي من السرطان',
        benefitsEn: 'Regulates blood sugar, fights inflammation, protects heart, improves insulin sensitivity, fights bacteria and fungi, protects from cancer',
        features: [
            'نكهة حلوة وعطرية',
            'غنية بمضادات الأكسدة',
            'تساعد في ضبط السكر',
            'مضادة للالتهابات',
            'تحسن صحة القلب',
            'جودة فاخرة',
            'طبيعية'
        ],
        featuresEn: ['Sweet and aromatic flavor', 'Rich in antioxidants', 'Helps regulate sugar', 'Anti-inflammatory', 'Improves heart health', 'Premium quality', 'Natural'],
        season: 'طوال العام',
        seasonEn: 'Year-round',
        storage: 'في مكان بارد وجاف',
        storageEn: 'In a cool, dry place',
        packaging: 'أعواد أو مطحون في عبوات مناسبة',
        packagingEn: 'Sticks or ground in suitable packaging',
        sizes: 'أعواد (سيجار) أو مطحون',
        sizesEn: 'Sticks (cigars) or ground',
        shipping: 'شحن بحري أو جوي',
        shippingEn: 'Sea or air freight',
        exportMarkets: 'الشرق الأوسط، أوروبا',
        exportMarketsEn: 'Middle East, Europe',
        rating: '4.9',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'بلح': {
        description: 'بلح طازج حلو المذاق، غني بالعناصر الغذائية والطاقة',
        descriptionEn: "Fresh sweet dates, rich in nutrients and energy",
        category: 'فواكه',
        categoryEn: "Fruits",
        image: '../images/img/fruits/Dates.jpg',
        origin: 'الواحات، مصر',
        originEn: "Oases, Egypt",
        benefits: 'يزود الطاقة، يحسن الهضم، يقوي العظام، يدعم صحة الدماغ، غني بالمعادن، يقوي المناعة، يحسن صحة القلب، ينظم السكر',
        benefitsEn: "Provides energy, improves digestion, strengthens bones, supports brain health, rich in minerals, boosts immunity, improves heart health, regulates sugar",
        features: [
            'مصدر غني بالطاقة',
            'يحتوي على معادن متعددة',
            'غني بالألياف الغذائية',
            'يدعم صحة الجهاز الهضمي',
            'يحسن صحة الدماغ',
            'طبيعي 100%',
            'جودة مصرية مضمونة'
        ],
        featuresEn: ["Rich source of energy", "Contains multiple minerals", "Rich in dietary fiber", "Supports digestive system health", "Improves brain health", "100% natural", "Authentic Egyptian quality"],
        season: 'خريف',
        seasonEn: "Autumn",
        storage: 'في مكان بارد وجاف',
        storageEn: "In a cool and dry place",
        packaging: 'تفاصيل التعبئة للحاوية 40 قدما: (علبة كرتون مفتوحة 5 كجم، تعبئة فضفاضة) أو (علبة كرتون مفتوحة 5 كجم، 10 × 500 جرام سلال)، أو حسب طلب العميل',
        packagingEn: "40ft container details: (5 kg open carton, loose packing) or (5 kg open carton, 10 × 500 gram baskets), or according to customer request",
        shipping: 'عن طريق الحاويات المبردة والتحميل الجوي والشاحنات وسفن الشحن العامة - 3544 كرتون (تعبئة فضفاضة) أو 2496 كرتون (سلال) على 21 منصة نقالة',
        shippingEn: "Via refrigerated containers, air freight, trucks and general cargo ships",
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        exportMarketsEn: "Europe, Gulf region, Middle East",
        specialNotes: 'تفاصيل الحاوية 40 قدما: علبة (30*40*13 سم) - 170 كرتون لكل منصة / علبة (40*60*9 سم) - 120 كرتون لكل منصة - الوزن الصافي 5 كجم - الوزن الإجمالي 5.5 كجم - الشحن الجوي: 110 كرتون (تعبئة فضفاضة) أو 80 كرتون (سلال) لكل منصة',
        rating: '4.8',
        stock: 'متوفر',
        stockEn: "Available"
    },
    'الجوافه': {
        description: 'جوافة خضراء طازجة، حلوة المذاق وغنية بفيتامين سي',
        category: 'فواكه',
        image: '../images/img/fruits/Guava.png',
        origin: 'القليوبية، مصر',
        benefits: 'يعزز المناعة، يحسن صحة البشرة، يقوي العظام، يساعد في امتصاص الحديد، يحمي الخلايا من التلف، يدعم صحة القلب، ينظم ضغط الدم، يقلل من الالتهابات',
        features: [
            'مصدر غني بفيتامين C',
            'يحتوي على مضادات الأكسدة',
            'غني بالألياف الغذائية',
            'يدعم صحة الجهاز الهضمي',
            'يحسن صحة البشرة',
            'يعزز المناعة',
            'جودة مصرية مضمونة'
        ],
        season: 'صيف وخريف',
        storage: 'في درجة حرارة الغرفة حتى النضج ثم في الثلاجة',
        varieties: 'بلدي – بناتي – حلو',
        packaging: 'التعبئة: 2 كجم و 3 كجم علبة كرتون - صناديق خشبية وبلاستيكية',
        shipping: 'عن طريق الحاويات المبردة والتحميل الجوي والشاحنات وسفن الشحن العامة',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        specialNotes: 'تغيير الحجم والتعبئة وفقا لطلب العميل',
        rating: '4.6',
        stock: 'متوفر'
        ,
        descriptionEn: "Fresh green guava, sweet taste and rich in vitamin C",
        categoryEn: "Fruits",
        originEn: "Qalyubia, Egypt",
        benefitsEn: "Boosts immunity, improves skin health, strengthens bones, helps iron absorption, protects cells from damage, supports heart health, regulates blood pressure, reduces inflammation",
        featuresEn: ["Rich source of vitamin C", "Contains antioxidants", "Rich in dietary fiber", "Supports digestive system health", "Improves skin health", "Boosts immunity", "Authentic Egyptian quality"],
        seasonEn: "Summer and Autumn",
        storageEn: "At room temperature until ripe then refrigerator",
        varietiesEn: "Local - Banati - Sweet",
        packagingEn: "Packing: 2 kg and 3 kg carton boxes - wooden and plastic boxes",
        shippingEn: "Via refrigerated containers, air freight, trucks and general cargo ships",
        exportMarketsEn: "Europe, Gulf region, Middle East",
        stockEn: "Available"
    },
    'عنب مشكل (سلال مشكلة)': {
        description: 'عنب مشكل من أصناف متنوعة، حلو المذاق وعالي الجودة',
        category: 'فواكه',
        image: '../images/img/fruits/Mixed Grapes (Mixed Punnets).jpg',
        origin: 'الإسكندرية، مصر',
        benefits: 'يحمي القلب، يحسن الذاكرة، غني بمضادات الأكسدة، يقوي العظام، يحسن صحة الكلى، ينظم ضغط الدم، يحمي من التهاب المفاصل، يدعم صحة العين',
        features: [
            'غني بمضادات الأكسدة',
            'يدعم صحة القلب',
            'يحسن الذاكرة',
            'يقوي العظام',
            'ينظم ضغط الدم',
            'يحمي من التهاب المفاصل',
            'جودة مصرية مضمونة'
        ],
        season: 'صيف',
        storage: 'في الثلاجة في كيس ورقي',
        varieties: 'العنب المختلط (الصناديق المختلطة): الصلاب المختلطة كأصناف بيضاء/حمراء وسوداء أو أصناف حمراء وسوداء',
        packaging: 'تفاصيل التعبئة للحاوية 40 قدما: (علبة كرتون مفتوحة 5 كجم، 10 × 500 جرام سلال)، أو حسب طلب العميل',
        shipping: 'عن طريق الحاوية المبردة، التحميل الجوي، الشاحنات وسفن الشحن العامة - 2596 كرتون على 21 منصة نقالة (20 رقاقة + 1 يورو)',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        specialNotes: 'تفاصيل الحاوية 40 قدما: علبة كرتون (40*60*9 سم) - 125 كرتون لكل منصة - 10 سلال لكل علبة - 500 جرام لكل سلة - الوزن الصافي 5 كجم - الوزن الإجمالي 6 كجم',
        rating: '4.7',
        stock: 'متوفر'
        ,
        descriptionEn: "Mixed grapes from various varieties, sweet taste and high quality",
        categoryEn: "Fruits",
        originEn: "Alexandria, Egypt",
        benefitsEn: "Protects heart, improves memory, rich in antioxidants, strengthens bones, improves kidney health, regulates blood pressure, protects from arthritis, supports eye health",
        featuresEn: ["Rich in antioxidants", "Supports heart health", "Improves memory", "Strengthens bones", "Regulates blood pressure", "Protects from arthritis", "Authentic Egyptian quality"],
        seasonEn: "Summer",
        storageEn: "In refrigerator in paper bag",
        varietiesEn: "Mixed grapes (mixed boxes): mixed varieties as white/red and black or red and black varieties",
        packagingEn: "40ft container details: (5 kg open carton, 10 × 500 gram baskets), or according to customer request",
        shippingEn: "Via refrigerated container, air freight, trucks and general cargo ships - 2596 cartons on 21 pallets (20 sheets + 1 euro)",
        exportMarketsEn: "Europe, Gulf region, Middle East",
        stockEn: "Available"
    },
    'العنب القرمزي الخالي من البذور': {
        description: 'عنب قرمزي أحمر خالي من البذور، حلو المذاق وجودة ممتازة',
        category: 'فواكه',
        image: '../images/img/fruits/Crimson Seedless Grapes.jpg',
        origin: 'الإسكندرية، مصر',
        benefits: 'يحمي القلب، يحسن الذاكرة، غني بمضادات الأكسدة، يقوي العظام، يحسن صحة الكلى، ينظم ضغط الدم، يحمي من التهاب المفاصل، يدعم صحة العين',
        features: [
            'خالي من البذور',
            'غني بمضادات الأكسدة',
            'يدعم صحة القلب',
            'يحسن الذاكرة',
            'يقوي العظام',
            'ينظم ضغط الدم',
            'جودة مصرية مضمونة'
        ],
        season: 'صيف وخريف',
        storage: 'في الثلاجة في كيس ورقي',
        sizes: 'أحجام التوت: + 17 مم إلى 20 مم. مستوى بريكس: + 16٪. شكل المجموعة: شكل مخروطي. لون قرمزي نموذجي كامل. الحد الأدنى للوزن الصافي / المجموعة: 250 جرام',
        packaging: 'تفاصيل التعبئة للحاوية 40 قدما: (4.5 كجم علبة كرتون مفتوحة / أكياس حمل) أو (علبة كرتون مفتوحة 5 كجم، 10 × 500 جرام سلال) أو (علبة كرتون مفتوحة 5.5 كجم، 11 × 500 جرام سلال)، أو حسب طلب العميل',
        shipping: 'عن طريق الحاوية المبردة، التحميل الجوي، الشاحنات وسفن الشحن العامة - 3544 كرتون (4.5 كجم) أو 2596 كرتون (5 كجم) أو 2496 كرتون (5.5 كجم) على 21 منصة نقالة',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        specialNotes: 'تفاصيل الحاوية 40 قدما: علبة (30*40*13 سم) - 170 كرتون لكل منصة (4.5 كجم) / علبة (40*60*9 سم) - 125 كرتون لكل منصة (5 كجم) أو 120 كرتون لكل منصة (5.5 كجم) - 9 أكياس حمل (500 جرام) أو 10/11 سلال (500 جرام) لكل علبة',
        rating: '4.8',
        stock: 'متوفر'
        ,
        descriptionEn: "Seedless crimson red grapes, sweet taste and excellent quality",
        categoryEn: "Fruits",
        originEn: "Alexandria, Egypt",
        benefitsEn: "Protects heart, improves memory, rich in antioxidants, strengthens bones, improves kidney health, regulates blood pressure, protects from arthritis, supports eye health",
        featuresEn: ["Rich in antioxidants", "Supports heart health", "Improves memory", "Strengthens bones", "Regulates blood pressure", "Protects from arthritis", "Authentic Egyptian quality"],
        seasonEn: "Summer and Autumn",
        storageEn: "In refrigerator in paper bag",
        sizesEn: "Berry sizes: + 17 mm to 20 mm. Brix level: + 16%. Cluster shape: Conical shape. Full typical crimson color. Minimum net weight / cluster: 250 grams",
        packagingEn: "40ft container details: (4.5 kg open carton / carry bags) or (5 kg open carton, 10 × 500 gram baskets) or (5.5 kg open carton, 11 × 500 gram baskets), or according to customer request",
        shippingEn: "Via refrigerated container, air freight, trucks and general cargo ships - 3544 cartons (4.5 kg) or 2596 cartons (5 kg) or 2496 cartons (5.5 kg) on 21 pallets",
        exportMarketsEn: "Europe, Gulf region, Middle East",
        stockEn: "Available"
    },
    'عنب لهب بدون بذور': {
        description: 'عنب لهب أحمر بدون بذور، حلو المذاق وعالي الجودة',
        category: 'فواكه',
        image: '../images/img/fruits/Flame Seedless Grapes.jpg',
        origin: 'البحيرة، مصر',
        benefits: 'يحمي القلب، يحسن الذاكرة، غني بمضادات الأكسدة، يقوي العظام، يحسن صحة الكلى، ينظم ضغط الدم، يحمي من التهاب المفاصل، يدعم صحة العين',
        features: [
            'خالي من البذور',
            'غني بمضادات الأكسدة',
            'يدعم صحة القلب',
            'يحسن الذاكرة',
            'يقوي العظام',
            'ينظم ضغط الدم',
            'جودة مصرية مضمونة'
        ],
        season: 'صيف',
        storage: 'في الثلاجة في كيس ورقي',
        sizes: 'أحجام التوت: + 17 مم إلى 20 مم. مستوى بريكس: + 16٪. شكل المجموعة: شكل مخروطي. الحد الأدنى للوزن الصافي / المجموعة: 250 جرام',
        packaging: 'تفاصيل التعبئة للحاوية 40 قدما: (4.5 كجم علبة كرتون مفتوحة / أكياس حمل) أو (علبة كرتون مفتوحة 5 كجم، 10 × 500 جرام سلال) أو (9 كجم علبة كرتون مفتوحة / أكياس حمل) أو (صندوق بلاستيكي مفتوح 5 كجم، تعبئة فضفاضة) أو (صندوق بلاستيكي مفتوح 10 كجم، تعبئة فضفاضة)، أو حسب طلب العميل',
        shipping: 'عن طريق الحاوية المبردة، التحميل الجوي، الشاحنات وسفن الشحن العامة - 3544 كرتون (4.5 كجم) أو 2596 كرتون (5 كجم) أو 1752 كرتون (9 كجم) أو 3736 كرتون (5 كجم بلاستيك) أو 1860 كرتون (10 كجم بلاستيك) على 21 منصة نقالة',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        specialNotes: 'تفاصيل الحاوية 40 قدما: علبة (30*40*13 سم) - 170 كرتون لكل منصة (4.5 كجم) / علبة (40*60*9 سم) - 125 كرتون لكل منصة (5 كجم) / علبة (40*60*13 سم) - 85 كرتون لكل منصة (9 كجم) / صندوق (30*40*12 سم) - 180 صندوق لكل منصة (5 كجم بلاستيك) / صندوق (40*50*14 سم) - 90 صندوق لكل منصة (10 كجم بلاستيك)',
        rating: '4.7',
        stock: 'متوفر'
        ,
        descriptionEn: "Seedless flame red grapes, sweet taste and high quality",
        categoryEn: "Fruits",
        originEn: "Beheira, Egypt",
        benefitsEn: "Protects heart, improves memory, rich in antioxidants, strengthens bones, improves kidney health, regulates blood pressure, protects from arthritis, supports eye health",
        featuresEn: ["Rich in antioxidants", "Supports heart health", "Improves memory", "Strengthens bones", "Regulates blood pressure", "Protects from arthritis", "Authentic Egyptian quality"],
        seasonEn: "Summer",
        storageEn: "In refrigerator in paper bag",
        sizesEn: "Berry sizes: + 17 mm to 20 mm. Brix level: + 16%. Cluster shape: Conical shape. Minimum net weight / cluster: 250 grams",
        packagingEn: "40ft container details: (4.5 kg open carton / carry bags) or (5 kg open carton, 10 × 500 gram baskets) or (9 kg open carton / carry bags) or (5 kg open plastic box, loose packing) or (10 kg open plastic box, loose packing), or according to customer request",
        shippingEn: "Via refrigerated container, air freight, trucks and general cargo ships - 3544 cartons (4.5 kg) or 2596 cartons (5 kg) or 1752 cartons (9 kg) or 3736 cartons (5 kg plastic) or 1860 cartons (10 kg plastic) on 21 pallets",
        exportMarketsEn: "Europe, Gulf region, Middle East",
        stockEn: "Available"
    },
    'رمان': {
        description: 'رمان أحمر طازج، حلو المذاق وغني بالعناصر الغذائية',
        category: 'فواكه',
        image: '../images/img/fruits/Pomegranates.jpg',
        origin: 'الفيوم، مصر',
        benefits: 'يحمي القلب، يقاوم السرطان، يحسن الذاكرة، غني بمضادات الأكسدة، يقلل الالتهابات، يدعم صحة الجلد، ينظم ضغط الدم، يحسن الهضم',
        features: [
            'غني بمضادات الأكسدة',
            'يدعم صحة القلب',
            'يقاوم السرطان',
            'يحسن الذاكرة',
            'يقلل الالتهابات',
            'يدعم صحة الجلد',
            'جودة مصرية مضمونة'
        ],
        season: 'خريف',
        storage: 'في مكان بارد أو الثلاجة',
        varieties: 'أوائل 116 رمان - رمان بلدي - رمان رائع',
        sizes: 'أوائل 116 حبة رمان: 7/8/9/10/11/12 قطعة لكل كرتون كرتون 4.5 كجم أو صندوق بلاستيكي - رمان بلدي: 7/8/9/10/11/12/13/14 قطعة لكل كرتون كرتون 4.5 كجم أو علبة بلاستيكية - رمان رائع: 6/7/8/9/10/11/12 قطعة لكل كرتون كرتون 4.5 كجم أو علبة بلاستيكية',
        packaging: 'تفاصيل التعبئة للحاوية 40 قدما: (3.5 كجم علبة كرتون مفتوحة علوي) أو (4.5 كجم علبة كرتون مفتوحة / صندوق بلاستيكي)، أو حسب طلب العميل',
        shipping: 'عن طريق الحاويات المبردة والتحميل الجوي والشاحنات وسفن الشحن العامة - 4800 كرتون (3.5 كجم) على 20 منصة نقالة أو 4144 كرتون (4.5 كجم) على 21 منصة نقالة',
        exportMarkets: 'المملكة المتحدة، فرنسا، ألمانيا، هولندا، روسيا، منطقة الخليج',
        specialNotes: 'تفاصيل الحاوية 40 قدما: علبة (30*33*11 سم) - 240 كرتون لكل منصة (3.5 كجم) / علبة (30*40*11 سم) - 200 كرتون لكل منصة (4.5 كجم) - الوزن الصافي 3.5 كجم، الوزن الإجمالي 4 كجم (3.5 كجم) / الوزن الصافي 4.5 كجم، الوزن الإجمالي 5 كجم (4.5 كجم)',
        rating: '4.9',
        stock: 'متوفر'
        ,
        descriptionEn: "Fresh red pomegranate, sweet taste and rich in nutrients",
        categoryEn: "Fruits",
        originEn: "Ismailia, Egypt",
        benefitsEn: "Boosts immunity, improves skin health, strengthens bones, helps iron absorption, protects cells from damage, supports heart health, regulates blood pressure, reduces inflammation",
        featuresEn: ["Rich in antioxidants", "Rich in vitamin C", "Contains dietary fiber", "Supports heart health", "Improves digestion", "Boosts immunity", "Authentic Egyptian quality"],
        seasonEn: "Autumn",
        storageEn: "At room temperature or refrigerator",
        packagingEn: "2 kg and 3 kg carton boxes - wooden and plastic boxes",
        shippingEn: "Via refrigerated containers, air freight, trucks and general cargo ships",
        exportMarketsEn: "Europe, Gulf region, Middle East",
        stockEn: "Available"
    },
    'أنبج': {
        description: 'أنبج حلو المذاق، فاكهة استوائية طازجة',
        category: 'فواكه',
        image: '../images/img/fruits/Mango.jpg',
        origin: 'أسوان، مصر',
        benefits: 'يحسن الهضم، يقوي المناعة، مفيد للبشرة، غني بالفيتامينات، يدعم صحة العين، يحمي من السرطان، ينظم ضغط الدم، يقوي العظام',
        features: [
            'غني بفيتامين A و C',
            'يحتوي على مضادات الأكسدة',
            'يدعم صحة الجهاز الهضمي',
            'يحسن صحة البشرة',
            'يقوي المناعة',
            'مصدر طبيعي للطاقة',
            'جودة مصرية مضمونة'
        ],
        season: 'صيف',
        storage: 'في درجة حرارة الغرفة حتى النضج ثم في الثلاجة',
        varieties: 'نعومي - هايدي - كيث - كينت - R2E2 - تومي - ليلي - تشيلي - كنسينغتون',
        sizes: 'المانجو الأحجام: من 300 جم حتى 850/900 جم - (7/8/9/10/11/12 فواكه / 5 كجم كرتون أو علبة بلاستيكية)',
        packaging: 'تفاصيل التعبئة للحاوية 40 قدما: (علبة كرتون مفتوحة 5 كجم وصندوق بلاستيكي)، أو حسب طلب العميل',
        shipping: 'عن طريق الحاويات المبردة والتحميل الجوي والشاحنات وسفن الشحن العامة - 3736 كرتون (5 كجم) على 21 منصة نقالة - الشحن الجوي: 200 كرتون (تعبئة فضفاضة) لكل AKE، 330 كرتون (3 منصات خشبية) لكل PLA، 550 كرتون (5 منصات خشبية) لكل PAG',
        exportMarkets: 'المملكة المتحدة، فرنسا، ألمانيا، هولندا، روسيا، منطقة الخليج',
        specialNotes: 'تفاصيل الحاوية 40 قدما: علبة (30*40*12 سم) - 180 كرتون لكل منصة - الوزن الصافي 5 كجم، الوزن الإجمالي 5.5 كجم - إجمالي الوزن الصافي 18,680 كجم، إجمالي الوزن الإجمالي 20,548 كجم - الشحن الجوي: AKE (1000 كجم)، PLA (1650 كجم)، PAG (2750 كجم)',
        rating: '4.6',
        stock: 'متوفر'
        ,
        descriptionEn: "Sweet mango, fresh tropical fruit",
        categoryEn: "Fruits",
        originEn: "Aswan, Egypt",
        benefitsEn: "Rich in vitamin A, improves digestion, boosts immunity, supports eye health, improves skin health, rich in antioxidants, helps with weight loss, reduces inflammation",
        featuresEn: ["Rich in vitamin A and C", "Contains antioxidants", "Supports digestive system health", "Improves skin health", "Boosts immunity", "Natural source of energy", "Authentic Egyptian quality"],
        seasonEn: "Summer",
        storageEn: "At room temperature until ripe then refrigerator",
        packagingEn: "2 kg and 3 kg carton boxes - wooden and plastic boxes",
        shippingEn: "Via refrigerated containers, air freight, trucks and general cargo ships",
        exportMarketsEn: "Europe, Gulf region, Middle East",
        stockEn: "Available"
    },
    'عنب أبيض بدون بذور': {
        description: 'عنب أبيض أخضر خالي من البذور، حلو المذاق وعالي الجودة',
        category: 'فواكه',
        image: '../images/img/fruits/White Seedless Grapes.jpg',
        origin: 'الغربية، مصر',
        benefits: 'يحمي القلب، يحسن الذاكرة، غني بمضادات الأكسدة، يقوي العظام، يحسن صحة الكلى، ينظم ضغط الدم، يحمي من التهاب المفاصل، يدعم صحة العين',
        features: [
            'خالي من البذور',
            'غني بمضادات الأكسدة',
            'يدعم صحة القلب',
            'يحسن الذاكرة',
            'يقوي العظام',
            'منخفض السعرات الحرارية',
            'جودة مصرية مضمونة'
        ],
        season: 'صيف وخريف',
        storage: 'في الثلاجة في كيس ورقي',
        varieties: 'العنب الحلو المبكر - العنب الخالي من البذور - عنب سوجرون بدون بذور',
        sizes: 'أحجام التوت: + 18 مم إلى 20/22 مم. مستوى بريكس: + 15٪. شكل المجموعة: شكل مخروطي. الحد الأدنى للوزن الصافي / المجموعة: 250 جرام',
        packaging: 'تفاصيل التعبئة للحاوية 40 قدما: (4.5 كجم علبة كرتون مفتوحة / أكياس حمل) أو (علبة كرتون مفتوحة 5 كجم، 10 × 500 جرام سلال) أو (9 كجم علبة كرتون مفتوحة / أكياس حمل) أو (صندوق بلاستيكي مفتوح 5 كجم، تعبئة فضفاضة) أو (صندوق بلاستيكي مفتوح 10 كجم، تعبئة فضفاضة)، أو حسب طلب العميل',
        shipping: 'عن طريق الحاوية المبردة، التحميل الجوي، الشاحنات وسفن الشحن العامة - 3544 كرتون (4.5 كجم) أو 2596 كرتون (5 كجم) أو 1752 كرتون (9 كجم) أو 3736 كرتون (5 كجم بلاستيك) أو 1860 كرتون (10 كجم بلاستيك) على 21 منصة نقالة',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        specialNotes: 'تفاصيل الحاوية 40 قدما: علبة (30*40*13 سم) - 170 كرتون لكل منصة (4.5 كجم) / علبة (40*60*9 سم) - 125 كرتون لكل منصة (5 كجم) / علبة (40*60*13 سم) - 85 كرتون لكل منصة (9 كجم) / صندوق (30*40*12 سم) - 180 صندوق لكل منصة (5 كجم بلاستيك) / صندوق (40*50*14 سم) - 90 صندوق لكل منصة (10 كجم بلاستيك)',
        rating: '4.7',
        stock: 'متوفر'
        ,
        descriptionEn: "Seedless white green grapes, sweet taste and high quality",
        categoryEn: "Fruits",
        originEn: "Alexandria, Egypt",
        benefitsEn: "Protects heart, improves memory, rich in antioxidants, strengthens bones, improves kidney health, regulates blood pressure, protects from arthritis, supports eye health",
        featuresEn: ["Rich in antioxidants", "Supports heart health", "Improves memory", "Strengthens bones", "Regulates blood pressure", "Protects from arthritis", "Authentic Egyptian quality"],
        seasonEn: "Summer and Autumn",
        storageEn: "In refrigerator in paper bag",
        varietiesEn: "Early sweet grapes - Seedless grapes - Sugarone seedless grapes",
        sizesEn: "Berry sizes: + 18 mm to 20/22 mm. Brix level: + 15%. Cluster shape: Conical shape. Minimum net weight / cluster: 250 grams",
        packagingEn: "40ft container details: (4.5 kg open carton / carry bags) or (5 kg open carton, 10 × 500 gram baskets) or (9 kg open carton / carry bags) or (5 kg open plastic box, loose packing) or (10 kg open plastic box, loose packing), or according to customer request",
        shippingEn: "Via refrigerated container, air freight, trucks and general cargo ships - 3544 cartons (4.5 kg) or 2596 cartons (5 kg) or 1752 cartons (9 kg) or 3736 cartons (5 kg plastic) or 1860 cartons (10 kg plastic) on 21 pallets",
        exportMarketsEn: "Europe, Gulf region, Middle East",
        stockEn: "Available"
    },
    'لوبيا': {
        description: 'لوبيا خضراء طازجة، غنية بالعناصر الغذائية',
        category: 'خضروات',
        image: '../images/img/vegetables/Green Beans.png',
        origin: 'المنيا، مصر',
        benefits: 'تقوي العظام، تحسن الهضم، غنية بالبروتين، تدعم صحة القلب، تنظم السكر، غنية بالفيتامينات، تقلل الالتهابات، تدعم المناعة',
        features: [
            'غنية بالبروتين والألياف',
            'تدعم صحة العظام',
            'تحسن الهضم',
            'تنظم سكر الدم',
            'تدعم صحة القلب',
            'غنية بالفيتامينات',
            'جودة مصرية مضمونة'
        ],
        season: 'صيف وخريف',
        storage: 'في الثلاجة لمدة 3-5 أيام',
        varieties: 'بوبي - ناعم جدا - ناعم',
        sizes: 'حسب طلب العميل - طول الكبسولة: 11 - 16 سم قطر الكبسولة: 9 - 12 مم',
        packaging: '10 أكياس * 500 جم / كرتون - 12 كيس * 400 جم / كرتون - 16 كيس * 310 جم / كرتون - 20 كيس * 250 جم / كرتون - 23 كيس * 220 جم / كرتون - 5 كجم كرتون (تعبئة سائبة) وكما يتطلب العميل',
        shipping: 'عن طريق التحميل الجوي وكما يتطلب العميل',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        specialNotes: 'التعبئة والأحجام والشحن حسب طلب العميل',
        rating: '4.6',
        stock: 'متوفر'
        ,
        descriptionEn: "Fresh green beans, rich in nutrients",
        categoryEn: "Vegetables",
        originEn: "Minya, Egypt",
        benefitsEn: "Strengthens bones, improves digestion, rich in protein, supports heart health, regulates blood sugar, rich in vitamins, reduces inflammation, supports immunity",
        featuresEn: ["Rich in protein and fiber", "Supports bone health", "Improves digestion", "Regulates blood sugar", "Supports heart health", "Rich in vitamins", "Authentic Egyptian quality"],
        seasonEn: "Summer and Autumn",
        storageEn: "In refrigerator for 3-5 days",
        varietiesEn: "Bobby - Very tender - Tender",
        sizesEn: "According to customer request - Pod length: 11 - 16 cm, Pod diameter: 9 - 12 mm",
        packagingEn: "10 bags * 500 g / carton - 12 bags * 400 g / carton - 16 bags * 310 g / carton - 20 bags * 250 g / carton - 23 bags * 220 g / carton - 5 kg carton (loose packing) as customer requires",
        shippingEn: "Via air freight as customer requires",
        exportMarketsEn: "Europe, Gulf region, Middle East",
        stockEn: "Available"
    },
    'ثوم طازج': {
        description: 'ثوم طازج أخضر، حاد المذاق وغني بالعناصر الغذائية',
        category: 'خضروات',
        image: '../images/img/vegetables/FRESH GARLIC.jpg',
        origin: 'أسيوط، مصر',
        benefits: 'يقاوم البكتيريا، يقوي المناعة، يخفض ضغط الدم، يحسن صحة القلب، يقي من السرطان، يطهر الجسم، يحسن الهضم، يقلل الالتهابات',
        features: [
            'خصائص مضادة للبكتيريا',
            'يحتوي على مركبات الكبريت',
            'يدعم صحة القلب',
            'يخفض ضغط الدم',
            'يقوي جهاز المناعة',
            'طبيعي 100%',
            'جودة مصرية مضمونة'
        ],
        season: 'ربيع وصيف',
        storage: 'في الثلاجة لمدة أسبوع',
        sizes: '3.5، 4، 4.5، 5، 5.5، 6، 6.5، 7، 7.5 سم - حسب طلب العميل',
        packaging: 'كرتون 5 كجم، 7 كجم، 10 كجم - أكياس PP 5 كجم، 7 كجم، 10 كجم - سلة 5 كجم من الخيزران مع شبكة - أو حسب طلب العميل',
        shipping: 'عن طريق التحميل الجوي أو الحاوية المبردة',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        specialNotes: 'تفاصيل الحاوية 40 قدما: سلة خيزران 5 كجم - 200 سلة لكل منصة، 4000 سلة إجمالي على 20 منصة خشبية - الوزن الصافي 5 كجم، الوزن الإجمالي 5.5 كجم - إجمالي الوزن الصافي 20,000 كجم، إجمالي الوزن الإجمالي 22,000 كجم - صندوق بلاستيكي 10 كجم - 100 صندوق لكل منصة، 2000 صندوق إجمالي على 20 منصة خشبية - أبعاد الصندوق (30*40*22 سم) - الوزن الصافي 10 كجم، الوزن الإجمالي 11 كجم - إجمالي الوزن الصافي 20,000 كجم',
        rating: '4.8',
        stock: 'متوفر'
        ,
        descriptionEn: "Fresh green garlic, pungent taste and rich in nutrients",
        categoryEn: "Vegetables",
        originEn: "Assiut, Egypt",
        benefitsEn: "Fights bacteria, boosts immunity, lowers blood pressure, improves heart health, prevents cancer, detoxifies body, improves digestion, reduces inflammation",
        featuresEn: ["Antibacterial properties", "Contains sulfur compounds", "Supports heart health", "Lowers blood pressure", "Boosts immune system", "100% natural", "Authentic Egyptian quality"],
        seasonEn: "Spring and Summer",
        storageEn: "In refrigerator for 1-2 weeks",
        sizesEn: "3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5 cm - According to customer request",
        packagingEn: "Carton 5 kg, 7 kg, 10 kg - PP bags 5 kg, 7 kg, 10 kg - Bamboo basket 5 kg with net - or according to customer request",
        shippingEn: "Via air freight or refrigerated container",
        exportMarketsEn: "Europe, Gulf region, Middle East",
        stockEn: "Available"
    },
    'بصل أخضر': {
        description: 'بصل أخضر طازج، حاد المذاق وغني بالفيتامينات',
        category: 'خضروات',
        image: '../images/img/vegetables/Green Beans.png',
        origin: 'القليوبية، مصر',
        benefits: 'يقاوم البكتيريا، يقوي المناعة، يخفض ضغط الدم، يحسن صحة القلب، يقي من السرطان، يطهر الجسم، يحسن الهضم، يقلل الالتهابات',
        features: [
            'غني بالفيتامينات',
            'يحتوي على مضادات الأكسدة',
            'يدعم صحة القلب',
            'يخفض ضغط الدم',
            'يقوي جهاز المناعة',
            'طبيعي 100%',
            'جودة مصرية مضمونة'
        ],
        season: 'شتاء وربيع',
        storage: 'في الثلاجة لمدة 5-7 أيام',
        varieties: 'فارايتي الجيزة، فوتون',
        sizes: 'ناعم، متوسط، جامبو - حسب طلب العميل',
        packaging: 'كرتون أو صندوق بلاستيك - 14 حزمة، 16 حزمة، 20 حزمة، 35 حزمة - وكما يتطلب العميل',
        shipping: 'عن طريق الحاويات المبردة والتحميل الجوي والشاحنات وسفن الشحن العامة',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        specialNotes: 'التعبئة والأحجام حسب طلب العميل',
        rating: '4.5',
        stock: 'متوفر'
        ,
        descriptionEn: "Fresh green onion, pungent taste and rich in vitamins",
        categoryEn: "Vegetables",
        originEn: "Qalyubia, Egypt",
        benefitsEn: "Fights bacteria, boosts immunity, lowers blood pressure, improves heart health, prevents cancer, detoxifies body, improves digestion, reduces inflammation",
        featuresEn: ["Rich in vitamins", "Contains antioxidants", "Supports heart health", "Lowers blood pressure", "Boosts immune system", "100% natural", "Authentic Egyptian quality"],
        seasonEn: "Winter and Spring",
        storageEn: "In refrigerator for 5-7 days",
        varietiesEn: "Giza variety, Foton",
        sizesEn: "Small, Medium, Jumbo - According to customer request",
        packagingEn: "Carton or plastic box - 14 bundles, 16 bundles, 20 bundles, 35 bundles - as customer requires",
        shippingEn: "Via refrigerated containers, air freight, trucks and general cargo ships",
        exportMarketsEn: "Europe, Gulf region, Middle East",
        stockEn: "Available"
    },
    'البطاطا الحلوة': {
        description: 'بطاطا حلوة برتقالية طازجة، حلوة المذاق وغنية بالعناصر الغذائية',
        category: 'خضروات',
        image: '../images/img/vegetables/SWEET POTATOES.jpg',
        origin: 'الشرقية، مصر',
        benefits: 'تزود الطاقة، تدعم صحة الجهاز الهضمي، تقوي المناعة، غنية بالفيتامينات، تحسن صحة العيون، تقلل التوتر، تدعم صحة القلب',
        features: [
            'مصدر غني بفيتامين A',
            'تحتوي على الألياف الغذائية',
            'غنية بمضادات الأكسدة',
            'تدعم صحة العيون',
            'مصدر طاقة مستدام',
            'تقوي المناعة',
            'جودة مصرية مضمونة'
        ],
        season: 'خريف وشتاء',
        storage: 'في مكان بارد وجاف',
        varieties: 'بيوريجارد مع لحم البرتقال (صنف أمريكي) - إيفانجلين بلحم البرتقال (صنف أمريكي) - بلفيو بلحم البرتقال (صنف أمريكي)',
        sizes: '100:150 جرام، 150:300 جرام، 300:450 جرام، 450:600 جرام، 600:800 جرام - حسب طلب العميل',
        packaging: 'تفاصيل التعبئة للحاوية 40 قدما: (6 كجم، 14 كجم كرتون مفتوح) - أو حسب طلب العميل',
        shipping: 'عن طريق الحاويات المبردة والتحميل الجوي والشاحنات وسفن الشحن العامة',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        specialNotes: 'تفاصيل الحاوية 40 قدما: 160 كرتون لكل منصة، 3320 كرتون إجمالي على 21 منصة نقالة (20 منصة رقاقة + 1 منصة يورو) - أبعاد علبة الكرتون (29*39*14 سم) - 10 علب لكل قاعدة، 16 علب لكل عمود - الوزن الصافي 6 كجم، الوزن الإجمالي 6.5 كجم - إجمالي الوزن الصافي 19,920 كجم، إجمالي الوزن الإجمالي 21,580 كجم',
        rating: '4.8',
        stock: 'متوفر'
        ,
        descriptionEn: "Fresh orange sweet potato, sweet taste and rich in nutrients",
        categoryEn: "Vegetables",
        originEn: "Sharqia, Egypt",
        benefitsEn: "Provides energy, supports digestive system health, boosts immunity, rich in vitamins, improves eye health, reduces stress, supports heart health",
        featuresEn: ["Rich in vitamin A", "Contains dietary fiber", "Rich in antioxidants", "Supports eye health", "Sustainable energy source", "Boosts immunity", "Authentic Egyptian quality"],
        seasonEn: "Autumn and Winter",
        storageEn: "In a cool and dry place",
        varietiesEn: "Beauregard with orange flesh (American variety) - Evangeline with orange flesh (American variety) - Belvu with orange flesh (American variety)",
        sizesEn: "100:150 gram, 150:300 gram, 300:450 gram, 450:600 gram, 600:800 gram - According to customer request",
        packagingEn: "40ft container details: (6 kg, 14 kg open carton) - or according to customer request",
        shippingEn: "Via refrigerated containers, air freight, trucks and general cargo ships",
        exportMarketsEn: "Europe, Gulf region, Middle East",
        stockEn: "Available"
    },
    'مانجيت آوت': {
        description: 'مانجو صغيرة حلوة المذاق، سهلة التقشير وجودة ممتازة',
        category: 'فواكه',
        image: '../images/img/fruits/Mango.jpg',
        origin: 'الإسماعيلية، مصر',
        benefits: 'يحسن الهضم، يقوي المناعة، مفيد للبشرة، غني بالفيتامينات، يدعم صحة العين، يحمي من السرطان، ينظم ضغط الدم، يقوي العظام',
        features: [
            'صغيرة الحجم',
            'غنية بفيتامين A و C',
            'تحتوي على مضادات الأكسدة',
            'تدعم صحة الجهاز الهضمي',
            'تحسن صحة البشرة',
            'تقوي المناعة',
            'جودة مصرية مضمونة'
        ],
        season: 'صيف',
        storage: 'في درجة حرارة الغرفة حتى النضج ثم في الثلاجة',
        packaging: 'كرتون فضفاض 1.5 كجم، 2 كجم - بونيه 10 × 150 جم، 10 × 200 جم',
        shipping: 'عن طريق التحميل الجوي',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        rating: '4.7',
        stock: 'متوفر'
        ,
        descriptionEn: "Small sweet mango, easy to peel and excellent quality",
        categoryEn: "Fruits",
        originEn: "Ismailia, Egypt",
        benefitsEn: "Improves digestion, boosts immunity, beneficial for skin, rich in vitamins, supports eye health, protects from cancer, regulates blood pressure, strengthens bones",
        featuresEn: ["Small size", "Rich in vitamin A and C", "Contains antioxidants", "Supports digestive system health", "Improves skin health", "Boosts immunity", "Authentic Egyptian quality"],
        seasonEn: "Summer",
        storageEn: "At room temperature until ripe then refrigerator",
        packagingEn: "Loose carton 1.5 kg, 2 kg - Bunches 10 × 150 g, 10 × 200 g",
        shippingEn: "Via air freight",
        exportMarketsEn: "Europe, Gulf region, Middle East",
        stockEn: "Available"
    },
    'فراولة': {
        description: 'فراولة حمراء طازجة، حلوة المذاق وغنية بفيتامين سي',
        category: 'فواكه',
        image: '../images/img/fruits/STRAWBERRY.png',
        origin: 'الدلتا، مصر',
        benefits: 'غنية بفيتامين سي، تحسن صحة القلب، تعزز المناعة، تحسن صحة البشرة، تقوي العظام، تنظم السكر، تحسن الرؤية، تقلل من الالتهابات',
        features: [
            'غنية بفيتامين C',
            'تحتوي على مضادات الأكسدة',
            'منخفضة السعرات الحرارية',
            'تدعم صحة القلب',
            'تحسن صحة البشرة',
            'تعزز المناعة',
            'جودة مصرية مضمونة'
        ],
        season: 'شتاء وربيع',
        storage: 'في الثلاجة بدون غسيل',
        varieties: 'فلوريدا فورتونا - مهرجان فلوريدا - فلوريدا بيوتي - وينتر ستار - سويت سنسنس',
        sizes: 'قطر التوت: من 25 مم إلى 35/40 مم - شكل التوت: شكل مخروطي',
        packaging: 'تزرع الفراولة الطازجة وتعبئتها وفرزها / تصنيفها وفقا للمعايير الدولية لمراقبة الجودة. يتم تعبئة الفراولة الطازجة في الحقل ثم نقلها في درجة الحرارة المثلى إلى وحدات التبريد المسبق ومرافق التخزين البارد لتكون جاهزة للشحن في نفس اليوم',
        shipping: 'عن طريق الحاويات المبردة والتحميل الجوي والشاحنات وسفن الشحن العامة',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        specialNotes: 'تفاصيل التعبئة للشحنات الجوية: AKE: 225 صندوق (10 سلال × 500 جم) - الوزن الصافي 562.5 كجم / PLA: 330 صندوق (10 سلال × 500 جم) على 3 منصات خشبية - الوزن الصافي 825 كجم / PAG: 550 صندوق (10 سلال × 500 جم) على 5 منصات خشبية - الوزن الصافي 1,375 كجم / PMC: 660 صندوق (10 سلال × 500 جم) على 6 منصات خشبية - الوزن الصافي 1,650 كجم - حاوية 40 قدما: 3,600 صندوق (10 سلال × 250 جم) على 20 منصة خشبية - أبعاد الصندوق (40×60×6 سم) - الوزن الصافي 9,000 كجم، الوزن الإجمالي 10,800 كجم',
        rating: '4.8',
        stock: 'متوفر'
        ,
        descriptionEn: "Fresh red strawberry, sweet taste and rich in vitamin C",
        categoryEn: "Fruits",
        originEn: "Delta, Egypt",
        benefitsEn: "Rich in vitamin C, improves heart health, boosts immunity, improves skin health, strengthens bones, regulates blood sugar, improves vision, reduces inflammation",
        featuresEn: ["Rich in vitamin C", "Contains antioxidants", "Low in calories", "Supports heart health", "Improves skin health", "Boosts immunity", "Authentic Egyptian quality"],
        seasonEn: "Winter and Spring",
        storageEn: "In refrigerator without washing",
        varietiesEn: "Florida Fortune - Florida Festival - Florida Beauty - Winter Star - Sweet Sensation",
        sizesEn: "Berry diameter: from 25 mm to 35/40 mm - Berry shape: Conical shape",
        packagingEn: "Fresh strawberries are grown, packed, sorted/classified according to international quality control standards. Fresh strawberries are packed in the field then transported at optimal temperature to pre-cooling units and cold storage facilities to be ready for shipment on the same day",
        shippingEn: "Via refrigerated containers, air freight, trucks and general cargo ships",
        exportMarketsEn: "Europe, Gulf region, Middle East",
        stockEn: "Available"
    },
    'فلفل حار (أحمر وأخضر)': {
        description: 'فلفل حار أحمر وأخضر طازج، حاد المذاق وغني بالفيتامينات',
        category: 'خضروات',
        image: '../images/img/vegetables/HOT PEPPER (RED & GREEN).jpg',
        origin: 'الإسماعيلية، مصر',
        benefits: 'يحسن الهضم، يقوي المناعة، يسرع الأيض، يقلل الألم، غني بالفيتامينات، يحمي من السرطان، يدعم صحة القلب، يقلل الالتهابات',
        features: [
            'غني بفيتامين C',
            'يحتوي على كابسيسين',
            'يسرع عملية الأيض',
            'يحسن الهضم',
            'يقلل الألم',
            'يدعم صحة القلب',
            'جودة مصرية مضمونة'
        ],
        season: 'صيف وخريف',
        storage: 'في الثلاجة لمدة أسبوع',
        sizes: 'حسب طلب العميل',
        packaging: 'كرتون 3 كجم، 5 كجم',
        shipping: 'عن طريق التحميل الجوي أو الحاوية المبردة',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        rating: '4.6',
        stock: 'متوفر'
        ,
        descriptionEn: "Fresh red and green hot pepper, pungent taste and rich in vitamins",
        categoryEn: "Vegetables",
        originEn: "Ismailia, Egypt",
        benefitsEn: "Improves digestion, boosts immunity, speeds up metabolism, reduces pain, rich in vitamins, protects from cancer, supports heart health, reduces inflammation",
        featuresEn: ["Rich in vitamin C", "Contains capsaicin", "Boosts metabolism", "Supports heart health", "Improves digestion", "Reduces inflammation", "Authentic Egyptian quality"],
        seasonEn: "Summer and Autumn",
        storageEn: "In refrigerator for 1-2 weeks",
        sizesEn: "According to customer request",
        packagingEn: "Carton 3 kg, 5 kg",
        shippingEn: "Via air freight or refrigerated container",
        exportMarketsEn: "Europe, Gulf region, Middle East",
        stockEn: "Available"
    },
    'خس (آيس بيرج)': {
        description: 'خس آيس بيرج طازج، مقرمش ومنعش',
        category: 'خضروات',
        image: '../images/img/vegetables/LETTUCE (ICE BERG).png',
        origin: 'الإسماعيلية، مصر',
        benefits: 'يرطب الجسم، يرطب البشرة، يقلل الوزن، ينظم ضغط الدم، يدعم صحة الكلى، غني بالماء، يحسن الهضم، يزيل السموم',
        features: [
            'عالي المحتوى المائي',
            'منخفض السعرات الحرارية',
            'غني بالفيتامينات',
            'يساعد في ترطيب الجسم',
            'يدعم صحة البشرة',
            'يحسن الهضم',
            'جودة مصرية مضمونة'
        ],
        season: 'شتاء وربيع',
        storage: 'في الثلاجة لمدة أسبوع',
        sizes: 'عدد الرأس / الكرتون 8-12 رأس / صندوق - وزن الرأس / جم 500-900 جم - وطلب العميل',
        packaging: 'كرتون من 7:12 وحدة في الكرتون - تفاصيل الحاوية 40 قدما: (علبة كرتون مفتوحة 6 كجم) أو (صندوق بلاستيكي مفتوح 6 كجم) - أو حسب طلب العميل',
        shipping: 'عن طريق التحميل الجوي أو الحاوية المبردة',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        specialNotes: 'تفاصيل الحاوية 40 قدما: كرتون - 80 كرتون لكل منصة، 1,664 كرتون إجمالي على 21 منصة (20 منصة رقاقة + 1 منصة يورو) - أبعاد الكرتون (40*60*14 سم) - 5 علب لكل قاعدة، 16 علب لكل عمود - الوزن الصافي 6 كجم، الوزن الإجمالي 7 كجم - إجمالي الوزن الصافي 9,984 كجم / صندوق بلاستيكي - 90 صندوق لكل منصة، 1,860 صندوق إجمالي على 21 منصة (20 منصة رقاقة + 1 منصة يورو) - أبعاد الصندوق (40*50*14 سم) - 6 صناديق لكل قاعدة، 15 صندوق لكل عمود - الوزن الصافي 6 كجم، الوزن الإجمالي 7 كجم - إجمالي الوزن الصافي 11,160 كجم',
        rating: '4.5',
        stock: 'متوفر'
        ,
        descriptionEn: "Fresh ice berg lettuce, crispy and refreshing",
        categoryEn: "Vegetables",
        originEn: "Ismailia, Egypt",
        benefitsEn: "Low in calories, supports digestion, boosts immunity, supports heart health, rich in vitamins, helps with weight loss, improves eye health, reduces inflammation",
        featuresEn: ["Low in calories", "Rich in vitamins", "Contains dietary fiber", "Supports digestive system health", "Boosts immunity", "Supports heart health", "Authentic Egyptian quality"],
        seasonEn: "Winter and Spring",
        storageEn: "In refrigerator for 5-7 days",
        packagingEn: "Carton or plastic boxes according to customer request",
        sizesEn: "According to customer request",
        shippingEn: "Via refrigerated container, air freight",
        exportMarketsEn: "Europe, Gulf region, Middle East",
        stockEn: "Available"
    },
    'بصل أصفر': {
        description: 'بصل أصفر جاف، حاد المذاق وغني بالعناصر الغذائية',
        category: 'خضروات',
        image: '../images/img/vegetables/YELLOW ONION.jpg',
        origin: 'المنيا، مصر',
        benefits: 'يقاوم البكتيريا، يقوي المناعة، يخفض ضغط الدم، يحسن صحة القلب، يقي من السرطان، يطهر الجسم، يحسن الهضم، يقلل الالتهابات',
        features: [
            'خصائص مضادة للبكتيريا',
            'يحتوي على مركبات الكبريت',
            'يدعم صحة القلب',
            'يخفض ضغط الدم',
            'يقوي جهاز المناعة',
            'طبيعي 100%',
            'جودة مصرية مضمونة'
        ],
        season: 'متوفر على مدار العام',
        storage: 'في مكان بارد وجاف',
        sizes: 'مقاسات البصل: 40، 50، 60، 70، 80، 90، 100، 110 ملم - حسب طلب العميل',
        packaging: 'تفاصيل التعبئة للحاوية 40 قدما: (أكياس PP 5 كجم، 7 كجم، 10 كجم، 15 كجم، 25 كجم) - أو حسب طلب العميل',
        shipping: 'عن طريق الحاويات المبردة والتحميل الجوي والشاحنات وسفن الشحن العامة',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        specialNotes: 'تفاصيل الحاوية 40 قدما: 18 منصة نقالة خشبية - أكياس 10 كجم: 2,750 كيس PP - الوزن الصافي 27,500 كجم، الوزن الإجمالي 28,875 كجم / أكياس 20 كجم: 1,375 كيس PP - الوزن الصافي 27,500 كجم، الوزن الإجمالي 28,187.5 كجم / أكياس 25 كجم: 1,100 كيس PP - الوزن الصافي 27,500 كجم، الوزن الإجمالي 28,050 كجم - يمكن أن تكون سعة الحاوية 40 قدما 28,000 كجم / بصل (أكياس مكدسة بدون منصات خشبية)',
        rating: '4.7',
        stock: 'متوفر'
        ,
        descriptionEn: "Dried yellow onion, pungent taste and rich in nutrients",
        categoryEn: "Vegetables",
        originEn: "Minya, Egypt",
        benefitsEn: "Rich in vitamins, boosts immunity, improves digestion, supports heart health, regulates blood pressure, improves skin health, helps with weight loss, reduces inflammation",
        featuresEn: ["Rich in vitamins", "Contains antioxidants", "Supports digestive system health", "Boosts immunity", "Supports heart health", "Long shelf life", "Authentic Egyptian quality"],
        seasonEn: "Available year-round",
        storageEn: "In a cool and dry place",
        packagingEn: "PP bags 10 kg or 25 kg",
        sizesEn: "According to customer request",
        shippingEn: "Via refrigerated container, air freight",
        exportMarketsEn: "Europe, Gulf region, Middle East",
        stockEn: "Available"
    },
    'سكر سناب': {
        description: 'سكر سناب خضراء طازجة، مقرمشة وحلوة المذاق',
        descriptionEn: 'Fresh sugar snap peas, crispy and sweet tasting',
        category: 'خضروات',
        categoryEn: 'Vegetables',
        image: '../images/img/vegetables/SUGAR SNAP.jpg',
        origin: 'الإسماعيلية، مصر',
        originEn: 'Ismailia, Egypt',
        benefits: 'تقوي العظام، تحسن الهضم، غنية بالفيتامينات، تدعم صحة القلب، تنظم السكر، غنية بالألياف، تقلل الالتهابات، تدعم المناعة',
        benefitsEn: 'Strengthens bones, improves digestion, rich in vitamins, supports heart health, regulates blood sugar, rich in fiber, reduces inflammation, supports immunity',
        features: [
            'حلوة المذاق',
            'غنية بالفيتامينات',
            'تدعم صحة العظام',
            'تحسن الهضم',
            'تنظم سكر الدم',
            'تدعم صحة القلب',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'Sweet tasting',
            'Rich in vitamins',
            'Supports bone health',
            'Improves digestion',
            'Regulates blood sugar',
            'Supports heart health',
            'Authentic Egyptian quality'
        ],
        season: 'شتاء وربيع',
        seasonEn: 'Winter and Spring',
        storage: 'في الثلاجة لمدة 3-5 أيام',
        storageEn: 'In refrigerator for 3-5 days',
        packaging: 'كرتون فضفاض 1.5 كجم، 2 كجم - بونيه 10×150 جم، 10×200 جم',
        packagingEn: 'Loose carton 1.5 kg, 2 kg - Bunches 10×150 g, 10×200 g',
        shipping: 'عن طريق التحميل الجوي',
        shippingEn: 'Via air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        exportMarketsEn: 'Europe, Gulf region, Middle East',
        rating: '4.6',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'بصل أحمر': {
        description: 'بصل أحمر جاف، حاد المذاق وغني بالعناصر الغذائية',
        descriptionEn: 'Dried red onion, pungent taste and rich in nutrients',
        category: 'خضروات',
        categoryEn: 'Vegetables',
        image: '../images/img/vegetables/Red Onion.jpg',
        origin: 'الجيزة، مصر',
        originEn: 'Giza, Egypt',
        benefits: 'يقاوم البكتيريا، يقوي المناعة، يخفض ضغط الدم، يحسن صحة القلب، يقي من السرطان، يطهر الجسم، يحسن الهضم، يقلل الالتهابات',
        benefitsEn: 'Fights bacteria, boosts immunity, lowers blood pressure, improves heart health, prevents cancer, detoxifies body, improves digestion, reduces inflammation',
        features: [
            'خصائص مضادة للبكتيريا',
            'يحتوي على مضادات الأكسدة',
            'يدعم صحة القلب',
            'يخفض ضغط الدم',
            'يقوي جهاز المناعة',
            'طبيعي 100%',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'Antibacterial properties',
            'Contains antioxidants',
            'Supports heart health',
            'Lowers blood pressure',
            'Boosts immune system',
            '100% natural',
            'Authentic Egyptian quality'
        ],
        season: 'متوفر على مدار العام',
        seasonEn: 'Available year-round',
        storage: 'في مكان بارد وجاف',
        storageEn: 'In a cool and dry place',
        sizes: 'حسب طلب العميل أحجام البصل: 40 مم إلى 60 مم - 60 مم إلى 80 مم - 80 مم إلى 100 مم',
        sizesEn: 'According to customer request - Onion sizes: 40 mm to 60 mm - 60 mm to 80 mm - 80 mm to 100 mm',
        packaging: 'تفاصيل التعبئة للحاوية 40 قدما: (أكياس PP 10 كجم) - أو حسب طلب العميل',
        packagingEn: '40ft container details: (PP bags 10 kg) - or according to customer request',
        shipping: 'عن طريق التحميل الجوي أو الحاوية المبردة',
        shippingEn: 'Via air freight or refrigerated container',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        exportMarketsEn: 'Europe, Gulf region, Middle East',
        specialNotes: 'تفاصيل الحاوية 40 قدما: 18 منصة نقالة خشبية - أكياس 10 كجم: 2,750 كيس PP - الوزن الصافي 27,500 كجم، الوزن الإجمالي 28,875 كجم / أكياس 20 كجم: 1,375 كيس PP - الوزن الصافي 27,500 كجم، الوزن الإجمالي 28,187.5 كجم / أكياس 25 كجم: 1,100 كيس PP - الوزن الصافي 27,500 كجم، الوزن الإجمالي 28,050 كجم - يمكن أن تكون سعة الحاوية 40 قدما 28,000 كجم / بصل (أكياس مكدسة بدون منصات خشبية)',
        rating: '4.8',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'الخرشوف': {
        description: 'خرشوف أخضر طازج، صحي ولذيذ',
        descriptionEn: 'Fresh green artichoke, healthy and delicious',
        category: 'خضروات',
        categoryEn: 'Vegetables',
        image: '../images/img/vegetables/ARTICHOKES.jpg',
        origin: 'البحيرة، مصر',
        originEn: 'Beheira, Egypt',
        benefits: 'يقي من السرطان، يدعم صحة القلب، يحسن الهضم، يقوي العظام، غني بالفيتامينات، يقلل الالتهابات، يدعم صحة الكبد، يساعد في إنقاص الوزن',
        benefitsEn: 'Prevents cancer, supports heart health, improves digestion, strengthens bones, rich in vitamins, reduces inflammation, supports liver health, helps with weight loss',
        features: [
            'غني بفيتامين C و K',
            'يحتوي على مضادات الأكسدة',
            'منخفض السعرات الحرارية',
            'يدعم صحة القلب',
            'يحسن الهضم',
            'يدعم صحة الكبد',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'Rich in vitamin C and K',
            'Contains antioxidants',
            'Low in calories',
            'Supports heart health',
            'Improves digestion',
            'Supports liver health',
            'Authentic Egyptian quality'
        ],
        season: 'شتاء وربيع',
        seasonEn: 'Winter and Spring',
        storage: 'في الثلاجة لمدة 5-7 أيام',
        storageEn: 'In refrigerator for 5-7 days',
        varieties: 'بلادي (أبيض) - فرنسي (بنفسجي) - الخرشوف المجمد: (أرباع – قلوب – قيعان): بدءا من مارس ويستمر لعدة أشهر',
        varietiesEn: 'Local (white) - French (purple) - Frozen artichoke: (quarters – hearts – bottoms): starting from March and continuing for several months',
        sizes: 'الحجم 1: 6 إلى 7.5 سم القطر حوالي 180 إلى 200 جرام وزن القطعة الواحدة (30 قطعة) - الحجم 2: قطر 7.5 إلى 9 سم حوالي 225 إلى 250 جم وزن القطعة الواحدة (24 قطعة) - الحجم 3: قطر 9 إلى 11 سم حوالي 275 إلى 300 جم وزن القطعة الواحدة (20 قطعة)',
        sizesEn: 'Size 1: 6 to 7.5 cm diameter approximately 180 to 200 gram per piece (30 pieces) - Size 2: 7.5 to 9 cm diameter approximately 225 to 250 g per piece (24 pieces) - Size 3: 9 to 11 cm diameter approximately 275 to 300 g per piece (20 pieces)',
        packaging: 'تفاصيل التعبئة للحاوية 40 قدما: 20 منصة نقالة خشبية - أبعاد الصندوق البلاستيكي (30*40*22 سم) - 10 صناديق لكل قاعدة، 10 صناديق لكل عمود - 100 صندوق لكل منصة نقالة - 2,000 صندوق بلاستيكي إجمالي - 30 قطعة خرشوف لكل صندوق - 60,000 قطعة خرشوف إجمالي',
        packagingEn: '40ft container details: 20 wooden pallets - Plastic box dimensions (30*40*22 cm) - 10 boxes per base, 10 boxes per column - 100 boxes per pallet - 2,000 plastic boxes total - 30 artichokes per box - 60,000 artichokes total',
        shipping: 'عن طريق التحميل الجوي أو الحاوية المبردة',
        shippingEn: 'Via air freight or refrigerated container',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الوسط',
        exportMarketsEn: 'Europe, Gulf region, Middle East',
        rating: '4.7',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'بطيخ': {
        description: 'بطيخ أحمر طازج، حلو المذاق ومنعش',
        descriptionEn: 'Fresh red watermelon, sweet taste and refreshing',
        category: 'فواكه',
        categoryEn: 'Fruits',
        image: '../images/img/fruits/Watermelon.jpg',
        origin: 'الوادي الجديد، مصر',
        originEn: 'New Valley, Egypt',
        benefits: 'يرطب الجسم، يرطب البشرة، يقلل الوزن، ينظم ضغط الدم، يدعم صحة الكلى، غني بالماء، يحسن الهضم، يزيل السموم',
        benefitsEn: 'Hydrates body, moisturizes skin, reduces weight, regulates blood pressure, supports kidney health, rich in water, improves digestion, detoxifies',
        features: [
            'عالي المحتوى المائي',
            'منخفض السعرات الحرارية',
            'غني بالفيتامينات',
            'يساعد في ترطيب الجسم',
            'يدعم صحة الكلى',
            'يحسن الهضم',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'High water content',
            'Low in calories',
            'Rich in vitamins',
            'Helps hydrate body',
            'Supports kidney health',
            'Improves digestion',
            'Authentic Egyptian quality'
        ],
        season: 'صيف',
        seasonEn: 'Summer',
        storage: 'في درجة حرارة الغرفة أو الثلاجة',
        storageEn: 'At room temperature or refrigerator',
        varieties: 'نوع البطيخ مشترك',
        varietiesEn: 'Common watermelon type',
        sizes: 'حسب طلب العميل',
        sizesEn: 'According to customer request',
        packaging: 'يمكننا التعبئة في 10 كجم من الكرتون القياسي',
        packagingEn: 'We can pack in 10 kg standard carton',
        shipping: 'عن طريق التحميل الجوي أو الحاوية المبردة',
        shippingEn: 'Via air freight or refrigerated container',
        exportMarkets: 'أوروبا، منطقة الخليج، شرق الشرق الأوسط',
        exportMarketsEn: 'Europe, Gulf region, Middle East',
        specialNotes: 'تفاصيل الحاوية 40 قدما HC: يمكن أن تحتوي على 22 طنا - 20 لوحة في الحاوية - 55 كرتون في البليت - تحتوي كل حاوية على 1,100 كرتون',
        rating: '4.8',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'لوز': {
        description: 'لوز مصري عالي الجودة، غني بالبروتين والعناصر الغذائية',
        descriptionEn: 'High quality Egyptian almonds, rich in protein and nutrients',
        category: 'مكسرات',
        categoryEn: 'Nuts',
        image: '../images/img/nuts/almonds.jpg',
        origin: 'الفيوم، مصر',
        originEn: 'Fayoum, Egypt',
        benefits: 'يقوي القلب، يحسن الذاكرة، غني بالبروتين، يدعم صحة العظام، يقلل الكوليسترول، يحسن صحة البشرة، ينظم السكر، غني بمضادات الأكسدة',
        benefitsEn: 'Strengthens heart, improves memory, rich in protein, supports bone health, reduces cholesterol, improves skin health, regulates blood sugar, rich in antioxidants',
        features: [
            'غني بالبروتين والألياف',
            'مصدر ممتاز لفيتامين E',
            'يحتوي على دهون صحية',
            'يدعم صحة القلب',
            'يحسن الذاكرة والتركيز',
            'طبيعي 100%',
            'مناسب للتصدير',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'Rich in protein and fiber',
            'Excellent source of vitamin E',
            'Contains healthy fats',
            'Supports heart health',
            'Improves memory and concentration',
            '100% natural',
            'Export quality',
            'Authentic Egyptian quality'
        ],
        season: 'متوفر على مدار العام',
        seasonEn: 'Available year-round',
        storage: 'في مكان بارد وجاف',
        storageEn: 'In a cool and dry place',
        varieties: 'لوز حلو - لوز مر (للاستخدامات الصناعية)',
        varietiesEn: 'Sweet almonds - Bitter almonds (for industrial use)',
        sizes: 'حسب طلب العميل - أحجام: 18/20، 20/22، 22/24، 23/25، 25/27 مم',
        sizesEn: 'According to customer request - Sizes: 18/20, 20/22, 22/24, 23/25, 25/27 mm',
        packaging: 'أكياس PP 10 كجم، 12.5 كجم، 25 كجم - صناديق كرتون 10 كجم - أو حسب طلب العميل',
        packagingEn: 'PP bags 10 kg, 12.5 kg, 25 kg - Carton boxes 10 kg - or according to customer request',
        shipping: 'عن طريق الحاويات والشحن البحري والجوي',
        shippingEn: 'Via containers, sea and air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، آسيا، أمريكا',
        exportMarketsEn: 'Europe, Gulf region, Asia, America',
        specialNotes: 'تفاصيل الحاوية 40 قدما: 20 منصة نقالة - 1,100 كيس (25 كجم) - الوزن الصافي 27,500 كجم',
        rating: '4.9',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'فول سوداني': {
        description: 'فول سوداني مصري طازج، غني بالبروتين ومثالي للتصدير',
        descriptionEn: 'Fresh Egyptian peanuts, rich in protein and ideal for export',
        category: 'مكسرات',
        categoryEn: 'Nuts',
        image: '../images/img/nuts/Peanuts.jpg',
        origin: 'الإسماعيلية، مصر',
        originEn: 'Ismailia, Egypt',
        benefits: 'يزود الطاقة، يقوي العضلات، غني بالبروتين، يدعم صحة القلب، يحسن الذاكرة، يقلل الكوليسترول، غني بمضادات الأكسدة، يدعم صحة الجلد',
        benefitsEn: 'Provides energy, strengthens muscles, rich in protein, supports heart health, improves memory, reduces cholesterol, rich in antioxidants, supports skin health',
        features: [
            'مصدر غني بالبروتين',
            'يحتوي على دهون صحية',
            'غني بالفيتامينات والمعادن',
            'يدعم بناء العضلات',
            'يزود الجسم بالطاقة',
            'طبيعي 100%',
            'مناسب للتصدير',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'Rich source of protein',
            'Contains healthy fats',
            'Rich in vitamins and minerals',
            'Supports muscle building',
            'Provides body energy',
            '100% natural',
            'Export quality',
            'Authentic Egyptian quality'
        ],
        season: 'صيف وخريف',
        seasonEn: 'Summer and Autumn',
        storage: 'في مكان بارد وجاف',
        storageEn: 'In a cool and dry place',
        varieties: 'فول سوداني بالقشرة - فول سوداني مقشر - فول سوداني محمص',
        varietiesEn: 'In-shell peanuts - Shelled peanuts - Roasted peanuts',
        sizes: 'أحجام الحبوب: 7/9، 9/11، 11/13، 13/15 حبة/أونصة',
        sizesEn: 'Kernel sizes: 7/9, 9/11, 11/13, 13/15 count/ounce',
        packaging: 'أكياس PP 25 كجم، 50 كجم - أكياس فراغ 10 كجم - أو حسب طلب العميل',
        packagingEn: 'PP bags 25 kg, 50 kg - Vacuum bags 10 kg - or according to customer request',
        shipping: 'عن طريق الحاويات والشحن البحري والجوي',
        shippingEn: 'Via containers, sea and air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، آسيا، أفريقيا',
        exportMarketsEn: 'Europe, Gulf region, Asia, Africa',
        specialNotes: 'تفاصيل الحاوية 40 قدما: 20 منصة نقالة - 880 كيس (25 كجم) - الوزن الصافي 22,000 كجم',
        rating: '4.7',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'بندق': {
        description: 'بندق مصري فاخر، غني بالعناصر الغذائية ومثالي للتصدير',
        descriptionEn: 'Premium Egyptian hazelnuts, rich in nutrients and ideal for export',
        category: 'مكسرات',
        categoryEn: 'Nuts',
        image: '../images/img/nuts/Hazelnuts.jpg',
        origin: 'الإسكندرية، مصر',
        originEn: 'Alexandria, Egypt',
        benefits: 'يقوي القلب، يحسن الذاكرة، غني بمضادات الأكسدة، يدعم صحة العظام، يقلل الالتهابات، يحسن صحة البشرة، ينظم الكوليسترول، يزود الطاقة',
        benefitsEn: 'Strengthens heart, improves memory, rich in antioxidants, supports bone health, reduces inflammation, improves skin health, regulates cholesterol, provides energy',
        features: [
            'غني بفيتامين E',
            'يحتوي على دهون صحية',
            'مصدر جيد للألياف',
            'يدعم صحة القلب',
            'يحسن وظائف الدماغ',
            'طبيعي 100%',
            'مناسب للتصدير',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'Rich in vitamin E',
            'Contains healthy fats',
            'Good source of fiber',
            'Supports heart health',
            'Improves brain function',
            '100% natural',
            'Export quality',
            'Authentic Egyptian quality'
        ],
        season: 'خريف',
        seasonEn: 'Autumn',
        storage: 'في مكان بارد وجاف',
        storageEn: 'In a cool and dry place',
        varieties: 'بندق بالقشرة - بندق مقشر - بندق محمص',
        varietiesEn: 'In-shell hazelnuts - Shelled hazelnuts - Roasted hazelnuts',
        sizes: 'أحجام: 11-13 مم، 13-15 مم، 15+ مم',
        sizesEn: 'Sizes: 11-13 mm, 13-15 mm, 15+ mm',
        packaging: 'أكياس PP 10 كجم، 25 كجم - صناديق كرتون 5 كجم - أو حسب طلب العميل',
        packagingEn: 'PP bags 10 kg, 25 kg - Carton boxes 5 kg - or according to customer request',
        shipping: 'عن طريق الحاويات والشحن البحري والجوي',
        shippingEn: 'Via containers, sea and air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، آسيا',
        exportMarketsEn: 'Europe, Gulf region, Asia',
        specialNotes: 'تفاصيل الحاوية 40 قدما: 20 منصة نقالة - 1,100 كيس (25 كجم) - الوزن الصافي 27,500 كجم',
        rating: '4.8',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'كاجو': {
        description: 'كاجو مصري فاخر، غني بالبروتين والمعادن',
        descriptionEn: 'Premium Egyptian cashews, rich in protein and minerals',
        category: 'مكسرات',
        categoryEn: 'Nuts',
        image: '../images/img/nuts/Cashews.jpg',
        origin: 'القاهرة، مصر',
        originEn: 'Cairo, Egypt',
        benefits: 'يقوي القلب، يدعم صحة العظام، غني بالمعادن، يحسن الذاكرة، يزود الطاقة، يدعم المناعة، يحسن صحة البشرة، ينظم ضغط الدم',
        benefitsEn: 'Strengthens heart, supports bone health, rich in minerals, improves memory, provides energy, supports immunity, improves skin health, regulates blood pressure',
        features: [
            'غني بالبروتين والمعادن',
            'يحتوي على دهون صحية',
            'مصدر جيد للنحاس والمغنيسيوم',
            'يدعم صحة القلب',
            'يحسن صحة العظام',
            'طبيعي 100%',
            'مناسب للتصدير',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'Rich in protein and minerals',
            'Contains healthy fats',
            'Good source of copper and magnesium',
            'Supports heart health',
            'Improves bone health',
            '100% natural',
            'Export quality',
            'Authentic Egyptian quality'
        ],
        season: 'متوفر على مدار العام',
        seasonEn: 'Available year-round',
        storage: 'في مكان بارد وجاف',
        storageEn: 'In a cool and dry place',
        varieties: 'كاجو خام - كاجو محمص - كاجو مملح',
        varietiesEn: 'Raw cashews - Roasted cashews - Salted cashews',
        sizes: 'أحجام: W180، W210، W240، W320، W450',
        sizesEn: 'Sizes: W180, W210, W240, W320, W450',
        packaging: 'أكياس فراغ 10 كجم - صناديق كرتون 12.5 كجم - أو حسب طلب العميل',
        packagingEn: 'Vacuum bags 10 kg - Carton boxes 12.5 kg - or according to customer request',
        shipping: 'عن طريق الحاويات والشحن البحري والجوي',
        shippingEn: 'Via containers, sea and air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، آسيا، أمريكا',
        exportMarketsEn: 'Europe, Gulf region, Asia, America',
        specialNotes: 'تفاصيل الحاوية 40 قدما: 20 منصة نقالة - 2,000 كيس (12.5 كجم) - الوزن الصافي 25,000 كجم',
        rating: '4.9',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'فستق': {
        description: 'فستق مصري عالي الجودة، غني بالبروتين والعناصر الغذائية',
        descriptionEn: 'High quality Egyptian pistachios, rich in protein and nutrients',
        category: 'مكسرات',
        categoryEn: 'Nuts',
        image: '../images/img/nuts/Pistachios.jpg',
        origin: 'سيناء، مصر',
        originEn: 'Sinai, Egypt',
        benefits: 'يقوي القلب، يحسن الهضم، غني بمضادات الأكسدة، يدعم صحة العين، ينظم السكر، يقلل الكوليسترول، يحسن صحة البشرة، يزود الطاقة',
        benefitsEn: 'Strengthens heart, improves digestion, rich in antioxidants, supports eye health, regulates blood sugar, reduces cholesterol, improves skin health, provides energy',
        features: [
            'غني بالبروتين والألياف',
            'مصدر ممتاز لمضادات الأكسدة',
            'يحتوي على دهون صحية',
            'يدعم صحة القلب',
            'يحسن صحة العين',
            'طبيعي 100%',
            'مناسب للتصدير',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'Rich in protein and fiber',
            'Excellent source of antioxidants',
            'Contains healthy fats',
            'Supports heart health',
            'Improves eye health',
            '100% natural',
            'Export quality',
            'Authentic Egyptian quality'
        ],
        season: 'خريف',
        seasonEn: 'Autumn',
        storage: 'في مكان بارد وجاف',
        storageEn: 'In a cool and dry place',
        varieties: 'فستق بالقشرة - فستق مقشر - فستق محمص',
        varietiesEn: 'In-shell pistachios - Shelled pistachios - Roasted pistachios',
        sizes: 'أحجام: 18-20، 20-22، 22-24، 24-26 حبة/أونصة',
        sizesEn: 'Sizes: 18-20, 20-22, 22-24, 24-26 count/ounce',
        packaging: 'أكياس PP 10 كجم، 25 كجم - صناديق كرتون 5 كجم - أو حسب طلب العميل',
        packagingEn: 'PP bags 10 kg, 25 kg - Carton boxes 5 kg - or according to customer request',
        shipping: 'عن طريق الحاويات والشحن البحري والجوي',
        shippingEn: 'Via containers, sea and air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، آسيا، أمريكا',
        exportMarketsEn: 'Europe, Gulf region, Asia, America',
        specialNotes: 'تفاصيل الحاوية 40 قدما: 20 منصة نقالة - 1,100 كيس (25 كجم) - الوزن الصافي 27,500 كجم',
        rating: '4.8',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'جوز': {
        description: 'جوز مصري طبيعي، غني بأوميغا 3 والعناصر الغذائية',
        descriptionEn: 'Natural Egyptian walnuts, rich in omega-3 and nutrients',
        category: 'مكسرات',
        categoryEn: 'Nuts',
        image: '../images/img/nuts/Walnuts.jpg',
        origin: 'الجيزة، مصر',
        originEn: 'Giza, Egypt',
        benefits: 'يقوي القلب، يحسن الذاكرة، غني بأوميغا 3، يدعم صحة الدماغ، يقلل الكوليسترول، يحسن صحة البشرة، ينظم السكر، غني بمضادات الأكسدة',
        benefitsEn: 'Strengthens heart, improves memory, rich in omega-3, supports brain health, reduces cholesterol, improves skin health, regulates blood sugar, rich in antioxidants',
        features: [
            'مصدر ممتاز لأوميغا 3',
            'غني بمضادات الأكسدة',
            'يحتوي على دهون صحية',
            'يدعم صحة الدماغ',
            'يحسن الذاكرة والتركيز',
            'طبيعي 100%',
            'مناسب للتصدير',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'Excellent source of omega-3',
            'Rich in antioxidants',
            'Contains healthy fats',
            'Supports brain health',
            'Improves memory and concentration',
            '100% natural',
            'Export quality',
            'Authentic Egyptian quality'
        ],
        season: 'خريف وشتاء',
        seasonEn: 'Autumn and Winter',
        storage: 'في مكان بارد وجاف',
        storageEn: 'In a cool and dry place',
        varieties: 'جوز بالقشرة - جوز مقشر - أنصاف جوز',
        varietiesEn: 'In-shell walnuts - Shelled walnuts - Walnut halves',
        sizes: 'أحجام: صغير، متوسط، كبير - حسب طلب العميل',
        sizesEn: 'Sizes: Small, Medium, Large - according to customer request',
        packaging: 'أكياس PP 10 كجم، 25 كجم - صناديق كرتون 5 كجم - أو حسب طلب العميل',
        packagingEn: 'PP bags 10 kg, 25 kg - Carton boxes 5 kg - or according to customer request',
        shipping: 'عن طريق الحاويات والشحن البحري والجوي',
        shippingEn: 'Via containers, sea and air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، آسيا، أمريكا',
        exportMarketsEn: 'Europe, Gulf region, Asia, America',
        specialNotes: 'تفاصيل الحاوية 40 قدما: 20 منصة نقالة - 1,100 كيس (25 كجم) - الوزن الصافي 27,500 كجم',
        rating: '4.8',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'عين الجمل': {
        description: 'عين الجمل المصري الفاخر، غني بالبروتين والألياف',
        descriptionEn: 'Premium Egyptian pecans, rich in protein and fiber',
        category: 'مكسرات',
        categoryEn: 'Nuts',
        image: '../images/img/nuts/Pecans.jpg',
        origin: 'المنيا، مصر',
        originEn: 'Minya, Egypt',
        benefits: 'يقوي القلب، يحسن الهضم، غني بالبروتين، يدعم صحة العظام، يقلل الكوليسترول، يحسن صحة البشرة، ينظم السكر، يزود الطاقة',
        benefitsEn: 'Strengthens heart, improves digestion, rich in protein, supports bone health, reduces cholesterol, improves skin health, regulates blood sugar, provides energy',
        features: [
            'غني بالبروتين والألياف',
            'مصدر جيد للمعادن',
            'يحتوي على دهون صحية',
            'يدعم صحة القلب',
            'يحسن الهضم',
            'طبيعي 100%',
            'مناسب للتصدير',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'Rich in protein and fiber',
            'Good source of minerals',
            'Contains healthy fats',
            'Supports heart health',
            'Improves digestion',
            '100% natural',
            'Export quality',
            'Authentic Egyptian quality'
        ],
        season: 'خريف',
        seasonEn: 'Autumn',
        storage: 'في مكان بارد وجاف',
        storageEn: 'In a cool and dry place',
        varieties: 'عين الجمل بالقشرة - عين الجمل مقشر - أنصاف',
        varietiesEn: 'In-shell pecans - Shelled pecans - Halves',
        sizes: 'أحجام: متوسط، كبير، جامبو',
        sizesEn: 'Sizes: Medium, Large, Jumbo',
        packaging: 'أكياس PP 10 كجم، 25 كجم - صناديق كرتون 5 كجم - أو حسب طلب العميل',
        packagingEn: 'PP bags 10 kg, 25 kg - Carton boxes 5 kg - or according to customer request',
        shipping: 'عن طريق الحاويات والشحن البحري والجوي',
        shippingEn: 'Via containers, sea and air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، آسيا',
        exportMarketsEn: 'Europe, Gulf region, Asia',
        specialNotes: 'تفاصيل الحاوية 40 قدما: 20 منصة نقالة - 1,100 كيس (25 كجم) - الوزن الصافي 27,500 كجم',
        rating: '4.7',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'بذور عباد الشمس': {
        description: 'بذور عباد الشمس المصرية، غنية بفيتامين E والمعادن',
        descriptionEn: 'Egyptian sunflower seeds, rich in vitamin E and minerals',
        category: 'مكسرات',
        categoryEn: 'Nuts',
        image: '../images/img/nuts/Sunflower-Seeds.jpg',
        origin: 'الفيوم، مصر',
        originEn: 'Fayoum, Egypt',
        benefits: 'تقوي المناعة، غنية بفيتامين E، تدعم صحة القلب، تحسن صحة البشرة، تقلل الالتهابات، تزود الطاقة، تدعم صحة العظام، غنية بمضادات الأكسدة',
        benefitsEn: 'Boosts immunity, rich in vitamin E, supports heart health, improves skin health, reduces inflammation, provides energy, supports bone health, rich in antioxidants',
        features: [
            'مصدر ممتاز لفيتامين E',
            'غنية بالمعادن',
            'تحتوي على دهون صحية',
            'تدعم صحة القلب',
            'تحسن صحة البشرة',
            'طبيعية 100%',
            'مناسبة للتصدير',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'Excellent source of vitamin E',
            'Rich in minerals',
            'Contains healthy fats',
            'Supports heart health',
            'Improves skin health',
            '100% natural',
            'Export quality',
            'Authentic Egyptian quality'
        ],
        season: 'صيف وخريف',
        seasonEn: 'Summer and Autumn',
        storage: 'في مكان بارد وجاف',
        storageEn: 'In a cool and dry place',
        varieties: 'بذور بالقشرة - بذور مقشرة - بذور محمصة',
        varietiesEn: 'In-shell seeds - Shelled seeds - Roasted seeds',
        sizes: 'أحجام: صغير، متوسط، كبير',
        sizesEn: 'Sizes: Small, Medium, Large',
        packaging: 'أكياس PP 15 كجم، 25 كجم - أكياس فراغ 10 كجم - أو حسب طلب العميل',
        packagingEn: 'PP bags 15 kg, 25 kg - Vacuum bags 10 kg - or according to customer request',
        shipping: 'عن طريق الحاويات والشحن البحري والجوي',
        shippingEn: 'Via containers, sea and air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، آسيا، أفريقيا',
        exportMarketsEn: 'Europe, Gulf region, Asia, Africa',
        specialNotes: 'تفاصيل الحاوية 40 قدما: 20 منصة نقالة - 1,100 كيس (25 كجم) - الوزن الصافي 27,500 كجم',
        rating: '4.6',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'بذور اليقطين': {
        description: 'بذور اليقطين المصرية، غنية بالزنك والمغنيسيوم',
        descriptionEn: 'Egyptian pumpkin seeds, rich in zinc and magnesium',
        category: 'مكسرات',
        categoryEn: 'Nuts',
        image: '../images/img/nuts/Pumpkin-Seeds.jpg',
        origin: 'الدقهلية، مصر',
        originEn: 'Dakahlia, Egypt',
        benefits: 'تقوي المناعة، غنية بالزنك، تدعم صحة البروستاتا، تحسن النوم، تقلل الالتهابات، تزود الطاقة، تدعم صحة القلب، غنية بمضادات الأكسدة',
        benefitsEn: 'Boosts immunity, rich in zinc, supports prostate health, improves sleep, reduces inflammation, provides energy, supports heart health, rich in antioxidants',
        features: [
            'مصدر ممتاز للزنك',
            'غنية بالمغنيسيوم',
            'تحتوي على دهون صحية',
            'تدعم صحة البروستاتا',
            'تحسن جودة النوم',
            'طبيعية 100%',
            'مناسبة للتصدير',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'Excellent source of zinc',
            'Rich in magnesium',
            'Contains healthy fats',
            'Supports prostate health',
            'Improves sleep quality',
            '100% natural',
            'Export quality',
            'Authentic Egyptian quality'
        ],
        season: 'خريف',
        seasonEn: 'Autumn',
        storage: 'في مكان بارد وجاف',
        storageEn: 'In a cool and dry place',
        varieties: 'بذور بالقشرة - بذور مقشرة - بذور محمصة',
        varietiesEn: 'In-shell seeds - Shelled seeds - Roasted seeds',
        sizes: 'أحجام: GWS، AA، A، B',
        sizesEn: 'Sizes: GWS, AA, A, B',
        packaging: 'أكياس PP 15 كجم، 25 كجم - أكياس فراغ 10 كجم - أو حسب طلب العميل',
        packagingEn: 'PP bags 15 kg, 25 kg - Vacuum bags 10 kg - or according to customer request',
        shipping: 'عن طريق الحاويات والشحن البحري والجوي',
        shippingEn: 'Via containers, sea and air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، آسيا، أمريكا',
        exportMarketsEn: 'Europe, Gulf region, Asia, America',
        specialNotes: 'تفاصيل الحاوية 40 قدما: 20 منصة نقالة - 1,100 كيس (25 كجم) - الوزن الصافي 27,500 كجم',
        rating: '4.7',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'سمسم': {
        description: 'سمسم مصري طبيعي، غني بالكالسيوم والبروتين',
        descriptionEn: 'Natural Egyptian sesame, rich in calcium and protein',
        category: 'مكسرات',
        categoryEn: 'Nuts',
        image: '../images/img/nuts/Sesame.jpg',
        origin: 'سوهاج، مصر',
        originEn: 'Sohag, Egypt',
        benefits: 'يقوي العظام، غني بالكالسيوم، يدعم صحة القلب، يحسن الهضم، يقلل الكوليسترول، يحسن صحة البشرة، ينظم ضغط الدم، غني بمضادات الأكسدة',
        benefitsEn: 'Strengthens bones, rich in calcium, supports heart health, improves digestion, reduces cholesterol, improves skin health, regulates blood pressure, rich in antioxidants',
        features: [
            'مصدر ممتاز للكالسيوم',
            'غني بالبروتين',
            'يحتوي على دهون صحية',
            'يدعم صحة العظام',
            'يحسن الهضم',
            'طبيعي 100%',
            'مناسب للتصدير',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'Excellent source of calcium',
            'Rich in protein',
            'Contains healthy fats',
            'Supports bone health',
            'Improves digestion',
            '100% natural',
            'Export quality',
            'Authentic Egyptian quality'
        ],
        season: 'صيف وخريف',
        seasonEn: 'Summer and Autumn',
        storage: 'في مكان بارد وجاف',
        storageEn: 'In a cool and dry place',
        varieties: 'سمسم أبيض - سمسم أسود - سمسم ذهبي',
        varietiesEn: 'White sesame - Black sesame - Golden sesame',
        sizes: 'حسب طلب العميل - نسبة النقاء: 99%+',
        sizesEn: 'According to customer request - Purity: 99%+',
        packaging: 'أكياس PP 25 كجم، 50 كجم - أكياس جامبو 1000 كجم - أو حسب طلب العميل',
        packagingEn: 'PP bags 25 kg, 50 kg - Jumbo bags 1000 kg - or according to customer request',
        shipping: 'عن طريق الحاويات والشحن البحري والجوي',
        shippingEn: 'Via containers, sea and air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، آسيا، أفريقيا، أمريكا',
        exportMarketsEn: 'Europe, Gulf region, Asia, Africa, America',
        specialNotes: 'تفاصيل الحاوية 40 قدما: 20 منصة نقالة - 1,100 كيس (25 كجم) - الوزن الصافي 27,500 كجم - السمسم المصري معروف عالمياً بجودته العالية',
        rating: '4.9',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'الصنوبر': {
        description: 'صنوبر مصري فاخر، غني بالبروتين والفيتامينات',
        descriptionEn: 'Premium Egyptian pine nuts, rich in protein and vitamins',
        category: 'مكسرات',
        categoryEn: 'Nuts',
        image: '../images/img/nuts/Pine-Nuts.jpg',
        origin: 'سيناء، مصر',
        originEn: 'Sinai, Egypt',
        benefits: 'يقوي القلب، يزود الطاقة، غني بالبروتين، يدعم صحة العظام، يقلل الكوليسترول، يحسن صحة البشرة، يعزز المناعة، غني بمضادات الأكسدة',
        benefitsEn: 'Strengthens heart, provides energy, rich in protein, supports bone health, reduces cholesterol, improves skin health, boosts immunity, rich in antioxidants',
        features: [
            'من أفخر أنواع المكسرات',
            'غني بالبروتين والفيتامينات',
            'يحتوي على دهون صحية',
            'يستخدم في الطبخ العربي والعالمي',
            'يدعم صحة القلب',
            'طبيعي 100%',
            'مناسب للتصدير',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'One of the finest nuts',
            'Rich in protein and vitamins',
            'Contains healthy fats',
            'Used in Arabic and international cuisine',
            'Supports heart health',
            '100% natural',
            'Export quality',
            'Authentic Egyptian quality'
        ],
        season: 'خريف وشتاء',
        seasonEn: 'Autumn and Winter',
        storage: 'في مكان بارد وجاف أو الثلاجة',
        storageEn: 'In a cool and dry place or refrigerator',
        varieties: 'صنوبر حلبي - صنوبر بري',
        varietiesEn: 'Aleppo pine nuts - Wild pine nuts',
        sizes: 'حسب طلب العميل - درجة أولى',
        sizesEn: 'According to customer request - First grade',
        packaging: 'أكياس فراغ 500 جم، 1 كجم، 5 كجم - صناديق كرتون 10 كجم - أو حسب طلب العميل',
        packagingEn: 'Vacuum bags 500 g, 1 kg, 5 kg - Carton boxes 10 kg - or according to customer request',
        shipping: 'عن طريق الحاويات والشحن البحري والجوي',
        shippingEn: 'Via containers, sea and air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، آسيا، أمريكا',
        exportMarketsEn: 'Europe, Gulf region, Asia, America',
        specialNotes: 'الصنوبر المصري معروف بجودته العالية وطعمه المميز - يستخدم في المنسف والكبة والحلويات',
        rating: '4.9',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'بذور الكتان': {
        description: 'بذور الكتان المصرية، غنية بأوميغا 3 والألياف',
        descriptionEn: 'Egyptian flax seeds, rich in omega-3 and fiber',
        category: 'مكسرات',
        categoryEn: 'Nuts',
        image: '../images/img/nuts/Flax Seeds.jpg',
        origin: 'الفيوم، مصر',
        originEn: 'Fayoum, Egypt',
        benefits: 'تقوي القلب، غنية بأوميغا 3، تحسن الهضم، تدعم صحة البشرة، تقلل الكوليسترول، تنظم السكر، تدعم صحة الدماغ، غنية بالألياف',
        benefitsEn: 'Strengthens heart, rich in omega-3, improves digestion, supports skin health, reduces cholesterol, regulates blood sugar, supports brain health, rich in fiber',
        features: [
            'مصدر نباتي ممتاز لأوميغا 3',
            'غنية بالألياف الغذائية',
            'تحتوي على قشور نباتية',
            'تدعم صحة القلب',
            'تحسن الهضم',
            'طبيعية 100%',
            'مناسبة للتصدير',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'Excellent plant source of omega-3',
            'Rich in dietary fiber',
            'Contains plant lignans',
            'Supports heart health',
            'Improves digestion',
            '100% natural',
            'Export quality',
            'Authentic Egyptian quality'
        ],
        season: 'صيف وخريف',
        seasonEn: 'Summer and Autumn',
        storage: 'في مكان بارد وجاف أو الثلاجة',
        storageEn: 'In a cool and dry place or refrigerator',
        varieties: 'بذور كتان بنية - بذور كتان ذهبية',
        varietiesEn: 'Brown flax seeds - Golden flax seeds',
        sizes: 'حسب طلب العميل - نسبة النقاء: 99%+',
        sizesEn: 'According to customer request - Purity: 99%+',
        packaging: 'أكياس PP 15 كجم، 25 كجم - أكياس فراغ 5 كجم - أو حسب طلب العميل',
        packagingEn: 'PP bags 15 kg, 25 kg - Vacuum bags 5 kg - or according to customer request',
        shipping: 'عن طريق الحاويات والشحن البحري والجوي',
        shippingEn: 'Via containers, sea and air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، آسيا، أمريكا، أفريقيا',
        exportMarketsEn: 'Europe, Gulf region, Asia, America, Africa',
        specialNotes: 'تفاصيل الحاوية 40 قدما: 20 منصة نقالة - 1,100 كيس (25 كجم) - الوزن الصافي 27,500 كجم - بذور الكتان المصرية ذات جودة عالية',
        rating: '4.8',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'بذور الشيا': {
        description: 'بذور الشيا الفاخرة، سوبرفود غني بالعناصر الغذائية',
        descriptionEn: 'Premium chia seeds, superfood rich in nutrients',
        category: 'مكسرات',
        categoryEn: 'Nuts',
        image: '../images/img/nuts/Chia Seeds.jpg',
        origin: 'مستورد ومعبأ في مصر',
        originEn: 'Imported and packed in Egypt',
        benefits: 'تزود الطاقة، غنية بأوميغا 3، تحسن الهضم، تدعم صحة العظام، تقلل الوزن، تنظم السكر، تدعم صحة القلب، غنية بمضادات الأكسدة',
        benefitsEn: 'Provides energy, rich in omega-3, improves digestion, supports bone health, helps weight loss, regulates blood sugar, supports heart health, rich in antioxidants',
        features: [
            'سوبرفود عصري',
            'غنية بأوميغا 3 والبروتين',
            'تحتوي على ألياف عالية',
            'تمتص الماء بكفاءة',
            'تدعم صحة القلب',
            'طبيعية 100%',
            'مناسبة للتصدير',
            'جودة عالمية مضمونة'
        ],
        featuresEn: [
            'Modern superfood',
            'Rich in omega-3 and protein',
            'Contains high fiber',
            'Absorbs water efficiently',
            'Supports heart health',
            '100% natural',
            'Export quality',
            'Guaranteed international quality'
        ],
        season: 'متوفر على مدار العام',
        seasonEn: 'Available year-round',
        storage: 'في مكان بارد وجاف',
        storageEn: 'In a cool and dry place',
        varieties: 'بذور شيا سوداء - بذور شيا بيضاء',
        varietiesEn: 'Black chia seeds - White chia seeds',
        sizes: 'حسب طلب العميل - نسبة النقاء: 99.9%',
        sizesEn: 'According to customer request - Purity: 99.9%',
        packaging: 'أكياس فراغ 500 جم، 1 كجم، 5 كجم - أكياس PP 15 كجم، 25 كجم - أو حسب طلب العميل',
        packagingEn: 'Vacuum bags 500 g, 1 kg, 5 kg - PP bags 15 kg, 25 kg - or according to customer request',
        shipping: 'عن طريق الحاويات والشحن البحري والجوي',
        shippingEn: 'Via containers, sea and air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، آسيا، أمريكا، أفريقيا',
        exportMarketsEn: 'Europe, Gulf region, Asia, America, Africa',
        specialNotes: 'منتج عالي الجودة مستورد من أمريكا الجنوبية ومعبأ في مصر وفق أعلى معايير الجودة - طلب متزايد في السوق الصحي',
        rating: '4.9',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'مكاديميا': {
        description: 'مكاديميا فاخرة، من أفخر وأغلى المكسرات في العالم',
        descriptionEn: 'Premium macadamia nuts, one of the finest and most expensive nuts in the world',
        category: 'مكسرات',
        categoryEn: 'Nuts',
        image: '../images/img/nuts/Macadamia.jpg',
        origin: 'مستورد ومعبأ في مصر',
        originEn: 'Imported and packed in Egypt',
        benefits: 'تقوي القلب، تحسن الذاكرة، غنية بالدهون الصحية، تدعم صحة الدماغ، تقلل الكوليسترول، تحسن صحة البشرة، تزود الطاقة، غنية بمضادات الأكسدة',
        benefitsEn: 'Strengthens heart, improves memory, rich in healthy fats, supports brain health, reduces cholesterol, improves skin health, provides energy, rich in antioxidants',
        features: [
            'من أفخر المكسرات في العالم',
            'غنية بالدهون الأحادية الصحية',
            'طعم كريمي مميز',
            'يدعم صحة القلب',
            'يحسن صحة البشرة',
            'طبيعية 100%',
            'مناسبة للتصدير الفاخر',
            'جودة عالمية مضمونة'
        ],
        featuresEn: [
            'One of the finest nuts in the world',
            'Rich in healthy monounsaturated fats',
            'Distinctive creamy taste',
            'Supports heart health',
            'Improves skin health',
            '100% natural',
            'Premium export quality',
            'Guaranteed international quality'
        ],
        season: 'متوفر على مدار العام',
        seasonEn: 'Available year-round',
        storage: 'في مكان بارد وجاف أو الثلاجة',
        storageEn: 'In a cool and dry place or refrigerator',
        varieties: 'مكاديميا خام - مكاديميا محمصة - مكاديميا مملحة',
        varietiesEn: 'Raw macadamia - Roasted macadamia - Salted macadamia',
        sizes: 'أحجام: Style 0، Style 1، Style 2، Style 3',
        sizesEn: 'Sizes: Style 0, Style 1, Style 2, Style 3',
        packaging: 'أكياس فراغ 500 جم، 1 كجم - صناديق فاخرة 5 كجم - أو حسب طلب العميل',
        packagingEn: 'Vacuum bags 500 g, 1 kg - Premium boxes 5 kg - or according to customer request',
        shipping: 'عن طريق الشحن الجوي والبحري المبرد',
        shippingEn: 'Via air freight and refrigerated sea freight',
        exportMarkets: 'أوروبا، منطقة الخليج، آسيا، أمريكا',
        exportMarketsEn: 'Europe, Gulf region, Asia, America',
        specialNotes: 'منتج فاخر مستورد من أستراليا ومعبأ في مصر - سوق راقي وهامش ربح ممتاز - طلب عالي في الأسواق الآسيوية والخليجية',
        rating: '5.0',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'جوز البرازيل': {
        description: 'جوز البرازيل الفاخر، غني بالسيلينيوم والعناصر الغذائية',
        descriptionEn: 'Premium Brazil nuts, rich in selenium and nutrients',
        category: 'مكسرات',
        categoryEn: 'Nuts',
        image: '../images/img/nuts/brazil nuts.jpg',
        origin: 'مستورد ومعبأ في مصر',
        originEn: 'Imported and packed in Egypt',
        benefits: 'يقوي المناعة، غني بالسيلينيوم، يدعم صحة الغدة الدرقية، يحسن صحة القلب، يقلل الالتهابات، يحسن صحة البشرة، يزود الطاقة، غني بمضادات الأكسدة',
        benefitsEn: 'Boosts immunity, rich in selenium, supports thyroid health, improves heart health, reduces inflammation, improves skin health, provides energy, rich in antioxidants',
        features: [
            'مصدر ممتاز للسيلينيوم',
            'غني بالبروتين والمعادن',
            'يحتوي على دهون صحية',
            'يدعم صحة الغدة الدرقية',
            'يحسن المناعة',
            'طبيعي 100%',
            'مناسب للتصدير',
            'جودة عالمية مضمونة'
        ],
        featuresEn: [
            'Excellent source of selenium',
            'Rich in protein and minerals',
            'Contains healthy fats',
            'Supports thyroid health',
            'Boosts immunity',
            '100% natural',
            'Export quality',
            'Guaranteed international quality'
        ],
        season: 'متوفر على مدار العام',
        seasonEn: 'Available year-round',
        storage: 'في مكان بارد وجاف أو الثلاجة',
        storageEn: 'In a cool and dry place or refrigerator',
        varieties: 'جوز برازيل خام - جوز برازيل محمص',
        varietiesEn: 'Raw Brazil nuts - Roasted Brazil nuts',
        sizes: 'أحجام: كبير، جامبو - حسب طلب العميل',
        sizesEn: 'Sizes: Large, Jumbo - according to customer request',
        packaging: 'أكياس فراغ 1 كجم، 5 كجم - أكياس PP 10 كجم، 25 كجم - أو حسب طلب العميل',
        packagingEn: 'Vacuum bags 1 kg, 5 kg - PP bags 10 kg, 25 kg - or according to customer request',
        shipping: 'عن طريق الحاويات والشحن البحري والجوي',
        shippingEn: 'Via containers, sea and air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، آسيا، أمريكا',
        exportMarketsEn: 'Europe, Gulf region, Asia, America',
        specialNotes: 'منتج مستورد من البرازيل ومعبأ في مصر - طلب متزايد في أسواق الخليج - حبة واحدة تكفي الاحتياج اليومي من السيلينيوم',
        rating: '4.8',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'عدس أحمر': {
        description: 'عدس أحمر مصري عالي الجودة، غني بالبروتين والألياف',
        descriptionEn: 'High quality Egyptian red lentils, rich in protein and fiber',
        category: 'بقوليات وحبوب',
        categoryEn: 'Legumes & Grains',
        image: '../images/img/legumes/Red Lentils.jpg',
        origin: 'الفيوم، مصر',
        originEn: 'Fayoum, Egypt',
        benefits: 'يقوي القلب، غني بالبروتين، يحسن الهضم، يدعم صحة العظام، ينظم السكر، يقلل الكوليسترول، يزود الطاقة، غني بالحديد',
        benefitsEn: 'Strengthens heart, rich in protein, improves digestion, supports bone health, regulates blood sugar, reduces cholesterol, provides energy, rich in iron',
        features: [
            'مصدر ممتاز للبروتين النباتي',
            'غني بالألياف الغذائية',
            'يحتوي على حديد وفوليك أسيد',
            'سهل الطبخ والهضم',
            'مناسب للنظام النباتي',
            'طبيعي 100%',
            'مناسب للتصدير',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'Excellent source of plant protein',
            'Rich in dietary fiber',
            'Contains iron and folic acid',
            'Easy to cook and digest',
            'Suitable for vegetarian diet',
            '100% natural',
            'Export quality',
            'Authentic Egyptian quality'
        ],
        season: 'متوفر على مدار العام',
        seasonEn: 'Available year-round',
        storage: 'في مكان بارد وجاف',
        storageEn: 'In a cool and dry place',
        varieties: 'عدس أحمر مصري - عدس أحمر تركي',
        varietiesEn: 'Egyptian red lentils - Turkish red lentils',
        sizes: 'حسب طلب العميل - نسبة النقاء: 99%+',
        sizesEn: 'According to customer request - Purity: 99%+',
        packaging: 'أكياس PP 25 كجم، 50 كجم - أكياس صغيرة 500 جم، 1 كجم - أو حسب طلب العميل',
        packagingEn: 'PP bags 25 kg, 50 kg - Small bags 500 g, 1 kg - or according to customer request',
        shipping: 'عن طريق الحاويات والشحن البحري والجوي',
        shippingEn: 'Via containers, sea and air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، آسيا، أفريقيا، أمريكا',
        exportMarketsEn: 'Europe, Gulf region, Asia, Africa, America',
        specialNotes: 'تفاصيل الحاوية 40 قدما: 20 منصة نقالة - 1,100 كيس (25 كجم) - الوزن الصافي 27,500 كجم - العدس المصري معروف بجودته العالية',
        rating: '4.8',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'فول مدمس': {
        description: 'فول مدمس مصري أصيل، غني بالبروتين والعناصر الغذائية',
        descriptionEn: 'Authentic Egyptian fava beans, rich in protein and nutrients',
        category: 'بقوليات وحبوب',
        categoryEn: 'Legumes & Grains',
        image: '../images/img/legumes/Fava Beans.jpg',
        origin: 'أسيوط، مصر',
        originEn: 'Assiut, Egypt',
        benefits: 'يقوي العضلات، غني بالبروتين، يحسن الهضم، يدعم صحة القلب، ينظم السكر، يقلل الكوليسترول، يزود الطاقة، غني بالحديد',
        benefitsEn: 'Strengthens muscles, rich in protein, improves digestion, supports heart health, regulates blood sugar, reduces cholesterol, provides energy, rich in iron',
        features: [
            'منتج مصري تقليدي أصيل',
            'مصدر ممتاز للبروتين',
            'غني بالألياف والحديد',
            'يحتوي على فيتامينات B',
            'مناسب للنظام النباتي',
            'طبيعي 100%',
            'مناسب للتصدير',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'Authentic traditional Egyptian product',
            'Excellent source of protein',
            'Rich in fiber and iron',
            'Contains B vitamins',
            'Suitable for vegetarian diet',
            '100% natural',
            'Export quality',
            'Authentic Egyptian quality'
        ],
        season: 'متوفر على مدار العام',
        seasonEn: 'Available year-round',
        storage: 'في مكان بارد وجاف',
        storageEn: 'In a cool and dry place',
        varieties: 'فول بلدي - فول رومي - فول قبلي',
        varietiesEn: 'Local fava - Rumi fava - Qibli fava',
        sizes: 'حسب طلب العميل - أحجام: صغير، متوسط، كبير',
        sizesEn: 'According to customer request - Sizes: Small, Medium, Large',
        packaging: 'أكياس PP 25 كجم، 50 كجم - علب معدنية 400 جم، 800 جم - أو حسب طلب العميل',
        packagingEn: 'PP bags 25 kg, 50 kg - Metal cans 400 g, 800 g - or according to customer request',
        shipping: 'عن طريق الحاويات والشحن البحري والجوي',
        shippingEn: 'Via containers, sea and air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، آسيا، أفريقيا',
        exportMarketsEn: 'Europe, Gulf region, Asia, Africa',
        specialNotes: 'تفاصيل الحاوية 40 قدما: 20 منصة نقالة - 1,100 كيس (25 كجم) - الوزن الصافي 27,500 كجم - الفول المصري الأشهر عالمياً',
        rating: '4.9',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'حمص': {
        description: 'حمص مصري عالي الجودة، غني بالبروتين والألياف',
        descriptionEn: 'High quality Egyptian chickpeas, rich in protein and fiber',
        category: 'بقوليات وحبوب',
        categoryEn: 'Legumes & Grains',
        image: '../images/img/legumes/Chickpeas.jpg',
        origin: 'المنيا، مصر',
        originEn: 'Minya, Egypt',
        benefits: 'يقوي القلب، غني بالبروتين، يحسن الهضم، يدعم صحة العظام، ينظم السكر، يقلل الوزن، يزود الطاقة، غني بالحديد',
        benefitsEn: 'Strengthens heart, rich in protein, improves digestion, supports bone health, regulates blood sugar, helps weight loss, provides energy, rich in iron',
        features: [
            'مصدر ممتاز للبروتين النباتي',
            'غني بالألياف الغذائية',
            'يحتوي على حديد وكالسيوم',
            'يستخدم في الحمص والفلافل',
            'مناسب للنظام النباتي',
            'طبيعي 100%',
            'مناسب للتصدير',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'Excellent source of plant protein',
            'Rich in dietary fiber',
            'Contains iron and calcium',
            'Used in hummus and falafel',
            'Suitable for vegetarian diet',
            '100% natural',
            'Export quality',
            'Authentic Egyptian quality'
        ],
        season: 'متوفر على مدار العام',
        seasonEn: 'Available year-round',
        storage: 'في مكان بارد وجاف',
        storageEn: 'In a cool and dry place',
        varieties: 'حمص بلدي - حمص كابولي',
        varietiesEn: 'Desi chickpeas - Kabuli chickpeas',
        sizes: 'أحجام: 7 مم، 8 مم، 9 مم، 10 مم+',
        sizesEn: 'Sizes: 7 mm, 8 mm, 9 mm, 10 mm+',
        packaging: 'أكياس PP 25 كجم، 50 كجم - أكياس صغيرة 500 جم، 1 كجم - أو حسب طلب العميل',
        packagingEn: 'PP bags 25 kg, 50 kg - Small bags 500 g, 1 kg - or according to customer request',
        shipping: 'عن طريق الحاويات والشحن البحري والجوي',
        shippingEn: 'Via containers, sea and air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، آسيا، أفريقيا، أمريكا',
        exportMarketsEn: 'Europe, Gulf region, Asia, Africa, America',
        specialNotes: 'تفاصيل الحاوية 40 قدما: 20 منصة نقالة - 1,100 كيس (25 كجم) - الوزن الصافي 27,500 كجم - طلب عالمي مستمر',
        rating: '4.8',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'أرز بسمتي': {
        description: 'أرز بسمتي مصري فاخر، حبة طويلة وعطرية',
        descriptionEn: 'Premium Egyptian basmati rice, long grain and aromatic',
        category: 'بقوليات وحبوب',
        categoryEn: 'Legumes & Grains',
        image: '../images/img/legumes/Basmati Rice.jpg',
        origin: 'كفر الشيخ، مصر',
        originEn: 'Kafr El Sheikh, Egypt',
        benefits: 'يزود الطاقة، سهل الهضم، غني بالكربوهيدرات، يدعم صحة القلب، منخفض الدهون، غني بفيتامينات B، يحسن الأداء الرياضي، طبيعي 100%',
        benefitsEn: 'Provides energy, easy to digest, rich in carbohydrates, supports heart health, low in fat, rich in B vitamins, improves athletic performance, 100% natural',
        features: [
            'حبة طويلة وعطرية',
            'نكهة مميزة وطعم رائع',
            'لا يلتصق عند الطبخ',
            'سهل الطبخ والهضم',
            'مناسب لجميع الأطباق',
            'طبيعي 100%',
            'مناسب للتصدير',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'Long grain and aromatic',
            'Distinctive flavor and great taste',
            'Non-sticky when cooked',
            'Easy to cook and digest',
            'Suitable for all dishes',
            '100% natural',
            'Export quality',
            'Authentic Egyptian quality'
        ],
        season: 'متوفر على مدار العام',
        seasonEn: 'Available year-round',
        storage: 'في مكان بارد وجاف',
        storageEn: 'In a cool and dry place',
        varieties: 'أرز بسمتي أبيض - أرز بسمتي بني (كامل)',
        varietiesEn: 'White basmati rice - Brown basmati rice (whole grain)',
        sizes: 'حسب طلب العميل - نسبة الكسر: أقل من 5%',
        sizesEn: 'According to customer request - Broken ratio: less than 5%',
        packaging: 'أكياس PP 25 كجم، 50 كجم - أكياس صغيرة 1 كجم، 5 كجم - أو حسب طلب العميل',
        packagingEn: 'PP bags 25 kg, 50 kg - Small bags 1 kg, 5 kg - or according to customer request',
        shipping: 'عن طريق الحاويات والشحن البحري والجوي',
        shippingEn: 'Via containers, sea and air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، آسيا، أفريقيا، أمريكا',
        exportMarketsEn: 'Europe, Gulf region, Asia, Africa, America',
        specialNotes: 'تفاصيل الحاوية 40 قدما: 20 منصة نقالة - 1,100 كيس (25 كجم) - الوزن الصافي 27,500 كجم - الأرز المصري معروف بجودته',
        rating: '4.9',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'فاصوليا بيضاء': {
        description: 'فاصوليا بيضاء مصرية، غنية بالبروتين والألياف',
        descriptionEn: 'Egyptian white beans, rich in protein and fiber',
        category: 'بقوليات وحبوب',
        categoryEn: 'Legumes & Grains',
        image: '../images/img/legumes/White Beans.jpg',
        origin: 'البحيرة، مصر',
        originEn: 'Beheira, Egypt',
        benefits: 'تقوي القلب، غنية بالبروتين، تحسن الهضم، تدعم صحة العظام، تنظم السكر، تقلل الكوليسترول، تزود الطاقة، غنية بالحديد',
        benefitsEn: 'Strengthens heart, rich in protein, improves digestion, supports bone health, regulates blood sugar, reduces cholesterol, provides energy, rich in iron',
        features: [
            'مصدر ممتاز للبروتين النباتي',
            'غنية بالألياف الغذائية',
            'تحتوي على حديد وكالسيوم',
            'سهلة الطبخ والهضم',
            'مناسبة للنظام النباتي',
            'طبيعية 100%',
            'مناسبة للتصدير',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'Excellent source of plant protein',
            'Rich in dietary fiber',
            'Contains iron and calcium',
            'Easy to cook and digest',
            'Suitable for vegetarian diet',
            '100% natural',
            'Export quality',
            'Authentic Egyptian quality'
        ],
        season: 'متوفر على مدار العام',
        seasonEn: 'Available year-round',
        storage: 'في مكان بارد وجاف',
        storageEn: 'In a cool and dry place',
        varieties: 'فاصوليا بيضاء كبيرة - فاصوليا بيضاء صغيرة',
        varietiesEn: 'Large white beans - Small white beans',
        sizes: 'حسب طلب العميل - نسبة النقاء: 99%+',
        sizesEn: 'According to customer request - Purity: 99%+',
        packaging: 'أكياس PP 25 كجم، 50 كجم - علب معدنية 400 جم، 800 جم - أو حسب طلب العميل',
        packagingEn: 'PP bags 25 kg, 50 kg - Metal cans 400 g, 800 g - or according to customer request',
        shipping: 'عن طريق الحاويات والشحن البحري والجوي',
        shippingEn: 'Via containers, sea and air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، آسيا، أفريقيا',
        exportMarketsEn: 'Europe, Gulf region, Asia, Africa',
        specialNotes: 'تفاصيل الحاوية 40 قدما: 20 منصة نقالة - 1,100 كيس (25 كجم) - الوزن الصافي 27,500 كجم - طلب مستمر في الأسواق الأوروبية',
        rating: '4.7',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'كمون': {
        description: 'كمون مصري عالي الجودة، غني بالنكهة والفوائد الصحية',
        descriptionEn: 'High quality Egyptian cumin, rich in flavor and health benefits',
        category: 'توابل وبهارات',
        categoryEn: 'Spices',
        image: '../images/img/spices/Cumin.jpg',
        origin: 'أسيوط، مصر',
        originEn: 'Assiut, Egypt',
        benefits: 'يحسن الهضم، يقوي المناعة، غني بمضادات الأكسدة، يدعم صحة القلب، ينظم السكر، يقلل الالتهابات، يزود الحديد، يحسن النوم',
        benefitsEn: 'Improves digestion, boosts immunity, rich in antioxidants, supports heart health, regulates blood sugar, reduces inflammation, provides iron, improves sleep',
        features: [
            'نكهة قوية ومميزة',
            'غني بالحديد والمعادن',
            'يحتوي على مضادات أكسدة',
            'يستخدم في الطبخ العربي والعالمي',
            'يحسن الهضم',
            'طبيعي 100%',
            'مناسب للتصدير',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'Strong and distinctive flavor',
            'Rich in iron and minerals',
            'Contains antioxidants',
            'Used in Arabic and international cuisine',
            'Improves digestion',
            '100% natural',
            'Export quality',
            'Authentic Egyptian quality'
        ],
        season: 'متوفر على مدار العام',
        seasonEn: 'Available year-round',
        storage: 'في مكان بارد وجاف بعيداً عن الضوء',
        storageEn: 'In a cool and dry place away from light',
        varieties: 'كمون حب - كمون مطحون',
        varietiesEn: 'Whole cumin seeds - Ground cumin',
        sizes: 'حسب طلب العميل - نسبة النقاء: 99%+',
        sizesEn: 'According to customer request - Purity: 99%+',
        packaging: 'أكياس PP 10 كجم، 25 كجم - أكياس صغيرة 50 جم، 100 جم، 250 جم - أو حسب طلب العميل',
        packagingEn: 'PP bags 10 kg, 25 kg - Small bags 50 g, 100 g, 250 g - or according to customer request',
        shipping: 'عن طريق الحاويات والشحن البحري والجوي',
        shippingEn: 'Via containers, sea and air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، آسيا، أفريقيا، أمريكا',
        exportMarketsEn: 'Europe, Gulf region, Asia, Africa, America',
        specialNotes: 'الكمون المصري معروف عالمياً بجودته العالية ونكهته القوية - طلب مستمر في جميع الأسواق',
        rating: '4.9',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'كركم': {
        description: 'كركم مصري طبيعي، غني بالكركمين والفوائد الصحية',
        descriptionEn: 'Natural Egyptian turmeric, rich in curcumin and health benefits',
        category: 'توابل وبهارات',
        categoryEn: 'Spices',
        image: '../images/img/spices/Turmeric.jpg',
        origin: 'قنا، مصر',
        originEn: 'Qena, Egypt',
        benefits: 'مضاد قوي للالتهابات، يقوي المناعة، غني بمضادات الأكسدة، يدعم صحة الكبد، يحسن الذاكرة، يقلل آلام المفاصل، يحسن صحة البشرة، يحمي من الأمراض',
        benefitsEn: 'Powerful anti-inflammatory, boosts immunity, rich in antioxidants, supports liver health, improves memory, reduces joint pain, improves skin health, protects against diseases',
        features: [
            'غني بالكركمين الطبيعي',
            'مضاد قوي للالتهابات',
            'يحتوي على مضادات أكسدة قوية',
            'يستخدم في الطبخ والطب',
            'لون ذهبي مميز',
            'طبيعي 100%',
            'مناسب للتصدير',
            'جودة مصرية مضمونة'
        ],
        featuresEn: [
            'Rich in natural curcumin',
            'Powerful anti-inflammatory',
            'Contains strong antioxidants',
            'Used in cooking and medicine',
            'Distinctive golden color',
            '100% natural',
            'Export quality',
            'Authentic Egyptian quality'
        ],
        season: 'متوفر على مدار العام',
        seasonEn: 'Available year-round',
        storage: 'في مكان بارد وجاف بعيداً عن الضوء',
        storageEn: 'In a cool and dry place away from light',
        varieties: 'كركم جذور - كركم مطحون',
        varietiesEn: 'Turmeric roots - Ground turmeric',
        sizes: 'حسب طلب العميل - نسبة الكركمين: 3-5%',
        sizesEn: 'According to customer request - Curcumin content: 3-5%',
        packaging: 'أكياس PP 10 كجم، 25 كجم - أكياس صغيرة 50 جم، 100 جم، 250 جم - أو حسب طلب العميل',
        packagingEn: 'PP bags 10 kg, 25 kg - Small bags 50 g, 100 g, 250 g - or according to customer request',
        shipping: 'عن طريق الحاويات والشحن البحري والجوي',
        shippingEn: 'Via containers, sea and air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، آسيا، أفريقيا، أمريكا',
        exportMarketsEn: 'Europe, Gulf region, Asia, Africa, America',
        specialNotes: 'الكركم المصري معروف بنسبة الكركمين العالية - طلب متزايد في السوق الصحي',
        rating: '4.9',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'فلفل أسود': {
        description: 'فلفل أسود مصري حار، غني بالنكهة والفوائد',
        descriptionEn: 'Egyptian black pepper, spicy and rich in flavor and benefits',
        category: 'توابل وبهارات',
        categoryEn: 'Spices',
        image: '../images/img/spices/Black Pepper.jpg',
        origin: 'مستورد ومعبأ في مصر',
        originEn: 'Imported and packed in Egypt',
        benefits: 'يحسن الهضم، يقوي المناعة، غني بمضادات الأكسدة، يدعم امتصاص العناصر، يحسن الدورة الدموية، يقلل الالتهابات، يزود الطاقة، يحسن التمثيل الغذائي',
        benefitsEn: 'Improves digestion, boosts immunity, rich in antioxidants, supports nutrient absorption, improves blood circulation, reduces inflammation, provides energy, improves metabolism',
        features: [
            'نكهة حارة قوية',
            'غني بالبيبيرين',
            'يحتوي على مضادات أكسدة',
            'يستخدم في جميع أنواع الطبخ',
            'يحسن امتصاص العناصر الغذائية',
            'طبيعي 100%',
            'مناسب للتصدير',
            'جودة عالمية مضمونة'
        ],
        featuresEn: [
            'Strong spicy flavor',
            'Rich in piperine',
            'Contains antioxidants',
            'Used in all types of cooking',
            'Improves nutrient absorption',
            '100% natural',
            'Export quality',
            'Guaranteed international quality'
        ],
        season: 'متوفر على مدار العام',
        seasonEn: 'Available year-round',
        storage: 'في مكان بارد وجاف بعيداً عن الضوء',
        storageEn: 'In a cool and dry place away from light',
        varieties: 'فلفل أسود حب - فلفل أسود مطحون',
        varietiesEn: 'Whole black peppercorns - Ground black pepper',
        sizes: 'حسب طلب العميل - حجم الحبة: 4-5 مم',
        sizesEn: 'According to customer request - Grain size: 4-5 mm',
        packaging: 'أكياس PP 10 كجم، 25 كجم - أكياس صغيرة 50 جم، 100 جم، 250 جم - أو حسب طلب العميل',
        packagingEn: 'PP bags 10 kg, 25 kg - Small bags 50 g, 100 g, 250 g - or according to customer request',
        shipping: 'عن طريق الحاويات والشحن البحري والجوي',
        shippingEn: 'Via containers, sea and air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، آسيا، أفريقيا، أمريكا',
        exportMarketsEn: 'Europe, Gulf region, Asia, Africa, America',
        specialNotes: 'منتج مستورد من الهند ومعبأ في مصر بأعلى معايير الجودة - طلب عالمي ضخم',
        rating: '4.8',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'قرفة': {
        description: 'قرفة مصرية طبيعية، عطرية وحلوة المذاق',
        descriptionEn: 'Natural Egyptian cinnamon, aromatic and sweet tasting',
        category: 'توابل وبهارات',
        categoryEn: 'Spices',
        image: '../images/img/spices/Cinnamon.jpg',
        origin: 'مستورد ومعبأ في مصر',
        originEn: 'Imported and packed in Egypt',
        benefits: 'تنظم السكر، تقوي المناعة، غنية بمضادات الأكسدة، تدعم صحة القلب، تحسن الذاكرة، تقلل الالتهابات، تحسن الهضم، تحمي من الأمراض',
        benefitsEn: 'Regulates blood sugar, boosts immunity, rich in antioxidants, supports heart health, improves memory, reduces inflammation, improves digestion, protects against diseases',
        features: [
            'نكهة عطرية حلوة',
            'غنية بمضادات الأكسدة',
            'تحتوي على زيوت طيارة',
            'تستخدم في الحلويات والمشروبات',
            'تنظم مستوى السكر',
            'طبيعية 100%',
            'مناسبة للتصدير',
            'جودة عالمية مضمونة'
        ],
        featuresEn: [
            'Sweet aromatic flavor',
            'Rich in antioxidants',
            'Contains essential oils',
            'Used in sweets and beverages',
            'Regulates blood sugar levels',
            '100% natural',
            'Export quality',
            'Guaranteed international quality'
        ],
        season: 'متوفر على مدار العام',
        seasonEn: 'Available year-round',
        storage: 'في مكان بارد وجاف بعيداً عن الضوء',
        storageEn: 'In a cool and dry place away from light',
        varieties: 'قرفة أعواد - قرفة مطحونة',
        varietiesEn: 'Cinnamon sticks - Ground cinnamon',
        sizes: 'حسب طلب العميل - أعواد: 6-8 سم',
        sizesEn: 'According to customer request - Sticks: 6-8 cm',
        packaging: 'أكياس PP 5 كجم، 10 كجم - أكياس صغيرة 50 جم، 100 جم، 250 جم - أو حسب طلب العميل',
        packagingEn: 'PP bags 5 kg, 10 kg - Small bags 50 g, 100 g, 250 g - or according to customer request',
        shipping: 'عن طريق الحاويات والشحن البحري والجوي',
        shippingEn: 'Via containers, sea and air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، آسيا، أفريقيا، أمريكا',
        exportMarketsEn: 'Europe, Gulf region, Asia, Africa, America',
        specialNotes: 'منتج مستورد من سيريلانكا ومعبأ في مصر - طلب عالي في موسم الأعياد والشتاء',
        rating: '4.9',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'فلفل أسود': {
        description: 'فلفل أسود مصري نقي، حار ونكهته قوية',
        descriptionEn: 'Pure Egyptian black pepper, hot with strong flavor',
        category: 'توابل وبهارات',
        categoryEn: 'Spices',
        image: '../images/img/spices/Black Pepper.jpg',
        origin: 'أسيوط، مصر',
        originEn: 'Assiut, Egypt',
        benefits: 'يحسن الهضم، يقوي المناعة، غني بمضادات الأكسدة، يدعم صحة الجهاز التنفسي، يحسن امتصاص العناصر الغذائية، يقاوم البكتيريا، يحسن الدورة الدموية، يساعد على إنقاص الوزن',
        benefitsEn: 'Improves digestion, boosts immunity, rich in antioxidants, supports respiratory health, enhances nutrient absorption, fights bacteria, improves blood circulation, aids weight loss',
        features: [
            'نكهة حارة وقوية',
            'غني بالزيوت الطيارة',
            'يحتوي على Piperine',
            'يستخدم في جميع الأطباق',
            'يحسن الهضم',
            'طبيعي 100%',
            'مناسب للتصدير',
            'جودة عالمية مضمونة'
        ],
        featuresEn: [
            'Hot and strong flavor',
            'Rich in essential oils',
            'Contains Piperine',
            'Used in all dishes',
            'Improves digestion',
            '100% natural',
            'Export quality',
            'Guaranteed international quality'
        ],
        season: 'متوفر على مدار العام',
        seasonEn: 'Available year-round',
        storage: 'في مكان بارد وجاف بعيداً عن الرطوبة',
        storageEn: 'In a cool and dry place away from moisture',
        varieties: 'فلفل أسود حب - فلفل أسود مطحون',
        varietiesEn: 'Black pepper seeds - Ground black pepper',
        sizes: 'حسب طلب العميل - نسبة النقاء: 98%+',
        sizesEn: 'According to customer request - Purity: 98%+',
        packaging: 'أكياس PP 10 كجم، 25 كجم - أكياس صغيرة 50 جم، 100 جم، 250 جم - أو حسب طلب العميل',
        packagingEn: 'PP bags 10 kg, 25 kg - Small bags 50 g, 100 g, 250 g - or according to customer request',
        shipping: 'عن طريق الحاويات والشحن البحري والجوي',
        shippingEn: 'Via containers, sea and air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، آسيا، أفريقيا، أمريكا',
        exportMarketsEn: 'Europe, Gulf region, Asia, Africa, America',
        specialNotes: 'الفلفل الأسود المصري معروف بجودته العالية ونكهته المميزة - طلب عالمي مستمر',
        rating: '4.9',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'زنجبيل': {
        description: 'زنجبيل مصري طبيعي، حار وغني بالفوائد الصحية',
        descriptionEn: 'Natural Egyptian ginger, hot and rich in health benefits',
        category: 'توابل وبهارات',
        categoryEn: 'Spices',
        image: '../images/img/spices/Ginger.jpg',
        origin: 'المنيا، مصر',
        originEn: 'Minya, Egypt',
        benefits: 'مضاد قوي للالتهابات، يقوي المناعة، غني بمضادات الأكسدة، يدعم صحة الجهاز الهضمي، يخفف الغثيان، يحسن صحة المفاصل، يخفض الكوليسترول، يحمي من الأمراض',
        benefitsEn: 'Powerful anti-inflammatory, boosts immunity, rich in antioxidants, supports digestive health, relieves nausea, improves joint health, lowers cholesterol, protects against diseases',
        features: [
            'نكهة حارة ومنعشة',
            'غني بالزيوت الطيارة',
            'يحتوي على Gingerol',
            'يستخدم في الطبخ والأدوية',
            'يخفف الغثيان',
            'طبيعي 100%',
            'مناسب للتصدير',
            'جودة عالمية مضمونة'
        ],
        featuresEn: [
            'Hot and refreshing flavor',
            'Rich in essential oils',
            'Contains Gingerol',
            'Used in cooking and medicine',
            'Relieves nausea',
            '100% natural',
            'Export quality',
            'Guaranteed international quality'
        ],
        season: 'متوفر على مدار العام',
        seasonEn: 'Available year-round',
        storage: 'في مكان بارد وجاف بعيداً عن الرطوبة',
        storageEn: 'In a cool and dry place away from moisture',
        varieties: 'زنجبيل طازج - زنجبيل مجفف - زنجبيل مطحون',
        varietiesEn: 'Fresh ginger - Dried ginger - Ground ginger',
        sizes: 'حسب طلب العميل - نسبة النقاء: 97%+',
        sizesEn: 'According to customer request - Purity: 97%+',
        packaging: 'أكياس PP 5 كجم، 10 كجم - أكياس صغيرة 50 جم، 100 جم، 250 جم - أو حسب طلب العميل',
        packagingEn: 'PP bags 5 kg, 10 kg - Small bags 50 g, 100 g, 250 g - or according to customer request',
        shipping: 'عن طريق الحاويات والشحن البحري والجوي',
        shippingEn: 'Via containers, sea and air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، آسيا، أفريقيا، أمريكا',
        exportMarketsEn: 'Europe, Gulf region, Asia, Africa, America',
        specialNotes: 'الزنجبيل المصري معروف بجودته العالية وفوائده الصحية المتعددة - طلب عالمي مستمر',
        rating: '4.8',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'قرنفل': {
        description: 'قرنفل مصري طبيعي، عطري ونكهته قوية جداً',
        descriptionEn: 'Natural Egyptian clove, aromatic with very strong flavor',
        category: 'توابل وبهارات',
        categoryEn: 'Spices',
        image: '../images/img/spices/Clove.jpg',
        origin: 'الإسماعيلية، مصر',
        originEn: 'Ismailia, Egypt',
        benefits: 'مضاد قوي للبكتيريا، يقوي المناعة، غني بمضادات الأكسدة، يدعم صحة الفم والأسنان، يخفف الآلام، يحسن الهضم، يقاوم الالتهابات، يحمي من الأمراض',
        benefitsEn: 'Powerful antibacterial, boosts immunity, rich in antioxidants, supports oral and dental health, relieves pain, improves digestion, fights inflammation, protects against diseases',
        features: [
            'نكهة عطرية وقوية جداً',
            'غني بالزيوت الطيارة',
            'يحتوي على Eugenol',
            'يستخدم في الطبخ والطب',
            'يدعم صحة الفم',
            'طبيعي 100%',
            'مناسب للتصدير',
            'جودة عالمية مضمونة'
        ],
        featuresEn: [
            'Very strong aromatic flavor',
            'Rich in essential oils',
            'Contains Eugenol',
            'Used in cooking and medicine',
            'Supports oral health',
            '100% natural',
            'Export quality',
            'Guaranteed international quality'
        ],
        season: 'متوفر على مدار العام',
        seasonEn: 'Available year-round',
        storage: 'في مكان بارد وجاف في حاويات محكمة',
        storageEn: 'In a cool and dry place in airtight containers',
        varieties: 'قرنفل كامل - قرنفل مطحون',
        varietiesEn: 'Whole cloves - Ground clove',
        sizes: 'حسب طلب العميل - نسبة النقاء: 96%+',
        sizesEn: 'According to customer request - Purity: 96%+',
        packaging: 'أكياس PP 5 كجم، 10 كجم - أكياس صغيرة 25 جم، 50 جم، 100 جم - أو حسب طلب العميل',
        packagingEn: 'PP bags 5 kg, 10 kg - Small bags 25 g, 50 g, 100 g - or according to customer request',
        shipping: 'عن طريق الحاويات والشحن البحري والجوي',
        shippingEn: 'Via containers, sea and air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، آسيا، أفريقيا، أمريكا',
        exportMarketsEn: 'Europe, Gulf region, Asia, Africa, America',
        specialNotes: 'القرنفل المصري معروف بجودته العالية ونكهته القوية - طلب عالمي مستمر',
        rating: '4.7',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'هيل': {
        description: 'هيل مصري طبيعي، عطري وفاخر',
        descriptionEn: 'Natural Egyptian cardamom, aromatic and premium',
        category: 'توابل وبهارات',
        categoryEn: 'Spices',
        image: '../images/img/spices/Cardamom.jpg',
        origin: 'أسوان، مصر',
        originEn: 'Aswan, Egypt',
        benefits: 'يحسن الهضم، يقوي المناعة، غني بمضادات الأكسدة، يدعم صحة الجهاز التنفسي، ينعش النفس، يقاوم البكتيريا، يحسن المزاج، يحمي القلب',
        benefitsEn: 'Improves digestion, boosts immunity, rich in antioxidants, supports respiratory health, freshens breath, fights bacteria, improves mood, protects the heart',
        features: [
            'نكهة عطرية فاخرة',
            'غني بالزيوت الطيارة',
            'يحتوي على Cineole',
            'يستخدم في القهوة والحلويات',
            'ينعش النفس',
            'طبيعي 100%',
            'مناسب للتصدير',
            'جودة عالمية مضمونة'
        ],
        featuresEn: [
            'Premium aromatic flavor',
            'Rich in essential oils',
            'Contains Cineole',
            'Used in coffee and sweets',
            'Freshens breath',
            '100% natural',
            'Export quality',
            'Guaranteed international quality'
        ],
        season: 'متوفر على مدار العام',
        seasonEn: 'Available year-round',
        storage: 'في مكان بارد وجاف في حاويات محكمة',
        storageEn: 'In a cool and dry place in airtight containers',
        varieties: 'هيل أخضر - هيل أسود - هيل مطحون',
        varietiesEn: 'Green cardamom - Black cardamom - Ground cardamom',
        sizes: 'حسب طلب العميل - نسبة النقاء: 95%+',
        sizesEn: 'According to customer request - Purity: 95%+',
        packaging: 'أكياس PP 2 كجم، 5 كجم - أكياس صغيرة 25 جم، 50 جم - أو حسب طلب العميل',
        packagingEn: 'PP bags 2 kg, 5 kg - Small bags 25 g, 50 g - or according to customer request',
        shipping: 'عن طريق الحاويات والشحن البحري والجوي',
        shippingEn: 'Via containers, sea and air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، آسيا، أفريقيا، أمريكا',
        exportMarketsEn: 'Europe, Gulf region, Asia, Africa, America',
        specialNotes: 'الهيل المصري معروف بجودته العالية ونكهته الفاخرة - طلب عالمي مستمر',
        rating: '4.9',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'شمر': {
        description: 'شمر مصري طبيعي، حلو وعطري',
        descriptionEn: 'Natural Egyptian fennel, sweet and aromatic',
        category: 'توابل وبهارات',
        categoryEn: 'Spices',
        image: '../images/img/spices/Fennel.jpg',
        origin: 'الوادي الجديد، مصر',
        originEn: 'New Valley, Egypt',
        benefits: 'يحسن الهضم، يقوي المناعة، غني بمضادات الأكسدة، يدعم صحة الجهاز الهضمي، يخفف الانتفاخ، ينظم الهرمونات، يحسن صحة العين، يقاوم السرطان',
        benefitsEn: 'Improves digestion, boosts immunity, rich in antioxidants, supports digestive health, relieves bloating, regulates hormones, improves eye health, fights cancer',
        features: [
            'نكهة حلوة وعطرية',
            'غني بالزيوت الطيارة',
            'يحتوي على Anethole',
            'يستخدم في الطبخ والشاي',
            'يخفف الانتفاخ',
            'طبيعي 100%',
            'مناسب للتصدير',
            'جودة عالمية مضمونة'
        ],
        featuresEn: [
            'Sweet and aromatic flavor',
            'Rich in essential oils',
            'Contains Anethole',
            'Used in cooking and tea',
            'Relieves bloating',
            '100% natural',
            'Export quality',
            'Guaranteed international quality'
        ],
        season: 'متوفر على مدار العام',
        seasonEn: 'Available year-round',
        storage: 'في مكان بارد وجاف بعيداً عن الرطوبة',
        storageEn: 'In a cool and dry place away from moisture',
        varieties: 'شمر بذور - شمر مطحون',
        varietiesEn: 'Fennel seeds - Ground fennel',
        sizes: 'حسب طلب العميل - نسبة النقاء: 98%+',
        sizesEn: 'According to customer request - Purity: 98%+',
        packaging: 'أكياس PP 5 كجم، 10 كجم - أكياس صغيرة 50 جم، 100 جم، 250 جم - أو حسب طلب العميل',
        packagingEn: 'PP bags 5 kg, 10 kg - Small bags 50 g, 100 g, 250 g - or according to customer request',
        shipping: 'عن طريق الحاويات والشحن البحري والجوي',
        shippingEn: 'Via containers, sea and air freight',
        exportMarkets: 'أوروبا، منطقة الخليج، آسيا، أفريقيا، أمريكا',
        exportMarketsEn: 'Europe, Gulf region, Asia, Africa, America',
        specialNotes: 'الشمر المصري معروف بجودته العالية ونكهته الحلوة - طلب عالمي مستمر',
        rating: '4.6',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'بازلاء مجمدة': {
        description: 'بازلاء خضراء مجمدة طازجة، محفوظة بشكل طبيعي مع الحفاظ على القيمة الغذائية',
        descriptionEn: 'Frozen green peas, naturally preserved while maintaining nutritional value',
        category: 'خضروات مجمدة',
        categoryEn: 'Frozen Vegetables',
        image: '../images/img/Frozen Vegetables/Frozen Peas.jpg',
        origin: 'مصر',
        originEn: 'Egypt',
        benefits: 'غني بالبروتين، يحتوي على فيتامين C، يدعم صحة العين، يقوي المناعة، يحسن الهضم، غني بمضادات الأكسدة',
        benefitsEn: 'Rich in protein, contains vitamin C, supports eye health, boosts immunity, improves digestion, rich in antioxidants',
        features: [
            'مصدر غني بالبروتين',
            'يحتوي على فيتامين C',
            'محفوظ بشكل طبيعي',
            'يدعم صحة العين',
            'يعزز المناعة',
            'يحسن الهضم',
            'غني بمضادات الأكسدة',
            'جودة مصرية أصيلة'
        ],
        featuresEn: [
            'Rich source of protein',
            'Contains vitamin C',
            'Naturally preserved',
            'Supports eye health',
            'Boosts immunity',
            'Improves digestion',
            'Rich in antioxidants',
            'Authentic Egyptian quality'
        ],
        season: 'متوفر طوال العام',
        seasonEn: 'Available all year',
        storage: 'في الفريزر لمدة 6 أشهر',
        storageEn: 'In freezer for 6 months',
        packaging: '500 جرام و 1 كجم أكياس بلاستيكية',
        packagingEn: '500g and 1kg plastic bags',
        sizes: 'حسب طلب العميل',
        sizesEn: 'According to customer request',
        shipping: 'عبر النقل البحري والجوي',
        shippingEn: 'Via sea and air freight',
        exportMarkets: 'أوروبا ومنطقة الخليج',
        exportMarketsEn: 'Europe and Gulf region',
        specialNotes: 'منتج مجمد جاهز للاستخدام الفوري - مناسب للمطاعم والمنازل',
        rating: '4.7',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'جزر مجمد': {
        description: 'جزر برتقالي مجمد طازج، مقطع ومحفوظ بشكل طبيعي مع الحفاظ على القيمة الغذائية',
        descriptionEn: 'Frozen orange carrots, cut and naturally preserved while maintaining nutritional value',
        category: 'خضروات مجمدة',
        categoryEn: 'Frozen Vegetables',
        image: '../images/img/Frozen Vegetables/Frozen Carrots.jpg',
        origin: 'مصر',
        originEn: 'Egypt',
        benefits: 'غني بفيتامين A، يحسن صحة العين، يقوي المناعة، يدعم صحة الجلد، يحسن الهضم، غني بمضادات الأكسدة',
        benefitsEn: 'Rich in vitamin A, improves eye health, boosts immunity, supports skin health, improves digestion, rich in antioxidants',
        features: [
            'غني بفيتامين A',
            'يحسن صحة العين',
            'مقطع وجاهز للاستخدام',
            'يدعم صحة الجلد',
            'يعزز المناعة',
            'يحسن الهضم',
            'غني بمضادات الأكسدة',
            'جودة مصرية أصيلة'
        ],
        featuresEn: [
            'Rich in vitamin A',
            'Improves eye health',
            'Cut and ready to use',
            'Supports skin health',
            'Boosts immunity',
            'Improves digestion',
            'Rich in antioxidants',
            'Authentic Egyptian quality'
        ],
        season: 'متوفر طوال العام',
        seasonEn: 'Available all year',
        storage: 'في الفريزر لمدة 8 أشهر',
        storageEn: 'In freezer for 8 months',
        packaging: '500 جرام و 1 كجم أكياس بلاستيكية',
        packagingEn: '500g and 1kg plastic bags',
        sizes: 'شرائح أو مكعبات',
        sizesEn: 'Slices or cubes',
        shipping: 'عبر النقل البحري والجوي',
        shippingEn: 'Via sea and air freight',
        exportMarkets: 'أوروبا ومنطقة الخليج',
        exportMarketsEn: 'Europe and Gulf region',
        specialNotes: 'منتج مجمد مقطع وجاهز للطبخ - مناسب للمطاعم والمنازل',
        rating: '4.6',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'ذرة حلوة مجمدة': {
        description: 'ذرة حلوة صفراء مجمدة طازجة، محفوظة بشكل طبيعي مع الحفاظ على القيمة الغذائية',
        descriptionEn: 'Frozen sweet yellow corn, naturally preserved while maintaining nutritional value',
        category: 'خضروات مجمدة',
        categoryEn: 'Frozen Vegetables',
        image: '../images/img/Frozen Vegetables/Frozen Sweet Corn.jpg',
        origin: 'مصر',
        originEn: 'Egypt',
        benefits: 'غني بالألياف، يحتوي على فيتامين B، يدعم صحة الجهاز الهضمي، يقوي المناعة، يحسن الهضم، غني بمضادات الأكسدة',
        benefitsEn: 'Rich in fiber, contains vitamin B, supports digestive system health, boosts immunity, improves digestion, rich in antioxidants',
        features: [
            'غني بالألياف الغذائية',
            'يحتوي على فيتامين B',
            'محفوظ بشكل طبيعي',
            'يدعم صحة الجهاز الهضمي',
            'يعزز المناعة',
            'يحسن الهضم',
            'غني بمضادات الأكسدة',
            'جودة مصرية أصيلة'
        ],
        featuresEn: [
            'Rich in dietary fiber',
            'Contains vitamin B',
            'Naturally preserved',
            'Supports digestive system health',
            'Boosts immunity',
            'Improves digestion',
            'Rich in antioxidants',
            'Authentic Egyptian quality'
        ],
        season: 'متوفر طوال العام',
        seasonEn: 'Available all year',
        storage: 'في الفريزر لمدة 6 أشهر',
        storageEn: 'In freezer for 6 months',
        packaging: '500 جرام و 1 كجم أكياس بلاستيكية',
        packagingEn: '500g and 1kg plastic bags',
        sizes: 'حبوب كاملة',
        sizesEn: 'Whole kernels',
        shipping: 'عبر النقل البحري والجوي',
        shippingEn: 'Via sea and air freight',
        exportMarkets: 'أوروبا ومنطقة الخليج',
        exportMarketsEn: 'Europe and Gulf region',
        specialNotes: 'منتج مجمد جاهز للاستخدام الفوري - مناسب للمطاعم والمنازل',
        rating: '4.8',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'سبانخ مجمدة': {
        description: 'سبانخ خضراء مجمدة طازجة، مغسولة ومحفوظة بشكل طبيعي مع الحفاظ على القيمة الغذائية',
        descriptionEn: 'Frozen green spinach, washed and naturally preserved while maintaining nutritional value',
        category: 'خضروات مجمدة',
        categoryEn: 'Frozen Vegetables',
        image: '../images/img/Frozen Vegetables/Spinach.jpg',
        origin: 'مصر',
        originEn: 'Egypt',
        benefits: 'غني بالحديد، يحتوي على فيتامين K، يدعم صحة العظام، يقوي المناعة، يحسن صحة الدم، غني بمضادات الأكسدة',
        benefitsEn: 'Rich in iron, contains vitamin K, supports bone health, boosts immunity, improves blood health, rich in antioxidants',
        features: [
            'غني بالحديد',
            'يحتوي على فيتامين K',
            'مغسولة وجاهزة للاستخدام',
            'يدعم صحة العظام',
            'يعزز المناعة',
            'يحسن صحة الدم',
            'غني بمضادات الأكسدة',
            'جودة مصرية أصيلة'
        ],
        featuresEn: [
            'Rich in iron',
            'Contains vitamin K',
            'Washed and ready to use',
            'Supports bone health',
            'Boosts immunity',
            'Improves blood health',
            'Rich in antioxidants',
            'Authentic Egyptian quality'
        ],
        season: 'متوفر طوال العام',
        seasonEn: 'Available all year',
        storage: 'في الفريزر لمدة 4 أشهر',
        storageEn: 'In freezer for 4 months',
        packaging: '500 جرام و 1 كجم أكياس بلاستيكية',
        packagingEn: '500g and 1kg plastic bags',
        sizes: 'أوراق كاملة أو مفرومة',
        sizesEn: 'Whole leaves or chopped',
        shipping: 'عبر النقل البحري والجوي',
        shippingEn: 'Via sea and air freight',
        exportMarkets: 'أوروبا ومنطقة الخليج',
        exportMarketsEn: 'Europe and Gulf region',
        specialNotes: 'منتج مجمد مغسول وجاهز للطبخ - مناسب للمطاعم والمنازل',
        rating: '4.7',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'فاصوليا خضراء مجمدة': {
        description: 'فاصوليا خضراء مجمدة طازجة، مقطعة ومحفوظة بشكل طبيعي مع الحفاظ على القيمة الغذائية',
        descriptionEn: 'Frozen green beans, cut and naturally preserved while maintaining nutritional value',
        category: 'خضروات مجمدة',
        categoryEn: 'Frozen Vegetables',
        image: '../images/img/Frozen Vegetables/Frozen Green Beans.jpg',
        origin: 'مصر',
        originEn: 'Egypt',
        benefits: 'غني بالألياف، يحتوي على فيتامين C، يدعم صحة الجهاز الهضمي، يقوي المناعة، يحسن الهضم، غني بمضادات الأكسدة',
        benefitsEn: 'Rich in fiber, contains vitamin C, supports digestive system health, boosts immunity, improves digestion, rich in antioxidants',
        features: [
            'غني بالألياف الغذائية',
            'يحتوي على فيتامين C',
            'مقطعة وجاهزة للاستخدام',
            'يدعم صحة الجهاز الهضمي',
            'يعزز المناعة',
            'يحسن الهضم',
            'غني بمضادات الأكسدة',
            'جودة مصرية أصيلة'
        ],
        featuresEn: [
            'Rich in dietary fiber',
            'Contains vitamin C',
            'Cut and ready to use',
            'Supports digestive system health',
            'Boosts immunity',
            'Improves digestion',
            'Rich in antioxidants',
            'Authentic Egyptian quality'
        ],
        season: 'متوفر طوال العام',
        seasonEn: 'Available all year',
        storage: 'في الفريزر لمدة 6 أشهر',
        storageEn: 'In freezer for 6 months',
        packaging: '500 جرام و 1 كجم أكياس بلاستيكية',
        packagingEn: '500g and 1kg plastic bags',
        sizes: 'مقطعة أو كاملة',
        sizesEn: 'Cut or whole',
        shipping: 'عبر النقل البحري والجوي',
        shippingEn: 'Via sea and air freight',
        exportMarkets: 'أوروبا ومنطقة الخليج',
        exportMarketsEn: 'Europe and Gulf region',
        specialNotes: 'منتج مجمد مقطع وجاهز للطبخ - مناسب للمطاعم والمنازل',
        rating: '4.6',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'بروكلي مجمد': {
        description: 'بروكلي أخضر مجمد طازج، مقطع ومحفوظ بشكل طبيعي مع الحفاظ على القيمة الغذائية',
        descriptionEn: 'Frozen green broccoli, cut and naturally preserved while maintaining nutritional value',
        category: 'خضروات مجمدة',
        categoryEn: 'Frozen Vegetables',
        image: '../images/img/Frozen Vegetables/Frozen Broccoli.jpg',
        origin: 'مصر',
        originEn: 'Egypt',
        benefits: 'غني بفيتامين C، يحتوي على فيتامين K، يدعم صحة العظام، يقوي المناعة، يحسن الهضم، غني بمضادات الأكسدة',
        benefitsEn: 'Rich in vitamin C, contains vitamin K, supports bone health, boosts immunity, improves digestion, rich in antioxidants',
        features: [
            'غني بفيتامين C',
            'يحتوي على فيتامين K',
            'مقطع وجاهز للاستخدام',
            'يدعم صحة العظام',
            'يعزز المناعة',
            'يحسن الهضم',
            'غني بمضادات الأكسدة',
            'جودة مصرية أصيلة'
        ],
        featuresEn: [
            'Rich in vitamin C',
            'Contains vitamin K',
            'Cut and ready to use',
            'Supports bone health',
            'Boosts immunity',
            'Improves digestion',
            'Rich in antioxidants',
            'Authentic Egyptian quality'
        ],
        season: 'متوفر طوال العام',
        seasonEn: 'Available all year',
        storage: 'في الفريزر لمدة 8 أشهر',
        storageEn: 'In freezer for 8 months',
        packaging: '500 جرام و 1 كجم أكياس بلاستيكية',
        packagingEn: '500g and 1kg plastic bags',
        sizes: 'زهور صغيرة',
        sizesEn: 'Small florets',
        shipping: 'عبر النقل البحري والجوي',
        shippingEn: 'Via sea and air freight',
        exportMarkets: 'أوروبا ومنطقة الخليج',
        exportMarketsEn: 'Europe and Gulf region',
        specialNotes: 'منتج مجمد مقطع وجاهز للطبخ - مناسب للمطاعم والمنازل',
        rating: '4.7',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'قرنبيط مجمد': {
        description: 'قرنبيط أبيض مجمد طازج، مقطع ومحفوظ بشكل طبيعي مع الحفاظ على القيمة الغذائية',
        descriptionEn: 'Frozen white cauliflower, cut and naturally preserved while maintaining nutritional value',
        category: 'خضروات مجمدة',
        categoryEn: 'Frozen Vegetables',
        image: '../images/img/Frozen Vegetables/Frozen Cauliflower.jpg',
        origin: 'مصر',
        originEn: 'Egypt',
        benefits: 'غني بفيتامين C، يحتوي على فيتامين K، يدعم صحة العظام، يقوي المناعة، يحسن الهضم، غني بمضادات الأكسدة',
        benefitsEn: 'Rich in vitamin C, contains vitamin K, supports bone health, boosts immunity, improves digestion, rich in antioxidants',
        features: [
            'غني بفيتامين C',
            'يحتوي على فيتامين K',
            'مقطع وجاهز للاستخدام',
            'يدعم صحة العظام',
            'يعزز المناعة',
            'يحسن الهضم',
            'غني بمضادات الأكسدة',
            'جودة مصرية أصيلة'
        ],
        featuresEn: [
            'Rich in vitamin C',
            'Contains vitamin K',
            'Cut and ready to use',
            'Supports bone health',
            'Boosts immunity',
            'Improves digestion',
            'Rich in antioxidants',
            'Authentic Egyptian quality'
        ],
        season: 'متوفر طوال العام',
        seasonEn: 'Available all year',
        storage: 'في الفريزر لمدة 8 أشهر',
        storageEn: 'In freezer for 8 months',
        packaging: '500 جرام و 1 كجم أكياس بلاستيكية',
        packagingEn: '500g and 1kg plastic bags',
        sizes: 'زهور صغيرة',
        sizesEn: 'Small florets',
        shipping: 'عبر النقل البحري والجوي',
        shippingEn: 'Via sea and air freight',
        exportMarkets: 'أوروبا ومنطقة الخليج',
        exportMarketsEn: 'Europe and Gulf region',
        specialNotes: 'منتج مجمد مقطع وجاهز للطبخ - مناسب للمطاعم والمنازل',
        rating: '4.6',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'بطاطس مجمدة': {
        description: 'بطاطس مجمدة طازجة، مقطعة ومحفوظة بشكل طبيعي مع الحفاظ على القيمة الغذائية',
        descriptionEn: 'Frozen potatoes, cut and naturally preserved while maintaining nutritional value',
        category: 'خضروات مجمدة',
        categoryEn: 'Frozen Vegetables',
        image: '../images/img/Frozen Vegetables/Frozen Potatoes.jpg',
        origin: 'مصر',
        originEn: 'Egypt',
        benefits: 'غني بالكربوهيدرات، يحتوي على فيتامين C، يدعم صحة الجهاز الهضمي، يقوي المناعة، يحسن الهضم، غني بالبوتاسيوم',
        benefitsEn: 'Rich in carbohydrates, contains vitamin C, supports digestive system health, boosts immunity, improves digestion, rich in potassium',
        features: [
            'غني بالكربوهيدرات',
            'يحتوي على فيتامين C',
            'مقطعة وجاهزة للاستخدام',
            'يدعم صحة الجهاز الهضمي',
            'يعزز المناعة',
            'يحسن الهضم',
            'غني بالبوتاسيوم',
            'جودة مصرية أصيلة'
        ],
        featuresEn: [
            'Rich in carbohydrates',
            'Contains vitamin C',
            'Cut and ready to use',
            'Supports digestive system health',
            'Boosts immunity',
            'Improves digestion',
            'Rich in potassium',
            'Authentic Egyptian quality'
        ],
        season: 'متوفر طوال العام',
        seasonEn: 'Available all year',
        storage: 'في الفريزر لمدة 10 أشهر',
        storageEn: 'In freezer for 10 months',
        packaging: '500 جرام و 1 كجم أكياس بلاستيكية',
        packagingEn: '500g and 1kg plastic bags',
        sizes: 'شرائح أو مكعبات',
        sizesEn: 'Slices or cubes',
        shipping: 'عبر النقل البحري والجوي',
        shippingEn: 'Via sea and air freight',
        exportMarkets: 'أوروبا ومنطقة الخليج',
        exportMarketsEn: 'Europe and Gulf region',
        specialNotes: 'منتج مجمد مقطع وجاهز للطبخ - مناسب للمطاعم والمنازل',
        rating: '4.8',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'بامية مجمدة': {
        description: 'بامية خضراء مجمدة طازجة، محفوظة بشكل طبيعي مع الحفاظ على القيمة الغذائية',
        descriptionEn: 'Frozen green okra, naturally preserved while maintaining nutritional value',
        category: 'خضروات مجمدة',
        categoryEn: 'Frozen Vegetables',
        image: '../images/img/Frozen Vegetables/Frozen Okra.jpg',
        origin: 'مصر',
        originEn: 'Egypt',
        benefits: 'غني بالألياف، يحتوي على فيتامين C، يدعم صحة الجهاز الهضمي، يقوي المناعة، يحسن الهضم، غني بمضادات الأكسدة',
        benefitsEn: 'Rich in fiber, contains vitamin C, supports digestive system health, boosts immunity, improves digestion, rich in antioxidants',
        features: [
            'غني بالألياف الغذائية',
            'يحتوي على فيتامين C',
            'محفوظ بشكل طبيعي',
            'يدعم صحة الجهاز الهضمي',
            'يعزز المناعة',
            'يحسن الهضم',
            'غني بمضادات الأكسدة',
            'جودة مصرية أصيلة'
        ],
        featuresEn: [
            'Rich in dietary fiber',
            'Contains vitamin C',
            'Naturally preserved',
            'Supports digestive system health',
            'Boosts immunity',
            'Improves digestion',
            'Rich in antioxidants',
            'Authentic Egyptian quality'
        ],
        season: 'متوفر طوال العام',
        seasonEn: 'Available all year',
        storage: 'في الفريزر لمدة 6 أشهر',
        storageEn: 'In freezer for 6 months',
        packaging: '500 جرام و 1 كجم أكياس بلاستيكية',
        packagingEn: '500g and 1kg plastic bags',
        sizes: 'كاملة أو مقطعة',
        sizesEn: 'Whole or cut',
        shipping: 'عبر النقل البحري والجوي',
        shippingEn: 'Via sea and air freight',
        exportMarkets: 'أوروبا ومنطقة الخليج',
        exportMarketsEn: 'Europe and Gulf region',
        specialNotes: 'منتج مجمد جاهز للاستخدام الفوري - مناسب للمطاعم والمنازل',
        rating: '4.7',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'كوسة مجمدة': {
        description: 'كوسة خضراء مجمدة طازجة، مقطعة ومحفوظة بشكل طبيعي مع الحفاظ على القيمة الغذائية',
        descriptionEn: 'Frozen green zucchini, cut and naturally preserved while maintaining nutritional value',
        category: 'خضروات مجمدة',
        categoryEn: 'Frozen Vegetables',
        image: '../images/img/Frozen Vegetables/Zucchini.jpg',
        origin: 'مصر',
        originEn: 'Egypt',
        benefits: 'غني بفيتامين C، يحتوي على فيتامين A، يدعم صحة العين، يقوي المناعة، يحسن الهضم، غني بمضادات الأكسدة',
        benefitsEn: 'Rich in vitamin C, contains vitamin A, supports eye health, boosts immunity, improves digestion, rich in antioxidants',
        features: [
            'غني بفيتامين C',
            'يحتوي على فيتامين A',
            'مقطعة وجاهزة للاستخدام',
            'يدعم صحة العين',
            'يعزز المناعة',
            'يحسن الهضم',
            'غني بمضادات الأكسدة',
            'جودة مصرية أصيلة'
        ],
        featuresEn: [
            'Rich in vitamin C',
            'Contains vitamin A',
            'Cut and ready to use',
            'Supports eye health',
            'Boosts immunity',
            'Improves digestion',
            'Rich in antioxidants',
            'Authentic Egyptian quality'
        ],
        season: 'متوفر طوال العام',
        seasonEn: 'Available all year',
        storage: 'في الفريزر لمدة 6 أشهر',
        storageEn: 'In freezer for 6 months',
        packaging: '500 جرام و 1 كجم أكياس بلاستيكية',
        packagingEn: '500g and 1kg plastic bags',
        sizes: 'شرائح أو مكعبات',
        sizesEn: 'Slices or cubes',
        shipping: 'عبر النقل البحري والجوي',
        shippingEn: 'Via sea and air freight',
        exportMarkets: 'أوروبا ومنطقة الخليج',
        exportMarketsEn: 'Europe and Gulf region',
        specialNotes: 'منتج مجمد مقطع وجاهز للطبخ - مناسب للمطاعم والمنازل',
        rating: '4.6',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'جزر مجمد': {
        description: 'جزر برتقالي مجمد طازج، مقطع ومحفوظ بشكل طبيعي مع الحفاظ على القيمة الغذائية',
        descriptionEn: 'Frozen orange carrots, cut and naturally preserved while maintaining nutritional value',
        category: 'خضروات مجمدة',
        categoryEn: 'Frozen Vegetables',
        image: '../images/img/Frozen Vegetables/Frozen Carrots.jpg',
        origin: 'مصر',
        originEn: 'Egypt',
        benefits: 'غني بفيتامين A، يحتوي على بيتا كاروتين، يدعم صحة العين، يقوي المناعة، يحسن البشرة، غني بمضادات الأكسدة',
        benefitsEn: 'Rich in vitamin A, contains beta-carotene, supports eye health, boosts immunity, improves skin health, rich in antioxidants',
        features: [
            'غني بفيتامين A',
            'يحتوي على بيتا كاروتين',
            'مقطع وجاهز للاستخدام',
            'يدعم صحة العين',
            'يعزز المناعة',
            'يحسن البشرة',
            'غني بمضادات الأكسدة',
            'جودة مصرية أصيلة'
        ],
        featuresEn: [
            'Rich in vitamin A',
            'Contains beta-carotene',
            'Cut and ready to use',
            'Supports eye health',
            'Boosts immunity',
            'Improves skin health',
            'Rich in antioxidants',
            'Authentic Egyptian quality'
        ],
        season: 'متوفر طوال العام',
        seasonEn: 'Available all year',
        storage: 'في الفريزر لمدة 10 أشهر',
        storageEn: 'In freezer for 10 months',
        packaging: '500 جرام و 1 كجم أكياس بلاستيكية',
        packagingEn: '500g and 1kg plastic bags',
        sizes: 'شرائح أو مكعبات',
        sizesEn: 'Slices or cubes',
        shipping: 'عبر النقل البحري والجوي',
        shippingEn: 'Via sea and air freight',
        exportMarkets: 'أوروبا ومنطقة الخليج',
        exportMarketsEn: 'Europe and Gulf region',
        specialNotes: 'منتج مجمد مقطع وجاهز للطبخ - مناسب للمطاعم والمنازل',
        rating: '4.7',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'بازلاء خضراء مجمدة': {
        description: 'بازلاء خضراء مجمدة طازجة، محفوظة بشكل طبيعي مع الحفاظ على القيمة الغذائية',
        descriptionEn: 'Frozen green peas, naturally preserved while maintaining nutritional value',
        category: 'خضروات مجمدة',
        categoryEn: 'Frozen Vegetables',
        image: '../images/img/Frozen Vegetables/Frozen Peas.jpg',
        origin: 'مصر',
        originEn: 'Egypt',
        benefits: 'غني بالبروتين، يحتوي على فيتامين K، يدعم صحة العظام، يقوي المناعة، يحسن الهضم، غني بالألياف',
        benefitsEn: 'Rich in protein, contains vitamin K, supports bone health, boosts immunity, improves digestion, rich in fiber',
        features: [
            'غني بالبروتين',
            'يحتوي على فيتامين K',
            'محفوظ بشكل طبيعي',
            'يدعم صحة العظام',
            'يعزز المناعة',
            'يحسن الهضم',
            'غني بالألياف',
            'جودة مصرية أصيلة'
        ],
        featuresEn: [
            'Rich in protein',
            'Contains vitamin K',
            'Naturally preserved',
            'Supports bone health',
            'Boosts immunity',
            'Improves digestion',
            'Rich in fiber',
            'Authentic Egyptian quality'
        ],
        season: 'متوفر طوال العام',
        seasonEn: 'Available all year',
        storage: 'في الفريزر لمدة 12 شهراً',
        storageEn: 'In freezer for 12 months',
        packaging: '500 جرام و 1 كجم أكياس بلاستيكية',
        packagingEn: '500g and 1kg plastic bags',
        sizes: 'حبوب كاملة',
        sizesEn: 'Whole peas',
        shipping: 'عبر النقل البحري والجوي',
        shippingEn: 'Via sea and air freight',
        exportMarkets: 'أوروبا ومنطقة الخليج',
        exportMarketsEn: 'Europe and Gulf region',
        specialNotes: 'منتج مجمد جاهز للاستخدام الفوري - مناسب للمطاعم والمنازل',
        rating: '4.8',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'ذرة حلوة مجمدة': {
        description: 'ذرة حلوة صفراء مجمدة طازجة، محفوظة بشكل طبيعي مع الحفاظ على القيمة الغذائية',
        descriptionEn: 'Frozen sweet yellow corn, naturally preserved while maintaining nutritional value',
        category: 'خضروات مجمدة',
        categoryEn: 'Frozen Vegetables',
        image: '../images/img/Frozen Vegetables/Frozen Sweet Corn.jpg',
        origin: 'مصر',
        originEn: 'Egypt',
        benefits: 'غني بالكربوهيدرات، يحتوي على فيتامين B، يدعم صحة الجهاز الهضمي، يقوي المناعة، يحسن الطاقة، غني بالألياف',
        benefitsEn: 'Rich in carbohydrates, contains vitamin B, supports digestive system health, boosts immunity, improves energy, rich in fiber',
        features: [
            'غني بالكربوهيدرات',
            'يحتوي على فيتامين B',
            'محفوظ بشكل طبيعي',
            'يدعم صحة الجهاز الهضمي',
            'يعزز المناعة',
            'يحسن الطاقة',
            'غني بالألياف',
            'جودة مصرية أصيلة'
        ],
        featuresEn: [
            'Rich in carbohydrates',
            'Contains vitamin B',
            'Naturally preserved',
            'Supports digestive system health',
            'Boosts immunity',
            'Improves energy',
            'Rich in fiber',
            'Authentic Egyptian quality'
        ],
        season: 'متوفر طوال العام',
        seasonEn: 'Available all year',
        storage: 'في الفريزر لمدة 12 شهراً',
        storageEn: 'In freezer for 12 months',
        packaging: '500 جرام و 1 كجم أكياس بلاستيكية',
        packagingEn: '500g and 1kg plastic bags',
        sizes: 'حبوب كاملة',
        sizesEn: 'Whole kernels',
        shipping: 'عبر النقل البحري والجوي',
        shippingEn: 'Via sea and air freight',
        exportMarkets: 'أوروبا ومنطقة الخليج',
        exportMarketsEn: 'Europe and Gulf region',
        specialNotes: 'منتج مجمد جاهز للاستخدام الفوري - مناسب للمطاعم والمنازل',
        rating: '4.7',
        stock: 'متوفر',
        stockEn: 'Available'
    },
    'سبانخ مجمدة': {
        description: 'سبانخ خضراء مجمدة طازجة، محفوظة بشكل طبيعي مع الحفاظ على القيمة الغذائية',
        descriptionEn: 'Frozen green spinach, naturally preserved while maintaining nutritional value',
        category: 'خضروات مجمدة',
        categoryEn: 'Frozen Vegetables',
        image: '../images/img/Frozen Vegetables/Spinach.jpg',
        origin: 'مصر',
        originEn: 'Egypt',
        benefits: 'غني بالحديد، يحتوي على فيتامين K، يدعم صحة الدم، يقوي العظام، يحسن الهضم، غني بمضادات الأكسدة',
        benefitsEn: 'Rich in iron, contains vitamin K, supports blood health, strengthens bones, improves digestion, rich in antioxidants',
        features: [
            'غني بالحديد',
            'يحتوي على فيتامين K',
            'محفوظ بشكل طبيعي',
            'يدعم صحة الدم',
            'يقوي العظام',
            'يحسن الهضم',
            'غني بمضادات الأكسدة',
            'جودة مصرية أصيلة'
        ],
        featuresEn: [
            'Rich in iron',
            'Contains vitamin K',
            'Naturally preserved',
            'Supports blood health',
            'Strengthens bones',
            'Improves digestion',
            'Rich in antioxidants',
            'Authentic Egyptian quality'
        ],
        season: 'متوفر طوال العام',
        seasonEn: 'Available all year',
        storage: 'في الفريزر لمدة 8 أشهر',
        storageEn: 'In freezer for 8 months',
        packaging: '500 جرام و 1 كجم أكياس بلاستيكية',
        packagingEn: '500g and 1kg plastic bags',
        sizes: 'ورق كامل أو مقطع',
        sizesEn: 'Whole leaves or chopped',
        shipping: 'عبر النقل البحري والجوي',
        shippingEn: 'Via sea and air freight',
        exportMarkets: 'أوروبا ومنطقة الخليج',
        exportMarketsEn: 'Europe and Gulf region',
        specialNotes: 'منتج مجمد جاهز للاستخدام الفوري - مناسب للمطاعم والمنازل',
        rating: '4.6',
        stock: 'متوفر',
        stockEn: 'Available'
    }
};

// Store products globally for rendering
allProducts = products;
filteredProducts = products;

// Function to render all products by category
function renderAllProducts() {
    const fruitsGrid = document.getElementById('fruitsGrid');
    const vegetablesGrid = document.getElementById('vegetablesGrid');
    const frozenVegetablesGrid = document.getElementById('frozenVegetablesGrid');
    const herbsGrid = document.getElementById('herbsGrid');
    const nutsGrid = document.getElementById('nutsGrid');
    const legumesGrid = document.getElementById('legumesGrid');
    const spicesGrid = document.getElementById('spicesGrid');

    if (!fruitsGrid || !vegetablesGrid) return;

    // Clear existing content
    fruitsGrid.innerHTML = '';
    vegetablesGrid.innerHTML = '';
    if (frozenVegetablesGrid) frozenVegetablesGrid.innerHTML = '';
    if (herbsGrid) herbsGrid.innerHTML = '';
    if (nutsGrid) nutsGrid.innerHTML = '';
    if (legumesGrid) legumesGrid.innerHTML = '';
    if (spicesGrid) spicesGrid.innerHTML = '';

    // Render products by category
    Object.keys(products).forEach((productName, index) => {
        const product = products[productName];
        const card = createProductCard(productName, product, index);

        if (product.category === 'فواكه') {
            fruitsGrid.appendChild(card);
        } else if (product.category === 'خضروات') {
            vegetablesGrid.appendChild(card);
        } else if (product.category === 'خضروات مجمدة') {
            if (frozenVegetablesGrid) frozenVegetablesGrid.appendChild(card);
        } else if (product.category === 'أعشاب') {
            if (herbsGrid) herbsGrid.appendChild(card);
        } else if (product.category === 'مكسرات') {
            if (nutsGrid) nutsGrid.appendChild(card);
        } else if (product.category === 'بقوليات وحبوب') {
            if (legumesGrid) legumesGrid.appendChild(card);
        } else if (product.category === 'توابل وبهارات') {
            if (spicesGrid) spicesGrid.appendChild(card);
        }
    });

    // Reinitialize AOS for new elements
    if (window.AOS) {
        AOS.refresh();
    }
}

// Function to create a single product card
function createProductCard(productName, product, index) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', (50 * (index % 5)).toString());
    card.setAttribute('data-product-name', productName);

    const availableText = i18n ? i18n.getTranslation('products.available') : 'متوفر';
    const viewDetailsText = i18n ? i18n.getTranslation('products.viewDetails') : 'عرض التفاصيل';
    const imageUrl = product.image || 'https://via.placeholder.com/300x300?text=' + productName;

    // Get translated description and product name for card
    const currentLang = i18n ? i18n.currentLanguage : 'ar';
    const cardDescription = currentLang === 'en' ? (product.descriptionEn || product.description) : product.description;
    const displayProductName = currentLang === 'en' ? (i18n ? i18n.getTranslation(`products.${productName}`) : productName) : productName;

    card.innerHTML = `
            <div class="product-badge" data-i18n="products.available">${availableText}</div>
            <div class="product-image">
                <img src="${imageUrl}" alt="${productName}" onerror="this.src='https://via.placeholder.com/300x300?text=${productName}'">
                <div class="product-overlay">
                    <button class="btn btn-primary" onclick="openProductModal('${productName}')" data-i18n="products.viewDetails">${viewDetailsText}</button>
                </div>
            </div>
            <div class="product-details">
                <h3>${displayProductName}</h3>
                <div class="product-description">
                    <p>${cardDescription}</p>
                </div>
            </div>
        `;

    return card;
}

// Setup search functionality
function setupSearchFunctionality() {
    const searchInput = document.getElementById('productSearch');
    const searchClear = document.getElementById('searchClear');

    if (!searchInput) return;

    searchInput.addEventListener('input', function (e) {
        const searchTerm = e.target.value.trim().toLowerCase();
        currentFilters.search = searchTerm;

        // Show/hide clear button
        if (searchClear) {
            searchClear.style.display = searchTerm ? 'block' : 'none';
        }

        applyAllFilters();
    });

    if (searchClear) {
        searchClear.addEventListener('click', function () {
            searchInput.value = '';
            searchClear.style.display = 'none';
            currentFilters.search = '';
            applyAllFilters();
        });
    }
}

// Setup filter functionality
function setupFilterFunctionality() {
    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function (e) {
            currentFilters.category = e.target.value;
            applyAllFilters();
        });
    }

    // Reset filters button
    const resetBtn = document.getElementById('resetFiltersBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            resetAllFilters();
        });
    }
}

// Apply all filters combined
function applyAllFilters() {
    const filtered = {};

    Object.keys(allProducts).forEach(productName => {
        const product = allProducts[productName];
        let matches = true;

        // Search filter
        if (currentFilters.search) {
            const searchFields = [
                productName,
                product.description,
                product.category,
                product.origin,
                product.benefits,
                (product.features || []).join(' ')
            ].join(' ').toLowerCase();

            if (!searchFields.includes(currentFilters.search)) {
                matches = false;
            }
        }

        // Category filter
        if (matches && currentFilters.category) {
            if (product.category !== currentFilters.category) {
                matches = false;
            }
        }

        // Season filter
        if (matches && currentFilters.season !== 'all') {
            const productSeason = (product.season || '').toLowerCase();
            const filterSeason = currentFilters.season.toLowerCase();
            if (!productSeason.includes(filterSeason)) {
                matches = false;
            }
        }

        if (matches) {
            filtered[productName] = product;
        }
    });

    renderFilteredProducts(filtered);
}

// Global filter functions
window.filterBySeason = function (season) {
    currentFilters.season = season;

    // Update button states
    document.querySelectorAll('[data-season]').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-season="${season}"]`).classList.add('active');

    applyAllFilters();
};

// Reset all filters
function resetAllFilters() {
    currentFilters = {
        search: '',
        category: '',
        season: 'all'
    };

    // Reset UI
    const searchInput = document.getElementById('productSearch');
    if (searchInput) searchInput.value = '';

    const searchClear = document.getElementById('searchClear');
    if (searchClear) searchClear.style.display = 'none';

    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) categoryFilter.value = '';

    // Reset button states
    document.querySelectorAll('[data-season]').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('[data-season="all"]').classList.add('active');

    renderAllProducts();
}

// Render filtered products
function renderFilteredProducts(filtered) {
    const fruitsGrid = document.getElementById('fruitsGrid');
    const vegetablesGrid = document.getElementById('vegetablesGrid');
    const herbsGrid = document.getElementById('herbsGrid');
    const nutsGrid = document.getElementById('nutsGrid');
    const legumesGrid = document.getElementById('legumesGrid');
    const spicesGrid = document.getElementById('spicesGrid');

    if (!fruitsGrid || !vegetablesGrid || !herbsGrid) return;

    fruitsGrid.innerHTML = '';
    vegetablesGrid.innerHTML = '';
    herbsGrid.innerHTML = '';
    if (nutsGrid) nutsGrid.innerHTML = '';
    if (legumesGrid) legumesGrid.innerHTML = '';
    if (spicesGrid) spicesGrid.innerHTML = '';

    let hasResults = false;

    Object.keys(filtered).forEach((productName, index) => {
        const product = filtered[productName];
        const card = createProductCard(productName, product, index);
        hasResults = true;

        if (product.category === 'فواكه') {
            fruitsGrid.appendChild(card);
        } else if (product.category === 'خضروات') {
            vegetablesGrid.appendChild(card);
        } else if (product.category === 'أعشاب') {
            herbsGrid.appendChild(card);
        } else if (product.category === 'مكسرات') {
            if (nutsGrid) nutsGrid.appendChild(card);
        } else if (product.category === 'بقوليات وحبوب') {
            if (legumesGrid) legumesGrid.appendChild(card);
        } else if (product.category === 'توابل وبهارات') {
            if (spicesGrid) spicesGrid.appendChild(card);
        }
    });

    // Show "no results" message if needed
    if (!hasResults) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        const noResultsText = i18n ? i18n.getTranslation('products.noResults') : 'لم يتم العثور على نتائج';
        noResults.innerHTML = `<p>${noResultsText}</p>`;
        fruitsGrid.appendChild(noResults);
    }

    if (window.AOS) {
        AOS.refresh();
    }
}

// Global function to open product modal
window.openProductModal = function (productName) {
    const product = allProducts[productName];
    if (!product) return;

    const modal = document.getElementById('productModal');
    if (!modal) return;

    // Populate modal with product data
    const currentLang = i18n ? i18n.currentLanguage : 'ar';
    const displayProductName = currentLang === 'en' ? (i18n ? i18n.getTranslation(`products.${productName}`) : productName) : productName;
    document.getElementById('modalProductName').textContent = displayProductName;

    // Get translated description
    let translatedDesc;
    const descKey = productName + '_desc';
    if (currentLang === 'en') {
        // Try to get English translation from i18n first
        translatedDesc = i18n ? i18n.getTranslation('products.' + descKey) : product.descriptionEn;
        // If not found in i18n, use product.descriptionEn
        if (translatedDesc === 'products.' + descKey) {
            translatedDesc = product.descriptionEn || product.description;
        }
    } else {
        // For Arabic, get from i18n translations
        translatedDesc = i18n ? i18n.getTranslation('products.' + descKey) : product.description;
        // If translation not found, use the Arabic description from product data
        if (translatedDesc === 'products.' + descKey) {
            translatedDesc = product.description;
        }
    }
    document.getElementById('modalProductDescription').textContent = translatedDesc || product.description;

    const categoryText = currentLang === 'en' ? (product.categoryEn || product.category) : product.category;
    document.getElementById('modalProductCategory').textContent = categoryText;
    const notSpecified = i18n ? i18n.getTranslation('products.notSpecified') : 'غير محدد';
    const availableAllYear = i18n ? i18n.getTranslation('products.availableAllYear') : 'متوفر طوال العام';

    const originText = currentLang === 'en' ? (product.originEn || product.origin) : product.origin;
    document.getElementById('modalProductOrigin').textContent = originText || notSpecified;

    const seasonText = currentLang === 'en' ? (product.seasonEn || product.season) : product.season;
    document.getElementById('modalProductSeason').textContent = seasonText || availableAllYear;

    const storageText = currentLang === 'en' ? (product.storageEn || product.storage) : product.storage;
    document.getElementById('modalProductStorage').textContent = storageText || notSpecified;

    const benefitsText = currentLang === 'en' ? (product.benefitsEn || product.benefits) : product.benefits;
    document.getElementById('modalProductBenefits').textContent = benefitsText || notSpecified;

    // Handle features
    const featuresToDisplay = currentLang === 'en' ? (product.featuresEn || product.features) : product.features;
    if (featuresToDisplay && featuresToDisplay.length > 0) {
        document.getElementById('modalProductFeatures').innerHTML = featuresToDisplay
            .map(f => `<div style="margin: 5px 0;">• ${f}</div>`)
            .join('');
    }

    // Handle varieties
    if (product.varieties) {
        const varietiesText = currentLang === 'en' ? (product.varietiesEn || product.varieties) : product.varieties;
        document.getElementById('modalProductVarieties').textContent = varietiesText;
        document.getElementById('varietiesItem').style.display = 'block';
    } else {
        document.getElementById('varietiesItem').style.display = 'none';
    }

    // Handle sizes
    if (product.sizes) {
        const sizesText = currentLang === 'en' ? (product.sizesEn || product.sizes) : product.sizes;
        document.getElementById('modalProductSizes').textContent = sizesText;
        document.getElementById('sizesItem').style.display = 'flex';
    } else {
        document.getElementById('sizesItem').style.display = 'none';
    }

    // Handle packaging
    if (product.packaging) {
        const packagingText = currentLang === 'en' ? (product.packagingEn || product.packaging) : product.packaging;
        document.getElementById('packagingItem').style.display = 'flex';
        document.getElementById('modalProductPackaging').textContent = packagingText;
    } else {
        document.getElementById('packagingItem').style.display = 'none';
    }

    // Handle shipping
    if (product.shipping) {
        const shippingText = currentLang === 'en' ? (product.shippingEn || product.shipping) : product.shipping;
        document.getElementById('shippingItem').style.display = 'flex';
        document.getElementById('modalProductShipping').textContent = shippingText;
    } else {
        document.getElementById('shippingItem').style.display = 'none';
    }

    // Handle export markets
    if (product.exportMarkets) {
        const exportMarketsText = currentLang === 'en' ? (product.exportMarketsEn || product.exportMarkets) : product.exportMarkets;
        document.getElementById('exportItem').style.display = 'flex';
        document.getElementById('modalProductExportMarkets').textContent = exportMarketsText;
    } else {
        document.getElementById('exportItem').style.display = 'none';
    }

    // Handle stock
    const stockElement = document.getElementById('modalProductStock');
    const inStock = i18n ? i18n.getTranslation('products.inStock') : 'متوفر';
    const outOfStock = i18n ? i18n.getTranslation('products.outOfStock') : 'غير متوفر';
    if (product.stock === 'متوفر') {
        stockElement.className = 'stock-available';
        stockElement.textContent = inStock;
    } else {
        stockElement.className = 'stock-unavailable';
        stockElement.textContent = outOfStock;
    }

    // Show modal
    modal.classList.add('show');
};

// Function to create product cards dynamically
function createProductCards() {
    const productsContainer = document.querySelector('.products-grid');
    if (!productsContainer) return;

    // Get existing product names to avoid duplicates
    const existingProducts = Array.from(document.querySelectorAll('.product-card h3')).map(h3 => h3.textContent.trim());

    Object.keys(products).forEach(productName => {
        // Skip if product already exists in HTML
        if (existingProducts.includes(productName)) return;

        const product = products[productName];
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-aos', 'fade-up');

        card.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${productName}">
                    <div class="product-overlay">
                        <button class="btn btn-primary">عرض التفاصيل</button>
                    </div>
                </div>
                <div class="product-details">
                    <h3>${productName}</h3>
                    <div class="product-description">
                        <p>${product.description}</p>
                    </div>
                </div>
            `;

        productsContainer.appendChild(card);
    });
}



// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Function to reload product cards when language changes
function reloadProductCards() {
    // Clear all product grids
    const fruitsGrid = document.getElementById('fruitsGrid');
    const vegetablesGrid = document.getElementById('vegetablesGrid');
    const herbsGrid = document.getElementById('herbsGrid');

    if (fruitsGrid) fruitsGrid.innerHTML = '';
    if (vegetablesGrid) vegetablesGrid.innerHTML = '';
    if (herbsGrid) herbsGrid.innerHTML = '';

    // Re-render all products with new language
    renderAllProducts();
}

// Function to translate page content when language changes
function translatePage() {
    // Translate all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (i18n) {
            const translation = i18n.getTranslation(key);
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = translation;
            } else {
                // For elements with child nodes (like buttons with icons)
                let hasChildElements = element.children.length > 0;
                if (hasChildElements) {
                    // Find text node and update it
                    for (let node of element.childNodes) {
                        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                            node.textContent = translation;
                            break;
                        }
                    }
                } else {
                    element.textContent = translation;
                }
            }
        }
    });

    // Re-render products to update badges and buttons
    reloadProductCards();
}

// ============ Initialize Everything ============
document.addEventListener('DOMContentLoaded', function () {
    // Store products globally
    allProducts = products;
    filteredProducts = products;

    // Render all products
    renderAllProducts();

    // Setup search and filters
    setupSearchFunctionality();
    setupFilterFunctionality();

    // Setup modal
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.close-modal');

    if (modal && closeBtn) {
        closeBtn.addEventListener('click', function () {
            modal.classList.remove('show');
        });

        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
});
