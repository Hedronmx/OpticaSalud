// declaring the $ var as a display.js class
var $$ = new DisplayJS(window)
// asigning a value for the var name
var name = ""
var password = "osalud"
const input = document.querySelector('#login')
$('.alert').hide()
$('.success').hide()

// rendering all the inputs
$$.target()

function login(){
    console.log("Entered")
    console.log(name)
    if (name == password){
        $('.sucess').show()
        $('.success').alert()
        window.location.replace("main.html");
    } else {
        $('.error').show()
        $('.error').alert()
    }
}

input.addEventListener('submit', (e) => {
    e.preventDefault();
    login()
})

function hide (){
    $('.error').hide()
}

