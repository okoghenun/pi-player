var Client = function(data){
	this.id = 'c' + guid();
	this.isAdmin = false;
	$controlsContainer.hide();
	if(data){
		if(data.isAdmin)$controlsContainer.show();
	}
};

var curClient = new Client();