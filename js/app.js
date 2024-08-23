function popularTabs() {
    const tabsItems = document.querySelectorAll('.popular__tab')
    const tabsContent = document.querySelectorAll('.popular__content')

    if (tabsItems.length && tabsContent.length) {

        function initTabs(i) {
            tabsItems.forEach(function(tab) {
                tab.classList.remove('active')
            })

            tabsItems[i].classList.add('active')

            tabsContent.forEach(function(block) {
                block.classList.remove('active')
            })

            tabsContent[i].classList.add('active')

            popularSwiper(i)
        }

        function tabClick() {
            tabsItems.forEach(function(tab, i) {
                tab.addEventListener('click', function() {
                    initTabs(i)
                })
            })
        }

        initTabs(0)
        popularSwiper(0)
        tabClick()

    }
}

function popularSwiper(i) {
    const popularSwipers = document.querySelectorAll('.popular-swiper')
    const popularSwiperPrev = document.querySelector('.popular-swiper__prev')
	const popularSwiperNext = document.querySelector('.popular-swiper__next')

    popularSwipers.forEach(function(el) {
        if (el.swiper) {
            el.swiper.destroy()
        }
    })

    const popularSwiper = new Swiper(popularSwipers[i], {
        slidesPerView: 'auto',
        speed: 600,
        spaceBetween: 8,
        loop: true,
        navigation: {
            prevEl: popularSwiperPrev,
            nextEl: popularSwiperNext,
        },
        breakpoints: {
            990: {
                slidesPerView: 3
            },
            1280: {
                slidesPerView: 4
            }
        }
    })
}

function similarSwiper() {
    const swiperEl = document.querySelector('.similar-swiper')

    if (swiperEl) {
        new Swiper(swiperEl, {
            slidesPerView: 'auto',
            loop: true,
            speed: 600,
            spaceBetween: 8,
            navigation: {
                prevEl: '.similar-swiper__prev',
                nextEl: '.similar-swiper__next'
            },
            breakpoints: {
                1280: {
                    slidesPerView: 3
                }
            }
        })
    }
}

function phoneMask() {
	const input = document.querySelector('#phone')

	if (input) {
        let iti = window.intlTelInput(input, {
            initialCountry: 'ru',
            separateDialCode: true,
            preferredCountries: ['ru'],
        })

        $(document).ready(function () {
            $('#phone').inputmask('(999) 999-99-99', {
                clearIncomplete: true,
            })
        })

        input.addEventListener('countrychange', function () {
            let countryCode = iti.getSelectedCountryData().iso2
            let mask = ''

            if (countryCode === 'ru') {
                mask = '(999) 999-99-99'
            } else if (countryCode === 'us') {
                mask = '(999) 999-9999'
            } else {
                mask = '(999) 999 9999'
            }

            $(input).inputmask('remove')
            $(input).inputmask({
                mask: mask,
                clearIncomplete: true,
            })
        })
    }
}

function promoSlider() {
    const sliderEl = document.querySelector('.promo-slider')

    if (sliderEl) {
        const slides = document.querySelectorAll('.promo-slide')
        let counter = 0
        const prevBtn = document.querySelector('.promo-slider__prev')
        const nextBtn = document.querySelector('.promo-slider__next')
        const htmlCounterCurrent = document.querySelector('.slides__counter-current')
        const htmlCounterTotal = document.querySelector('.slides__counter-total')
        const slidesNameEl = document.querySelector('.promo-product__name')
        const slidesNames = ['evospark', 'zsvar']

        function changeSlidesName(i) {
            slidesNameEl.textContent = slidesNames[i]
        }

        function changeHtmlCounter(i) {
            i++
            let currentValue = i ? (i < 10 ? `0${i}` : i) : '0'
            htmlCounterCurrent.textContent = currentValue
        }

        function initHtmlCounter() {
            let totalValue = slides.length ? (slides.length < 10 ? `0${slides.length}` : slides.length) : "0";
            htmlCounterTotal.textContent = totalValue
        }

        function changeSlide(i) {
            slides.forEach(function(slide) {
                slide.classList.remove('active')
            })

            slides[i].classList.add('active')
        }

        nextBtn.addEventListener('click', function () {
            if (counter == slides.length - 1) {
                counter = 0
            } else {
                counter++
            }

            changeSlide(counter)
            changeHtmlCounter(counter)
            changeSlidesName(counter)
        })

        prevBtn.addEventListener('click', function() {
            if (counter == 0) {
                counter = slides.length - 1
            } else {
                counter--
            }

            changeSlide(counter)
            changeHtmlCounter(counter)
            changeSlidesName(counter)
        })

        changeSlide(counter)
        initHtmlCounter()
        changeSlidesName(counter)
    }
}

function catalogCollapse() {
    const categoriesItems = document.querySelectorAll('.catalog__nav-main')

    if (categoriesItems.length) {
        categoriesItems.forEach(function(category) {
            category.addEventListener('click', function() {
                this.classList.toggle('active')
                const subCategories = this.nextElementSibling

                if (subCategories) {
                    if (this.classList.contains('active')) {
                        subCategories.classList.add('active')
                        subCategories.style.height = subCategories.scrollHeight + 'px'
                    } else {
                        subCategories.classList.remove('active')
                        subCategories.style.height = ''
                    }
                }

            })
        })
    }
}

function mobileSubMenu() {
    const openTriggers = document.querySelectorAll('.mobile__menu-list-item.sub>a')

    if (openTriggers.length) {
        openTriggers.forEach(function(item) {
            item.addEventListener('click', function(e) {
                e.preventDefault()
                const currentSubMenu = this.nextElementSibling

                if (currentSubMenu) {
                    currentSubMenu.classList.toggle('active')

                    if (currentSubMenu.classList.contains('active')) {
                        currentSubMenu.style.height = currentSubMenu.scrollHeight + 'px'
                    } else {
                        currentSubMenu.style.height = ''
                    }
                }
            })
        })
    }
}

function mobileMenu() {
    const triggerBtn = document.querySelector('.header__block-burger')
    const menuEl = document.querySelector('.mobile__menu')

    if (triggerBtn && menuEl) {
        triggerBtn.addEventListener('click', function() {
            triggerBtn.classList.toggle('active')
            document.body.classList.toggle('non-scroll')
            menuEl.classList.toggle('active')
        })

        window.addEventListener('click', function(e) {
            if (!e.target.closest('.mobile__menu') && !e.target.closest('.header__block-burger')) {
                triggerBtn.classList.remove('active')
                document.body.classList.remove('non-scroll')
                menuEl.classList.remove('active')
            }
        }) 
    }
}

window.addEventListener('DOMContentLoaded', function() {
    popularTabs()
    phoneMask()
    promoSlider()
    catalogCollapse()
    similarSwiper()
    mobileSubMenu()
    mobileMenu()
})
