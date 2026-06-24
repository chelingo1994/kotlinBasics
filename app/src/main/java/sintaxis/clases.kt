package sintaxis

fun main(){
    val jose: Usuario= Usuario(
        nombre="pedro",
        edad = 17,
        email = "hola@gmail",
        dni = "13123"
    )

    println(jose)
    println(jose.edad)
    println(jose.email)
    println(jose.dni)

}

