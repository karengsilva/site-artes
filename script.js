// ===== Fade-in das seções =====
function revealSections() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const top = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if(top < windowHeight - 100){
            section.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

// ===== Carousel touch-friendly =====
document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    let index = 0;
    const slides = Array.from(track.children);

    function updateCarousel() {
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    nextBtn.addEventListener('click', ()=>{ index = (index+1)%slides.length; updateCarousel(); });
    prevBtn.addEventListener('click', ()=>{ index = (index-1+slides.length)%slides.length; updateCarousel(); });

    // Touch para mobile
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
    track.addEventListener('touchmove', e => {
        const moveX = e.touches[0].clientX;
        if(startX - moveX > 50){ index = (index+1)%slides.length; updateCarousel(); startX = moveX; }
        else if(moveX - startX > 50){ index = (index-1+slides.length)%slides.length; updateCarousel(); startX = moveX; }
    });
});
