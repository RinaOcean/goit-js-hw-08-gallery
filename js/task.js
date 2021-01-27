import images from "./gallery-items.js";

// ДОБАВЛЕНИЕ РАЗМЕТКИ ВАРИАНТ 1
// const galleryRef = document.querySelector(".js-gallery");

// const createGalleryElements = (image) => {
//   const listRef = document.createElement("li");
//   listRef.classList.add("gallery__item");
//   const linkRef = document.createElement("a");
//   linkRef.classList.add("gallery__link");
//   linkRef.setAttribute("href", `${image.original}`);
//   const imgRef = document.createElement("img");
//   imgRef.classList.add("gallery__image");
//   imgRef.setAttribute("src", `${image.preview}`);
//   imgRef.dataset.source = `${image.original}`;
//   imgRef.setAttribute("alt", `${image.description}`);

//   linkRef.appendChild(imgRef);
//   listRef.appendChild(linkRef);
//   return listRef;
// };

// const galleryListing = images.map((image) => createGalleryElements(image));

// galleryRef.append(...galleryListing);
// ---------------------------------------------------------------------------------
// ДОБАВЛЕНИЕ РАЗМЕТКИ ВАРИАНТ 2
const galleryRef = document.querySelector(".js-gallery");

const createGalleryElements = (image, indx) => {
  galleryRef.insertAdjacentHTML(
    "beforeend",
    `<li class="gallery__item"><a class="gallery__link" href=${image.original}><img class="gallery__image" src=${image.preview} data-source=${image.original} data-index=${indx} alt='${image.description}'></a></li>`
  );
};

const galleryListing = images.forEach((image, indx) =>
  createGalleryElements(image, indx)
);

let originalImgUrl = "";
let imgActiveIndx;

const getBigImgUrl = (event) => {
  event.preventDefault();
  originalImgUrl = event.target.dataset.source;
  openModal();
};

const lightboxRef = document.querySelector(".js-lightbox");
const lightboxImgRef = document.querySelector(".js-lightbox .lightbox__image");
const closeBtn = document.querySelector('[data-action="close-lightbox"]');
const overlayRef = lightboxRef.querySelector(".lightbox__overlay");

const openModal = () => {
  window.addEventListener("keydown", onEscPress);

  lightboxImgRef.setAttribute("src", `${originalImgUrl}`);
  lightboxRef.classList.toggle("is-open");
  imgActiveIndx = +event.target.dataset.index;
  window.addEventListener("keydown", onRightPress);
  window.addEventListener("keydown", onLeftPress);
};

const closeModal = () => {
  window.removeEventListener("keydown", onEscPress);
  lightboxRef.classList.toggle("is-open");
  lightboxImgRef.setAttribute("src", "");
};

const onOverlayClick = (event) => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
};

const onEscPress = (event) => {
  if (event.code === "Escape") {
    closeModal();
  }
};

const onRightPress = (event) => {
  if (event.code === "ArrowRight") {
    lightboxImgRef.setAttribute("src", `${images[imgActiveIndx + 1].original}`);
    imgActiveIndx += 1;
  }
  if (imgActiveIndx >= images.length - 1) {
    window.removeEventListener("keydown", onRightPress);
    window.addEventListener("keydown", onLeftPress);
  }
  if (imgActiveIndx < images.length - 1) {
    window.addEventListener("keydown", onRightPress);
  }
  console.log(imgActiveIndx);
};

const onLeftPress = (event) => {
  if (event.code === "ArrowLeft") {
    lightboxImgRef.setAttribute("src", `${images[imgActiveIndx - 1].original}`);
    imgActiveIndx -= 1;
  }
  if (imgActiveIndx === 0) {
    window.removeEventListener("keydown", onLeftPress);
    window.addEventListener("keydown", onRightPress);
  }
  if (imgActiveIndx > 0) {
    window.addEventListener("keydown", onLeftPress);
  }
  console.log(imgActiveIndx);
};

galleryRef.addEventListener("click", getBigImgUrl);
closeBtn.addEventListener("click", closeModal);
overlayRef.addEventListener("click", onOverlayClick);
