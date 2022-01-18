/*
  Handles all view types associated with show.html
*/


//Global variable
let previousOutput = "111111111111";
let previousTypeOut = "1111";
let currentTypeOut = "";
let currentOutput = "";
let typeList = ["weekly","seasonal","general","other"];

/*
  Adds an event listener that prevent's reload on submission of form
*/
document.getElementById("searchForm").addEventListener("submit",function(e){
  hideResults();
  e.preventDefault();
})

/*
  Function used to fetch all posts with a given type
  Passes results to function to build HTML
*/
async function loadItemsMobile(){
  let type = await getTypeMobile();
  let filterOptions = await getFilterMobile();
  let queryReq = {};
  queryReq.type = "SELECTALL";
  if(!type){
    type = "any";
  }
  queryReq.filter = type;
  let result = await fetch("/reqQueryShow",{
    method:"POST",
    body:JSON.stringify(queryReq),
    headers:{"Content-Type":"application/json"},
  });
  let queryResp = await result.json();
  await mobileCreateHTML(queryResp);
  if(filterOptions){
    setFilterMobile(filterOptions);
  }
}

//Pulls display type from URL
function getTypeMobile(){
  let url = new URLSearchParams(document.location.search.substring(1));
  let type = url.get("display");
  if(type != "Anime"){
    typeList = ["volume","series","general","other"];
  }
  setFilterTypes();
  return type;
}

function setFilterTypes(){
  let typeArr = shedParent(document.getElementById("typeFilter"),3);
  for(let i = 0; i < typeArr.length; i++){
    typeArr[i].children[1].innerText = typeList[i];
  }
}

//Pulls filter from URL
function getFilterMobile(){
  let url = new URLSearchParams(document.location.search.substring(1));
  let filter = url.get("filter");
  return filter;
}

//Grabs related checkbox and clicks after making sure everything is displayed
function setFilterMobile(filter){
  let id = "filter"+(filter.replace(/[^A-Za-z0-9]/g,''));
  let test = document.getElementById(id);
  enableAllMobile();
  test.click();
}

