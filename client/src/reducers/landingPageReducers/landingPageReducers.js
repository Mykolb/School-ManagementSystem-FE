import '../../actions/landingPageActions/landingPageActions';

const initialState = {
  reset: false,
  toggle: false
}

export const landingPageReducer = (state = initialState, action) => {
switch (action.type) {
    case 'RESET_NAV':
    console.log('RESET')
    return {
        ...state,
        reset: action.payload
    };
    case 'TOGGLE':
    return {
      ...state,
      toggle: !state.toggle
    }
    default: return state;

  }
}