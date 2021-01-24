import React from 'react'

const AppContext = React.createContext({
  appState: null,
  appDispatch: () => null,
})

AppContext.displayName = 'AppContext'

const useAppContext = () => {
  const { Provider } = AppContext
  const { appState, appDispatch } = React.useContext(AppContext)

  return {
    AppProvider: Provider,
    appState,
    appDispatch,
  }
}

export default useAppContext
