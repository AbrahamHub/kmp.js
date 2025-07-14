kmp.js
======

# Implementación del Algoritmo Knuth-Morris-Pratt (KMP)

## Descripción General

Esta implementación proporciona una búsqueda eficiente de subcadenas utilizando el algoritmo Knuth-Morris-Pratt (KMP). El algoritmo permite encontrar la primera ocurrencia de un patrón dentro de un texto con una complejidad temporal de O(n + m), donde n es la longitud del texto y m es la longitud del patrón.

## Alcance y Especificaciones

### Funcionalidades Implementadas

- **Búsqueda de patrones**: Encuentra la primera posición donde aparece un patrón específico dentro de un texto
- **Construcción de tabla de prefijos**: Genera la tabla de fallos necesaria para el algoritmo KMP
- **Manejo de casos especiales**: Gestiona cadenas vacías y patrones más largos que el texto

### Limitaciones

- La función retorna únicamente la **primera ocurrencia** del patrón
- No permite búsquedas insensibles a mayúsculas/minúsculas
- Trabaja exclusivamente con cadenas de texto (strings)


### Conceptos Fundamentales

- **Patrón (w)**: La subcadena que se desea encontrar dentro del texto
- **Texto (s)**: La cadena donde se realizará la búsqueda
- **Tabla de prefijos (T)**: Estructura de datos que almacena información sobre los prefijos del patrón para optimizar la búsqueda
- **Índice de fallo**: Posición a la cual retroceder en el patrón cuando ocurre una discordancia

### Variables Principales

- `s`: Texto donde se realiza la búsqueda
- `w`: Patrón a buscar
- `slen`: Longitud del texto
- `wlen`: Longitud del patrón
- `j`: Posición actual en el texto
- `k`: Posición actual en el patrón
- `T`: Tabla de prefijos/fallos

## Funciones Implementadas

### 1. `kmpSearch(s, w)`

**Propósito**: Función principal que ejecuta la búsqueda del patrón en el texto.

**Parámetros**:
- `s` (string): Texto donde realizar la búsqueda
- `w` (string): Patrón a buscar

**Valor de retorno**:
- `number`: Índice de la primera ocurrencia (base 0) o -1 si no se encuentra

**Casos especiales manejados**:
- Si `w` es vacío, retorna 0
- Si `s` es vacío o `w` es más largo que `s`, retorna -1

### 2. `kmp_table(W)`

**Propósito**: Construye la tabla de prefijos necesaria para el algoritmo KMP.

**Parámetros**:
- `W` (array): Patrón convertido a array de caracteres

**Valor de retorno**:
- `Array`: Tabla de prefijos de longitud `W.length + 1`

**Funcionamiento**:
- Calcula para cada posición del patrón, cuántas posiciones retroceder en caso de discordancia
- Utiliza el concepto de prefijos propios más largos que también son sufijos

## Proceso de Ejecución Paso a Paso

### Fase 1: Validación Inicial
1. Se obtienen las longitudes del texto (`slen`) y patrón (`wlen`)
2. Se validan los casos especiales:
   - Patrón vacío → retorna 0
   - Texto vacío o patrón más largo → retorna -1

### Fase 2: Preparación
1. Se convierten las cadenas a arrays de caracteres
2. Se construye la tabla de prefijos llamando a `kmp_table(w)`

### Fase 3: Búsqueda Principal
1. Se inicializan los índices `j` (texto) y `k` (patrón) en 0
2. Se ejecuta el bucle principal mientras `j < slen`:
   - **Caso 1**: `w[k] === s[j]` (coincidencia)
     - Se avanzan ambos índices
     - Si `k === wlen`, se encontró el patrón completo
   - **Caso 2**: No hay coincidencia
     - Se consulta la tabla de prefijos: `k = T[k]`
     - Si `k < 0`, se avanza en el texto y se reinicia el patrón

### Fase 4: Construcción de Tabla de Prefijos
1. Se inicializa `T[0] = -1`
2. Se procesan todas las posiciones del patrón
3. Para cada posición se determina el valor de retroceso óptimo

## Ejemplos de Uso

### Ejemplo 1: Búsqueda exitosa
```javascript
var texto = "abcdefghijklmnop";
var patron = "def";
var resultado = kmpSearch(texto, patron);
console.log(resultado); // Salida: 3
```

### Ejemplo 2: Patrón no encontrado
```javascript
var texto = "abcdefghijklmnop";
var patron = "xyz";
var resultado = kmpSearch(texto, patron);
console.log(resultado); // Salida: -1
```

### Ejemplo 3: Patrón vacío
```javascript
var texto = "cualquier texto";
var patron = "";
var resultado = kmpSearch(texto, patron);
console.log(resultado); // Salida: 0
```

