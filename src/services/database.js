let db = null

const dbConnection = window.indexedDB.open('db-books', 1)

function initialiseDatasource() {
  return new Promise((resolve, reject) => {
    dbConnection.onupgradeneeded = (event) => {
      db = event.target.result

      const bookStore = db.createObjectStore('books', { keyPath: 'bookID' })
      bookStore.createIndex('bookId', 'id', { unique: true })

      bookStore.transaction.oncomplete = async () => {
        const response = await fetch(
          'https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json'
        )
        const booksData = await response.json()
        const bookObjectStore = db
          .transaction('books', 'readwrite')
          .objectStore('books')

        booksData.forEach((data) => {
          bookObjectStore.add(data)
        })
        resolve(db)
      }

      bookStore.transaction.onerror = (err) => {
        reject(new Error(err.target.errorCode))
      }
    }

    dbConnection.onsuccess = () => {
      db = dbConnection.result
    }
  })
}

function readData(queryKey, count) {
  return new Promise((resolve, reject) => {
    let request = null
    const objectStore = dbConnection.result
      .transaction('books')
      .objectStore('books')

    if (queryKey) {
      if (count) request = objectStore.getAll(queryKey, count)
      else request = objectStore.getAll(queryKey)
    } else request = objectStore.getAll()

    request.onsuccess = (event) => {
      resolve(event.target.result)
    }
    request.onerror = (event) => {
      reject(event.target.errorCode)
    }
  })
}

export default { dbConnection, initialiseDatasource, readData }
