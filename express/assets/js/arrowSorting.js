/*
  Handles all logic in the use of the 'Sort By' buttons
*/

/*
  All event listeners follow the same steps
  1. Check which identifier tags the sorting tag has
  2. In accordance with the valid tags move to next state
    none->asc->desc->none
  3. When moving to next state set appropiate image
  4. If a new tag is being added sort by that tag
    Asc: 1, Desc: 0
*/

//Event listener for when the sort by genre tag is clicked
document.getElementById("genreTag").addEventListener("click",function(){

  //Get the genre tag as an element
  let genre = document.getElementById("genre").children[1];
  //Get the arrow image displayed alongside the tag
  let image = genre.children[0];
  //If the genre tag contains neither ascending or descending identifier add desc and change image to downwards pointing arrow
  if(!genre.classList.contains("asc") && !genre.classList.contains("desc")){
    removeAllBut("genre");
    genre.classList.add("desc");
    image.setAttribute("src","https://lh3.googleusercontent.com/4R44DaUotHs_vznwP_r2IaOTzmD-DnCvNxvMBgHaDLYG4QCQ0xCB5RRXCKYCmc8eqvySOxQMF9RpiCEUN9_AsNGmPJ9ub6wd5hAlg0brcrG4Z-6dIK6aKQeNyA1mRaDSczoVqpfIFA=w2400");
    sortGenre(0);
  } //If the tag contains descending identifier and not ascending then swap desc for asc and change image to upwards pointing arrow
    else if(!genre.classList.contains("asc") && genre.classList.contains("desc")){
      removeAllBut("genre");
      genre.classList.remove("desc");
      genre.classList.add("asc");
      image.setAttribute("src","https://lh3.googleusercontent.com/uYEJTjmaxqV-5iPjlyR-JaC24DCTS5U5SaFKFdZSAM0MAkoDZPlSoNgdc6Dtu1n8hkvf-ZnXhMB7Zg9bzDhlqlMMGCmeJ4XAXMEOsFoRs2LgnI90eZH2cEx7TydVKbN2Hm_K3-gmdA=w2400");
      sortGenre(1);
  } //If neither if is triggered return to default state and image
    else{
      removeAllBut("genre");
      genre.classList.remove("asc");
      genre.classList.remove("desc");
      image.setAttribute("src","https://lh3.googleusercontent.com/pyUjVYe2Izt2gWvhMwFlE6R1ps_93BsNhLu9qNMWtljZ6m6qK2Nn3OuxCMlmVpfSTU09YMHCkjyb28YsF4SH-4m69ruQJtTVrXUl4hYCMSYKNDKJ3-CHqPhzsnNAJWNnGpuQugnW5A=w2400");
  }
})

//Event listener for when the sort by date tag is clicked
document.getElementById("dateTag").addEventListener("click",function(){
  let date = document.getElementById("date").children[1];
  let image = date.children[0];
  if(!date.classList.contains("asc") && !date.classList.contains("desc")){
    removeAllBut("date");
    date.classList.add("desc");
    image.setAttribute("src","https://lh3.googleusercontent.com/4R44DaUotHs_vznwP_r2IaOTzmD-DnCvNxvMBgHaDLYG4QCQ0xCB5RRXCKYCmc8eqvySOxQMF9RpiCEUN9_AsNGmPJ9ub6wd5hAlg0brcrG4Z-6dIK6aKQeNyA1mRaDSczoVqpfIFA=w2400");
    sortDate(0);
  } else if(!date.classList.contains("asc") && date.classList.contains("desc")){
    removeAllBut("date");
    date.classList.remove("desc");
    date.classList.add("asc");
    image.setAttribute("src","https://lh3.googleusercontent.com/uYEJTjmaxqV-5iPjlyR-JaC24DCTS5U5SaFKFdZSAM0MAkoDZPlSoNgdc6Dtu1n8hkvf-ZnXhMB7Zg9bzDhlqlMMGCmeJ4XAXMEOsFoRs2LgnI90eZH2cEx7TydVKbN2Hm_K3-gmdA=w2400");
    sortDate(1);
  } else{
    removeAllBut("date");
    date.classList.remove("asc");
    date.classList.remove("desc");
    image.setAttribute("src","https://lh3.googleusercontent.com/pyUjVYe2Izt2gWvhMwFlE6R1ps_93BsNhLu9qNMWtljZ6m6qK2Nn3OuxCMlmVpfSTU09YMHCkjyb28YsF4SH-4m69ruQJtTVrXUl4hYCMSYKNDKJ3-CHqPhzsnNAJWNnGpuQugnW5A=w2400");
  }
})

