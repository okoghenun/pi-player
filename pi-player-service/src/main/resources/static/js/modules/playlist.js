var Playlist = function(playlist){
	var self = this;
	this.songs = [];
	this.currentSongID = null;
	this.elapsedTime = 0;
	this.totalSongTime = 0;
	this.currentEpochTime = new Date();
	this.isPlaying = false;
	this.playInterval = null;
	$listContainer.empty();
	$nowPlayingContainer.hide();
	if(playlist){
		playlist.songs.forEach(function(elem){
			var el = new Song(elem);
			self.songs.push(el);
			self.renderSong(el);
		});
		this.currentSongID = playlist.currentSongID;
		this.isPlaying = !!playlist.isPlaying;
		this.setControlsUI();
	}
};
Playlist.prototype.getSong = function(id){
	return this.songs.filter(function(a){
		return a.getID == id;
	})[0];
};
Playlist.prototype.addSong = function(song){
	var self = this;
	if(song instanceof Array){
//		this.songs.concat(song);
		song.forEach(function(song){
			self.songs.push(song);
			self.renderSong(song);
		});
	}
	else{
		self.songs.push(song);
		self.renderSong(song);
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
};
Playlist.prototype.setPlaying = function(id, playing){
	this.isPlaying = playing || this.isPlaying;
	this.currentSongID = id;
	this.setControlsUI();
};
Playlist.prototype.setControlsUI = function(){
	if(this.isPlaying){
//		$nowPlayingContainer.show();
		$playButton.hide();
		$pauseButton.show();
		this.playInterval = setInterval(function(){
			if(this.elapsedTime<this.totalSongTime){
				$meter.width((this.elapsedTime/this.totalSongTime)*100);
				this.elapsedTime++;
			}
			else{
				this.elapsedTime = 0;
				this.setPlaying(this.currentSongID, false);
				clearInterval(this.playInterval);
			}
			
		}, 1000);
	}
	else{
//		$nowPlayingContainer.hide();
		$playButton.show();
		$pauseButton.hide();
		clearInterval(this.playInterval);
	}
	if(this.currentSongID){
//		this.updateSongUI()
		this.getSong(this.currentSongID);
		$listContainer.find('[data-id="' + this.currentSongID + '"]').siblings().removeClass('playing').end().addClass('playing');
	}
};
var curPlaylist = new Playlist();