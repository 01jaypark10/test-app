import React, { useState, useEffect } from 'react';

function BookModal({ onClose, onSubmit, book }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setYear(book.year);
      setGenre(book.genre);
    }
  }, [book]);

  function handleSubmit(e) {
    e.preventDefault();
    if (title && author && year && genre) {
      onSubmit({ title, author, year: Number(year), genre });
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{book ? '도서 정보 수정' : '새 도서 추가'}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>제목</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="도서 제목"
              />
            </div>
            
            <div className="form-group">
              <label>저자</label>
              <input
                type="text"
                value={author}
                onChange={e => setAuthor(e.target.value)}
                placeholder="저자명"
              />
            </div>
            
            <div className="form-group">
              <label>출판년도</label>
              <input
                type="number"
                value={year}
                onChange={e => setYear(e.target.value)}
                placeholder="출판년도"
              />
            </div>
            
            <div className="form-group">
              <label>장르</label>
              <select value={genre} onChange={e => setGenre(e.target.value)}>
                <option value="">장르 선택</option>
                <option value="소설">소설</option>
                <option value="과학">과학</option>
                <option value="역사">역사</option>
                <option value="프로그래밍">프로그래밍</option>
                <option value="판타지">판타지</option>
                <option value="로맨스">로맨스</option>
                <option value="미스터리">미스터리</option>
              </select>
            </div>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="cancel-button" onClick={onClose}>
              취소
            </button>
            <button type="submit" className="submit-button">
              {book ? '수정' : '추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookModal;
