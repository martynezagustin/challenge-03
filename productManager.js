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
let products = []

//generar productos
for (let i = 0; i < 10; i++) {
    const price = Math.floor(Math.random() * 100 + 1)
    const code = Math.random()
    const stock = Math.floor(Math.random() * 40 + 1)
    const product = pManager.addProduct(`Product ${i}`, `Este es el producto ${i}`, price , "Sin imagen", code , stock)
    products.push(product)
}

//lista de products


app.get("/products/:id", (req, res) => {
    const id = req.params.id
    const product = products.find((p) => p.id === parseInt(id))
    if(product){
        res.json(product)
    } else {
        return res.status(404).json({error: "Producto no encontrado"})
    }
})

//limite a pedir de
app.get("/products", (req, res) => {
    const limit = req.query.limit
    if(limit){
        const limitNumber = parseInt(limit)
        const limitedProducts = products.slice(0, limitNumber)
        res.json(limitedProducts)
    } else {
        res.json(products)
    }
})
