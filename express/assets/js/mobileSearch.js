/*
  Handles all mobile display queries
  Operates differently than Desktop search
*/

/*
  Event listener for when the page is loaded
  Pulls query string from url once loaded and decodes
  Once string is decoded fetch search results to display
*/
document.addEventListener("DOMContentLoaded",function(){
  var string = window.location.href.split("Query=").pop();
  string = string.replace(/\+/g," ");
  string = decodeString(string);
  fetchResults(string);
})

/*
  Search and remove function that makes use of indexing
  Find first index of '%' character (if any)
  while there is a character found execute following logic:
    Append slice of input from start to occurrence of '%'
    Set input to the value of a slice from occurrence of '%' to end of string
    set i to next index of '%' character
  Logic check after while loop to see if input contains any characters after
  Removing last grouping of '%'
    If true then append remainder of string and return, otherwise simply return
*/
function decodeString(input){
  let i = input.indexOf("%");
  let newString = "";
  while(i != -1){
    newString = newString + input.slice(0,i);
    input = input.slice(i+3,input.length);
    i = input.indexOf("%");
  }
  if(/^[A-Za-z0-9 ]*$/.test(input)){
    newString = newString + input;
  }
  return newString;
}


/*
  Uses fetch request to get search results to display to user
  Based on length of return value set title for results, e.g '2 Results'
  Create HTML to display the results
*/
async function fetchResults(searchBy){
  removeOldSearch();
  var queryReq = {}
  queryReq.type = "GETSEARCH";
  queryReq.delim = searchBy;
  let result = await fetch('/reqQuerySearch',{
    method:"POST",
    body: JSON.stringify(queryReq),
    headers:{"Content-Type":"application/json"},
  });
  var querResp = await result.json();
  titleResults(querResp.length, searchBy);
  mobileCreateHTML(querResp);
}

/*
  Simple function to display the amount of results for the query
  If there is 0 or more than 1 results trigger first statement
  Otherwise fire second
*/
function titleResults(num, data){
  var title = document.getElementById("searchResults");
  var titleInput;
  if(num != 1){
    titleInput = num + " results for '" + data + "'";
  } else{
    titleInput = num + " result for '" + data + "'";
  }
  title.innerHTML = titleInput;
}

/*
  Iteratively creates all the HTML to display the search query
  Fairly standard procedure seen many times already
*/
function mobileCreateHTML(data){

  var i;
  var topLevel = document.getElementsByClassName("sortParent")[0];

  for(i = 0; i < data.length; i++){

     var divCapsule = document.createElement("div");
     divCapsule.classList.add("sort");
     divCapsule.classList.add("padFix");
     divCapsule.id = data[i].post_id;

     var genre = document.createElement("h6");
     genre.classList.add("overlay");
     genre.classList.add("mediumText");
     genre.classList.add("betterText");
     genre.innerHTML = data[i].genre;

     var anchorCapsule = document.createElement("a");
     anchorCapsule.setAttribute("href",data[i].mobilelink);

     var border = document.createElement("div");
     border.classList.add("border");
     border.classList.add("bgColorDark");

     var image = document.createElement("img");
     image.classList.add("postImage");
     image.setAttribute("src",data[i].img_path);

     var titleDiv = document.createElement("div");
     titleDiv.classList.add("paddingFix");

     var title = document.createElement("h3");
     title.classList.add("brightText");
     title.innerHTML = data[i].post_title;

     titleDiv.appendChild(title);

     border.appendChild(image);
     border.appendChild(titleDiv);

     anchorCapsule.appendChild(border);

     divCapsule.appendChild(genre);
     divCapsule.appendChild(anchorCapsule);

     topLevel.appendChild(divCapsule);

     sortSearchResults();

  }
}

/*
  Mobile function used to sort the search results
  Should generalize the sorting so that it can be used by various pages in different formats
*/
function sortSearchResults() {
    console.log("Hello");
   var list, i, sortFlag, LiEle, sorted;
   list = document.querySelector(".sortParent");
   sortFlag = true;
   while (sortFlag) {
      sortFlag = false;
      LiEle = list.getElementsByClassName("sort");
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

/*
  Insures that the results page is empty before population
*/
function removeOldSearch(){
  var parentSort = document.getElementsByClassName("sortParent")[0];
  parentSort.innerHTML = "";
}
