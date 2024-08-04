// carusel settings

export const options = {
    loop: true,
    nav: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    smartSpeed: 1000,
    center: true,
    dots: false,
    mouseDrag: false,
    navText: [
        '<i class="bi bi-arrow-left"></i>',
        '<i class="bi bi-arrow-right"></i>'
    ],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        }
    }
};
