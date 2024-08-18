interface State {
  count: number,
}

const initialState:State = {
  count: 0,
}

function testReducer(state = initialState, action: any) {
  switch (action.type) {
    case "ADD-NUM":
      return {...state, count: state.count + action.addNum};
    default:
      return state;
  }
}
export {testReducer};
export type {State};