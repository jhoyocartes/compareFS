const fs = require('fs');
const path = require('path');

// Función para leer el directorio y guardar los archivos en un diccionario
function leerDirectorio(directorio) {
    const archivos = fs.readdirSync(directorio);
    const resultado = {};

    archivos.forEach((archivo, indice) => {
        resultado[indice] = archivo;
    });

    return resultado;
}

// Simulamos la descarga de un archivo creando uno nuevo en la carpeta download
function descargarArchivo(directorio, nombreArchivo) {
    const rutaArchivo = path.join(directorio, nombreArchivo);
    fs.writeFileSync(rutaArchivo, 'Contenido del archivo descargado');
    console.log(`Archivo "${nombreArchivo}" descargado en ${directorio}`);
}

// Comparar las dos lecturas y encontrar el nuevo archivo
function encontrarNuevoArchivo(primeraLectura, segundaLectura) {
    const archivosNuevos = Object.values(segundaLectura).filter(
        archivo => !Object.values(primeraLectura).includes(archivo)
    );

    if (archivosNuevos.length > 0) {
        console.log('Nuevo archivo descargado:', archivosNuevos);
    } else {
        console.log('No se encontraron archivos nuevos.');
    }
}

// Ejemplo de uso
const directorio = path.join(__dirname, 'download'); // Ruta a la carpeta download

// Primera lectura
const primeraLectura = leerDirectorio(directorio);
console.log('Primera lectura del directorio:', primeraLectura);

// Simular descarga de un archivo
descargarArchivo(directorio, 'nuevoArchivo.txt');

// Segunda lectura
const segundaLectura = leerDirectorio(directorio);
console.log('Segunda lectura del directorio:', segundaLectura);

// Encontrar y mostrar el nuevo archivo
encontrarNuevoArchivo(primeraLectura, segundaLectura);
