const db = require('../models')

const Todo = db.todos


//my crud functions

//CREATE

const addTodo = async (req, res) => {
    let info = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        status: req.body.status ? req.body.status : false
    }

    const todo = await Todo.create(info)
    res.status(201).send(todo)
    console.log(todo)
}

//READ all todos
const getAllTodos = async (req, res) => {
    let todoGet = await Todo.findAll({})
    res.status(200).send(todoGet)
}

//READ a todo

const getTodoById = async (req, res) => {
    let id = req.params.id
    let getATodo = await Todo.findOne({where: {id: id}})
    res.status(200).send(getATodo)
}

const getTodoByCategory = async (req, res) => {
    let category = req.params.category
    let getTodoWithCategory = await Todo.findAll({where: {category: category}})
    res.status(200).send(getTodoWithCategory)
}

const getTodoByTitle = async (req, res) => {
    let title = req.params.title
    let getTodoWithTitle = await Todo.find({where: {title: title}})
    res.status(200).send(getTodoWithTitle)
}

const completedTodo = async (req, res) => {
    const todos = await Todo.findAll({ where: { status: true } })
    res.status(200).send(todos)
}

//UPDATE

const updateTodo = async (req, res) => {
    let id = req.params.id

    const todo = await Todo.update(req.body, { where: { id: id } })
    res.status(200).send({
        message: "Updated Successfully!!"
    })

} 

//DELETE

const deleteTodo = async (req, res) => {
    let id = req.params.id

    await Todo.destroy({ where: { id: id } })
    res.status(200).send({

        message: "Todo successfully deleted"
    })

} 
module.exports = {
    addTodo,
    getAllTodos,
    getTodoById,
    getTodoByCategory,
    getTodoByTitle,
    completedTodo,
    updateTodo,
    deleteTodo
}