/*
  Function used to create HTML objects, standard
*/
function mobileCreateHTML(data){

  var i;
  var topLevel = document.getElementById("showParent");

  for(i = 0; i < data.length; i++){

     var divCapsule = document.createElement("div");
     divCapsule.classList.add("sort");
     divCapsule.classList.add("padFix");
     divCapsule.classList.add(data[i].pid);
     divCapsule.classList.add(data[i].post_type);
     let genreTag = data[i].genre.split(" ").join("");
     divCapsule.classList.add(genreTag);
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
  Function used to sort elements, standard
*/
function sortSearchResults() {
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
  Used to hide and display results being search from within
  If search is empty then empty the display
  otherwise hide all posts that don't match criteria
*/
function hideResults(){
  let searchBar = document.getElementById("showMobileSearchBar");
  let searchBy = searchBar.value;

  if(searchBy === ""){
    resetMobileVisibility();
  } else{
    resetMobileVisibility();
    let liEle = document.getElementsByClassName("sort");
    let i;

    for(i = 0; i < liEle.length; i++){
      let title = liEle[i].children[1].children[0].children[1].children[0].innerHTML;
      if(!title.toLowerCase().includes(searchBy.toLowerCase())){
        liEle[i].classList.add("invisible");
      } else{
        liEle[i].classList.remove("invisible");
      }
    }
  }
}

/*
  Function to set all posts to visible
*/
function resetMobileVisibility(){
  let liEle = document.getElementsByClassName("sort");
  let i;
  for(i = 0; i < liEle.length; i++){
    liEle[i].classList.remove("invisible");
  }
}

function shedParent(parent,pos){
  let arr = parent.children;
  let ret = [];
  for(let i = pos-1; i < arr.length;i++){
    ret.push(arr[i]);
  }

  return ret;
}

/*
  Function used to add event listeners to button groups
*/
function addButtonListeners(){
  let genreFilters = document.getElementById("test");
  let typeFilters = document.getElementById("typeFilter");
  genreFilters = shedParent(genreFilters,2);
  typeFilters = shedParent(typeFilters,3);
  let sort = document.getElementsByClassName("positionFix");
  let i;

  for(i = 1; i < genreFilters.length; i++){
    genreFilters[i].addEventListener("click",toggleFilter);
  }

  for(i = 0; i < typeFilters.length;i++){
    typeFilters[i].addEventListener("click",toggleTypeFilter);
  }

  i = 0;
  for(i = 0; i < sort.length;i++){
    sort[i].addEventListener("click",toggleSort);
  }
}


/*
  Checks current filter/toggle list against previous
  If discrepenecies execute needed changes and update value
*/
function toggleFilter(){
  this.classList.toggle("brightButton");
  let buttons = document.getElementById("test");
  buttons = shedParent(buttons,2);
  let i;
  let temp = ""
  for(i = 1; i < buttons.length; i++){
    if(buttons[i].classList.contains("brightButton")){
      enableVisibilityMobile(buttons[i].id);
      temp = temp + "1";
    } else{
      disableVisibilityMobile(buttons[i].id);
      temp = temp + "0";
    }
  }
  currentOutput = temp;
  let image = document.getElementsByClassName("iconImage")[0].children[0];
  if(currentOutput.includes("1")){
    image.setAttribute("src","https://lh3.googleusercontent.com/4atOKdNXVN8BouFSaD05pBzXm98tKr2UDfGqz9WlXNZAA_asLtbuk44mkfrKDzhFfC1wsrXUg2u7Alb1FrC1IaifHVaOuN2aCJFkjSgGB_f1zqniZRQPhlfltwQXh6T0TjXcWkf_Kg=w2400");
  } else{
    image.setAttribute("src","https://lh3.googleusercontent.com/4rqwGHGd_S-BRBH-HyMmnvKQJkdwLc_FVUvXGywlonB8C2fBHH8jIof6biLPtgXpzEBh-LdT_A6FAMfYPhQiRRoxegUXpj5-NMZc_xF0q4UTUgmKWakP0q-emX66eiaAfR2baggSCA=w2400");
  }
  if(currentOutput === "00000000000" || currentOutput === "111111111111"){
    enableAllMobile();
  }
  previousOutput = currentOutput.slice();
}

function toggleTypeFilter(){
  this.classList.toggle("brightButton");
  let buttons = document.getElementById("typeFilter");
  buttons = shedParent(buttons,3);
  let i;
  let temp = ""
  for(i = 0; i < buttons.length; i++){
    if(buttons[i].classList.contains("brightButton")){
      enableVisibilityMobile(typeList[i]);
      temp = temp + "1";
    } else{
      disableVisibilityMobile(typeList[i]);
      temp = temp + "0";
    }
  }
  currentTypeOut = temp;
  let image = document.getElementsByClassName("iconImage")[0].children[0];
  if(currentTypeOut.includes("1")){
    image.setAttribute("src","https://lh3.googleusercontent.com/4atOKdNXVN8BouFSaD05pBzXm98tKr2UDfGqz9WlXNZAA_asLtbuk44mkfrKDzhFfC1wsrXUg2u7Alb1FrC1IaifHVaOuN2aCJFkjSgGB_f1zqniZRQPhlfltwQXh6T0TjXcWkf_Kg=w2400");
  } else{
    image.setAttribute("src","https://lh3.googleusercontent.com/4rqwGHGd_S-BRBH-HyMmnvKQJkdwLc_FVUvXGywlonB8C2fBHH8jIof6biLPtgXpzEBh-LdT_A6FAMfYPhQiRRoxegUXpj5-NMZc_xF0q4UTUgmKWakP0q-emX66eiaAfR2baggSCA=w2400");
  }
  if(currentTypeOut === "0000" || currentTypeOut === "1111"){
    enableAllMobile();
  }
  previousOutput = currentOutput.slice();
}

/*
  Follows one on, rest off logic
  Buttons have 3 states which is reflected by paired image
  Nearly identical logic to that in the sorting functionality of Desktop
*/
function toggleSort(){

  let title = this.id;
  let image = this.children[1];

  resetAllButtons(this.id);

  if(!this.classList.contains("asc") && !this.classList.contains("desc")){
    this.classList.add("desc");
    image.setAttribute("src","https://lh3.googleusercontent.com/4R44DaUotHs_vznwP_r2IaOTzmD-DnCvNxvMBgHaDLYG4QCQ0xCB5RRXCKYCmc8eqvySOxQMF9RpiCEUN9_AsNGmPJ9ub6wd5hAlg0brcrG4Z-6dIK6aKQeNyA1mRaDSczoVqpfIFA=w2400");
    sortByParam(this.id,0);
  } else if(!this.classList.contains("asc") && this.classList.contains("desc")){
    this.classList.remove("desc");
    this.classList.add("asc");
    image.setAttribute("src","https://lh3.googleusercontent.com/uYEJTjmaxqV-5iPjlyR-JaC24DCTS5U5SaFKFdZSAM0MAkoDZPlSoNgdc6Dtu1n8hkvf-ZnXhMB7Zg9bzDhlqlMMGCmeJ4XAXMEOsFoRs2LgnI90eZH2cEx7TydVKbN2Hm_K3-gmdA=w2400");
    sortByParam(this.id,1);
  } else{
    this.classList.remove("asc");
    this.classList.remove("desc");
    image.setAttribute("src","https://lh3.googleusercontent.com/pyUjVYe2Izt2gWvhMwFlE6R1ps_93BsNhLu9qNMWtljZ6m6qK2Nn3OuxCMlmVpfSTU09YMHCkjyb28YsF4SH-4m69ruQJtTVrXUl4hYCMSYKNDKJ3-CHqPhzsnNAJWNnGpuQugnW5A=w2400");
  }
}

/*
  Resets all buttons to default state except for the one passed as input
*/
function resetAllButtons(exempt){
  let list = document.getElementsByClassName("positionFix");
  let i;
  for(i = 0; i < list.length; i++){
    if(list[i].id != exempt){
      list[i].classList.remove("asc");
      list[i].classList.remove("desc");
      let arrow = list[i].children[1];
      arrow.setAttribute("src","https://lh3.googleusercontent.com/pyUjVYe2Izt2gWvhMwFlE6R1ps_93BsNhLu9qNMWtljZ6m6qK2Nn3OuxCMlmVpfSTU09YMHCkjyb28YsF4SH-4m69ruQJtTVrXUl4hYCMSYKNDKJ3-CHqPhzsnNAJWNnGpuQugnW5A=w2400");
    }
  }
}

/*
  Function used to sort the list of HTML items
  onec sorted pass to function to compare and update display
*/
function sortByParam(sortBy, flipped){
  let list = Array.prototype.slice.call(document.getElementById("showParent").children);
  let check = currentOutput.replace(/0/g,'').length;
  switch(sortBy){
    case "genre":
        list.sort((a,b) => {return onlyGenre(a,b)});
        if(flipped == 1){
          list = list.reverse();
        }
        sortItems(list);
        break;
    case "date":
        list.sort((a,b) => {return onlyDate(a,b)});
        if(flipped == 1){
          list = list.reverse();
        }
        sortItems(list);
        break;
    case "title":
        list.sort((a,b) => {return onlyTitle(a,b)});
        if(flipped == 1){
          list.reverse();
        }
        sortItems(list);
        break;
  }
}

/*
  Compares passed list with the live HTML collection and makes adjustments as needed
*/
function sortItems(list){
  var top = document.getElementById("showParent");
  var currentList = document.getElementsByClassName("sort");
  var i
  for(i = 0; i < list.length; i++){
    if(list[i].classList.item(2) !== currentList[i].classList.item(2)){
      top.insertBefore(list[i],currentList[i]);
    }
  }
}

/*
  Helper function used to sort by a specific value
  date and title operate similarly
*/
function onlyGenre(a,b){
  let genreA = a.children[0].innerHTML;
  let genreB = b.children[0].innerHTML;
  if(genreA < genreB){
    return 1;
  } else if(genreA > genreB){
    return -1;
  } else{
    return 0;
  }
}

function onlyDate(a,b){
  if(a.id > b.id){
    return 1;
  } else if(a.id < b.id){
    return -1;
  } else{
    return 0;
  }
}

function onlyTitle(a,b){
  let titleA = a.getElementsByClassName("paddingFix")[0].children[0].innerHTML.toUpperCase();
  let titleB = b.getElementsByClassName("paddingFix")[0].children[0].innerHTML.toUpperCase();

  if(titleA < titleB){
    return -1;
  } else if(titleA > titleB){
    return 1;
  } else{
    return 0;
  }
}

/*
  Function used to display all hidden posts
*/
function enableAllMobile(){
  let topLevel = document.getElementsByClassName("sort");
  let i;
  for(i = 0; i < topLevel.length;i++){
    topLevel[i].classList.remove("invisible");
  }
}

/*
  Decoding function that takes integer as input
  and directs to required function
*/
function enableVisibilityMobile(pos){
  /*let string = pos.replace("filter","");
  let items = document.getElementsByClassName(string);
  for(let i = 0; i < items.length;i++){
    items[i].classList.remove("invisible");
  }*/
}

/*
  Same purpose as enableVisibilityMobile()
  only instead of enable it disables
*/
function disableVisibilityMobile(pos){
  let string = pos.replace("filter","");
  let items = document.getElementsByClassName(string);
  for(let i = 0; i < items.length;i++){
    items[i].classList.add("invisible");
  }
}
//Global variable
let hasTriggered = false;

/*
  Function used to display gif for a set amount of time
*/
function showGif(){
  if(hasTriggered == false){
    document.getElementsByClassName("scrollHint")[0].classList.add("opacityChange");
    setTimeout(hide, 2100);
  }
}

/*
  Function used to remove gif after time has passed
*/
function hide(){
  document.getElementsByClassName("scrollHint")[0].classList.remove("opacityChange");
  hasTriggered = true;
}

//Helper function to remove cookies
function deleteCookies(){
  document.cookie = "hasVisited=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

//Checks if any cookie exists, if not then generate visited cookie
function checkCookies(){
  let x = document.cookie;
  if(x === undefined || x.length == 0){
    createVisitedCookie();
  } else{
    hasTriggered = true;
  }
}

//Function to create a cookie to remember if the user has visited
//Timer expires after 30 days of not visiting
function createVisitedCookie(){
  let d = new Date();
  d.setTime(d.getTime() + (30*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = "hasVisited = true;" + expires + ";path=/";
  hasTriggered = false;
}
