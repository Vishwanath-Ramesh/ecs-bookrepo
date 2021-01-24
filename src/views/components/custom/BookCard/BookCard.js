import React from 'react'
import {
  Add as AddIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
} from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import PropTypes from 'prop-types'

import useAppContext from '../../hooks/useAppContext'
import nocover from '../../../../assets/images/nocover.jpg'
import './BookCard.css'

const BookCard = ({ bookDetails }) => {
  const { appState, appDispatch } = useAppContext()

  function isInFavourites() {
    return (
      appState.favourites.findIndex(
        (bookDetail) => bookDetail.bookID === bookDetails.bookID
      ) >= 0
    )
  }

  function onAddCartHandler() {
    appDispatch({ type: 'ADD_TO_CART', bookDetails })
  }

  function onFavouriteHandler() {
    if (isInFavourites())
      return appDispatch({
        type: 'REMOVE_FROM_FAVOURITES',
        bookId: bookDetails.bookID,
      })

    return appDispatch({ type: 'ADD_TO_FAVOURITES', bookDetails })
  }

  return (
    <div className="bookcard">
      <img className="bookcard__bookimage" src={nocover} alt="" />
      <div className="bookcard__offers">
        <IconButton
          disableRipple
          className="bookcard__like"
          onClick={onFavouriteHandler}
        >
          {isInFavourites() ? (
            <FavoriteIcon
              className="bookcard__favoritefilled"
              fontSize="small"
            />
          ) : (
            <FavoriteBorderIcon
              className="bookcard__favoriteoutline"
              fontSize="small"
            />
          )}
        </IconButton>
      </div>
      <div className="bookcard__bookdetails">
        <div className="bookcard__bookhead">
          <div className="bookcard__title">{bookDetails.title}</div>
          <div className="bookcard__rate">{bookDetails.price}</div>
        </div>
        <div className="bookcard__bookinfo">
          <div className="bookcard__rating">
            <Rating
              name={`book-rating-${bookDetails.bookID}`}
              size="small"
              defaultValue={bookDetails.average_rating}
              precision={0.5}
            />
          </div>
          <div
            role="presentation"
            className="bookcard__buy"
            onClick={onAddCartHandler}
          >
            <span className="bookcard__buylabel">Buy</span>
            <AddIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

BookCard.propTypes = {
  bookDetails: PropTypes.shape({
    authors: PropTypes.string,
    average_rating: PropTypes.number,
    bookID: PropTypes.number,
    isbn: PropTypes.number,
    language_code: PropTypes.string,
    price: PropTypes.number,
    ratings_count: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
}

export default BookCard
