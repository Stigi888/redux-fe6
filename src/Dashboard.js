import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {connect} from "react-redux";
import {deleteTodo, editTodo, getTodos, markTodoDone} from "./redux/action";



function Dashboard(props) {

    const {todo, index, lengthTodo} = props;

    const isToDoDone = todo.done
    const toDoName = todo.name
    const todoId = todo._id
    const toDoDescription = todo.description


    const [isEditMode, setIsEditMode] = useState(false)
    const [newToDo, setNewToDo] = useState(toDoName)
    const [newDescription, setNewDescription] = useState(toDoDescription)



     const saveButtonHandler = (todoId) => {
        props.editToDo(todoId, newToDo)
        setIsEditMode(false)
        setNewToDo(newToDo)
    }
    const saveButtonHandlerDescription = (todoId) => {
        props.editToDo(todoId, newDescription)
        setIsEditMode(false)
        setNewDescription(newDescription)
    }

    const moveDownButton = (index) => {
        props.moveDown(index)
    }

    const moveUpButton = (index) => {
        props.moveUp(index)
    }

    const titleStyle = isToDoDone ?
        {textDecoration: 'line-through', listStyle: 'none' } :
        {textDecoration: 'none', listStyle: 'none' }

    return (
        <div>
            <ul>
                <li style={titleStyle}>
                    {isEditMode ?
                        (
                            <>
                                <input value={newToDo} onChange={(e) =>{setNewToDo(e.target.value)}}/>
                                <button onClick={() => saveButtonHandler(todoId)}>Save</button>
                                <input value={newDescription} onChange={(e) =>{setNewDescription(e.target.value)}}/>
                                <button onClick={() => saveButtonHandlerDescription(todoId)}>Save</button>
                            </>
                        )
                        :
                        (<>
                                {newToDo}
                                {newDescription}
                                <button onClick={() => props.markAsDone(todoId)}>{isToDoDone ? 'Undone' : 'Done'}</button>
                                <button onClick={() => setIsEditMode(true)}>Edit</button>
                                <button onClick={() => props.removeTodo(todoId)}>X</button>
                                <button onClick={() => moveUpButton(index)} disabled={index === 0}>Move UP</button>
                                <button onClick={() => moveDownButton(index)} disabled={index === lengthTodo-1 }>Move DOWN</button>
                            </>
                        )
                    }
                </li>
            </ul>
        </div>
    );
}
const mapStateToProps = (state) => ({
    todos: state.todos
});

const mapDispatchToProps = (dispatch) => ({

removeTodo: (todoId) => dispatch(deleteTodo(todoId)),
editToDo: (todoId, newTitle) => dispatch(editTodo(todoId, newTitle)),
markAsDone: (todoId) => dispatch(markTodoDone(todoId)),
moveDown:(index) => dispatch({type: "MOVE_DOWN", payload: index}),
moveUp:(index) => dispatch({type: "MOVE_UP", payload: index}),


    getList: () => dispatch(getTodos())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);