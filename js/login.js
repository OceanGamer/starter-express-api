const searchinput = document.getElementById("searchinput");
const searchbutton = document.getElementById("login");
const error = document.getElementById("error");
searchbutton.addEventListener("click", Login)

function Login() {
    password = searchinput.value
    if (password != "") {
        fetch("http://192.168.1.109:3306/login/"+password)
        .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function(respond){
                    if (respond == true) {
                        document.cookie = "password="+password;
                        location.href = 'justadmin.html';
                    }else{
                        error.innerHTML = '<p class="titles2 text-center">Contraseña incorrecta!</p>'
                    }
                })
            }
        })
    }
}