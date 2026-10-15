const productos = [
    {
        id: "PROD-001",
        nombre: "Smart Display 7 pulgadas CarPlay & Android Auto",
        categoria: "conectividad",
        descripcion: "Pantalla táctil impermeable con mapas en tiempo real, Bluetooth dual y cámara trasera incluida.",
        precio: 480000,
        reciente: true,
        ventas: 50,
        imagen: "../MEDIA/TIENDA/smart-display.jpg"
    },
    {
        id: "PROD-002",
        nombre: "Cámara de Ruta Dual HD (Delantera y Trasera)",
        categoria: "conectividad",
        descripcion: "Sistema de grabación continua en alta definición con lentes blindados para motocicletas.",
        precio: 290000,
        reciente: false,
        ventas: 25,
        imagen: "../MEDIA/TIENDA/electronica-accesorios.jpg"
    },
    {
        id: "PROD-003",
        nombre: "Sensores de Presión de Llantas Inalámbricos (TPMS)",
        categoria: "conectividad",
        descripcion: "Monitoreo en tiempo real de temperatura y presión con pantalla solar recargable.",
        precio: 180000,
        reciente: true,
        ventas: 30,
        imagen: "../MEDIA/TIENDA/electronica-accesorios.jpg"
    },
    {
        id: "PROD-004",
        nombre: "Exploradoras LED de Doble Tono (Ámbar y Blanca)",
        categoria: "iluminacion",
        descripcion: "Alta potencia lumínica con lupa proyectora y selector de luz para niebla o ruta.",
        precio: 250000,
        reciente: true,
        ventas: 65,
        imagen: "../MEDIA/TIENDA/iluminacion-pro.jpg"
    },
    {
        id: "PROD-005",
        nombre: "Faro Principal LED de Alta Proyección",
        categoria: "iluminacion",
        descripcion: "Óptica frontal de alto rendimiento con diseño moderno y bajo consumo eléctrico.",
        precio: 320000,
        reciente: false,
        ventas: 20,
        imagen: "../MEDIA/TIENDA/iluminacion-pro.jpg"
    },
    {
        id: "PROD-006",
        nombre: "Sliders de Alto Impacto Estructural (AMS)",
        categoria: "blindaje",
        descripcion: "Topes anticaída reforzados con núcleo de aluminio y cabezales en polímero de alta resistencia.",
        precio: 140000,
        reciente: false,
        ventas: 40,
        imagen: "../MEDIA/TIENDA/sliders.jpg"
    },
    {
        id: "PROD-007",
        nombre: "Protector de Radiador en Aluminio Corte Láser",
        categoria: "blindaje",
        descripcion: "Rejilla de protección frontal diseñada a la medida para evitar daños por piedras en ruta.",
        precio: 115000,
        reciente: true,
        ventas: 35,
        imagen: "../MEDIA/TIENDA/protector-radiador.jpg"
    },
    {
        id: "PROD-008",
        nombre: "Alarma Inteligente con Sensor de Proximidad",
        categoria: "seguridad",
        descripcion: "Sistema antirrobo con presencia, sensor de impacto por grúa y apagado remoto de motor.",
        precio: 210000,
        reciente: false,
        ventas: 45,
        imagen: "../MEDIA/TIENDA/seguridad-gps.jpg"
    },
    {
        id: "PROD-009",
        nombre: "Módulo GPS Satelital con App Móvil",
        categoria: "seguridad",
        descripcion: "Rastreo en tiempo real 24/7, historial de rutas y control de encendido desde tu celular.",
        precio: 299000,
        reciente: true,
        ventas: 60,
        imagen: "../MEDIA/TIENDA/seguridad-gps.jpg"
    },
    {
        id: "PROD-010",
        nombre: "Chaqueta Técnica para Motero con Protecciones",
        categoria: "equipamiento",
        descripcion: "Diseño ergonómico con protecciones certificadas en hombros, codos y espalda, material reflectivo.",
        precio: 380000,
        reciente: true,
        ventas: 30,
        imagen: "../MEDIA/TIENDA/proteccionesmotero.jpg"
    },
    {
        id: "PROD-011",
        nombre: "Intercomunicador Bluetooth para Casco",
        categoria: "equipamiento",
        descripcion: "Manos libres estéreo con cancelación de ruido, radio FM y conexión para llamadas o GPS.",
        precio: 260000,
        reciente: false,
        ventas: 28,
        imagen: "../MEDIA/TIENDA/electronica-accesorios.jpg"
    },
    {
        id: "PROD-012",
        nombre: "Soporte Antivibración de Manubrio con Cargador USB QC 3.0",
        categoria: "conectividad",
        descripcion: "Sujeción firme de aluminio con puerto de carga rápida USB integrado y protección antivibración para el celular.",
        precio: 95000,
        reciente: false,
        ventas: 55,
        imagen: "../MEDIA/TIENDA/electronica-accesorios.jpg"
    }
];

const NUMERO_WHATSAPP = "573104886929";
let categoriaActual = null;

function filtrarPasillo(categoria) {
    categoriaActual = categoria;
    
    const titulosMap = {
        'conectividad': '📱 Pasillo: Smart Displays & Conectividad',
        'iluminacion': '💡 Pasillo: Iluminación Pro & Óptica',
        'blindaje': '🛡️ Pasillo: Blindaje, Sliders y Protección',
        'seguridad': '🔒 Pasillo: Seguridad y Rastreo Satelital',
        'equipamiento': '🧥 Pasillo: Protección & Equipamiento para el Motero'
    };

    const titulo = document.getElementById("titulo-categoria-activa");
    if (titulo) {
        titulo.innerText = titulosMap[categoria] || "PRODUCTOS";
    }

    renderizarProductos();
}

function cambiarOrden() {
    renderizarProductos();
}

function renderizarProductos() {
    const contenedor = document.getElementById("grid-productos");
    if (!contenedor) return;
    contenedor.innerHTML = "";

    if (!categoriaActual) {
        contenedor.innerHTML = `<div class="sin-productos" style="color:#00b4d8; text-align:center; padding:50px; grid-column:1/-1; font-weight:600; font-size:1.1rem;">👆 Haz clic en cualquiera de los 5 pasillos de arriba para explorar los productos de esa categoría.</div>`;
        return;
    }

    let filtrados = productos.filter(p => p.categoria.toLowerCase().trim() === categoriaActual.toLowerCase().trim());

    const selectOrden = document.getElementById("ordenar");
    const criterioOrden = selectOrden ? selectOrden.value : "destacados";

    if (criterioOrden === "precio-bajo") {
        filtrados.sort((a, b) => a.precio - b.precio);
    } else if (criterioOrden === "precio-alto") {
        filtrados.sort((a, b) => b.precio - a.precio);
    } else if (criterioOrden === "recientes") {
        filtrados.sort((a, b) => (b.reciente === true) - (a.reciente === true));
    } else if (criterioOrden === "destacados") {
        filtrados.sort((a, b) => b.ventas - a.ventas);
    }

    if (filtrados.length === 0) {
        contenedor.innerHTML = `<div class="sin-productos" style="color:#fff; text-align:center; padding:40px; grid-column:1/-1;">No hay productos disponibles en este pasillo actualmente.</div>`;
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
                        <i class="fa-brands fa-whatsapp"></i> Comprar por WhatsApp
                    </a>
                </div>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarProductos();
});
