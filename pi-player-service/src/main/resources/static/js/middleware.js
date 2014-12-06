//@prepros-append modules/functions.js
//@prepros-append modules/clientstore.js
//@prepros-append modules/client.js
//@prepros-append modules/song.js
//@prepros-append modules/playlist.js
//@prepros-append modules/socket.js


if(false){ //open dev

var SocketAbstract = function(url){
	this.socket = new SockJS(url);
	this.stompClient = Stomp.over(this.socket);
};
SocketAbstract.prototype.connect = function(fn){
	this.stompClient.connect({}, fn);
}
SocketAbstract.prototype.on = function(channel, fn){
	this.stompClient.subscribe(channel, fn(data));
}
var sck = new SocketAbstract(url);
sck.connect(function(frame){
	console.log('Connected: ' + frame);
	sck.on('/player/addSong', function(data){
		console.log(data);
		return JSON.parse(data.body).content;
	});
	
	stompClient.send('/app/addSong', {}, JSON.stringify({name: 'name'}));
});

Song = {
	id: 1,
	meta:{
		title: 'Somebody',
		artist: 'Avicii',
		duration: 129023, //in secs
		album: 'one',
		genre: 'classic'
	}
};
socket.on('playlistSent', function(data){
	curPlaylist = data.playlist;
});
socket.on('songsAdded', function(data){
	curPlaylist = data.playlist;
	curPlaylist.addSong()
});
socket.on('songsRemoved', function(data){
	curPlaylist = data.playlist;
});
socket.on('clientDisconnected', function(data){
	curPlaylist = data.playlist;
});
socket.on('uploadSong', function(data){
//	upload the song from the storage to the server
	var fReader = new FileReader();

	fReader.onload = function(e){
		socket.emit('upload', {songID: data.song.id, data: e.target.result});
	}
	
	cStore.load(data.song.id, function(file){
		fReader.readAsBinaryString(file);
	});
});
socket.on('songPlaying', function(data){
	curPlaylist = data.playlist;
});
socket.on('songPaused');
socket.on('songStopped');


socket.emit('getPlaylist', {});
socket.emit('addSong', {client: curClient, song: new Song('blob')});
socket.emit('removeSong', {client: curClient, song: playlist.getSong(anID)});
socket.emit('playCurrent', {client: curClient});
socket.emit('pauseCurrent', {client: curClient});
socket.emit('stopCurrent');
socket.emit('previousSong');
socket.emit('nextSong');
socket.emit('reorderPlaylist', {client: curClient, playlist: rePlaylist});
	
	
var stompClient = null;

function setConnected(connected) {
//		document.getElementById('connect').disabled = connected;
//		document.getElementById('disconnect').disabled = !connected;
//		document.getElementById('conversationDiv').style.visibility = connected ? 'visible' : 'hidden';
//		document.getElementById('response').innerHTML = '';
}

function connect() {
		var socket = new SockJS('/hello');
		stompClient = Stomp.over(socket);            
		stompClient.connect({}, function(frame) {
				setConnected(true);
				console.log('Connected: ' + frame);
				stompClient.subscribe('/topic/greetings', function(greeting){
						return JSON.parse(greeting.body).content;
				});
		});
}

function disconnect() {
		stompClient.disconnect();
		setConnected(false);
		console.log("Disconnected");
}

function sendName() {
		var name = document.getElementById('name').value;
		stompClient.send("/app/hello", {}, JSON.stringify({ 'name': name }));
}
	
//close dev	
}