# Menú digital

Demo adaptable de un menú para restaurante. Permite buscar productos, elegir extras, calcular el costo de entrega y recorrer el flujo de pedido.

**Modo demo:** los pedidos no se envían por WhatsApp ni se registran. Usa datos ficticios al probar el formulario.

## Ejecutar en tu computadora

Necesitas tener Node.js instalado. Abre una terminal en esta carpeta y ejecuta:

```bash
npm install
npm run dev
```

Abre en el navegador la dirección que muestre Vite (normalmente `http://localhost:5173`). Para detener el servidor, presiona `Ctrl+C` en la terminal.

Antes de publicar, puedes comprobar la aplicación con:

```bash
npm run lint
npm run build
```

## Personalizar la demo

Los datos principales están en [`src/data/menuData.js`](./src/data/menuData.js):

- Cambia el nombre, descripción, horario y las zonas y tarifas de entrega.
- Revisa nombres, descripciones, precios, extras y fotos de todos los productos.
- Al agregar productos, usa una categoría que exista en `categories` o agrega primero la categoría.

Usa fotografías propias o imágenes que tengas permiso de utilizar. Las imágenes actuales son de muestra y se cargan desde Unsplash.

## Publicar en Render

El proyecto incluye [`render.yaml`](./render.yaml) para configurar un sitio estático. Para publicarlo:

1. Sube la carpeta `menu-digital` a un repositorio **privado** de GitHub. No hace falta subir `node_modules` ni `dist`; ya están excluidos por `.gitignore`.
2. Inicia sesión en Render y conecta tu cuenta de GitHub.
3. En Render, crea un **Blueprint** y selecciona el repositorio. Render leerá `render.yaml`, compilará el proyecto y publicará `dist/`.
4. Cuando termine la primera publicación, comparte la URL `onrender.com`. El sitio será público aunque el repositorio sea privado.

Render puede volver a publicar automáticamente cuando subas cambios al repositorio. Los visitantes solo necesitan abrir el enlace; no necesitan cuenta de GitHub ni de Render.

## Alcance y siguiente paso

- Esta demo no tiene un número de WhatsApp activo, no registra pedidos y no incluye panel de administración, pagos automáticos, inventario ni seguimiento de entregas.
- Para aceptar pedidos reales, configura un número de WhatsApp del restaurante y conecta el flujo de envío antes de quitar los avisos de demo.
- Comprueba precios, ingredientes, extras, horario, zonas y costos de entrega antes de publicar.
- Revisa que las imágenes carguen y que tengas derecho a usarlas.
- Haz una prueba completa en móvil: buscar, filtrar, agregar extras, cambiar cantidades y simular el pedido.
- Evita presentar como reales valoraciones, ventas o servicios que el restaurante no haya confirmado.
