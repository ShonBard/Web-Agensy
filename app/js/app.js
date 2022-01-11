
document.addEventListener('DOMContentLoaded', () => {
	// Preloader
	setTimeout(() => { 
		const preloader = document.querySelector('.preloader');
		preloader.style.display = 'none' 
		document.body.style.overflow = 'auto'
	}, 1000)

	// =======================================================================================
	const scrollClassMenu = 'menu_scrolled'
	const activeClassLink = 'highlight'
	
	const header = document.querySelector('.header')
	const headerHeight = header.scrollHeight
	const startScrollMenu = headerHeight + 40

	const allSection = document.querySelectorAll('.section')
	const menuScroll = document.querySelector('.menu-wrap')
	const menuNode = document.querySelector('.menu') 
	const menuLinks = document.querySelectorAll('.menu__link')
	// =======================================================================================


	// =======================================================================================
	scrollMidlePage() // Проверка местоположения скрола
	window.addEventListener('scroll', scrollMidlePage)

	//  Подсветка пунктов меню 
	menuNode.addEventListener( 'click', event => {
		const menuLink = event.target; 

		if (!menuLink) return; 
		if (!menuNode.contains(menuLink)) return
	
		highlight(menuLink); 
	})

	//  Скролл до секции
	menuNode.addEventListener( 'click', event => {
		event.preventDefault() 
		const menuLink = event.target; 

		const getsectionId = menuLink.getAttribute('href').substring(1)
		const getsectionById = document.getElementById(getsectionId)

		checkDiffHeightMenu(menuScroll, getsectionById)
	})

	// Подсветка активного пункта меню при скроле
	window.addEventListener('scroll', () => {
		setActiveLinkByScroll()
	})
	// =======================================================================================

	function scrollMidlePage() {
		if (
			window.scrollY >= startScrollMenu 
			&& !menuScroll.classList.contains(scrollClassMenu)
		) {
			menuScroll.classList.add(scrollClassMenu)
		} else if (
			window.scrollY < startScrollMenu
			&& menuScroll.classList.contains(scrollClassMenu)
		) {
			menuScroll.classList.remove(scrollClassMenu)
		}
	}

	function highlight(menuLink) {
		let selectedMenuLink

		if (selectedMenuLink) { 
			selectedMenuLink.classList.remove(activeClassLink);
		}
		selectedMenuLink = menuLink;
		selectedMenuLink.classList.add(activeClassLink); 
	}

	function checkDiffHeightMenu(menuScroll, getsectionById) {
		if (menuScroll.scrollHeight === 100) {
			moveToSection(getsectionById.offsetTop - 100)
		}
		if (menuScroll.scrollHeight === 70) {
			moveToSection(getsectionById.offsetTop - 70)
		}
	}
	function moveToSection(selectedSection) {
		window.scrollTo(0, selectedSection)
	}	
	
	function setActiveLinkByScroll() {
		clearingAllLinks()

		let currentActiveSection 
		for (const section of allSection) {
			if (window.scrollY + 101 >= section.offsetTop) {
				currentActiveSection = section.getAttribute('id')
			}
		}

		for (const menuLink of menuLinks) {
			let valueLink = menuLink.getAttribute('href').substring(1)

			if (valueLink === currentActiveSection) {
				menuLink.classList.add(activeClassLink)
			}
		}
	}
	function clearingAllLinks() {
		menuLinks.forEach(link => link.classList.remove(activeClassLink))
	}

})

