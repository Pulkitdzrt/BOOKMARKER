document.getElementById('myform').addEventListener('submit', savebookmark);

function savebookmark(e){
	var sitename = document.getElementById('sitename').value;
	var siteURL = document.getElementById('siteURL').value;

	var bookmark = {
		name: sitename,
		url: siteURL
	}

	if(!sitename || !siteURL){
		alert("Please fill the form correctly!");
		return false;

		var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
		var regex = new RegExp(expression);

		if (!siteURL.match(regex)) {
		  alert("Please enter a valid URL");
		  return false;
		} 
	}


	if (localStorage.getItem('bookmarks') === null) {
		var bookmarks = [];
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	} else {
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	document.getElementById('myform').reset();

	fetchbookmarks();

	e.preventDefault();
}

function deletebookmarks(url){
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		for(var i=0; i<bookmarks.length; i++){
			if (bookmarks[i].url == url) {
				bookmarks.splice(i,1);
			}
		}
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
		fetchbookmarks();
}

function fetchbookmarks(){
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		var bookmarksresults = document.getElementById('bookmarksresult');
		bookmarksresults.innerHTML = ''	;
		for(var i=0; i<bookmarks.length; i++){
			var name = bookmarks[i].name;
			var url = bookmarks[i].url;
				

		bookmarksresults.innerHTML += '<div class="well">' +
									  '<h3>' + name + 
									  '<a class="btn btn-default" target="_blank" href="'+url+'">VISIT</a>' +
									  '<a onclick="deletebookmarks(\'' + url + '\')" class="btn btn-danger" href="#">DELETE</a>' +									 
									  '</h3>'+
									  '</div>';
}
}