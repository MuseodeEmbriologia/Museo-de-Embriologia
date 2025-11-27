

const info = document.getElementById('info');
const arContainer = document.getElementById('ar-container');
const exitBtn = document.getElementById('exit-ar');

const menubtn = document.getElementsByClassName('menu__btn');
const menu__btn = menubtn[0];

//Modal de la pagina de inicio
const modal = document.getElementById('modal-modelo');
const modalTitulo = document.getElementById('modal-titulo');
const modalDescripcion = document.getElementById('modal-descripcion');
const startBtn = document.getElementById('start-ar');
const cerrarModal = document.getElementById('cerrar-modal');

//Tubos seminiferos//
const modalsem = document.getElementById('Infosem');
const spanCerrarsem = document.getElementsByClassName('Cerrarinfsem')[0];

//Recorrido//
const modalvideo = document.getElementById('Infovideo');
const spanCerrar = document.getElementsByClassName("Cerrarinfvid")[0];

//Epididimo//
const modalinfoepi = document.getElementById('Infoepi');
const spanCerrarepi = document.getElementsByClassName("Cerrarinfepi")[0];

//Espermatogenesis//
const modalinfoespergen = document.getElementById('Infoespergen');
const spanCerrarespergen = document.getElementsByClassName("Cerrarespergen")[0];

// Información de cada modelo
const modelosInfo = {
    testiculo: {
        titulo: "Modelos de espermatogénesis",
        descripcion: 'Al hacer click en el botón de "Iniciar Realidad aumentada", se abrira una nueva pestaña donde necesitaremos que nos permitas acceder a tu cámara y que aceptes otros permisos, asegurate de aceptarlos para que todo funcione correctamente, en caso de no aceptarlos, puedes presionar el botón de salir y volver a la página de inicio. No nos quedamos con ningun dato de los usuarios, todo se borra al salir de la página. Si cuentas con un dispositivo android, da click en el botón de abajo para observar los modelos'
        }
    };

//Tubos seminiferos//
const abrirBtn = document.getElementById('redsem-btn');
const cerrarBtn = document.getElementById('cerrar-redsem-btn');
const moda = document.getElementById('redsem-moda');

abrirBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    
    moda.style.display = 'flex'; 
});
cerrarBtn.addEventListener('click', () => {
    moda.style.display = 'none'; 
});
abririnfsem.onclick = function() {
    modalsem.style.display = "block";
};
spanCerrarsem.onclick = function() {
    modalsem.style.display = "none";
};

abririnfsem.addEventListener('click', (e) => {
    e.preventDefault(); 
    
    modalsem.style.display = 'flex'; 
});

//Recorrido//
const abrirrecorrido = document.getElementById('recorrido-btn');
const cerrarrecorrido = document.getElementById('cerrar-recorrido-btn');
const modalrecorrido = document.getElementById('recorrido-moda');

abririnf1.onclick = function() {
    modalvideo.style.display = "block";
};
spanCerrar.onclick = function() {
    modalvideo.style.display = "none";
};
abrirrecorrido.addEventListener('click', (e) => {
    e.preventDefault(); 
    
    modalrecorrido.style.display = 'flex'; 
});
cerrarrecorrido.addEventListener('click', () => {
    modalrecorrido.style.display = 'none'; 
});
abririnf1.addEventListener('click', (e) => {
    e.preventDefault(); 
    
    modalrecorrido.style.display = 'flex'; 
});

//Espermatogénesis//
const abrirespergen = document.getElementById('espergen-btn');
const cerrarespergen = document.getElementById('cerrar-espergen-btn');
const modalespergen = document.getElementById('espergen-moda');

abririnfespergen.onclick = function() {
    modalinfoespergen.style.display = "block";
};
spanCerrarespergen.onclick = function() {
    modalinfoespergen.style.display = "none";
};
abrirespergen.addEventListener('click', (e) => {
    e.preventDefault(); 
    
    modalespergen.style.display = 'flex'; 
});
cerrarespergen.addEventListener('click', () => {
    modalespergen.style.display = 'none'; 
});
abririnfespergen.addEventListener('click', (e) => {
    e.preventDefault(); 
    
    modalespergen.style.display = 'flex'; 
});

