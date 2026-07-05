<<<<<<< HEAD
SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

-- 1. Borrar la base de datos si existe para evitar conflictos de versiones anteriores
DROP DATABASE IF EXISTS samplevault;
CREATE DATABASE samplevault;
USE samplevault;

-- 2. Borrar el usuario si existe, crearlo de nuevo y otorgar permisos
DROP USER IF EXISTS 'samplevault'@'localhost';
CREATE USER 'samplevault'@'localhost' IDENTIFIED BY 'samplevault';
GRANT ALL PRIVILEGES ON samplevault.* TO 'samplevault'@'localhost';

-- 3. Crear tabla de Usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'producer') DEFAULT 'producer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Crear tabla de Samples
CREATE TABLE samples (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    filename VARCHAR(255) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    bpm INT DEFAULT 0,
    file_path VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 5. Insertar un Administrador de prueba (Contraseña: 12345)
INSERT INTO users (username, password, role) 
VALUES ('admin', '$2b$10$.n0s847tiSxBqDvIo6Vg5ujXC5zIUmm98bTjBWnRdqX9CxxbIo7wS', 'admin');

-- 6. Insertar un Productor de prueba (Contraseña: 12345)
INSERT INTO users (username, password, role) 
=======
SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

-- 1. Borrar la base de datos si existe para evitar conflictos de versiones anteriores
DROP DATABASE IF EXISTS samplevault;
CREATE DATABASE samplevault;
USE samplevault;

-- 2. Borrar el usuario si existe, crearlo de nuevo y otorgar permisos
DROP USER IF EXISTS 'samplevault'@'localhost';
CREATE USER 'samplevault'@'localhost' IDENTIFIED BY 'samplevault';
GRANT ALL PRIVILEGES ON samplevault.* TO 'samplevault'@'localhost';

-- 3. Crear tabla de Usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'producer') DEFAULT 'producer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Crear tabla de Samples
CREATE TABLE samples (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    filename VARCHAR(255) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    bpm INT DEFAULT 0,
    file_path VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 5. Insertar un Administrador de prueba (Contraseña: 12345)
INSERT INTO users (username, password, role) 
VALUES ('admin', '$2b$10$.n0s847tiSxBqDvIo6Vg5ujXC5zIUmm98bTjBWnRdqX9CxxbIo7wS', 'admin');

-- 6. Insertar un Productor de prueba (Contraseña: 12345)
INSERT INTO users (username, password, role) 
>>>>>>> 4280038ca32cf87612e68ad0a462fb6e510a763a
VALUES ('pepe', '$2b$10$.n0s847tiSxBqDvIo6Vg5ujXC5zIUmm98bTjBWnRdqX9CxxbIo7wS', 'producer');