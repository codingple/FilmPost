
//아이디를 이용한 접근
var create_post = document.getElementById("create_post");
var create_canvas = document.getElementById("create_canvas");
var frame = document.getElementById("frame");
var target = document.getElementById("target");
var target2 = document.getElementById("target2");
var garbage_box = document.getElementById("garbage_box");
var save = document.getElementById("save");
var load = document.getElementById("load");
var localStorage = window.localStorage;

//숫자에 사용될 변수
var elementNum = 0;
var elementNum2 = 0;

//drag시 target의 아이디
var dragId;

//drag를 가능하게 하는 enable
var en1 = create_post.id;
var en2 = "post";
var en3 = create_canvas.id;
var en4 = "canvas";

//포스트잇 종류를 구별할 때 쓸 변수
var canvas_name;
var post_name;

//draw를 제어할 변수
var readyForDrawing = false;
var keepDrawing = false;




//translate의 x좌표 받기
function translate_x ( id ) {
	var full_name = id.style.WebkitTransform;
	var coord_x1 = full_name.split('px');
	var coord_x2 = coord_x1[0].split('(');
	return coord_x2[1];
}


//translate의 y좌표 받기
function translate_y ( id ) {
	var full_name = id.style.WebkitTransform;
	var coord_y1 = full_name.split('px');
	var coord_y2 = coord_y1[1].split(' ');
	return coord_y2[1];
}


//left_margin 구하기
function get_left_margin () {
        var window_width = window.document.body.clientWidth;
	    var left_margin = (window_width - 900)/2;
		if (left_margin < 0)
			left_margin = (-window.pageXOffset);
		return left_margin;
}

//left_margin 구하기
function get_top_margin () {
	    var height_top = (-window.pageYOffset) + 80;
		return height_top;
}


//post위치 구하기
function where_from () {
	var result;
	var target_child = target.getElementsByTagName("section");
	var target2_child = target2.getElementsByTagName("section");

	for(var i=0; i < target_child.length ; i++){
		if ( target_child[i].id == dragId ) result = target.id;
	}

	if( !result ){
		for(var i=0; i < target2_child.length ; i++){
		if ( target2_child[i].id == dragId ) result = target2.id;
		}
	}
	return result;
}


//page나 file 열기
frame_button.onclick = function (e) {
	var site_ad = prompt("insert URL", "");
	frame.src = site_ad;

	var delete_node = target.getElementsByTagName("section");
	var length = delete_node.length;
	for ( var i=0; i < length; i++){
		target.removeChild( delete_node[0] );
	}
}


//iframe과 target의 z-index변경
z_change.onclick = function (e) {

	var tmp = frame.style.zIndex;

	if (tmp == "1"){
		frame.style.zIndex = "2";
		target.style.zIndex = "1";
		target.style.opacity = "0.0";
	}

	else {
		frame.style.zIndex = "1";
		target.style.zIndex = "2";
		target.style.opacity = "1.0";
	}
}



//drag 시작시 
ondragstart = function (e) {
	dragId = e.target.id;
	post_name = dragId.split('[');
	canvas_name = dragId.split('[');
}
	

//drag로 dropzone에 들어갔을 때
target.ondragover = function (e) {
	e.preventDefault();
}
target2.ondragover = function (e) {
	e.preventDefault();
}
garbage_box.ondragover = function (e) {
	e.preventDefault();
}


//canvas 위에 마우스가 올라갔을 때
onmouseover = function (e) {
  var mouse_id = e.target.id;
  var can_en = mouse_id.split('[');

  if (can_en[0] == "canvas_"){
	  readyForDrawing = true;
  }
}

//canvas에서 마우스가 나왔을 때
onmouseout = function (e){
	e.preventDefault();
	var mouse_id = e.target.id;
    var can_en = mouse_id.split('[');

    if (can_en[0] == "canvas_"){
	    readyForDrawing = false;
		keepDrawing = false;
	}
}



