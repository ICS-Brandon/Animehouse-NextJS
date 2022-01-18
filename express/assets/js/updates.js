function removeOpened(exempt){

  let arrow = document.getElementsByClassName("arrow");
  let content = document.getElementsByClassName("mainContent");
  let i;

  for(i = 0; i < arrow.length; i++){
    if(arrow[i].id != exempt){
      arrow[i].classList.remove("arrowOpened");
      let content = arrow[i].parentNode.parentNode;
      content = content.children[2];
      content.classList.remove("autoMaxHeight");
    }
  }
}

function sortUpdates() {
   var list, i, sortFlag, LiEle, sorted;
   list = document.getElementById("main");
   sortFlag = true;
   while (sortFlag) {
      sortFlag = false;
      LiEle = list.getElementsByClassName("mainBody");
      for (i = 0; i < LiEle.length - 1; i++) {
         sorted = false;
         liOneVal = LiEle[i].children[0].children[0].children[1];
         liTwoVal = LiEle[i+1].children[0].children[0].children[1];
         if ( liOneVal.id < liTwoVal.id) {
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


document.getElementById("wrapper").addEventListener("click",function(e){

  let target = e.target;

  let body = document.getElementById("onLoad");
  let sortView = document.getElementById("mainSearchResults");
  let searchBar = document.getElementById("newSearch");

  if(target.classList.contains("updateBody")
     || target.classList.contains("title") || target.classList.contains("arrow") ||
     target.classList.contains("posFixing") || target.classList.contains("updateText")){

     } else{
       removeOpened(-1);
       e.stopPropagation();
     }

  if(body.classList.contains("is-menu-visible")){
    body.classList.remove("is-menu-visible");
    e.stopPropagation();
  }

  if(sortView.classList.contains("transformObjectDown")){
    sortView.classList.add("transformObjectUp");
    sortView.classList.remove("transformObjectDown");
    searchBar.classList.remove("visibleSearch");
    e.stopPropagation();
  }
})

document.getElementById("enableSearchView").addEventListener("click",function(e){
  let search = document.getElementById("mainSearchResults");
  search.classList.add("transformObjectDown");
  search.classList.add("transformObjectUp");
  e.stopPropagation();
})

document.getElementById("enableLargeSearchView").addEventListener("click",function(e){
  let menu = document.getElementById("onLoad");
  menu.classList.add("is-menu-visible");
  e.stopPropagation();
})

async function fetchUpdates(){

  let queryReq = {};
  queryReq.type = "SELECTUPDATES";
  let result = await fetch("/reqQueryUpdates",{
    method:"POST",
    body:JSON.stringify(queryReq),
    headers:{"Content-Type":"application/json"},
  });
  var queryRes = await result.json();
  let i;
  for(i = 0; i < queryRes.length; i++){
    createUpdatePosts(queryRes[i]);
  }
}

function createUpdatePosts(data){

  let postCont = document.getElementById("main");

  let mainBody = document.createElement("div");
  mainBody.classList.add("mainBody");
  let topLevel = document.createElement("div");
  topLevel.classList.add("updateBody");

  let titleCont = document.createElement("div");
  titleCont.classList.add("updateTitle");
  let header = document.createElement("h1");
  header.classList.add("title");
  header.innerHTML = data.title;
  let date = document.createElement("div");
  date.classList.add("dateStyling");
  date.innerHTML = data.date;
  let authImageCont = document.createElement("div");
  authImageCont.classList.add("authImage");
  let authImage = document.createElement("img");
  authImage.setAttribute("src","https://lh3.googleusercontent.com/7MpxdyTQ7bCFeC-KlUnAG7crRjK61curPF6wheLj7RfjBMAZInp3QOZnddRo_pAR-16LBN9xFZdzlL_3hvxqXcSrDwNWcuJXLqZEuh8ex8fP2ZmHfSYo-Bcmx3sP_9lY8__MfiTgdA=w2400")
  let arrow = document.createElement("img");
  arrow.id = data.uid;
  arrow.classList.add("arrow");
  arrow.setAttribute("src","https://lh3.googleusercontent.com/3YMfRPUm02KeVUYRyWS0aN6Y2-tI9wW39HqGcGg1ld4JnJdRlofNI9KS6i73ZLhy4cr_7IEI_oL8iKTI-w7p_E7Mdi2vWYWr0ewZdzA7AS3O9dyz5ecxt7VDeytbaKEEYstjOm_vZQ=w2400");

  let lineCont = document.createElement("div");
  let lineDivider = document.createElement("hr");
  lineDivider.classList.add("solid");
  lineDivider.classList.add("posFixing");

  let mainContentCont = document.createElement("div");
  mainContentCont.classList.add("mainContent");
  let updateText = document.createElement("p");
  updateText.classList.add("updateText");
  updateText.innerHTML = data.content;

  mainContentCont.appendChild(updateText);

  lineCont.appendChild(lineDivider);

  authImageCont.appendChild(authImage);
  date.appendChild(authImageCont);
  header.appendChild(date);

  titleCont.appendChild(header);
  titleCont.appendChild(arrow);

  topLevel.appendChild(titleCont);
  topLevel.appendChild(lineCont);
  topLevel.appendChild(mainContentCont);
  mainBody.appendChild(topLevel);


  arrow.onclick = test;
  postCont.appendChild(mainBody);
}

function test(){
  removeOpened(this.id);
  let x = parseInt(this.id,10);
  x = x -1;
  if(this.classList.contains("arrowOpened")){
    this.classList.remove("arrowOpened");
  } else {
    this.classList.add("arrowOpened");
  }
  let content = this.parentNode.parentNode;
  mainContent = content.children[2];
  if(mainContent.classList.contains("autoMaxHeight")){
    mainContent.classList.remove("autoMaxHeight");
  } else{
    mainContent.classList.add("autoMaxHeight");
  }
}

// TODO: Pagination on the update items, add the buttons. Calc max words per post
