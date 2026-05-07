const cartItems = document.getElementById("cartItems");

const cartTotal = document.getElementById("cartTotal");

const cartCount = document.getElementById("cartCount");

const checkoutModal = document.getElementById("checkoutModal");

const checkoutTotal = document.getElementById("checkoutTotal");

const orderNumber = document.getElementById("orderNumber");

const menuFilters = document.querySelectorAll(".menu-filter");

const productCards = document.querySelectorAll(".product-card");

let cart = [];

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
        `${nombre} agregado al carrito`
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
                    Agregá productos del menú
                </p>

            </div>
        
        `;

        cartTotal.textContent = "$0";

        cartCount.textContent = "0";

        return;

    }

    cart.forEach((producto, index) => {

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

        (acc, item) => acc + item.precio,

        0

    );

    cartTotal.textContent = formatPrice(total);

    cartCount.textContent = cart.length;

}

/* =========================
   ELIMINAR DEL CARRITO
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
   ABRIR CHECKOUT
========================= */

function openCheckout(){

    if(cart.length === 0){

        showNotification(
            "Agregá productos primero"
        );

        return;

    }

    checkoutModal.classList.add("active");

    const total = cart.reduce(

        (acc, item) => acc + item.precio,

        0

    );

    checkoutTotal.textContent = formatPrice(total);

    const numero = Math.floor(
        Math.random() * 900 + 100
    );

    orderNumber.textContent = `#${numero}`;

}

/* =========================
   CERRAR CHECKOUT
========================= */

function closeCheckout(){

    checkoutModal.classList.remove("active");

}

/* =========================
   CERRAR AFUERA
========================= */

checkoutModal.addEventListener("click", e => {

    if(e.target === checkoutModal){

        closeCheckout();

    }

});

/* =========================
   NOTIFICACION
========================= */

function showNotification(message){

    const notification = document.createElement("div");

    notification.className = "custom-notification";

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

.remove-btn{

    margin-top:12px;

    border:none;

    padding:10px 14px;

    border-radius:12px;

    background:#ffe1e1;

    color:#b10000;

    cursor:pointer;

    font-weight:600;

}

`;

document.head.appendChild(style);

/* =========================
   INIT
========================= */

updateCart();