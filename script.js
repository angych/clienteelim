const cartItems = document.getElementById("cartItems");

const cartTotal = document.getElementById("cartTotal");

const cartCount = document.getElementById("cartCount");

const menuFilters = document.querySelectorAll(".menu-filter");

const productCards = document.querySelectorAll(".product-card");

const paymentPage = document.getElementById("paymentPage");

const paymentTotal = document.getElementById("paymentTotal");

const paymentOrderNumber = document.getElementById("paymentOrderNumber");

const ticketPage = document.getElementById("ticketPage");

const ticketOrder = document.getElementById("ticketOrder");

const ticketTotal = document.getElementById("ticketTotal");

const ticketProducts = document.getElementById("ticketProducts");

let cart = [];

let currentOrderNumber = "";

/* =========================
   FORMATO PRECIO
========================= */

function formatPrice(price){

    return new Intl.NumberFormat(

        "es-AR",

        {
            style:"currency",
            currency:"ARS",
            minimumFractionDigits:0
        }

    ).format(price);

}

/* =========================
   SCROLL MENU
========================= */

function scrollToMenu(){

    document.getElementById("menu").scrollIntoView({

        behavior:"smooth"

    });

}

/* =========================
   AGREGAR AL CARRITO
========================= */

function addToCart(nombre, precio, categoria){

    cart.push({

        nombre,
        precio,
        categoria

    });

    updateCart();

    showNotification(
        `${nombre} agregado ☕`
    );

}

/* =========================
   ACTUALIZAR CARRITO
========================= */

function updateCart(){

    cartItems.innerHTML = "";

    if(cart.length === 0){

        cartItems.innerHTML = `
        
            <div class="empty-cart">

                <h3>
                    Tu carrito está vacío
                </h3>

                <p>
                    Agregá productos
                </p>

            </div>
        
        `;

        cartTotal.textContent = "$0";

        cartCount.textContent = "0";

        return;

    }

    cart.forEach((producto,index) => {

        const item = document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `
        
            <h4>
                ${producto.nombre}
            </h4>

            <p>
                ${producto.categoria}
            </p>

            <strong>
                ${formatPrice(producto.precio)}
            </strong>

            <button 
                class="remove-btn"
                onclick="removeFromCart(${index})"
            >
                Eliminar
            </button>
        
        `;

        cartItems.appendChild(item);

    });

    const total = cart.reduce(

        (acc,item) => acc + item.precio,

        0

    );

    cartTotal.textContent = formatPrice(total);

    cartCount.textContent = cart.length;

}

/* =========================
   ELIMINAR
========================= */

function removeFromCart(index){

    cart.splice(index,1);

    updateCart();

    showNotification(
        "Producto eliminado"
    );

}

/* =========================
   FILTROS
========================= */

menuFilters.forEach(button => {

    button.addEventListener("click", () => {

        menuFilters.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        productCards.forEach(card => {

            if(

                filter === "Todos"
                ||
                card.dataset.category === filter

            ){

                card.style.display = "block";

            }else{

                card.style.display = "none";

            }

        });

    });

});

/* =========================
   IR A PAGAR
========================= */

function goToPayment(){

    if(cart.length === 0){

        showNotification(
            "Agregá productos primero"
        );

        return;

    }

    paymentPage.classList.add("active");

    const total = cart.reduce(

        (acc,item) => acc + item.precio,

        0

    );

    paymentTotal.textContent =
        formatPrice(total);

    currentOrderNumber = `#${
        Math.floor(Math.random() * 900 + 100)
    }`;

    paymentOrderNumber.textContent =
        currentOrderNumber;

}

/* =========================
   CONFIRMAR PAGO
========================= */

function confirmPayment(){

    paymentPage.classList.remove("active");

    ticketPage.classList.add("active");

    const total = cart.reduce(

        (acc,item) => acc + item.precio,

        0

    );

    ticketOrder.textContent =
        currentOrderNumber;

    ticketTotal.textContent =
        formatPrice(total);

    ticketProducts.innerHTML = "";

    cart.forEach(producto => {

        const item = document.createElement("div");

        item.className = "ticket-product";

        item.innerHTML = `
        
            <span>
                ${producto.nombre}
            </span>

            <strong>
                ${formatPrice(producto.precio)}
            </strong>
        
        `;

        ticketProducts.appendChild(item);

    });

    showNotification(
        "Pago confirmado ☕"
    );

}

/* =========================
   CERRAR MODALES
========================= */

paymentPage.addEventListener("click", e => {

    if(e.target === paymentPage){

        paymentPage.classList.remove("active");

    }

});

ticketPage.addEventListener("click", e => {

    if(e.target === ticketPage){

        ticketPage.classList.remove("active");

    }

});

/* =========================
   NOTIFICACIONES
========================= */

function showNotification(message){

    const notification = document.createElement("div");

    notification.className =
        "custom-notification";

    notification.innerHTML = `
    
        ☕ ${message}
    
    `;

    document.body.appendChild(notification);

    setTimeout(() => {

        notification.classList.add("show");

    },100);

    setTimeout(() => {

        notification.classList.remove("show");

        setTimeout(() => {

            notification.remove();

        },300);

    },2500);

}

/* =========================
   ESTILOS NOTIFICACION
========================= */

const style = document.createElement("style");

style.innerHTML = `

.custom-notification{

    position:fixed;

    top:30px;
    left:50%;

    transform:translateX(-50%) translateY(-20px);

    background:#5c3b2e;

    color:white;

    padding:16px 28px;

    border-radius:50px;

    font-family:'Poppins',sans-serif;

    font-weight:500;

    opacity:0;

    transition:0.3s ease;

    z-index:9999;

}

.custom-notification.show{

    opacity:1;

    transform:translateX(-50%) translateY(0);

}

`;

document.head.appendChild(style);

/* =========================
   INIT
========================= */

updateCart();
