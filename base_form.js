$().extend('serialize', function () {
	for (var i = 0; i < this.elements.length; i ++) {
		var form = this.elements[i];
		var parts = {};
		for(var i=0;i<form.elements.length;i++){
			var file=form.elements[i];
			switch(file.type){
				case undefined:
				case 'submit':
				case 'reset':
				case 'file':
				case 'button':
				break;
				case 'radio':
				case 'checkbox':
				 if(!file.selected) break;
				default:
				  parts[file.name]=file.value;
			}
		}
		return parts;
	}
	return this;
});