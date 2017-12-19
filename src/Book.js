import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class Book extends React.Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    const { book } = this.props
    this.state = {
      selectedShelf: ( book && book.shelf ) ? book.shelf : 'none'
    }
  }

  handleShelfChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const newShelf = e.target.value

    BooksAPI.update(this.props.book, newShelf).then((response) => {
      this.props.onChange(response)
    })

    this.setState({
      selectedShelf: newShelf
    })
  }

  render() {
    const { handleShelfChange } = this
    const { book } = this.props
    const { selectedShelf } = this.state
    const bookSmallThumbnail = book.imageLinks.smallThumbnail
    // const selectedShelf = ( book && book.shelf ) ? book.shelf : 'none'
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
