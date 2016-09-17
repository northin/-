

//前台调用
var $ = function (args) {
	return new Base(args);
};

//基础库
function Base(args) {
	//创建一个数组，来保存获取的节点和节点数组
	this.elements = [];
	if(typeof args == 'string'){
		if(args.indexOf(' ')!=-1){
		      //css
		      var elements=args.split(' ');
		      var childElements=[];    //临时存放
		      var node=[];              //存放父亲节点
		      for(var i=0;i<elements.length;i++){     	
		      	if(node.length == 0)node.push(document);
		      	switch(elements[i].charAt(0)){
					case'#':
					   childElements=[];         //清理第一个,使父亲节点失效
					   childElements.push( this.getId(elements[i].substring(1)));
					   node=childElements;        //放父亲节点
					    break;
					case'.':
					      childElements=[];
						  for (var j=0; j < node.length; j++) {
							var temps=this.getClass(elements[i].substring(1),node[j]);
							for(var k=0;k<temps.length;k++){
								childElements.push(temps[k]);
							}
						  }
					      node=childElements;
					      break;
					default:
					  childElements=[];
					  for (var j=0; j < node.length; j++) {
						var temps=this.getTagName(elements[i],node[j]);
						for(var k=0;k<temps.length;k++){
							childElements.push(temps[k]);
						}
					  }
					   node=childElements;
				}
		      }		
		      this.elements=childElements;
		}else{
				//find
			switch(args.charAt(0)){
				case'#':
				   this.elements.push( this.getId(args.substring(1)));
				    break;
				case'.':
				    this.elements=this.getClass(args.substring(1));
				    break;
				default:
				    this.elements=this.getTagName(args);
			}
		}
	
		
	}else if(typeof args=='object'){
		if (args != undefined) {    //_this是一个对象，undefined也是一个对象，区别与typeof返回的带单引号的'undefined'
			this.elements[0] = args;
		}
	}else if(typeof args=='function'){
		this.ready(args);
	}
	
}


//addDom

Base.prototype.ready=function(fn){
	addDomLoaded(fn);
};

//获取ID节点
Base.prototype.getId = function (id) {
	return document.getElementById(id);

};

//获取元素节点数组
Base.prototype.getTagName = function (tag,parentNode) {
	var node = null;
	var temps=[];
	if (parentNode!=undefined) {
		node = parentNode;
	} else {
		node = document;
	}
	var tags = node.getElementsByTagName(tag);
	for (var i = 0; i < tags.length; i ++) {
		temps.push(tags[i]);
	}
	return temps;
};

//获取CLASS节点数组
Base.prototype.getClass = function (className, parentNode) {
	var node = null;
	var temps=[];
	if (parentNode!=undefined) {
		node = parentNode;
	} else {
		node = document;
	}
	var all = node.getElementsByTagName('*');
	for (var i = 0; i < all.length; i ++) {
		if ((new RegExp('(\\s|^)' +className +'(\\s|$)')).test(all[i].className)) {
			temps.push(all[i]);
		}
	}
	return temps;
};

Base.prototype.find=function(str){
	var ChildElement=[];
	for (var i = 0; i < this.elements.length; i ++) {
		switch(str.charAt(0)){
			case'#':
			    ChildElement.push(this.getId(str.substring(1)));
			    break;
			case'.':
				var temps=this.getClass(str.substring(1),this.elements[i]);
				for(var k=0;k<temps.length;k++){
					ChildElement.push(temps[k]);
				}
			    break;
			default:
			    var temps=this.getTagName(str,this.elements[i]);
			    for(var k=0;k<temps.length;k++){
					ChildElement.push(temps[k]);
				}
		}
	}
	this.elements=ChildElement;
	return this;	
};


//设置节点的透明度
Base.prototype.opacity=function(num){
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].style.opacity=num/100;
		this.elements[i].style.filter = 'alpha(opacity=' + num +')';
	}
	return this;
};


//获取某一个节点，并返回这个节点对象
Base.prototype.ge = function (num) {	
	return this.elements[num];
};

//获取第一个节点，并返回这个节点对象
Base.prototype.first = function () {	
	return this.elements[0];
};

//获取最后一个节点，并返回这个节点对象
Base.prototype.last = function () {	
	return this.elements[this.elements.length-1];
};


Base.prototype.bind=function(event,fn){
	for (var i = 0; i < this.elements.length; i ++) {
		addEvent(this.elements[i],event,fn);
	}
	return this;
};

Base.prototype.form=function(name){
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i]=this.elements[i][name];
	}
	return this;
};

