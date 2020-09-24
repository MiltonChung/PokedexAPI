const poke_container = document.getElementById("poke_container");
const loader = document.getElementById("loader");
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
const noResults = document.getElementById("noResults");
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
let load_number = 80;
let end1 = pokemons_number_start_gen1 + load_number;
let end2 = pokemons_number_start_gen2 + load_number;
let end3 = pokemons_number_start_gen3 + load_number;
let end4 = pokemons_number_start_gen4 + load_number;
let end5 = pokemons_number_start_gen5 + load_number;
let current_gen = 1;
let stillInSearch = false;
let homepage = true;
let stillLoading = true;
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

// Changes the generation when user clicks it from the nav bar
function changeGen(genNumber) {
	current_gen = genNumber;
	clearStyle();
	clearPage();
	loadingAnimation();
	resetStartAndEnd();
	homepage = false;
	switch (current_gen) {
		case 1:
			homepage = true;
			applyStyle(gen1_dropdown);
			applyStyle(gen1_m);
			break;
		case 2:
			applyStyle(gen2_dropdown);
			applyStyle(gen2_m);
			break;
		case 3:
			applyStyle(gen3_dropdown);
			applyStyle(gen3_m);
			break;
		case 4:
			applyStyle(gen4_dropdown);
			applyStyle(gen4_m);
			break;
		case 5:
			applyStyle(gen5_dropdown);
			applyStyle(gen5_m);
			break;

		default:
			applyStyle(gen1_dropdown);
			applyStyle(gen1_m);
			break;
	}

	fetchPokemons(current_gen);
}

// Apply bold and purple background to the selected gen
function applyStyle(pokemonGen) {
	pokemonGen.style.fontWeight = 700;
	pokemonGen.style.background = "#cabbef";
}

// Reset the generation menu
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

// Clears poke_container to load other generations
function clearPage() {
	poke_container.innerHTML = "";
}

// Reserts the starting and end numbers for each generation
// Used to load each generation from the start
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
	load_number = 50;
	end1 = pokemons_number_start_gen1 + load_number;
	end2 = pokemons_number_start_gen2 + load_number;
	end3 = pokemons_number_start_gen3 + load_number;
	end4 = pokemons_number_start_gen4 + load_number;
	end5 = pokemons_number_start_gen5 + load_number;
}

const fetchPokemons = async (genNumber = 1) => {
	// Load all pokemon when in generation 1, other generations use the load more function
	stillLoading = true;
	switch (genNumber) {
		case 1:
			for (
				let i = pokemons_number_start_gen1;
				i <= pokemons_number_end_gen1;
				i++
			) {
				await getPokemon(i);

				if (i == pokemons_number_end_gen1) stillLoading = false;
				loadMorePokemons();
				loadMoreText.style.display = "none";
			}
			break;

		case 2:
			load_number = 50;
			for (let i = pokemons_number_start_gen2; i <= end2; i++) {
				await getPokemon(i);
				console.log("GETTING: " + i);

				if (i == end2) stillLoading = false;
				loadMorePokemons();
				if (i == pokemons_number_end_gen2) {
					loadMoreText.style.display = "none";
				}
			}

			pokemons_number_start_gen2 = pokemons_number_start_gen2 + load_number + 1;
			end2 = end2 + load_number + 1;

			if (end2 >= pokemons_number_end_gen2) end2 = pokemons_number_end_gen2;

			break;

		case 3:
			load_number = 50;
			for (let i = pokemons_number_start_gen3; i <= end3; i++) {
				await getPokemon(i);
				console.log("GETTING: " + i);
				if (i == pokemons_number_end_gen3) {
					loadMoreText.style.display = "none";
					stillLoading = false;
				}
				if (i == end3) stillLoading = false;
				loadMorePokemons();
			}

			pokemons_number_start_gen3 = pokemons_number_start_gen3 + load_number + 1;
			end3 = end3 + load_number + 1;

			if (end3 >= pokemons_number_end_gen3) end3 = pokemons_number_end_gen3;

			break;

		case 4:
			load_number = 50;
			for (let i = pokemons_number_start_gen4; i <= end4; i++) {
				await getPokemon(i);
				if (i == pokemons_number_end_gen4) {
					loadMoreText.style.display = "none";
					stillLoading = false;
				}
				if (i == end4) stillLoading = false;
				loadMorePokemons();
			}

			pokemons_number_start_gen4 = pokemons_number_start_gen4 + load_number + 1;
			end4 = end4 + load_number + 1;

			if (end4 >= pokemons_number_end_gen4) end4 = pokemons_number_end_gen4;

			break;

		case 5:
			load_number = 50;
			for (let i = pokemons_number_start_gen5; i <= end5; i++) {
				await getPokemon(i);
				if (i == pokemons_number_end_gen5) {
					loadMoreText.style.display = "none";
					stillLoading = false;
				}
				if (i == end5) stillLoading = false;
				loadMorePokemons();
			}

			pokemons_number_start_gen5 = pokemons_number_start_gen5 + load_number + 1;
			end5 = end5 + load_number + 1;

			if (end5 >= pokemons_number_end_gen5) end5 = pokemons_number_end_gen5;
			break;
		default:
			break;
	}
};

