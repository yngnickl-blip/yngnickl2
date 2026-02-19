document.addEventListener("DOMContentLoaded", () => {

    const sliders = document.querySelectorAll(".slider1, .slider2");

    sliders.forEach(slider => {

        const slidesContainer = slider.querySelector(".slides");
        const prevBtn = slider.querySelector(".prev");
        const nextBtn = slider.querySelector(".next");

        // Pobieramy tylko dzieci slidesContainer, które są .slide
        let slides = Array.from(slidesContainer.children).filter(el => el.classList.contains("slide"));

        let index = 1;
        let interval;
        const slideInterval = 10000;

        // --- KLONOWANIE ---
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[slides.length - 1].cloneNode(true);

        firstClone.classList.add("clone");
        lastClone.classList.add("clone");

        slidesContainer.appendChild(firstClone);
        slidesContainer.insertBefore(lastClone, slides[0]);

        // Odświeżamy tablicę slajdów po dodaniu klonów
        slides = Array.from(slidesContainer.children).filter(el => el.classList.contains("slide"));

        // Ustawiamy początkową pozycję
        slidesContainer.style.transform = `translateX(-${index * 100}%)`;

        // --- FUNKCJE ---
        function moveNext() {
            index++;
            slidesContainer.style.transition = "transform 0.5s ease-in-out";
            slidesContainer.style.transform = `translateX(-${index * 100}%)`;
        }

        function movePrev() {
            index--;
            slidesContainer.style.transition = "transform 0.5s ease-in-out";
            slidesContainer.style.transform = `translateX(-${index * 100}%)`;
        }

        function startAutoSlide() {
            interval = setInterval(moveNext, slideInterval);
        }

        function resetAutoSlide() {
            clearInterval(interval);
            startAutoSlide();
        }

        // --- STRZAŁKI ---
        nextBtn.addEventListener("click", () => { moveNext(); resetAutoSlide(); });
        prevBtn.addEventListener("click", () => { movePrev(); resetAutoSlide(); });

        // --- INFINITY LOOP ---
        slidesContainer.addEventListener("transitionend", () => {
            if (slides[index].classList.contains("clone")) {
                slidesContainer.style.transition = "none";
                if (slides[index] === firstClone) index = 1;
                if (slides[index] === lastClone) index = slides.length - 2;
                slidesContainer.style.transform = `translateX(-${index * 100}%)`;
            }
        });

        startAutoSlide();

    });

});




