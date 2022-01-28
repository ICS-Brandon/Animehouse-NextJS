import Link from 'next/link'
import cardStyles from "./view.module.scss"

export default function Animecard({props}){
  return(
    <>
      {/* Top level anchor element for on click behavior */}
      <Link href = {props.link}>

        {/* Article element to contain content for each search result */}
        <article className = {cardStyles.parentContainer + " " + props.post_id + " " + props.genre + " " + props.post_type}>

          {/* Div for proper sizing of search result image */}
          <div className={cardStyles.imageContainer}>
            <img className = {cardStyles.mainImage} src ={props.img_path}/>
          </div>

          {/* Header element to house all information for a given element in a search result */}
          <header className = {cardStyles.contentContainer}>

            {/* Div for housing post title and date */}
            <div className = {cardStyles.postInfoWrapper}>
              <div className = {cardStyles.spacingWrapper}>
                <h4 className = {cardStyles.resultTitle}>{props.post_title}</h4>
                <time className = {cardStyles.resultDate}>{props.post_date}</time>
              </div>
            </div>

            {/* Div used to implement proper top level positioning for author image */}
            <div className = {cardStyles.positionWrapper}>

              {/* Container used for proper positioning of author image */}
              <div className = {cardStyles.authorImageContainer}>
                <img className = {cardStyles.authorImage} src = {props.post_auth}/>
              </div>

            </div>

          </header>

        </article>

      </Link>
    </>
  )
}
