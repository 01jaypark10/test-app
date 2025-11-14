import React from 'react';

function BookList({ books, onEdit, onDelete }) {
  if (!books.length) {
    return (
      <div className="empty-message">
        <h3>등록된 도서가 없습니다</h3>
        <p>새 도서를 추가해보세요!</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      {books.map(book => (
        <div key={book.id} className="book-card">
          <div className="book-header">
            <h3 className="book-title">{book.title}</h3>
          </div>
          <div className="book-body">
            <p><strong>저자:</strong> {book.author}</p>
            <p><strong>출판년도:</strong> {book.year}년</p>
            <p>
              <strong>장르:</strong> 
              <span className={`genre-badge genre-${book.genre}`}>{book.genre}</span>
            </p>
          </div>
          <div className="book-actions">
            <button className="edit-button" onClick={() => onEdit(book)}>수정</button>
            <button className="delete-button" onClick={() => onDelete(book.id)}>삭제</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookList;
