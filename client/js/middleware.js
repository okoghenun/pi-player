
var guid = function(){
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
};

var getMeta = function(){
	
};


// Allow for vendor prefixes.
window.requestFileSystem = window.requestFileSystem ||
                           window.webkitRequestFileSystem;
var ClientStore = function(){
	if (window.requestFileSystem){
		var self = this;
		self.filesystem = null;
		
		navigator.webkitPersistentStorage.requestQuota(1024 * 1024 * 5, function(grantedSize) {
			// Request a file system with the new size.
			window.requestFileSystem(window.PERSISTENT, grantedSize, function(fs) {
				// Set the filesystem variable.
				self.filesystem = fs;

				// Setup event listeners on the form.
//				setupFormEventListener();

				// Update the file browser.
				self.getList();

			}, self.errorHandler);

		}, self.errorHandler);
	}
	else{
		console.error('Sorry! Your browser doesn\'t support the FileSystem API :(');
	}
};
ClientStore.prototype.errorHandler = function(error){
	var message = '';
	switch (error.code) {
		case FileError.SECURITY_ERR:
			message = 'Security Error';
			break;
		case FileError.NOT_FOUND_ERR:
			message = 'Not Found Error';
			break;
		case FileError.QUOTA_EXCEEDED_ERR:
			message = 'Quota Exceeded Error';
			break;
		case FileError.INVALID_MODIFICATION_ERR:
			message = 'Invalid Modification Error';
			break;
		case FileError.INVALID_STATE_ERR:
			message = 'Invalid State Error';
			break;
		default:
			message = 'Unknown Error';
			break;
	}
	console.log(message);
};
ClientStore.prototype.save = function(filename, content, mimeType){
	var self = this;
	var mType = mimeType || 'audio/mpeg'; //'text/plain'
	
	self.filesystem.root.getFile(filename, {create: true}, function(fileEntry) {

    fileEntry.createWriter(function(fileWriter) {

      fileWriter.onwriteend = function(e) {
        // Update the file browser.
        self.getList();
      };

      fileWriter.onerror = function(e) {
        console.error('Write error: ' + e.toString());
      };
      var contentBlob = new Blob([content], {type: mType});

      fileWriter.write(contentBlob);
    }, self.errorHandler);

  }, self.errorHandler);
};
ClientStore.prototype.load = function(filename, fn) {
	var self = this;
	fn = fn || function(){};
  self.filesystem.root.getFile(filename, {}, function(fileEntry) {
    fileEntry.file(function(file) {
			fn(file);
    }, self.errorHandler);
  }, self.errorHandler);
};
ClientStore.prototype.delete = function(filename, fn) {
	var self = this;
	fn = fn || function(){};
  self.filesystem.root.getFile(filename, {create: false}, function(fileEntry) {

    fileEntry.remove(function(e) {
      // Update the file browser.
      self.getList();
			fn(true);
    }, self.errorHandler);

  }, self.errorHandler);
};
ClientStore.prototype.getList = function(fn){
	var self = this;
	fn = fn || function(){};
  var dirReader = self.filesystem.root.createReader();
  var entries = [];

  var fetchEntries = function() {
    dirReader.readEntries(function(results) {
      if (!results.length) {
				fn(entries);
				return entries;
      } else {
        entries = entries.concat(results);
        fetchEntries();
      }
    }, self.errorHandler);
  };

  fetchEntries();
};

var cStore = new ClientStore();

	
var Client = function(){
	this.id = 'c' + guid();
};

var curClient = new Client();

var Song = function(){
	this.id = 's' + guid();
	this.meta = {};
};
Song.prototype.getID = function(){
	return this.id;
};

var Playlist = function(){
	this.songs = [];
	this.currentSong = new Song();
	this.elapsedTime = 0; //
	this.currentEpochTime = new Date();
};
Playlist.prototype.getSong = function(id){
	return this.songs.filter(function(a){
		return a.getID == id;
	})[0];
};
Playlist.prototype.addSong = function(song){
	this.songs.push(song);
};
Playlist.prototype.isPlaying = function(){
	
};

var curPlaylist = new Playlist();

var dev = false;
if(dev){ //open dev

Song = {
	id: 1,
	meta:{
		title: 'Somebody',
		artist: 'Avicii',
		duration: 129023, //in secs
		album: 'one',
		genre: 'classic'
	},
	inMemory: true
};
socket.on('playlistSent', function(data){
	curPlaylist = data.playlist;
});
socket.on('songsAdded', function(data){
	curPlaylist = data.playlist;
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
	
//close dev	
}