import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import BookShelf from './BookShelf'
import './App.css'

class BooksApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      books: [],
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const currentlyReading = books.filter((book) => book.shelf === 'currentlyReading' )
      const wantToRead = books.filter((book) => book.shelf === 'wantToRead' )
      const read = books.filter((book) => book.shelf === 'read' )
      this.setState({ books, currentlyReading, wantToRead, read })
    })
  }

  handleUpdates = (updatedBooks) => {
    // Request all books and update state
    BooksAPI.getAll().then((books) => {
      this.setState({
        books,
        currentlyReading: books.filter((book) => updatedBooks.currentlyReading.indexOf(book.id) >= 0 ),
        wantToRead: books.filter((book) => updatedBooks.wantToRead.indexOf(book.id) >= 0 ),
        read: books.filter((book) => updatedBooks.read.indexOf(book.id) >= 0 )
      })
    })
  }

  handleShelfChange = (book: object, newShelf: string) => {
    // Save book change
    BooksAPI.update(book, newShelf).then((response) => {
      this.handleUpdates(response)
    })
  }

  render() {
    const { handleShelfChange } = this
    const { books, currentlyReading, wantToRead, read } = this.state
    return (
      <div className="app">
        <Route exact path="/" render={ () => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
      			      <BookShelf books={ currentlyReading } onChange={ handleShelfChange } />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
      			      <BookShelf books={ wantToRead } onChange={ handleShelfChange } />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <BookShelf books={ read } onChange={ handleShelfChange } />
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        ) } />

        <Route path="/search" render={ () => (
          <SearchBooks myBooks={ books } onChange={ handleShelfChange } />
        )} />
      </div>
    )
  }
}

export default BooksApp
