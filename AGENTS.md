<<<<<<< HEAD
# 🤖 Guía para Agentes de IA - SampleVault

**Descripción del Proyecto:** SampleVault es una aplicación web para gestión profesional de librerías de sonido. Permite que productores musicales suban, categoricen, escuchen y organicen sus muestras de audio (samples) de forma privada y segura.

---

## 🏗️ Arquitectura del Proyecto

### Estructura de Directorios

```
sample-vault-main/
├── backend/                    # Servidor Node.js + Express
│   ├── config/                # Configuración (DB, Multer)
│   ├── controllers/           # Lógica de negocio
│   ├── middleware/            # Autenticación JWT
│   ├── repositories/          # Acceso a datos (SQL)
│   ├── routes/                # Definición de endpoints
│   ├── uploads/               # Almacenamiento de archivos de audio
│   ├── utils/                 # Helpers (gestión de archivos)
│   ├── server.js              # Punto de entrada
│   └── package.json           # Dependencias
├── frontend/                  # Aplicación Vanilla JS
│   ├── css/                   # Estilos (W3.CSS + custom)
│   ├── html/                  # Vistas estáticas
│   ├── img/                   # Activos visuales
│   ├── js/
│   │   ├── components/        # Componentes UI (modales, etc)
│   │   ├── frontControllers/  # Controladores de vista (login, samples, admin)
│   │   ├── services/          # Cliente API centralizado
│   │   └── utils/             # Helpers (autenticación, sesión)
└── test-samples/              # Archivos de prueba

```

### Stack Tecnológico

| Capa | Tecnología | Detalles |
|------|-----------|----------|
| **Backend** | Node.js + Express | Servidor robusto y modular |
| **Frontend** | Vanilla JS | Sin dependencias pesadas; DOM 100% nativo |
| **Base de Datos** | MySQL/MariaDB | Persistencia relacional |
| **Autenticación** | JWT + bcrypt | Tokens seguros + hashing de contraseñas |
| **Carga de Archivos** | Multer | Gestión eficiente de audio binario |
| **Estilos** | W3.CSS + CSS custom | Interfaz ligera y responsiva |

---

## 🚀 Comandos de Desarrollo

### Backend

```bash
cd backend
npm install                    # Instalar dependencias una sola vez
npm run server                 # Iniciar servidor con nodemon (watch mode)
```

### Frontend

```bash
# El frontend se sirve automáticamente desde el backend en /
# (no requiere servidor separado salvo en desarrollo avanzado)
```

### Desarrollo Full-Stack

```bash
npm run dev                    # Inicia backend + frontend simultáneamente (requiere concurrently)
```

### Variables de Entorno (.env)

Crear archivo `backend/.env`:
```env
PORT=3000
DB_HOST=localhost
DB_USER=samplevault
DB_PASS=samplevault
DB_NAME=samplevault
JWT_SECRET=tu_clave_secreta_super_segura
```

---

## 🔐 Flujo de Autenticación

1. **Registro**: POST `/api/auth/register` → Crea usuario con contraseña hasheada (bcrypt)
2. **Login**: POST `/api/auth/login` → Devuelve JWT válido por 2 horas
3. **Token en Headers**: `Authorization: Bearer <token>` (en todas las rutas protegidas)
4. **Middleware**: `authMiddleware.verifyToken` valida JWT en rutas de samples y admin
5. **Roles**: `admin` (gestiona usuarios) vs `producer` (gestiona sus propios samples)

---

## 📡 Endpoints principales

### Autenticación (sin autenticación)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/register` | Registrar nuevo productor |
| POST | `/api/auth/login` | Iniciar sesión y obtener JWT |

### Samples (requiere JWT)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/samples/upload` | Subir nuevo sample (FormData con audioFile, display_name, category, bpm) |
| GET | `/api/samples/my-samples` | Listar samples del usuario logueado |
| DELETE | `/api/samples/:id` | Eliminar sample (solo del propietario) |

### Admin (requiere JWT + rol admin)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/admin/users` | Listar todos los usuarios |
| DELETE | `/api/admin/users/:id` | Eliminar usuario y sus samples |

