import React, {useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Dashboard from "./Dashboard";
import {connect} from "react-redux";
import TodoCreate from "./TodoCreate";
import {getTodos} from "./redux/action";


function App(props) {
    useEffect(()=>{
        console.log('Hello useEffect')
        props.getList()
    },[]);


    return (

        <div className="App">
            <TodoCreate/>
            {props.todos.map((el, index) => <Dashboard
                index={index}
                todo={el}
                key={el._id}
                lengthTodo={props.todos.length}

                />)}

        </div>
    );
}

const mapStateToProps = (state) => ({
    todos: state.todos,

});

const mapDispatchToProps = (dispatch) => ({

    getList: () => dispatch(getTodos())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);