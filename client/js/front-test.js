(function($){
	$('.add-button').on('change', function(e){
		$.publish('addedSong', {files: e.target.files});
	});
})(jQuery); 