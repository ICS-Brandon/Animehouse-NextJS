//Import Link element and Sidebar style sheet (not worth creating a subsheet for this component)
import Link from "next/link"
import sidebarStyles from "./sidebar.module.scss"

export default function NavLink(props){
  return(
    <>
      {/* Wraps a header within a Link element that contains target directory, and places within a List Element for the unordered parent list */}
      <li className = {sidebarStyles.directoryEle}>
        <Link className = {sidebarStyles.eleLink} href = {props.link}>
          <a target = {props.linkTarget}>
            <h4 className = {sidebarStyles.textHover}>{props.title}</h4>
          </a>
        </Link>
      </li>
    </>
  )
}
