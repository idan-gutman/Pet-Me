const initialState = {
  isLoading: false,
  onExplore: false,
  isShowSearch:false
};

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SHOW_SEARCH':
      return { ...state, isShowSearch: true }
    case 'NOT_SHOW_SEARCH':
      return { ...state, isShowSearch: false }
    case 'SHOW_SEARCH':
      return { ...state, isShowSearch: !state.isShowSearch }
    case 'ON_EXPLORE':
      return { ...state, onExplore: true }
    case 'ON_HOME':
      return { ...state, onExplore: false }
    case 'LOADING_START':
      return { ...state, isLoading: true }
    case 'LOADING_DONE':
      return { ...state, isLoading: false }
    default: return state
  }
}
