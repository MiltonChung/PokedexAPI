# PokedexAPI

Realtime Pokemon website that displays 5 different generations of Pokemon with their stats. 

Link: https://miltonchung.github.io/PokedexAPI/

## Table of contents

-  [About](#about)
-  [Technologies](#technologies)
-  [Features](#features)
-  [Challenges](#challenges)
-  [Inspiration](#inspiration)

## About

This project was the first project I did incorporating fetching 3rd party api information and integrating it into my website. Each pokemon card is dynamically loaded based on the api data and the colors on each card is based off of each pokemon's types. Since the api is usually slow, I made it so that it only loads a chunk at a time and when the user scrolls down for more, it loads another chunk. My personla favorite is the random pokemon generator feature because you never know what comes next!

## Technologies

Project is created with:

-  JavaScript
-  HTML/CSS
-  API/JSON

## Features

- Search pokemons by name, id, or types
- Fully responsive (Hamburger menu + fade in search bar)
- Fetch API from: https://pokeapi.co/ and display their JSON data in real time
- Hover over cards to see the pokemon's stats(desktop only)
- Card background color depends on the pokemon's type(s)
- Changing generation/searching doesn't refresh the page
- Loading animations:
   - Persists until a chunk is loaded
   - Doesn't load the whole generation at once
   - Scroll down to load more as you go
   - Loading pokemons always start from the beginning of the generation
- Generate random pokemon(from all generations) with a click and see all its information

## Challenges

It was hard making the load more feature with the search functionality because the pokemons that haven't been loaded won't search up on the search result. I went about many ways and if I load all the pokemons at once, the website would take forever to load, so I decided to take my first approach but there are some trade-offs. The loading animation and load more feature gave me the most trouble. 


## Inspiration

This project was inspired by Youtuber Florin Poppin , and I expanded upon his simple project. I added many more functionalities such as a search bar, hover over cards effect, splitting up generations, loading screen/animation, and much more.

Time spent: ~ 22 hours(according to WakaTime)
