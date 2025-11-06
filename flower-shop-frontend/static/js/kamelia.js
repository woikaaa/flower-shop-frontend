document.addEventListener('DOMContentLoaded', function() {
    // Активация бургер-меню для мобильной версии
    var navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            var navbarNavElement = document.getElementById('navbarNav');
            if (navbarNavElement) {
                // Toggle класса show
                if (navbarNavElement.classList.contains('show')) {
                    navbarNavElement.classList.remove('show');
                } else {
                    navbarNavElement.classList.add('show');
                }
            }
        });
    }

    // Активация карусели на главной странице
    var carousel = document.getElementById('carouselExampleCaptions');
    if (carousel) {
        var carouselInstance = new bootstrap.Carousel(carousel, {
            interval: 5000, // Интервал между слайдами в миллисекундах
            wrap: true      // Циклическое прокручивание
        });

        // Добавление обработчиков для кнопок управления карусели
        var prevButton = document.querySelector('.carousel-control-prev');
        var nextButton = document.querySelector('.carousel-control-next');
        
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                carouselInstance.prev();
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                carouselInstance.next();
            });
        }
    }

    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            
            // Проверка на пустой якорь или якорь для самой страницы
            if (href === '#' || href === '#!') {
                return;
            }
            
            try {
                var target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            } catch (error) {
                // Если селектор неверный, ничего не делаем
                console.error("Invalid selector:", error);
            }
        });
    });

    // Активация scrollspy для страницы с магазинами
    var storesList = document.getElementById('list-example');
    if (storesList) {
        var scrollContainer = document.querySelector('.scrollspy-example');
        if (scrollContainer) {
            var scrollSpy = new bootstrap.ScrollSpy(scrollContainer, {
                target: '#list-example'
            });
        }
    }

    // Кнопка прокрутки наверх
    var scrollTopButton = document.createElement('button');
    scrollTopButton.id = 'scrollTopBtn';
    scrollTopButton.innerHTML = '&uarr;';
    scrollTopButton.className = 'scroll-top-btn';
    scrollTopButton.setAttribute('aria-label', 'Прокрутка наверх');
    scrollTopButton.setAttribute('title', 'Наверх');
    
    // Добавляем стили для кнопки
    var style = document.createElement('style');
    style.textContent = `
        .scroll-top-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: rgb(235, 117, 201);
            color: white;
            border: none;
            font-size: 24px;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s, background-color 0.3s;
            z-index: 1000;
            display: none;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
        
        .scroll-top-btn:hover {
            background-color: rgb(196, 88, 189);
        }
        
        .scroll-top-btn.visible {
            opacity: 0.8;
            display: block;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(scrollTopButton);
    
    // Показать/скрыть кнопку при прокрутке
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });
    
    // Обработчик клика - прокрутка наверх
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Анимация элементов при прокрутке
    function animateOnScroll() {
        var animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        animatedElements.forEach(function(element) {
            var position = element.getBoundingClientRect();
            
            // Если элемент виден в окне браузера
            if(position.top < window.innerHeight && position.bottom >= 0) {
                element.classList.add('animated');
            }
        });
    }
    
    // Анимация при загрузке и прокрутке
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    // Добавление класса для мобильных устройств
    function checkMobileView() {
        if (window.innerWidth < 992) {
            document.body.classList.add('mobile-view');
        } else {
            document.body.classList.remove('mobile-view');
        }
    }
    
    window.addEventListener('resize', checkMobileView);
    checkMobileView();
    
    // Улучшение работы с каруселью на мобильных устройствах
    var carouselItems = document.querySelectorAll('.carousel-item');
    
    carouselItems.forEach(function(item) {
        var minPerSlide = 3;
        var next = item.nextElementSibling;
        
        if (!next) {
            next = item.parentNode.firstElementChild;
        }
        
        item.appendChild(next.firstElementChild.cloneNode(true));
        
        for (var i = 0; i < minPerSlide; i++) {
            if (!next) {
                next = item.parentNode.firstElementChild;
            }
            
            if (next) {
                next = next.nextElementSibling;
            }
        }
    });
    
    // Обработка форм на сайте
    var forms = document.querySelectorAll('form');
    
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            var requiredFields = form.querySelectorAll('[required]');
            var isValid = true;
            
            requiredFields.forEach(function(field) {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Пожалуйста, заполните все обязательные поля.');
            }
        });
    });
});