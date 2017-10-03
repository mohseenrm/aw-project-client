import { Actions } from '../actions/actions';
// import actions

const initialState = {
  title: 'Hello from redux!',
};

// FIXME: set types for actions
const titleReducer = (state = initialState, action: any) => {
  switch (action.type){
    case Actions.INITIALIZE: return state;
    default: return state;
  }
};

export { titleReducer };
