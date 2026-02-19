// Inicjalizacja EmailJS
emailjs.init("xPgqnXMx2IUYUP841");

const EXTRA_COST = 16; // kwota dodatkowa w podsumowaniu

function getCart() {
    return JSON.parse(localStorage.getItem("yngnickl_cart")) || [];
}

document.addEventListener("click", function (e) {

    if (e.target.id !== "submit-order") return;

    const name = document.getElementById("order-name")?.value.trim();
    const email = document.getElementById("order-email")?.value.trim();

    if (!name || !email) {
        alert("Uzupełnij dane.");
        return;
    }

    const cart = getCart();
    if (cart.length === 0) {
        alert("Koszyk pusty.");
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // HTML produktów z obrazkami
    const orderDetailsHtml = cart.map(item => `
        <p>
            <img src="${item.image}" width="80" style="vertical-align: middle; margin-right: 10px;">
            ${item.name} (ilość: ${item.quantity}) - ${item.price} PLN
        </p>
    `).join('');

    const templateParams = {
        customer_name: name,
        customer_email: email,
        order_details: orderDetailsHtml,
        total_summary: `Suma: ${total} PLN + ${EXTRA_COST} PLN kw`
    };

    console.log("Wysyłam:", templateParams);

    emailjs.send("yngnickl", "template_4a8nath", templateParams)
        .then(function(response) {
            console.log("SUCCESS", response);
            alert("Zamówienie wysłane!");
            localStorage.removeItem("yngnickl_cart");
            location.reload();
        })
        .catch(function(error) {
            console.log("FAILED", error);
            alert("Błąd wysyłki.");
        });
});
