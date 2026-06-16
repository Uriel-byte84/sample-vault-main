/**
 * Project     : Sample Vault
 * Author      : Tecnologías Informáticas B - Facultad de Ingeniería - UNMdP
 * License     : http://www.gnu.org/licenses/gpl.txt  GNU GPL 3.0
 * Date        : Marzo 2026
 */

/**
 * adminFrontController.js
 * Gestión de la interfaz de administración (Usuarios)
 */

// Al cargar la página, cargar todos los usuarios con sus datos
document.addEventListener('DOMContentLoaded', loadUsers);

async function loadUsers() {
    try {
        const users = await apiService.request('/admin/users', 'GET');
        renderUsersTable(users);
    } catch (error) {
        if (typeof showModal === 'function') {
            showModal('Acceso denegado', error.message);
        } else {
            alert('Acceso denegado: ' + error.message);
        }
        window.location.href = 'login.html';
    }
}

function renderUsersTable(users) {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;
    tbody.replaceChildren();

    users.forEach(u => {
        const row = document.createElement('tr');

        const tdId = document.createElement('td');
        tdId.textContent = u.id;

        const tdUser = document.createElement('td');
        const b = document.createElement('b');
        b.textContent = u.username;
        tdUser.appendChild(b);

        const tdRole = document.createElement('td');
        const spanRole = document.createElement('span');
        spanRole.className = "w3-tag w3-blue";
        spanRole.textContent = u.role;
        tdRole.appendChild(spanRole);

        const tdDate = document.createElement('td');
        tdDate.textContent = new Date(u.created_at).toLocaleDateString();

        const tdActions = document.createElement('td');
        const btnBan = document.createElement('button');
        btnBan.className = "w3-button w3-red w3-tiny";
        btnBan.textContent = "Eliminar usuario y sus samples";
        btnBan.addEventListener('click', () => banUser(u.id));
        tdActions.appendChild(btnBan);

        row.append(tdId, tdUser, tdRole, tdDate, tdActions);
        tbody.appendChild(row);
    });
}

async function banUser(id) {
    if (!confirm('¿Estás seguro de borrar a este usuario? Se borrarán todos sus samples de forma permanente.')) {
        return;
    }
    try {
        await apiService.request(`/admin/users/${id}`, 'DELETE');
        if (typeof showModal === 'function') {
            showModal('Éxito', 'Usuario eliminado con éxito');
        } else {
            alert('Usuario eliminado con éxito');
        }
        loadUsers();
    } catch (error) {
        if (typeof showModal === 'function') {
            showModal('Error al borrar usuario', error.message);
        } else {
            alert('Error al borrar usuario: ' + error.message);
        }
    }
}