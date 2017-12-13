import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends React.Component {

  static propTypes = {
    books: PropTypes.array.isRequired
  }

  renderBookshelf = (books: any) => {
    return(
      <div className="bookshelf-books">
        <ol className="books-grid">
          { books.map((book) => { return this.renderBook(book) }) }
        </ol>
      </div>
    )
  }

  renderBook = ( book: any ) => {
    return( <Book key={ book.id } book={ book } onChange={ this.props.onChange } /> )
  }

  render() {
    const { books } = this.props
    const { renderBookshelf } = this

    return( renderBookshelf(books) )
  }

}

export default BookShelf
