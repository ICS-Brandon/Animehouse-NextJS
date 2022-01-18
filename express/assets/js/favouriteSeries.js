/*
  File used to fetch and display favorite series
  Requests all favorite series and passes to manipulator function to add to HTML
*/


/*
  Requests all favorite series from specified table in Database then passes to load function
*/
async function fetchSeries(){
  let queryReq = {}
  queryReq.type = "SELECTFAV";
  let result = await fetch('/reqQueryFavourite',{
    method:"POST",
    body: JSON.stringify(queryReq),
    headers:{"Content-Type":"application/json"},
  });
  let querResp = await result.json();
  loadFavouriteSeries(querResp);
}

/*
  Takes rows of data as input and sets proper values within the established HTML elements
*/
function loadFavouriteSeries(data){
  let i
  let posts = document.getElementsByClassName("posts")[0].children;
  for(i = 0; i < data.length; i++){
    let header = posts[i].children[0].children[0].getElementsByTagName("h3")[0];
    header.children[0].innerHTML = data[i].fav_name;
    let time = posts[i].children[0].children[0].getElementsByTagName("time")[0];
    time.innerHTML = data[i].fav_studio;
    let image = posts[i].children[0].children[1].children[0];
    image.setAttribute("src",data[i].fav_path);
  }
}
