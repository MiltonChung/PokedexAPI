const poke_container = document.getElementById("poke_container");
const pokemons_number = 150;
const colors = {
	fire: "#FDDFDF",
	grass: "#DEFDE0",
	electric: "#FCF7DE",
	water: "#DEF3FD",
	ground: "#f4e7da",
	rock: "#d5d5d4",
	fairy: "#fceaff",
	poison: "#98d7a5",
	bug: "#f8d5a3",
	dragon: "#97b3e6",
	psychic: "#eaeda1",
	flying: "#F5F5F5",
	fighting: "#E6E0D4",
	normal: "#F5F5F5",
	ghost: "rgb(162, 71, 180);",
	steel: "rgb(163, 163, 163)",
	ice: "rgb(81, 218, 223)",
	shadow: "rgb(105, 66, 99)",
	unknwon: "rgb(65, 46, 55)",
};

//ghost, steel, ice, dark, shadow, unknown

// Takes out the keys from the colors object
const main_types = Object.keys(colors);

const getPokemon = async (id) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement("div");
	pokemonEl.classList.add("pokemon");

	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const poke_types = pokemon.types.map((el) => el.type.name);
	console.log(poke_types);
	const type = main_types.find((type) => poke_types.indexOf(type) > -1);
	const color = colors[type];

	pokemonEl.style.backgroundColor = color;

	const pokeInnerHtml = `
  <div class="img-container">
    <img src="${pokemon.sprites.other.dream_world.front_default}" />
  </div>
   <div class="info">
      <span class="number">#${pokemon.id.toString().padStart(3, "0")}</span>
      <h3 class="name">${name}</h3>
      <small class="type"> Type: <span>${type}</span></small>
    </div>  
  `;

	pokemonEl.innerHTML = pokeInnerHtml;
	poke_container.appendChild(pokemonEl);
}

const fetchPokemons = async () => {
	for (let i = 1; i <= pokemons_number; i++) {
		await getPokemon(i);
	}
};

fetchPokemons();
