const poke_container = document.getElementById("poke_container");
const loader = document.getElementById("loader");
const loaderBottom = document.getElementById("loaderBottom");
const loadMoreText = document.getElementById("loadMore");
const gen1_dropdown = document.getElementById("gen1");
const gen2_dropdown = document.getElementById("gen2");
const gen3_dropdown = document.getElementById("gen3");
const gen4_dropdown = document.getElementById("gen4");
const gen5_dropdown = document.getElementById("gen5");
const gen1_m = document.getElementById("gen1-m");
const gen2_m = document.getElementById("gen2-m");
const gen3_m = document.getElementById("gen3-m");
const gen4_m = document.getElementById("gen4-m");
const gen5_m = document.getElementById("gen5-m");
const hamBar = document.getElementById("hamBar");
const mobileSearch = document.getElementById("mobileSearch");
const nav = document.getElementById("nav");
let pokemons_number_start_gen1 = 1;
let pokemons_number_end_gen1 = 151;
let pokemons_number_start_gen2 = 152;
let pokemons_number_end_gen2 = 251;
let pokemons_number_start_gen3 = 252;
let pokemons_number_end_gen3 = 386;
let pokemons_number_start_gen4 = 387;
let pokemons_number_end_gen4 = 493;
let pokemons_number_start_gen5 = 494;
let pokemons_number_end_gen5 = 649;
let load_number = 30;
let end1 = pokemons_number_start_gen1 + load_number;
let end2 = pokemons_number_start_gen2 + load_number;
let end3 = pokemons_number_start_gen3 + load_number;
let end4 = pokemons_number_start_gen4 + load_number;
let end5 = pokemons_number_start_gen5 + load_number;
let current_gen = 1;
let timeout;
const colors = {
	fire: "#F08030",
	grass: "#78C850",
	electric: "#F8D030",
	water: "#6890F0",
	ground: "#E0C068",
	rock: "#B8A038",
	fairy: "#EE99AC",
	poison: "#A040A0",
	bug: "#A8B820",
	dragon: "#7038F8",
	psychic: "#F85888",
	flying: "#A890F0",
	fighting: "#C03028",
	normal: "#A8A878",
	ghost: "#705898",
	steel: "#B8B8D0",
	ice: "#98D8D8",
	shadow: "rgb(105, 66, 99)",
	dark: "rgb(75, 75, 75)",
	unknwon: "#68A090",
};

// Takes out the keys from the colors object
const main_types = Object.keys(colors);

function toggleMenu() {
	nav.classList.toggle("menu_shown");
}

function changeGen(genNumber) {
	current_gen = genNumber;
	clearStyle();
	clearPage();
	loadingAnimation();
	resetStartAndEnd();
	switch (current_gen) {
		case 1:
			gen1_dropdown.style.fontWeight = 700;
			gen1_dropdown.style.background = "#cabbef";
			gen1_m.style.fontWeight = 700;
			gen1_m.style.background = "#cabbef";
			break;
		case 2:
			gen2_m.style.fontWeight = 700;
			gen2_m.style.background = "#cabbef";
			gen2_m.style.fontWeight = 700;
			gen2_m.style.background = "#cabbef";
			break;
		case 3:
			gen3_dropdown.style.fontWeight = 700;
			gen3_dropdown.style.background = "#cabbef";
			gen3_m.style.fontWeight = 700;
			gen3_m.style.background = "#cabbef";
			break;
		case 4:
			gen4_dropdown.style.fontWeight = 700;
			gen4_dropdown.style.background = "#cabbef";
			gen4_m.style.fontWeight = 700;
			gen4_m.style.background = "#cabbef";
			break;
		case 5:
			gen5_dropdown.style.fontWeight = 700;
			gen5_dropdown.style.background = "#cabbef";
			gen5_m.style.fontWeight = 700;
			gen5_m.style.background = "#cabbef";
			break;

		default:
			gen1_dropdown.style.fontWeight = 700;
			gen1_dropdown.style.background = "#cabbef";
			gen1_m.style.fontWeight = 700;
			gen1_m.style.background = "#cabbef";
			break;
	}

	fetchPokemons(current_gen);
}

