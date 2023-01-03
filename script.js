document.addEventListener('DOMContentLoaded', () =>{
    const scroller = new Scroller('#root')

    document.addEventListener('wheel', (event) => scroller.listenScroll(event))
    
    // document.addEventListener('touchstart', () => {})
    // document.addEventListener('touchmove', () => {})
})
