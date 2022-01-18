/*
  File used to create all posts on index.html
  Several different types of post creation
  1: Initial posts displayed
  2: Featured posts
  3: Favorite Shows
  4: Posts updated via Pagination
*/


/*
  Global variable definition
  easier access and use but should be changed
*/
let pageCounter = 1;
let maxPages = 0;
let totalPosts = -1;


/*
  Main function called to initialize the main posts on homepage
  Asynchronously fetchs the firsts posts to be displayed
    Also gets the total amount of posts which is used to calculate number of pages allowed
  Store count returned by first fetch in totalPosts for use in Pagination
  Iterate over each row returned from fetching initial posts and build HTML for it
  Once all are initially built sort by post date (stored as id)
*/
async function createPost(){
  let countReq = {};
  countReq.type = "POSTCOUNT";
  let countRes = await fetch('/reqQueryPCount',{
    method:"POST",
    body: JSON.stringify(countReq),
    headers:{"Content-Type":"application/json"},
  });

  let countResp = await countRes.json();
  totalPosts = countResp[0].count + countResp[1].count + countResp[2].count;
  //Round to next integer to insure that all posts are displayed if it's not a multiple of 4
  maxPages = Math.ceil(totalPosts / 4);

  let queryReq = {}
  queryReq.type = "SELECTALL";
  queryReq.max = totalPosts;
  let result = await fetch('/reqQueryAll',{
    method:"POST",
    body: JSON.stringify(queryReq),
    headers:{"Content-Type":"application/json"},
  });
  let querResp = await result.json();
  let i
  for(i = 0; i < querResp.length; i++){
    createHTML(querResp[i]);
  }
  intializeLikes();
  sortList();
}

