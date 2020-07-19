window.addEventListener("chatId",setup1);

let sendBtn, message, socket, msgBoard;

function setup1(){
    socket = io(`http://localhost:3000/${chatId}`);
    sendBtn = document.querySelector("#send");
    message = document.querySelector("#message");
    msgBoard = document.querySelector("#container > main > div.chatbox > div > div > div > div");
    console.log(msgBoard)
    sendBtn.addEventListener("click", messageSend);
    socket.on("chat message", recievedMsg);
}

function messageSend() {
    if (message.value.length == 0) return;
    socket.emit('chat message', {"author":"you","msg":message.value});
}

function recievedMsg(letter){
    recieverDivCons(letter);
}



function recieverDivCons({msg, author}) {
    let div = `<div class="received-chats"> 
    <div class="received-msg">
        <div class="received-msg-inbox">
            <p>${msg}</p>
            <span class="them-chat">${author}</span>
        </div>
        </div>
    </div>`
    msgBoard.insertAdjacentHTML("beforeend",div.trim());
}

