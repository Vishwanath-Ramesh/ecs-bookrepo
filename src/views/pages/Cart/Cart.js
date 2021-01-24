import React from 'react'
import {
  Checkbox,
  FormControl,
  Select,
  InputLabel,
  IconButton,
  Divider,
  Button,
} from '@material-ui/core'
import {
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
} from '@material-ui/icons'

import useAppContext from '../../components/hooks/useAppContext'
import noCoverImage from '../../../assets/images/nocover.jpg'
import './Cart.css'

const Cart = () => {
  const { appState, appDispatch } = useAppContext()

  function getCartIndexByBookId(bookId) {
    return appState.cartItems.findIndex(
      (cartItem) => cartItem.bookID === bookId
    )
  }

  function onCartItemChecked(checked, bookId) {
    let selectedBook = getCartIndexByBookId(bookId)
    const cartItems = [...appState.cartItems]

    selectedBook = appState.cartItems.findIndex(
      (cartItem) => cartItem.bookID === bookId
    )

    if (selectedBook < 0) return null

    if (checked) cartItems[selectedBook].isSelected = true
    else cartItems[selectedBook].isSelected = false

    return appDispatch({ type: 'UPDATE_CARTITEM', cartItems })
  }

  function onQuantityChangeHandler(quantity, bookId) {
    const selectedBook = getCartIndexByBookId(bookId)
    const cartItems = [...appState.cartItems]

    cartItems[selectedBook].quantity = +quantity
    cartItems[selectedBook].totalPrice =
      cartItems[selectedBook].price * +quantity

    return appDispatch({ type: 'UPDATE_CARTITEM', cartItems })
  }

  function getCartTotal() {
    return appState.cartItems.reduce((prevItem, currItem) => {
      if (currItem.isSelected)
        return prevItem + +(currItem.totalPrice || currItem.price)

      return prevItem
    }, 0)
  }

  const cartTotal = getCartTotal()

  return (
    <div className="cart">
      <div className="cart__cartitems">
        <div className="cart__cartitems_header">Shopping Cart</div>
        <div className="cart__cartitem">
          {appState?.cartItems && !appState.cartItems.length
            ? 'No items found'
            : appState.cartItems.map((cartItem) => {
                return (
                  <div
                    key={cartItem.bookID}
                    className="cart__cartitems_itemdetails"
                  >
                    <div className="cart__cartitems_itemcheck">
                      <Checkbox
                        checked={cartItem?.isSelected}
                        onChange={({ target }) =>
                          onCartItemChecked(target.checked, cartItem.bookID)
                        }
                      />
                    </div>
                    <div className="cart__cartitems_itemimage">
                      <img src={noCoverImage} alt={cartItem.title} />
                    </div>
                    <div className="cart__cartitems_itemcontent">
                      <div className="cart__cartitems_itemotherdetails">
                        <div className="cart__cartitems_itemname">
                          {cartItem.title}
                        </div>
                        <div className="cart__cartitems_itemsubdetails">
                          <FormControl
                            variant="outlined"
                            size="small"
                            className="cart__cartitems_quantity"
                          >
                            <InputLabel htmlFor="outlined-age-native-simple">
                              Quantity
                            </InputLabel>
                            <Select
                              native
                              onChange={({ target }) =>
                                onQuantityChangeHandler(
                                  target.value,
                                  cartItem.bookID
                                )
                              }
                              label="Quantity"
                              inputProps={{
                                name: 'age',
                                id: 'outlined-age-native-simple',
                              }}
                              value={cartItem?.quantity || 1}
                            >
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5</option>
                            </Select>
                          </FormControl>
                          <Divider
                            variant="middle"
                            orientation="vertical"
                            flexItem
                          />
                          <IconButton
                            aria-label="delete"
                            className="cart__cartitems_delete"
                            onClick={() =>
                              appDispatch({
                                type: 'REMOVE_FROM_CART',
                                bookId: cartItem.bookID,
                              })
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </div>
                      <div className="cart__cartitems_itempricedetails">{`₹ ${
                        cartItem.totalPrice || cartItem.price
                      }`}</div>
                    </div>
                  </div>
                )
              })}
        </div>
      </div>
      <div className="cart__cartamount">
        <div className="cart__cartamount_deliveryinfo">
          <CheckCircleIcon className="cart__cartamount_deliveryicon" />
          <span>Your order is eligible for FREE Delivery.</span>
        </div>
        <div className="cart__cartamount_totalinfo">
          <span>Total:</span>
          <span>{cartTotal}</span>
        </div>
        <div className="cart__cartamount_buy">
          <Button
            variant="contained"
            color="primary"
            disableElevation
            disabled={!cartTotal}
          >
            Proceed to buy
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Cart
