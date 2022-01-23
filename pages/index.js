import Head from 'next/head'
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

function hideScrollBar(){
  let style = document.createElement("style");
  style.innerHTML = 'body::-webkitscrollbar{display:none;}';
  document.head.appendChild(style);
}

export default function Home(props) {
  return (
    <>
      <Sidebar aPath="/posts/first_post" mPath="/posts/first_post" lnPath="/posts/first_post" hpath="/posts/first_post" home = "./"/>

      <Head>
        <title>AnimeHouse Testing </title>
      </Head>

      <div id ="bodyWrapper" className = {indexStyles.bodyWrapper} onLoad= {hideScrollBar} onClick={() =>{hideSidebar();hideSearch()}}>
        <Navbar aPath="/posts/first_post" mPath="/posts/first_post" lnPath="/posts/first_post" hpath="/posts/first_post"/>

        <div className = {indexStyles.contentWrapper}>
          <Sideinfo props = {props.featuredPosts}></Sideinfo>
          <div className = {indexStyles.postWrapper}>
            <Mainpost postInfo = {props.posts[0]}></Mainpost>
            <Mainpost postInfo = {props.posts[1]}></Mainpost>
            <Mainpost postInfo = {props.posts[2]}></Mainpost>
            <Mainpost postInfo = {props.posts[3]}></Mainpost>
            <Pagination></Pagination>
          </div>
        </div>

      </div>
    </>
  )
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const postsRes = await fetch('http://localhost:8081/main-posts')
  const posts = await postsRes.json()

  const featuredRes = await fetch('http://localhost:8081/featured-posts-home')
  const featuredPosts = await featuredRes.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
      featuredPosts,
    },
  }
}
