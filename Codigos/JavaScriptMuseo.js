// ======================
// Elementos principales
// ======================
const info = document.getElementById('info');
const arContainer = document.getElementById('ar-container');
const exitBtn = document.getElementById('exit-ar');

// Menú hamburguesa
const menu__btn = document.getElementsByClassName('menu__btn')[0];

// Modal principal
const modal = document.getElementById('modal-modelo');
const modalTitulo = document.getElementById('modal-titulo');
const modalDescripcion = document.getElementById('modal-descripcion');
const startBtn = document.getElementById('start-ar');
const cerrarModal = document.getElementById('cerrar-modal');

// Modal video
const modalvideo = document.getElementById('Infovideo');
const spanCerrar = document.getElementsByClassName("Cerrarinfvid")[0];
const abririnf1 = document.getElementById('abririnf1');

// Modales laterales
const abrirBtn = document.getElementById('redsem-btn');
const abriresp = document.getElementById('esp-btn');
const cerrarBtn = document.getElementById('cerrar-redsem-btn');
const cerraresp = document.getElementById('cerrar-esp-btn');
const moda = document.getElementById('redsem-moda');
const modalesp = document.getElementById('esp-moda');


const modelosInfo = {
    testiculo: {
        titulo: "Modelos de espermatogénesis",
        descripcion: `Al hacer click en "Iniciar Realidad Aumentada"...`
    }
};


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

cerrarModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

startBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    info.style.display = 'none';
    exitBtn.style.display = 'flex';
    arContainer.style.display = 'block';
    menu__btn.classList.add('active');

    const scene = document.createElement('a-scene');
    scene.setAttribute('embedded', '');
    scene.setAttribute('vr-mode-ui', 'enabled: false');
    scene.setAttribute('renderer', 'logarithmicDepthBuffer: true');
    scene.setAttribute('arjs', 'sourceType: webcam; debugUIEnabled: false; videoTextureSize: 1024x768;');


    const marker = document.createElement('a-marker');
    marker.setAttribute('type', 'pattern');
    marker.setAttribute('url', 'markers/pattern-marcaCreeper.patt');

    const model = document.createElement('a-entity');
    model.setAttribute('gltf-model', 'Modelos y animaciones/Testiculo12.glb');
    model.setAttribute('scale', '0.2 0.2 0.2');
    model.setAttribute('position', '0 0 0');
    model.setAttribute('rotation', '0 0 0');
    model.setAttribute('gesture-handler', '');

    marker.appendChild(model);
    scene.appendChild(marker);

    const camera = document.createElement('a-entity');
    camera.setAttribute('camera', '');
    scene.appendChild(camera);

    arContainer.innerHTML = '';
    arContainer.appendChild(scene);
});

exitBtn.addEventListener('click', () => {
    arContainer.style.display = 'none';
    arContainer.innerHTML = '';
    info.style.display = 'block';
    exitBtn.style.display = 'none';
    menu__btn.classList.remove('active');

    const video = document.querySelector('video');
    if (video && video.srcObject) {
        video.srcObject.getTracks().forEach(t => t.stop());
    }
});

abrirBtn.addEventListener('click', () => {
    moda.style.display = 'flex';
});
cerrarBtn.addEventListener('click', () => {
    moda.style.display = 'none';
});
abriresp.addEventListener('click', () => {
    modalesp.style.display = 'flex';
});
cerraresp.addEventListener('click', () => {
    modalesp.style.display = 'none';
});










