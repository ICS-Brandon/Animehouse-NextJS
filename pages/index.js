import Head from 'next/head'
import Script from 'next/script'
import Navbar from '../components/navbar/navbar'
import Sidebar from '../components/sidebar/sidebar'
import Mainpost from '../components/mainpost/mainpost'
import Pagination from "../components/pagination/pagination"
import Sideinfo from '../components/sideinfo/sideinfo'
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

export default function Home({posts,featuredPosts,currentFavorites}) {
  let props = {
    "homePath" : "/",
    "animePath" : "/view/Anime",
    "mangaPath" : "/posts/first_post",
    "lightnovelPath" : "/posts/first_post",
    "helpPath" : "/posts/69420"
  };
  return (
    <>
      <Sidebar aPath="/posts/first_post" mPath="/posts/first_post" lnPath="/posts/first_post" hpath="/posts/first_post" home = "./"/>

      <Head>
        <title>AnimeHouse Testing </title>
      </Head>

      <div id ="bodyWrapper" className = {indexStyles.bodyWrapper} onClick={() =>{hideSidebar();hideSearch()}}>
        <Navbar props = {props} />
        <div className = {indexStyles.contentWrapper}>
          <Sideinfo featuredPosts = {featuredPosts} currentFavorites = {currentFavorites}></Sideinfo>
          <div className = {indexStyles.postWrapper}>
            <Mainpost postInfo = {posts[0]}></Mainpost>
            <Mainpost postInfo = {posts[1]}></Mainpost>
            <Mainpost postInfo = {posts[2]}></Mainpost>
            <Mainpost postInfo = {posts[3]}></Mainpost>
            <Pagination></Pagination>
          </div>
        </div>

      </div>
    </>
  )
}

/*
  Loads all possible information into props on site generation

  Fetches information for: main posts, featured posts, and current favorites
  Fetches for search results handled by exterior Javascript
*/
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  const postsRes = await fetch('http://localhost:8081/main-posts')
  const posts = await postsRes.json()

  const featuredRes = await fetch('http://localhost:8081/featured-posts-home')
  const featuredPosts = await featuredRes.json();

  const favoritesRes = await fetch('http://localhost:8081/current-favorites')
  const currentFavorites = await favoritesRes.json();
  return {
    props: {
      posts,
      featuredPosts,
      currentFavorites,
    },
  }
}
