const prompt = require('prompt-sync')();
const personaje={
    type:null,
    stadistica:null,
    base:null,
    abilities:null
}


async function probarApi(nombre){
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);

    const pokemon = await respuesta.json();
    console.log("--- TIPOS ---");
    if(!respuesta.ok){
        console.error("error en conexion", respuesta.status);
        return null;
   
    }
    else return pokemon;
    
    
}

async function buscarPokemon(nombre){
    probarApi(nombre);
}
async function mostrarFicha(pokemon) {
    if(pokemon==null){
        console.log("no hay nada que mostrar");
        return null;
    }
    console.log("Nombre:", pokemon.name.toUpperCase());

    console.log("Número:", pokemon.id);
    

    
}
buscarPokemon("pikachu");
