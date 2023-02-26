//startThePage
//GetURL
var URLactual = window.location;

//GetPodcastsPages
const librarysection = document.getElementById("podcastlibrary")
const podcastsection = document.getElementById("podcastviewer")
const comen = document.getElementById("comen")
const publiccomen = document.getElementById("publicarcomentario")
librarysection.style.display = "none";
podcastsection.style.display = "none";
comen.style.display = "none";
var id;
var liked = false;
var actuallikes = 0;
publiccomen.addEventListener("click", PublicarComentario)

//VerifyActualPage
if(URLactual == "http://192.168.1.109:3306/podcast.html"){
    librarysection.style.display = "block";
    fetch("getallpodcasts")
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function(respond){
                    respond.forEach(block => {
                        podcastzone.innerHTML += '<a href="podcast.html?watch='+block.id+'" class="titlesPOD separation"><div class="podcastcard"><img src="images/podlogos/'+block.imagen+'" alt="" class="podlogo"><p class="titlesPOD text-center">'+block.nombre+'</p></div></a>';
                    });
                })
        }
    })
    const searchinput = document.getElementById("searchinput");
    const searchbutton = document.getElementById("searchbutton");
    const podcastzone = document.getElementById("podcastzone");
    searchbutton.addEventListener("click", Search)
}else{
    const searchinput2 = document.getElementById("searchinput2");
    const searchbutton2 = document.getElementById("searchbutton2");
    searchbutton2.addEventListener("click", Search2)
    const searchinput = document.getElementById("searchinput");
    const searchbutton = document.getElementById("searchbutton");
    const podcastzone = document.getElementById("podcastzone");
    searchbutton.addEventListener("click", Search)
    urltouse = window.location.toString()
    id = urltouse.split("=")
    fetch("getpodcast/"+id[1])
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function(respond){
                    if(respond == ""){

                    }else{
                        podcastsection.style.display = "block";
                        framezone = document.getElementById("frame")
                        podname = document.getElementById("podname")
                        podbuttons = document.getElementById("podbuttons")
                        podduracion = document.getElementById("podduracion")
                        poddescripcion = document.getElementById("poddescripcion")
                        podcomentarios = document.getElementById("podcomentarios")
                        podlikes = document.getElementById("podlikes")
                        morepod = document.getElementById("morepodcastzone")

                        framezone.innerHTML = '<iframe src="'+respond[0].embed+'" height="100%" width="100%" frameborder="0" scrolling="no" class="bordered"></iframe>'
                        podname.innerHTML = respond[0].nombre
                        podbuttons.innerHTML += '<a href="'+respond[0].linkyoutube+'"><img src="images/social/youtube.webp" class="socialicon2" alt="youtubelink"></a>';
                        podbuttons.innerHTML += '<a href="'+respond[0].linkspotify+'"><img src="images/social/spotify.webp" class="socialicon2" alt="youtubelink"></a>';
                        podbuttons.innerHTML += '<div id="likebuttonzone"></div>'
                        podduracion.innerHTML = 'Duracion: '+respond[0].duracion
                        poddescripcion.innerHTML = 'Descripcion:<br>'+respond[0].descripcion
                        
                        fetch("getcomentarios/"+id[1])
                        .then(function (res) {
                        if (res.ok) {
                            res.json()
                            .then(function(respond){
                                respond.forEach(block => {
                                    podcomentarios.innerHTML += '<div><div class="disflex"><img src="images/userdefault.png" alt="" class="userhead"><p class="textnormal">'+block.nombre+'</p></div><div class="comentariosplace"><p class="textnormal">'+block.comentario+'</p></div></div>'
                                });
                            })
                            }
                        })
                        
                        fetch("getlikes/"+id[1])
                        .then(function (res) {
                        if (res.ok) {
                            res.json()
                            .then(function(respond){
                                podlikes.innerHTML = respond[0].like_count+" Likes"
                                actuallikes = respond[0].like_count
                            })
                            }
                        })

                        setTimeout(GetLikes, 2000)
                        

                        fetch("get8podcasts")
                        .then(function (res) {
                        if (res.ok) {
                            res.json()
                            .then(function(respond){
                                respond.forEach(block => {
                                    morepod.innerHTML += '<a href="podcast.html?watch='+block.id+'" class="titlesPOD separation"><div class="podcastcard2 disflex"><img src="images/podlogos/'+block.imagen+'" alt="" class="podlogo2"><div><p class="titlesPOD text-center">ㅤ '+block.nombre+'</p><p class="titlesPOD">ㅤ '+block.duracion+'</p></div></div></a>'
                                });
                            })
                            }
                        })

                    }
                })
        }
    })
}

