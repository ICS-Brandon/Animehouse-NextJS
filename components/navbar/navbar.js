import navStyle from "./navbar.module.scss"
import ListElementSelect from "./listelementselect"
import SearchOptions from "./searchoptions"

export default function Navbar(props){
  let testString = props.aPath;
  return (
    <>
      {/* Top level wrapper for Navigation bar */}
      <div className = {navStyle.container}>

        {/* Container used for left hand/routing side of Navbar */}
        <div className = {navStyle.routingWrapper}>

          {/* Title for Navbar */}
          <h2 className = {navStyle.titleAlign}>Anime House</h2>

          {/* Unordered list that contains all navigation options */}
          <ul className = {navStyle.listAlign}>

            {/* A component containing a Link that wraps a header containg the target directory */}
            <ListElementSelect title="Home" linkTarget = {testString}/>

            <ListElementSelect title="Anime" linkTarget = {testString}/>

            <ListElementSelect title="Manga" linkTarget = {testString}/>

            <ListElementSelect title="Light Novel" linkTarget = {testString}/>

            <ListElementSelect title="Help" linkTarget = {testString}/>

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
