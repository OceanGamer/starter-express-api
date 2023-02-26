//requires
const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.static("public"))
app.use(cors())
app.use(express.json())

const {insert} = require("./operations.js");

var mysql = require('mysql');
var connection= mysql.createConnection({
    host : "sql.freedb.tech",
    database : "freedb_justcoffee",
    user : "freedb_justcoffee",
    password : "mBE@63*5xy!Uj75",
});
connection.connect((err) => {
    if(err) throw err;
    console.log("Conectado")
})


//funciones


app.get("/login/:password", (req, res) => {
    let password = req.params.password || ""
    let returned = "false"
    if (password == "17200511") {
        returned = "true"
    }
    res.send(returned)
})

app.get("/get3podcasts", (req, res) => {
    insert(connection, "SELECT * FROM podcasts ORDER BY id DESC LIMIT 3", (result) => {
        res.json(result)
    })
})

app.get("/get8podcasts", (req, res) => {
    insert(connection, "SELECT * FROM podcasts ORDER BY id DESC LIMIT 8", (result) => {
        res.json(result)
    })
})

app.get("/getallpodcasts", (req, res) => {
    insert(connection, "SELECT * FROM podcasts ORDER BY id DESC", (result) => {
        res.json(result)
    })
})

app.get("/getpodcast/:id", (req, res) => {
    let id = req.params.id || ""
    let idfull = '"'+id+'"';
    insert(connection, "SELECT * FROM podcasts WHERE id="+idfull, (result) => {
        res.json(result)
    })
})

app.get("/searchpodcasts/:query", (req, res) => {
    let query = req.params.query || ""
    let queryfull = '"'+query+'"';
    insert(connection, "SELECT * FROM podcasts WHERE nombre="+queryfull, (result) => {
        res.json(result)
    })
})

app.get("/getcomentarios/:id", (req, res) => {
    let id = req.params.id || ""
    let idfull = '"'+id+'"';
    insert(connection, "SELECT * FROM comentarios WHERE id="+idfull, (result) => {
        res.json(result)
    })
})

app.get("/getlikes/:id", (req, res) => {
    let id = req.params.id || ""
    let idfull = '"'+id+'"';
    insert(connection, "SELECT * FROM likes WHERE id="+idfull, (result) => {
        res.json(result)
    })
})

app.get("/liked/:id/:ip", (req, res) => {
    let id = req.params.id || ""
    let ip = req.params.ip || ""
    let idfull = '"'+id+'"';
    let ipfull = '"'+ip+'"';
    insert(connection, "SELECT * FROM ips WHERE id="+idfull+" AND ip="+ipfull, (result) => {
        res.json(result)
    })
})

app.get("/likepublication/:id/:ip", (req, res) => {
    let id = req.params.id || ""
    let ip = req.params.ip || ""
    let idfull = '"'+id+'"';
    let ipfull = '"'+ip+'"';
    let completed = "no";
    insert(connection, "SELECT * FROM ips WHERE id="+idfull+" AND ip="+ipfull, (result) => {
        if(result == ""){
            insert(connection, "INSERT INTO ips (id,ip) VALUES ("+idfull+","+ipfull+")", (result) => {
            
            })
            insert(connection, "SELECT * FROM likes WHERE id="+idfull, (result) => {
                let likes = result[0].like_count
                likes++
                let likesfull = '"'+likes+'"';
                insert(connection, "UPDATE likes SET like_count="+likesfull+"  WHERE id="+idfull, (result) => {
                    completed = "yes"
                })
            })
        }else{
            insert(connection, "DELETE FROM ips WHERE id="+idfull+" AND ip="+ipfull, (result) => {
            
            })
            insert(connection, "SELECT * FROM likes WHERE id="+idfull, (result) => {
                let likes = result[0].like_count
                likes--
                let likesfull = '"'+likes+'"';
                insert(connection, "UPDATE likes SET like_count="+likesfull+"  WHERE id="+idfull, (result) => {
                    completed = "yes"
                })
            })
        }
    })

    res.send(completed)
})



