"use strict";

const url = "https://it-academy-js-api-zmicerboksha.vercel.app/api/course/books?size=20&page=0&orderBy=id,asc";

const pagesSelect = document.querySelector("#pagesSelect");
const inputSearch = document.querySelector(".input-search");
const buttonSearch = document.querySelector(".search");
const tBody = document.querySelector("tbody");
const thSortable = document.querySelectorAll(".sortable");
const ulItem = document.querySelector(".pagination");
let liItem

async function displayBooks(url) {
  const response = await fetch(url)
  const json = await response.json()
  const content = await json.content
  console.log(json)
  content.forEach(book => {

    let creatTr = document.createElement("tr");
    creatTr.classList.add("list")
    tBody.append(creatTr);

    let id = document.createElement("td");
    creatTr.append(id);
    id.innerHTML = `${book.id}`;

    let title = document.createElement("td");
    creatTr.append(title);
    title.innerHTML = `${book.title}`;

    let author = document.createElement("td");
    creatTr.append(author);
    author.innerHTML = `${book.author}`;

    let year = document.createElement("td");
    creatTr.append(year);
    year.innerHTML = `${book.year}`;

    let price = document.createElement("td");
    creatTr.append(price);
    price.innerHTML = `${book.price}`;

    let image = document.createElement("td");
    let img = document.createElement("img");
    img.setAttribute("src", `${book.imageLink}`);
    image.append(img);
    creatTr.append(image);

  });

  const totalPages = await json.totalPages
  for (let i = 0; i < totalPages; i++) {
    let creatLi = document.createElement("li");
    creatLi.classList.add("page-item");
    creatLi.innerHTML = `<a class="page-link"  href="#">${i + 1}</a>`;
    ulItem.append(creatLi);
  }

}

displayBooks(url)


function changeUrl() {

  displayBooks(
    `${url.slice(0, url.indexOf("size"))}&size=${pagesSelect.value}&page=${currentPage - 1}&search=${inputSearch.value}&orderBy=${whereSort},${howSort}`
  );
}
function removeItem() {
  let removeTr = document.querySelectorAll(".list");
  removeTr.forEach((el) => {
    el.remove();
  });
  liItem = document.querySelectorAll(".page-item");
  liItem.forEach((el) => {
    el.remove();
  });
}

pagesSelect.addEventListener("change", () => {
  removeItem();
  changeUrl();
});
buttonSearch.addEventListener("click", () => {
  removeItem();
  changeUrl();
});

let howSort = "asc"
let whereSort;

thSortable.forEach((e) => {

  e.addEventListener("click", (event) => {
    howSort = howSort === "asc" ? "desc" : "asc";
    whereSort = event.target.dataset.field;
    removeItem();
    changeUrl();
  });
});

let currentPage = 1;


ulItem.addEventListener("click", (event) => {
  currentPage = +event.target.innerHTML;
  removeItem();
  changeUrl();
});

