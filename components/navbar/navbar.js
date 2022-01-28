import navStyle from "./navbar.module.scss"
import ListElementSelect from "./listelementselect"
import SearchOptions from "./searchoptions"

export default function Navbar({props}){

  console.log(props);

  if(!props.title){
    props.title = "AnimeHouse";
  }

  return (
    <>
      {/* Top level wrapper for Navigation bar */}
      <div className = {navStyle.container}>

        {/* Container used for left hand/routing side of Navbar */}
        <div className = {navStyle.routingWrapper}>

          {/* Title for Navbar */}
          <h2 className = {navStyle.titleAlign} id = "testing">{props.title}</h2>

          {/* Unordered list that contains all navigation options */}
          <ul className = {navStyle.listAlign}>

            {/* A component containing a Link that wraps a header containg the target directory */}
            <ListElementSelect title="Home" linkTarget = {props.homePath}/>

            <ListElementSelect title="Anime" linkTarget = {props.animePath}/>

            <ListElementSelect title="Manga" linkTarget = {props.mangaPath}/>

            <ListElementSelect title="Light Novel" linkTarget = {props.lightnovelPath}/>

            <ListElementSelect title="Help" linkTarget = {props.helpPath}/>

          </ul>

        </div>

        {/* Wrapper div for search and menu icon */}
        <div className = {navStyle.optionsWrapper}>

        {/* Component for search and menu icon, will eventually have a popout search field (currently static) */}
        <SearchOptions/>

        </div>
      </div>
    </>
  )
}
