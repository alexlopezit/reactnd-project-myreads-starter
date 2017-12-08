import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      query: '',
      newBooks: []
    }
  }

  updateQuery = (query) => {
    // console.log(query)
    this.setState({ query })

    // TODO: Add delay for query or after 3 characters
    BooksAPI.search(query, 20).then((newBooks) => {

      if (newBooks !== null) {
        // console.log(newBooks)
        this.setState({ newBooks })
      }
    })
  }

  render() {
    const { query, newBooks } = this.state
    const { updateQuery } = this

    // let showingBooks

    // if(query) {
    //   console.log(query)
    // }

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={ query }
              onChange={ (event) => updateQuery(event.target.value) }
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              newBooks && newBooks.map( (book) => {
                return book && <Book key={ book.id } book={ book } />
              })
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
