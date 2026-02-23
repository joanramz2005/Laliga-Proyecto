# FootballHub - Premier League 2025/2026 ⚽

¡Bienvenido a **FootballHub**! Este proyecto es una plataforma web dedicada al seguimiento de la Premier League inglesa. Ha sido desarrollado como parte del módulo optativo de ASIX para demostrar competencias en desarrollo frontend y gestión de versiones, como también demostrar conocimientos acerca de GitHUB.

## 📋 Descripción del Proyecto
La web permite consultar información actualizada de los equipos de la liga, visualizar el calendario de partidos y resultados, ver la tabla de clasificación y contactar con la administración. Los datos se gestionan de forma dinámica mediante archivos JSON.

## 🚀 Tecnologías Utilizadas
* **HTML5**: Estructura semántica de las páginas.
* **CSS3**: Diseño modular (base, layout, components, pages) utilizando Flexbox y CSS Grid.
* **JavaScript (ES6+)**: Manipulación del DOM, consumo de datos JSON y lógica de filtros.
* **Git & GitHub**: Control de versiones y trabajo colaborativo.

## 📂 Estructura del Repositorio
Siguiendo las especificaciones del proyecto:
- `/index.html`: Página principal y menú de navegación.
- `/pages`: Contiene Equipos, Tabla, Partidos y Contacto.
- `/css`: Estilos organizados por módulos.
- `/js`: Lógica de la aplicación (filtros, buscadores, validación).
- `/data`: Archivos JSON con la información de los clubes y partidos.
- `/img`: Escudos y recursos visuales.

## 🛠️ Funcionalidades Principales
1. **Equipos**: Listado dinámico con buscador en tiempo real y corrección de visualización de escudos (Arsenal scale fix).
2. **Partidos**: Calendario organizado por jornadas consumido desde `partidoss.json`.
3. **Tabla**: Clasificación de la liga con ordenación lógica.
4. **Contacto**: Formulario con validación de campos mediante JavaScript.
5. **Responsive Design**: Adaptado para dispositivos móviles y escritorio.

## 📉 Gestión de Versiones (Git)
Para cumplir con los requisitos académicos, el proyecto incluye:
- **Commits**: Más de 20 commits realizados durante el desarrollo.
- **Ramas (Branches)**: Uso de ramas para desarrollo de funcionalidades específicas.
- **Merges**: Mínimo 3 integraciones de ramas a la principal (`main`).
- **Conflictos**: Resolución de conflictos durante el trabajo colaborativo documentada en el historial.

## ⚠️ Conflicto de Fusión (Merge Conflict)

Durante el desarrollo del proyecto se produjo un conflicto de fusión al trabajar simultáneamente en la misma rama (rama1).

El conflicto ocurrió cuando ambos desarrolladores modificaron la misma sección del archivo:
footballhub/pages/equipos.html

Al ejecutar el comando:
git pull
Git intentó fusionar automáticamente los cambios, pero no pudo hacerlo porque existían modificaciones en las mismas líneas del archivo. El sistema mostró el siguiente mensaje:

Auto-merging footballhub/pages/equipos.html
CONFLICT (content): Merge conflict in footballhub/pages/equipos.html
Automatic merge failed; fix conflicts and then commit the result.

Esto significa que Git detectó cambios incompatibles y necesitaba intervención manual para resolver el conflicto.

En el archivo afectado aparecieron las marcas de conflicto:

<<<HEAD
(código actual)
=======
(código entrante)
>>> RAMA

Donde:
HEAD representa la versión local.
======= separa ambas versiones.
rama1 representa la versión entrante desde el repositorio remoto.

## 🔧 Resolución ##
Para solucionar el conflicto se siguieron los siguientes pasos:
Revisar ambas versiones del código.
Decidir qué cambios conservar.
Eliminar las marcas de conflicto.
Guardar el archivo corregido.
Ejecutar:
git add .
git commit -m "Conflicto resuelto en equipos.html"

Una vez realizado esto, el repositorio volvió a estar sincronizado correctamente.
Este conflicto permitió reforzar el trabajo colaborativo y comprender mejor el funcionamiento interno de Git en entornos de desarrollo en equipo.

##

## ✒️ Autores
* **Marín Favro Velo** - Desarrollador Principal / Lógica JS / Diseño HTML/CSS / Estructura
* **Joan Ramirez** - Desarrollador Principal / Lógica JS / Diseño HTML/CSS / Estructura
---
