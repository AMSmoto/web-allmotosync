const productos = [
    {
        id: "PROD-001",
        nombre: "Inyector Original KTM Duke / RC",
        categoria: "inyeccion",
        descripcion: "Inyector calibrado y comprobado en banco de flujo para KTM 200, 250 y 390.",
        precio: 280000,
        imagen: "../MEDIA/TIENDA/inyector-ktm.jpg", // Recuerda colocar la imagen en MEDIA/TIENDA/
        mercadolibre: "" // Puedes pegar el link de ML si lo tienes
    },
    {
        id: "PROD-002",
        nombre: "Escáner Diagnóstico JDiag M300",
        categoria: "diagnostico",
        descripcion: "Escáner multimarca profesional con juego de conectores y lectura de flujo de datos en vivo.",
        precio: 1600000,
        imagen: "../MEDIA/TIENDA/escaner-m300.jpg",
        mercadolibre: ""
    },
    {
        id: "PROD-003",
        nombre: "Sensor TPS de Alta Precisión",
        categoria: "electronica",
        descripcion: "Sensor de posición de acelerador con lectura lineal de voltaje certificada.",
        precio: 125000,
        imagen: "../MEDIA/TIENDA/sensor-tps.jpg",
        mercadolibre: ""
    },
    {
        id: "PROD-004",
        nombre: "Protector de Radiador & Sliders",
        categoria: "accesorios",
        descripcion: "Protección en corte láser y materiales de alta resistencia para impacto.",
        precio: 165000,
        imagen: "../MEDIA/TIENDA/protector-radiador.jpg",
        mercadolibre: ""
    }
];

const NUMERO_WHATSAPP = "573104886929"; // Tu WhatsApp de ALLMOTOSYNC

function renderizarProductos(filtro = "todos", busqueda = "") {
    const contenedor = document.getElementById("catalogo-productos");
    contenedor.innerHTML = "";

    const filtrados = productos.filter(p => {
        const coincideCat = filtro === "todos" || p.categoria === filtro;
        const coincideNom = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
                            p.descripcion.toLowerCase().includes(busqueda.toLowerCase());
        return coincideCat && coincideNom;
    });

    if (filtrados.length === 0) {
        contenedor.innerHTML = `<div class="sin-productos">No se encontraron productos en esta categoría o búsqueda.</div>`;
        return;
    }

    filtrados.forEach(prod => {
        const precioFormateado = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(prod.precio);
        const mensajeWA = encodeURIComponent(`Hola ALLMOTOSYNC, me interesa comprar el producto: *${prod.nombre}* (Ref: ${prod.id}) por valor de ${precioFormateado}. ¿Tienen disponibilidad?`);
        
        const card = document.createElement("div");
        card.className = "tarjeta-producto";
        card.innerHTML = `
            <div class="img-wrapper">
                <img src="${prod.imagen}" alt="${prod.nombre}" onerror="this.src='https://placehold.co/400x300/111/FF6600?text=ALLMOTOSYNC'">
            </div>
            <div class="info-producto">
                <span class="tag-categoria">${prod.categoria.toUpperCase()}</span>
                <h3>${prod.nombre}</h3>
                <p>${prod.descripcion}</p>
                <div class="precio">${precioFormateado}</div>
                
                <div class="botones-accion">
                    <a href="https://wa.me/${NUMERO_WHATSAPP}?text=${mensajeWA}" target="_blank" class="btn-whatsapp">
                        <i class="fa-brands fa-whatsapp"></i> Comprar vía WhatsApp
                    </a>
                    ${prod.mercadolibre ? `<a href="${prod.mercadolibre}" target="_blank" class="btn-ml"><i class="fa-solid fa-bag-shopping"></i> Mercado Libre</a>` : ''}
                </div>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarProductos();

    // Filtro por botones
    const tabs = document.querySelectorAll(".filtro-btn");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("activo"));
            tab.classList.add("activo");
            const cat = tab.getAttribute("data-cat");
            const texto = document.getElementById("buscador").value;
            renderizarProductos(cat, texto);
        });
    });

    // Filtro por buscador
    document.getElementById("buscador").addEventListener("input", (e) => {
        const catActiva = document.querySelector(".filtro-btn.activo").getAttribute("data-cat");
        renderizarProductos(catActiva, e.target.value);
    });
});