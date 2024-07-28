import { fetchData } from "./libs/fetch";
import { IBook, renderBooks } from "./types/entity";

const API_URL = "https://v1.appbackend.io/v1/rows/Yij1IroatbAJ";

interface IBookResult {
  data: IBook[];
}

async function loadBooks() {
  const loadbooks = await fetchData<IBookResult>(API_URL);
  if (!loadbooks) {
    console.log("Aplikasi error!");
    return;
  }
  renderBooks(loadbooks.data, bookList);
}

// async function renderBooks() {
//   const books = await fetchData<IBookResult>(API_URL);

//   if (!books) {
//     console.log("Aplikasi error!");
//     return;
//   }

//   books.data.map((book) => {
//     const newBook = document.createElement("div");
//     const newBookTitle = document.createElement("h2");
//     const newBookAuthor = document.createElement("h3");
//     const newBookSummary = document.createElement("p");

//     newBookTitle.textContent = book.title;
//     newBookAuthor.textContent = book.author;
//     newBookSummary.textContent = book.summary;

//     newBook.append(newBookTitle, newBookAuthor, newBookSummary);

//     document.body.append(newBook);
//   });
// }

loadBooks();

// Add a new book

const titleInput = document.getElementById("book-title") as HTMLInputElement;
const authorInput = document.getElementById("book-author") as HTMLInputElement;
const thumbnailInput = document.getElementById(
  "book-thumbnail"
) as HTMLInputElement;
const summaryInput = document.getElementById(
  "book-summary"
) as HTMLTextAreaElement;
const bookList = document.getElementById("book-list") as HTMLUListElement;
const submitBtn = document.getElementById("submitBtn");

submitBtn?.addEventListener("click", async () => {
  const title = titleInput.value;
  const author = authorInput.value;
  const thumbnail = thumbnailInput.value;
  const summary = summaryInput.value;

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ title, author, thumbnail, summary }]),
    });
  } catch (error) {
    console.log(error);
  } finally {
    window.location.reload();
  }
});

bookList.addEventListener("click", async (event) => {
  const target = event.target as HTMLElement;
  if (target.tagName === "BUTTON") {
    const id = target.dataset.id;
    try {
      await fetch(API_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([id]),
      });
    } catch (error) {
      console.log(error);
    } finally {
      target.parentElement?.remove();
      window.location.reload();
    }
  }
});