//drawing start in target
target.onmousedown = function (e) {
	
	if ( readyForDrawing ){
		e.preventDefault();

		var target_id = e.target.id;
		var canvas = document.getElementById( target_id );
		var context = canvas.getContext("2d");

		var delete_under = target_id.split('_');
		var canvas_section = document.getElementById( delete_under[0] + delete_under[1] );

		var left_margin = get_left_margin();
		var top_margin = get_top_margin();

	    var x = e.clientX - translate_x(canvas_section) - left_margin - 12;
	    var y = e.clientY - translate_y(canvas_section) - top_margin - 25;

		context.strokeStyle = "black";
		context.lineWidth = 3;
        context.moveTo( x, y);

		keepDrawing = true;
		
	}
}


//keep drawing in target
target.onmousemove = function (e) {
	if ( readyForDrawing ){
		if ( keepDrawing ){
		e.preventDefault();

		var target_id = e.target.id;
		var canvas = document.getElementById( target_id );
		var context = canvas.getContext("2d");

		var delete_under = target_id.split('_');
		var canvas_section = document.getElementById( delete_under[0] + delete_under[1] );

		var left_margin = get_left_margin();
		var top_margin = get_top_margin();

	    var x = e.clientX - translate_x(canvas_section) - left_margin - 12;
	    var y = e.clientY - translate_y(canvas_section) - top_margin - 25;

		context.lineTo( x, y );
		context.stroke();
		context.moveTo( x, y );
		}
	}
}


//drawing start in target2
target2.onmousedown = function (e) {
	
	if ( readyForDrawing ){
		e.preventDefault();

		var target_id = e.target.id;
		var canvas = document.getElementById( target_id );
		var context = canvas.getContext("2d");

		var delete_under = target_id.split('_');
		var canvas_section = document.getElementById( delete_under[0] + delete_under[1] );

		var left_margin = get_left_margin();
		var top_margin = get_top_margin();

	    var x = e.clientX - translate_x(canvas_section) - left_margin - 523;
	    var y = e.clientY - translate_y(canvas_section) - top_margin - 142;

		context.strokeStyle = "black";
		context.lineWidth = 3;
        context.moveTo( x, y );

		keepDrawing = true;
		
	}
}


//keep drawing in target2
target2.onmousemove = function (e) {
	if ( readyForDrawing ){
		if ( keepDrawing ){
		e.preventDefault();

		var target_id = e.target.id;
		var canvas = document.getElementById( target_id );
		var context = canvas.getContext("2d");

		var delete_under = target_id.split('_');
		var canvas_section = document.getElementById( delete_under[0] + delete_under[1] );

		var left_margin = get_left_margin();
		var top_margin = get_top_margin();

		var x = e.clientX - translate_x(canvas_section) - left_margin - 523;
	    var y = e.clientY - translate_y(canvas_section) - top_margin - 142;

		context.lineTo( x, y );
		context.stroke();
		context.moveTo( x, y );
		}
	}
}


//stop drawing
onmouseup = function (e) {
	if ( readyForDrawing ){
		keepDrawing = false;
	}
}


