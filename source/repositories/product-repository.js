const Product = require('../models/product') //importando a model do produto

class ProductRepository{
    //buscar todos
    async findAll(){
        //buscar todos os produtos ativos
        //{active:true} : é um filtro
        return await Product.find({active: true});
    }

    //buscar por id

    async findById(id){
        return await Product.findById(id);
    }

    //Criar
    async create(productData){
        //Criando uma instancia para persistir os dados no mongo
        const product =new Product(productData);
        return await product.save();
    }

    //atualizar

    async update(id, productData){
        return await Product.findByIdAndUpdate(
            id,
            productData
        )
    }

    //delete
    async delete(id){
        return await Product.findByIdAndUpdate(
            id,
            {active: false}
        )
    }

}

module.exports = new ProductRepository();