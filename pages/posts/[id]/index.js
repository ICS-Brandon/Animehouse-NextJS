import { useRouter } from 'next/router'
import Head from 'next/head'
import Navbar from '../../../components/navbar/navbar'
import Sidebar from '../../../components/sidebar/sidebar'
import indexStyles from '../../index.module.scss'
import sidebarStyles from '../../../components/sidebar/sidebar.module.scss'
import searchStyles from '../../../components/navbar/searchoptions.module.scss'

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

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  let props = {
    "homePath" : "/",
    "animePath" : "/view/Anime",
    "mangaPath" : "/posts/first_post",
    "lightnovelPath" : "/posts/first_post",
    "helpPath" : "/posts/69420"
  };
  return(
    <>
      <Sidebar aPath="/posts/first_post" mPath="/posts/first_post" lnPath="/posts/first_post" hpath="/posts/first_post" home = "./"/>

      <Head>
        <title>AnimeHouse Testing</title>
      </Head>

      <div id ="bodyWrapper" className = {indexStyles.bodyWrapper} onClick={() =>{hideSidebar();hideSearch()}}>
        <Navbar props = {props}/>

        <div className = {indexStyles.contentWrapper}>
          <p>Post: {id}</p>
        </div>

      </div>
    </>
  )
}

export default Post;
