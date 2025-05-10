function createGallery(type, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
        <div class="gallery" style="
            position: relative; 
            width: 100%; 
            max-width: 500px; 
            height: 300px; 
            overflow: hidden; 
            border: 1px solid #ccc; 
            border-radius: 8px;
            margin: auto;
        ">
            <img id="${containerId}-image" src="" alt="Galería ${type}" style="
                width: 100%; 
                height: 100%; 
                object-fit: cover;
            ">
            <button onclick="prevImage('${containerId}')" style="
                position: absolute; 
                top: 50%; 
                left: 10px; 
                transform: translateY(-50%); 
                background: rgba(0,0,0,0.5); 
                color: white; 
                border: none; 
                border-radius: 50%; 
                width: 30px; 
                height: 30px; 
                cursor: pointer;
            ">&#10094;</button>
            <button onclick="nextImage('${containerId}')" style="
                position: absolute; 
                top: 50%; 
                right: 10px; 
                transform: translateY(-50%); 
                background: rgba(0,0,0,0.5); 
                color: white; 
                border: none; 
                border-radius: 50%; 
                width: 30px; 
                height: 30px; 
                cursor: pointer;
            ">&#10095;</button>
        </div>
    `;

    fetch(`https://mikemaranon.github.io/Mike-portfolio/JS/jsons/${type}_gallery.json`)
        .then(res => {
            if (!res.ok) throw new Error('No se pudo cargar la galería.');
            return res.json();
        })
        .then(images => {
            if (images.length === 0) {
                container.innerHTML = 'No hay imágenes para mostrar.';
                return;
            }
            galleries[containerId] = {
                images: images,
                currentIndex: 0
            };
            document.getElementById(`${containerId}-image`).src = images[0];
        })
        .catch(() => {
            container.innerHTML = 'Error al cargar la galería.';
        });
}

const galleries = {};

function showImage(containerId, index) {
    const gallery = galleries[containerId];
    if (!gallery || !gallery.images.length) return;

    if (index < 0) {
        gallery.currentIndex = gallery.images.length - 1;
    } else if (index >= gallery.images.length) {
        gallery.currentIndex = 0;
    } else {
        gallery.currentIndex = index;
    }
    document.getElementById(`${containerId}-image`).src = gallery.images[gallery.currentIndex];
}

function prevImage(containerId) {
    const gallery = galleries[containerId];
    if (gallery) {
        showImage(containerId, gallery.currentIndex - 1);
    }
}

function nextImage(containerId) {
    const gallery = galleries[containerId];
    if (gallery) {
        showImage(containerId, gallery.currentIndex + 1);
    }
}

// 🚀 Cargamos ambas galerías al entrar
window.addEventListener('DOMContentLoaded', () => {
    createGallery('music', 'music-gallery');
    createGallery('drawing', 'drawings-gallery');
});
