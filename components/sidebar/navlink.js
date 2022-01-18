//Import Link element and Sidebar style sheet (not worth creating a subsheet for this component)
import Link from "next/link"
import sidebarStyles from "./sidebar.module.scss"

export default function NavLink(props){
  //Temp code stuff
  let testString = props.link;
  return(
    <>
      {/* Wraps a header within a Link element that contains target directory, and places within a List Element for the unordered parent list */}
      <li className = {sidebarStyles.directoryEle}>
        <Link className = {sidebarStyles.eleLink} href = {testString}>
          <h4 className = {sidebarStyles.textHover}>{props.title}</h4>
        </Link>
      </li>
    </>
  )
}
