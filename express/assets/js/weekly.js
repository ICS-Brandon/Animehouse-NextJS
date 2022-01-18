/*
  Majority of functionality for show.html page
  Needs refactoring to rename variables to be general rather than specific
*/

/*
  Function that fetches all posts of a specific type such as weekly
  First pulls display type and any filters from the URL
  Upon receiving response loop through and create HTML objects
  If any filter Options set the specified filters
  TODO-When a filter is set add it to URL
*/
async function fetchWeeklyPosts(){
  let type = getType();
  let filterOptions = getFilters();
  setTitleDisplay(type);
  let queryReq = {}
  queryReq.type = "SELECTALL";
  if(type === ""){
    setTitleDisplay("All");
    type = "any";
  }
  queryReq.filter = type;
  let result = await fetch('/reqQueryShow',{
    method:"POST",
    body: JSON.stringify(queryReq),
    headers:{"Content-Type":"application/json"},
  });
  let querResp = await result.json();
  let i
  for(i = 0; i < querResp.length; i++){
    createHTML(querResp[i]);
  }
  if(filterOptions){
    setFilter(filterOptions);
  }
}

/*
  Based upon the display type set the title in the header of the page and in the search results
*/
function setTitleDisplay(type){
  let title = document.getElementsByClassName("weeklyTitle")[0].children[0];
  title.innerHTML = (type.charAt(0).toUpperCase() + type.slice(1)) + " Reviews";
  let menuHeader = document.getElementById("header");
  let test = menuHeader.children[0].children[0];
  test.innerHTML = type.charAt(0).toUpperCase() + type.slice(1);
}

/*
  Pull display type from URL
*/
function getType(){
  let url = new URLSearchParams(document.location.search.substring(1));
  let display = url.get("display");
  if(!display){
    return "";
  }
  return display;
}

/*
  Pull all filters from URL
*/
function getFilters(){
  let url = new URLSearchParams(document.location.search.substring(1));
  let filters = url.get("filter");
  return filters;
}

/*
  If any filter present then set it
*/
function setFilter(filter){
  let box = document.getElementById("filter"+filter);
  box.click();
  let options = document.getElementById("dropDownContent");
  let image = document.getElementById("imageRotate");
  image.classList.toggle("imgRotate");
  options.classList.toggle("visible");
  options.classList.toggle("heightTrans");
}

/*
  Standard function to create HTML content
*/
function createHTML(data){

  let topLevel = document.getElementsByClassName("gridContainer")[0];

  let miniPost = document.createElement("article");
  miniPost.classList.add("mini-post");
  miniPost.classList.add("bgColorDark");
  miniPost.classList.add("miniTransition");
  miniPost.classList.add(data.genre.replace(/\s+/g, ''));
  miniPost.classList.add(data.pid);
  miniPost.classList.add(data.post_type);
  miniPost.classList.add('grid-item');
  miniPost.id = data.post_id;

  let headCont = document.createElement("header");
  let titleCont = document.createElement("h3");
  titleCont.classList.add("alignItemLeft");

  let title = document.createElement("a");
  title.classList.add("brightText");
  title.setAttribute("href",data.link);
  title.innerHTML = data.post_title;

  let date = document.createElement("time");
  date.classList.add("published");
  date.classList.add("mediumText");
  date.classList.add("alignItemLeft");
  date.innerHTML = data.post_date;

  let imgCont = document.createElement("a");
  imgCont.setAttribute("href",data.link);
  imgCont.classList.add("author");

  let authImg = document.createElement("img");
  authImg.setAttribute("src",data.post_auth);
  authImg.classList.add("alignItemRight");

  let postImgAnchor = document.createElement("a");
  postImgAnchor.setAttribute("href",data.link);
  postImgAnchor.classList.add("image");

  postImgDiv = document.createElement("div");
  postImgDiv.classList.add("image");

  let postImg = document.createElement("img");
  postImg.setAttribute("src",data.img_path);

  postImgDiv.appendChild(postImg);
  postImgAnchor.appendChild(postImgDiv);

  imgCont.appendChild(authImg);

  titleCont.appendChild(title);

  headCont.appendChild(titleCont);
  headCont.appendChild(date);
  headCont.appendChild(imgCont);

  miniPost.appendChild(headCont);
  miniPost.appendChild(postImgAnchor);

  topLevel.appendChild(miniPost);

}
