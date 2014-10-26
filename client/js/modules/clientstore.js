// Allow for vendor prefixes.
window.requestFileSystem = window.requestFileSystem ||
                           window.webkitRequestFileSystem;
var ClientStore = function(){
	if (window.requestFileSystem){
		var self = this;
		self.filesystem = null;
		
		navigator.webkitPersistentStorage.requestQuota(1024 * 1024 * 300, function(grantedSize) {
			// Request a file system with the new size.
			window.requestFileSystem(window.TEMPORARY, grantedSize, function(fs) {
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
				console.log(filename + ' saved.');
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