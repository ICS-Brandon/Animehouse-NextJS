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
      <div id = "sidebarCont" className = {sidebarStyles.sidebarContainer + ' ' + sidebarStyles.sidebarHide}>

        {/* Unordered List used to wrap all parent elements of Sidebar */}
        <ul className = {sidebarStyles.sidebarList}>

          {/* List Element that includes the more detailed Search Bar */}
          <li className = {sidebarStyles.sidebarEle}>
            <input className ={sidebarStyles.complexSearch} type="text" placeholder ="Search"/>
            <ul className = {sidebarStyles.sidebarResults}>
            </ul>
          </li>

          {/* List Element that will hold AnimeHouse Title and Text Logo */}
          <li className = {sidebarStyles.sidebarEle}>

            <div className = {sidebarStyles.titleHolder}>
              <div>
                <img className = {sidebarStyles.imageWrapper} src = "https://lh3.googleusercontent.com/9lR_9KbOPe9Fs3UJLV_EaTreqZVhJoL3ef2MzvnF9p0DEuLi6eJVtiu6MPgBdfAXrioGMe81svYwD_ljUdO64u4DoaBREzUl6i3Uvn_XelDbOvfJ8TW_Dz0-62G9Z_q5w3h5Ze9nsA=w2400"></img>
              </div>
              <h3> Anime House </h3>
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

                <NavLink title = "Follow Animehouse" link = {"https://twitter.com/Animehouse_Ca?ref_src=twsrc%5Etfw"} linkTarget = {"_blank"}/>

                <li className = {sidebarStyles.discordFix}>
                  <iframe class = "discord" src="https://discord.com/widget?id=831001494265921536&theme=dark" width="100%" height="400em" allowtransparency="true" frameBorder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
                </li>

              </ul>

            </div>

          </li>

        </ul>

      </div>
    </>
  )
}
