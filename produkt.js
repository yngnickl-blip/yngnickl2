// ====== ZMIANA OBRAZU ======
function changeImage(element) {
    const currentImage = document.getElementById("currentImage");
    currentImage.src = element.src;

    // zmiana aktywnej miniaturki
    const thumbnails = document.querySelectorAll(".thumbnails img");
    thumbnails.forEach(img => img.classList.remove("active"));
    element.classList.add("active");
}


// ====== DODAWANIE DO KOSZYKA ======

document.addEventListener("DOMContentLoaded", () => {

    const addButton = document.getElementById("add-to-cart");

    if (!addButton) return;

    addButton.addEventListener("click", () => {

        const currentImage = document.getElementById("currentImage");

        const product = {
            name: "Kartki okolicznościowe z motywem gołębi",
            price: 30,
            image: currentImage.src
        };

        // funkcja z koszyk.js
        addToCart(product.name, product.price, product.image);
    });

});