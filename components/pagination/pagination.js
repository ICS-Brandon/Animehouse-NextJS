import pageStyles from "./pagination.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Pagination(){
  return(
    <>
      {/* Top level container for pagination elements */}
      <div className = {pageStyles.paginationContainer}>
        {/* Page selector for one by one */}
        <a className = {pageStyles.pageSelector}><FontAwesomeIcon icon = {["fas","chevron-left"]}></FontAwesomeIcon></a>
        {/* Specific page selectors based on number */}
        <a className = {pageStyles.pageNumber}>1</a>
        <a className = {pageStyles.pageNumber}>2</a>
        <a className = {pageStyles.pageNumber}>3</a>
        <a className = {pageStyles.pageNumber + " " + pageStyles.disabled}>...</a>
        <a className = {pageStyles.pageNumber}>99</a>
        {/* Page selector for one by one */}
        <a className = {pageStyles.pageSelector}><FontAwesomeIcon icon = {["fas","chevron-right"]}></FontAwesomeIcon></a>
      </div>
    </>
  )
}
