/*
  File responsible for handling all filtering actions and content
*/

/*
  Event listener to check if the 'Filter By' bar has been clicked
  If clicked display options and stop stop propagation
*/

//Global variable
let prevGenreOut = "111111111111";
let genreOut = "000000000000";
let typeOut = "0000";
let genreList = ["Action","Adventure","Comedy","Drama","Fantasy","General","Horror","Mystery","Rom-Com","Sci-Fi","SliceofLife","Supernatural"];
let typeList = ["weekly","seasonal","general","other"];
let prevTypeOut = "1111";

let _ = getFilters();
initTypes();

function getFilters(){
  let url = new URLSearchParams(document.location.search.substring(1));
  let filters = url.get("display");
  if (filters != "Anime") {
    typeList = ["volume","series","general","other"];
  }
  return filters;
}

function initTypes(){
  let valArr = document.getElementById("typeList").children;
  valArr = shedParent(valArr,1);
  for( let i = 0; i < valArr.length; i++){
    valArr[i].innerText = typeList[i];
  }
}

document.getElementById("dropDownBar").addEventListener("click",function(){
  displayOptions();
  event.stopPropagation();
})

document.getElementById("dropDownBarTwo").addEventListener("click",function(){
  displayOptionsTwo();
  event.stopPropagation();
})

/*
  Event listener used to stop all events from firing when the dropdown content is clicked
*/
document.getElementById("dropDownContent").addEventListener("click",function(){
  event.stopPropagation();
})

/*
  Return dropdown bar, content, and elements to normal when clicked on
*/
document.getElementById("onLoad").addEventListener("click",function(){
  let options = document.getElementById("dropDownContent");
  let image = document.getElementById("imageRotate");
  let optionsTwo = document.getElementById("dropDownContentTwo");
  let imageTwo = document.getElementById("imageRotateTwo");
  image.classList.remove("imgRotate");
  options.classList.remove("heightTrans");
  imageTwo.classList.remove("imgRotate");
  optionsTwo.classList.remove("heightTrans");
  event.stopPropagation();
})

/*
  Adds necessary classes to HTML objects to make visible and enable transitions
*/
function displayOptions(){
  let options = document.getElementById("dropDownContent");
  let image = document.getElementById("imageRotate");
  image.classList.toggle("imgRotate");
  options.classList.toggle("visible");
  options.classList.toggle("heightTrans");
}

function displayOptionsTwo(){
  let options = document.getElementById("dropDownContentTwo");
  let image = document.getElementById("imageRotateTwo");
  image.classList.toggle("imgRotate");
  options.classList.toggle("visible");
  options.classList.toggle("heightTrans");
}

function shedParent(list,pos){

  let newList = [];

  for(let x = 0; x < list.length; x++){
    let temp = list[x].children[pos];
    newList.push(temp)
  }

  return newList;
}

/*
  Toggles items on and off in the same format and style as the mobile equivalent
  Compares new string of 1's and 0's (equiv. to 'on' or 'off') and if different execute necessary code
*/
function toggleItemsGenre(){
  this.classList.toggle("used");
  let valArr = document.getElementById("genreList").children;
  valArr = shedParent(valArr,0);
  let i;
  let output = "";
  for(i = 0; i < valArr.length;i++){
    if(valArr[i].classList.contains("used")){
      output = output + "1";
    } else{
      output = output + "0";
    }
  }
  genreOut = output;
  if(output === "111111111111" || output === "000000000000"){
    if(typeOut === "0000" || typeOut === "1111"){
      enableAll("genre",1);
    } else{
      enableAll("genre",0);
    }
  } else{
    for(let x = 0; x <= output.length;x++){
      if(output[x] === "1"){
        enableVisibility(genreList[x],"genre");
      }
      if(output[x] === "0"){
        disableVisibility(genreList[x],"genre");
      }
    }
  }
  prevGenreOut = output.slice();
}

function toggleItemsType(){
  this.classList.toggle("used");
  let valArr = document.getElementById("typeList").children;
  valArr = shedParent(valArr,0);
  let i;
  let output = "";
  for(i = 0; i < valArr.length;i++){
    if(valArr[i].classList.contains("used")){
      output = output + "1";
    } else{
      output = output + "0";
    }
  }
  typeOut = output;
  if(output === "1111" || output === "0000"){
    if(genreOut === "111111111111" || genreOut === "000000000000"){
      enableAll("type",1);
    } else{
      enableAll("type",0);
    }
  } else{
    for(let x = 0; x <= output.length;x++){
      if(output[x] === "1"){
        enableVisibility(typeList[x],"type");
      }
      if(output[x] === "0"){
        disableVisibility(typeList[x],"type");
      }
    }
  }
  prevTypeOut = output.slice();
}


