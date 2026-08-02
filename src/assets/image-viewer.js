(() => {
  const dialog = document.querySelector("[data-image-dialog]");
  const dialogImage = document.querySelector("[data-image-dialog-content]");
  const closeButton = document.querySelector("[data-image-close]");

  if (!dialog || !dialogImage || !closeButton || typeof dialog.showModal !== "function") {
    return;
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-image-viewer]");
    if (!link) return;

    const image = link.querySelector("img");
    if (!image) return;

    event.preventDefault();
    dialogImage.src = link.href;
    dialogImage.alt = image.alt;
    dialog.showModal();
  });

  const close = () => {
    dialog.close();
    dialogImage.removeAttribute("src");
    dialogImage.alt = "";
  };

  closeButton.addEventListener("click", close);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) close();
  });
});
