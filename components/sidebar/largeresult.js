import resultStyles from "./largeresult.module.scss"

export default function Largeresult({props}){
  return(
    <>
      {/* Top level anchor element for on click behavior */}
      <a>

        {/* Article element to contain content for each search result */}
        <article className = {resultStyles.parentContainer}>

          {/* Div for proper sizing of search result image */}
          <div className={resultStyles.imageContainer}>
            <img className = {resultStyles.mainImage} src ={props.img_path}/>
          </div>

          {/* Header element to house all information for a given element in a search result */}
          <header className = {resultStyles.contentContainer}>

            {/* Div for housing post title and date */}
            <div className = {resultStyles.postInfoWrapper}>
              <h5 className = {resultStyles.resultTitle}>{props.post_title}</h5>
              <time className = {resultStyles.resultDate}>{props.post_date}</time>
            </div>

            {/* Div used to implement proper top level positioning for author image */}
            <div className = {resultStyles.positionWrapper}>

              {/* Container used for proper positioning of author image */}
              <div className = {resultStyles.authorImageContainer}>
                <img className = {resultStyles.authorImage} src = {props.post_auth}/>
              </div>

            </div>

          </header>

        </article>

      </a>
    </>
  )
}