app.get("/pubcomentario/:id/:ccname/:cccomentario", (req, res) => {
    let id = req.params.id || ""
    const nombre = req.params.ccname || ""
    const comentario = req.params.cccomentario || ""

    if (id != "" && nombre != "" && comentario != "") {
        let idfull = '"'+id+'"';
        let namefull = '"'+nombre+'"';
        let comefull = '"'+comentario+'"';
        insert(connection, "INSERT INTO comentarios (id,nombre,comentario) VALUES ("+idfull+","+namefull+","+comefull+")", (result) => {
        })
    }
    res.send({
        nombre: nombre
    })
})

app.post("/uploadpodcast", (req, res) => {
    const name = req.body.name || ""
    const descripcion = req.body.descripcion || ""
    const duracion = req.body.duracion || ""
    const embed = req.body.embed || ""
    const spotify = req.body.spotify || ""
    const youtube = req.body.youtube || ""
    const imagen = "podnone.png"
    const likes = "0"

    let namefull = '"'+name+'"';
    let descripcionfull = '"'+descripcion+'"';
    let duracionfull = '"'+duracion+'"';
    let embedfull = '"'+embed+'"';
    let spotifyfull = '"'+spotify+'"';
    let youtubefull = '"'+youtube+'"';
    let imagenfull = '"'+imagen+'"';
    let likesfull = '"'+likes+'"';
    insert(connection, "INSERT INTO podcasts (nombre,duracion,descripcion,imagen,embed,linkspotify,linkyoutube) VALUES ("+namefull+","+duracionfull+","+descripcionfull+","+imagenfull+","+embedfull+","+spotifyfull+","+youtubefull+")", (result) => {
    })
    insert(connection, "SELECT * FROM podcasts ORDER BY id DESC LIMIT 1", (result) => {
        let id = result[0].id
        let idfull = '"'+id+'"';
        insert(connection, "INSERT INTO likes (id,like_count) VALUES ("+idfull+","+likesfull+")", (result) => {
        })
    })
    
})

app.post("/deletepodcast/:id", (req, res) => {
    const id = req.params.id || ""
    let idfull = '"'+id+'"';
    insert(connection, "DELETE FROM podcasts WHERE id="+idfull, (result) => {
    })
    
})

app.post("/deletecomentario", (req, res) => {
    const id = req.body.id || ""
    const nombre = req.body.name || ""
    const comentario = req.body.comentario || ""
    let idfull = '"'+id+'"';
    let nombrefull = '"'+nombre+'"';
    let comentariofull = '"'+comentario+'"';
    insert(connection, "DELETE FROM comentarios WHERE id="+idfull+" AND nombre="+nombrefull+" AND comentario="+comentariofull, (result) => {
    })
    
})

app.post("/modifypodcast", (req, res) => {
    const id = req.body.id || ""
    const name = req.body.name || ""
    const descripcion = req.body.descripcion || ""
    const duracion = req.body.duracion || ""
    const embed = req.body.embed || ""
    const spotify = req.body.spotify || ""
    const youtube = req.body.youtube || ""
    const imagen = req.body.imagen || ""

    let idfull = '"'+id+'"';
    let namefull = '"'+name+'"';
    let descripcionfull = '"'+descripcion+'"';
    let duracionfull = '"'+duracion+'"';
    let embedfull = '"'+embed+'"';
    let spotifyfull = '"'+spotify+'"';
    let youtubefull = '"'+youtube+'"';
    let imagenfull = '"'+imagen+'"';
    insert(connection, "UPDATE podcasts SET nombre="+namefull+",duracion="+duracionfull+",descripcion="+descripcionfull+",embed="+embedfull+",linkspotify="+spotifyfull+",linkyoutube="+youtubefull+",imagen="+imagenfull+" WHERE id="+idfull, (result) => {
    })
    
})

app.listen(3306, () => {
    console.log("Server Started")
})