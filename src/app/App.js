import React from 'react'

import useAppContext from '../views/components/hooks/useAppContext'
import ErrorBoundary from '../views/pages/ErrorBoundary/ErrorBoundary'
import Routes from '../views/Routes/Routes'
import './App.css'

function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cartItems: [...state.cartItems, action.bookDetails] }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (bookDetail) => bookDetail.bookID !== action.bookId
        ),
      }
    case 'ADD_TO_FAVOURITES':
      return { ...state, favourites: [...state.favourites, action.bookDetails] }
    case 'REMOVE_FROM_FAVOURITES':
      return {
        ...state,
        favourites: state.favourites.filter(
          (bookDetail) => bookDetail.bookID !== action.bookId
        ),
      }
    case 'UPDATE_CARTITEM':
      return { ...state, cartItems: action.cartItems }
    default:
      throw new Error(`Unhandled action type - ${action.type}`)
  }
}

const App = () => {
  const initialState = {
    cartItems: [],
    favourites: [],
  }
  const [state, dispatch] = React.useReducer(appReducer, initialState)
  const { AppProvider } = useAppContext()

  return !window.indexedDB ? (
    "This browser doesn't support IndexedDB"
  ) : (
    <AppProvider value={{ appState: state, appDispatch: dispatch }}>
      <ErrorBoundary>
        <Routes />
      </ErrorBoundary>
    </AppProvider>
  )
}

export default App
