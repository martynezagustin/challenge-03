import fs from "fs";

export class ProductManager {
    constructor(filePath) {
        this.path = filePath
        this.products = []
        this.nextId = 0
        this.loadProducts()
    }
    saveProducts(){
        try{
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf8')
        } catch (error) {
            console.error("Error al guardar productos", error);
        }
    }
    loadProducts(){
        try {
            const data = fs.readFileSync(this.path, 'utf8')
            this.products = JSON.parse(data)
        } catch (error) {
            this.products = []
        }
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
export const pManager = new ProductManager()
export let products = []

//generar productos
for (let i = 0; i < 10; i++) {
    const price = Math.floor(Math.random() * 100 + 1)
    const code = Math.random()
    const stock = Math.floor(Math.random() * 40 + 1)
    const product = pManager.addProduct(`Product ${i}`, `Este es el producto ${i}`, price , "Sin imagen", code , stock)
    products.push(product)
}

//lista de products

