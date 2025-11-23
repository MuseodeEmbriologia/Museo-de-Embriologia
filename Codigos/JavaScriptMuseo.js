
function $id(id) { return document.getElementById(id); }
function safeAddEvent(el, ev, fn) { if (el) el.addEventListener(ev, fn); }
function stopVideoTracks() {
  const video = document.querySelector('video');
  if (video && video.srcObject) {
    video.srcObject.getTracks().forEach(t => t.stop());
    video.srcObject = null;
  }
}

// --- Elementos principales ---
const info = $id('info');
const arContainer = $id('ar-container');
const exitBtn = $id('exit-ar');

// menú (puede no existir)
const menu__btn = (document.getElementsByClassName('menu__btn') || [null])[0] || null;

// Modal principal
const modal = $id('modal-modelo');
const modalTitulo = $id('modal-titulo');
const modalDescripcion = $id('modal-descripcion');
const startBtn = $id('start-ar');
const cerrarModal = $id('cerrar-modal');

// Modales varios (se buscan de forma segura)
const modalsem = $id('Infosem');
const spanCerrarsem = (document.getElementsByClassName('Cerrarinfsem') || [null])[0];

const modalvideo = $id('Infovideo');
const spanCerrar = (document.getElementsByClassName('Cerrarinfvid') || [null])[0];

const modalinfoepi = $id('Infoepi');
const spanCerrarepi = (document.getElementsByClassName('Cerrarinfepi') || [null])[0];

const modalinfoespergen = $id('Infoespergen');
const spanCerrarespergen = (document.getElementsByClassName('Cerrarespergen') || [null])[0];

// Botones "abrir info" (pueden llamarse de forma distinta en tu HTML).
// Intento obtener por varios nombres que usaste en el código anterior.
const abririnfsem = $id('abririnfsem') || $id('redsem-btn') || null;
const abririnf1 = $id('abririnf1') || $id('recorrido-btn') || null;
const abririnf2 = $id('abririnf2') || $id('epididimo-btn') || null;
const abririnfespergen = $id('abririnfespergen') || $id('espergen-btn') || null;

// Modales laterales / botones
const abrirBtn = $id('redsem-btn');
const cerrarBtn = $id('cerrar-redsem-btn');
const moda = $id('redsem-moda');

const abrirrecorrido = $id('recorrido-btn');
const cerrarrecorrido = $id('cerrar-recorrido-btn');
const modalrecorrido = $id('recorrido-moda');

const abrirespergen = $id('espergen-btn');
const cerrarespergen = $id('cerrar-espergen-btn');
const modalespergen = $id('espergen-moda');

const abrirepi = $id('epididimo-btn');
const cerrarepi = $id('cerrar-epididimo-btn');
const modaepi = $id('epididimo-moda');

// Información de cada modelo (puedes ampliar)
const modelosInfo = {
  testiculo: {
    titulo: "Modelos de espermatogénesis",
    descripcion: 'Al hacer click en el botón de "Iniciar Realidad aumentada", se abrirá la cámara. Asegúrate de permitir el acceso.'
  }
};

// --- Modales / UI ---
// Tubos seminíferos
safeAddEvent(abrirBtn, 'click', (e) => { e && e.preventDefault(); if (moda) moda.style.display = 'flex'; });
safeAddEvent(cerrarBtn, 'click', () => { if (moda) moda.style.display = 'none'; });
if (abririnfsem) safeAddEvent(abririnfsem, 'click', (e) => { e && e.preventDefault(); if (modalsem) modalsem.style.display = 'flex'; });
if (spanCerrarsem) safeAddEvent(spanCerrarsem, 'click', () => { if (modalsem) modalsem.style.display = 'none'; });

// Recorrido / video
if (abririnf1) safeAddEvent(abririnf1, 'click', (e) => { e && e.preventDefault(); if (modalrecorrido) modalrecorrido.style.display = 'flex'; });
if (safeAddEvent) safeAddEvent(spanCerrar, 'click', () => { if (modalvideo) modalvideo.style.display = 'none'; });
safeAddEvent(abrirrecorrido, 'click', (e) => { e && e.preventDefault(); if (modalrecorrido) modalrecorrido.style.display = 'flex'; });
safeAddEvent(cerrarrecorrido, 'click', () => { if (modalrecorrido) modalrecorrido.style.display = 'none'; });

// Espermatogénesis
if (abrirespergen) safeAddEvent(abrirespergen, 'click', (e) => { e && e.preventDefault(); if (modalespergen) modalespergen.style.display = 'flex'; });
if (cerrarespergen) safeAddEvent(cerrarespergen, 'click', () => { if (modalespergen) modalespergen.style.display = 'none'; });
if (abririnfespergen) safeAddEvent(abririnfespergen, 'click', () => { if (modalinfoespergen) modalinfoespergen.style.display = 'block'; });
if (spanCerrarespergen) safeAddEvent(spanCerrarespergen, 'click', () => { if (modalinfoespergen) modalinfoespergen.style.display = 'none'; });

