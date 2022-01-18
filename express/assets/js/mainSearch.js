/*
  Handles all logic used with Desktop search functionality
  Specific listeners for each search bar and a general listener used to escape from search
  Lots going on so functinality more aptly covered in each function description
*/

/*
  Event listener for smaller search bar that opens on icon click
  When icon is clicked add to classlist to cue transition to make it visible
  Add class to move results view down to make it visible
  Stop event from propagating to parent when clicked
*/
document.getElementById("enableSearchView").addEventListener("click",function(event){
  let search = document.getElementById("newSearch");
  search.classList.add("visibleSearch");
  let focus = document.getElementById("textFocus");
  focus.focus();
  let div = document.getElementById("mainSearchResults");
  div.classList.remove("transformObjectUp");
  div.style.visibility = "visible";
  div.classList.add("transformObjectDown");
  event.stopPropagation();
  removeStupidHashtag();
})

function removeStupidHashtag(){
  let url = window.location.href;
  url = url.replace("#search","");
  window.history.pushState({},'',url);
}

/*
  Triggers on click of the body outside of search items
  Empties the input of the search box and removes all children from results
  Undoes transitions and removes classes to return smaller search bar to resting state
*/
document.getElementById("onLoad").addEventListener("click",function(){
  let search = document.getElementById("newSearch");
  search.classList.remove("visibleSearch");
  let focus = document.getElementById("textFocus");
  focus.value = "";
  let div = document.getElementById("mainSearchResults");
  div.classList.remove("transformObjectDown")
  div.classList.add("transformObjectUp");
  div.style.visibility = "hidden";
})

//Event listener to stop propagation
document.getElementById("mainSearchResults").addEventListener("click",function(event){
  event.stopPropagation();
})

/*
  Event listener for large search area in hamburger menu
  Removes all old entries from the search menu and sets results area to hidden
*/
document.getElementById("enableLargeSearchView").addEventListener("click",function(){
  removeOldLarge();
  let focus = document.getElementById("largeSearch");
  let searchArea = document.getElementById("largeSearchParent");
  searchArea.style.visibility = "hidden";
  focus.value = "";
  focus.focus();
})

  //Global timeout variable
  let timeout = null;

//Event listener to trigger search function when a key is presseed
//Each time a key is pressed a cooldown is enacted to make sure no other input is missed before submission
document.getElementById("textFocus").addEventListener("keyup",function(e){
  clearTimeout(timeout);
  timeout = setTimeout(fetchSmallResults,600);
})

  //Global timeout variable
  let largeTimeout = null

//Event listener to trigger search function when a key is pressed
//Each time a key is pressed a cooldown is enacted to make sure no other input is missed before submission
document.getElementById("largeSearch").addEventListener("keyup",function(e){
  clearTimeout(largeTimeout);
  largeTimeout = setTimeout(fetchLargeResults,600);
})

/*
  Clears all the search results in the smaller searchbar
*/
function removeOldSmall(){
  let parentDiv = document.getElementById("searchParent");
  parentDiv.innerHTML = "";
}

/*
  Clears all the search results in the search bar in the menu
  Also hides the div that displays the results
*/
function removeOldLarge(){
  document.getElementById("sectionWrapper").classList.add("invisible");
  let parentDiv = document.getElementById("largeSearchParent");
  parentDiv.innerHTML = "";
  parentDiv.style.visibility = "hidden";
}


/*
  Async function that makes a fetch request based on a returned query
  First ensures that the value in the text field is not null
  If true then remove all previous search results
  Take input from text field and delimit to remove all non-alphanumeric or spaces
  Make request and update search results for search bar
  If value is null then empty search results
*/
async function fetchSmallResults(){
  if(document.getElementById("textFocus").value != ""){
    removeOldSmall();
    let queryReq = {}
    queryReq.type = "GETSEARCH";
    let delim = document.getElementById("textFocus").value;
    delim = delim.replace(/[^A-Za-z0-9 ]/g,'');
    queryReq.delim = delim.trim();
    let result = await fetch('/reqQuerySearch',{
      method:"POST",
      body: JSON.stringify(queryReq),
      headers:{"Content-Type":"application/json"},
    });
    let querResp = await result.json();
    setResultsSmall(querResp,delim);
  } else{
    removeOldSmall();
  }
}

/*
  Takes rows of data as input and creates search results based on data
*/
function setResultsSmall(data,delim){
  let topLevel = document.getElementById("searchParent");
  topLevel.innerHTML = "";
  let i
  for(i = 0; i < data.length; i++){
    let anchor = document.createElement("a");
    anchor.setAttribute("href",data[i].link);
    anchor.classList.add("searchResultsSmall");
    anchor.id = data[i].post_id;
    anchor.innerHTML = data[i].post_title;
    topLevel.appendChild(anchor);
  }
  sortListSearches("searchParent","searchResultsSmall");
}

