const productos = [
    {
        id: "PROD-001",
        nombre: "Smart Display 7 pulgadas CarPlay & Android Auto",
        categoria: "conectividad",
        descripcion: "Pantalla táctil impermeable con mapas en tiempo real, Bluetooth dual y cámara trasera incluida.",
        precio: 480000,
        imagen: "../MEDIA/TIENDA/smart-display.jpg"
    },
    {
        id: "PROD-002",
        nombre: "Cámara de Ruta Dual HD (Delantera y Trasera)",
        categoria: "conectividad",
        descripcion: "Sistema de grabación continua en alta definición con lentes blindados para motocicletas.",
        precio: 290000,
        imagen: "../MEDIA/TIENDA/electronica-accesorios.jpg"
    },
    {
        id: "PROD-003",
        nombre: "Sensores de Presión de Llantas Inalámbricos (TPMS)",
        categoria: "conectividad",
        descripcion: "Monitoreo en tiempo real de temperatura y presión con pantalla solar recargable.",
        precio: 180000,
        imagen: "../MEDIA/TIENDA/electronica-accesorios.jpg"
    },
    {
        id: "PROD-004",
        nombre: "Exploradoras LED de Doble Tono (Ámbar y Blanca)",
        categoria: "iluminacion",
        descripcion: "Alta potencia lumínica con lupa proyectora y selector de luz para niebla o ruta.",
        precio: 250000,
        imagen: "../MEDIA/TIENDA/iluminacion-pro.jpg"
    },
    {
        id: "PROD-005",
        nombre: "Faro Principal LED de Alta Proyección",
        categoria: "iluminacion",
        descripcion: "Óptica frontal de alto rendimiento con diseño moderno y bajo consumo eléctrico.",
        precio: 320000,
        imagen: "../MEDIA/TIENDA/iluminacion-pro.jpg"
    },
    {
        id: "PROD-006",
        nombre: "Sliders de Alto Impacto Estructural (AMS)",
        categoria: "blindaje",
        descripcion: "Topes anticaída reforzados con núcleo de aluminio y cabezales en polímero de alta resistencia.",
        precio: 140000,
        imagen: "../MEDIA/TIENDA/sliders.jpg"
    },
    {
        id: "PROD-007",
        nombre: "Protector de Radiador en Aluminio Corte Láser",
        categoria: "blindaje",
        descripcion: "Rejilla de protección frontal diseñada a la medida para evitar daños por piedras en ruta.",
        precio: 115000,
        imagen: "../MEDIA/TIENDA/protector-radiador.jpg"
    },
    {
        id: "PROD-008",
        nombre: "Alarma Inteligente con Sensor de Proximidad",
        categoria: "seguridad",
        descripcion: "Sistema antirrobo con presencia, sensor de impacto por grúa y apagado remoto de motor.",
        precio: 210000,
        imagen: "../MEDIA/TIENDA/seguridad-gps.jpg"
    },
    {
        id: "PROD-009",
        nombre: "Módulo GPS Satelital con App Móvil",
        categoria: "seguridad",
        descripcion: "Rastreo en tiempo real 24/7, historial de rutas y control de encendido desde tu celular.",
        precio: 299000,
        imagen: "../MEDIA/TIENDA/seguridad-gps.jpg"
    },
    {
        id: "PROD-010",
        nombre: "Chaqueta Técnica para Motero con Protecciones",
        categoria: "equipamiento",
        descripcion: "Diseño ergonómico con protecciones certificadas en hombros, codos y espalda, material reflectivo.",
        precio: 380000,
        imagen: "../MEDIA/TIENDA/proteccionesmotero.jpg"
    },
    {
        id: "PROD-011",
        nombre: "Intercomunicador Bluetooth para Casco",
        categoria: "equipamiento",
        descripcion: "Manos libres estéreo con cancelación de ruido, radio FM y conexión para llamadas o GPS.",
        precio: 260000,
        imagen: "../MEDIA/TIENDA/electronica-accesorios.jpg"
    },
    {
        id: "PROD-012",
        nombre: "Soporte Antivibración de Manubrio con Cargador USB QC 3.0",
        categoria: "conectividad",
        descripcion: "Sujeción firme de aluminio con puerto de carga rápida USB integrado y protección antivibración para el celular.",
        precio: 95000,
        imagen: "../MEDIA/TIENDA/electronica-accesorios.jpg"
    }
];

const NUMERO_WHATSAPP = "573104886929";

function renderizarProductos(filtro = "todos", busqueda = "") {
    const contenedor = document.getElementById("grid-productos");
    if (!contenedor) return;
    contenedor.innerHTML = "";

    const filtrados = productos.filter(p => {
        const coincideCat = filtro === "todos" || p.categoria === filtro;
        const coincideNom = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
                            p.descripcion.toLowerCase().includes(busqueda.toLowerCase());
        return coincideCat && coincideNom;
    });

    if (filtrados.length === 0) {
        contenedor.innerHTML = `<div class="sin-productos" style="color:#fff; text-align:center; padding:40px; grid-column:1/-1;">No se encontraron productos en este pasillo con ese criterio.</div>`;
        return;
    }

    filtrados.forEach(prod => {
        const precioFormateado = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(prod.precio);
        const mensajeWA = encodeURIComponent(`Hola ALLMOTOSYNC, me interesa comprar el producto: *${prod.nombre}* (Ref: ${prod.id}) por valor de ${precioFormateado}. ¿Tienen disponibilidad en la tienda?`);
        
        const card = document.createElement("div");
        card.className = "tarjeta-producto";
        card.innerHTML = `
            <div class="img-wrapper" style="height: 200px; background: #000; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                <img src="${prod.imagen}" alt="${prod.nombre}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='https://placehold.co/400x300/111/FF6600?text=ALLMOTOSYNC'">
            </div>
            <div class="info-producto" style="padding: 18px; text-align: left;">
                <span class="tag-categoria" style="color: #00b4d8; font-size: 0.7rem; font-weight: 800; letter-spacing: 1px;">${prod.categoria.toUpperCase()}</span>
                <h3 style="color: #fff; font-size: 1.1rem; margin: 8px 0;">${prod.nombre}</h3>
                <p style="color: #cbd5e1; font-size: 0.85rem; line-height: 1.4; margin-bottom: 15px;">${prod.descripcion}</p>
                <div class="precio" style="color: #FF6600; font-weight: 800; font-size: 1.25rem; margin-bottom: 15px;">${precioFormateado}</div>
                <div class="botones-accion">
                    <a href="https://wa.me/${NUMERO_WHATSAPP}?text=${mensajeWA}" target="_blank" class="btn-whatsapp" style="display: flex; align-items: center; justify-content: center; gap: 8px; background: #25D366; color: #fff; padding: 10px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 0.9rem;">
                        <i class="fa-brands fa-whatsapp"></i> Comprar por WhatsApp
                    </a>
                </div>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarProductos("todos");
});
