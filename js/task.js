import images from "./gallery-items.js";

const galleryRef = document.querySelector(".js-gallery");

// ДОБАВЛЕНИЕ РАЗМЕТКИ ВАРИАНТ 1
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
const createGalleryElements = (image) => {
  galleryRef.insertAdjacentHTML(
    "beforeend",
    `<li class="gallery__item"><a class="gallery__link" href=${image.original}><img class="gallery__image" src=${image.preview} data-source=${image.original} alt=${image.description}></a></li>`
  );
};

const galleryListing = images.forEach((image) => createGalleryElements(image));

let originalImgUrl = "";

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

galleryRef.addEventListener("click", getBigImgUrl);
closeBtn.addEventListener("click", closeModal);
overlayRef.addEventListener("click", onOverlayClick);
