// --- EXPEDIENTE DIGITAL ---
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vThzRfHI32azvtbo9O6qH1acg2SIxB8n5iiLkrSsgk49M6Tzyy3PlnarOCl5466-MDlUBOLHPMBl55w/pub?gid=0&single=true&output=csv';

function protegerNombre(nombreCompleto) {
    if (!nombreCompleto) return "Cliente AMS";
    const partes = nombreCompleto.trim().replace(/"/g, "").split(" ");
    return partes.map((palabra, index) => {
        if (index < 2) return palabra.length > 3 ? palabra.substring(0, 3) + "***" : palabra;
        return palabra.substring(0, 1) + "***";
    }).join(" ");
}

// Parser CSV robusto que respeta comas y comillas
function parsearCSVLine(text) {
    const result = [];
    let row = [];
    let insideQuotes = false;
    let entry = '';
    
    for (let i = 0; i < text.length; i++) {
        let c = text[i];
        if (c === '"') {
            if (insideQuotes && text[i + 1] === '"') {
                entry += '"';
                i++;
            } else {
                insideQuotes = !insideQuotes;
            }
        } else if (c === ',' && !insideQuotes) {
            row.push(entry.trim());
            entry = '';
        } else if ((c === '\r' || c === '\n') && !insideQuotes) {
            row.push(entry.trim());
            result.push(row);
            row = [];
            if (c === '\r' && text[i + 1] === '\n') {
                i++;
            }
            entry = '';
        } else {
            entry += c;
        }
    }
    if (entry !== '' || row.length > 0) {
        row.push(entry.trim());
        result.push(row);
    }
    return result;
}

async function consultarMoto() {
    const placaInput = document.getElementById('placa').value.trim().toUpperCase();
    const passInput = document.getElementById('pass').value.trim();
    const divResultado = document.getElementById('resultado-historial');

    if (!placaInput || !passInput) {
        alert("Por favor ingresa la placa y la contraseña.");
        return;
    }

    try {
        const respuesta = await fetch(SHEET_URL);
        const data = await respuesta.text();
        const filas = parsearCSVLine(data);

        const registros = filas.filter(f => f[1] && f[1].replace(/"/g, "").trim().toUpperCase() === placaInput);

        if (registros.length > 0) {
            const ultimaEntrada = registros[registros.length - 1].map(val => val ? val.replace(/^"|"$/g, '') : '');

            if (ultimaEntrada[2] && ultimaEntrada[2].trim() === passInput) {
                divResultado.style.display = 'block';
                divResultado.innerHTML = `
                    <div style="border-bottom: 2px solid #FF6600; padding-bottom: 10px; margin-bottom: 20px;">
                        <h3 style="margin: 0; color: #fff;">EXPEDIENTE AMS: ${ultimaEntrada[1]}</h3>
                        <small style="color: #FF6600;">Registrado el: ${ultimaEntrada[0] || 'Reciente'}</small>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                        <div>
                            <p style="margin: 5px 0;"><strong>Propietario:</strong> ${protegerNombre(ultimaEntrada[3])}</p>
                            <p style="color: #25D366; font-size: 0.85rem; margin: 5px 0;">✅ SOAT: ${ultimaEntrada[6] || '---'}</p>
                            <p style="color: #25D366; font-size: 0.85rem; margin: 5px 0;">✅ TECNO: ${ultimaEntrada[7] || '---'}</p>
                        </div>
                        <div style="background: #111; padding: 10px; border-radius: 8px; border: 1px solid #333;">
                            <p style="margin: 2px 0; font-size: 0.8rem;"><strong>KM INGRESO:</strong> ${ultimaEntrada[8] || '--'}</p>
                            <p style="margin: 2px 0; font-size: 0.8rem;"><strong>KM SALIDA:</strong> ${ultimaEntrada[9] || '--'}</p>
                        </div>
                    </div>
                    
                    <div style="background: #000; border-radius: 10px; padding: 15px; border-left: 5px solid #FF6600;">
                        <h4 style="margin: 0 0 10px 0; color: #FF6600; font-size: 0.9rem;">REPORTE TÉCNICO:</h4>
                        <div style="color: #ddd; font-size: 0.9rem; line-height: 1.5;">
                            ${ultimaEntrada[11] ? ultimaEntrada[11].replace(/🔹/g, '<br>🔹') : 'Cargando detalles...'}
                        </div>
                    </div>
                `;
                divResultado.scrollIntoView({ behavior: 'smooth' });
                hablarTecnico('¡Expediente encontrado! Revisa el reporte técnico de tu motocicleta.');
            } else {
                alert("La contraseña no coincide para esta placa.");
                hablarTecnico('Ups, la contraseña parece incorrecta. Inténtalo de nuevo.');
            }
        } else {
            alert("No se encontró historial para la placa " + placaInput);
            hablarTecnico('No encontré esa placa en la base de datos de AMS.');
        }
    } catch (error) {
        console.error("Error al consultar:", error);
        alert("Error al conectar con la base de datos.");
    }
}

// --- IMÁGENES ROTATIVAS DEL TÉCNICO CALIFICADO ---
const imagenesTecnico = [
    "MEDIA/A_stylized_3D_avatar_of_a_whimsical_fantasy_Leprechaun_engin (1).jpg",
    "MEDIA/A_stylized_3D_avatar_of_a_whimsical_fantasy_Leprechaun_engin (2).jpg",
    "MEDIA/A_stylized_3D_avatar_of_a_whimsical_fantasy_Leprechaun_engin (3).jpg",
    "MEDIA/A_stylized_3D_avatar_of_a_whimsical_fantasy_Leprechaun_engin.jpg"
];

let indiceImagenActual = 0;

// --- 100 CONSEJOS TECNOLÓGICOS DEL DUENDE AMS ---
const consejosAMS = [
    // Categoría 1: Smart Displays (1-20)
    "CarPlay evita sacar el celular bajo la lluvia bogotana. ¡Seguridad total!",
    "La conexión Wi-Fi 5G elimina cables molestos en tu manubrio.",
    "Pantallas de 5\" a 6\" para ciudad; 7\" para visión clara en rutas largas.",
    "El brillo automático evita encandilarte manejando de noche.",
    "Una cámara de ruta graba tus rodadas y sirve de evidencia ante imprevistos.",
    "No laves la moto a presión directamente sobre las conexiones de tu CarPlay.",
    "Monitorear la presión de llantas previene sustos por pinchazos.",
    "Bluetooth dual: escucha música en el casco y recibe guía de ruta al tiempo.",
    "Descarga mapas offline antes de viajar para rodar sin gastar datos.",
    "El vidrio templado en tu pantalla la protege contra rayones de piedras.",
    "Soportes antivibración en aluminio alargan la vida útil de tu Smart Display.",
    "Configura el control por voz y navega sin soltar el manubrio.",
    "Pide pantallas con táctil para guantes para no congelarte las manos.",
    "Alimentación directa a batería con fusible protege de picos de voltaje.",
    "Emparejamiento instantáneo con tus intercomunicadores de casco.",
    "Es normal que la pantalla caliente al sol; ubícala donde fluya el aire.",
    "Limpia la pantalla con microfibra y spray especial, jamás con alcohol.",
    "Actualizar el firmware mejora la fluidez y la conexión inalámbrica.",
    "La pantalla dividida te muestra mapa y música al mismo tiempo.",
    "Un Smart Display bien instalado le da look de cabina de avión a tu moto.",

    // Categoría 2: Iluminación Pro (21-40)
    "Jamás cortes cables originales; un relé y fusible salvan tu sistema eléctrico.",
    "Luces de 4000K-4500K cortan la neblina bogotana mejor que la luz blanca.",
    "Exploradoras con doble función (blanca/amarilla) son la mejor inversión.",
    "Apunta las exploradoras ligeramente abajo para no cegar a los demás.",
    "Usa LED de alta eficiencia para no sobrecargar el estator de tu moto.",
    "Un switch impermeable al manubrio marca la diferencia en un trabajo pro.",
    "Soportes de acero inoxidable evitan vibraciones y desajustes en ruta.",
    "Un faro LED de alta potencia multiplica tu visión nocturna lateral.",
    "Protege empalmes con manguera termocontraíble contra la humedad.",
    "Usa luces estroboscópicas solo para emergencias en carretera.",
    "Alinea las exploradoras con el peso real que llevas al rodar.",
    "Una buena iluminación te hace visible en puntos ciegos de autos.",
    "Verifica que el cableado soporte el amperaje de tus exploradoras.",
    "Mantiene el disipador de las exploradoras libre de barro para enfriar bien.",
    "Módulos de encendido con retraso cuidan tu batería en el arranque.",
    "Una luz de freno con flash previene choques por alcance en tráfico.",
    "Las lupas de proyección concentran la luz exactamente en la vía.",
    "Limpia los lentes de tus luces; los mosquitos restan 50% de potencia.",
    "Usa tornillería Allen en acero inoxidable para evitar óxido temprano.",
    "Iluminar bien la vía es tu mejor póliza de seguro de noche.",

    // Categoría 3: Seguridad y Rastreo (41-60)
    "El sensor de presencia apaga la moto si te alejas de ella en un hurto.",
    "GPS con modo reposo evita descargar la batería estando parqueada.",
    "Ocultamos el módulo GPS con aislamiento para que nadie lo encuentre.",
    "Alarma con sensor de impacto avisa si intentan subir tu moto a grúas.",
    "El corte remoto debe instalarse seguro sin apagar la moto en curvas.",
    "Combina candado mecánico con alarma electrónica para dormir en paz.",
    "Llaveros de código rodante evitan la clonación de tu señal.",
    "Revisa la batería interna de tu alarma una vez al año.",
    "Chapa blindada frena ataques con llaves maestras o destornilladores.",
    "Tornillos de seguridad en accesorios evitan robos en semáforos.",
    "Sensor de inclinación detecta si intentan enderezar la moto.",
    "Sirenas de alta potencia desubican al ladrón y alertan al entorno.",
    "Conectar mal una alarma genera fugas de corriente; acude a expertos.",
    "Configura alertas al celular para saber la ubicación en tiempo real.",
    "Un corta-corriente oculto sigue siendo infalible contra el hurto.",
    "Nuestros GPS incluyen triangulación celular por si pierdes satélite.",
    "Chapas reforzadas en maletas protegen tu casco y pertenencias.",
    "El cableado de alarma se mimetiza con el arnés original de fábrica.",
    "Un sistema de seguridad activo evita pasar el mal rato del robo.",
    "En AllMotoSync blindamos tu moto cuidando cada conexión eléctrica.",

    // Categoría 4: Protección y Lujos Prémium (61-80)
    "El protector de radiador en aluminio salva el motor de piedras en vía.",
    "Sliders de chasis deben doblarse antes de romper la estructura.",
    "Protectores de bomba de freno evitan fugas por caídas tontas.",
    "Defensas tubulares distribuyen impactos sin comprometer el motor.",
    "Protector de cárter en aluminio cuida los bajos en vías destapadas.",
    "Topes en ejes salvan tijeras y barras de suspensión en caídas.",
    "Evita sliders rígidos; si enganchan el piso, la moto dará botes.",
    "Protector de farola evita romper ópticas costosas en carretera.",
    "Manecillas abatibles evitan quedarte sin frenos ante una caída.",
    "Grips de tanque mejoran agarre con piernas y cuidan la pintura.",
    "Pernos con arandela de presión evitan que se aflojen por vibración.",
    "Guardabarros extendido protege el monoamortiguador de barro y arena.",
    "Tapones de marco evitan acumulación de humedad y óxido en el chasis.",
    "Protector de depósito de freno frena daños o vandalismo.",
    "Herrajes de desmontaje rápido para cuando andas sin maletas en ciudad.",
    "Quilla inferior le da un aspecto deportivo y protege el escape.",
    "Espejos rebatibles facilitan filtrar entre vehículos en Bogotá.",
    "Tornillería en acero inoxidable elimina el molesto óxido naranja.",
    "Protector de mofle evita quemaduras al pasajero al desmontar.",
    "La protección estética mantiene alto el valor comercial de tu moto.",

    // Categoría 5: Conectividad y Estética AMS (81-100)
    "Cargador USB dual QC 3.0 para mantener tu celular al 100% en ruta.",
    "Usa puertos USB con interruptor para evitar consumos fantasma.",
    "Revisa el sistema de carga a tiempo para no quedarte varado.",
    "Soportes antivibración protegen el estabilizador óptico de tu cámara.",
    "Limpia-contactos en aerosol previene fallas por humedad bogotana.",
    "Exige cableado oculto; los cables expuestos dañan la estética.",
    "Terminales selladas y estaño garantizan cero sulfatación.",
    "En un Tech-Studio no verás amarracables sobrantes mal cortados.",
    "Mantén las apps de tu Smart Display actualizadas para mejor fluidez.",
    "Un voltímetro en el tablero avisa fallas en el regulador a tiempo.",
    "Cinta termocontraíble es la norma de oro en empalmes profesionales.",
    "Combina tonos oscuros con detalles metálicos para un look prémium.",
    "Recubrimiento cerámico en plásticos facilita la lavada de fin de semana.",
    "Baterías de litio reducen peso pero requieren cargadores especiales.",
    "El Expediente Digital AMS guarda el historial tecnológico de tu moto.",
    "Una moto iluminada y protegida está lista para cualquier aventura.",
    "Un Tech-Studio especializado te ahorra tiempo y dolores de cabeza.",
    "Respetar el arnés original de fábrica es nuestra regla de oro.",
    "Aprovecha beneficios pagando con transferencia o efectivo en sede.",
    "¡Bienvenido a la era de la tecnología sobre dos ruedas en AllMotoSync!"
];

const mensajesRedes = {
    whatsapp: "¡De una! Te abro el WhatsApp para cotizar o agendar cita directo en el taller...",
    instagram: "¡Vamos a Instagram a ver las fotos de los mejores diagnósticos y trabajos!",
    facebook: "¡Te dirijo al Facebook oficial de AllMotoSync!",
    tiktok: "¡De una, vamos a TikTok a ver los casos clínicos y videos técnicos! 🎬",
    mercadolibre: "¡Te redirijo a la tienda para ver repuestos y accesorios disponibles!"
};

const tecnicoText = document.getElementById('tecnico-text');
const imgTecnico = document.getElementById('img-tecnico');

function hablarTecnico(mensaje) {
    if (!tecnicoText) return;
    tecnicoText.style.animation = 'none';
    tecnicoText.offsetHeight;
    tecnicoText.style.animation = 'popupTecnico 0.4s ease-out';
    tecnicoText.innerHTML = mensaje;
}

function cambiarImagenTecnico() {
    if (!imgTecnico) return;
    indiceImagenActual = (indiceImagenActual + 1) % imagenesTecnico.length;
    imgTecnico.style.opacity = '0.2';
    setTimeout(() => {
        imgTecnico.src = imagenesTecnico[indiceImagenActual];
        imgTecnico.style.opacity = '1';
    }, 150);
}

function cambiarTipYFotoManual() {
    const randomTip = consejosAMS[Math.floor(Math.random() * consejosAMS.length)];
    cambiarImagenTecnico();
    hablarTecnico(randomTip);
}

// Rotación automática cada 12 segundos
setInterval(() => {
    cambiarTipYFotoManual();
}, 12000);

function irARedSocial(red, url) {
    if (mensajesRedes[red]) {
        hablarTecnico(mensajesRedes[red]);
        setTimeout(() => {
            window.open(url, '_blank');
        }, 1200);
    } else {
        window.open(url, '_blank');
    }
}

// --- SCROLL Y SERVICE WORKER ---
window.onscroll = function() {
    var header = document.getElementById("miHeader");
    if (header) {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            header.classList.add("header-reducido");
        } else {
            header.classList.remove("header-reducido");
        }
    }
};

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./service-worker.js')
            .then(function(registration) {
                console.log('AMS App lista:', registration.scope);
            })
            .catch(function(err) {
                console.log('Fallo registro AMS:', err);
            });
    });
}
