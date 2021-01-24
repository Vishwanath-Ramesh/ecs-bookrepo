import React from 'react'
import { useHistory } from 'react-router'
import { Badge } from '@material-ui/core'
import {
  Search as SearchIcon,
  FavoriteBorder as FavoriteBorderIcon,
  PersonOutline as PersonOutlineIcon,
  ShoppingCartOutlined as ShoppingCartIcon,
} from '@material-ui/icons'

import useAppContext from '../../hooks/useAppContext'
import './Navbar.css'

const Navbar = () => {
  const { appState } = useAppContext()
  const history = useHistory()

  return (
    <div className="navbar">
      <div className="navbar__logo">Book Repo</div>
      <div className="navbar__search">
        <SearchIcon />
      </div>
      <div className="navbar__fav">
        <Badge badgeContent={appState.favourites.length} color="primary">
          <FavoriteBorderIcon />
        </Badge>
      </div>
      <div className="navbar__account">
        <PersonOutlineIcon />
      </div>
      <div
        className="navbar__cart"
        role="presentation"
        onClick={() => history.push('/cart')}
      >
        <ShoppingCartIcon />
        <span className="navbar__cartlabel">{`Cart (${appState.cartItems.length})`}</span>
      </div>
    </div>
  )
}

export default Navbar
