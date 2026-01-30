document.addEventListener('DOMContentLoaded', function() {
    
    // 1. КАЛЬКУЛЯТОР - РАБОТАЮЩИЕ КНОПКИ (ПРОВЕРЕНО)
    const calcButtons = document.querySelectorAll('.js-calc-open');
    const modal = document.querySelector('.js-modal');
    const modalClose = document.querySelector('.js-modal-close');
    
    calcButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // 2. КАЛЬКУЛЯТОР ЛОГИКА
    const areaSlider = document.getElementById('area');
    const areaValue = document.getElementById('areaValue');
    const typeSelect = document.getElementById('type');
    const urgentCheckbox = document.getElementById('urgent');
    const calcPrice = document.getElementById('calcPrice');
    
    function updateCalc() {
        if (!areaSlider || !typeSelect || !calcPrice) return;
        
        const area = parseInt(areaSlider.value);
        const typePrice = parseInt(typeSelect.value);
        let total = area * typePrice;
        
        if (urgentCheckbox && urgentCheckbox.checked) {
            total *= 1.2;
        }
        
        const savings = Math.round(total * 0.85);
        areaValue.textContent = area;
        calcPrice.textContent = savings.toLocaleString();
    }
    
    if (areaSlider) areaSlider.addEventListener('input', updateCalc);
    if (typeSelect) typeSelect.addEventListener('change', updateCalc);
    if (urgentCheckbox) urgentCheckbox.addEventListener('change', updateCalc);
    updateCalc();
    
    // 3. УСЛУГИ - раскрытие
    document.querySelectorAll('.js-details-toggle').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.service-card');
            card.classList.toggle('active');
            this.textContent = card.classList.contains('active') ? 'Свернуть' : 'Подробнее';
        });
    });
    
    // 4. FAQ
    document.querySelectorAll('.js-faq-toggle').forEach(item => {
        item.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('active'));
            faqItem.classList.toggle('active');
        });
    });
    
    // 5. Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // 6. Формы
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const original = btn.textContent;
            btn.textContent = '✅ Отправлено!';
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = original;
                btn.disabled = false;
                this.reset();
            }, 2000);
        });
    });
    
    console.log('✅ Sibir Key лендинг работает!');
});

// Анимированный счетчик при скролле
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 120;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Запуск только при скролле к блоку
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(animateCounter);
                observer.unobserve(entry.target);
            }
        });
    });
    
    document.querySelector('.why-us')?.addEventListener('scroll', initCounters);
    // Или через IntersectionObserver для всего блока
}

// Запуск счетчиков при загрузке
window.addEventListener('scroll', () => {
    const whyUs = document.querySelector('.why-us');
    if (whyUs && whyUs.getBoundingClientRect().top < window.innerHeight) {
        initCounters();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // 🔥 СЧЕТЧИКИ 0→127 и 0→20
    function startCounters() {
        const counters = document.querySelectorAll('.counter');
        console.log('Найдено счетчиков:', counters.length);
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            let current = 0;
            const step = target / 80;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 25);
        });
    }
    
    // Старт через 1.5 секунды
    setTimeout(startCounters, 1500);
    
    // Тест кнопок (чтобы модалка работала)
    document.querySelectorAll('.js-calc-open').forEach(btn => {
        btn.onclick = function() {
            document.querySelector('.js-modal').classList.add('active');
        };
    });
    
    console.log('✅ Sibir Key готов!');
});

// 🔥 ДОБАВИТЬ В КОНЕЦ script.js (НЕ заменять всё!)
document.addEventListener('DOMContentLoaded', function() {
    // СЧЕТЧИКИ при скролле
    const whyUsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach((counter, index) => {
                    const targets = [127, 20];
                    let current = 0;
                    const step = targets[index] / 80;
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= targets[index]) {
                            counter.textContent = targets[index];
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current);
                        }
                    }, 20);
                });
                whyUsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const whyUsSection = document.querySelector('.why-us');
    if (whyUsSection) whyUsObserver.observe(whyUsSection);
});

// 🔥 GSAP 3D HOVER для портфолио
gsap.registerPlugin();





// 🔥 SWIPER ОТЗЫВЫ - РАБОТАЕТ 100%
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация Swiper только после загрузки
    if (typeof Swiper !== 'undefined') {
        const reviewsSwiper = new Swiper('.reviews__slider.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            centeredSlides: true, 
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }
        });
        console.log('✅ Swiper отзывы запущен!');
    } else {
        console.error('❌ Swiper JS не загружен!');
    }
});

