const arContainer = document.getElementById('ar-container');
const startBtn = document.getElementById('start-ar');
const exitBtn = document.getElementById('exit-ar');

// Iniciar AR
startBtn.addEventListener('click', () => {

    arContainer.style.display = 'block';  

    exitBtn.style.display = 'flex';

    const scene = document.createElement('a-scene');
    scene.setAttribute('embedded', '');
    scene.setAttribute('vr-mode-ui', 'enabled: false');
    scene.setAttribute('renderer', 'logarithmicDepthBuffer: true');
    scene.setAttribute('arjs', 'sourceType: webcam; debugUIEnabled: false;');

    const marker = document.createElement('a-marker');
    marker.setAttribute('type', 'pattern');
    marker.setAttribute('patternUrl', 'markers/pattern-marcaEs.patt');

    const model = document.createElement('a-entity');
    model.setAttribute('gltf-model', 'Modelos y animaciones/transparente.glb');
    model.setAttribute('scale', '0.1 0.1 0.1');

    marker.appendChild(model);
    scene.appendChild(marker);

    const camera = document.createElement('a-entity');
    camera.setAttribute('camera', '');
    scene.appendChild(camera);

    arContainer.innerHTML = '';
    arContainer.appendChild(scene);
});

// Salir
exitBtn.addEventListener('click', () => {
    arContainer.innerHTML = '';
    arContainer.style.display = 'none';
    exitBtn.style.display = 'none';
    setTimeout(() => { window.location.reload(); }, 300);
});