//target에 drop시
target.ondrop = function (e) {
	var target = document.getElementById("target");
	//new post일 때
	if (dragId == en1){
		var newA = document.createElement("section");
	    var newE = document.createElement("textarea");
	    newA.id = "post[" + elementNum + "]";
  	    newA.draggable = "true";
	    newE.cols = "5";
	    newE.rows = "5";

        var target = document.getElementById("target");
	    newA.appendChild(newE);
        target.appendChild(newA);

	    var left_margin = get_left_margin();
		var top_margin = get_top_margin();

	    var x = e.clientX - left_margin - 13;
	    var y = e.clientY - top_margin - 13;

	    var new_post = document.getElementById("post[" + elementNum + "]");
	    new_post.style.WebkitTransform = "translate(" + x + "px,"
	                                      + y + "px)";
	    elementNum++;
	}

	
    //post를 옮길 때
	else if (post_name[0] == en2){
		var where = where_from();

		//target 내부에서 옮길 때
		if ( where == target.id ){
			var left_margin = get_left_margin();
			var top_margin = get_top_margin();
	
		    var x2 = e.clientX - left_margin - 13;
		    var y2 = e.clientY - top_margin - 13;		

			var not_newpost = document.getElementById("post[" + post_name[1]);
		    not_newpost.style.WebkitTransform = "translate(" + x2 + "px,"
												+ y2 + "px)";
		}

		//target2 에서 들어왔을 때
		else if ( where == target2.id ){
			var old_node = document.getElementById(dragId);
			var new_node = old_node.cloneNode();
			new_node.lastChild.width = old_node.lastChild.width;
			new_node.lastChild.height = old_node.lastChild.height;
			new_node.lastChild.value = old_node.lastChild.value;

			target2.removeChild( old_node );
			target.appendChild( new_node );

			var left_margin = get_left_margin();
			var top_margin = get_top_margin();


			var x2 = e.clientX - left_margin - 13;
		    var y2 = e.clientY - top_margin - 13;

		    new_node.style.WebkitTransform = "translate(" + x2 + "px,"
	                                          + y2 + "px)";
		}
	}


    //new canvas일 때
	else if (dragId == en3){
		var newA = document.createElement("section");
	    var newE = document.createElement("canvas");
	    newA.id = "canvas[" + elementNum2 + "]";
		newE.width = 150; 
		newE.height = 150;
  	    newA.draggable = "true";

		newE.id = "canvas_[" + elementNum2 + "]";

        var target = document.getElementById("target");
	    newA.appendChild(newE);
        target.appendChild(newA);

	    var left_margin = get_left_margin();
		var top_margin = get_top_margin();

	    var x = e.clientX - left_margin - 13;
	    var y = e.clientY - top_margin - 13;

	    var new_canvas = document.getElementById("canvas[" + elementNum2 + "]");
	    new_canvas.style.WebkitTransform = "translate(" + x + "px,"
		                                    + y + "px)";
		elementNum2++;
	}


	//canvas를 옮길 때
	else if (canvas_name[0] == en4){
		var where = where_from();

		//target 내부에서 옮길 때
		if ( where == target.id ){

			var left_margin = get_left_margin();
			var top_margin = get_top_margin();

			var x2 = e.clientX - left_margin - 13;
			var y2 = e.clientY - top_margin - 13;

			var new_canvas = document.getElementById("canvas[" + canvas_name[1]);
			new_canvas.style.WebkitTransform = "translate(" + x2 + "px,"
		                                    + y2 + "px)";
			}

		//target2 에서 들어올 때
		else if ( where == target2.id ){
			var old_node = document.getElementById(dragId);
			var new_node = old_node.cloneNode();

			var data = old_node.lastChild.toDataURL();
			var context = new_node.lastChild.getContext("2d");
			var img = new Image();
			img.src = data;
			context.drawImage(img, 0, 0);

			target2.removeChild( old_node );
			target.appendChild( new_node );

			var left_margin = get_left_margin();
			var top_margin = get_top_margin();

			var x2 = e.clientX - left_margin - 13;
			var y2 = e.clientY - top_margin - 13;

			var new_canvas = document.getElementById("canvas[" + canvas_name[1]);
			new_canvas.style.WebkitTransform = "translate(" + x2 + "px,"
		                                    + y2 + "px)";
		}
	}
}