/*
  Function body used to create the HTML for the initial posts
  Takes input in the form of a database result
  Create each piece separately and append to create the full item
  Steps explained for each piece being created
*/
function createHTML(data){

  //get top level UL
  let topLevel = document.getElementById("testing");

  //Create sub list Element and populate with id and class
  const listEle = document.createElement("LI");
  listEle.id = data.post_id;
  listEle.classList.add("sort");
  listEle.classList.add("post");
  listEle.classList.add("bgColorDark");

  //Create Article element and populate class
  let article = document.createElement("Article");
  article.classList.add("bgColorDark");

  //Create Header element and populate class
  let header = document.createElement("Header");
  header.classList.add("bgColorDark");
  //Create Div element and popuplate class
  var titleDiv = document.createElement("Div");
  titleDiv.classList.add("title");
  titleDiv.classList.add("bgColorDark");

  //Create H2 element and populate with class
  let title = document.createElement("H2");
  title.classList.add("brightText");

  //Create Anchor element and populate class and text
  let anchor = document.createElement("a");
  anchor.setAttribute("href",data.link);
  anchor.innerHTML = data.post_title;

  //Create Paragraph element and pouplate class and text
  let blurb = document.createElement("P");
  blurb.classList.add("mediumText");
  blurb.innerHTML = data.post_blurb;

  //Create Div element and populate class
  let metaDiv = document.createElement("Div");
  metaDiv.classList.add("meta");

  //Create Time element and populate with class and text
  let time = document.createElement("time");
  time.classList.add("mediumText");
  time.classList.add("published");
  time.innerHTML = data.post_date;

  //Create Anchor element and popuplate class
  let author = document.createElement("a");
  author.setAttribute("href","#");
  author.classList.add("author");
  author.classList.add("mediumText");

  //Create Span element and populate with class and text
  let nameSpan = document.createElement("span");
  nameSpan.classList.add("name");
  if(data.post_auth == "https://lh3.googleusercontent.com/vmp6ETwvtPe2jap6PQ28IOgms8Y0D3VQuh_YVFk7IRdlkPBuQb61DgiWBzvDYr6CDEP3ZfVt2SRgRf3oWFn4IubKy-cthUENLUvuiFaM8eeKy9YVycieVsUDQnC4P9AbOyYo8WP3cA=w2400"){
    nameSpan.innerHTML = "Dælvtárs";
  } else{
    nameSpan.innerHTML = "Piro";
  }

  //Create Image element and populate with Image
  let profileImage = document.createElement("img");
  profileImage.setAttribute("src",data.post_auth);

  //Create Div element and pouplate with class
  let transDiv = document.createElement("Div");
  transDiv.classList.add("transition");

  //Create Anchor element and populate with class
  let featured = document.createElement("a");
  featured.classList.add("image");
  featured.classList.add("featured");

  //Create Image element and populate with image
  let featImage = document.createElement("img");
  featImage.setAttribute("src",data.img_path);

  //Create Paragraph element and populate with class and text
  let shortPara = document.createElement("p");
  shortPara.classList.add("mediumText");
  shortPara.innerHTML = data.post_paragraph;

  //Create Footer element
  let footer = document.createElement("Footer");

  //Create UL element and populate with class
  let ulHolder = document.createElement("UL");
  ulHolder.classList.add("actions");

  //Create LI element
  let cReadEle = document.createElement("LI");

  //Create Anchor element and pouplate with class and text
  let buttonWrap = document.createElement("a");
  buttonWrap.classList.add("button");
  buttonWrap.classList.add("big");
  buttonWrap.setAttribute("href",data.link);
  buttonWrap.innerHTML = "Continue Reading";

  //Create UL element and populate with class
  let notes = document.createElement("UL");
  notes.classList.add("stats");

  //Create LI elements
  let genreEle = document.createElement("LI");
  let starsEle = document.createElement("LI");
  let commentsEle = document.createElement("LI");

  //Create Anchor elements and populate with class and text
  let genre = document.createElement("a");
  let url = new URL("https://animehouse.ca/show.html");
  //url.searchParams.append('display',data.post_type);
  url.searchParams.append('filter',data.genre);
  url.searchParams.append('filter',data.post_type);
  genre.setAttribute("href",url);
  genre.classList.add("mediumText");
  genre.innerHTML = data.genre;

  //Create stars element in bottom of list and add classes and values
  let stars = document.createElement("a");
  stars.classList.add("icon");
  //stars.classList.add("fa-thumbs-o-up");
  let likeButton = document.createElement("i");
  likeButton.classList.add("fa");
  likeButton.classList.add("fa-thumbs-o-up");
  stars.appendChild(likeButton);
  let para = document.createElement("span");
  para.innerText = data.like_count;
  stars.appendChild(para);
  stars.addEventListener("click", likeUnlikeIndex);

  /*Create comments element in bottom of list and add classes and values
  let comments = document.createElement("a");
  comments.setAttribute("href",data.link);
  comments.classList.add("icon");
  comments.classList.add("fa-comment");
  comments.innerHTML = "128";*/

  //Append Anchors to List Elements
  cReadEle.appendChild(buttonWrap);
  genreEle.appendChild(genre);
  starsEle.appendChild(stars);

  //commentsEle.appendChild(comments);

  //Append List Elements to respective UL
  ulHolder.appendChild(cReadEle);
  notes.appendChild(genreEle);
  notes.appendChild(starsEle);
  //notes.appendChild(commentsEle);

  //Append ULs to Footer
  footer.appendChild(ulHolder);
  footer.appendChild(notes);

  //Append Featured Image to Anchor
  featured.appendChild(featImage);

  //Append Anchor to Div
  transDiv.appendChild(featured);

  //Append NameSpan and Profile Image to Anchor
  author.appendChild(nameSpan);
  author.appendChild(profileImage);

  //Append Time and Authoer to Div
  metaDiv.appendChild(time);
  metaDiv.appendChild(author);

  //Append anchor to H2
  title.appendChild(anchor);

  //Append H2 and Paragraph to Div
  titleDiv.appendChild(title);
  titleDiv.appendChild(blurb);

  //Append Div to Header
  header.appendChild(titleDiv);
  header.appendChild(metaDiv);

  //Append Header, Div, Paragraph, and Footer to Article
  article.appendChild(header);
  article.appendChild(transDiv);
  article.appendChild(shortPara);
  article.appendChild(footer);

  //Append Article to List Element
  listEle.appendChild(article);
  listEle.classList.add(data.pid);

  //Append List Element to top level node
  topLevel.appendChild(listEle);
}

