/*
 Used to control search bar shown in show.html on desktop
*/

/*
  Add event listener for on keyup to search bar
  When key is pressed start timer to call function
  If keypress occurs within the timer the timer resets
*/
document.getElementById("showSearchBar").addEventListener("keyup",function(){
  clearTimeout(largeTimeout);
  largeTimeout = setTimeout(hideItems,600);
})

/*
  Based upon input from the search bar hide and show the given items
*/
function hideItems(){

  let searchBar = document.getElementById("showSearchBar");
  let searchBy = searchBar.value;
  let delimSearch = searchBy.replace(/[^A-Za-z0-9 ]/g,'').toLowerCase();

  if(searchBy === ""){
    resetVisibility();
  } else{
    resetVisibility();
    let liEle = document.getElementsByClassName("mini-post");
    let delimTitle = "";
    let i

    for(i = 0; i < liEle.length; i++){
      let title = liEle[i].getElementsByClassName("alignItemLeft")[0].children[0].innerHTML;
      delimTitle = title.replace(/[^A-Za-z0-9 ]/g,'').toLowerCase();
      if(!delimTitle.includes(delimSearch)){
        liEle[i].classList.add("hideSearch");
      }
    }
  }
}

/*
  Make all items visible again
*/
function resetVisibility(){
  let liEle = document.getElementsByClassName("mini-post");
  let i;

  for(i = 0; i < liEle.length; i++){
    liEle[i].classList.remove("hideSearch");
  }
}
