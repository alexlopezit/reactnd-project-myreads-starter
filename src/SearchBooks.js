import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends React.Component {

  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      query: '',
      newBooks: []
    }
  }

  updateQuery = (query) => {

    if(query !== '') {

      const { myBooks } = this.props

      this.setState({ query })

      BooksAPI.search(query, 20).then((response) => {

        const newBooks = response.map( (object) => {

          // check is a book is already on my shelf
          const found = myBooks.filter( (mb) => mb.id === object.id )

          if(found.length === 1) {
            // assign the shelf
            const newObject = Object.assign({'shelf': found[0].shelf}, object)
            return newObject
          } else {
            return object
          }
        })

        this.setState({ newBooks: newBooks })
      })
    } else {
      this.setState({ query: '' })
    }
  }

  render() {
    const { query, newBooks } = this.state
    const { updateQuery } = this

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
              newBooks && query !== '' && newBooks.map( (book) => {
                return book && <Book key={ book.id } book={ book } onChange={ this.props.onChange } />
              })
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
