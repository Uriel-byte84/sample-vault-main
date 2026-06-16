// ==========================================================================
// 2. Pruebas de Seguridad: El Intruso (403 Forbidden)
// ==========================================================================
testUtils.createTestButton("Test Seguridad Productor accediendo a Admin", async (btn) => {
    try {
        // Paso 1: Asegurar Sesión (Login con las credenciales de 'pepe')
        // Llamamos a la función okLogin() para garantizar que guarde el token en localStorage
        await okLogin();

        // Recuperamos el token del localStorage para poder usarlo en la petición protegida
        const token = localStorage.getItem('token');

        // Paso 2: Intentar ingresar a la ruta restringida de Admin usando el token de Pepe
        const response = await fetch('/api/admin/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Encabezado obligatorio para rutas protegidas
                'Content-Type': 'application/json'
            }
        });

        // Parseamos la respuesta para poder visualizarla
        const data = await response.json();
        testUtils.log(data); // Visualiza el JSON en la consola de la página

        // Paso 3: Validación del test
        // El test es exitoso si el servidor rechaza con 403 (Forbidden) ante el rol de Pepe
        if (response.status === 403) {
            testUtils.setSuccess(btn); // Pone el botón en VERDE
            console.log("Test de Seguridad Correcto: Acceso denegado de forma exitosa (403).");
        } else {
            // Si por error devolvió un 200 u otro estado, el test falló (el intruso entró)
            testUtils.setError(btn);
            console.error(`Test Fallido: Se esperaba un código 403 pero se recibió un ${response.status}`);
        }

    } catch (error) {
        // Manejo de errores por si se cae la red o el servidor está apagado
        testUtils.log({ error: error.message });
        testUtils.setError(btn); // Pone el botón en ROJO
    }
});