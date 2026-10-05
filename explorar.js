const prompt = require('prompt-sync')();
async function crearPokemon(namePokemon){
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`);
    if(!respuesta.ok){
        console.log("Hubo un error: ", respuesta.status);
        return null;
    }
    const pokemon = await respuesta.json();
    let habilidad2=null;
    if(namePokemon.trim().length>0){
        for(const valor of pokemon.abilities){
        if(valor.ability.is_hidden){
            habilidad2=`${valor.ability.name} "(oculta)"`;
        }else{
            habilidad2=`${valor.ability.name}`;
        }
    }
        return{
            id:pokemon.id,
            hp:pokemon.stats[0].base_stat,
            nombre:pokemon.name.toUpperCase(),
            ataque:pokemon.stats[1].base_stat,
            defensa:pokemon.stats[2].base_stat,
            ataque_especial:pokemon.stats[3].base_stat,
            defensa_especial:pokemon.stats[4].base_stat,
            velocidad:pokemon.stats[5].base_stat,
            peso:`${pokemon.weight/10}kg`,
            altura:`${pokemon.height*10}cm`,
            habilidad:habilidad2
        }
    }return pokemon
    
}
function menu(){
    console.log("bienvenido al mundo pokemon, escoje un pokemon y unete a la lucha! : ");
    const opciones=prompt(" 1 = Ver pokemons disponibles, 2 = Iniciar juego, 3 = Salir    -");
    if(opciones=="1"){
        listaPokemon();
    }else if(opciones=="2"){
        iniciarJuego();
        }else if(opciones=="3"){
        salirJuego();
    }else console.log("valor ingresado no valido, intente nuevamente recargando la pagina");
}
function iniciarJuego(){
    let cantidadJugadores=prompt("cuantos jugadores van a jugar : ");
    
    if(Number(cantidadJugadores)){
        validarCreacionJugadores(cantidadJugadores);
    }else{console.log("has ingresado un valor no numerico ");
        salirJuego();};   
}
async function validarCreacionJugadores(cantidad) {
    let mensajeLista=false;
    const jugadores=[];
    const validacion=[];
    for(let i =0;i<cantidad;i++){
        let nombre=prompt("ingresa el nombre del pokemon ");
        if(nombre.trim().length>0){
            validacion.push(nombre);
        }else console.log("no ingresaste un valor disponible")
    }
    const listaPokemon2= await crearPokemon("");
    const lista=[]
    for (let index = 0; index < listaPokemon2.results.length; index++) {
        lista.push(listaPokemon2.results[index].name);   
    }
    for (let index = 0; index < validacion.length; index++) {
        if(lista.includes(validacion[index])){
            const pokemon=await crearPokemon(validacion[index]);
               jugadores.push(pokemon);
        }else {console.log("el nombre ingresado no existe"+validacion[index]); mensajeLista=true};
    }if(mensajeLista){
        listaPokemon()
    }
    verFichaOBatalla(jugadores)
}
function verFichaOBatalla(jugadores){
    const opciones=prompt("1 = ver ficha del pokemon, 2 = ir a la batalla!  -");
    if(opciones=="1"){
        fichaPokemon(jugadores);
    }else if(opciones=="2"){
        batalla(jugadores);
    }
}
function batalla(jugadores){
    if(jugadores.length>1){
        const valor=prompt("Que habilidad quieren comparar para la batalla: ");
        let nombreGanador=jugadores[0].nombre;
        let puntajeGanador=jugadores[0][valor];
        for(let i =0;i<jugadores.length; i++){
            if(jugadores[i][valor]!=null){
                if(jugadores[i][valor]>puntajeGanador){
                    puntajeGanador=jugadores[i][valor];
                    nombreGanador=jugadores[i].nombre;
                    console.log(`el ganador es : ${jugadores[i].nombre}`);
                    salirJuego();
                }else if(puntajeGanador>jugadores[i][valor]){
                    console.log(`el ganador es : ${nombreGanador} ya que el ${valor} es de ${puntajeGanador}`);
                    salirJuego()
                }else if(jugadores[i][valor]==puntajeGanador && i+1==jugadores.length){
                    console.log(`es un empate entre los jugadores ${nombreGanador} y ${jugadores[i].nombre} su ${valor} es de : ${puntajeGanador}`)
                    salirJuego();
                }
            }else if(i+1>=jugadores.length){ 
                console.log("el valor ingresado es invalido");
                return final=true;
            }
        }
    }else console.log("es necesario que para competir sean minimo dos pokemones")
}
function fichaPokemon(jugadores){
    
    for (const element of jugadores) {
        console.log(element);
    }verFichaOBatalla(jugadores);
}
async function listaPokemon() {
    console.log("bienvenido al mundo pokemon, estos son algunos de nuestros pokemon : ");
    const listaPokemon= await crearPokemon("");
    const lista=[]
    for (let index = 0; index < listaPokemon.results.length; index++) {
        console.log(`${index+1}).${listaPokemon.results[index].name}`);
        lista.push(listaPokemon.results[index].name);   
    }
    const pregunta =prompt("1 = Iniciar juego, 2 = Salir del juego  - ");
    if(pregunta == "1"){
        iniciarJuego()
    }else if(pregunta == "2"){
        salirJuego()
    }else {console.log("el valor ingreado no es valido"); salirJuego()}
    return lista;
    
}
function salirJuego(){
    return console.log("vuelve pronto!! ");
}
function main(){
    menu();
}
main();

