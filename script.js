//search input on books.html
  document.getElementById('search-input').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const books = document.querySelectorAll('[data-title]');
    const noResults = document.getElementById('no-results');

    let matchCount = 0;

    books.forEach(book => {
      const title = book.getAttribute('data-title').toLowerCase();
      const author = book.getAttribute('data-author').toLowerCase();
      const price = book.getAttribute('data-price');

      const matches = title.includes(query) || author.includes(query) || price.includes(query);
      book.style.display = matches ? 'block' : 'none';

      if (matches) matchCount++;
    });

    noResults.classList.toggle('hidden', matchCount > 0);
  });


//search input on other pages

  document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('search')?.toLowerCase() || '';
    const searchInput = document.getElementById('search-input');

    if (searchInput) {
      searchInput.value = query;
    }

    const books = document.querySelectorAll('[data-title]');
    const noResultMessage = document.getElementById('no-results');

    let resultsFound = false;

    books.forEach(book => {
      const title = book.getAttribute('data-title').toLowerCase();
      const author = book.getAttribute('data-author').toLowerCase();
      const price = book.getAttribute('data-price');

      const matches = title.includes(query) || author.includes(query) || price.includes(query);

      if (matches) {
        book.style.display = 'block';
        resultsFound = true;
      } else {
        book.style.display = 'none';
      }
    });

    noResultMessage.style.display = resultsFound ? 'none' : 'block';
  });




//add to cart
function addToCart(bookElement) {
  const title = bookElement.dataset.title;
  const author = bookElement.dataset.author;
  const price = parseFloat(bookElement.dataset.price);
  const img = bookElement.querySelector('img').src;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.title === title);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ title, author, price, img, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Book added to cart!");
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = totalCount;
}

document.addEventListener("DOMContentLoaded", updateCartCount);




//add to cart on other pages

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = totalCount;
}

document.addEventListener("DOMContentLoaded", updateCartCount);


