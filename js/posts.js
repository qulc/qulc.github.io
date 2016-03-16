function goBack() {
    var url = '/post-listing.html';
    httpGetAsync(url, updatePosts);
}

function viewPosts(url) {
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
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}