### Navegación (Frontend)

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/` | login.html | Página de login (por defecto) |
| `/login` | login.html | Inicio de sesión |
| `/register` | register.html | Registro de nuevo usuario |
| `/producer-dashboard` | producer-dashboard.html | Panel del productor (gestión de samples) |
| `/admin-dashboard` | admin-dashboard.html | Panel administrativo (gestión de usuarios) |

---

## 💡 Convenciones de Código

### Backend

- **Estructura por capas**: `controllers` → `repositories` → `database`
- **Inyección de dependencias**: Cada controlador importa sus repositorios
- **Middleware centralizado**: `authMiddleware` maneja JWT y roles
- **Variables de entorno**: Todas las credenciales sensibles en `.env`
- **Manejo de errores**: Try/catch con respuestas HTTP apropiadas
- **Comentarios**: Español con propósito educativo (proyecto académico)

### Frontend

- **Sin frameworks pesados**: Vanilla JS puro
- **DOM seguro**: Manipulación de nodos sin innerHTML (previene XSS)
- **Separación de responsabilidades**:
  - `frontControllers/*`: Lógica de vista (listeners, renderizado)
  - `services/apiService.js`: Cliente API centralizado
  - `utils/authHelper.js`: Gestión de sesión/localStorage
  - `components/uiHandlers.js`: Componentes reutilizables (modales)
- **Estilos**: Clases W3.CSS + CSS custom en `css/styles.css`

### Seguridad

- **JWT**: Autenticación sin estado
- **CORS**: Configurado en backend
- **bcrypt**: Hashing seguro de contraseñas (10 rounds)
- **Validación**: En controladores antes de persistir
- **FormData**: Para subida de archivos (multipart/form-data)

---

## 🔧 Tareas Comunes para Agentes

### Agregar una nueva funcionalidad

1. **Backend**: Crear/modificar controlador → Crear/modificar repositorio → Registrar ruta
2. **Frontend**: Crear fronController → Crear funciones de UI → Llamar a apiService
3. **BD**: Ejecutar migraciones SQL en `config/`
4. **Testing**: Usar endpoints en REST Client o Postman

### Solucionar errores

- **401 Unauthorized**: Token expirado o inválido → Verificar `.env` JWT_SECRET
- **403 Forbidden**: Rol insuficiente → Revisar middleware `isAdmin`
- **404 Not Found**: Ruta no registrada o endpoint mal escrito
- **500 Server Error**: Revisar logs en consola del backend + capas de error
- **CORS Error**: Verificar `cors()` en `server.js` y URL base en `apiService`

### Agregar validación

```javascript
// Backend: En el controlador
if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: "Username y password son requeridos" });
}

// Frontend: En el frontController
if (!displayName || !audioFile) {
    showModal('Error', 'Todos los campos son obligatorios');
    return;
}
```

### Manejo de archivos de audio

- **Ubicación**: `backend/uploads/` (creada automáticamente)
- **Middleware**: `multerConfig.js` valida tipos (MP3, WAV, OGG, FLAC)
- **Ruta en BD**: Se guarda como `/uploads/filename.ext`
- **Reproducción**: `<audio>` tag con `src="http://localhost:3000/uploads/..."`
- **Borrado**: `fileHelper.deleteFile()` elimina del disco al borrar sample o usuario

---

## 📚 Documentación Importante

- [README.md](./README.md): Descripción general y setup inicial
- `backend/config/init.sql`: Script SQL para crear tablas (base de datos)
- `backend/config/delete_db.sql`: Script para resetear BD

---

## 🎯 Puntos de Entrada para Agentes

### Si trabajas en el backend

Inicia por: `backend/server.js` → Mira cómo se registran las rutas → Elige una ruta en `backend/routes/` → Ve al controlador correspondiente

### Si trabajas en el frontend

Inicia por: `frontend/js/services/apiService.js` → Ve a `frontend/js/frontControllers/` para entender el flujo → Revisa `frontend/js/utils/authHelper.js` para sesión

### Si trabajas en la BD

Mira: `backend/config/db.js` → `backend/repositories/` → Luego revisa los controladores que usan cada repositorio

---

## ⚠️ Trampas Comunes

| Trampa | Solución |
|--------|----------|
| Token no enviado | Verificar header `Authorization: Bearer <token>` en apiService |
| Archivo no sube | Revisar nombre del campo en FormData (`audioFile` debe coincidir en multerConfig) |
| 401 en rutas protegidas | Asegurar que `verifyToken` middleware está aplicado en la ruta |
| Rol de admin falla | Verificar que se asigna rol correcto al registrarse en BD |
| CORS errors | Token se envía con OPTIONS; verificar `cors()` configuración |
| Archivo no se borra | Revisar ruta absoluta en `fileHelper.deleteFile()` |

---

## 📝 Notas Finales

- **Proyecto académico**: El código incluye comentarios educativos en español
- **Sostenibilidad**: Inspirado en modelo GREENSOFT (eficiencia de recursos)
- **Testing**: Usa archivos en `test-samples/` para pruebas locales
- **Escalabilidad**: Estructura modular permite crecer sin refactorizar

=======
# 🤖 Guía para Agentes de IA - SampleVault

**Descripción del Proyecto:** SampleVault es una aplicación web para gestión profesional de librerías de sonido. Permite que productores musicales suban, categoricen, escuchen y organicen sus muestras de audio (samples) de forma privada y segura.

---

## 🏗️ Arquitectura del Proyecto

### Estructura de Directorios

```
sample-vault-main/
├── backend/                    # Servidor Node.js + Express
│   ├── config/                # Configuración (DB, Multer)
│   ├── controllers/           # Lógica de negocio
│   ├── middleware/            # Autenticación JWT
│   ├── repositories/          # Acceso a datos (SQL)
│   ├── routes/                # Definición de endpoints
│   ├── uploads/               # Almacenamiento de archivos de audio
│   ├── utils/                 # Helpers (gestión de archivos)
│   ├── server.js              # Punto de entrada
│   └── package.json           # Dependencias
├── frontend/                  # Aplicación Vanilla JS
│   ├── css/                   # Estilos (W3.CSS + custom)
│   ├── html/                  # Vistas estáticas
│   ├── img/                   # Activos visuales
│   ├── js/
│   │   ├── components/        # Componentes UI (modales, etc)
│   │   ├── frontControllers/  # Controladores de vista (login, samples, admin)
│   │   ├── services/          # Cliente API centralizado
│   │   └── utils/             # Helpers (autenticación, sesión)
└── test-samples/              # Archivos de prueba

```

### Stack Tecnológico

| Capa | Tecnología | Detalles |
|------|-----------|----------|
| **Backend** | Node.js + Express | Servidor robusto y modular |
| **Frontend** | Vanilla JS | Sin dependencias pesadas; DOM 100% nativo |
| **Base de Datos** | MySQL/MariaDB | Persistencia relacional |
| **Autenticación** | JWT + bcrypt | Tokens seguros + hashing de contraseñas |
| **Carga de Archivos** | Multer | Gestión eficiente de audio binario |
| **Estilos** | W3.CSS + CSS custom | Interfaz ligera y responsiva |

---

## 🚀 Comandos de Desarrollo

### Backend

```bash
cd backend
npm install                    # Instalar dependencias una sola vez
npm run server                 # Iniciar servidor con nodemon (watch mode)
```

### Frontend

```bash
# El frontend se sirve automáticamente desde el backend en /
# (no requiere servidor separado salvo en desarrollo avanzado)
```

### Desarrollo Full-Stack

```bash
npm run dev                    # Inicia backend + frontend simultáneamente (requiere concurrently)
```

### Variables de Entorno (.env)

Crear archivo `backend/.env`:
```env
PORT=3000
DB_HOST=localhost
DB_USER=samplevault
DB_PASS=samplevault
DB_NAME=samplevault
JWT_SECRET=tu_clave_secreta_super_segura
```

---

## 🔐 Flujo de Autenticación

1. **Registro**: POST `/api/auth/register` → Crea usuario con contraseña hasheada (bcrypt)
2. **Login**: POST `/api/auth/login` → Devuelve JWT válido por 2 horas
3. **Token en Headers**: `Authorization: Bearer <token>` (en todas las rutas protegidas)
4. **Middleware**: `authMiddleware.verifyToken` valida JWT en rutas de samples y admin
5. **Roles**: `admin` (gestiona usuarios) vs `producer` (gestiona sus propios samples)

---

## 📡 Endpoints principales

### Autenticación (sin autenticación)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/register` | Registrar nuevo productor |
| POST | `/api/auth/login` | Iniciar sesión y obtener JWT |

### Samples (requiere JWT)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/samples/upload` | Subir nuevo sample (FormData con audioFile, display_name, category, bpm) |
| GET | `/api/samples/my-samples` | Listar samples del usuario logueado |
| DELETE | `/api/samples/:id` | Eliminar sample (solo del propietario) |

### Admin (requiere JWT + rol admin)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/admin/users` | Listar todos los usuarios |
| DELETE | `/api/admin/users/:id` | Eliminar usuario y sus samples |

### Navegación (Frontend)

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/` | login.html | Página de login (por defecto) |
| `/login` | login.html | Inicio de sesión |
| `/register` | register.html | Registro de nuevo usuario |
| `/producer-dashboard` | producer-dashboard.html | Panel del productor (gestión de samples) |
| `/admin-dashboard` | admin-dashboard.html | Panel administrativo (gestión de usuarios) |

---

## 💡 Convenciones de Código

### Backend

- **Estructura por capas**: `controllers` → `repositories` → `database`
- **Inyección de dependencias**: Cada controlador importa sus repositorios
- **Middleware centralizado**: `authMiddleware` maneja JWT y roles
- **Variables de entorno**: Todas las credenciales sensibles en `.env`
- **Manejo de errores**: Try/catch con respuestas HTTP apropiadas
- **Comentarios**: Español con propósito educativo (proyecto académico)

### Frontend

- **Sin frameworks pesados**: Vanilla JS puro
- **DOM seguro**: Manipulación de nodos sin innerHTML (previene XSS)
- **Separación de responsabilidades**:
  - `frontControllers/*`: Lógica de vista (listeners, renderizado)
  - `services/apiService.js`: Cliente API centralizado
  - `utils/authHelper.js`: Gestión de sesión/localStorage
  - `components/uiHandlers.js`: Componentes reutilizables (modales)
- **Estilos**: Clases W3.CSS + CSS custom en `css/styles.css`

### Seguridad

- **JWT**: Autenticación sin estado
- **CORS**: Configurado en backend
- **bcrypt**: Hashing seguro de contraseñas (10 rounds)
- **Validación**: En controladores antes de persistir
- **FormData**: Para subida de archivos (multipart/form-data)

---

## 🔧 Tareas Comunes para Agentes

### Agregar una nueva funcionalidad

1. **Backend**: Crear/modificar controlador → Crear/modificar repositorio → Registrar ruta
2. **Frontend**: Crear fronController → Crear funciones de UI → Llamar a apiService
3. **BD**: Ejecutar migraciones SQL en `config/`
4. **Testing**: Usar endpoints en REST Client o Postman

### Solucionar errores

- **401 Unauthorized**: Token expirado o inválido → Verificar `.env` JWT_SECRET
- **403 Forbidden**: Rol insuficiente → Revisar middleware `isAdmin`
- **404 Not Found**: Ruta no registrada o endpoint mal escrito
- **500 Server Error**: Revisar logs en consola del backend + capas de error
- **CORS Error**: Verificar `cors()` en `server.js` y URL base en `apiService`

### Agregar validación

```javascript
// Backend: En el controlador
if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: "Username y password son requeridos" });
}

// Frontend: En el frontController
if (!displayName || !audioFile) {
    showModal('Error', 'Todos los campos son obligatorios');
    return;
}
```

### Manejo de archivos de audio

- **Ubicación**: `backend/uploads/` (creada automáticamente)
- **Middleware**: `multerConfig.js` valida tipos (MP3, WAV, OGG, FLAC)
- **Ruta en BD**: Se guarda como `/uploads/filename.ext`
- **Reproducción**: `<audio>` tag con `src="http://localhost:3000/uploads/..."`
- **Borrado**: `fileHelper.deleteFile()` elimina del disco al borrar sample o usuario

---

## 📚 Documentación Importante

- [README.md](./README.md): Descripción general y setup inicial
- `backend/config/init.sql`: Script SQL para crear tablas (base de datos)
- `backend/config/delete_db.sql`: Script para resetear BD

---

## 🎯 Puntos de Entrada para Agentes

### Si trabajas en el backend

Inicia por: `backend/server.js` → Mira cómo se registran las rutas → Elige una ruta en `backend/routes/` → Ve al controlador correspondiente

### Si trabajas en el frontend

Inicia por: `frontend/js/services/apiService.js` → Ve a `frontend/js/frontControllers/` para entender el flujo → Revisa `frontend/js/utils/authHelper.js` para sesión

### Si trabajas en la BD

Mira: `backend/config/db.js` → `backend/repositories/` → Luego revisa los controladores que usan cada repositorio

---

## ⚠️ Trampas Comunes

| Trampa | Solución |
|--------|----------|
| Token no enviado | Verificar header `Authorization: Bearer <token>` en apiService |
| Archivo no sube | Revisar nombre del campo en FormData (`audioFile` debe coincidir en multerConfig) |
| 401 en rutas protegidas | Asegurar que `verifyToken` middleware está aplicado en la ruta |
| Rol de admin falla | Verificar que se asigna rol correcto al registrarse en BD |
| CORS errors | Token se envía con OPTIONS; verificar `cors()` configuración |
| Archivo no se borra | Revisar ruta absoluta en `fileHelper.deleteFile()` |

---

## 📝 Notas Finales

- **Proyecto académico**: El código incluye comentarios educativos en español
- **Sostenibilidad**: Inspirado en modelo GREENSOFT (eficiencia de recursos)
- **Testing**: Usa archivos en `test-samples/` para pruebas locales
- **Escalabilidad**: Estructura modular permite crecer sin refactorizar

>>>>>>> 4280038ca32cf87612e68ad0a462fb6e510a763a
