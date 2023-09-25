const fs = require("node:fs")
const express = require("express")
const app = express()
const port = 8080

app.listen(port, () => {
    console.log("la app se esta escuchando");
})

class ProductManager {
    constructor() {
        this.products = []
        this.nextId = 0
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error("Hay errores en algunos campos, intenta de nuevo...")
        } else {
            const id = this.nextId++
            const product = {
                id, title, description, price, thumbnail, code, stock
            }
            this.products.push(product)
            fs.writeFileSync("./file01.txt", 'Nombre: ' + title + ". Descripcion: " + description + ". Precio: " + price + ". Código: " + code + ". Stock: " + stock)
            return product
        }
    }
    getProducts() {
        return this.products
    }
    getProductById(id) {
        const product = this.products.find(product => product.id === parseInt(id))
        if (product) {
            return product
        } else {
            throw new Error("Ocurrio un error al buscar el producto.")
        }
    }
    updateProduct(id, field, value) {
        const product = this.products.find(product => product.id === id)
        if (product) {
            if (product[field] == id) {
                throw new Error("Error, no podes modificar el id del producto")
            } else {
                product[field] = value
            }
        }
        return product
    }
    deleteProduct(id) {
        const product = this.products.find(product => product.id === id)
        const index = this.products.indexOf(product)
        if (!product) {
            throw new Error("No se puede encontrar el producto")
        } else {
            this.products.splice(index, 1)
        }
        return product
    }
}


//instancia de creacion
const pManager = new ProductManager()

const product1 = pManager.addProduct("Product 1", "Este es el producto 1", 200, "Sin imagen", "abc123", 25)
const product2 = pManager.addProduct("Product 2", "Este es el producto 2", 421, "Sin imagen", "ddss321", 12)
const product3 = pManager.addProduct("Product 3", "Este es el producto 3", 497, "Sin imagen", "hfr5", 18)

//add product
const products = [
    product1,
    product2,
    product3
]

app.get(port, (req,res) => {
    res.send(productos)
})