function clearStyle() {
	gen1_dropdown.style.fontWeight = 400;
	gen1_dropdown.style.backgroundColor = "white";
	gen1_m.style.fontWeight = 400;
	gen1_m.style.backgroundColor = "white";

	gen2_dropdown.style.fontWeight = 400;
	gen2_dropdown.style.backgroundColor = "white";
	gen2_m.style.fontWeight = 400;
	gen2_m.style.backgroundColor = "white";

	gen3_dropdown.style.fontWeight = 400;
	gen3_dropdown.style.backgroundColor = "white";
	gen3_m.style.fontWeight = 400;
	gen3_m.style.backgroundColor = "white";

	gen4_dropdown.style.fontWeight = 400;
	gen4_dropdown.style.backgroundColor = "white";
	gen4_m.style.fontWeight = 400;
	gen4_m.style.backgroundColor = "white";

	gen5_dropdown.style.fontWeight = 400;
	gen5_dropdown.style.backgroundColor = "white";
	gen5_m.style.fontWeight = 400;
	gen5_m.style.backgroundColor = "white";
}

function clearPage() {
	poke_container.innerHTML = "";
}

function resetStartAndEnd() {
	pokemons_number_start_gen1 = 1;
	pokemons_number_end_gen1 = 151;
	pokemons_number_start_gen2 = 152;
	pokemons_number_end_gen2 = 251;
	pokemons_number_start_gen3 = 252;
	pokemons_number_end_gen3 = 386;
	pokemons_number_start_gen4 = 387;
	pokemons_number_end_gen4 = 493;
	pokemons_number_start_gen5 = 494;
	pokemons_number_end_gen5 = 649;
	load_number = 30;
	end1 = pokemons_number_start_gen1 + load_number;
	end2 = pokemons_number_start_gen2 + load_number;
	end3 = pokemons_number_start_gen3 + load_number;
	end4 = pokemons_number_start_gen4 + load_number;
	end5 = pokemons_number_start_gen5 + load_number;
}

const fetchPokemons = async (genNumber = 1) => {
	switch (genNumber) {
		case 1:
			for (let i = pokemons_number_start_gen1; i <= end1; i++) {
				await getPokemon(i);
				console.log("got: " + i);
				if (i == pokemons_number_end_gen1) {
					loadMoreText.style.display = "none";
				}
			}

			pokemons_number_start_gen1 = pokemons_number_start_gen1 + load_number + 1;
			end1 = end1 + load_number + 1;

			if (end1 >= pokemons_number_end_gen1) {
				end1 = pokemons_number_end_gen1;
			}
			break;
		case 2:
			load_number = 30;
			for (let i = pokemons_number_start_gen2; i <= end2; i++) {
				await getPokemon(i);
				console.log("got: " + i);
				if (i == pokemons_number_end_gen2) {
					loadMoreText.style.display = "none";
				}
			}

			pokemons_number_start_gen2 = pokemons_number_start_gen2 + load_number + 1;
			end2 = end2 + load_number + 1;

			if (end2 >= pokemons_number_end_gen2) {
				end2 = pokemons_number_end_gen2;
			}
			break;
		case 3:
			load_number = 30;
			for (let i = pokemons_number_start_gen3; i <= end3; i++) {
				await getPokemon(i);
				console.log("got: " + i);
				if (i == pokemons_number_end_gen3) {
					loadMoreText.style.display = "none";
				}
			}

			pokemons_number_start_gen3 = pokemons_number_start_gen3 + load_number + 1;
			end3 = end3 + load_number + 1;

			if (end3 >= pokemons_number_end_gen3) {
				end3 = pokemons_number_end_gen3;
			}
			break;
		case 4:
			load_number = 30;
			for (let i = pokemons_number_start_gen4; i <= end4; i++) {
				await getPokemon(i);
				console.log("got: " + i);
				if (i == pokemons_number_end_gen4) {
					loadMoreText.style.display = "none";
				}
			}

			pokemons_number_start_gen4 = pokemons_number_start_gen4 + load_number + 1;
			end4 = end4 + load_number + 1;

			if (end4 >= pokemons_number_end_gen4) {
				end4 = pokemons_number_end_gen4;
			}
			break;
		case 5:
			load_number = 30;
			for (let i = pokemons_number_start_gen5; i <= end5; i++) {
				await getPokemon(i);
				console.log("got: " + i);
				if (i == pokemons_number_end_gen5) {
					loadMoreText.style.display = "none";
				}
			}

			pokemons_number_start_gen5 = pokemons_number_start_gen5 + load_number + 1;
			end5 = end5 + load_number + 1;

			if (end5 >= pokemons_number_end_gen5) {
				end5 = pokemons_number_end_gen5;
			}
			break;
		default:
			break;
	}
};

