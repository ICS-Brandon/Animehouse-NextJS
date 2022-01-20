import Head from 'next/head'
import Navbar from '../components/navbar/navbar'
import Sidebar from '../components/sidebar/sidebar'
import sidebarStyles from '../components/sidebar/sidebar.module.scss'
import searchStyles from '../components/navbar/searchoptions.module.scss'
import indexStyles from "./index.module.scss"

//Function that adds back the class that hides the sidebar
function hideSidebar(){
  let sidebar = document.getElementById("sidebarCont");
  let wrapper = document.getElementById("bodyWrapper");

  sidebar.classList.add(sidebarStyles.sidebarHide);
  wrapper.classList.remove(indexStyles.wrapperFade);
}

//Funcation that adds back the class that hides the search bar and drop down results
function hideSearch(){

  //Inverse logic to functions explained in ../components/navbar/searchoption.js
  let searchBar = document.getElementById("navSearch");
  if(!searchBar.classList.contains(searchStyles.searchHide)){
    searchBar.classList.add(searchStyles.searchHide);

    let searchIcon = document.getElementById("searchIcon");
    searchIcon.classList.remove(searchStyles.searchSpace);

    let searchResults = document.getElementById("searchResultCont");
    searchResults.classList.remove(searchStyles.dropDownVisible);
  }
}

export default function Home() {
  return (
    <>
      <Sidebar aPath="/posts/first_post" mPath="/posts/first_post" lnPath="/posts/first_post" hpath="/posts/first_post" home = "./"/>
      <Head>
        <title>AnimeHouse Testing </title>
      </Head>
      <div id ="bodyWrapper" className = {indexStyles.bodyWrapper} onClick={() =>{hideSidebar();hideSearch()}}>
      <Navbar aPath="/posts/first_post" mPath="/posts/first_post" lnPath="/posts/first_post" hpath="/posts/first_post"/>
      </div>
    </>
  )
}
