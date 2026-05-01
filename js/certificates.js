// Certificates Data
const certificatesData = [
    {
        id: 1,
        name: 'GLOBALG.A.P',
        nameEn: 'GLOBALG.A.P',
        year: 2020,
        issuer: 'GLOBALG.A.P Organization',
        issuerEn: 'GLOBALG.A.P Organization',
        field: 'الممارسات الزراعية الجيدة',
        fieldEn: 'Good Agricultural Practices',
        description: 'شهادة الممارسات الزراعية الجيدة العالمية التي تضمن سلامة الغذاء والاستدامة البيئية والمسؤولية الاجتماعية في الإنتاج الزراعي.',
        descriptionEn: 'Global Good Agricultural Practices certificate that ensures food safety, environmental sustainability, and social responsibility in agricultural production.',
        image: '../images/Certificate/GLOBALG.A.P.jpeg',
        details: 'تغطي هذه الشهادة جميع جوانب الإنتاج الزراعي من البذور إلى المحصول النهائي، مع التركيز على السلامة الغذائية والممارسات المستدامة.',
        detailsEn: 'This certificate covers all aspects of agricultural production from seeds to final harvest, with emphasis on food safety and sustainable practices.'
    },
    {
        id: 2,
        name: 'GRASP',
        nameEn: 'GRASP',
        year: 2021,
        issuer: 'GLOBALG.A.P Organization',
        issuerEn: 'GLOBALG.A.P Organization',
        field: 'المسؤولية الاجتماعية',
        fieldEn: 'Social Responsibility',
        description: 'شهادة المسؤولية الاجتماعية والممارسات الأخلاقية في الإنتاج الزراعي، تركز على حقوق العمال والصحة والسلامة.',
        descriptionEn: 'Social responsibility and ethical practices certificate in agricultural production, focusing on worker rights, health, and safety.',
        image: '../images/Certificate/GRASP.jpeg',
        details: 'تضمن هذه الشهادة الالتزام بمعايير العمل الدولية وحقوق الموظفين والممارسات الأخلاقية في جميع عمليات الإنتاج.',
        detailsEn: 'This certificate ensures compliance with international labor standards, employee rights, and ethical practices in all production processes.'
    },
    {
        id: 3,
        name: 'ISO Certificate',
        nameEn: 'ISO Certificate',
        year: 2019,
        issuer: 'International Organization for Standardization',
        issuerEn: 'International Organization for Standardization',
        field: 'إدارة الجودة',
        fieldEn: 'Quality Management',
        description: 'شهادة ISO 9001 لنظام إدارة الجودة، تضمن الالتزام بمعايير الجودة الدولية في جميع العمليات.',
        descriptionEn: 'ISO 9001 Quality Management System certificate, ensuring compliance with international quality standards in all processes.',
        image: '../images/Certificate/ISO Certificate.jpeg',
        details: 'تغطي هذه الشهادة جميع جوانب إدارة الجودة من التخطيط إلى التنفيذ والمراقبة والتحسين المستمر.',
        detailsEn: 'This certificate covers all aspects of quality management from planning to implementation, monitoring, and continuous improvement.'
    },
    {
        id: 4,
        name: 'SMETA',
        nameEn: 'SMETA',
        year: 2022,
        issuer: 'Sedex',
        issuerEn: 'Sedex',
        field: 'المراجعة الأخلاقية',
        fieldEn: 'Ethical Audit',
        description: 'شهادة المراجعة الأخلاقية والاجتماعية والبيئية، تضمن الالتزام بمعايير العمل الدولية والممارسات المستدامة.',
        descriptionEn: 'Ethical, social, and environmental audit certificate, ensuring compliance with international labor standards and sustainable practices.',
        image: '../images/Certificate/SMETA.jpeg',
        details: 'تركز على تقييم الممارسات الأخلاقية والاجتماعية والبيئية في جميع عمليات الإنتاج والتوزيع.',
        detailsEn: 'Focuses on assessing ethical, social, and environmental practices in all production and distribution processes.'
    },
    {
        id: 5,
        name: 'Sedex',
        nameEn: 'Sedex',
        year: 2020,
        issuer: 'Sedex Members Ethical Trade Audit',
        issuerEn: 'Sedex Members Ethical Trade Audit',
        field: 'التجارة الأخلاقية',
        fieldEn: 'Ethical Trade',
        description: 'شهادة التجارة الأخلاقية التي تضمن الالتزام بمعايير العمل الدولية والممارسات المسؤولة في سلسلة التوريد.',
        descriptionEn: 'Ethical trade certificate ensuring compliance with international labor standards and responsible practices in the supply chain.',
        image: '../images/Certificate/Sedex.jpeg',
        details: 'تضمن هذه الشهادة أن جميع الممارسات التجارية تتوافق مع المعايير الأخلاقية الدولية والقوانين المحلية.',
        detailsEn: 'This certificate ensures that all business practices comply with international ethical standards and local laws.'
    }
];

