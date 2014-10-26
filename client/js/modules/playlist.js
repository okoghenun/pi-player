var Playlist = function(){
	this.songs = [];
	this.currentSong = new Song();
	this.elapsedTime = 0; //
	this.currentEpochTime = new Date();
	this.isPlaying = false;
};
Playlist.prototype.getSong = function(id){
	return this.songs.filter(function(a){
		return a.getID == id;
	})[0];
};
Playlist.prototype.addSong = function(song){
	if(song instanceof Array){
		this.songs.concat(song);
	}
	else{
		this.songs.push(song);
	}
};

var curPlaylist = new Playlist();