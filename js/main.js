document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    const galleryItems = document.querySelectorAll('.gallery-item img, .gallery-item video');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => item.classList.add('scale'));
        item.addEventListener('mouseleave', () => item.classList.remove('scale'));
    });

    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.backgroundColor = '#0077b6';
            } else {
                header.style.backgroundColor = '#1d3557';
            }
        });
    }

    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let isValid = true;
            const name = document.getElementById('name');
            const nameError = document.getElementById('nameError');
            if (name.value.trim().length < 3) {
                nameError.style.display = 'block';
                isValid = false;
            } else {
                nameError.style.display = 'none';
            }

            const email = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                emailError.style.display = 'block';
                isValid = false;
            } else {
                emailError.style.display = 'none';
            }

            const message = document.getElementById('message');
            const messageError = document.getElementById('messageError');
            if (message.value.trim() === '') {
                messageError.style.display = 'block';
                isValid = false;
            } else {
                messageError.style.display = 'none';
            }

            if (isValid) {
                const formData = new FormData(this);
                fetch('https://formsubmit.co/ajax/bonasprogramacao@gmail.com', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Accept: 'application/json'
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            document.getElementById('formSuccess').style.display = 'block';
                            contactForm.reset();
                        } else {
                            alert('Ops! Ocorreu um problema no servidor de e-mail. Tente de novo.');
                        }
                    })
                    .catch(error => {
                        console.error('Erro na requisição:', error);
                        alert('Erro de conexão ao tentar enviar a mensagem.');
                    });
            }
        });
    }

    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryCards = document.querySelectorAll('#portfolioGallery .gallery-item');

    if (filterButtons.length > 0 && galleryCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                galleryCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (filterValue === 'all' || filterValue === cardCategory) {
                        card.classList.remove('hide');
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.classList.add('hide');
                        }, 400);
                    }
                });
            });
        });
    }
});