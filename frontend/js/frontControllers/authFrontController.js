/**
 * Project     : Sample Vault
 * Author      : Tecnologías Informáticas B - Facultad de Ingeniería - UNMdP
 * License     : http://www.gnu.org/licenses/gpl.txt  GNU GPL 3.0
 * Date        : Marzo 2026
 */

/**
 * authFrontController.js
 * Control de Login, Registro y redirecciones con rutas fijas para Vite
 */

// Lógica para el formulario de LOGIN

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        try {
            const data = await apiService.request('/auth/login', 'POST', { username, password });
            authHelper.saveSession(data.token, data.role);

            // CORRECCIÓN: Usamos rutas relativas
            if (data.role === 'admin') {
                window.location.href = './admin-dashboard.html';
            } else {
                window.location.href = './producer-dashboard.html';
            }
        } catch (error) {
            if (typeof showModal === 'function') {
                showModal('Error de Acceso', error.message);
            } else {
                alert('Error: ' + error.message);
            }
        }
    });
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        try {
            await apiService.request('/auth/register', 'POST', { username, password });
            alert('¡Éxito! Usuario creado.');

            // CORRECCIÓN: Redirección relativa
            setTimeout(() => {
                window.location.href = './login.html';
            }, 2000);
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });
}