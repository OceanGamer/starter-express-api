let cookie = document.cookie;
let passworditem = cookie.split(";")
let password = passworditem[0].split("=")
let actualid;
fetch("http://192.168.1.109:3306/login/"+password[1])
        .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function(respond){
                    if (respond == true) {
                    }else{
                        location.href = '.';
                    }
                })
            }
        })

    const welcomepage = document.getElementById("welcome")
    const uploadpage = document.getElementById("upload")
    const modifypage = document.getElementById("modify")
    uploadpage.style.display = "none"
    modifypage.style.display = "none"
    
    const uploadbutton = document.getElementById("uploadbutton")
    const modifybutton = document.getElementById("modifybutton")
    const exitbutton = document.getElementById("exitbutton")

    uploadbutton.addEventListener("click", UploadPage)
    modifybutton.addEventListener("click", ModifyPage)
    exitbutton.addEventListener("click", Exit)



function UploadPage() {
    const uploadfinish = document.getElementById("uploadfinish")
    welcomepage.style.display = "none"
    uploadpage.style.display = "block"
    modifypage.style.display = "none"
    uploadfinish.addEventListener("click", UploadPodcast)

}

function ModifyPage() {
    const modifybuttonfinish = document.getElementById("modifyfinish")
    const podcastzone = document.getElementById("podcastzone")
    document.getElementById("modifysection").style.display = "none"
    podcastzone.innerHTML = ""
    //const uploadfinish = document.getElementById("uploadfinish")
    welcomepage.style.display = "none"
    uploadpage.style.display = "none"
    modifypage.style.display = "block"
    //uploadfinish.addEventListener("click", UploadPodcast)
    fetch("http://192.168.1.109:3306/getallpodcasts")
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function(respond){
                    respond.forEach(block => {
                        
                        podcastzone.innerHTML += '<div class="disflex podcastcard2" style="height: 80px; margin-bottom: 10px;"><img src="../images/podlogos/'+block.imagen+'" style="height: 100%;" alt=""><button class="btn btn-primary" style="width: 40%;" onclick="Modify('+block.id+')">Modificar</button><button class="btn btn-warning" style="width: 40%;" onclick="Delete('+block.id+')">Borrar</button></div>';
                    });
                })
        }
    })

    modifybuttonfinish.addEventListener("click", ModifyPodcast)

}


function ModifyPodcast() {
    const nameInput = document.getElementById("nombre2").value || ""
    const descriptionInput = document.getElementById("descripcion2").value || ""
    const duracionInput = document.getElementById("duracion2").value || ""
    const embedInput = document.getElementById("embed2").value || ""
    const spotifyInput = document.getElementById("spotify2").value || ""
    const youtubeInput = document.getElementById("youtube2").value || ""
    const imagenInput = document.getElementById("imagen2").value || ""

    if(nameInput != "" && embedInput != ""){
        fetch("http://192.168.1.109:3306/modifypodcast",{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: actualid,
            name: nameInput,
            descripcion: descriptionInput,
            duracion: duracionInput,
            embed: embedInput,
            spotify: spotifyInput,
            youtube: youtubeInput,
            imagen: imagenInput
        })
        })
    }
    setTimeout(Reload, 1000)
}
function UploadPodcast(){
    const nameInput = document.getElementById("nombre").value || ""
    const descriptionInput = document.getElementById("descripcion").value || ""
    const duracionInput = document.getElementById("duracion").value || ""
    const embedInput = document.getElementById("embed").value || ""
    const spotifyInput = document.getElementById("spotify").value || ""
    const youtubeInput = document.getElementById("youtube").value || ""

    if(nameInput != "" && embedInput != ""){
        fetch("http://192.168.1.109:3306/uploadpodcast",{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: nameInput,
            descripcion: descriptionInput,
            duracion: duracionInput,
            embed: embedInput,
            spotify: spotifyInput,
            youtube: youtubeInput
        })
        })
    }
    setTimeout(Reload, 1000)
}

function Modify(id) {
    const nameInput = document.getElementById("nombre2") || ""
    const descriptionInput = document.getElementById("descripcion2") || ""
    const duracionInput = document.getElementById("duracion2") || ""
    //const imagenInput = document.getElementById("imagen2").value || ""
    const embedInput = document.getElementById("embed2") || ""
    const spotifyInput = document.getElementById("spotify2") || ""
    const youtubeInput = document.getElementById("youtube2") || ""
    const imagenInput = document.getElementById("imagen2") || ""
    const comentariosplace = document.getElementById("comentariosplace") || ""
    document.getElementById("modifysection").style.display = "block"
    actualid = id
    fetch("http://192.168.1.109:3306/getpodcast/"+id)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function(respond){
                        nameInput.value = respond[0].nombre
                        descriptionInput.value = respond[0].descripcion
                        duracionInput.value = respond[0].duracion
                        embedInput.value = respond[0].embed
                        spotifyInput.value = respond[0].linkspotify
                        youtubeInput.value = respond[0].linkyoutube
                        imagenInput.value = respond[0].imagen
                    })
            }
        })
    comentariosplace.innerHTML = ""
    fetch("http://192.168.1.109:3306/getcomentarios/"+id)
    .then(function (res) {
        if (res.ok) {
            res.json()
            .then(function(respond){
                respond.forEach(block => {
                    let comillas = "'"
                    comentariosplace.innerHTML += '<div><div class="disflex"><img src="../images/userdefault.png" alt="" class="userhead"><p class="textnormal">'+block.nombre+'</p></div><div class="comentariosplace"><p class="textnormal">'+block.comentario+'</p><button class="btn btn-warning" style="width: 40%;" onclick="DeleteComentario('+block.id+','+comillas+block.nombre+comillas+','+comillas+block.comentario+comillas+')">Borrar Comentario</button></div></div>'
                });
            })
            }
        })
}

function Delete(id) {
    fetch("http://192.168.1.109:3306/deletepodcast/"+id,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id
        })
        })
    setTimeout(Reload, 1000)
}

function DeleteComentario(id,name,comentario) {
    const comentariosplace = document.getElementById("comentariosplace") || ""
    fetch("http://192.168.1.109:3306/deletecomentario/",{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id,
            name: name,
            comentario: comentario
        })
        })
        comentariosplace.innerHTML = ""
    fetch("http://192.168.1.109:3306/getcomentarios/"+id)
    .then(function (res) {
        if (res.ok) {
            res.json()
            .then(function(respond){
                respond.forEach(block => {
                    let comillas = "'"
                    comentariosplace.innerHTML += '<div><div class="disflex"><img src="../images/userdefault.png" alt="" class="userhead"><p class="textnormal">'+block.nombre+'</p></div><div class="comentariosplace"><p class="textnormal">'+block.comentario+'</p><button class="btn btn-warning" style="width: 40%;" onclick="DeleteComentario('+block.id+','+comillas+block.nombre+comillas+','+comillas+block.comentario+comillas+')">Borrar Comentario</button></div></div>'
                });
            })
            }
        })
}
function Reload() {
    location.href = 'justadmin.html'
}

function Exit() {
    var allCookies = document.cookie.split(';');
                
        // The "expire" attribute of every cookie is 
        // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
        for (var i = 0; i < allCookies.length; i++){
            document.cookie = allCookies[i] + "=;expires="
            + new Date(0).toUTCString();

        }
        location.href = '.';
  
}