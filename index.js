
document.getElementById('bookmarkForm').addEventListener('submit', addBookmark);

function addBookmark(e) {
  e.preventDefault();

  const name = document.getElementById('bookmarkName').value;
  const url = document.getElementById('bookmarkUrl').value;

  const bookmark = { name, url };

  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  document.getElementById('bookmarkForm').reset();
  displayBookmarks();
}

function displayBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  const bookmarksList = document.getElementById('bookmarksList');
  
  bookmarksList.innerHTML = '';

  bookmarks.forEach((bookmark, index) => {
    const bookmarkCard = document.createElement('div');
    bookmarkCard.classList.add('bookmark');

    const title = document.createElement('a');
    title.href = bookmark.url;
    title.target = '_blank';
    title.textContent = bookmark.name;

    const urlLink = document.createElement('a');
    urlLink.href = bookmark.url;
    urlLink.target = '_blank';
    urlLink.textContent = bookmark.url;

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');

    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editBookmark(index);
  

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteBookmark(index);

    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(deleteButton);

    bookmarkCard.appendChild(title);
    bookmarkCard.appendChild(urlLink);
    bookmarkCard.appendChild(buttonsDiv);

    bookmarksList.appendChild(bookmarkCard);
  });
}

function editBookmark(index) {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  const bookmark = bookmarks[index];
  
  document.getElementById('bookmarkName').value = bookmark.name;
  document.getElementById('bookmarkUrl').value = bookmark.url;
  
  bookmarks.splice(index, 1);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  displayBookmarks();
}

function deleteBookmark(index) {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  bookmarks.splice(index, 1);
  
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  displayBookmarks();
}
displayBookmarks();

