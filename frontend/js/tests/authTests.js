/**
 * Test: POST /api/auth/login
 * CORREGIDO: Apuntando al puerto 3000 del Backend
 */
testUtils.createTestButton("Test Login Correcto (Pepe y 12345)", async (btn) => {
    try {
        // Cambiamos a la URL completa del backend
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'pepe', password: '12345' })
        });

        // Verificamos si la respuesta es JSON antes de procesarla
        const data = await response.json();
        testUtils.log(data);

        if (response.ok) {
            testUtils.setSuccess(btn);
        } else {
            testUtils.log(`Error del servidor: ${data.message || response.statusText}`);
        }
    } catch (error) {
        testUtils.log(`Error de conexión: ${error.message}`);
    }
});