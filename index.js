

$(function(){
	$('.member').hover(function () {
		$(this).css('background', 'url(img/arrow2.png) no-repeat right center');
		$('.member_ul').show().anmiate({
			type:1,
			mul:{
				'o':100,
				'h':180
			}
		});
	}, function () {
		$(this).css('background', 'url(img/arrow.png) no-repeat right center');
		$('.member_ul').anmiate({
			mul:{
				'o':0,
				'h':0
			},
			type:1,
			fn:function(){
				$('.member_ul').hide();
			}
		});
	});
	var screen = $('#screen');
	
	//login
	var login = $('#login');
	
	login.center(350, 250).resize(function () {
		if (login.css('display') == 'block') {
			screen.lock();
		}
	});
	$('.login').click(function () {
		login.center(350, 250);
		login.css('display', 'block');
		screen.lock().anmiate({
				attr:'o',
				targe:30,
				type:1,
			});
	});
	$('#login .close').click(function () {
		login.css('display', 'none');
		screen.anmiate({
				attr:'o',
				targe:0,
				type:1,
				fn:function(){
					screen.unlock();
				}
		});
	});
	
	//reg
	//初始化表单操作
	$('form').eq(0).first().reset();
   
	var reg = $('#reg');
	reg.center(600, 550).resize(function () {
		if (reg.css('display') == 'block') {
			screen.lock();
		}
	});
	$('.reg').click(function () {
		reg.center(600, 550);
		reg.css('display', 'block');
		screen.lock().anmiate({
				attr:'o',
				targe:30,
				type:1,
			});
	});
	$('#reg .close').click(function () {
		reg.css('display', 'none');
		screen.anmiate({
				attr:'o',
				targe:0,
				type:1,
				fn:function(){
					screen.unlock();
				}
		});
	});
    //reg_user
    $('form').eq(0).form('user').bind('focus',function(){
    	$('#reg dd .info_user').css('display','block');
    	$('#reg dd .succ_user').css('display','none');
    	$('#reg dd .error_user').css('display','none');
    }).bind('blur',function(){
    	if(trim($(this).value())==''){
    		$('#reg dd .error_user').css('display','block');
    	    $('#reg dd .info_user').css('display','none');
    	    $('#reg dd .succ_user').css('display','none');
    	}else if(!check_user()){
    		$('#reg dd .error_user').css('display','block');
    	    $('#reg dd .info_user').css('display','none');
    	    $('#reg dd .succ_user').css('display','none');
    	}else{
    		$('#reg dd .error_user').css('display','none');
    	    $('#reg dd .info_user').css('display','none');
    	    $('#reg dd .succ_user').css('display','block');
    	}
    	
    });
    
    function check_user(){
		var flag=true;
    	if(!/[a-zA-Z0-9_]{2,20}/.test(trim($('form').eq(0).form('user').value()))){
		    return false;	
			$('#reg .error_user').html('用户不合法');
		} else{
			$('#reg .loading').css('display', 'block');
			$('#reg .info_user').css('display', 'none');
			ajax({
				method : 'post',
				url : 'is_user.php',
				data :$('form').eq(0).serialize(),
				success : function (text) {
					if(text==1){
						$('#reg .error_user').html('用户名被占用');
					   flag= false;
					}else{
					   flag= true;
					}
					$('#reg .loading').css('display', 'none')
				},
				async : false
			});
		}
		return flag;
    }
    //password
    $('form').eq(0).form('pass').bind('focus',function(){
    	$('#reg dd .info_pass').css('display','block');
    	$('#reg dd .succ_pass').css('display','none');
    	$('#reg dd .error_pass').css('display','none');
    }).bind('blur',function(){
    	if(trim($(this).value())==''){
    	    $('#reg dd .info_pass').css('display','none');
    	    $('#reg dd .error_pass').css('display','block');
    	    $('#reg dd .succ_pass').css('display','none');
    	}else{
    	    if(check_pass(this)){
    	    	$('#reg dd .info_pass').css('display','none');
		    	$('#reg dd .succ_pass').css('display','block');
		    	$('#reg dd .error_pass').css('display','none');
    	    }else{
    	    	$('#reg dd .info_pass').css('display','none');
		    	$('#reg dd .succ_pass').css('display','none');
		    	$('#reg dd .error_pass').css('display','block');
    	    }
    	}
    	
    });
    
     $('form').eq(0).form('pass').bind('keyup',function(){
     	check_pass(this);
     });
    
    //密码强度函数
    function check_pass(_this){
    	var value=trim($(_this).value());
     	var value_length=value.length;
     	var code=0;
     	var flag=false;
     	if(value_length>=6&&value_length<=20){
     		$('form dd .q1').html('●').css('color','green');
     	}else{
     		$('form dd .q1').html('○').css('color','#666');
     	}
     	if(value_length>0&&!/\s/.test(value)){
     		$('form dd .q2').html('●').css('color','green');
     	}else{
     		$('form dd .q2').html('○').css('color','#666');
     	}
        if(/[0-9]/.test(value)){
        	code++;
        }
        if(/[a-z]/.test(value)){
        	code++;
        }
        if(/[A-Z]/.test(value)){
        	code++;
        }
        if(/[^0-9a-zA-Z]/.test(value)){
        	code++;
        }
        if(code>=2){
        	$('form dd .q3').html('●').css('color','green');
        }else{
        	$('form dd .q3').html('○').css('color','#666');
        }
        
        if(value_length>=10&&code>=3){
        	$('#reg dd .s1').css('color','green');
        	$('#reg dd .s2').css('color','green');
        	$('#reg dd .s3').css('color','green');
        	$('#reg dd .s4').html('高').css('color','green');
        }else if(value_length>=8&&code>=2){
        	$('#reg dd .s1').css('color','orange');
        	$('#reg dd .s2').css('color','orange');
        	$('#reg dd .s3').css('color','#666');
        	$('#reg dd .s4').html('中').css('color','orange');
        }else if(value_length>=1){
        	$('#reg dd .s1').css('color','red');
        	$('#reg dd .s2').css('color','#666');
        	$('#reg dd .s3').css('color','#666');
        	$('#reg dd .s4').html('低').css('color','red');
        }else{
        	$('#reg dd .s1').css('color','#666');
        	$('#reg dd .s2').css('color','#666');
        	$('#reg dd .s3').css('color','#666');
        	$('#reg dd .s4').html('');
        }
        if(value_length>=6&&value_length<=20&&code>=2&&!/\s/.test(value)) flag=true;
        return flag;
    }
    
    //notpass
    $('form').eq(0).form('notpass').bind('focus',function(){
    	$('#reg dd .info_notpass').css('display','block');
    	$('#reg dd .succ_notpass').css('display','none');
    	$('#reg dd .error_notpass').css('display','none');
    }).bind('blur',function(){
    	if(trim($(this).value())==''){
	    		$('#reg dd .info_notpass').css('display','none');
		    	$('#reg dd .succ_notpass').css('display','none');
		    	$('#reg dd .error_notpass').css('display','block');
    	}else if(trim($(this).value())==trim($('form').eq(0).form('pass').value())){
    			$('#reg dd .info_notpass').css('display','none');
		    	$('#reg dd .succ_notpass').css('display','block');
		    	$('#reg dd .error_notpass').css('display','none');
    	}else{
    			$('#reg dd .info_notpass').css('display','none');
		    	$('#reg dd .succ_notpass').css('display','none');
		    	$('#reg dd .error_notpass').css('display','block');
    		
    	}
    });
    
    function check_notpass() {
		if (trim($('form').eq(0).form('notpass').value()) == trim($('form').eq(0).form('pass').value())) return true;
	}
    	    
    //ans
    $('form').eq(0).form('ans').bind('focus',function(){
    	$('#reg dd .info_ans').css('display','block');
    	$('#reg dd .succ_ans').css('display','none');
    	$('#reg dd .error_ans').css('display','none');
    }).bind('blur',function(){
    	if(trim($(this).value())==''){
	    		$('#reg dd .info_ans').css('display','none');
		    	$('#reg dd .succ_ans').css('display','none');
		    	$('#reg dd .error_ans').css('display','block');
    	}else if(trim($(this).value()).length >= 2 && trim($(this).value()).length <= 32){
    			$('#reg dd .info_ans').css('display','none');
		    	$('#reg dd .succ_ans').css('display','block');
		    	$('#reg dd .error_ans').css('display','none');
    	}else{
    			$('#reg dd .info_ans').css('display','none');
		    	$('#reg dd .succ_ans').css('display','none');
		    	$('#reg dd .error_ans').css('display','block');
    		
    	}
    });
    
    function check_ans() {
		if (trim($('form').eq(0).form('ans').value()).length >= 2 && trim($('form').eq(0).form('ans').value()).length <= 32) return true;
	}
    function check_ques() {
		if ($('form').eq(0).form('ques').value() != 0) return true;
	}
    //email
    $('form').eq(0).form('email').bind('focus', function () {
		$('#reg .info_email').css('display', 'block');
		$('#reg .error_email').css('display', 'none');
		$('#reg .succ_email').css('display', 'none');
		$('#reg .all_email').css('display', 'block');
	}).bind('blur', function () {
		if($(this).value().indexOf('@')==-1) $('#reg .all_email').css('display', 'none');
		if (trim($(this).value()) == '') {
			$('#reg .info_email').css('display', 'none');
			$('#reg .error_email').css('display', 'block');
			$('#reg .succ_email').css('display', 'none');
		} else if (/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($(this).value()))) {
			$('#reg .info_email').css('display', 'none');
			$('#reg .error_email').css('display', 'none');
			$('#reg .succ_email').css('display', 'block');
		} else {
			$('#reg .info_email').css('display', 'none');
			$('#reg .error_email').css('display', 'block');
			$('#reg .succ_email').css('display', 'none');
		}
	});
    function check_email() {
		if (/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($('form').eq(0).form('email').value()))) return true;
	}
    //email自动补全系统
    $('form').eq(0).form('email').bind('keyup',function(event){
    	if($(this).value().indexOf('@')==-1){
    		$('#reg .all_email').css('display', 'block');
    		$('#reg .all_email li span').html($(this).value());
    	}else{
    		$('#reg .all_email').css('display', 'none');
    	}
    	//下  
    	if(event.keyCode==40){
    		if(this.index==undefined || this.index>=($('#reg .all_email li').length()-1)){
    			this.index=0;
    		}else{
	    		this.index++;
	    	}
	    	$('#reg .all_email li').css('color','black');
	    	$('#reg .all_email li').css('backcolor','#ffffff');
	    	$('#reg .all_email li').eq(this.index).css('color','#369');
	    	$('#reg .all_email li').eq(this.index).css('backcolor','#e5edf2');
    	}
    	//上
    	if(event.keyCode==38){
    		if(this.index==undefined || this.index<=0){
    			this.index=($('#reg .all_email li').length()-1);
    		}else{
	    		this.index--;
	    	}
	    	$('#reg .all_email li').css('color','black');
	    	$('#reg .all_email li').css('backcolor','#ffffff');
	    	$('#reg .all_email li').eq(this.index).css('color','#369');
	    	$('#reg .all_email li').eq(this.index).css('backcolor','#e5edf2');
    	}
    	//enter键
    	if(event.keyCode==13){
    		$(this).value($('#reg .all_email li').eq(this.index).text());
    		$('#reg .all_email').css('display', 'none');
    		this.index==undefined;
    	}
    });
    $('#reg .all_email li').bind('mousedown',function(){
    	$('form').eq(0).form('email').value($(this).text());
    });
    
    //birthday
    var year=$('form').eq(0).form('year');
    var month=$('form').eq(0).form('month');
    var day=$('form').eq(0).form('day');
    
    var day31=[1,3,5,7,8,10,12];
    var day30=[4,6,9,11];
    for(var i=1970;i<=2016;i++){
    	year.first().add(new Option(i,i),undefined);
    }
    for(var i=1;i<=12;i++){
    	month.first().add(new Option(i,i),undefined);
    }
    year.bind('change',select_day);
    month.bind('change',select_day);
    function select_day(){
    	if(year.value()!=0&&month.value()!=0){
    		day.first().options.length = 1;
    		if(isArray(day31,parseInt(month.value()))){
    			for(var i=1;i<=31;i++){
			    	day.first().add(new Option(i,i),undefined);
			    }
    		}else if(isArray(day30,parseInt(month.value()))){
    			for(var i=1;i<=30;i++){
			    	day.first().add(new Option(i,i),undefined);
			    }
    		}else{
    			if(parseInt(year.value())%4==0&&parseInt(year.value())%100==0||parseInt(year.value())%400==0){
    				for(var i=1;i<=29;i++){
			    		day.first().add(new Option(i,i),undefined);
			    	}
    			}else{
    				for(var i=1;i<=28;i++){
				    	day.first().add(new Option(i,i),undefined);
				    }
    			}
    		}
    	}else{
    		day.first().options.length = 1;
    	}
    }
    
    function check_birthday() {
		if (year.value() != 0 && month.value() != 0 && day.value() != 0) return true;
	}
    //ps
    $('form').eq(0).form('ps').bind('keyup',check_ps);
    $('form').eq(0).form('ps').bind('paste',function(){
    	setTimeout(check_ps,50);
    });
    $('#reg .clear').bind('click',function(){
    	$('form').eq(0).form('ps').value($('form').eq(0).form('ps').value().substring(0,5));
    	check_ps();
    });
    function check_ps(){
    	var num=($('form').eq(0).form('ps').value().length);
    	if((5-num)>=0){
    		$('#reg .ps').eq(0).css('display','block');
    		$('#reg .num').html(5-num);
    		$('#reg .ps').eq(1).css('display','none');
			return true;
    	}else{
    		$('#reg .ps').eq(0).css('display','none');
    		$('#reg .num').html(Math.abs(5-num)).css('color','red');
    		$('#reg .ps').eq(1).css('display','block');
			return false;
    	}
    }
    
   //submit
	$('form').eq(0).form('submit').click(function () {
		
		var flag = true;
	
		if (!check_user()) {
			$('#reg .error_user').css('display', 'block');
			flag = false;
		}
		
		if (!check_notpass()) {
			$('#reg .error_notpass').css('display', 'block');
			flag = false;
		}
		
		
		if (!check_ans()) {
			$('#reg .error_ans').css('display', 'block');
			flag = false;
		}
		
		if (!check_email()) {
			$('#reg .error_email').css('display', 'block');
			flag = false;
		}
		
		
		if (!check_ps()) {
			flag = false;
		}
	
		if (flag) {
			var _this=this;
			$('#loading').css('display','block').center(200,40);
			$('#loading p').html('注册提交中。。。。');
			_this.disabled=true;
			$(_this).css('backgroundPosition','right');
			ajax({
				method : 'post',
				url : 'demo.php',
				data :$('form').eq(0).serialize(),
				success : function (text) {
					if(text==1){
						$('#loading').css('display','none');
						$('#success').css('display','block').center(200,40);
						$('#success p').html('注册成功，前往登陆');
						setTimeout(function(){
							$('#success').css('display','none');
							reg.css('display','none');
							$("#reg .succ").css('display','none');
							$('form').eq(0).first().reset();
							_this.disabled=false;
							$(_this).css('backgroundPosition','left');
							screen.anmiate({
									attr:'o',
									targe:0,
									type:1,
									fn:function(){
										screen.unlock();
									}
							});
						},1500);
					}
				},
				async : true
			});
		}
		

		
	});
   
   
    //login 验证
	$('form').eq(1).form('sub').click(function(){
		if(/[a-zA-Z0-9_]{2,20}/.test(trim($('form').eq(1).form('user').value()))&&trim($('form').eq(1).form('pass').value()).length>=6){
			var _this=this;
			$('#loading').css('display','block').center(200,40);
			$('#loading p').html('正在登陆中。。。。');
			_this.disabled=true;
			$(_this).css('backgroundPosition','right');
			ajax({
				method : 'post',
				url : 'is_login.php',
				data :$('form').eq(1).serialize(),
				success : function (text) {
					if(text==1){//失败
						$('#login form .loading').html('登陆失败：用户名和密码不正确');
						$('#loading').css('display','none');
					}else if(text==0){//成功
					    $('#login form .loading').html('');
						$('#loading').css('display','none');
						$('#success').css('display','block').center(200,40);
						$('#success p').html('登陆成功，请稍后。。');
						setCookie('user',trim($('form').eq(1).form('user').value()));
						setTimeout(function(){
							$('#success').css('display','none');
							login.css('display','none');
							$('form').eq(1).first().reset();
							screen.anmiate({
									attr:'o',
									targe:0,
									type:1,
									fn:function(){
										screen.unlock();
									}
							});
							$('#header .reg').css('display','none');
							$('#header .login').css('display','none');
							$('#header .info').css('display','block').html(getCookie('user')+",你好");
						},1500);
					}
					_this.disabled=false;
					$(_this).css('backgroundPosition','left');
				},
				async : true
			});
		}else{
			$('#login form .loading').html('登陆失败：用户名和密码不合法');
		}
	});
    
	//drag
	login.drag($('#login h2').first());
	reg.drag($('#reg h2').first());
	//sidebar
	$('#main .sidebar h2').toggle(function(){
		$(this).next().hide();
	},function(){
		$(this).next().show();
	});
	//导航
	$('#nav ul li').hover(function(){
		//alert();
		var target=$(this).first().offsetLeft;
		$('.nav_bg').anmiate({
			targe:target+20,
			attr:'x',
			fn:function(){
				$('.white').anmiate({
					attr:'x',
					targe:-target
				});
			}
		});
	},function(){
		$('.nav_bg').anmiate({
			targe:20,
			attr:'x',
			fn:function(){
				$('.white').anmiate({
					attr:'x',
					targe:0
				});
			}
		});
	});
	
	//banner
	$('#banner img').opacity(0);
	$('#banner img').eq(0).opacity(100);
	$('#banner ul li').eq(0).css('color','#333');
	$('#banner strong').html($('#banner img').eq(0).attr('alt'));
	
	//手动
	$('#banner ul li').hover(function(){
		clearInterval(banner_timer);
		banner(this, banner_index == 0 ? $('#banner ul li').length() - 1 : banner_index - 1);
	},function(){
		banner_index = $(this).index() + 1;
		banner_timer = setInterval(banner_fn,3000);
	});
	
	var banner_index=1;
	
	//自动
	var banner_timer=setInterval(banner_fn,3000);
	
	
	function banner(obj,prev){
		$('#banner img').eq(prev).anmiate({
			attr:'o',
			targe:0,
			t:30
		});
		$('#banner img').eq($(obj).index()).anmiate({
			attr:'o',
			targe:100,
			t:30
		}).css('zIndex',2);
		$('#banner ul li').css('color','#666');
		$(obj).css('color','#333');
		$('#banner strong').html($('#banner img').eq($(obj).index()).attr('alt'));
	}
	function banner_fn(){
		if(banner_index>=3) banner_index=0;
		banner($('#banner ul li').eq(banner_index).first(), banner_index == 0 ? $('#banner ul li').length() - 1 : banner_index - 1);
		banner_index++;
	}
	
	//photo
	//alert($('#photo .wait_load').eq(0).attr('src'));
	
	
	//获取图片元素到最外层顶点元素的距离
	
	//alert($('.wait_load').first().offsetParent.offsetTop);
	//alert(offsetTop($('.wait_load').first()));
	//当前视点最低位置
	//alert(getScroll().top+getInner().height);
	var wait_load=$('.wait_load');
	$('.wait_load').opacity(0);
	$(window).bind('scroll',function(){
		setTimeout(function(){
			for(var i=0;i<wait_load.length();i++){
				var _this = wait_load.ge(i);
				if(getScroll().top+getInner().height>offsetTop(_this)){
					$(_this).attr('src',$(_this).attr('xsrc')).anmiate({
						attr:'o',
						targe:100,
					});
				}
			}
		},100);
	});
	
	
	//预加载
	var photo_big = $('#photo_big');
	
	photo_big.center(620, 511).resize(function () {
		if (photo_big.css('display') == 'block') {
			screen.lock();
		}
	});
	$('#photo dl dt img').click(function () {
		photo_big.center(620, 511);
		photo_big.css('display', 'block');
		screen.lock().anmiate({
				attr:'o',
				targe:30,
				type:1,
			});
		var load_img=new Image();
		$(load_img).bind('load',function(){
			$('#photo_big .big img').attr('src',load_img.src).anmiate({
				attr:'o',
				targe:100
			}).css('width', '600px').css('height', '450px').css('top','0').opacity(0);
		});
		load_img.src=$(this).attr('bigsrc');
		
		var children=this.parentNode.parentNode;
		//alert($().index());
		check_photo_big(children);
		$('#photo_big .big em').html($(children).index()+1+'/12');
	});
	$('#photo_big .close').click(function () {
		photo_big.css('display', 'none');
		screen.anmiate({
				attr:'o',
				targe:0,
				type:1,
				fn:function(){
					screen.unlock();
				}
		});
	});
	photo_big.drag($('#photo_big h2').first());
	
	$('#photo_big .big .left').hover(function(){
		$('#photo_big .big .sl').anmiate({
			attr:'o',
			targe:50
		});
	},function(){
		$('#photo_big .big .sl').anmiate({
			attr:'o',
			targe:0
		});
	});
	$('#photo_big .big .right').hover(function(){
		$('#photo_big .big .sr').anmiate({
			attr:'o',
			targe:50
		});
	},function(){
		$('#photo_big .big .sr').anmiate({
			attr:'o',
			targe:0
		});
	});
    $('#photo_big .big .left').click(function(){
	    $('#photo_big .big img').attr('src',$(this).attr('src'));
	    var children=$('#photo dl dt img').ge(prevIndex($('#photo_big .big img').attr('index'),$('#photo').first())).parentNode.parentNode;
	    //var children=this.parentNode.parentNode;
	    check_photo_big(children);
	    $('#photo_big .big em').html($(children).index()+1+'/12');
	});
	$('#photo_big .big .right').click(function(){
	    $('#photo_big .big img').attr('src',$(this).attr('src'));
	    var children=$('#photo dl dt img').ge(nextIndex($('#photo_big .big img').attr('index'),$('#photo').first())).parentNode.parentNode;
	    //var children=this.parentNode.parentNode;
	    check_photo_big(children);
	    $('#photo_big .big em').html($(children).index()+1+'/12');
	});
   function check_photo_big(children){
   	    var prev=prevIndex($(children).index(),children.parentNode);
		
		var next=nextIndex($(children).index(),children.parentNode);
		
		var prev_img=new Image();
		var next_img=new Image();
		
		prev_img.src=$('#photo dl dt img').eq(prev).attr('bigsrc');
		next_img.src=$('#photo dl dt img').eq(next).attr('bigsrc');
		
		$('#photo_big .big .left').attr('src',prev_img.src);
		$('#photo_big .big .right').attr('src',next_img.src);
		$('#photo_big .big img').attr('index',$(children).index());
   }
   //发表博文
   var blog = $('#blog');
	blog.center(580, 320).resize(function () {
		if (blog.css('display') == 'block') {
			screen.lock();
		}
	});
	$('#header .member_ul li').eq(0).click(function () {
		blog.center(350, 250);
		blog.css('display', 'block');
		screen.lock().anmiate({
				attr:'o',
				targe:30,
				type:1,
			});
	});
	$('#blog .close').click(function () {
		blog.css('display', 'none');
		screen.anmiate({
				attr:'o',
				targe:0,
				type:1,
				fn:function(){
					screen.unlock();
				}
		});
	});
	blog.drag($('#blog h2').first());

	$('form').eq(2).form('sub').click(function(){
		var _this = this;
		if(trim($('form').eq(2).form('title').value()).length<=0||trim($('form').eq(2).form('content').value()).length<=0){
			$('#blog .info').html('发表失败:标题和内容不用为空');
		}else{
			$('#loading').css('display','block').center(200, 40);
			$('#loading p').html('正在发表博文...');
			_this.disabled = true;
			$(_this).css('backgroundPosition', 'right');
			ajax({
				method : 'post',
				url : 'add_blog.php',
				data : $('form').eq(2).serialize(),
				success : function (text) {
					$('#loading').css('display','none');
					if (text == 1) {	
						$('#blog .info').html('');
						$('#success').css('display','block').center(200, 40);
						$('#success p').html('发表成功，请稍后...');
						setTimeout(function () {
							$('#success').css('display','none');
							$('#blog').css('display','none');
							$('form').eq(2).first().reset();
							screen.anmiate({
								attr : 'o',
								targe : 0,
								t : 30,
								step : 10,
								fn : function () {
									screen.unlock();
									$('#main .index').html('<span class="loading"></span>');
									ajax({
										method : 'post',
										url : 'get_blog.php',
										data : {},
										success : function (text) {
											var json=JSON.parse(text);
											var html="";
											for(var i=0;i<json.length;i++){
												html+=('<div class="content"><h2><em>'+json[i].data+'</em>'+json[i].title+'</h2><p>'+json[i].content+'</p></div>');
											}
											$('#main .index').html(html);
										},
										async : true
									});
								}
							});
							_this.disabled = false;
							$(_this).css('backgroundPosition', 'left');
						}, 1500);
					}
				},
				async : true
			});
		}
	});
	
	//获取博文
	        $('#main .index').html('<span class="loading"></span>');
			ajax({
				method : 'post',
				url : 'get_blog.php',
				data : {},
				success : function (text) {
					var json=JSON.parse(text);
					var html="";
					for(var i=0;i<json.length;i++){
						html+=('<div class="content"><h2><em>'+json[i].data+'</em>'+json[i].title+'</h2><p>'+json[i].content+'</p></div>');
					}
					$('#main .index').html(html);
				},
				async : true
			});
	
	
	
});



	
	
	

	


	















