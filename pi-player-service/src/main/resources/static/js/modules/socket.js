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
		$.ajax({
			url: base + 'songs/upload',
			data: uploadData,
			cache: false,
			contentType: false,
			processData: false,
			type: 'POST',
			success: function(data){
				console.log(data);
			}
		});
		return result.content;
	});
	stompClient.subscribe('/player/songPlaying', function(data){
		var result = JSON.parse(data.body);
		curPlaylist.setPlaying(result.id, true);
		return result.content;
	});
	stompClient.subscribe('/player/songPaused', function(data){
		var result = JSON.parse(data.body); 
		curPlaylist.setPlaying(result.id, false);
		return result.content;
	});
	stompClient.subscribe('/player/songStopped', function(data){
		var result = JSON.parse(data.body); 
		return result.content;
	});
	
	
//	stompClient.send('/app/addSong', {}, JSON.stringify({name: 'name'}));
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
		var uploadData = new FormData();
		uploadData.append('id', this.id);
		uploadData.append('file', this.file);
		$.ajax({
			url: base + 'songs/upload',
			data: uploadData,
			cache: false,
			contentType: false,
			processData: false,
			type: 'POST',
			success: function(data){
				console.log(data);
			}
		});
//		$.post(base + 'songs/upload', uploadData);
		
	});
//	var song = new Song(data.file);
});
$.subscribe('removeSong', function(e, data){
	stompClient.send('/app/removeSong', {}, JSON.stringify({id: song.id}));
});
$.subscribe('playSong', function(e, data){
	stompClient.send('/app/playSong', {}, JSON.stringify({}));
});
$.subscribe('pauseSong', function(e, data){
	stompClient.send('/app/pauseSong', {}, JSON.stringify({}));
});
$.subscribe('stopSong', function(e, data){
	stompClient.send('/app/stopSong', {}, JSON.stringify({}));
});
$.subscribe('previousSong', function(e, data){
	stompClient.send('/app/previousSong', {}, JSON.stringify({}));
});
$.subscribe('nextSong', function(e, data){
	stompClient.send('/app/nextSong', {}, JSON.stringify({}));
});
$.subscribe('reorderPlaylist', function(e, data){
	stompClient.send('/app/reorderPlaylist', {}, JSON.stringify({}));
});
//socket.emit('getPlaylist', {});



$addButton.on('change', function(e){
	$.publish('addedSong', {files: e.target.files});
});

//$listContainer.on('click', '.remove-item', function(e){
//	$.publish('removeSong', {songID: $(this).data('id')});
//});
$playButton.on('click', function(e){
	e.preventDefault();
	$.publish('playSong');
});
$pauseButton.on('click', function(e){
	e.preventDefault();
	$.publish('pauseSong');
});
$prevButton.on('click', function(e){
	e.preventDefault();
	$.publish('previousSong');
});
$nextButton.on('click', function(e){
	e.preventDefault();
	$.publish('nextSong');
});