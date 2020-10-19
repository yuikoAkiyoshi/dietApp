import { READ_TODOS, ADD_TODO, UPDATE_TODO, DELETE_TODO } from "../action";

const todo = (state = [], action) => {
  switch (action.type) {
    case READ_TODOS:
      return state;
    case ADD_TODO:
      const insertData = {
        todo: action.todo,
        point: action.point,
      };
      let length = state.length;
      let id = length === 0 ? 1 : state[length - 1].id + 1;
      return [...state, { id: id, ...insertData }];
    case UPDATE_TODO:
      return state;
    case DELETE_TODO:
      return state.filter((el) => el.id !== Number(action.id));
    default:
      return state;
  }
};
export default todo;
