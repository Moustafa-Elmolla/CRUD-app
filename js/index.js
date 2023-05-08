// global .....
let siteName = document.getElementById('siteName'),
  siteUrl = document.getElementById('siteUrl'),
  btnAdd = document.getElementById('btnAdd'),
  btnUpdate = document.getElementById('btnUpdate'),
  searchBook = document.getElementById('searchBook'),
  alertName = document.getElementById('alertName'),
  alertUrl = document.getElementById('alertUrl'),
  alertExite = document.getElementById('alertExite'),
  booksContainer = [],
  bookIndex = 0

// when start...
if (getLocal() !== null) {
  booksContainer = getLocal()
  displayData()
}

// start events....
btnAdd.addEventListener("click", function () {
  addBook()
})
btnUpdate.addEventListener("click", function () {
  updateData()
})
searchBook.addEventListener('input', function () {
  searchData()
})

// start function
function addBook() {
  if (nameValidation() === true & urlValidation() === true) {
    let book = {
      name: siteName.value,
      url: siteUrl.value
    }
    booksContainer.push(book)
    displayData();
    setLocal();
    resetForm()
  }

}
function displayData() {

  let tableData = ``
  let term = searchBook.value.toLowerCase();
  for (let i = 0; i < booksContainer.length; i++) {
    if (booksContainer[i].name.toLowerCase().includes(term)) {
      tableData += `<tr>
      <td>${booksContainer[i].name.toLowerCase().replaceAll(term, `<span class="bg-info">${term}</span>`)}</td>
      <td>${booksContainer[i].url}</td>
      <td>
        <div>
          <a href="${booksContainer[i].url}" target="_blank" class="btn btn-outline-dark">
            <i class="fa-regular fa-eye"></i>
          </a>
          <button class="btn btn-outline-warning" onclick="setUpdateInput(${i})">
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
          <button class="btn btn-outline-danger" onclick="deleteRow(${i})">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>`
    }

  }
  document.getElementById('tableBody').innerHTML = tableData;
}
function deleteRow(index) {
  booksContainer.splice(index, 1)
  setLocal()
  displayData()
}
function setUpdateInput(index) {
  bookIndex = index;
  // console.log(booksContainer[index]);
  siteName.value = booksContainer[index].name;
  siteUrl.value = booksContainer[index].url;
  btnAdd.classList.add("d-none")
  btnUpdate.classList.remove("d-none")
}
function updateData() {
  let book = {
    name: siteName.value,
    url: siteUrl.value
  }
  booksContainer.splice(bookIndex, 1, book)
  displayData()
  setLocal()
  resetForm()
  btnUpdate.classList.add('d-none')
  btnAdd.classList.remove('d-none')
}
function searchData() {
  displayData()
}
function resetForm() {
  siteName.value = ''
  siteUrl.value = ''
}
function setLocal() {
  localStorage.setItem("booksContainer", JSON.stringify(booksContainer))
}
function getLocal() {
  return JSON.parse(localStorage.getItem("booksContainer"))
}
function nameValidation() {
  if (siteName.value == '') {
    alertName.classList.remove('d-none')
    return false;
  } else {
    alertName.classList.add('d-none')
    return true;
  }
}
function urlValidation() {
  if (siteUrl.value == '') {
    alertUrl.classList.remove('d-none')
    return false;
  } else {

    let isExite = false;
    for (let i = 0; i < booksContainer.length; i++) {
      if (booksContainer[i].url === siteUrl.value) {
        isExite = true;
      }
    }
    if (isExite === true) {
      alertExite.classList.remove('d-none')
      alertUrl.classList.add('d-none')
      return false
    } else {
      alertExite.classList.add('d-none')
    }
    alertUrl.classList.add('d-none')
    return true;
  }
}