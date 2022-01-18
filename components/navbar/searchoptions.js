//Importing global FontAwesome Icons and SCSS Module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import searchStyle from './searchoptions.module.scss'
import sidebarStyles from '../sidebar/sidebar.module.scss'
import indexStyles from "../../pages/index.module.scss"

function showSidebar(e){
  let sidebar = document.getElementById("sidebarCont");
  let wrapper = document.getElementById("bodyWrapper");
  sidebar.classList.remove(sidebarStyles.sidebarHide);
  wrapper.classList.add(indexStyles.wrapperFade);
}

export default function SearchOptions(){
  return(
    <>
      {/* Style Wrapper */}
      <div className = {searchStyle.searchWrapper}>
        {/* FontAwesome components that sandwich input text field, more to come */}
        <FontAwesomeIcon icon = "search" className = {searchStyle.searchIcon}/>
        <input className ={searchStyle.simpleSearch} type="text" placeholder ="Quick Find"/>
        {/* Icon has onClick function for showing sidebar with animation, includes stopPropagation so that other elements don't trigger */}
        <FontAwesomeIcon icon = "bars" className = {searchStyle.barsIcon} onClick = {(e) => {e.stopPropagation();showSidebar()}}/>
      </div>
    </>
  )
}
