import React from 'react'
import * as BooksAPI from './BooksAPI'

class Book extends React.Component {

  handleShelfChange = (e: React.FormEvent<HTMLSelectElement>) => {
    BooksAPI.update(this.props.book, e.target.value).then((response) => {
      this.props.onChange(response)
    })
  }

  render() {
    const { handleShelfChange } = this
    const { book } = this.props
    const bookSmallThumbnail = book.imageLinks.smallThumbnail
    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${bookSmallThumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select onChange={ handleShelfChange } value={ book.shelf }>
                <option value="none" disabled>Move to...</option>
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