Base.prototype.value=function(str){
	for (var i = 0; i < this.elements.length; i ++) {
		if (arguments.length == 0) {
			return this.elements[i].value;
		}
		this.elements[i].value = str;
	}
	return this;
};
//获取某一个节点，并且Base对象
Base.prototype.eq = function (num) {
	var element = this.elements[num];
	this.elements = [];
	this.elements[0] = element;
	return this;
};

//设置CSS
Base.prototype.css = function (attr, value) {
	for (var i = 0; i < this.elements.length; i ++) {
		if (arguments.length == 1) {
			return getStyle(this.elements[i], attr)+'px';
		}
		this.elements[i].style[attr] = value;
	}
	return this;
};

//添加Class
Base.prototype.addClass = function (className) {
	for (var i = 0; i < this.elements.length; i ++) {
		if (!hasClass(this.elements[i], className)) {
			this.elements[i].className += ' ' + className;
		}
	}
	return this;
};

//移除Class
Base.prototype.removeClass = function (className) {
	for (var i = 0; i < this.elements.length; i ++) {
		if (hasClass(this.elements[i], className)) {
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' +className +'(\\s|$)'), ' ');
		}
	}
	return this;
};

//动画

Base.prototype.anmiate=function(obj){
	for (var i = 0; i < this.elements.length; i ++) {
		var elements=this.elements[i];
		var attr=obj['attr']=='x'?'left':obj['attr']=='y'?'top':
		obj['attr']=='w'?'width':obj['attr']=='h'?'height':
		obj['attr']=='o'?'opacity':obj['attr']!=undefined?obj['attr']:'left';
		var start=obj['start']!=undefined?obj['start']:attr=='opacity'?parseFloat(getStyle(elements,attr))*100:parseInt(getStyle(elements,attr));
		var step=obj['step']!=undefined?obj['step']:10;
		var alter=obj['alter'];
		var targe=obj['targe'];
		var t=obj['t']!=undefined?obj['t']:50;
		var speed=obj['speed']!=undefined?obj['speed']:10;
		var mul=obj['mul'];
		var type=obj['type']=='0'?'cont':obj['type']=='1'?'buffer':'cont';
		
		if(alter!==undefined&&targe==undefined){
			targe=alter+start;
		}
		
		if (attr == 'opacity') {
			elements.style.opacity = parseInt(start) / 100;
			elements.style.filter = 'alpha(opacity=' + parseInt(start) +')';
		} else {
			elements.style[attr] = start + 'px';
		}
		
		if (mul == undefined) {
			mul = {};
			mul[attr] = targe;
		}
		
		
		if(start>targe)step=-step;
		elements.style[attr]=start+'px';
		clearInterval(elements.timer);
		elements.timer=setInterval(function(){
			
			var flag=true;
			for(var i in mul){
				attr=i=='x'?'left':i=='y'?'top': i == 'w' ? 'width' : i == 'h' ? 'height' : i == 'o' ? 'opacity' : i != undefined ? i : 'left';
				targe=mul[i];

		
						if (type == 'buffer') {
							step = attr == 'opacity' ? (targe - parseFloat(getStyle(elements, attr)) * 100) / speed :
																 (targe - parseInt(getStyle(elements, attr))) / speed;
							step = step > 0 ? Math.ceil(step) : Math.floor(step);
						}
						if(attr=='opacity'){
							if(step==0){
								elements.style.opacity=parseInt(targe)/100;
								elements.style.filter = 'alpha(opacity=' + parseInt(targe) + ')';
							}else if(step>0&&Math.abs(parseFloat(getStyle(elements,attr))* 100-targe)<=step){
								elements.style.opacity=targe/100;
								elements.style.filter = 'alpha(opacity=' + parseInt(targe) + ')';
							}else if(step<0&&(parseFloat(getStyle(elements,attr))* 100-targe)<=Math.abs(step)){
								elements.style.opacity=targe/100;
								elements.style.filter = 'alpha(opacity=' + parseInt(targe) + ')';
							}else{
								var temp=parseFloat(getStyle(elements,attr))*100;
								elements.style.opacity=parseInt(temp+step)/100;
								elements.style.filter = 'alpha(opacity=' + parseInt(temp + step) + ')';
							}
							if (parseInt(targe) != parseInt(parseFloat(getStyle(elements, attr)) * 100)) flag = false;
						}else{
							if(step==0){
								elements.style[attr]=targe+'px';
							}else if(step>0&&Math.abs(parseInt(getStyle(elements, attr)) - targe)<=step){
								elements.style[attr]=targe+'px';
							}else if(step<0&&parseInt(getStyle(elements,attr))-targe<=Math.abs(step)){
								elements.style[attr]=targe+'px';
							}else{
								elements.style[attr]=parseInt(getStyle(elements,attr))+step+'px';
							}
							
							if(targe!=parseInt(getStyle(elements,attr)))flag=false;
						}
				
				}
				
				if(flag==true){
					clearInterval(elements.timer);
					if(obj.fn!=undefined)obj.fn();
				}
				
		},t);
		
	}
	return this;
};



