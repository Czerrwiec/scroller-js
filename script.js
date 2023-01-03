document.addEventListener('DOMContentLoaded', () => {
	const scroller = new Scroller('#root');

	document.addEventListener('wheel', (event) => scroller.listenScroll(event));
	document.addEventListener('swipeUp', () => scroller.scrollLogic(1));
	document.addEventListener('swipeDown', () => scroller.scrollLogic(-1));
	document.addEventListener('keydown', (event) => {
		switch (event.keyCode) {
			case 40:
				return scroller.scrollLogic(1);
			case 38:
				return scroller.scrollLogic(-1);
			default:
				return;
		}
	});
});