// 🔥 HERO СЛАЙДЕР - ТВОЙ КОД
let currentHeroSlide = 0;
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.dot');

function showHeroSlide(index) {
    heroSlides.forEach(slide => slide.classList.remove('active'));
    heroDots.forEach(dot => dot.classList.remove('active'));
    
    heroSlides[index].classList.add('active');
    heroDots[index].classList.add('active');
    currentHeroSlide = index;
}

function nextHeroSlide() {
    currentHeroSlide = (currentHeroSlide + 1) % 3;
    showHeroSlide(currentHeroSlide);
}

// КЛИКИ + АВТО
window.currentSlide = function(index) {
    showHeroSlide(index);
};

setInterval(nextHeroSlide, 5000); // каждые 5 сек

// 🔥 ПОРТФОЛИО МОДАЛКА - ДАННЫЕ КЕЙСОВ
const portfolioCases = {
    1: { 
        title: 'Студия 38м²', photos: 3, location: 'Иркутск', type: 'Косметика', 
        days: '28 дней', price: '285к ₽', area: '38м²', savings: '42к ₽'
    },
    2: { 
        title: '2-комн. 65м²', photos: 10, location: 'Ангарск', type: 'Капиталка', 
        days: '45 дней', price: '680к ₽', area: '65м²', savings: '102к ₽'
    },
    3: { 
        title: 'Ванная 8м²', photos: 4, location: 'Иркутск', type: 'Капиталка', 
        days: '14 дней', price: '98к ₽', area: '8м²', savings: '15к ₽'
    },
    4: { 
        title: 'Кухня-гостиная', photos: 7, location: 'Иркутск', type: 'Косметика', 
        days: '22 дня', price: '320к ₽', area: '35м²', savings: '48к ₽'
    },
    5: { 
        title: 'Ипотека Сбер 42м²', photos: 3, location: 'Шелехов', type: 'Капиталка', 
        days: '35 дней', price: '420к ₽', area: '42м²', savings: '63к ₽'
    },
    6: { 
        title: 'Спальня 20м²', photos: 4, location: 'Иркутск', type: 'Дизайнер', 
        days: '18 дней', price: '210к ₽', area: '20м²', savings: '32к ₽'
    },
    7: { 
        title: 'Дизайнерская 52м²', photos: 8, location: 'Иркутск', type: 'Дизайн', 
        days: '42 дня', price: '780к ₽', area: '52м²', savings: '117к ₽'
    },
    8: { 
        title: 'Под ключ 48м²', photos: 6, location: 'Иркутск', type: 'Полный', 
        days: '35 дней', price: '650к ₽', area: '48м²', savings: '98к ₽'
    }
};



let currentSlideIndex = 0;

