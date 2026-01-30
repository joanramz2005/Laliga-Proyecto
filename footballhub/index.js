document.addEventListener("DOMContentLoaded", () => {
    let lastScroll = 0;
    const header = document.querySelector(".header");

    if (!header) return;

    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;

        // arriba del todo → siempre visible
        if (currentScroll <= 0) {
            header.classList.remove("hide");
            lastScroll = 0;
            return;
        }

        // bajando
        if (currentScroll > lastScroll) {
            header.classList.add("hide");
        } 
        // subiendo
        else {
            header.classList.remove("hide");
        }

        lastScroll = currentScroll;
    });
});
