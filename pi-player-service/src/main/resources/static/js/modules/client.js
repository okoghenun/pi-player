var Client = function(data){
	this.id = 'c' + guid();
	this.isAdmin = true;
//	$controlsContainer.hide();
	if(data){
		if(data.isAdmin)$controlsContainer.show();
	}
};

var curClient = new Client();