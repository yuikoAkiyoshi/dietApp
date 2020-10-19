import { PLUS_POINT, MINUS_POINT } from "../action";

const point = (state = 0, action) => {
  switch (action.type) {
    case PLUS_POINT:
      return state += Number(action.point);
    case MINUS_POINT:
        return state -= action.point;
    default:
      return state;
  }
};
export default point;