const getPokemon = async (id) => {
	console.log("in getPokemon");
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
	console.log("in createpokemoncard");
	const pokemonEl = document.createElement("li");
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
        <span class="number" id="number">#${pokemon.id
					.toString()
					.padStart(3, "0")}</span>
        <h3 class="name" id="name">${name}</h3>
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
	setTimeout(showPage, 1200);
}

function loadMorePokemons() {
	if (!stillLoading) {
		//Done Loading
		poke_container.style.display = "flex";
		loader.style.display = "none";
		loadMoreText.style.display = "flex";
	} else {
		//Still loading
		loader.style.display = "block";
		poke_container.style.display = "flex";
		loadMoreText.style.display = "none";
	}
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
		sleep(1500);
		if (!stillInSearch) {
			if (!homepage) {
				if (!stillLoading) {
					fetchPokemons(current_gen);
				}
			}
		}
	}
});

$(document).ready(function () {
	$(".mobileHamIcon").click(function () {
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

// ============================= SEARCH FUNCTIONALITY ========================================
const search = document.getElementById("searchText");
const searchMobile = document.getElementById("searchTextMobile");
let emptySearch = true;
let mouseSearch = true;
search.addEventListener("keyup", searchItem);
search.addEventListener("mousein", function () {
	mouseSearch = false;
	stillInSearch = true;
});
search.addEventListener("mouseout", out);
searchMobile.addEventListener("keyup", searchItem);

function out(e) {
	request = e.target.value;
	if (request == "") {
		emptySearch = true;
		stillInSearch = false;
	} else {
		emptySearch = false;
		stillInSearch = true;
	}

	if (emptySearch && mouseSearch) {
		loadMoreText.style.display = "flex";
	}
}

function searchItem(e) {
	let request = e.target.value.toLowerCase();
	let items = poke_container.getElementsByTagName("li");
	loadMoreText.style.display = "none";

	for (let i = 0; i < items.length; i++) {
		let item = items[i].className;
		if (item == "pokemon") {
			let pokemonName = items[i].getElementsByClassName("name")[0].innerText;
			let pokemonNumber = items[i]
				.getElementsByClassName("number")[0]
				.innerHTML.slice(1);
			let pokemonType = items[i]
				.getElementsByClassName("type")[0]
				.getElementsByTagName("span")[0]
				.innerHTML.replace(/,/g, "");
			if (
				pokemonName.toLowerCase().indexOf(request) > -1 ||
				pokemonNumber.indexOf(request) > -1 ||
				pokemonType.toLowerCase().indexOf(request) > -1
			) {
				items[i].style.display = "block";
			} else {
				items[i].style.display = "none";
			}
		}
	}

	let searchResult = [];
	// After each keyup, push 'true' into the array if there are cards still showing
	// Used to check and display no results found text if no results were found
	for (let i = 0; i < items.length; i++) {
		if (getComputedStyle(items[i]).display == "none") {
		} else if (getComputedStyle(items[i]).display == "block") {
			searchResult.push("true");
		}
	}

	noResults.classList.remove("showNoResults");
	// Show no reseults found text when there's no true in the array
	if (!searchResult.includes("true")) {
		noResults.classList.add("showNoResults");
	}
}
