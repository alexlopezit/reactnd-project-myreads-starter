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
      console.log(books)
      this.setState({ books })
    })
  }

  render() {
    const { books } = this.state
    const currentlyReadingBooks = books.filter((book) => book.shelf === 'currentlyReading' )
    const wantToReadBooks = books.filter((book) => book.shelf === 'wantToRead' )
    const readBooks = books.filter((book) => book.shelf === 'read' )
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
      			  <BookShelf books={ currentlyReadingBooks } />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
      			  <BookShelf books={ wantToReadBooks } />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <BookShelf books={ readBooks } />
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        ) } />

        <Route path="/search" render={ () => (
          <SearchBooks />
        )} />
      </div>
    )
  }
}

export default BooksApp
