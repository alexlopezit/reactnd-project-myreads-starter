import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }

  handleShelfChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const newShelf = e.target.value
    this.props.onChange( this.props.book, newShelf)
  }

  render() {
    const { handleShelfChange } = this
    const { book } = this.props
    const bookSmallThumbnail = book.imageLinks && book.imageLinks.smallThumbnail ? book.imageLinks.smallThumbnail : 'http://via.placeholder.com/128x193?text=No%20Cover'
    const selectedShelf = ( book && book.shelf ) ? book.shelf : 'none'
    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${bookSmallThumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select onChange={ handleShelfChange } value={ selectedShelf }>
                <option disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{ book.title }</div>
          <div className="book-authors">{ book.authors }</div>
        </div>
      </li>
    )
  }

}

export default Book