// Initialize certificates when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    renderCertificates();
    setupEventListeners();
    AOS.init();
});

// Render certificates grid
function renderCertificates() {
    const grid = document.getElementById('certificatesGrid');
    const currentLang = document.documentElement.lang || 'ar';
    
    grid.innerHTML = certificatesData.map(cert => {
        const name = currentLang === 'en' ? cert.nameEn : cert.name;
        const description = currentLang === 'en' ? cert.descriptionEn : cert.description;
        const issuer = currentLang === 'en' ? cert.issuerEn : cert.issuer;
        const yearLabel = currentLang === 'en' ? 'Year Obtained:' : 'سنة الحصول:';
        const viewBtnText = currentLang === 'en' ? 'View Details' : 'عرض التفاصيل';
        
        return `
        <div class="certificate-card" data-aos="fade-up" data-aos-delay="${cert.id * 100}">
            <div class="certificate-image">
                <img src="${cert.image}" alt="${name}">
                <div class="certificate-badge">${cert.year}</div>
            </div>
            <div class="certificate-content">
                <h3 class="certificate-title">${name}</h3>
                <div class="certificate-year">
                    <i class="fas fa-calendar"></i>
                    ${yearLabel} ${cert.year}
                </div>
                <p class="certificate-description">${description}</p>
                <div class="certificate-footer">
                    <span class="certificate-issuer">${issuer}</span>
                    <button class="view-btn" onclick="openCertificateModal(${cert.id})">
                        ${viewBtnText}
                    </button>
                </div>
            </div>
        </div>
    `;
    }).join('');
}

// Open certificate modal
function openCertificateModal(certificateId) {
    const certificate = certificatesData.find(c => c.id === certificateId);
    const currentLang = document.documentElement.lang || 'ar';
    
    if (!certificate) return;
    
    const name = currentLang === 'en' ? certificate.nameEn : certificate.name;
    const details = currentLang === 'en' ? certificate.detailsEn : certificate.details;
    const issuer = currentLang === 'en' ? certificate.issuerEn : certificate.issuer;
    const field = currentLang === 'en' ? certificate.fieldEn : certificate.field;
    
    document.getElementById('modalImage').src = certificate.image;
    document.getElementById('modalTitle').textContent = name;
    document.getElementById('modalDescription').textContent = details;
    document.getElementById('modalYear').textContent = certificate.year;
    document.getElementById('modalIssuer').textContent = issuer;
    document.getElementById('modalField').textContent = field;
    
    const modal = document.getElementById('certificateModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close certificate modal
function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Setup event listeners
function setupEventListeners() {
    // Close modal when clicking outside
    document.getElementById('certificateModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeCertificateModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCertificateModal();
        }
    });
}

// Back to top button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Function to reload certificates when language changes
function reloadCertificates() {
    renderCertificates();
}
