const socket = io("ws://localhost:8080");

document.querySelector("#btn-name").onclick = () => {
  let uName = document.querySelector("#txt-name").value;
  localStorage.setItem("user", uName);

  $("#myModal").modal("hide");
};

// step 1: take chat and send it to server
document.getElementById("btn-send").onclick = () => {
  let message = document.getElementById("txt-send").value;
  let userName = localStorage.getItem("user");
  socket.emit("client-chat", { message, userName });
};

// step 3: client receives event from server and render data onto UI
socket.on("from-server", ({ message, userName }) => {
  let uName = localStorage.getItem("user");
  let content = "";
  if (userName == uName) {
    content = `
        <li class="clearfix">
            <div class="message-data text-right">
                <span class="message-data-time">${uName}</span>
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar">
            </div>
            <div class="message other-message float-right">${message}</div>
        </li> `;
  } else {
    content = `
        <li class='clearfix'>
            <div class='message-data'>
                <span class='message-data-time'>${userName}</span>
            </div>
            <div class='message my-message'>${message}</div>
        </li>`;
  }
  // render chat onto UI
  document.getElementById("noiDung").innerHTML += content;
});

// document.querySelector("#btn-send").onclick = () => {
//     let mess = document.querySelector("#txt-send").value;
//     let uName = localStorage.getItem("user");

//     socket.emit("client-chat", { mess, uName, room: localStorage.getItem("room") });

// }

// document.querySelector("#room-1").onclick = () => {
//     localStorage.setItem("room", "room-1")

//     socket.emit("join", "room-1");

//     document.querySelector("#title-room").innerHTML = "Room 1";

//     document.querySelector("#noiDung").innerHTML = "";
// }

// document.querySelector("#room-2").onclick = () => {
//     localStorage.setItem("room", "room-2")
//     socket.emit("join", "room-2");

//     document.querySelector("#title-room").innerHTML = "Room 2";
//     document.querySelector("#noiDung").innerHTML = "";

// }
// document.querySelector("#room-3").onclick = () => {
//     localStorage.setItem("room", "room-3")

//     socket.emit("join", "room-3");

//     document.querySelector("#title-room").innerHTML = "Room 3";
//     document.querySelector("#noiDung").innerHTML = "";

// }

// socket.on("data-chat", (data) => {
//     let uName = localStorage.getItem("user");
//     let noiDung = "";

//     if (uName == data.uName) {
//         noiDung = `
//         <li class="clearfix">
//         <div class="message-data text-right">
//             <span class="message-data-time">${data.uName}</span>
//             <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar">
//         </div>
//         <div class="message other-message float-right">${data.mess} </div>
//     </li>
//         `
//     }
//     else {
//         noiDung = `
//         <li class="clearfix">
//         <div class="message-data">
//             <span class="message-data-time">${data.uName}</span>
//         </div>
//         <div class="message my-message">${data.mess}</div>
//     </li>
//         `
//     }

//     document.querySelector("#noiDung").innerHTML += noiDung;
// })