function AddRemoveLike() {
    podlikes = document.getElementById("podlikes")
    podlikeszone = document.getElementById("likebuttonzone")
    fetch("likepublication/"+ id[1] + "/"+ ip )
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function(respond){
                    })
                }
        })
    if(liked == true){
        podlikeszone.innerHTML = '<button onclick="AddRemoveLike()" class="vacio" id="likebutton"><img src="images/heart.png" class="socialicon2" alt="spotifylink"></button>'
        liked = false 
        actuallikes--
        podlikes.innerHTML = actuallikes+" Likes"
    }else{
        podlikeszone.innerHTML = '<button onclick="AddRemoveLike()" class="vacio" id="likebutton"><img src="images/heartred.png" class="socialicon2" alt="spotifylink"></button>'
        liked = true
        actuallikes++
        podlikes.innerHTML = actuallikes+" Likes"
    }
    
}


function GetLikes() {
    ip = document.getElementById("ipzone").innerHTML
    fetch("liked/"+ id[1] + "/"+ ip )
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function(respond){
                        podlikeszone = document.getElementById("likebuttonzone")
                                
                        if(respond == ""){
                            podlikeszone.innerHTML = '<button onclick="AddRemoveLike()" class="vacio" id="likebutton"><img src="images/heart.png" class="socialicon2" alt="spotifylink"></button>'
                            liked = false
                        }else{
                            podlikeszone.innerHTML = '<button onclick="AddRemoveLike()" class="vacio" id="likebutton"><img src="images/heartred.png" class="socialicon2" alt="spotifylink"></button>'
                            liked = true
                        }
                    })
                }
        })
    comen.style.display = "block";
}


function PublicarComentario() {
    ccname = document.getElementById("ccname").value
    cccomentario = document.getElementById("cccomentario").value
    podcomentarios = document.getElementById("podcomentarios")
    if (cccomentario != "" && ccname != "") {

        fetch("pubcomentario/"+id[1]+"/"+ccname+"/"+cccomentario)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function(respond){
                    })
                }
        })

        podcomentarios.innerHTML += '<div><div class="disflex"><img src="images/userdefault.png" alt="" class="userhead"><p class="textnormal">'+ccname+'</p></div><div class="comentariosplace"><p class="textnormal">'+cccomentario+'</p></div></div>'
        
    }
}

function Search() {
    if(searchinput.value != ""){
        fetch("searchpodcasts/"+searchinput.value)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function(respond){
                        podcastzone.innerHTML = "";
                        if(respond == ""){
                            podcastzone.innerHTML = '<p class="textnormal text-center">No se ha encontrado nada :(</p>'
                        }else{
                            respond.forEach(block => {
                                podcastzone.innerHTML += '<a href="podcast.html?watch='+block.id+'" class="titlesPOD separation"><div class="podcastcard"><img src="images/podlogos/'+block.imagen+'" alt="" class="podlogo"><p class="titlesPOD text-center">'+block.nombre+'</p></div></a>';
                            });
                        }
                    })
            }
        })
    }

}

function Search2() {
    if(searchinput2.value != ""){
        fetch("searchpodcasts/"+searchinput2.value)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function(respond){
                        podcastzone.innerHTML = "";
                        if(respond == ""){
                            podcastzone.innerHTML = '<p class="textnormal text-center">No se ha encontrado nada :(</p>'
                        }else{
                            respond.forEach(block => {
                                podcastzone.innerHTML += '<a href="podcast.html?watch='+block.id+'" class="titlesPOD separation"><div class="podcastcard"><img src="images/podlogos/'+block.imagen+'" alt="" class="podlogo"><p class="titlesPOD text-center">'+block.nombre+'</p></div></a>';
                            });
                        }
                    })
            }
        })
    }
    librarysection.style.display = "block";
    podcastsection.style.display = "none";


}