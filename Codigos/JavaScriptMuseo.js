const info = document.getElementById('info');
const arContainer = document.getElementById('ar-container');
const exitBtn = document.getElementById('exit-ar');
const menubtn = document.getElementsByClassName('menu__btn')
const menu__btn = menubtn[0]
const abririnf1 = document.getElementById('abririnf1');
  // Modal
const modal = document.getElementById('modal-modelo');
const modalTitulo = document.getElementById('modal-titulo');
const modalDescripcion = document.getElementById('modal-descripcion');
const startBtn = document.getElementById('start-ar');
const cerrarModal = document.getElementById('cerrar-modal');
const modalvideo = document.getElementById('Infovideo');
const spanCerrar = document.getElementsByClassName("Cerrarinfvid")[0];

// Información de cada modelo
const modelosInfo = {
    testiculo: {
        titulo: "Modelos de espermatogénesis",
        descripcion: 'Al hacer click en el botón de "Iniciar Realidad aumentada", se abrira una nueva pestaña donde necesitaremos que nos permitas acceder a tu cámara y que aceptes otros permisos, asegurate de aceptarlos para que todo funcione correctamente, en caso de no aceptarlos, puedes presionar el botón de salir y volver a la página de inicio. No nos quedamos con ningun dato de los usuarios, todo se borra al salir de la página'
        }
    };

const abrirBtn = document.getElementById('redsem-btn');
const abriresp = document.getElementById('esp-btn');
const cerrarBtn = document.getElementById('cerrar-redsem-btn');
const cerraresp = document.getElementById('cerrar-esp-btn');
const moda = document.getElementById('redsem-moda');
const modalesp = document.getElementById('esp-moda');

abririnf1.onclick = function() {
modalvideo.style.display = "block";
};
spanCerrar.onclick = function() {
modalvideo.style.display = "none";
};

abrirBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    
    moda.style.display = 'flex'; 
});
abriresp.addEventListener('click', (e) => {
    e.preventDefault(); 
    
    modalesp.style.display = 'flex'; 
});
cerrarBtn.addEventListener('click', () => {
    moda.style.display = 'none'; 
});
cerraresp.addEventListener('click', () => {
    modalesp.style.display = 'none'; 
});
abririnf1.addEventListener('click', (e) => {
    e.preventDefault(); 
    
    modalesp.style.display = 'flex'; 
});
  // Cuando se da clic en un modelo
  document.querySelectorAll('#menu-modelos button').forEach(btn => {
    btn.addEventListener('click', () => {
      const modelKey = btn.getAttribute('data-model');
      const modelData = modelosInfo[modelKey];
      modalTitulo.textContent = modelData.titulo;
      modalDescripcion.textContent = modelData.descripcion;
      modal.style.display = 'flex';

      // Guardar modelo elegido
      startBtn.dataset.model = modelKey;
    });
});


  // Cerrar modal
  cerrarModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });


  // Iniciar AR al presionar el botón del modal
  startBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    info.style.display = 'none';
    exitBtn.style.display = 'flex';
    arContainer.style.display = 'block';

menu__btn.classList.add('active');

    const modelKey = startBtn.dataset.model;


    // Crear la escena AR (código existente)
    const scene = document.createElement('a-scene');
    scene.setAttribute('embedded', '');
    scene.setAttribute('arjs', '');
    scene.setAttribute('gesture-detector', '');

    // Seleccionar modelo según el elegido
    let marker = document.createElement('a-marker');
    let model = document.createElement('a-entity');

    if (modelKey === "testiculo") {
    marker.setAttribute('type', 'pattern');
    marker.setAttribute('url', 'markers/pattern-marcaCreeper.patt');
    model.setAttribute('gltf-model', 'Modelos y animaciones/transparente.glb');
    model.setAttribute('scale', '0.1 0.1 0.1');
    }

    model.setAttribute('gesture-handler', '');
    marker.appendChild(model);
    scene.appendChild(marker);


    const camera = document.createElement('a-entity');
    camera.setAttribute('camera', '');
    scene.appendChild(camera);

    arContainer.innerHTML = '';
    arContainer.appendChild(scene);
  });

  // Botón para salir de AR
  exitBtn.addEventListener('click', () => {
    arContainer.style.display = 'none';
    arContainer.innerHTML = '';
    info.style.display = 'block';
    exitBtn.style.display = 'none';
menu__btn.classList.remove('active');
    const video = document.querySelector('video');
    if (video && video.srcObject) {
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      video.srcObject = null;
    }


        setTimeout(() => { window.location.reload(); }, 300); /*Este script es el que hace que vuelva a la página principal*/
  });
  






