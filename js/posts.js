function viewPosts() {
    var url = location.hash.replace('#', '');
    if (url == "" || url == "/")
        ViewIndex();

    httpGetAsync(url, updatePosts);
}

function viewIndex() {
    var url = "/post-listing.html";
    httpGetAsync(url, updatePosts);
}

function updatePosts(data) {
    var posts_list = document.getElementById("post-listing");
    posts_list.innerHTML = data;
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }
        else {
            ViewIndex();
        }
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
