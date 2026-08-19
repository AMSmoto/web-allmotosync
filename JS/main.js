// --- EXPEDIENTE DIGITAL ---
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vThzRfHI32azvtbo9O6qH1acg2SIxB8n5iiLkrSsgk49M6Tzyy3PlnarOCl5466-MDlUBOLHPMBl55w/pub?gid=0&single=true&output=csv';

function protegerNombre(nombreCompleto) {
    if (!nombreCompleto) return "Cliente AMS";
    const partes = nombreCompleto.split(" ");
    return partes.map((palabra, index) => {
        if (index < 2) return palabra.length > 3 ? palabra.substring(0, 3) + "***" : palabra;
        return palabra.substring(0, 1) + "***";
    }).join(" ");
}

async function consultarMoto() {
    const placaInput = document.getElementById('placa').value.trim().toUpperCase();
    const passInput = document.getElementById('pass').value.trim();
    const divResultado = document.getElementById('resultado-historial');

    try {
        const respuesta = await fetch(SHEET_URL);
        const data = await respuesta.text();
        const filas = data.split('\n').map(fila => fila.split(','));

        const registros = filas.filter(f => f[1] && f[1].trim().toUpperCase() === placaInput);

        if (registros.length > 0) {
            const ultimaEntrada = registros[registros.length - 1];

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
        alert("Error al conectar con la base de datos.");
    }
}

// --- IMÁGENES ROTATIVAS DEL TÉCNICO CALIFICADO (RUTAS CORREGIDAS A MEDIA/) ---
const imagenesTecnico = [
    "MEDIA/A_stylized_3D_avatar_of_a_whimsical_fantasy_Leprechaun_engin (1).jpg",
    "MEDIA/A_stylized_3D_avatar_of_a_whimsical_fantasy_Leprechaun_engin (2).jpg",
    "MEDIA/A_stylized_3D_avatar_of_a_whimsical_fantasy_Leprechaun_engin (3).jpg",
    "MEDIA/A_stylized_3D_avatar_of_a_whimsical_fantasy_Leprechaun_engin.jpg"
];

let indiceImagenActual = 0;

// --- 100 TIPS TÉCNICOS AMS ---
const tipsTecnicos100 = [
    "El escáner OEM detecta fallas intermitentes que no siempre encienden el testigo Check Engine.",
    "Sincronizar no es solo lavar partes; es calibrar el cuerpo de aceleración mediante escáner.",
    "Un sensor TPS descalibrado genera tirones bruscos al acelerar en bajas revoluciones.",
    "La humedad en el líquido de frenos reduce el punto de ebullición y provoca pérdida de presión.",
    "El mapa de inyección ajusta el tiempo de apertura del inyector según temperatura y presión.",
    "Lavar inyectores en tina de ultrasonido remueve depósitos que alteran el patrón de pulverización.",
    "Un filtro de aire saturado enriquece la mezcla en exceso y aumenta el consumo de combustible.",
    "Las bujías de iridio garantizan una chispa constante y soportan mayores exigencias térmicas.",
    "Revisar el voltaje de la batería en marcha evita fallas fantasma en los módulos electrónicos.",
    "El ajuste de holgura de válvulas es vital para mantener la compresión correcta del motor.",
    "Reprogramar la ECU optimiza la entrega de torque sin comprometer la confiabilidad del motor.",
    "Un sensor de oxígeno O2 desgastado ralentiza la corrección de combustible en tiempo real.",
    "El líquido de frenos DOT 4 absorbe humedad con el tiempo; cámbialo al menos una vez al año.",
    "Una cadena muy tensionada destruye los rodamientos de la caja de cambios y del piñón de salida.",
    "El sensor IAT mide la temperatura del aire para adaptar la densidad del combustible inyectado.",
    "Los conectores eléctricos sulfatados alteran el voltaje de retorno de los sensores analógicos.",
    "Sincronizar los cuerpos de aceleración dobles evita vibraciones molestas a ralentí.",
    "Un regulador de voltaje dañado puede quemar la bomba de gasolina o la propia computadora.",
    "Instalar accesorios con relé dedicado protege el arnés principal y la red CAN-Bus de la moto.",
    "El escáner permite realizar prueba de actuadores para probar solenoides sin desmontarlos.",
    "El líquido refrigerante orgánico evita la cavitación y corrosión en el radiador de aluminio.",
    "Sensores CKP sucios de limalla magnética causan apagones repentinos en caliente.",
    "El sensor MAP mide la presión absoluta del colector para calcular la carga del motor.",
    "Un inyector goteando puede lavar la película de aceite del cilindro y rayar el pistón.",
    "El balanceo de ruedas elimina vibraciones en el manubrio a más de 80 km/h.",
    "El sistema ABS modula la presión hidráulica hasta 15 veces por segundo para evitar el bloqueo.",
    "Ajustar el sensor de posición de mariposa requiere precisión milimétrica de microvoltios.",
    "Las fugas de vacío en la admisión provocan ralentí inestable y aceleración tardía.",
    "Usar limpiadores agresivos en el cuerpo de inyección puede corroer el recubrimiento especial.",
    "Un relé principal sulfatado genera cortes intermitentes de corriente en toda la moto.",
    "El diagnóstico osciloscópico analiza la forma de onda de los inyectores en microsegundos.",
    "Una chispa débil no siempre es la bujía; puede ser la bobina de encendido desvalorizada.",
    "El sensor de inclinación apaga la bomba de combustible inmediatamente en caso de caída.",
    "Controlar la presión de gasolina en la rampa confirma si la bomba tiene la fuerza requerida.",
    "El mantenimiento preventivo sale siempre más económico que reparar fallas catastróficas.",
    "Verificar la tensión de la cadenilla de distribución previene choques entre válvulas y pistón.",
    "El líquido de frenos sintético resiste temperaturas extremas en curvas y bajadas prolongadas.",
    "Sensores Hall desalineados impiden que la ECU detecte el punto muerto superior (PMS).",
    "El escáner borra los códigos de falla históricos para evaluar cambios reales en tiempo real.",
    "Un tapón de radiador desgastado pierde la capacidad de mantener presión y causa sobrecalentamiento.",
    "El remapeo ajusta las curvas de combustible para compensar modificaciones como escape de alto flujo.",
    "La lubricación adecuada del cable de acelerador garantiza una respuesta suave y precisa.",
    "Cables de batería flojos son la causa #1 de fallas de arranque en sistemas de inyección.",
    "El filtro de gasolina sumergido en el tanque debe cambiarse periódicamente para no forzar la bomba.",
    "La prueba de compresión de cilindros revela el estado interno de anillos y asentamiento de válvulas.",
    "El acelerador electrónico (Ride-by-Wire) requiere calibración de tope mínimo y máximo por escáner.",
    "Los rodamientos de la cuna de dirección desgastados generan inestabilidad en recta.",
    "Sensores de rueda ABS sucios con barro o limalla arrojan códigos de falla falsos.",
    "El uso de combustible de bajo octanaje en motores de alta compresión produce cascabeleo (cascabeleo).",
    "Limpiar los bornes de la batería con agua tibia elimina la sulfatación rápidamente.",
    "El aceite sintético mantiene sus propiedades viscosas a temperaturas más altas que el mineral.",
    "Un termostato pegado en posición cerrada destruirá el empaque de culata por sobrecalentamiento.",
    "Las fugas en el empaque de escape alteran la lectura del sensor O2 y enriquecen la mezcla.",
    "Revisar el estado del diafragma de aire previene entradas de aire no contabilizadas.",
    "El solenoide de marcha mínima (IACV) regula el paso de aire cuando no estás acelerando.",
    "Pruebas de fuga de cilindro (Leak Down) identifican exactamente por dónde se pierde compresión.",
    "La banda de hule protectora en el basculante evita que la cadena corte el aluminio.",
    "Un sensor ECT defectuoso le hace creer a la computadora que el motor siempre está frío.",
    "La holgura correcta en la manigueta de embrague evita que los discos patinen prematuramente.",
    "Fusibles sulfatados generan caídas de tensión indetectables con un simple multímetro.",
    "El escáner OEM muestra el historial de temperaturas máximas alcanzadas por el motor.",
    "Un disco de freno alabeado (pando) provoca pulsaciones molestas en la manigueta al frenar.",
    "El protector de bobina evita que saltos de alta tensión dañen la unidad de control (ECU).",
    "Los inyectores piezoeléctricos trabajan con voltajes elevados para lograr aperturas ultra rápidas.",
    "El torque adecuado en los tornillos de culata es vital para evitar deformaciones térmicas.",
    "Un interruptor de pata lateral defectuoso apagará el motor de forma imprevista al meter cambio.",
    "Cambiar el filtro de aceite en cada cambio de lubricante prolonga la vida útil del cigüeñal.",
    "El escáner analiza la señal del sensor TPS durante todo su recorrido sin desmontar el cuerpo.",
    "Las pastillas de freno sinterizadas ofrecen mayor agarre pero requieren discos de calidad alta.",
    "El kit de arrastre debe cambiarse completo: piñón, corona y cadena de o-rings.",
    "El exceso de aceite en el cárter crea espuma y aumenta la presión en los retenes.",
    "Un sensor de velocidad dañado no solo anula el velocímetro, también afecta el calculador del ABS.",
    "El mantenimiento del sistema de refrigeración incluye drenaje, limpieza de circuito y refrigerante nuevo.",
    "El sensor de detonación (Knock Sensor) retrasa el tiempo de encendido si detecta autoencendido.",
    "Verificar la alineación de la rueda trasera asegura un desgaste parejo de las llantas.",
    "El sistema EVAP capta vapores de gasolina para quemarlos en el motor y reducir emisiones.",
    "La prueba de carga a la batería determina su capacidad real de arranque, no solo su voltaje.",
    "Usar agua de grifo en el radiador crea sarro y bloquea los conductos del bloque del motor.",
    "El remapeo de fábrica suele venir restringido por normativas de emisiones; un remap libera su potencial.",
    "Un amortiguador traseros vencido provoca que la llanta rebote perdiendo tracción en curvas.",
    "Los cables de alta tensión envejecidos pierden aislamiento y derivan chispa al chasis.",
    "El filtro de aire de alto flujo requiere lavado y aceitado especial para no dejar pasar mugre.",
    "Un alternador con diodo dañado genera corriente alterna que enloquece la computadora.",
    "Las mangueras de freno de goma se expanden con el tiempo; las blindadas mantienen la presión constante.",
    "El escáner registra el número de arranques y las horas totales de funcionamiento del motor.",
    "Un buje de tijera desgastado produce desalineación trasera y sensación de coletazo.",
    "La calibración del sensor de marcha enganchada (Gear Sensor) es clave para el funcionamiento del Quickshifter.",
    "Un regulador de presión de combustible pegado genera exceso de humo negro en el escape.",
    "La limpieza de los sensores de oxígeno se realiza con aire y productos sin silicón.",
    "La holgura de la manigueta de freno asegura que las pastillas no queden rozando el disco.",
    "Un electroventilador que gira lento no disipará suficiente calor en trancones densos.",
    "Revisar el estado del piñón de arranque previene ruidos metálicos al encender.",
    "Los conectores sellados con empaque de silicona evitan la entrada de agua en lavados a presión.",
    "El mantenimiento preventivo de la horquilla delantera cambia el aceite hidráulico retenido.",
    "Un tapón de aceite magnético atrapa partículas ferrosas evitando que circulen en el motor.",
    "El sensor CPS detecta la posición del árbol de levas para sincronizar la secuencia de inyección.",
    "El remapeo personalizado ajusta el mapa de combustible según la altitud de la ciudad.",
    "Una prueba de vacío constante determina la salud mecánica de los sellos de válvula.",
    "El escáner especializado de AMS permite resetear los parámetros adaptativos de la ECU.",
    "Confía el corazón electrónico de tu motocicleta únicamente en especialistas con equipo OEM."
];

const tipsEspecificos = {
    escaner: "El escáner OEM lee códigos DTC y datos en vivo para detectar fallas que a simple vista no se ven.",
    inyeccion: "Sincronizar no es solo lavar piezas; es calibrar el cuerpo de aceleración con escáner para evitar exceso de consumo.",
    remap: "Reprogramamos la ECU para optimizar la curva de potencia y la respuesta del acelerador según la altitud.",
    accesorios: "Instalamos accesorios protegiendo la red CAN-Bus de la moto para evitar cortocircuitos.",
    arrastre: "Mantener la cadena tensionada y lubricada duplica la vida útil de las coronas y del piñón de salida.",
    electrico: "Utilizamos termoencogible y aislamiento automotriz para instalaciones de GPS totalmente limpias.",
    frenos: "Si la manigueta se siente esponjosa, tienes aire o humedad en el líquido. Salva tu sistema ABS a tiempo.",
    sincro: "Un mantenimiento preventivo periódico de inyección evita el desgaste prematuro de las válvulas."
};

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
    const randomTip = tipsTecnicos100[Math.floor(Math.random() * tipsTecnicos100.length)];
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