/*
  Async function that makes a fetch request based on a returned query
  Operates largely the same as fetchSmallResults()
*/
async function fetchLargeResults(){
  if(document.getElementById("largeSearch").value != ""){
    removeOldLarge();
    document.getElementById("sectionWrapper").classList.remove("invisible");
    let queryReq = {}
    let delim = document.getElementById("largeSearch").value;
    delim = delim.replace(/[^A-Za-z0-9 ]/g,'');
    queryReq.type = "GETSEARCH";
    queryReq.delim = delim.trim();
    let result = await fetch('/reqQuerySearch',{
      method:"POST",
      body: JSON.stringify(queryReq),
      headers:{"Content-Type":"application/json"},
    });
    let querResp = await result.json();
    setResultsLarge([querResp], delim);
  } else{
    removeOldLarge();
  }
}

async function fetchFromURL(val,type){
  queryReq = {};
  queryReq.type = "GETSEARCH";
  queryReq.delim = val;
  let result = await fetch('/reqQuerySearch',{
    method:"POST",
    body: JSON.stringify(queryReq),
    headers:{"Content-Type":"application/json"},
  });
  let querResp = await result.json();
  if(type === "S"){
    setResultsSmall(querResp,val);
  } else {
    setResultsLarge([querResp],val);
  }
}

/*
  Takes data rows as input and displays results in the format of the featured posts
  within the search div
  If data is empty then add 'No Results' to div
*/
function setResultsLarge(resp, delim){
  let topLevel = document.getElementById("largeSearchParent");
  let searchArea = document.getElementById("largeSearchParent");
  searchArea.style.visibility = "visible";

  let i;
  for(let x = 0 ; x < resp.length; x++){
    for(i = 0; i < resp[x].length; i++){
      data = resp[x];
      let articleContainer = document.createElement("article");
      articleContainer.classList.add("mini-post");
      articleContainer.classList.add("bgColorDark");
      articleContainer.classList.add("miniTransition");
      articleContainer.id = data[i].post_id;

      let header = document.createElement("header");
      let headThree = document.createElement("h3");
      let titleAnchor = document.createElement("a");
      titleAnchor.setAttribute("href",data[i].link);
      titleAnchor.classList.add("brightText");
      titleAnchor.innerHTML = data[i].post_title;

      let authAnchor = document.createElement("a");
      authAnchor.classList.add("author");

      let authImage = document.createElement("img");
      authImage.setAttribute("src","https://lh3.googleusercontent.com/7MpxdyTQ7bCFeC-KlUnAG7crRjK61curPF6wheLj7RfjBMAZInp3QOZnddRo_pAR-16LBN9xFZdzlL_3hvxqXcSrDwNWcuJXLqZEuh8ex8fP2ZmHfSYo-Bcmx3sP_9lY8__MfiTgdA=w2400");

      let date = document.createElement("time");
      date.classList.add("published");
      date.classList.add("mediumText");
      date.innerHTML = data[i].post_date;

      let imgAnchor = document.createElement("a");
      imgAnchor.classList.add("image");
      imgAnchor.setAttribute("href",data[i].link);

      let postImage = document.createElement("img");
      postImage.setAttribute("src",data[i].img_path);

      authAnchor.appendChild(authImage);
      headThree.appendChild(titleAnchor);

      header.appendChild(headThree);
      header.appendChild(date);
      header.appendChild(authAnchor);

      imgAnchor.appendChild(postImage);

      articleContainer.appendChild(header);
      articleContainer.appendChild(imgAnchor);

      topLevel.appendChild(articleContainer);
    }
  }

  sortListSearches("largeSearchParent","mini-post");

  if(topLevel.children.length == 0){
    results = document.createElement("h3");
    results.innerHTML = "No Results";
    topLevel.appendChild(results);
  }
}

function sortListSearches(parentId, childClass) {
   let list, i, sortFlag, LiEle, sorted;
   list = document.getElementById(parentId);
   sortFlag = true;
   while (sortFlag) {
      sortFlag = false;
      LiEle = list.getElementsByClassName(childClass);
      for (i = 0; i < LiEle.length - 1; i++) {
         sorted = false;
         if ( LiEle[i].id < LiEle[i + 1].id ) {
            sorted = true;
            break;
         }
      }
      if (sorted) {
         LiEle[i].parentNode.insertBefore(LiEle[i + 1], LiEle[i]);
         sortFlag = true;
      }
   }
}
