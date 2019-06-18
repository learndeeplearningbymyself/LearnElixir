import {Socket} from "phoenix"

let socket = new Socket("/socket", {params: {token: window.userToken}})

socket.connect()

// Join a channel matching "comments:1"
// Open a connection to communicate with server

const createSocket = (topicId) => {
  let channel = socket.channel(`comments:${topicId}`, {});

  channel.join()
    .receive("ok", resp => { console.log("Joined successfully", resp) })
    .receive("error", resp => { console.log("Unable to join", resp) });

  document.querySelector('button').addEventListener('click', () => {
    const content = document.querySelector('textarea').value;

    channel.push('comments:add', {content: content});
  });
}

window.createSocket = createSocket;
