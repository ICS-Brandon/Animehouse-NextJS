import Link from 'next/link'
import eleStyle from "./listelementselect.module.scss"

export default function ListElementSelect(props){
  return(
    <>
      {/* List Element wrapper for Link */}
      <li className = {eleStyle.listEle}>

        {/* Link Wrapper for Text */}
        <Link href={props.linkTarget}>
          <h2 className={eleStyle.listEleText}>{props.title}</h2>
        </Link>

      </li>
    </>
  )
}