//Epididimo//
const abrirepi = document.getElementById('epididimo-btn');
const cerrarepi = document.getElementById('cerrar-epididimo-btn')
const modaepi = document.getElementById('epididimo-moda');

abririnf2.onclick = function() {
    modalinfoepi.style.display = "block";
};
spanCerrarepi.onclick = function() {
    modalinfoepi.style.display = "none";
};
abrirepi.addEventListener('click', (e) => {
    e.preventDefault(); 
    
    modaepi.style.display = 'flex'; 
});
cerrarepi.addEventListener('click', () => {
    modaepi.style.display = 'none'; 
});
abririnf2.addEventListener('click', (e) => {
    e.preventDefault(); 
    
    modaepi.style.display = 'flex'; 
});

//Todo lo del AR
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
    arContainer.style.display = 'block';
    exitBtn.style.display = 'flex';
    menu__btn.classList.add('active');

    window.requestAnimationFrame(() => {
    const scene = document.createElement('a-scene');
    
    const Pantallagrande = window.matchMedia('(min-width: 768px)');
    scene.setAttribute('embedded', '');
    scene.setAttribute('arjs', 'sourceType: webcam; debugUIEnabled: false;');
    scene.setAttribute('gesture-detector', '');

    const marker = document.createElement('a-marker');
    marker.setAttribute('type', 'pattern');
    marker.setAttribute('url', 'markers/pattern-marcaT.patt');

    const model = document.createElement('a-entity');
    model.setAttribute('gltf-model', 'Modelos y animaciones/Testiculofinal.glb');
    model.setAttribute('scale', '0.05 0.05 0.05');
    model.setAttribute('rotation', '0 0 0');
    model.setAttribute('position', '0 0 0');
    model.setAttribute('gesture-handler', '');

marker.appendChild(model);
scene.appendChild(marker);

     const marker2 = document.createElement('a-marker');
      marker2.setAttribute('type', 'pattern');
      marker2.setAttribute('url', 'markers/pattern-marcaCreeper.patt');
      
      const model2 = document.createElement('a-entity');
      model2.setAttribute('gltf-model', 'Modelos y animaciones/ARM3.glb');
    //https://raw.githubusercontent.com/KelvinRiv/Proyecto/main/RedSeminifera.glb
      model2.setAttribute('scale', '0.1 0.1 0.1');
      model2.setAttribute('rotation', '-90 0 0');
      model2.setAttribute('gesture-handler', '');
      
      marker2.appendChild(model2);
      scene.appendChild(marker2);
      const marker3 = document.createElement('a-marker');
      marker3.setAttribute('type', 'pattern');
      marker3.setAttribute('url', 'markers/pattern-marcaEs.patt');
      
      const model3 = document.createElement('a-entity');
      model3.setAttribute('gltf-model', 'Modelos y animaciones/Espermatogenesis5.glb');
      model3.setAttribute('scale', '0.1 0.1 0.1');
      model3.setAttribute('rotation', '-90 0 0');
      model3.setAttribute('gesture-handler', '');
      
      marker3.appendChild(model3);
      scene.appendChild(marker3);

const camera = document.createElement('a-entity');
camera.setAttribute('camera', '');
scene.appendChild(camera);

arContainer.innerHTML = '';
arContainer.appendChild(scene);
});
});

exitBtn.addEventListener('click', () => {
    arContainer.style.display = 'none';
    arContainer.innerHTML = '';
    info.style.display = 'block';
    exitBtn.style.display = 'none';
    menu__btn.classList.remove('active');

      const video = document.querySelector('video');
      if (video && video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
        video.srcObject = null;
      }


        setTimeout(() => { window.location.reload(); }, 300); /*Este script es el que hace que vuelva a la página principal*/
  });
  

















































































