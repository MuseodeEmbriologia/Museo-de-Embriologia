const info = document.getElementById('info');
const arContainer = document.getElementById('ar-container');
const exitBtn = document.getElementById('exit-ar');

// menú
const menubtn = document.getElementsByClassName('menu__btn');
const menu__btn = menubtn[0];

// Modal
const modal = document.getElementById('modal-modelo');
const modalTitulo = document.getElementById('modal-titulo');
const modalDescripcion = document.getElementById('modal-descripcion');
const startBtn = document.getElementById('start-ar');
const cerrarModal = document.getElementById('cerrar-modal');
const modalvideo = document.getElementById('Infovideo');
const spanCerrar = document.getElementsByClassName("Cerrarinfvid")[0];

const abririnf1 = document.getElementById('abririnf1');

const modelosInfo = {
    testiculo: {
        titulo: "Modelos de espermatogénesis",
        descripcion: `Al hacer click en "Iniciar Realidad Aumentada"...`
    }
};

// Abrir modales laterales
const abrirBtn = document.getElementById('redsem-btn');
const abriresp = document.getElementById('esp-btn');
const cerrarBtn = document.getElementById('cerrar-redsem-btn');
const cerraresp = document.getElementById('cerrar-esp-btn');
const moda = document.getElementById('redsem-moda');
const modalesp = document.getElementById('esp-moda');

// Video info
abririnf1.onclick = function () {
    modalvideo.style.display = "block";
};
spanCerrar.onclick = function () {
    modalvideo.style.display = "none";
};

document.querySelectorAll('#menu-modelos button').forEach(btn => {
    btn.addEventListener('click', () => {
        const modelKey = btn.getAttribute('data-model');
        const modelData = modelosInfo[modelKey];

        modalTitulo.textContent = modelData.titulo;
        modalDescripcion.textContent = modelData.descripcion;

        startBtn.dataset.model = modelKey;

        modal.style.display = 'flex';
    });
});

// Cerrar modal principal
cerrarModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// ---------- INICIO AR MEZCLADO ----------
startBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    info.style.display = 'none';
    exitBtn.style.display = 'flex';
    arContainer.style.display = 'block';
    menu__btn.classList.add('active');

    const modelKey = startBtn.dataset.model;

    // Limpiamos cualquier escena anterior
    arContainer.innerHTML = '';

    // Creamos la escena
    const scene = document.createElement('a-scene');
    scene.setAttribute('embedded', '');
    scene.setAttribute('vr-mode-ui', 'enabled: false');
    scene.setAttribute('renderer', 'logarithmicDepthBuffer: true');
    scene.setAttribute('arjs', 'sourceType: webcam; debugUIEnabled: false;');
    scene.style.width = '100%';
    scene.style.height = '100%';

    // Creamos el marcador
    const marker = document.createElement('a-marker');
    marker.setAttribute('type', 'pattern');
    marker.setAttribute('patternUrl', 'markers/pattern-marcaCreeper.patt');

    // Creamos el modelo
    const model = document.createElement('a-entity');
    model.setAttribute('gltf-model', 'Modelos y animaciones/transparente.glb');
    model.setAttribute('scale', '0.5 0.5 0.5'); // Ajusta si es necesario
    model.setAttribute('position', '0 0 0'); // Centrar
    model.setAttribute('rotation', '0 0 0'); // Rotación inicial
    model.setAttribute('gesture-handler', '');

    marker.appendChild(model);
    scene.appendChild(marker);

    // Agregamos cámara
    const camera = document.createElement('a-entity');
    camera.setAttribute('camera', '');
    scene.appendChild(camera);

    arContainer.appendChild(scene);
});
// ---------- FIN AR MEZCLADO ----------

// Salida de AR
exitBtn.addEventListener('click', () => {
    arContainer.style.display = 'none';
    arContainer.innerHTML = '';
    info.style.display = 'block';
    exitBtn.style.display = 'none';
    menu__btn.classList.remove('active');

    const video = document.querySelector('video');
    if (video && video.srcObject) {
        video.srcObject.getTracks().forEach(t => t.







