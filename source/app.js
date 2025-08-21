const express = require('express')
const app = express()

//configurar a conexão
mongoose.connect("mongodb+srv://cintiacristinaangelo:<db_password>@cluster0.tekicd6.mongodb.net/")
.then(() => {
    console.log('Conectado')
})
.catch((error) => {
    console.log(`Erro ao tentar conectar no mongo ${error}`)
})


app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Habiltar o CORS
app.use(function (req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

//criar rotas - OBS: vamos criar a rota
const index = require("./routes/index")
const { default: mongoose } = require('mongoose')

app.use("/", index)

module.exports = app;