import React, {useState} from 'react';
import './App.css';
import {connect} from "react-redux";


function Dashboard(props) {

    const {todo, index, lengthTodo} = props;

    const isToDoDone = todo.done
    const toDoName = todo.name
    const todoId = todo.id


    const [isEditMode, setIsEditMode] = useState(false)
    const [newToDo, setNewToDo] = useState(toDoName)


    const inputHandler = (e) => {
        setNewToDo(e.target.value)
    }

    const saveButtonHandler = (todoId) => {
        props.editToDo(todoId, newToDo)
        setIsEditMode(false)
        setNewToDo(newToDo)
    }

    const remove = (todoId) => {
        props.deleteTodo(todoId)
    }

    const markAsDone = (todoId)=>{
        props.markAsDone(todoId)
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
                                <input value={newToDo} onChange={inputHandler}/>
                                <button onClick={() => saveButtonHandler(todoId)}>Save</button>
                            </>
                        )
                        :
                        (<>
                                {newToDo}
                                <button onClick={() => markAsDone(todoId)}>{isEditMode ? 'Undone' : 'Done'}</button>
                                <button onClick={() => setIsEditMode(true)}>Edit</button>
                                <button onClick={() => remove(todoId)}>X</button>
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


const mapDispatchToProps = (dispatch) => ({

deleteTodo: (todoId) => dispatch({type: 'DELETE_TODO', payload: todoId}),
editToDo: (todoId, newTitle) => dispatch({type: 'EDIT_TODO', payload: {todoId, newTitle}}),
markAsDone: (todoId) => dispatch({type: 'MARK_AS_DONE', payload: todoId }),
moveDown:(index) => dispatch({type: "MOVE_DOWN", payload: index}),
moveUp:(index) => dispatch({type: "MOVE_UP", payload: index})
});

const mapStateToProps = (state) => ({
    todos: state.todos
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);