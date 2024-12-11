let isScrolling = false;

document.addEventListener('wheel', (event) => {
    event.preventDefault(); 

    const scrollStep = 150; 
    const direction = event.deltaY > 0 ? 1 : -1; 

    if (!isScrolling) {
        isScrolling = true;
        smoothScroll(direction * scrollStep);
    }
}, { passive: false });

function smoothScroll(amount) {
    const start = window.scrollY;
    const end = start + amount;
    const duration = 300; 
    const startTime = performance.now();

    function step(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1); 
        const ease = easeInOutQuad(progress); 
        window.scrollTo(0, start + (end - start) * ease);

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            isScrolling = false; 
        }
    }
    requestAnimationFrame(step);
}
function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}