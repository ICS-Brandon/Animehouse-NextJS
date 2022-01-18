/*
  Needs name change
  Handles all major functions of the mobile.html page
*/

/*
  Sort HTML collection based upon id, seen before
*/
function mobileSortList() {
   let list, i, sortFlag, LiEle, sorted;
   list = document.querySelector(".sortParent");
   sortFlag = true;
   while (sortFlag) {
      sortFlag = false;
      LiEle = list.getElementsByClassName("sort");
      for (i = 0; i < LiEle.length - 1; i++) {
         sorted = false;
         let idOne = LiEle[i].classList.item(2);
         let idTwo = LiEle[i+1].classList.item(2);
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

//Global Variables
let pageCounter = 1;
let maxPosts = -1;
let clicks = -1;
let offset = -1;

/*
  Creates posts to be displayed in the main view of the mobile page
  Input is rows from database and a modifier to check if it should be sorted
  Standard proecdure seen before
*/
function mobileCreateHTML(data, sort){

  let i;
  let topLevel = document.getElementsByClassName("sortParent")[0];

  for(i = 0; i < data.length; i++){

     let divCapsule = document.createElement("div");
     divCapsule.classList.add("sort");
     divCapsule.classList.add("padFix");
     divCapsule.classList.add(data[i].pid);
     divCapsule.id = data[i].post_id;

     let linkHold = document.createElement("a");

     let genre = document.createElement("h6");
     genre.classList.add("overlay");
     genre.classList.add("mediumText");
     genre.classList.add("betterText");
     genre.innerHTML = data[i].genre;

     let anchorCapsule = document.createElement("a");
     anchorCapsule.setAttribute("href",data[i].mobilelink);

     let border = document.createElement("div");
     border.classList.add("border");
     border.classList.add("bgColorDark");

     let image = document.createElement("img");
     image.classList.add("postImage");
     image.setAttribute("src",data[i].img_path);

     let titleDiv = document.createElement("div");
     titleDiv.classList.add("paddingFix");

     let title = document.createElement("h3");
     title.classList.add("brightText");
     title.innerHTML = data[i].post_title;

     titleDiv.appendChild(title);

     border.appendChild(image);
     border.appendChild(titleDiv);

     anchorCapsule.appendChild(border);

     linkHold.appendChild(genre);

     divCapsule.appendChild(linkHold);
     divCapsule.appendChild(anchorCapsule);

     topLevel.appendChild(divCapsule);

     if(sort == true){
       mobileSortList();
     }

  }
}

/*
  Fetch the first display for mobile
  Gets the first 10 posts then passes results to be created
*/
async function fetchMobile(){
  let queryReq = {}
  queryReq.type = "SELECTALL";
  let result = await fetch('/reqQueryAllMobile',{
    method:"POST",
    body: JSON.stringify(queryReq),
    headers:{"Content-Type":"application/json"},
  });
  result = await result.json();
  mobileCreateHTML(result, true);
}

/*
  Fetches the next batch of posts to be grabbed
  Makes use of max and min value to define range that should be returned
  If range is invalid then decrement counter by 1
*/
async function fetchNextPosts(){
  let queryReq = {};
  queryReq.type = "SELECTNEXT";
  queryReq.offset = offset*10;
  let result = await fetch('/reqQueryNextRange',{
    method:"POST",
    body: JSON.stringify(queryReq),
    headers:{"Content-Type":"application/json"},
  });
  result = await result.json();
  if(clicks != 0){
    mobileCreateHTML(result, false);
  }
}

/*
  Fetches the total amount of posts on page load and rounds up to nearest 10
*/
async function getPCount(){
  let queryReq = {};
  queryReq.type = "POSTCOUNT";
  let result = await fetch('/reqQueryPCount',{
    method:"POST",
    body: JSON.stringify(queryReq),
    headers:{"Content-Type":"application/json"},
  });
  result = await result.json();
  let num = parseInt(result[0].count)+parseInt(result[1].count)+parseInt(result[2].count);
  clicks = Math.ceil(num/10);
  offset = 1;
}

/*
  Event listener for click on the 'Load More' button which triggers the fetch if conditions are met
  When clicked trigger max to equal max posts+1, and min to maximum posts -11
*/
document.getElementById("loadMorePosts").addEventListener("click",function(){
  if(clicks > 0){
    fetchNextPosts();
    clicks--;
    offset++;
    console.log(clicks);
    if(clicks == 1){
      document.getElementById("loadMorePosts").classList.add("disabled");
    }
  }
})
