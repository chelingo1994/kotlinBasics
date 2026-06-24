package sintaxis

fun main(){
    var mapOfPokemons=mutableMapOf("pikachu" to "electric","charmander" to "fire")

    println(mapOfPokemons["pikachu"])

    mapOfPokemons.put("squartle","water")
    mapOfPokemons["mew"]="psychic"

    println(mapOfPokemons)
}