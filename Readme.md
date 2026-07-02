# ProyectoM1_JulioCastro

---

## 🎨 Generador Dinámico de Paletas de Colores

Una aplicación interactiva de Frontend construida con JavaScript vanilla, HTML5 y CSS3 que permite a los usuarios generar, visualizar y alternar formatos de paletas de colores aleatorias de forma dinámica.

---

🔗 Demo en vivo: https://jcastroquicano14.github.io/ProyectoM1_JulioCastro/

---

## 🛠️ Decisiones Técnicas y Arquitectura

Para el desarrollo de este proyecto se priorizó el uso de tecnologías nativas para demostrar un dominio sólido de las bases del desarrollo web:

- **Manipulación Eficiente del DOM:** Uso de selectores nativos (`document.getElementById`, `document.querySelector`) y creación dinámica de elementos (`document.createElement`) para renderizar las tarjetas de color sin recargar la página.
- **Algoritmos Matemáticos de Color:**
   - Generación de formatos **HEX** mapeando números aleatorios basados en base 16 (`toString(16)`) con un límite de 16,777,215 colores.
   - Generación de formatos **HSL** calculando dinámicamente grados de matiz ($0-360°$) y porcentajes de saturación y luminosidad ($0-100\%$).
- **Eventos Asíncronos y Propagación:** Implementación de escuchadores de eventos (`addEventListener`) gestionando el flujo con `e.stopPropagation()` para evitar conflictos de clicks entre los botones de bloqueo (candados) y el copiado de la tarjeta.
- **Persistencia Temporal Auditada:** Creación de un sistema de notificaciones tipo _Toast_ gestionado mediante temporizadores asíncronos (`setTimeout`) para limpiar el DOM automáticamente a los 2.5 segundos de emitir un aviso.
- **API de Portapapeles Nativa:** Uso de `navigator.clipboard.writeText` para agilizar la experiencia de usuario copiando códigos de color directamente con un click.

---

## 🌟Características

- Construccion aleatoria de paletas.
- Colores Generados en Formato HEX y HSL.
- Copiar el codigo del color especifico.
-

---

## 🚀 Pasos para Ejecutar la Aplicación Localmente

Sigue estos pasos para visualizar y probar el proyecto en tu computadora:

### 1. Clonar el repositorio u organizar los archivos

Asegúrate de tener tus archivos estructurados en la misma carpeta:

```bash
git clone <LINK_DE_TU_REPOSITORIO_DE_GITHUB>
```