//添加link或style的CSS规则
Base.prototype.addRule = function (num, selectorText, cssText, position) {
	var sheet = document.styleSheets[num];
	insertRule(sheet, selectorText, cssText, position);
	return this;
};

//移除link或style的CSS规则
Base.prototype.removeRule = function (num, index) {
	var sheet = document.styleSheets[num];
	deleteRule(sheet, index);
	return this;
};

//设置innerHTML
Base.prototype.html = function (str) {
	for (var i = 0; i < this.elements.length; i ++) {
		if (arguments.length == 0) {
			return this.elements[i].innerHTML;
		}
		this.elements[i].innerHTML = str;
	}
	return this;
};

//设置innerText
Base.prototype.text = function (str) {
	for (var i = 0; i < this.elements.length; i ++) {
		if (arguments.length == 0) {
			return getText(this.elements[i]);
		}
		setText(this.elements[i],str);
	}
	return this;
};

//获取长度
Base.prototype.length=function(){
	return this.elements.length;
};

//设置鼠标移入移出方法
Base.prototype.hover = function (over, out) {
	for (var i = 0; i < this.elements.length; i ++) {
		addEvent(this.elements[i], 'mouseover', over);
		addEvent(this.elements[i], 'mouseout', out);
	}
	return this;
};

//设置显示
Base.prototype.show = function () {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].style.display = 'block';
	}
	return this;
};

//设置隐藏
Base.prototype.hide = function () {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].style.display = 'none';
	}
	return this;
};

//设置物体居中
Base.prototype.center = function (width, height) {
	var top = (getInner().height - width) / 2+getScroll().top+50;
	var left = (getInner().width - height) / 2+getScroll().left;
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].style.top = top + 'px';
		this.elements[i].style.left = left + 'px';
	}
	return this;
};

//锁屏功能
Base.prototype.lock = function () {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].style.width = getInner().width +getScroll().left+ 'px';
		this.elements[i].style.height = getInner().height +getScroll().top+ 'px';
		this.elements[i].style.display = 'block';
		document.documentElement.style.overflow = 'hidden';
		//addEvent(window, 'scroll', scrollTop);
	}
	return this;
};

Base.prototype.unlock = function () {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].style.display = 'none';
		document.documentElement.style.overflow = 'auto';
		//removeEvent(window, 'scroll', scrollTop);
	}
	return this;
};


//点击切换事件
Base.prototype.toggle=function(){
	for (var i = 0; i < this.elements.length; i ++) {
		(function (element, args) {
			var count = 0;
			addEvent(element, 'click', function () {
				args[count++ % args.length].call(this);
			});
		})(this.elements[i], arguments);
	}
	return this;	
};

//next取
Base.prototype.next=function(){
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i]=this.elements[i].nextSibling;
		if(this.elements[i].nodeType==3) this.next();
	}
	return this;
};
//上一个节点
Base.prototype.prev=function(){
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i]=this.elements[i].previousSibling;
		if(this.elements[i].nodeType==3) this.prev();
	}
	return this;
};


//触发点击事件
Base.prototype.click = function (fn) {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].onclick = fn;
	}
	return this;
};

//触发浏览器窗口事件
Base.prototype.resize = function (fn) {
	for (var i = 0; i < this.elements.length; i ++) {
		var element = this.elements[i];
		addEvent(window, 'resize', function () {
			fn();
			if (element.offsetLeft > getInner().width +getScroll().left- element.offsetWidth) {
				element.style.left = getInner().width +getScroll().left- element.offsetWidth + 'px';
			}
			if (element.offsetTop > getInner().height +getScroll().top- element.offsetHeight) {
				element.style.top = getInner().height +getScroll().top- element.offsetHeight + 'px';
				if(element.offsetTop<=0+getScroll().top){
					element.style.top=0+getScroll().top+'px';
				}
			}
		});
	}
	return this;
};


//获取节点的属性
Base.prototype.attr=function(attr,value){
	for (var i = 0; i < this.elements.length; i ++) {
		if(arguments.length==1){
			 return this.elements[i].getAttribute(attr);
		}else if(arguments.length==2){
			this.elements[i].setAttribute(attr,value);
		}
	  
	}
	return this;
};
//获取索引
Base.prototype.index = function() {
		var child=this.elements[0].parentNode.children;
	    for(var i=0;i<child.length;i++){
	    	if(this.elements[0]==child[i]){
	    		return i;
	    	}
	    }
};




//插件入口
Base.prototype.extend = function (name, fn) {
	Base.prototype[name] = fn;
};


















