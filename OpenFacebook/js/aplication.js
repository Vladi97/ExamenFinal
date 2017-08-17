/*localStorage.setItem('users', JSON.stringify(""));
localStorage.setItem('posts', JSON.stringify(""));*/
var users = JSON.parse(localStorage.getItem('users'));

if (!users) {
	users = [];
}


/*Login*/
document.getElementById("login_button").addEventListener("click", go);
document.getElementById("new_post").addEventListener("click", savePost);

function go(){
	var user = document.getElementById("username_login").value;
	var pass = document.getElementById("password_login").value;
	var go = true;

	for (var i = 0; i < users.length; i++) {
		var u = users[i];
		if (u.email==user) {
			if (u.password==pass) {
                localStorage.setItem('current_user', JSON.stringify(u));
				document.getElementById("login_button").href = "post/post.html";
				document.getElementById("login_button").click();
				go = false;
			}
		}
	}
	if (go) {
		alert("Datos incorrectos!");
	}
}

/*Post*/

function savePost(){
	debugger;
	var posts = JSON.parse(localStorage.getItem('posts'));
	var current_user = JSON.parse(localStorage.getItem('current_user'));
	var index = JSON.parse(localStorage.getItem('index_post'));
	var valor = 1;
	if (index==null) {
		index = "0";
	}
	valor += parseInt(index);

	if (!posts) {
        posts = [];
    }

    var message = document.getElementById("post_input").value;
    if (message!="") {
        var post = {
            "name": current_user.name,
            "email": current_user.email,
            "message": message,
            "index": index
        };
	    posts.push(post);
	    localStorage.setItem('posts', JSON.stringify(posts));
    }else{
    	alert("Debe ingresar un mensaje!");
    }
    localStorage.setItem('index_post', JSON.stringify(valor));
    loadPost();
}

function salir(){
	localStorage.setItem('current_user', JSON.stringify(""));
	document.getElementById("logout").href = "/OpenFacebook/index.html";
	document.getElementById("logout").click();
}

function loadPost(){
	var current_user = JSON.parse(localStorage.getItem('current_user'));
	var posts = JSON.parse(localStorage.getItem('posts'));

    if (!posts) {
        posts = [];
    }
    var text = "";
    for (var i = 0; i < posts.length; i++) {
    	text += "<form action=\"\" method=\"post\" name=\"Login_Form\" class=\"form-signin\">";
    	var p = posts[i];
     	if (current_user.email==p.email) {
	     	text += "<div><h3 class = \"name\">"+p.name+"</h3><hr class=\"colorgraph\">"+"<p id="+p.index+" contenteditable=\"true\" class = \"message\">"+p.message+"</p></div>";
	     	text += "<button onclick=\"updatePost("+p.index+")\" value=\""+p.index+"\" class = \"update\">Guardar</button>";
	     	text += "<button onclick=\"deletePost("+p.index+")\" value=\""+p.index+"\" class = \"delete\">Eliminar</button>";
     	}else{
	     	text += "<div><h3>"+p.name+"</h3><hr class=\"colorgraph\">"+"<p contenteditable=\"true\" class = \"message\">"+p.message+"</p></div>";
     	}
   		text += "</form>";
     	text += "<br>";
    }
    document.getElementById("posts").innerHTML = text;
}

function deletePost(indexPost){
	debugger;
	var posts = JSON.parse(localStorage.getItem('posts'));
	var refresh = [];
	for (var i = 0; i < posts.length; i++) {
		var post = posts[i];
		if (post.index!=indexPost) {
			refresh.push(post);
		}
	}
	localStorage.setItem('posts', JSON.stringify(refresh));
	loadPost();
}

function updatePost(indexPost){
	debugger;
	var posts = JSON.parse(localStorage.getItem('posts'));
	var current_user = JSON.parse(localStorage.getItem('current_user'));
	var id = ""+indexPost+"";
	var message = document.getElementById(id).textContent;
	var refresh = [];
	for (var i = 0; i < posts.length; i++) {
		var post = posts[i];
		if (post.index==indexPost) {
			var newpost = {
	            "name": current_user.name,
	            "email": current_user.email,
	            "message": message,
	            "index": post.index
        	};
        	refresh.push(newpost);
		}else{
			refresh.push(post);
		}
	}
	localStorage.setItem('posts', JSON.stringify(refresh));
	loadPost();
}