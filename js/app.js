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
        slidesPerView: 4,
        speed: 600,
        spaceBetween: 8,
        loop: true,
        navigation: {
            prevEl: popularSwiperPrev,
            nextEl: popularSwiperNext,
        },
    })
}

function phoneMask() {
	const input = document.querySelector('#phone')

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

window.addEventListener('DOMContentLoaded', function() {
    popularTabs()
    phoneMask()
})