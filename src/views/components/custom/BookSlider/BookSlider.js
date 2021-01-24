import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import BookCard from '../BookCard/BookCard'
import dataBase from '../../../../services/database'
import './BookSlider.css'

const BookSlider = () => {
  const [hasMore, setHasMore] = React.useState(true)
  const [isLoading, setIsLoading] = React.useState(true)
  const [data, setData] = React.useState([])

  function fetchMoreData() {
    dataBase.readData().then((allData) => {
      if (data.length >= allData.length) return setHasMore(false)

      return dataBase
        .readData(IDBKeyRange.lowerBound(data[data.length - 1].bookID), 100)
        .then((newData) => {
          setData((currentState) => currentState.concat(newData))
        })
    })
  }

  React.useEffect(() => {
    async function fetchData() {
      await dataBase.initialiseDatasource()
      dataBase.readData(IDBKeyRange.lowerBound(1), 100).then((responseData) => {
        setData(responseData)
        setIsLoading(false)
      })
    }
    fetchData()
  }, [])

  return (
    <div className="bookslider">
      {isLoading ? (
        'Loading...'
      ) : (
        <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>That&apos;s all</b>
            </p>
          }
        >
          {data.map((book) => {
            return <BookCard key={book.bookID} bookDetails={book} />
          })}
        </InfiniteScroll>
      )}
    </div>
  )
}

export default BookSlider
