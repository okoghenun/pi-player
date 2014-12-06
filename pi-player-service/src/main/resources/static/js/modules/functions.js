(function($) {
 
  var o = $({});
 
  $.subscribe = function() {
    o.on.apply(o, arguments);
  };
 
  $.unsubscribe = function() {
    o.off.apply(o, arguments);
  };
 
  $.publish = function() {
    o.trigger.apply(o, arguments);
  };
 
}(jQuery));

var guid = function(){
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
};

var render = function(template, data){
	/* Nano Templates (Tomasz Mazur, Jacek Becela) */
	return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
		var keys = key.split("."), v = data[keys.shift()];
		for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
		return (typeof v !== "undefined" && v !== null) ? v : "";
	});
}

var $listContainer = $('.list-container');
var $controlsContainer = $('.playlist-controls');
var $nowPlayingContainer = $('.now-playing');
var $meter = $('.meter');
var $currentTime = $('.current-time');
var $songTime = $('.song-time');
var $addButton = $('.add-button');
var $playButton = $('.control.play');
var $pauseButton = $('.control.pause');
var $prevButton = $('.control.backward');
var $nextButton = $('.control.forward');
var songItemTemplate = '<li class="song row" data-id="{id}"><span class="small-4 columns song-title ellipsis">{title}</span><span class="small-4 columns song-length text-center">{duration}</span><span class="small-4 columns song-artist ellipsis">{artist}</span></li>';