let socket = io();

let connectionCount = document.getElementById('connection-count');
let statusMessage = document.getElementById('status-message');
let buttons = document.querySelectorAll('#choices button');
let voteCount = document.querySelectorAll('#votes-count li');
let voteCast = document.getElementById('vote-cast');


socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText);
  });
}

socket.on('voteSuccess', function (message) {
  voteCast.innerText = 'Good job - you voted for ' + message;
});

socket.on('voteCount', function (votes) {
  let array = Object.keys(votes);
  for (var i = 0; i < voteCount.length; i++) {
    voteCount[i].innerText = array[i] + ':' + votes[array[i]];
  }
});
