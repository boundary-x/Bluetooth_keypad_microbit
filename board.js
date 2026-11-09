const boardSelect=document.getElementById("board-select");
const boardPicker=document.querySelector(".board-picker");
let boardFeedbackTimer;
function updateBoardLogo(animate=false){
 document.querySelectorAll("[data-logo]").forEach(logo=>logo.classList.toggle("is-active",logo.dataset.logo===selectedBoard));
 if(!animate)return;
 clearTimeout(boardFeedbackTimer);
 boardPicker.classList.remove("board-changed");
 void boardPicker.offsetWidth;
 boardPicker.classList.add("board-changed");
 document.getElementById("board-feedback").textContent=(selectedBoard==="microbit"?"micro:bit":"ESP32")+" 선택됨";
 boardFeedbackTimer=setTimeout(()=>boardPicker.classList.remove("board-changed"),650);
}
boardSelect.addEventListener("change",()=>{
 const before=selectedBoard;
 selectBoard(boardSelect.value);
 boardSelect.value=selectedBoard;
 updateBoardLogo(before!==selectedBoard);
});
window.addEventListener("load",()=>{boardSelect.value=selectedBoard;connectionControls();updateBoardLogo();});