const getPokemon = async (id) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement("div");
	pokemonEl.classList.add("pokemon");

	const flipEl = document.createElement("div");
	flipEl.classList.add("flip-card-inner");

	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const poke_types = pokemon.types.map((el) => el.type.name);
	let types = "";
	let typePlural = "";
	let color1 = colors[poke_types[0]];
	let color2 = "";

	if (poke_types.length > 1) {
		types =
			poke_types[0][0].toUpperCase() +
			poke_types[0].slice(1) +
			", " +
			poke_types[1][0].toUpperCase() +
			poke_types[1].slice(1);
		typePlural = "Types";
		color2 = colors[poke_types[1]];
		assignColor(flipEl, color1, color2);
	} else {
		types = poke_types[0][0].toUpperCase() + poke_types[0].slice(1);
		typePlural = "Type";
		assignColor(flipEl, color1);
	}

	pokemonEl.appendChild(flipEl);
	const pokeInnerHtml = `
	 
        <div class="flip-card-front" >
          <div class="img-container">
            <img src="${pokemon.sprites.other.dream_world.front_default}" />
          </div>
          <div class="info">
            <span class="number">#${pokemon.id
							.toString()
							.padStart(3, "0")}</span>
            <h3 class="name">${name}</h3>
            <small class="type"> ${typePlural}: <span>${types}</span></small>
          </div>
        </div>

				<div class="flip-card-back">
					<h2>Stats:</h2>
					<ul class="stats">
						<li><span>HP:</span> ${pokemon.stats[0].base_stat}</li>
						<li><span>Attack:</span> ${pokemon.stats[1].base_stat}</li>
						<li><span>Defense:</span> ${pokemon.stats[2].base_stat}</li>
						<li><span>Special Attack:</span> ${pokemon.stats[3].base_stat}</li>
						<li><span>Special Defense:</span> ${pokemon.stats[4].base_stat}</li>
						<li><span>Speed:</span> ${pokemon.stats[5].base_stat}</li>
					</ul>
				</div>
  `;
	flipEl.innerHTML = pokeInnerHtml;
	poke_container.appendChild(pokemonEl);
}

function assignColor(pokemonEl, color1, color2 = null) {
	if (color2 == null) {
		pokemonEl.style.backgroundColor = color1;
	} else {
		pokemonEl.style.background =
			"linear-gradient(" + "150deg" + ", " + color1 + ", " + color2 + ")";
	}
}

fetchPokemons(current_gen);

function loadingAnimation() {
	loader.style.display = "block";
	poke_container.style.display = "none";
	loadMoreText.style.display = "none";
	setTimeout(showPage, 800);
}

function showPage() {
	loader.style.display = "none";
	poke_container.style.display = "flex";
	loadMoreText.style.display = "flex";
}

function sleep(milliseconds) {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}

$(window).scroll(function () {
	if ($(document).height() <= $(window).scrollTop() + $(window).height()) {
		sleep(800);
		fetchPokemons(current_gen);
	}
});

$(document).ready(function () {
	$(".menu__icon").click(function () {
		$("nav").toggleClass("menu_shown");
	});
});

$(".menu li a").on("click", function () {
	$("nav").removeClass("menu_shown");
});

$(document).ready(function () {
	$(".mobileSearch").click(function () {
		$(".mobileSearchBar").toggleClass("mobileSearchBarShown");
	});
});
