
let books = JSON.parse(localStorage.getItem('books')) || [];

const booksContainer = document.querySelector('.books-container');
const addBtn = document.querySelector('.btn-add');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('.book-form');

function renderBooks() {
    booksContainer.innerHTML = '';
    books.forEach((book, index) => {
        booksContainer.innerHTML += `
        <div class="book">
            <h2 class="book-title">‘‘ ${book.title} ’’</h2>
            <span class="book-author">By ${book.author}</span>
            <span class="book-pages">${book.pages} Pages</span>
            <div class="group-btn">
                <button class="btn ${book.isRead ? 'btn-green' : 'btn-red'}" data-index="${index}" data-action="toggle">
                    ${book.isRead ? 'Read' : 'Not read'}
                </button>
                <button class="btn" data-index="${index}" data-action="remove">Remove</button>
            </div>
        </div>
        `;
    });

   
    document.querySelectorAll('.group-btn .btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const i = e.target.dataset.index;
            const action = e.target.dataset.action;
            if (action === 'toggle') {
                books[i].isRead = !books[i].isRead;
            } else if (action === 'remove') {
                books.splice(i, 1);
            }
            localStorage.setItem('books', JSON.stringify(books)); 
            renderBooks();
        });
    });
}


addBtn.addEventListener('click', () => {
    form.reset();
    overlay.classList.add("active");
});


overlay.addEventListener('click', () => {
    overlay.classList.remove("active");
});


form.addEventListener('click', (e) => {
    e.stopPropagation();
});


form.addEventListener('submit', e => {
    e.preventDefault();
    const inputs = form.querySelectorAll('input');
    books.push({
        title: inputs[0].value,
        author: inputs[1].value,
        pages: inputs[2].value,
        isRead: inputs[3].checked,
    });
    localStorage.setItem('books', JSON.stringify(books));
    form.reset();
    overlay.classList.remove("active");
    renderBooks();
});


renderBooks();
