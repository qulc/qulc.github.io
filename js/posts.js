function viewPosts() {
    var url = location.hash.replace('#', '');

    if (url == "" || url == "/") {
        viewIndex();
        return null;
    }
    httpGet(url);

    var disqus = document.getElementById('disqus');
    if (disqus)
        eval(disqus.textContent);
}

function viewIndex() {
    var url = "/post-listing.html";
    httpGet(url);
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

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );

    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        updatePosts(xmlHttp.responseText);
    }
    else {
        viewIndex();
    }
    return xmlHttp.responseText;
}
