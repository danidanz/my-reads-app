export interface IBook {
  _id: string;
  title: string;
  author: string;
  summary: string;
  thumbnail: string;
  createdAt: number;
}

export function renderBooks(books: IBook[], container: HTMLElement) {
  books.forEach((book) => {
    const bookItem = document.createElement("li");
    bookItem.className = "book-item";
    bookItem.innerHTML = `
      <img src="${book.thumbnail}" alt="${book.title}">
      <div class="book-info">
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p>${book.summary}</p>
      </div>
      <button data-id="${book._id}">Delete</button>
    `;
    container.appendChild(bookItem);
  });
}