/*
  Makes all posts visible
*/
function enableAll(type,override){
  let topLevel = document.getElementById("gridCont").children;
  if(override == 1){
    for(let i =0; i < topLevel.length; i++){
      topLevel[i].classList.remove("invisible");
    }
  }
  else{
    let i;
    if(type == "genre"){
      let typeArr = document.getElementById("typeList").children;
      typeArr = shedParent(typeArr,0);
        for(let x = 0; x < typeArr.length;x++){
          if(typeArr[x].classList.contains("used")){
            for(i = 0; i < topLevel.length;i++){
              if(topLevel[i].classList.contains(typeList[x])){
                topLevel[i].classList.remove("invisible");
              }
            }
          }
      }
    }

    if(type == "type"){
      let genreArr = document.getElementById("genreList").children;
      genreArr = shedParent(genreArr,0);
        for(let x = 0; x < genreArr.length;x++){
          if(genreArr[x].classList.contains("used")){
            for(i = 0; i < topLevel.length;i++){
              if(topLevel[i].classList.contains(genreList[x])){
                topLevel[i].classList.remove("invisible");
              }
            }
          }
      }
    }
  }
}

/*
  Following functions are nearly identical to those in show_mobile.js
  Read documentation there
*/
function enableVisibility(value,type){
  let list = document.getElementsByClassName(value);
  /*for(let i = 0; i < list.length;i++){
    //list[i].classList.add("invisible");
  }*/
}

function disableVisibility(value,type){
  let list = document.getElementsByClassName(value);
  for(let i = 0; i < list.length;i++){
    list[i].classList.add("invisible");
  }
}

function filterTypeEnable(list){
  let newList = []
  let filter = typeOut;
  if(typeOut = "0000"){
    filter = "1111";
  }
  let typeCheck = true;
  for(let i = 0; i < list.length;i++){
    typeCheck = true;
    for(let x = 0; x < filter.length; x++){
      if(filter[x] == 0 && !list[i].classList.contains(typeList[x])){
        typeCheck = false;
      }
    }
    if(typeCheck == true){
      newList.push(list[i]);
    }
  }

  return newList;
}

function filterTypeDisable(list){
  let newList = []
  let filter = typeOut;
  if(typeOut = "0000"){
    filter = "1111";
  }
  let typeCheck = false;
  for(let i = 0; i < list.length;i++){
    typeCheck = false;
    for(let x = 0; x < filter.length; x++){
      if(filter[x] == 1 && !list[i].classList.contains(typeList[x])){
        typeCheck = true;
      }
    }
    if(typeCheck == true){
      newList.push(list[i]);
    }
  }

  return newList;
}

function filterGenreEnable(list){
  let newList = []
  let filter = genreOut;
  if(typeOut = "000000000000"){
    filter = "111111111111";
  }
  let genreCheck = true;
  for(let i = 0; i < list.length;i++){
    genreCheck = true;
    for(let x = 0; x < filter.length; x++){
      if(filter[x] == 0 && !list[i].classList.contains(genreList[x])){
        typeCheck = false;
      }
    }
    if(genreCheck == true){
      newList.push(list[i]);
    }
  }

  return newList;
}

function filterGenreDisable(list){
  let newList = []
  let filter = genreOut;
  if(typeOut = "000000000000"){
    filter = "111111111111";
  }
  let typeCheck = false;
  for(let i = 0; i < list.length;i++){
    typeCheck = false;
    for(let x = 0; x < filter.length; x++){
      if(filter[x] == 1 && !list[i].classList.contains(genreList[x])){
        typeCheck = true;
      }
    }
    if(typeCheck == true){
      newList.push(list[i]);
    }
  }

  return newList;
}

function onLoad(){
  let genreElems = document.getElementById("genreList").children;
  genreElems = shedParent(genreElems,0)
  let typeElems = document.getElementById("typeList").children;
  typeElems = shedParent(typeElems,0);
  let i
  for(i = 0; i < genreElems.length; i++){
    genreElems[i].addEventListener("click",toggleItemsGenre);
  }
  for(i = 0; i < typeElems.length; i++){
    typeElems[i].addEventListener("click",toggleItemsType);
  }
}
