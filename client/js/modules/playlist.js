var Playlist = function(playlist){
	this.songs = [];
	this.currentSongID = null;
	this.elapsedTime = 0; //
	this.currentEpochTime = new Date();
	this.isPlaying = false;
	$listContainer.empty();
	$nowPlayingContainer.hide();
	if(playlist){
		playlist.songs.forEach(function(elem){
			var el = new Song(elem);
			this.songs.push(el);
			this.renderSong(el);
		});
		this.currentSongID = playlist.currentSongID;
		this.isPlaying = !!playlist.isPlaying;
		if(this.isPlaying)$nowPlayingContainer.show();
	}
};
Playlist.prototype.getSong = function(id){
	return this.songs.filter(function(a){
		return a.getID == id;
	})[0];
};
Playlist.prototype.addSong = function(song){
	if(song instanceof Array){
//		this.songs.concat(song);
		song.forEach(function(song){
			this.songs.push(song);
			this.renderSong(song);
		});
	}
	else{
		this.songs.push(song);
		this.renderSong(song);
	}
};
Playlist.prototype.renderSong = function(song){
	var getDuration = function(duration){
		var dWhole = Math.floor(song.duration / 60);
		var dRem = '' + Math.round(((song.duration/60) - dWhole)*60);
		dRem = (dRem.length<2)? '0' + dRem: dRem;
		return dWhole + ':' + dRem;
	}
	song.duration = getDuration(song.duration);
	$listContainer.append(render(songItemTemplate, song));
}
Playlist.prototype.setPlaying = function(playing){
	this.isPlaying = playing;
	if(this.isPlaying)$nowPlayingContainer.show();
}
var curPlaylist = new Playlist();