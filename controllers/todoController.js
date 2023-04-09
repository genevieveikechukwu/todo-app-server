const db = require('../models')

const Todo = db.todos


//my crud functions

//CREATE

const addTodo = async (req, res) => {
    try {
        let info = {
            text: req.body.text,
            status: req.body.status ? req.body.status : false
        }
        if (info.text === "") {
            
        return    res.status(404).send({
                status: "fail",
                message: "Cannot add empty string"
            })
        }

        const todo = await Todo.create(info)
        res.status(201).send(todo)
        console.log(todo.data)
    } catch (error) {
        console.log(error)
    }
}
//READ all todos
const getAllTodos = async (req, res) => {
    let todoGet = await Todo.findAll({})
    res.status(200).send(todoGet)
}

//READ a todo

const getTodoById = async (req, res) => {
    let id = +req.params.id
    if (id){
        let getATodo = await Todo.findOne({where: {id: id}})
        return res.status(200).send(getATodo)
    } else {
        return res.status(404).send({message: "couldn't find id"})
    }
        
}


const completedTodo = async (req, res) => {
    const todos = await Todo.findAll({ where: { status: true } })
    res.status(200).send(todos)
  
    
}

//UPDATE

const updateTodo = async (req, res) => {
    let id = +req.params.id
    Todo.findOne({ where: { id: id } }).then(() => {
        info = {
            text: req.body.text,
        }
        const todo = Todo.update(info, { where: { id: id } })
        return res.status(200).send({
             todo,
            message: "Updated successfully"
        })
    })
        .catch((err) => {
            console.log(err)
        });
}


//DELETE

const deleteTodo = async (req, res) => {
    let id = +req.params.id
    if (id)
        await Todo.destroy({ where: { id: id } })
    return  res.status(200).send({

            message: "Todo successfully deleted"
        })

} 
module.exports = {
    addTodo,
    getAllTodos,
    getTodoById,
    completedTodo,
    updateTodo,
    deleteTodo
}