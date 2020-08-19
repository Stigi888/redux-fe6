import React, {useState} from 'react';
import './App.css';
import {connect} from "react-redux";

function Dashboard(props) {

    const [newTodo, setNewTodo] = useState('')

    const addButtonHandler = () => {
        props.addTodo(newTodo)
        setNewTodo('')
    }

    // console.log(props)
    const {todos = [], column} = props;

    return (
        <div>
            {todos.map(el => <li>
                {el.title}
                <input type="checkbox"/>

                <button onClick={() => props.deleteTodo(el.id)}>delete</button>

                <input type="text"/>
                <button>update</button>
            </li>)}


            <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} type="text"/>
            <button onClick={addButtonHandler}>add new todo</button>
        </div>
    );
}

const mapStateToProps = (state) => ({
    todos: state.todos,
    column: state.columns
});

const mapDispatchToProps = (dispatch) => ({
    addTodo: (todo) => dispatch({type: 'TODO_ADD', payload: todo}),
    deleteTodo: (todoId) => dispatch({type: 'DELETE_TODO', payload: todoId}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);