const initialState = {
    todos: [
        // {
        //     name: 'First todo',
        //     done: false,
        //     id: 1,
        //
        // }, {
        //     name: 'Second todo',
        //     done: false,
        //     id: 2
        // }, {
        //     name: 'Third todo',
        //     done: false,
        //     id: 3
        // }, {
        //     name: 'Forth todo',
        //     done: false,
        //     id: 4
        // }
    ],
};

const todo = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_TODO':
            return {
                ...state,
                todos: action.payload
            };

        // case 'TODO_ADD':
        //     return {
        //         ...state,
        //         todos: [...state.todos, {name: action.payload, done: false, id: Math.random()}]
        //     };

        case 'DELETE_TODO':
            return {
                ...state,

            };

        // case 'EDIT_TODO':
        //     return {
        //         ...state,
        //         todos: [...state.todos.map(el => {
        //             if (el.id === action.payload.todoId) {
        //                 el.name = action.payload.name
        //             }
        //             return el
        //         })]
        //     };

        // case 'MARK_AS_DONE':
        //         return {
        //             ...state,
        //             todos: [...state.todos.map(el => {
        //                 if (el.id === action.payload) {
        //                     el.done = !el.done
        //                 }
        //                 return el
        //             })]
        //         };


        case "MOVE_UP":
            let upList = [...state.todos]
            const currentEl = upList[action.payload]
            const previousEl = upList[action.payload - 1]
            upList[action.payload] = previousEl;
            upList[action.payload - 1] = currentEl;

            return {
                ...state,
                todos: [...upList]
            };


        case "MOVE_DOWN":
            let downList = [...state.todos]
            const currentElementDown = downList[action.payload]
            const previousElementDown = downList[action.payload + 1]
            downList[action.payload] = previousElementDown;
            downList[action.payload + 1] = currentElementDown;

            return {
                ...state,
                todos: [...downList]
            };
        default:
            return state
    }
}

    export default todo;