/*
  Function used to sort the main posts of the homepage
  Simple bubble sort algorithm that sorts on id
*/
function sortList() {
   let list, i, sortFlag, LiEle, sorted;
   list = document.querySelector(".sortTest");
   sortFlag = true;
   while (sortFlag) {
      sortFlag = false;
      LiEle = list.getElementsByClassName("sort");
      for (i = 0; i < LiEle.length - 1; i++) {
         sorted = false;
         let idOne = LiEle[i].classList.item(3);
         let idTwo = LiEle[i+1].classList.item(3);
         if (idOne < idTwo) {
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

//Adding event listeners to Pagination buttons
document.getElementById("nextPage").addEventListener("click",increasePage);
document.getElementById("prevPage").addEventListener("click",decreasePage);

/*
  Function that is triggered when 'Next Page' button is clicked
  Grab UL that items are displayed in and the 'Next Page' button
  Gets current page value and sets  the value of the next one
  If the counter is greater than one then enable the 'Prev Page' button
  If the new page number is less than the number of max pages cycle to next page
    enable the button in case it has been disabled
    remove the current page number from classlist of UL and add new in place
    Swap posts out with new data for the next page
  If it's larger than the max pages then disable the button
*/
function increasePage(){
  let test = document.getElementById("testing");
  let disableNext = document.getElementById("nextPage");

  let currentNum = "page" + pageCounter;
  pageCounter++;
  let numberUp = "page" + pageCounter;

  if(pageCounter > 1){
    let enablePrev = document.getElementById("prevPage");
    enablePrev.classList.remove("disabled");
  }
  if(pageCounter < maxPages){
    disableNext.classList.remove("disabled");
    test.classList.remove(currentNum);
    test.classList.add(numberUp);
    fetchSwap(pageCounter);
  } else if(pageCounter == maxPages) {
    disableNext.classList.add("disabled");
    test.classList.remove(currentNum);
    test.classList.add(numberUp);
    fetchSwap(pageCounter);
  }  else {
    disableNext.classList.add("disabled");
  }
}

//Follows identical (though reversed) logic to increasePage
function decreasePage(){

  let test = document.getElementById("testing");
  let disablePrev = document.getElementById("prevPage");
  let enableNext = document.getElementById("nextPage");

  let currentNum = "page" + pageCounter;
  pageCounter--;
  let numberDown = "page" + pageCounter;

  if(pageCounter < maxPages){
    enableNext.classList.remove("disabled");
  }
  if(pageCounter > 1){
    disablePrev.classList.remove("disabled");
    test.classList.remove(currentNum);
    test.classList.add(numberDown);
    fetchSwap(pageCounter);
  } else if (pageCounter == 1){
    disablePrev.classList.add("disabled");
    test.classList.remove(currentNum);
    test.classList.add(numberDown);
    fetchSwap(pageCounter);
  } else {
    disablePrev.classList.add("disabled");
  }
}

/*
  Function called to get next grouping of posts from the database
  Passes the page and total number of posts as values in fetch
*/
async function fetchSwap(){
  //Get list of children in certain id range and swap
  var queryReq = {}
  queryReq.type = "GETRANGE";
  let pageCountProper = 0
  if(pageCounter > 1){
    pageCountProper = pageCounter-1;
  }
  else{
    pageCountProper = 0;
  }
  queryReq.page = pageCountProper;
  let result = await fetch('/reqQueryRange',{
    method:"POST",
    body: JSON.stringify(queryReq),
    headers:{"Content-Type":"application/json"},
  });
  let queryResp = await result.json();
  swapPosts(queryResp);
}

/*
  Used to swap out data in the established posts
  Follows similar structure to creating post except it only manipulates the current structure
  Main difference is instead of looping in fetch function loop in the manipulation function
*/
function swapPosts(data){
  let i;

  //Get parent element and put children in list
  let listParent = document.getElementById("testing");
  let listEle = listParent.getElementsByClassName("sort");
  let length = listEle.length;

  //For loop to update items
  for(i = 0; i < data.length; i++){

    //Set post id
    listEle[i].classList.remove("invisible");
    listEle[i].id = data[i].post_id;
    let index = listEle[i].classList.item(3);
    listEle[i].classList.remove(index);
    listEle[i].classList.add(data[i].pid);

    //Get article, and divs within header
    let article = listEle[i].children[0];
    let header = listEle[i].getElementsByTagName("header")[0];
    let headerDivs = header.children;

    //Set title, blurb, and date
    let titleheader = headerDivs[0].getElementsByTagName("h2")[0];
    let anchor = titleheader.children[0];
    anchor.innerHTML = data[i].post_title;
    anchor.setAttribute("href",data[i].link);
    let blurb = headerDivs[0].getElementsByTagName("p")[0];
    blurb.innerHTML = data[i].post_blurb;
    let date = headerDivs[1].getElementsByTagName("time")[0];
    date.innerHTML = data[i].post_date;

    //Get div which image is stored in
    let imgDiv = article.querySelector(".transition");

    //Get image and set attribute
    let img = imgDiv.children[0].children[0];
    img.setAttribute("src",data[i].img_path);

    //get Paragraph and set text
    let para = article.getElementsByTagName("p")[1];
    para.innerHTML = data[i].post_paragraph;

    //Get footer
    let footer = article.getElementsByTagName("footer")[0];

    //Get children of UL
    let uList = footer.getElementsByTagName("UL")[1].children;

    let contReading = footer.getElementsByTagName("UL")[0].children[0].children[0];
    contReading.setAttribute("href",data[i].link);

    //get genre from UL
    let eleList = uList[0].children[0];
    let likes = uList[1];
    let likesChild = likes.children[0];
    likesChild.classList.remove("liked");
    likesChild.children[1].innerText = data[i].like_count;
    if(checkLiked(data[i].pid)){
      likesChild.classList.add("liked");
    }
    eleList.innerHTML = data[i].genre;
    let url = new URL("https://animehouse.ca/show.html");
    url.searchParams.append('display',data[i].post_type);
    url.searchParams.append('filter',data[i].genre);
    eleList.setAttribute("href",url)

  }

  sortList();
  if(data.length < 4){
    let x = 4 - data.length;
    for(let k = 0; k < x; k++){
      listEle[k].classList.add("invisible");
    }
  }
}

function likeUnlikeIndex(){
  this.classList.toggle("liked");
  if(this.classList.contains("liked")){
    let temp = parseInt(this.children[1].innerText);
    temp++;
    this.children[1].innerText = temp;
    let postId = this.parentNode.parentNode.parentNode.parentNode.parentNode.classList.item(3);
    let likeArray = sessionStorage.getItem("likes");
    let newArray = replaceAt(likeArray, "1",postId-1);
    sessionStorage.setItem("likes",newArray);
    updateCount(postId,1);
  }
  else{
    let temp = parseInt(this.children[1].innerText);
    temp--;
    this.children[1].innerText = temp;
    let postId = this.parentNode.parentNode.parentNode.parentNode.parentNode.classList.item(3);
    let likeArray = sessionStorage.getItem("likes");
    let newArray = replaceAt(likeArray, "0",postId-1);
    sessionStorage.setItem("likes",newArray);
    updateCount(postId,-1);
  }
  pushUserUpdate();
}

function replaceAt(string, char, index){
  let temp = string.substring(0,index) + char + string.substring(index+1,string.length+1);
  return temp;
}

async function pushUserUpdate(){
  let queryReq = {};
  queryReq.type = "UPDATEUSER";
  queryReq.hash = sessionStorage.getItem("UserSHA");
  queryReq.likes = sessionStorage.getItem("likes");
  let result = await fetch('/reqUpdateUser',{
    method:"POST",
    body:JSON.stringify(queryReq),
    headers:{"Content-Type":"application/json"},
  });
}

async function intializeLikes(){
  setTimeout(function(){
    let parent = document.getElementById("testing");
    for(let i = 0; i < 4; i++){
      let temp = parent.children[i];
      let pos = parseInt(temp.classList.item(3))-1;
      let likeButton = temp.getElementsByClassName("stats")[0].children[1].children[0];
      let loop = true;
      let likes = sessionStorage.getItem("likes");
      if(likes.charAt(pos) === "1"){
        likeButton.classList.add("liked");
      }
    }
  }, 300);
}

async function updateCount(pid,count){
  let queryReq = {};
  queryReq.type = "UPDATECOUNT";
  queryReq.pid = parseInt(pid);
  queryReq.count = count;
  let result = await fetch('/reqUpdateCount',{
    method:"POST",
    body:JSON.stringify(queryReq),
    headers:{"Content-Type":"application/json"},
  });
  result = await result.json();
}

function checkLiked(pid){
  let likes = sessionStorage.getItem("likes");
  if(likes.charAt(pid-1) == "1"){
    return true;
  } else{
    return false;
  }
}
