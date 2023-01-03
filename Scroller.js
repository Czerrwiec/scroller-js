class Scroller {
	constructor(rootSelector) {
		const rootElement = document.querySelector(rootSelector);
		this.sections = document.querySelectorAll('section');
		const arraySections = Array.from(this.sections);

		const currentSectionIndex = arraySections.findIndex(
			this.isScrolledIntoView
		);

		this.currentSectionIndex = Math.max(currentSectionIndex, 0);

		this.isThrottled = false;

		this.drowNavigation();
	}

	isScrolledIntoView(element) {
		const rect = element.getBoundingClientRect();
		const elementTop = rect.top;
		const elementBottom = Math.floor(rect.bottom);

		const isVissible = elementTop >= 0 && elementBottom <= window.innerHeight;

		return isVissible;
	}

	listenScroll(event) {
		if (this.isThrottled) return;
		this.isThrottled = true;

		setTimeout(() => {
			this.isThrottled = false;
		}, 700);
		const direction = event.deltaY > 0 ? 1 : -1;

		this.scrollLogic(direction);
	}

	scrollLogic(direction) {
		if (direction === 1) {
			const isLastSection =
				this.currentSectionIndex === this.sections.length - 1;
			if (isLastSection) return;
		} else if (direction === -1) {
			const isFirstSection = this.currentSectionIndex === 0;
			if (isFirstSection) return;
		}
		this.currentSectionIndex += direction;
		this.scrollToCurrentSection();
	}

	scrollToCurrentSection() {
		this.selectActiveNavItem();
		this.sections[this.currentSectionIndex].scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	}

	drowNavigation() {
		this.navigationContainer = document.createElement('aside');
		this.navigationContainer.setAttribute('class', 'scroller__navigation');
		const list = document.createElement('ul');
		this.sections.forEach((section, index) => {
			const listItem = document.createElement('li');

			listItem.addEventListener('click', () => {
				this.currentSectionIndex = index;

				this.scrollToCurrentSection();
			});

			list.appendChild(listItem);
		});

		this.navigationContainer.appendChild(list);
		document.body.appendChild(this.navigationContainer);
		this.selectActiveNavItem();
	}

	selectActiveNavItem() {
		if (this.navigationContainer) {
			const navigationItems = this.navigationContainer.querySelectorAll('li');
			navigationItems.forEach((item, index) => {
				if (index === this.currentSectionIndex) {
					item.classList.add('active');
				} else {
					item.classList.remove('active');
				}
			});
		}
	}
}
