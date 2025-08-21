const express = require('express')
const router = new express.Router()

let users= [
    {id: 1, nome: "Cintia Angelo", idade: 20},
    {id: 2, nome: "Paulo Angelo", idade: 50}
]

//endpoint
router.get("/", (req,res, next) => {

    try{
        res.status(200).send({
            success: true,
            message: "Usuários encontrados",
            data: users,
            total:users.length
    })
    }
    catch(error){
        //status code 500 - indica erro interno
        res.status(500).json(
            {
                success: false,
                message: "Erro interno",
                error: error.message
            }
        )
    }
});

//post
router.post('/', (req, res, next) => {
    try {
        const{nome ,idade} = req.body

        if(!nome || !idade){
            return res.status(400).json({
                success:false,
                message: "Favor, enviar os campos nome e idade!"
            })
        }

        const newId = users.length + 1;
        
        const newUser ={
            id: newId,
            nome,
            idade
        }

        users.push(newUser)

        //status code 201: created
        res.status(201).json({
            success: true,
            message: "Criado com sucesso",
            data: newId,
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message: "Ocorreu um erro na criação do usuário"
        })
    }
})

router.put('/:id', (req,res,next) => {
    const id = parseInt(req.params.id);
    const{nome ,idade} = req.body;

        if(!nome || !idade){
            return res.status(400).json({
                success:false,
                message: "Favor, enviar os campos nome e idade!"
            });
        }

        const userFind = users.findIndex(u => u.id == id)

        if(userFind === -1){
            return res.status(404).json({
                success: false,
                message: "usuário não encontrado!"
            })
        }

        users[userFind] = {
            id,
            nome,
            idade
        }

        res.status(200).json({
            success:true,
            message: "Usuario cadastrados"
        })

});

//criar o delete
router.delete("/:id", (req,res,next) => {
    try{
        const id = parseInt(req.params.id)
        const userIndex = users.findIndex(u => u.id == id)
        console.log(`Index encontrado:  ${userIndex}`)
        if(userIndex === -1){
            return res.status(404).json(
                {
                    success: false,
                    message: "Identificador não encontrado"
                }
            )
        }
        //remover da lista
        const deleteUser = users[userIndex]
        console.log(`Remover usuario ${deleteUser}`)
        users.splice(userIndex, 1) //removendo

        res.status(204).json({
            success:true,
            message: "Usuario deletado"
        })

    } catch(error){
        console.info(erro)
        res.status(500).json(
            {
            success: false,
            message: "Erro interno ao deletar usuário"
         })
    }
})

module.exports = router;