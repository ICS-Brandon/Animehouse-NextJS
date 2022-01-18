/*
  Used to display featured posts for a given location
  Input is passed statically and informaiton returned dynamically to update
*/


/*
  Makes fetch request to server to pull information from database
  Once recieved load the information into the HTML
*/
async function fetchAboutPosts(){
  let queryReq = {}
  queryReq.type = "SELECTFEAT";
  queryReq.location = "aboutme";
  let result = await fetch('/reqQueryFeatured',{
    method:"POST",
    body: JSON.stringify(queryReq),
    headers:{"Content-Type":"application/json"},
  });
  var querResp = await result.json();
  loadFeaturedPosts(querResp);
}


/*
  Takes database rows as input and loads values into established HTML elements
*/
function loadFeaturedPosts(data){

  let postContainer = document.getElementById("featuredDiv");
  let div = postContainer.getElementsByClassName("mini-post");

  let i
  for(i = 0; i < 4; i++){
    let header = div[i].getElementsByTagName("header")[0];
    let img_anchor = div[i].getElementsByClassName("image")[0];
    var headerChildren = header.children;
    headerChildren[0].children[0].innerHTML = data[i].post_title;
    headerChildren[1].innerHTML = data[i].post_date;
    img_anchor.setAttribute("href",data[i].post_link);
    let image = img_anchor.children[0];
    image.setAttribute("src",data[i].post_path);
  }
}
