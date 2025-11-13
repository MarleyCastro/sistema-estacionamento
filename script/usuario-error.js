let openBtn = document.getElementById('openModal');
let closeBtn = document.getElementById('closeModal');
let modal = document.getElementById('modal');

openBtn.addEventListener("click", () => {
    modal.classList.add("open");
});

closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
});