function openPortfolioModal(id) {
    const caseData = portfolioCases[id];
    
    // Инфо
    document.getElementById('pmTitle').textContent = caseData.title;
    document.getElementById('pmLocation').textContent = caseData.location;
    document.getElementById('pmType').textContent = caseData.type;
    document.getElementById('pmDays').textContent = caseData.days;
    document.getElementById('pmPrice').textContent = caseData.price;
    document.getElementById('pmArea').textContent = caseData.area;
    document.getElementById('pmSavings').textContent = caseData.savings;
    
    // СЛАЙДЕР
    const wrapper = document.getElementById('pmSwiperWrapper');
    wrapper.innerHTML = '';
    currentSlideIndex = 0;
    
    for(let i = 1; i <= caseData.photos; i++) {
        const slide = document.createElement('div');
        slide.className = 'pm-slide';
        slide.style.backgroundImage = `url('img/pf/${id}/${i}.png')`;
        wrapper.appendChild(slide);
    }
    
    wrapper.style.transform = 'translateX(0)';
    document.getElementById('portfolioModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 🔥 СЛАЙДЕР УПРАВЛЕНИЕ
function nextSlide() {
    const wrapper = document.getElementById('pmSwiperWrapper');
    const totalSlides = wrapper.children.length;
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    wrapper.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
}

function prevSlide() {
    const wrapper = document.getElementById('pmSwiperWrapper');
    const totalSlides = wrapper.children.length;
    currentSlideIndex = currentSlideIndex === 0 ? totalSlides - 1 : currentSlideIndex - 1;
    wrapper.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
}





// 🔥 ЗАКРЫВАЕТ МОДАЛКУ
function closePortfolioModal() {
    document.getElementById('portfolioModal').classList.remove('active');
    document.body.style.overflow = '';
}

// 🔥 КНОПКИ В МОДАЛКЕ
function openCalc() {
    closePortfolioModal();
    document.getElementById('calcModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function callNow() {
    window.location.href = 'tel:+73952123456';
}

// 🔥 ЗАКРЫТИЕ ПО ESC
document.addEventListener('keydown', function(e) {
    if(e.key === 'Escape' && document.getElementById('portfolioModal').classList.contains('active')) {
        closePortfolioModal();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.portfolio-item').forEach((item, index) => {
        item.style.cursor = 'pointer';
        
        // 🔥 GSAP 3D HOVER (твой код + мой)
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            gsap.to(item.querySelector('.portfolio-item__before'), {
                rotationY: (x / rect.width - 0.5) * 15,
                rotationX: (0.5 - y / rect.height) * 15,
                scale: 1.05,
                z: 50,
                duration: 0.3,
                ease: "power2.out"
            });
            
            gsap.to(item.querySelector('.portfolio-item__after'), {
                scale: 1.1,
                opacity: 1,
                duration: 0.3
            });
        });
        
        // 🔥 MOUSELEAVE (твой код сохраняется)
        item.addEventListener('mouseleave', () => {
            gsap.to(item.querySelector('.portfolio-item__before'), {
                rotationY: 0,
                rotationX: 0,
                scale: 1,
                z: 0,
                duration: 0.5
            });
            
            gsap.to(item.querySelector('.portfolio-item__after'), {
                scale: 1,
                opacity: 0,
                duration: 0.5
            });
        });
        
        // 🔥 ВХОДНАЯ АНИМАЦИЯ (твой код сохраняется)
        gsap.fromTo(item, 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.8, delay: index * 0.1 }
        );
        
        // 🔥 КЛИК МОДАЛКА (ДОБАВЛЯЕТСЯ)
        item.addEventListener('click', function() {
            const galleryId = this.getAttribute('data-gallery');
            openPortfolioModal(galleryId);
        });
    });
});

// 🔥 ГАМБУРГЕР МЕНЮ + КРЕСТИК (ПОЛНЫЙ КОД)
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.querySelector('.nav');
const mobileMenuClose = document.getElementById('mobileMenuClose');

if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', function() {
        const isActive = nav.classList.contains('active');
        
        if (isActive) {
            // 🔥 ЗАКРЫТИЕ
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
            if (mobileMenuClose) mobileMenuClose.classList.remove('active');
            document.body.classList.remove('no-scroll');
        } else {
            // 🔥 ОТКРЫТИЕ
            mobileMenuBtn.classList.add('active');
            nav.classList.add('active');
            if (mobileMenuClose) mobileMenuClose.classList.add('active');
            document.body.classList.add('no-scroll');
        }
    });
}

// 🔥 КРЕСТИК ЗАКРЫТИЯ
if (mobileMenuClose && nav) {
    mobileMenuClose.addEventListener('click', function() {
        mobileMenuBtn.classList.remove('active');
        nav.classList.remove('active');
        mobileMenuClose.classList.remove('active'); // ❌ КРЕСТИК ИСЧЕЗАЕТ
        document.body.classList.remove('no-scroll');
    });
}

// Закрытие по клику на ссылку
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        nav.classList.remove('active');
        if (mobileMenuClose) mobileMenuClose.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// 🔥 КНОПКА ПОСЛЕ services (с задержкой)
const costBtn = document.querySelector('.fixed-cost-btn');
const triggerBlock = document.getElementById('services');

if (costBtn && triggerBlock) {
    // Задержка для загрузки DOM
    setTimeout(() => {
        window.addEventListener('scroll', function() {
            const triggerTop = triggerBlock.getBoundingClientRect().top;
            if (triggerTop < window.innerHeight * 0.5) {
                costBtn.classList.add('show');
            } else {
                costBtn.classList.remove('show');
            }
        });
        
        // Изначально убрать класс show
        costBtn.classList.remove('show');
    }, 100);
}


// 🔥 ТЕСТ КНОПКИ - РАБОТАЕТ 100%
window.addEventListener('scroll', function() {
    console.log('scrollY:', window.scrollY); // ← СМОТРИ в Console
    
    const btn = document.querySelector('.fixed-cost-btn');
    if (window.scrollY > 500) { // после 500px
        btn?.classList.add('show');
        console.log('✅ Кнопка ДОЛЖНА появиться!');
    } else {
        btn?.classList.remove('show');
        console.log('❌ Кнопка СКРЫТА');
    }
});
