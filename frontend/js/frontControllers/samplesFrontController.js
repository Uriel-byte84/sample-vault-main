/**
*    Project     : Sample Vault
*    Author      : Tecnologías Informáticas B - Facultad de Ingeniería - UNMdP
*    License     : http://www.gnu.org/licenses/gpl.txt  GNU GPL 3.0
*    Date        : Marzo 2026
*/

// Al cargar la página, traer los samples del usuario
document.addEventListener('DOMContentLoaded', loadSamples);

async function loadSamples() {
    try {
        const samples = await apiService.request('/samples/my-samples', 'GET');
        renderSamplesTable(samples);
    } catch (error) {
        showModal('Error', 'No se pudieron cargar los samples: ' + error.message);
    }
}

function renderSamplesTable(samples) {
    const tbody = document.getElementById('samplesTableBody');
    tbody.replaceChildren(); // Limpia el contenido de forma eficiente

    samples.forEach(s => {
        const row = document.createElement('tr');

        // Celda Nombre
        const tdName = document.createElement('td');
        tdName.textContent = s.display_name;

        // Celda Categoría
        const tdCat = document.createElement('td');
        const spanCat = document.createElement('span');
        spanCat.className = 'w3-tag w3-round w3-black';
        spanCat.textContent = s.category;
        tdCat.appendChild(spanCat);

        // Celda BPM
        const tdBpm = document.createElement('td');
        tdBpm.textContent = s.bpm;

        // Celda Audio (Reproductor)
        const tdAudio = document.createElement('td');
        const audio = document.createElement('audio');
        audio.controls = true;
        audio.style.maxWidth = '200px';
        const source = document.createElement('source');
        // URL dinámica basada en la ubicación actual (compatible con dev y producción)
        const baseUrl = `${window.location.protocol}//${window.location.host}`;
        source.src = `${baseUrl}${s.file_path}`;
        source.type = 'audio/mpeg';
        audio.appendChild(source);
        audio.innerHTML += '<p>Tu navegador no soporta el elemento de audio.</p>';
        tdAudio.appendChild(audio);

        // Celda Acciones
        const tdActions = document.createElement('td');
        const btnDelete = document.createElement('button');
        btnDelete.className = 'w3-button w3-red w3-tiny w3-round';
        btnDelete.textContent = 'Borrar';
        btnDelete.addEventListener('click', () => deleteSample(s.id));
        tdActions.appendChild(btnDelete);

        // Armar fila
        row.append(tdName, tdCat, tdBpm, tdAudio, tdActions);
        tbody.appendChild(row);
    });
}

async function deleteSample(id) {
    if (!confirm('¿Estás seguro de eliminar este sonido?')) return;
    try {
        await apiService.request(`/samples/${id}`, 'DELETE');
        showModal('Eliminado', 'El sample ha sido borrado.');
        loadSamples();
    } catch (error) {
        showModal('Error', error.message);
    }
}

// Evento para el formulario de subida
const uploadForm = document.getElementById('uploadForm');
if (uploadForm) {
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validación de campos
        const displayName = document.getElementById('display_name').value.trim();
        const category = document.getElementById('category').value;
        const bpm = document.getElementById('bpm').value;
        const audioFile = document.getElementById('audioFile').files[0];

        if (!displayName) {
            showModal('Error', 'El nombre del sonido es obligatorio');
            return;
        }

        if (!category) {
            showModal('Error', 'Debes seleccionar una categoría');
            return;
        }

        if (!audioFile) {
            showModal('Error', 'Debes seleccionar un archivo de audio');
            return;
        }

        // Validación de tamaño (50MB = 52428800 bytes)
        const MAX_SIZE = 52428800;
        if (audioFile.size > MAX_SIZE) {
            showModal('Error', `El archivo es muy grande. Máximo permitido: 50MB. Tu archivo: ${(audioFile.size / 1024 / 1024).toFixed(2)}MB`);
            return;
        }

        // Validación de tipo de archivo
        const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/flac', 'audio/mp3'];
        if (!allowedTypes.includes(audioFile.type) && !audioFile.name.match(/\.(mp3|wav|ogg|flac)$/i)) {
            showModal('Error', 'Tipo de archivo no permitido. Usa: MP3, WAV, OGG o FLAC');
            return;
        }

        const formData = new FormData();
        formData.append('display_name', displayName);
        formData.append('category', category);
        formData.append('bpm', bpm || '120');
        formData.append('audioFile', audioFile);

        try {
            // Mostrar estado de carga
            const submitBtn = document.getElementById('submitBtn');
            const uploadStatus = document.getElementById('uploadStatus');
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.6';
            uploadStatus.style.display = 'block';

            await apiService.request('/samples/upload', 'POST', formData, true);
            showModal('Éxito', 'Sample guardado correctamente en tu biblioteca.');
            uploadForm.reset();
            uploadStatus.style.display = 'none';
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            loadSamples();
        } catch (error) {
            showModal('Error al subir', error.message);
            document.getElementById('submitBtn').disabled = false;
            document.getElementById('submitBtn').style.opacity = '1';
            document.getElementById('uploadStatus').style.display = 'none';
        }
    });
}