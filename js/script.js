//* Selectores del DOM
const selector = document.getElementById("selector-cantidad");
const generarPalet = document.getElementById("generar-paleta");
const mostrarFormat = document.getElementById("mostrar-formato");
const guardarPaleta = document.getElementById("guardar-paleta");
const contenedorColores = document.getElementById("contenedor-colores");
const toastContainer = document.getElementById("toast-container");

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

//* Obten el valor del selector de cantidad y formato, y genera la paleta de colores correspondiente.

function obtenerSizePaleta() {
	return parseInt(
		document.querySelector('select[name="selector-cantidad"]').value,
	);
}
//* Crear una funcion para indicar cuando marco el logo del candado que se genere una nueva paleta de colores, pero que no se modifique el color de la tarjeta bloqueada.

function bloquearColor(tarjeta) {
	const candado = tarjeta.querySelector(".candadoBtn");
	tarjeta.classList.toggle("bloqueado");
	if (tarjeta.classList.contains("bloqueado")) {
		candado.textContent = "🔒";
	} else {
		candado.textContent = "🔓";
	}
}

//* Generar la paleta de colores según la cantidad seleccionada por el usuario, y mostrarla en el contenedor correspondiente.

function crearPaleta() {
	const tarjetasExistentes =
		contenedorColores.querySelectorAll(".tarjeta-color");
	let coloresAnteriores = [];

	tarjetasExistentes.forEach((tarjeta) => {
		coloresAnteriores.push({
			color: tarjeta.querySelector(".codigo-texto").textContent,
			bloqueado: tarjeta.classList.contains("bloqueado"),
		});
	});

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
		// 1. Decidimos qué color generar según el formato actual
		const esHex = mostrarFormat.textContent === "Mostrar HEX";
		let colorAleatorio;
		let estaBloqueado = false;

		if (coloresAnteriores[i] && coloresAnteriores[i].bloqueado) {
			colorAleatorio = coloresAnteriores[i].color;
			estaBloqueado = true;
		} else {
			colorAleatorio = esHex ? generarHEX() : generarHSL();
		}

		// 2. Creamos y configuramos el contenedor de la tarjeta
		const tarjeta = document.createElement("div");
		tarjeta.className = "tarjeta-color";
		tarjeta.style.backgroundColor = colorAleatorio;

		if (estaBloqueado) {
			tarjeta.classList.add("bloqueado");
		}
		// 3. Creamos y configuramos el texto interno
		const textoColor = document.createElement("span");
		textoColor.className = "codigo-texto";
		textoColor.textContent = colorAleatorio;

		const candado = document.createElement("button");
		candado.className = "candadoBtn";
		candado.textContent = estaBloqueado ? "🔒" : "🔓";

		candado.addEventListener("click", (e) => {
			e.stopPropagation(); // Evita que el clic en el candado dispare el evento de la tarjeta

			bloquearColor(tarjeta);
		});

		// 4. Inyectamos los elementos en el DOM
		tarjeta.appendChild(textoColor);
		tarjeta.appendChild(candado);
		contenedorColores.appendChild(tarjeta);

		// Agrega un evento a cada tarjeta de color para copiar el código al portapapeles y mostrar un aviso
		tarjeta.addEventListener("click", () => {
			navigator.clipboard.writeText(colorAleatorio);
			mostrarAviso(`Copiado: ${colorAleatorio}`);
		});
	}
	mostrarAviso("Paleta generada");
}

generarPalet.addEventListener("click", crearPaleta);

//* Agrega un evento a cada tarjeta de color para copiar el código al portapapeles y mostrar un aviso.

function mostrarAviso(mensaje) {
	toastContainer.innerHTML = "";

	const aviso = document.createElement("div");
	aviso.className = "toast";
	aviso.innerText = mensaje;

	toastContainer.appendChild(aviso);

	setTimeout(function () {
		aviso.remove();
	}, 2500);
}

//* Agrega un evento al botón de mostrar formato para alternar entre HEX y HSL. */
mostrarFormat.addEventListener("click", () => {
	if (mostrarFormat.textContent === "Mostrar HEX") {
		mostrarFormat.textContent = "Mostrar HSL";
	} else {
		mostrarFormat.textContent = "Mostrar HEX";
	}
});
