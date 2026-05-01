document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
    
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
    
            if (name === '' || email === '' || message === '') {
                formStatus.textContent = 'الرجاء تعبئة جميع الحقول.';
                formStatus.style.color = 'red';
            } else {
                // Here you would typically send the form data to a server
                formStatus.textContent = 'شكراً لك! تم استلام رسالتك بنجاح.';
                formStatus.style.color = 'green';
                contactForm.reset();
            }
        });
    }

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // Close other open items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
});