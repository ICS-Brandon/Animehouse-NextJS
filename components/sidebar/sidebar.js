//Importing Link element and Sidebar SCSS Module
import Link from "next/link"
import NavLink from "./navlink"
import sidebarStyles from "./sidebar.module.scss"

export default function Sidebar(props){

  //Test Code for transferring props to strings as Link element doesn't like taking prop directly
  let testString = props.aPath;
  let newTest = props.home;
  return(
    <>
      {/* Wrapper for Sidebar */}
      <section id = "sidebarCont" className = {sidebarStyles.sidebarContainer + ' ' + sidebarStyles.sidebarHide}>

        {/* Unordered List used to wrap all parent elements of Sidebar */}
        <ul className = {sidebarStyles.sidebarList}>

          {/* List Element that includes the more detailed Search Bar */}
          <li className = {sidebarStyles.sidebarEle}>
            <input className ={sidebarStyles.complexSearch} type="text" placeholder ="Search"/>
          </li>

          {/* List Element that will hold AnimeHouse Title and Text Logo */}
          <li className = {sidebarStyles.sidebarEle}>

            <div className = {sidebarStyles.titleHolder}>
              <h1> AnimeHouse </h1>
            </div>

          </li>

          {/* List Element that holds navigation directory */}
          <li className = {sidebarStyles.sidebarEle}>

            {/* Wrapper for secondary unordered list of navigation destinations */}
            <div className = {sidebarStyles.directory}>

              <ul>

                {/* NavLink element that consists of a List Element wrapping a Link that contains a header with the directory */}
                <NavLink title = "Home" link = {testString}/>

                <NavLink title = "Anime" link = {testString}/>

                <NavLink title = "Manga" link = {testString}/>

                <NavLink title = "Light Novel" link = {testString}/>

                <NavLink title = "Help" link = {testString}/>

              </ul>

            </div>

          </li>

        </ul>

      </section>
    </>
  )
}
