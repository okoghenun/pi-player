var url = 'http://192.168.43.49:8080/hello';
var socket = new SockJS(url);
stompClient = Stomp.over(socket);            
stompClient.connect({}, function(frame) {
	stompClient.subscribe('/player/songAdded', function(data){
		console.log(data);
		return JSON.parse(data.body).content;
	});
	stompClient.subscribe('/player/songRemoved', function(data){
		console.log(data);
		return JSON.parse(data.body).content;
	});
	stompClient.subscribe('/player/clientDisconnected', function(data){
		console.log(data);
		return JSON.parse(data.body).content;
	});
	stompClient.subscribe('/player/uploadSong', function(data){
		console.log(data);
		return JSON.parse(data.body).content;
	});
	stompClient.subscribe('/player/songPlaying', function(data){
		console.log(data);
		return JSON.parse(data.body).content;
	});
	stompClient.subscribe('/player/songPaused', function(data){
		console.log(data);
		return JSON.parse(data.body).content;
	});
	stompClient.subscribe('/player/songStopped', function(data){
		console.log(data);
		return JSON.parse(data.body).content;
	});
	
	
	stompClient.send('/app/addSong', {}, JSON.stringify({name: 'name'}));
});

//socket.on('playlistSent', function(data){
//	curPlaylist = data.playlist;
//});


$.subscribe('addedSong', function(e, data){
	var song = new Song(data.file);
	
	stompClient.send('/app/addSong', {}, JSON.stringify(song.toJSON()));
});
$.subscribe('removedSong', function(e, data){
	stompClient.send('/app/removeSong', {}, JSON.stringify({id: song.id}));
});
$.subscribe('playCurrent', function(e, data){
	stompClient.send('/app/playCurrent', {}, JSON.stringify({}));
});
$.subscribe('pauseCurrent', function(e, data){
	stompClient.send('/app/pauseCurrent', {}, JSON.stringify({}));
});
$.subscribe('stopCurrent', function(e, data){
	stompClient.send('/app/stopCurrent', {}, JSON.stringify({}));
});
$.subscribe('previousSong', function(e, data){
	stompClient.send('/app/removeSong', {}, JSON.stringify({}));
});
$.subscribe('nextSong', function(e, data){
	stompClient.send('/app/nextSong', {}, JSON.stringify({}));
});
$.subscribe('reorderPlaylist', function(e, data){
	stompClient.send('/app/reorderPlaylist', {}, JSON.stringify({}));
});
//socket.emit('getPlaylist', {});

