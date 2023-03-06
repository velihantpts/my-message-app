let messageEl = document.getElementById("message_textarea");
let saveBtn = document.getElementById("save_btn");
let messageShowEl = document.getElementById("messageShow");
let favoriteShowEl = document.getElementById("favoriteShow");
renderMessages();


function renderMessages() {
  let messages = JSON.parse(localStorage.getItem("messages")) || [];

  messages.sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  let favoriteMessages = messages.filter((message) => message.favorite);
  let nonFavoriteMessages = messages.filter((message) => !message.favorite);

  let messageItems = nonFavoriteMessages.map((message, index) => {
    return `<div class="message-box alert alert-success mt-3 text-black fs-5">
          <div class="d-flex align-items-center justify-content-between">
            <h4 class="mb-0 p-3">${message.content}</h2>
            <div>
              <button class="btn btn-primary me-2 edit-btn" data-index="${index}">Düzenle</button>
              <button class="btn btn-danger delete-btn" data-index="${index}">Sil</button>
              <button class="btn btn-warning favorite-btn" data-index="${index}">${message.favorite ? 'Favorilerden Kaldır' : 'Favorilere Ekle'}</button>
            </div>
          </div>
          <div class="message-time">${message.timestamp}</div>
        </div>`;
  });
  messageShowEl.innerHTML = messageItems.join("");

  let favoriteItems = favoriteMessages.map((message, index) => {
    return `<div class="message-box alert alert-warning mt-3 text-black fs-5">
          <div class="d-flex align-items-center justify-content-between">
            <h4 class="mb-0 p-3">${message.content}</h2>
            <div>
              <button class="btn btn-primary me-2 edit-btn" data-index="${index}" disabled>Düzenle</button>
              <button class="btn btn-danger delete-btn" data-index="${index}">Sil</button>
              <button class="btn btn-warning favorite-btn" data-index="${index}">${message.favorite ? 'Favorilerden Kaldır' : 'Favorilere Ekle'}</button>
            </div>
          </div>
          <div class="message-time">${message.timestamp}</div>
        </div>`;
  });
  favoriteShowEl.innerHTML = favoriteItems.join("");

  let editBtns = document.querySelectorAll(".edit-btn");
  editBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let index = e.target.getAttribute("data-index");
      let message = messages[index];
      // Burada mesaj kutusunu düzenlemek için gerekli işlemleri yapabilirsiniz
    });
  });

  let deleteBtns = document.querySelectorAll(".delete-btn");
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let index = e.target.getAttribute("data-index");
      if (confirm("Bu mesajı silmek istediğinizden emin misiniz?")) {
        messages.splice(index, 1);
        localStorage.setItem("messages", JSON.stringify(messages));
        renderMessages();
      }
    });
  });

  let favoriteBtns = document.querySelectorAll(".favorite-btn");
  favoriteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let index = e.target.getAttribute("data-index");
      let messages = JSON.parse(localStorage.getItem("messages")) || [];
      let message = messages[index];
      message.favorite = !message.favorite; // toggle the favorite state of the message
      localStorage.setItem("messages", JSON.stringify(messages));
      renderMessages();
    });
  });}

  function addMessage(message) {
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    let now = new Date();
  
    let dayAndMonth = now.toLocaleDateString('tr-TR', {day: 'numeric', month: 'long'});
    message.timestamp = dayAndMonth;
    messages.push(message);
    localStorage.setItem("messages", JSON.stringify(messages));
    renderMessages();
  }
  
  saveBtn.addEventListener("click", () => {
    let messageElValue = messageEl.value.trim();
    console.log(messageElValue);
    let message = {
      content: messageElValue
    };
    addMessage(message);
    messageEl.value = "";
  });
  