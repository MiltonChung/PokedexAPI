const genBox = document.getElementById("generatorBox");
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
	unknwon: "#68A090",
};

function onLoad() {
	const boxEl = document.createElement("div");
	boxEl.classList.add("content");

	const boxInner = `
    <div class="imageLoader" id="imageLoader">
        
    </div>
    <div class="randomButton">
      <button onClick="giveRandomPokemon()">
        Random Pokemon
      </button>
    </div>
  `;

	boxEl.innerHTML = boxInner;
	genBox.appendChild(boxEl);
}

onLoad();

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function displayPokemon(pokemon) {
	const imageLoader = document.getElementById("imageLoader");
	console.log(imageLoader);

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
		assignColor(imageLoader, color1, color2);
		console.log(2);
	} else {
		types = poke_types[0][0].toUpperCase() + poke_types[0].slice(1);
		typePlural = "Type";
		assignColor(imageLoader, color1);
		console.log(1);
	}

	const pokemonInfo = `
    <div class="pokemonHeight">
      <p> Height: <span>${pokemon.height / 10}m</span></p>
    </div>
    <div class="img-container">
      <img src="${pokemon.sprites.other.dream_world.front_default}" />
    </div>
    <div class="info">
      <span class="number">#${pokemon.id.toString().padStart(3, "0")}</span>
      <h3 class="name">${name}</h3>
      <small class="type"> ${typePlural}: <span>${types}</span></small>
    </div>
  
    <div class="displayStats">
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

	imageLoader.innerHTML = pokemonInfo;
}

const getRandomPokemon = async (id) => {
	try {
		const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
		const res = await fetch(url);
		const pokemon = await res.json();
		displayPokemon(pokemon);
	} catch (err) {
		console.log(err);
	}
};

function giveRandomPokemon() {
	getRandomPokemon(getRandomInt(649));
}

function assignColor(pokemonEl, color1, color2 = null) {
	if (color2 == null) {
		pokemonEl.style.background = color1;
	} else {
		pokemonEl.style.background =
			"linear-gradient(" + "150deg" + ", " + color1 + ", " + color2 + ")";
	}
}
