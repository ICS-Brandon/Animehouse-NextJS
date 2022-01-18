import Head from 'next/head'
import Navbar from '../components/navbar/navbar'
import Sidebar from '../components/sidebar/sidebar'
import sidebarStyles from '../components/sidebar/sidebar.module.scss'
import indexStyles from "./index.module.scss"

//Function that adds back the class that hides the sidebar
function hideSidebar(){
  let sidebar = document.getElementById("sidebarCont");
  let wrapper = document.getElementById("bodyWrapper");

  sidebar.classList.add(sidebarStyles.sidebarHide);
  wrapper.classList.remove(indexStyles.wrapperFade);
}

export default function Home() {
  return (
    <>
      <Sidebar aPath="/posts/first_post" mPath="/posts/first_post" lnPath="/posts/first_post" hpath="/posts/first_post" home = "./"/>
      <Head>
        <title>AnimeHouse Testing </title>
      </Head>
      <div id ="bodyWrapper" onClick={hideSidebar}>
      <Navbar aPath="/posts/first_post" mPath="/posts/first_post" lnPath="/posts/first_post" hpath="/posts/first_post"/>
      </div>
    </>
  )
}
