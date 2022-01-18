/*
  Loose function that needs refactoring
*/

/*
  Sort list based upon id
*/
function sortList() {
   var list, i, sortFlag, LiEle, sorted;
   list = document.querySelector(".sortTest");
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

//Fires if user is on mobile, if so then re-direct to mobile page
function checkMobile(swapWith){
  window.location.href = swapWith;
  window.location.replace(swapWith);
}
