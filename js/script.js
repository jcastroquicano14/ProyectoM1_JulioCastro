//* Selectores del DOM
const selector = document.getElementById("selector-cantidad");
const generarPalet = document.getElementById("generar-paleta");
const mostrarFormat = document.getElementById("mostrar-formato");
const guardarPaleta = document.getElementById("guardar-paleta");
const contenedorColores = document.getElementById("contenedor-colores");

//* Crea un array vacío para almacenar los colores generados.

let paletaInicio = [];

//* Crea una función para generar un color HEX aleatorio.

function generarHEX() {
	return (
		"#" +
		Math.floor(Math.random() * 16777215)
			.toString(16)
			.padStart(6, "0")
			.toUpperCase()
	);
}

//* Crea una función para generar un color HSL aleatorio.

function generarHSL() {
	return `hsl(${Math.floor(Math.random() * 360)}, ${Math.floor(Math.random() * 100)}%, ${Math.floor(Math.random() * 100)}%)`;
}
console.log(generarHEX());
console.log(generarHSL());

//* Obten el valor del selector de cantidad y formato, y genera la paleta de colores correspondiente.

function obtenerSizePaleta() {
	return parseInt(
		document.querySelector('select[name="selector-cantidad"]').value,
	);
}

//* Generar la paleta de colores según la cantidad seleccionada por el usuario, y mostrarla en el contenedor correspondiente.

function crearPaleta() {
	// Limpiamos el contenedor para borrar la paleta anterior
	contenedorColores.innerHTML = "";

	// Capturamos cuántos colores quiere el usuario (6, 8 o 9)
	const tamañoPaleta = obtenerSizePaleta();

	// Ajustamos las columnas del Grid dinámicamente según la cantidad (8 columnas -> grid-4, sino grid-3)
	contenedorColores.className =
		tamañoPaleta === 8
			? "contenedor-color grid-4"
			: "contenedor-color grid-3";

	// Bucle para crear cada tarjeta de color individualmente
	for (let i = 0; i < tamañoPaleta; i++) {
		if (mostrarFormat.textContent === "Mostrar HEX") {
			const colorAleatorioHex = generarHEX(); // Generamos el color para esta tarjeta

			// Creamos el contenedor de la tarjeta individual
			const tarjeta = document.createElement("div");
			tarjeta.className = "tarjeta-color";
			tarjeta.style.backgroundColor = colorAleatorioHex; // Le asignamos el fondo de color

			// Creamos el texto que mostrará el código HEX abajo o adentro
			const textoColor = document.createElement("span");
			textoColor.className = "codigo-texto";
			textoColor.textContent = colorAleatorioHex; // Escribimos el código (ej: #FF5733)

			// Metemos el texto dentro de la tarjeta, y la tarjeta dentro del contenedor principal
			tarjeta.appendChild(textoColor);
			contenedorColores.appendChild(tarjeta);
		} else {
			const colorAleatorioHSL = generarHSL(); // Generamos el color para esta tarjeta
			const tarjeta = document.createElement("div");
			tarjeta.className = "tarjeta-color";
			tarjeta.style.backgroundColor = colorAleatorioHSL; // Le asignamos el fondo de color

			const textoColor = document.createElement("span");
			textoColor.className = "codigo-texto";
			textoColor.textContent = colorAleatorioHSL; // Escribimos el código (ej: hsl(120, 100%, 50%))

			tarjeta.appendChild(textoColor);
			contenedorColores.appendChild(tarjeta);
		}
	}
}

// --- 4. ESCUCHADOR DE EVENTOS ---
// Hacemos que al presionar el botón "Generar Paleta" se ejecute la función
generarPalet.addEventListener("click", crearPaleta);

// (Opcional) Si quieres que cambie automáticamente apenas el usuario elija otra cantidad:
// selectorCantidad.addEventListener("change", crearPaleta);

// function renderizarDom() {
// 	//* Limpia el contenedor de colores antes de renderizar la nueva paleta.
// 	contenedorColores.innerHTML = "";

//* Recorre la paleta y crea elementos HTML para cada color, aplicando estilos y funcionalidades según el estado de bloqueo.
paletaInicio.forEach((color, index) => {
	const colorDiv = document.createElement("div");
	colorDiv.className = "color";
	colorDiv.style.backgroundColor = color.hex;
	contenedorColores.appendChild(colorDiv);
});

//* Agrega un evento al botón de mostrar formato para alternar entre HEX y HSL. */
mostrarFormat.addEventListener("click", () => {
	if (mostrarFormat.textContent === "Mostrar HEX") {
		mostrarFormat.textContent = "Mostrar HSL";
	} else {
		mostrarFormat.textContent = "Mostrar HEX";
	}
});
