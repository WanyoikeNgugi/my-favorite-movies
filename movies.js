let movies = [];

let movieform = document.getElementById("movieform");
let movieTable = document.createElement("table");
let movieTableHead = document.createElement("thead");
let movieTableHeadRow = document.createElement("tr");
let movieTableHeaderHeading1 = document.createElement("th");
let movieTableHeaderHeading2 = document.createElement("th");
let movieTableHeaderHeading3 = document.createElement("th");
let movieTableHeaderHeading4 = document.createElement("th");

movieTableHeaderHeading1.innerHTML = "Image";
movieTableHeaderHeading2.innerHTML = "Title";
movieTableHeaderHeading3.innerHTML = "Rating";
movieTableHeaderHeading4.innerHTML = "";

movieTable.setAttribute("class", "table table-striped");

movieTableHead.appendChild(movieTableHeadRow);

movieTableHeadRow.appendChild(movieTableHeaderHeading1);

movieTableHeadRow.appendChild(movieTableHeaderHeading2);

movieTableHeadRow.appendChild(movieTableHeaderHeading3);

movieTableHeadRow.appendChild(movieTableHeaderHeading4);

movieTable.appendChild(movieTableHead);

document.getElementById("table").appendChild(movieTable);

function createMovieCellElementsAndAttachEvents(row, title, img, rating) {
  let imgCell = document.createElement("td");
  let titleCell = document.createElement("td");
  let ratingCell = document.createElement("td");
  let deleteCell = document.createElement("td");
  let imageElement = document.createElement("img");
  let deleteButton = document.createElement("button");
  deleteButton.innerText = "X";
  deleteButton.classList.add("btn", "btn-sm", "btn-danger");
  Object.assign(deleteButton.style, {
    backgroundColor: "red",
    borderRadius: "5px",
    boxShadow: "20px 20px 60px #bebebe, -20px -20px 60px #ffffff",
  });

  addDeleteEvent(deleteButton);
  deleteCell.appendChild(deleteButton);
  deleteCell.classList.add("align-middle");

  setCellContent(
    titleCell,
    imgCell,
    ratingCell,
    imageElement,
    title,
    img,
    rating
  );
  addImageCellEvents(imgCell);
  row.appendChild(imgCell);
  row.appendChild(titleCell);
  row.appendChild(ratingCell);
  row.appendChild(deleteCell);
}

function setCellContent(
  titleCell,
  imageCell,
  ratingCell,
  imageEl,
  title,
  image,
  rating
) {
  imageEl.src = image;
  imageEl.alt = "image not found";
  imageEl.width = 70;
  imageEl.classList.add("img-thumbnail");

  titleCell.classList.add("align-middle");

  ratingCell.setAttribute("class", "align-middle");

  titleCell.innerHTML = title;

  let ratingSpanThumbsUp = document.createElement("span");
  ratingSpanThumbsUp.classList.add("fa");
  ratingSpanThumbsUp.classList.add("fa-thumbs-up");
  ratingSpanThumbsUp.style.padding = "10px";

  let ratingSpanThumbsDown = document.createElement("span");
  ratingSpanThumbsDown.classList.add("fa");
  ratingSpanThumbsDown.classList.add("fa-thumbs-down");

  let ratingSpanNumber = document.createElement("span");
  ratingSpanNumber.style.cssText = "font-size:20px;";
  ratingSpanNumber.innerHTML = rating;
  ratingSpanNumber.style.padding = "10px";

  increaseRating(ratingSpanThumbsUp);
  decreaseRating(ratingSpanThumbsDown);
  ratingCell.appendChild(ratingSpanThumbsUp);
  ratingCell.appendChild(ratingSpanThumbsDown);
  ratingCell.appendChild(ratingSpanNumber);

  imageCell.appendChild(imageEl);
}
const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];

function renderMovies() {
  storedMovies.forEach((movie) => {
    const movieRow = createMovieCellElementsAndAttachEvents(
      movie.title,
      movie.img,
      movie.rating
    );
    movieTable.appendChild(movieRow);
  });
}

window.onload = function () {
  renderMovies();
};

function hideShowElement(el) {
  if (el.style.display === "none") {
    el.style.display = "block";
  } else {
    el.style.display = "none";
  }
}

document.getElementById("new-movie").addEventListener("click", function () {
  let el = document.getElementById("new-movie-form");
  hideShowElement(el);
});

function addImageCellEvents(imgCell) {
  imgCell.addEventListener("mouseover", function () {
    imgCell.childNodes[0].width = 90;
  });
  imgCell.addEventListener("mouseout", function () {
    imgCell.childNodes[0].width = 70;
  });
}

function addDeleteEvent(button) {
  button.addEventListener("click", function (event) {
    let row = event.target.closest("tr");

    if (row) {
      movieTable.removeChild(row);
    }
  });
}

function increaseRating(ratingSpanThumbsUp) {
  ratingSpanThumbsUp.addEventListener("click", function (event) {
    let numberRating = ratingSpanThumbsUp.nextSibling.nextSibling;
    let newRating = Number(numberRating.innerHTML) + 1;
    numberRating.innerHTML = newRating;
  });
}

function decreaseRating(ratingSpanThumbsDown) {
  ratingSpanThumbsDown.addEventListener("click", function (event) {
    let numberRating = ratingSpanThumbsDown.nextSibling;
    let newRating = Number(numberRating.innerHTML) - 1;
    numberRating.innerHTML = newRating;
  });
}

let body = document.createElement("tbody");
movieTable.appendChild(body);
movies.forEach(function (movie) {
  let row = document.createElement("tr");
  createMovieCellElementsAndAttachEvents(
    row,
    movie.title,
    movie.img,
    movie.rating
  );
  body.appendChild(row);
});
const addMovie = (event) =>
  movieform.addEventListener("submit", function (event) {
    event.preventDefault();

    let imgsrc = movieform[0].value;
    let title = movieform[1].value;
    let rating = movieform[2].value;

    if (imgsrc == "" || title == "" || rating == "") {
      document.getElementById("status").innerHTML =
        "OOPS! Please fill in all the fields.";
    } else {
      document.getElementById("status").innerHTML = "";
      let row = document.createElement("tr");
      createMovieCellElementsAndAttachEvents(
        row,
        movieform[0].value,
        movieform[1].value,
        movieform[2].value
      );

      movieTable.insertBefore(row, movieTable.childNodes[0]);
      let newMovie = { title: title, img: imgsrc, rating: rating };
      storedMovies.push(newMovie);
      localStorage.setItem("movies", JSON.stringify(storedMovies));
      movieform.reset();

      movieform[0].value = "";
      movieform[1].value = "";
      movieform[2].value = "";

      hideShowElement(document.getElementById("new-movie-form"));
    }
  });