// Epidídimo
if (abririnf2) safeAddEvent(abririnf2, 'click', () => { if (modaepi) modaepi.style.display = 'flex'; });
if (cerrarepi) safeAddEvent(cerrarepi, 'click', () => { if (modaepi) modaepi.style.display = 'none'; });
if (spanCerrarepi) safeAddEvent(spanCerrarepi, 'click', () => { if (modalinfoepi) modalinfoepi.style.display = 'none'; });

// --- Menu principal (selección de modelo) ---
document.querySelectorAll('#menu-modelos button').forEach(btn => {
  btn.addEventListener('click', () => {
    const modelKey = btn.getAttribute('data-model');
    const modelData = modelosInfo[modelKey] || { titulo: 'Modelo', descripcion: '' };
    if (modalTitulo) modalTitulo.textContent = modelData.titulo;
    if (modalDescripcion) modalDescripcion.textContent = modelData.descripcion;
    if (startBtn) startBtn.dataset.model = modelKey;
    if (modal) modal.style.display = 'flex';
  });
});

safeAddEvent(cerrarModal, 'click', () => { if (modal) modal.style.display = 'none'; });

// --- Función para crear la escena AR de forma segura ---
function createARScene(options = {}) {
  // limpia contenedor antes de crear
  arContainer.innerHTML = '';

  const scene = document.createElement('a-scene');
  scene.setAttribute('embedded', '');
  // arjs config: source webcam, sin UI de debug
  scene.setAttribute('arjs', 'sourceType: webcam; debugUIEnabled: false;');
  scene.setAttribute('gesture-detector', '');

  // marcador y modelo (paths por defecto; cámbialos si tus rutas son distintas)
  const marker = document.createElement('a-marker');
  marker.setAttribute('type', 'pattern');
  marker.setAttribute('url', options.markerUrl || 'markers/pattern-marcaCreeper.patt');

  const model = document.createElement('a-entity');
  model.setAttribute('gltf-model', options.modelUrl || 'Modelos y animaciones/Testiculofinal.glb');
  model.setAttribute('scale', options.scale || '0.05 0.05 0.05');
  // position/rotation iniciales (puedes ajustar)
  model.setAttribute('position', options.position || '0 0 0');
  model.setAttribute('rotation', options.rotation || '-90 0 0');
  model.setAttribute('gesture-handler', '');

  // centrar el modelo cuando termine de cargar (si THREE está disponible)
  model.addEventListener('model-loaded', () => {
    try {
      const object3D = model.getObject3D('mesh') || model.getObject3D('group') || model.object3D;
      if (object3D && typeof THREE !== 'undefined') {
        // calcular bounding box y desplazar el objeto para centrarlo en (0,0,0) del parent (marcador)
        const box = new THREE.Box3().setFromObject(object3D);
        const center = box.getCenter(new THREE.Vector3());
        // mover la geometría en sentido opuesto al centro para centrar
        object3D.position.x -= center.x;
        object3D.position.y -= center.y;
        object3D.position.z -= center.z;
        // opcional: bajar el modelo un poco si lo ves flotando (ajusta según necesites)
        // object3D.position.y -= 0.02;
        console.log('model-loaded -> centrado interno (siempre relativo al parent)');
      } else {
        console.warn('model-loaded: THREE o object3D no disponible');
      }
    } catch (err) {
      console.error('Error al centrar el modelo:', err);
    }
  });

  marker.appendChild(model);
  scene.appendChild(marker);

  // cámara (puedes ajustar fov si quieres "zoom" distinto)
  const camera = document.createElement('a-entity');
  camera.setAttribute('camera', 'fov: 75'); // fov más pequeño = parecerá "menos zoom"
  scene.appendChild(camera);

  // añadir la escena al contenedor
  arContainer.appendChild(scene);
  return scene;
}

// --- Iniciar AR desde el botón ---
safeAddEvent(startBtn, 'click', () => {
  if (modal) modal.style.display = 'none';
  if (info) info.style.display = 'none';
  if (exitBtn) exitBtn.style.display = 'flex';
  if (arContainer) arContainer.style.display = 'block';
  if (menu__btn) menu__btn.classList.add('active');

  // paths que tú usas (ajusta si tus carpetas/archivos están en otro lugar)
  const chosenModel = (startBtn.dataset && startBtn.dataset.model) ? startBtn.dataset.model : 'testiculo';
  // ejemplo: si quisieras cambiar ruta según modelo seleccionado:
  const modelPaths = {
    testiculo: { modelUrl: 'Modelos y animaciones/Testiculofinal.glb', markerUrl: 'markers/pattern-marcaCreeper.patt', scale: '0.05 0.05 0.05', rotation: '-90 0 0' },
    // agrega más según necesites
  };
  const opts = modelPaths[chosenModel] || modelPaths['testiculo'];

  // crear escena
  // antes, aseguramos limpiar cualquier video/cámara previa
  stopVideoTracks();
  createARScene(opts);
});

// --- Salir de AR ---
safeAddEvent(exitBtn, 'click', () => {
  if (arContainer) {
    arContainer.style.display = 'none';
    arContainer.innerHTML = '';
  }
  if (info) info.style.display = 'block';
  if (exitBtn) exitBtn.style.display = 'none';
  if (menu__btn) menu__btn.classList.remove('active');

  stopVideoTracks();

  // recargar para dejar todo limpio (opcional)
  setTimeout(() => { window.location.reload(); }, 300);
});
















































