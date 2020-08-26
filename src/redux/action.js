import axios from 'axios'


export function getTodos() {
    console.log('Hello from action')
    return (dispatch) => {
            axios.get('http://localhost:5000/todo')
            .then(result => {
                console.log(result)
                dispatch({
                    type: 'GET_TODO',
                    payload: result.data
                })
            })
            .catch(function (error) {
                //handle error
                console.log(error)
            })
    }
}


export function addTodo(name, description) {
    return (dispatch) => {
        console.log('Hello from action delete')
        axios.post('http://localhost:5000/todo', {name: name, description: description})
            .then(result => {
                console.log(result.data)
                dispatch(getTodos())
            })
            .catch(function (error) {
                //handle error
                console.log(error)
            })

    }
}

    export function deleteTodo(todoId) {
        return (dispatch) => {
            axios.delete(`http://localhost:5000/todo/${todoId}`)
                .then(result => {
                    console.log(result.data)
                    dispatch({
                            type: 'DELETE_TODO',
                            payload: todoId
                        },
                        dispatch(getTodos())
                    )
                }).catch();
        }
    }

    export function editTodo(todoId, newTitle) {
        return (dispatch) => {
            axios.patch(`http://localhost:5000/todo/${todoId}`, {name: newTitle})
                .then(result => {
                    console.log(result.data)
                    dispatch({
                            type: 'EDIT_TODO',
                            payload: {todoId, newTitle},
                        },
                        dispatch(getTodos())
                    )
                })
                .catch()
        }

    }

    export function markTodoDone(todoId, done) {
        return (dispatch) => {
            axios.patch(`http://localhost:5000/todo/${todoId}`, {done: !done})
                .then(result => {
                    console.log(result.data)
                    dispatch({
                            type: 'MARK_AS_DONE',
                            payload: {todoId, done},
                        },
                        dispatch(getTodos())
                    )
                })
                .catch()
        }
    }

