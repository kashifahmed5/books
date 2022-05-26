const express = require('express')

const router = new express.Router()

const items = [{
    "price": 300,
    "name": "Harry Potter",
    "author": "J. K. Rowling",
    "id": 1
},{
    "price": 1000,
    "name": "Hakuna Matata",
    "author": "Lion King",
    "id": 2
},{
    "price": 300,
    "name": "Harry Potter",
    "author": "J. K. Rowling",
    "id": 3
},{
    "price": 1000,
    "name": "Hakuna Matata",
    "author": "Lion King",
    "id": 4
}]

router.get("/", async (req, res) => {
    res.status(200).json({
        "sucess": true,
        "message": "Hello World! I am response from books application."
    })
})

router.get("/books/name", async(req, res) => {
    let books = []
    for(let i = 0; i < items.length; i++) {
        books[i] = items[i].name
    }
    res.status(200).json({
        "success": true,
        "message": books
    })
})

router.get("/books", async(req, res) => {
    res.status(200).json({
        "success": true,
        "message": items
    })
})

router.get("/books/:id", async(req, res) => {
    res.status(200).json({
        "success": true,
        message: items[req.params.id - 1]
    })
})

module.exports = router