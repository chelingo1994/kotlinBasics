package sintaxis

fun main() {
    Mylambda("Jose",{
        println(it)

    })
}

fun Mylambda(name:String,saludar:(fullname:String)-> Unit){
    println("Estoy entrando a la funcion lambda")
    saludar("$name Justiniano")
    println("Estoy saliendo de la funcion")
}