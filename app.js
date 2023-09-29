import express from "express"
import { pManager, products } from "./productManager.js"
const app = express()
const port = 8080

app.listen(port, () => {
    console.log("la app se esta escuchando");
})

app.get("/products/:id", (req, res) => {
    const id = req.params.id
    const product = products.find((p) => p.id === parseInt(id))
    if (product) {
        res.json(product)
    } else {
        return res.status(404).json({ error: "Producto no encontrado" })
    }
})

//limite a pedir de
app.get("/products", (req, res) => {
    const limit = req.query.limit
    if (limit) {
        const limitNumber = parseInt(limit)
        const limitedProducts = products.slice(0, limitNumber)
        res.json(limitedProducts)
    } else {
        res.json(products)
    }
})

