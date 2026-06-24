package sintaxis

fun main(){
    var friends=listOf<String>("maria","jose","marcos")
    var ages=listOf<Int>(23,20,30)

    //println(friends)
    //println(ages)

    var nombres=listOf<String>("jose","maria","pedro")

    println(nombres)

    var edades=mutableListOf<Int>(14,20,30)
   /* edades.add(20)
    println(edades)
    edades.set(0,50)
    println(edades)*/

    var edades2=mutableSetOf<Int>(14,20,30)
    println(edades2)
    edades.add(20)
    println(edades2)
    edades2.add(50)
    println(edades2)
}