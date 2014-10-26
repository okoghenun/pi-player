var Song = function(file){
	this.id = 's' + guid();
	this.meta = {};
	if(file && file.id){
//		file from the server
		this.id = file.id;
		this.meta = file.meta;
	}
	else if(file){
//		new file from me
		this.file = file;
		this.meta = this.getMeta(file);
		cStore.save(this.id, this.getFile());
	}
};
Song.getMeta = function(file){
	var meta = {};
	id3(file, function(err, tags) {
		// tags now contains your ID3 tags
		meta.title = tags.title || tags.v2.title;
		meta.album = tags.album || tags.v2.album;
		meta.artist = tags.artist || tags.v2.artist;
		meta.genre = tags.genre || tags.v2.genre;
		meta.duration = tags.duration || tags.v2.duration;
		meta.year = tags.year || tags.v2.year;
//		meta.albumArt = tags.v2.image
	});
	
	if(!meta.duration){
		var objectUrl;
		objectUrl = URL.createObjectURL(file);
		var tempAudioObj = document.createElement('audio');
		tempAudioObj.addEventListener('canplaythrough', function(e){
			meta.duration = e.currentTarget.duration;
			URL.revokeObjectURL(objectUrl);
		});
		tempAudioObj.setAttribute('src', objectUrl);
	}
	
	return meta;
};
Song.prototype.getID = function(){
	return this.id;
};
Song.prototype.getFile = function(){
	return this.file;
};
Song.prototype.toJSON = function(){
	var songObj;
	songObj.id = this.id;
	songObj.meta = this.meta;
	
	return songObj;
};