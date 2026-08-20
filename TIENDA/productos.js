const productos = [
    {
        id: "PROD-001",
        nombre: "Inyector Original KTM Duke / RC 200-390",
        categoria: "inyeccion",
        descripcion: "Inyector de combustible original calibrado para óptima atomización y consumo.",
        precio: 280000,
        imagen: "../MEDIA/TIENDA/inyector-ktm.jpg"
    },
    {
        id: "PROD-002",
        nombre: "Sensor TPS de Posición de Acelerador",
        categoria: "electronica",
        descripcion: "Sensor TPS de alta precisión para respuesta lineal en apertura de aceleración.",
        precio: 125000,
        imagen: "../MEDIA/TIENDA/sensor-tps.jpg"
    },
    {
        id: "PROD-003",
        nombre: "Kit de Arrastre Reforzado con Reten",
        categoria: "transmision",
        descripcion: "Kit de transmisión de alta durabilidad para motos de media cilindrada.",
        precio: 195000,
        imagen: "../MEDIA/TIENDA/kit-arrastre.jpg"
    },
    {
        id: "PROD-004",
        nombre: "Bomba de Gasolina Alta Presión FI",
        categoria: "inyeccion",
        descripcion: "Bomba eléctrica interna para sistemas de inyección electrónica multimarca.",
        precio: 145000,
        imagen: "../MEDIA/TIENDA/bomba-gasolina.jpg"
    },
    {
        id: "PROD-005",
        nombre: "Sensor de Oxígeno (Lambda)",
        categoria: "electronica",
        descripcion: "Sensor de gases de escape para regulación exacta de mezcla aire/gasolina.",
        precio: 160000,
        imagen: "../MEDIA/TIENDA/sensor-oxigeno.jpg"
    },
    {
        id: "PROD-006",
        nombre: "Cuerpo de Aceleración Completo",
        categoria: "inyeccion",
        descripcion: "Cuerpo de aceleración con IAC y mariposa calibrada de fábrica.",
        precio: 350000,
        imagen: "../MEDIA/TIENDA/cuerpo-aceleracion.jpg"
    },
    {
        id: "PROD-007",
        nombre: "Protector de Radiador Aluminio CNC",
        categoria: "accesorios",
        descripcion: "Protección frontal contra piedras e impactos en aleación ligera.",
        precio: 110000,
        imagen: "../MEDIA/TIENDA/protector-radiador.jpg"
    },
    {
        id: "PROD-008",
        nombre: "Bobina de Alta de Rendimiento",
        categoria: "electronica",
        descripcion: "Bobina con mayor chispa para mejorar la combustión y respuesta en altos.",
        precio: 95000,
        imagen: "../MEDIA/TIENDA/bobina-alta.jpg"
    },
    {
        id: "PROD-009",
        nombre: "Filtro de Aire Alto Flujo Lavable",
        categoria: "transmision",
        descripcion: "Filtro reutilizable diseñado para maximizar la entrada de aire sin sacrificar filtrado.",
        precio: 85000,
        imagen: "../MEDIA/TIENDA/filtro-aire.jpg"
    },
    {
        id: "PROD-010",
        nombre: "Kit de Discos de Clouch / Embrague",
        categoria: "transmision",
        descripcion: "Discos de embrague en material de alta fricción para óptima transmisión de potencia.",
        precio: 75000,
        imagen: "../MEDIA/TIENDA/discos-clutch.jpg"
    },
    {
        id: "PROD-011",
        nombre: "Sliders Laterales de Impacto AMS",
        categoria: "accesorios",
        descripcion: "Topes anticaída de alta resistencia con anclaje directo al chasis.",
        precio: 130000,
        imagen: "../MEDIA/TIENDA/sliders.jpg"
    },
    {
        id: "PROD-012",
        nombre: "Sensor de Temperatura de Refrigerante",
        categoria: "electronica",
        descripcion: "Mide con exactitud la temperatura del motor para activar electroventiladores.",
        precio: 65000,
        imagen: "../MEDIA/TIENDA/sensor-temp.jpg"
    }
];

const NUMERO_WHATSAPP = "573104886929";

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
                </div>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarProductos();

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

    document.getElementById("buscador").addEventListener("input", (e) => {
        const catActiva = document.querySelector(".filtro-btn.activo").getAttribute("data-cat");
        renderizarProductos(catActiva, e.target.value);
    });
});