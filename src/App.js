import React, { useState, useEffect } from 'react';
import './App.css';
import BookList from './BookList';
import BookModal from './BookModal';

function App() {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  // 데이터 로드
  useEffect(() => {
    const root = document.getElementById('root');
    
    fetch('/my_data.json')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(() => setBooks([]));
  }, []);

  // 도서 추가/수정
  function handleSubmit(bookData) {
    if (editingBook) {
      setBooks(books.map(book => 
        book.id === editingBook.id ? { ...book, ...bookData } : book
      ));
    } else {
      setBooks([...books, { id: Date.now(), ...bookData }]);
    }
    setShowModal(false);
    setEditingBook(null);
  }

  // 도서 삭제
  function deleteBook(id) {
    setBooks(books.filter(book => book.id !== id));
  }

  return (
    <div className="app">
      <div className="header">
        <h1>도서 목록 관리 시스템</h1>
        <p>총 {books.length}권의 도서가 등록되어 있습니다</p>
        <button onClick={() => setShowModal(true)} className="add-button">
          새 도서 추가
        </button>
      </div>
      
      <BookList 
        books={books}
        onEdit={book => { setEditingBook(book); setShowModal(true); }}
        onDelete={deleteBook}
      />

      {showModal && (
        <BookModal 
          onClose={() => { setShowModal(false); setEditingBook(null); }}
          onSubmit={handleSubmit}
          book={editingBook}
        />
      )}
    </div>
  );
}

export default App;
