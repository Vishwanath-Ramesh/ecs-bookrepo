import React, { lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import Backdrop from '../components/base/Backdrop/Backdrop'
import Header from '../components/custom/Header/Header'

const PageNotFound = lazy(() => import('../pages/PageNotFound/PageNotFound'))
const Home = lazy(() => import('../pages/Home/Home'))
const Cart = lazy(() => import('../pages/Cart/Cart'))

const Routes = () => {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Backdrop />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" component={Cart} />
          <Route path="/404" component={PageNotFound} />
          <Redirect to="/404" />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default Routes
