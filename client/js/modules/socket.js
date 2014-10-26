//var base = 'http://192.168.43.49:8080';
var base = '';
var url = base + '/hello';
var socket = new SockJS(url);

$.getJSON(base + '/songs/index', function(data){
	console.log(data);
	curPlaylist = new Playlist(data);
});

stompClient = Stomp.over(socket);            
stompClient.connect({}, function(frame) {
	stompClient.subscribe('/player/songAdded', function(data){
		var result = JSON.parse(data.body);
		console.log(result);
		
		curPlaylist.addSong(new Song(result));
		var getDuration = function(duration){
			var dWhole = Math.floor(result.duration / 60);
			var dRem = '' + Math.round(((result.duration/60) - dWhole)*60);
			dRem = (dRem.length<2)? '0' + dRem: dRem;
			return dWhole + ':' + dRem;
		}
		result.duration = getDuration(result.duration);
//		return result.content;
		$('.song').last().after();
	});
	stompClient.subscribe('/player/songRemoved', function(data){
		var result = JSON.parse(data.body); 
		return result.content;
	});
	stompClient.subscribe('/player/clientDisconnected', function(data){
		var result = JSON.parse(data.body); 
		return result.content;
	});
	stompClient.subscribe('/player/uploadSong', function(data){
		var result = JSON.parse(data.body);
		var uploadData = new FormData();
		uploadData.append('id', result.songID);
		uploadData.append('file', curPlaylist.getSong(result.songID));
		$.post('songs/upload', uploadData);
		return result.content;
	});
	stompClient.subscribe('/player/songPlaying', function(data){
		var result = JSON.parse(data.body); 
		return result.content;
	});
	stompClient.subscribe('/player/songPaused', function(data){
		var result = JSON.parse(data.body); 
		return result.content;
	});
	stompClient.subscribe('/player/songStopped', function(data){
		var result = JSON.parse(data.body); 
		return result.content;
	});
	
	
	stompClient.send('/app/addSong', {}, JSON.stringify({name: 'name'}));
});

//socket.on('playlistSent', function(data){
//	curPlaylist = data.playlist;
//});


$.subscribe('addedSong', function(e, data){
//	var songs = [];
	console.log(data);
//	for(var i = 0; i < data.files.length; i++){
//		songs.push(new Song(data.files[i], function(){
//			this.toJSON();
//			console.log(this.meta);
//		}));
//	}
	
	var song = new Song(data.files[0], function(){
		console.log(this.toJSON());
		stompClient.send('/app/addSong', {}, JSON.stringify(this.toJSON()));
	});
//	var song = new Song(data.file);
});
$.subscribe('removedSong', function(e, data){
	stompClient.send('/app/removeSong', {}, JSON.stringify({id: song.id}));
});
$.subscribe('playCurrent', function(e, data){
	stompClient.send('/app/playSong', {}, JSON.stringify({}));
});
$.subscribe('pauseCurrent', function(e, data){
	stompClient.send('/app/pauseSong', {}, JSON.stringify({}));
});
$.subscribe('stopCurrent', function(e, data){
	stompClient.send('/app/stopSong', {}, JSON.stringify({}));
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

