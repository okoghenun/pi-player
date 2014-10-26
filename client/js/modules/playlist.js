var Playlist = function(playlist){
	this.songs = [];
	this.currentSongID = null;
	this.elapsedTime = 0; //
	this.currentEpochTime = new Date();
	this.isPlaying = false;
	$listContainer.empty();
	if(playlist){
		playlist.songs.forEach(function(elem){
			this.songs.push(new Song(elem));
		});
		this.currentSongID = playlist.currentSongID;
		this.isPlaying = !!playlist.isPlaying;
	}
};
Playlist.prototype.getSong = function(id){
	return this.songs.filter(function(a){
		return a.getID == id;
	})[0];
};
Playlist.prototype.addSong = function(song){
	if(song instanceof Array){
		this.songs.concat(song);
		song.forEach(function(song){
			this.songs.push(song);
			$listContainer.append(render('<li class="song row"><span class="small-4 columns song-title ellipsis">{title}</span><span class="small-4 columns song-length text-center">{duration}</span><span class="small-4 columns song-artist ellipsis">{artist}</span></li>', song));
		});
	}
	else{
		this.songs.push(song);
		$listContainer.append(render('<li class="song row"><span class="small-4 columns song-title ellipsis">{title}</span><span class="small-4 columns song-length text-center">{duration}</span><span class="small-4 columns song-artist ellipsis">{artist}</span></li>', song));
	}
};

var curPlaylist = new Playlist();