//target2에 drop할 때
target2.ondrop = function (e) {

	//new post일 때
	if (dragId == en1){
		var newA = document.createElement("section");
	    var newE = document.createElement("textarea");
	    newA.draggable = "true";
	    newA.id = "post[" + elementNum + "]";
	    newE.cols = "5";
	    newE.rows = "5";

	    newA.appendChild(newE);
        target2.appendChild(newA);

	    var left_margin = get_left_margin();
		var top_margin = get_top_margin();


	    var x = (e.clientX - left_margin) - 513 - 10;
	    var y = e.clientY - top_margin - 128;

	    var new_post = document.getElementById("post[" + elementNum + "]");
	    new_post.style.WebkitTransform = "translate(" + x + "px,"
	                                      + y + "px)";
		elementNum++;
	}


    //post를 옮길 때
	else if (post_name[0] == en2){
		var where = where_from();

		//target2 내부에서 옮길 때
		if ( where == target2.id ){

			var left_margin = get_left_margin();
			var top_margin = get_top_margin();


			var x2 = (e.clientX - left_margin) - 513 - 10;
			var y2 = e.clientY - top_margin - 128;

			var new_post = document.getElementById("post[" + post_name[1]);
			new_post.style.WebkitTransform = "translate(" + x2 + "px,"
											+ y2 + "px)";
		}

		//target 에서 들어올 때
		else if ( where == target.id ){
			var old_node = document.getElementById(dragId);
			var new_node = old_node.cloneNode();
			new_node.lastChild.width = old_node.lastChild.width;
			new_node.lastChild.height = old_node.lastChild.height;
			new_node.lastChild.value = old_node.lastChild.value;

			target.removeChild( old_node );
			target2.appendChild( new_node );

			var left_margin = get_left_margin();
			var top_margin = get_top_margin();


			var x2 = (e.clientX - left_margin) - 513 - 10;
			var y2 = e.clientY - top_margin - 128;

			var new_post = document.getElementById("post[" + post_name[1]);
			new_post.style.WebkitTransform = "translate(" + x2 + "px,"
											+ y2 + "px)";

		}
	}


	 //new canvas일 때
	else if (dragId == en3){
		var newA = document.createElement("section");
	    var newE = document.createElement("canvas");
	    newA.id = "canvas[" + elementNum2 + "]";
		newE.width = 150; 
		newE.height = 150;
  	    newA.draggable = "true";

		newE.id = "canvas_[" + elementNum2 + "]";

	    newA.appendChild(newE);
        target2.appendChild(newA);

	    var left_margin = get_left_margin();
		var top_margin = get_top_margin();


	    var x = (e.clientX - left_margin) - 513 - 10;
	    var y = e.clientY - top_margin - 128;

	    var new_canvas = document.getElementById("canvas[" + elementNum2 + "]");
	    new_canvas.style.WebkitTransform = "translate(" + x + "px,"
		                                    + y + "px)";
	    elementNum2++;
	}

	//canvas를 옮길 때
	else if (canvas_name[0] == en4){
		var where = where_from();

		//target2 내부에서 옮길 때
		if ( where == target2.id ){
			var left_margin = get_left_margin();
			var top_margin = get_top_margin();

			var x2 = (e.clientX - left_margin) - 513 - 10;
			var y2 = e.clientY - top_margin - 128;

			var new_canvas = document.getElementById("canvas[" + canvas_name[1]);
			new_canvas.style.WebkitTransform = "translate(" + x2 + "px,"
		                                    + y2 + "px)";
		}


		//target 에서 들어올 때
		else if ( where == target.id ){
			var old_node = document.getElementById(dragId);
			var new_node = old_node.cloneNode();

			var data = old_node.lastChild.toDataURL();
			var context = new_node.lastChild.getContext("2d");
			var img = new Image();
			img.src = data;
			context.drawImage(img, 0, 0);

			target.removeChild( old_node );
			target2.appendChild( new_node );

			var left_margin = get_left_margin();
			var top_margin = get_top_margin();

			var x2 = (e.clientX - left_margin) - 513 - 10;
			var y2 = e.clientY - top_margin - 128;

			var new_canvas = document.getElementById("canvas[" + canvas_name[1]);
			new_canvas.style.WebkitTransform = "translate(" + x2 + "px,"
		                                    + y2 + "px)";
		}
	}
}


