// ====== ZMIANA OBRAZU (tylko wizualnie) ======
function changeImage(element) {
    const currentImage = document.getElementById("currentImage");
    currentImage.src = element.src;

    const thumbnails = document.querySelectorAll(".thumbnails img");
    thumbnails.forEach(img => img.classList.remove("active"));
    element.classList.add("active");
}


// ====== DODAWANIE DO KOSZYKA ======

document.addEventListener("DOMContentLoaded", () => {

    const addButton = document.getElementById("add-to-cart");

    if (!addButton) return;

    addButton.addEventListener("click", () => {

        // zawsze ten sam produkt (niezależnie od miniaturki)
        const productName = "Naklejki z motywem gołębi";
        const productPrice = 30;

        // Możesz ustawić stałe zdjęcie produktu:
        const productImage = "images/Naklejki 2 do druku.jpg";

        // funkcja pochodzi z koszyk.js
        addToCart(productName, productPrice, productImage);

    });

});