import React from 'react';
import './App.css';
import Dashboard from "./Dashboard";
import {connect} from "react-redux";
import TodoCreate from "./TodoCreate";

function App(props) {


    return (
        <div className="App">
            <TodoCreate/>
            {props.todos.map((el, i) => <Dashboard
                index={i}
                todo={el}
                key={el.id}
                lengthTodo={props.todos.length}
                />)}

        </div>
    );
}

const mapStateToProps = (state) => ({
    todos: state.todos,

});


export default connect(mapStateToProps)(App);