//Event listener for when the sort by title tag is clicked
document.getElementById("titleTag").addEventListener("click",function(){
  let title = document.getElementById("title").children[1];
  let image = title.children[0];
  if(!title.classList.contains("asc") && !title.classList.contains("desc")){
    removeAllBut("title");
    title.classList.add("desc");
    image.setAttribute("src","https://lh3.googleusercontent.com/4R44DaUotHs_vznwP_r2IaOTzmD-DnCvNxvMBgHaDLYG4QCQ0xCB5RRXCKYCmc8eqvySOxQMF9RpiCEUN9_AsNGmPJ9ub6wd5hAlg0brcrG4Z-6dIK6aKQeNyA1mRaDSczoVqpfIFA=w2400");
    sortTitle(0);
  } else if(!title.classList.contains("asc") && title.classList.contains("desc")){
    removeAllBut("title");
    title.classList.remove("desc");
    title.classList.add("asc");
    image.setAttribute("src","https://lh3.googleusercontent.com/uYEJTjmaxqV-5iPjlyR-JaC24DCTS5U5SaFKFdZSAM0MAkoDZPlSoNgdc6Dtu1n8hkvf-ZnXhMB7Zg9bzDhlqlMMGCmeJ4XAXMEOsFoRs2LgnI90eZH2cEx7TydVKbN2Hm_K3-gmdA=w2400");
    sortTitle(1);
  } else{
    removeAllBut("title");
    title.classList.remove("asc");
    title.classList.remove("desc");
    image.setAttribute("src","https://lh3.googleusercontent.com/pyUjVYe2Izt2gWvhMwFlE6R1ps_93BsNhLu9qNMWtljZ6m6qK2Nn3OuxCMlmVpfSTU09YMHCkjyb28YsF4SH-4m69ruQJtTVrXUl4hYCMSYKNDKJ3-CHqPhzsnNAJWNnGpuQugnW5A=w2400");
  }
})

/*
  Takes as input the name of the tag which is to not be tampered with
  Grabs all sorting tag elements and iterates through
  If the name of the tag doesn't match the one exempt than remove idenitifers and set default image
  If tag matches then skip
*/
function removeAllBut(exempt){
  let topLevel = document.getElementById("sortResults").children;
  let i;
  for(i = 0; i < topLevel.length; i++){
    if(topLevel[i].id != exempt){
      let image = topLevel[i].children[1].children[0];
      let item = topLevel[i].children[1];
      item.classList.remove("asc");
      item.classList.remove("desc");
      image.setAttribute("src","https://lh3.googleusercontent.com/pyUjVYe2Izt2gWvhMwFlE6R1ps_93BsNhLu9qNMWtljZ6m6qK2Nn3OuxCMlmVpfSTU09YMHCkjyb28YsF4SH-4m69ruQJtTVrXUl4hYCMSYKNDKJ3-CHqPhzsnNAJWNnGpuQugnW5A=w2400");
    }
  }
}

/*
  All sort functions follow the same pattern
  1. Grab a list of all children currently displayed in the grid container
  2. Uses built in sort function to sort list using specified comparator
  3. Depending on function input value reverse the sorting of the list
*/
function sortGenre(flipped){
  let list = Array.prototype.slice.call(document.getElementById("gridCont").children);
  list.sort((a,b)=>{return onlyGenre(a,b)});
  if(flipped == 1){
    list.reverse();
  }
  sortItems(list);
}

//Function used to sort the list of items (in array format) with the use of a helper function to sort by specific value (date), also takes input to reverse the sorting
function sortDate(flipped){
  let list = Array.prototype.slice.call(document.getElementById("gridCont").children);
  list.sort((a,b)=>{return onlyDate(a,b)});
  if(flipped == 1){
    list.reverse();
  }
  sortItems(list);
}

//Function used to sort the list of items (in array format) with the use of a helper function to sort by specific value (title), also takes input to reverse the sorting
function sortTitle(flipped){
  let list = Array.prototype.slice.call(document.getElementById("gridCont").children);
  list.sort((a,b)=>{return onlyTitle(a,b)});
  if(flipped == 1){
    list.reverse();
  }
  sortItems(list);
}

/*
  Helper sort functions allow follow same steps
  1. Compare specified value (in name of function)
  2. If a < b return 1
  3. If a > b return -1
  4. Otherwise return 0
*/
function onlyGenre(a,b){
  if(a.classList.item(3) < b.classList.item(3)){
    return 1;
  } else if(a.classList.item(3) > b.classList.item(3)){
    return -1;
  } else{
    return 0;
  }
}

//Helper function used to sort items by date
function onlyDate(a,b){
  if(a.id < b.id){
    return 1;
  } else if(a.id > b.id){
    return -1;
  } else{
    return 0;
  }
}

//Helper function used to sort items by title
function onlyTitle(a,b){

  //Since title is not stored in classlist or id it must be accessed through HTML tree
  let titleA = a.children[0].children[0].children[0].innerHTML;
  let titleB = b.children[0].children[0].children[0].innerHTML;

  if(titleA < titleB){
    return 1;
  } else if(titleA > titleB){
    return -1;
  } else{
    return 0;
  }
}

/*
  Takes sorted list as input
  Gets top level grid container and all elements contained within
  Compares the HTML collection with the sorted array
  If two posts aren't the same at the same index then insert in proper spot
*/
function sortItems(list){
  let top = document.getElementById("gridCont");
  let currentList = document.getElementsByClassName("mini-post");
  let i
  for(i = 0; i < list.length; i++){
    if(list[i].classList.item(4) !== currentList[i].classList.item(4)){
      top.insertBefore(list[i],currentList[i]);
    }
  }
}