### Ejemplo 4: Patrón repetitivo
```javascript
var texto = "aaaaabaaa";
var patron = "aaab";
var resultado = kmpSearch(texto, patron);
console.log(resultado); // Salida: 2
```

## Complejidad Computacional

### Tiempo de Ejecución
- **Construcción de tabla**: O(m), donde m es la longitud del patrón
- **Búsqueda**: O(n), donde n es la longitud del texto
- **Total**: O(n + m)

### Espacio Utilizado
- **Tabla de prefijos**: O(m)
- **Conversión a arrays**: O(n + m)
- **Total**: O(n + m)

## Ventajas del Algoritmo KMP

1. **Eficiencia**: Nunca retrocede en el texto original
2. **Optimalidad**: Complejidad lineal en el peor caso
3. **Robustez**: Maneja patrones con repeticiones de manera eficiente
4. **Predictibilidad**: Rendimiento consistente independientemente del input

## Requisitos del Sistema

### Entorno de Ejecución
- **JavaScript**: Compatible con ES5 y versiones superiores
- **Navegador**: Cualquier navegador moderno (Chrome, Firefox, Safari, Edge)

### Dependencias
- **Ninguna**: El código no requiere librerías externas
- **Standalone**: Funciona de forma independiente

## Instalación y Configuración

### Paso 1: Preparación del Archivo
1. Crea un archivo con extensión `.js` (ejemplo: `kmp-search.js`)
2. Copia el código completo en el archivo
3. Guarda el archivo en tu directorio de trabajo

### Paso 2: Ejecución en Navegador
1. Crea un archivo HTML básico:
```html
<!DOCTYPE html>
<html>
<head>
    <title>KMP Search</title>
</head>
<body>
    <script src="kmp-search.js"></script>
    <script>
        // Tu código de prueba aquí
        var resultado = kmpSearch("texto de prueba", "prueba");
        console.log(resultado);
    </script>
</body>
</html>
```

## Instrucciones de Uso

### Uso Básico
```javascript
// Llamada directa a la función
var posicion = kmpSearch("texto completo", "patrón");
```

### Casos de Uso Prácticos

#### 1. Búsqueda Simple
```javascript
var texto = "El algoritmo KMP es eficiente";
var patron = "KMP";
var resultado = kmpSearch(texto, patron);
if (resultado !== -1) {
    console.log("Patrón encontrado en posición: " + resultado);
} else {
    console.log("Patrón no encontrado");
}
```

#### 2. Validación de Existencia
```javascript
function contienePatron(texto, patron) {
    return kmpSearch(texto, patron) !== -1;
}

var existe = contienePatron("JavaScript es genial", "Script");
console.log(existe); // true
```

#### 3. Extracción de Contexto
```javascript
function extraerContexto(texto, patron, contexto) {
    var pos = kmpSearch(texto, patron);
    if (pos !== -1) {
        var inicio = Math.max(0, pos - contexto);
        var fin = Math.min(texto.length, pos + patron.length + contexto);
        return texto.substring(inicio, fin);
    }
    return null;
}

var contexto = extraerContexto("Esto es una prueba de búsqueda", "prueba", 5);
console.log(contexto); // "na prueba de"
```

## Casos de Uso Recomendados

- Búsqueda de patrones en archivos de texto grandes
- Procesamiento de logs y análisis de datos
- Implementación de funciones de búsqueda en editores de texto
- Validación de formatos y patrones específicos

## Consideraciones de Implementación

### Conversión a Arrays
El código convierte las cadenas a arrays usando `split("")`. Esta conversión es opcional y mantiene compatibilidad con el estilo de programación utilizado.

### Manejo de Índices
- Todos los índices utilizan base 0
- La función retorna -1 para indicar "no encontrado"
- El valor de retorno representa la posición inicial del patrón encontrado

### Tabla de Prefijos Extendida
La tabla `T` tiene longitud `W.length + 1` para incluir el caso especial `T[length(W)]`, necesario cuando se buscan todas las ocurrencias del patrón.

## Solución de Problemas Comunes

### Error: "kmpSearch is not defined"
**Causa**: El archivo no se ha cargado correctamente
**Solución**: Verifica que el archivo .js esté en la ruta correcta y se cargue antes de usar la función

### Error: "Cannot read property 'length' of undefined"
**Causa**: Se pasó un parámetro undefined o null
**Solución**: Valida que tanto el texto como el patrón sean strings válidos

### Resultado inesperado con caracteres especiales
**Causa**: El algoritmo es sensible a caracteres especiales
**Solución**: Normaliza el texto si es necesario antes de la búsqueda

## Notas Técnicas

- El algoritmo es sensible a mayúsculas y minúsculas
- La implementación utiliza variables descriptivas para mejorar la legibilidad
- El código incluye comentarios explicativos en puntos clave
- La función principal está diseñada para ser reutilizable y modular

[1]: http://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm
