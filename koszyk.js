document.addEventListener("DOMContentLoaded", function () {

    const CART_KEY = "yngnickl_cart";
    const EXTRA_COST = 16; // dodatkowa kwota do podsumowania (np. wysyłka)

    function getCart() {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    }

    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }

    function updateCartCount() {
        const counter = document.getElementById("cart-count");
        if (!counter) return;
        const total = getCart().reduce((sum, item) => sum + item.quantity, 0);
        counter.textContent = total;
    }

    function flyToCart(imgElement) {
        const cartIcon = document.querySelector(".cart-icon");
        if (!imgElement || !cartIcon) return;

        const img = imgElement.cloneNode(true);
        const rect = imgElement.getBoundingClientRect();
        const cartRect = cartIcon.getBoundingClientRect();

        img.style.position = "fixed";
        img.style.left = rect.left + "px";
        img.style.top = rect.top + "px";
        img.style.width = "100px";
        img.style.transition = "all 0.8s ease";
        img.style.zIndex = "9999";

        document.body.appendChild(img);

        setTimeout(() => {
            img.style.left = cartRect.left + "px";
            img.style.top = cartRect.top + "px";
            img.style.width = "20px";
            img.style.opacity = "0.2";
        }, 10);

        setTimeout(() => img.remove(), 800);
    }

    function addProduct(product, imgElement) {
        const cart = getCart();
        const ignoreThumbnails = product.name.toLowerCase().includes("naklejki");
        const existing = cart.find(item => {
            if (ignoreThumbnails) return item.name === product.name;
            return item.name === product.name && item.variant === product.variant;
        });

        if (existing) existing.quantity += product.quantity;
        else cart.push(product);

        saveCart(cart);
        updateCartCount();
        flyToCart(imgElement);
    }

    const addButton = document.getElementById("add-to-cart");
    if (addButton) {
        const qtyInput = document.createElement("input");
        qtyInput.type = "number";
        qtyInput.min = "1";
        qtyInput.value = "1";
        qtyInput.style.width = "60px";
        qtyInput.style.marginRight = "10px";
        addButton.parentNode.insertBefore(qtyInput, addButton);

        addButton.addEventListener("click", function () {
            const name = document.querySelector(".opis h2")?.innerText.trim() || "Produkt";
            const priceText = document.querySelector(".opis span")?.innerText || "0";
            const price = parseFloat(priceText.replace(/[^\d.]/g, "")) || 0;
            const currentImage = document.getElementById("currentImage");
            const imageSrc = currentImage?.src || "";
            const quantity = parseInt(qtyInput.value) || 1;

            const product = { name, price, image: imageSrc, quantity, variant: imageSrc };
            addProduct(product, currentImage);
        });
    }

    function renderCart() {
        const container = document.getElementById("cart-items");
        if (!container) return;

        const cart = getCart();
        container.innerHTML = "";

        if (cart.length === 0) {
            container.innerHTML = "<p>Koszyk jest pusty.</p>";
            return;
        }

        let total = 0;
        cart.forEach((item, index) => {
            total += item.price * item.quantity;

            const div = document.createElement("div");
            div.classList.add("cart-item");

            div.innerHTML = `
                <img src="${item.image}" width="80">
                <span>${item.name} - ${item.price} PLN</span>
                <div>
                    <button class="minus" data-index="${index}">−</button>
                    ${item.quantity}
                    <button class="plus" data-index="${index}">+</button>
                </div>
                <button class="remove-item" data-index="${index}">Usuń</button>
            `;

            container.appendChild(div);
        });

        // Podsumowanie z dodatkową kwotą
        const totalElement = document.createElement("h2");
        totalElement.textContent = `Suma: ${total} PLN + ${EXTRA_COST} PLN kw`;
        container.appendChild(totalElement);

        // Formularz zamówienia
        const form = document.createElement("div");
        form.innerHTML = `
            <h2>Złóż zamówienie</h2>
            <input type="text" id="order-name" placeholder="Imię i nazwisko"><br><br>
            <input type="email" id="order-email" placeholder="Email"><br><br>
            <button id="submit-order">Wyślij zamówienie</button>
        `;
        container.appendChild(form);
    }

    document.addEventListener("click", function (e) {
        const cart = getCart();

        if (e.target.classList.contains("plus")) {
            const i = e.target.dataset.index;
            cart[i].quantity++;
            saveCart(cart);
            renderCart();
            updateCartCount();
        }

        if (e.target.classList.contains("minus")) {
            const i = e.target.dataset.index;
            cart[i].quantity--;
            if (cart[i].quantity <= 0) cart.splice(i, 1);
            saveCart(cart);
            renderCart();
            updateCartCount();
        }

        if (e.target.classList.contains("remove-item")) {
            const i = e.target.dataset.index;
            cart.splice(i, 1);
            saveCart(cart);
            renderCart();
            updateCartCount();
        }
    });

    updateCartCount();
    renderCart();
});