//post or canvas를 삭제할 때
garbage_box.ondrop = function (e) {

	if ( post_name[0] == en2 || canvas_name[0] == en4 ){
		e.preventDefault();

		var remove_node = document.getElementById(dragId);
		var in_here = false;

		var sec_array = target.getElementsByTagName("section");

		for ( var i=0; i < sec_array.length; i++){
			if ( sec_array[i].id == remove_node.id ){
				in_here = true;
				break;
			}
		}

		if ( in_here )
			target.removeChild(remove_node);

		else
			target2.removeChild(remove_node);
	}
}



//local storage를 이용한 저장
save.onclick = function (e) {

	var sec_array = target2.getElementsByTagName("section");

	for ( var i=0; i < sec_array.length; i++){
		
		var saving_node = document.getElementById( sec_array[i].id );
		var node_name = saving_node.id.split('[');
		var node_type = node_name[0];
		
		if ( node_type == en2){
			var n_width = saving_node.lastChild.style.width;
			var n_height = saving_node.lastChild.style.height;

			if ( !n_width ) n_width = 56;
			if ( !n_height ) n_height = 79;
			
			var json = 
			{ "type" : "post",
				"translateX" : translate_x( saving_node ),
				"translateY" : translate_y( saving_node ),
				"width" : n_width,
				"height" : n_height,
				"data" : saving_node.lastChild.value
			};

			localStorage.setItem( i , JSON.stringify( json ) );
		}

		else if( node_type == en4){
			
			var json = 
			{ "type" : "canvas",
				"translateX" : translate_x( saving_node ),
				"translateY" : translate_y( saving_node ),
				"data" : saving_node.lastChild.toDataURL()
			};


			localStorage.setItem( i , JSON.stringify( json ) );
		}

	}
}


//local storage를 이용한 load
load.onclick = function (e) {
	
	var variableNum = 0;

	if ( localStorage ){

		var length = localStorage.length;
		for( variableNum; variableNum < length; variableNum++){

			var yet = localStorage.getItem( variableNum );
			var loading_node = JSON.parse( yet );

			if( loading_node.type == "post" ){

				var newA = document.createElement("section");
				var newE = document.createElement("textarea");
				newA.draggable = "true";
				newA.id = "post[" + elementNum + "]";
				newE.cols = "5";
				newE.rows = "5";
				newE.style.width = loading_node.width;
				newE.style.height = loading_node.height;
				newE.value = loading_node.data;
	
			    newA.appendChild(newE);
				target2.appendChild(newA);
	
			    var left_margin = get_left_margin();
				var top_margin = get_top_margin();
	
	
				var x = loading_node.translateX;
				var y = loading_node.translateY;
	
				var new_post = document.getElementById("post[" + elementNum + "]");
				new_post.style.WebkitTransform = "translate(" + x + "px,"
		                                      + y + "px)";
				
				elementNum++;
	
			}

			else if( loading_node.type == "canvas" ){

				var newA = document.createElement("section");
				var newE = document.createElement("canvas");
				newA.id = "canvas[" + elementNum2 + "]";
				newE.width = 150; 
				newE.height = 150;
  				newA.draggable = "true";
				
				var context = newE.getContext("2d");
				var img = new Image();
				img.src = loading_node.data;
				context.drawImage(img, 0, 0);

				newE.id = "canvas_[" + elementNum2 + "]";

				newA.appendChild(newE);
				target2.appendChild(newA);

				var left_margin = get_left_margin();
				var top_margin = get_top_margin();


				var x = loading_node.translateX;
				var y = loading_node.translateY;

				var new_canvas = document.getElementById("canvas[" + elementNum2 + "]");
				new_canvas.style.WebkitTransform = "translate(" + x + "px,"
		                                    + y + "px)";
				elementNum2++;
	
			}

			localStorage.removeItem( variableNum );
		}
		
	}
}