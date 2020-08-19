const initialState = {
    todos: [
        {
            title: 'First todo',
            done: true,
            id: 1
        }, {
            title: 'Second todo',
            done: false,
            id: 2
        }, {
            title: '3 todo',
            done: false,
            id: 3
        }, {
            title: '4 todo',
            done: false,
            id: 4
        }
    ],

    columns: [{id: 1, name: 'qwe'}]
};

const todo = (state = initialState, action) => {
    switch (action.type) {

        case 'TODO_ADD':
            return {
                ...state,
                todos: [...state.todos, {title: action.payload, done: false, id: Math.random()}]
            };

        case 'DELETE_TODO':
            const newTodos = state.todos.filter(el => el.id !== action.payload)

            return {
                ...state,
                todos: newTodos
            };

        default:
            return state;
    }
};

export default todo;