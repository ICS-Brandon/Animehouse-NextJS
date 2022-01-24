import featuredStyles from "./featuredpost.module.scss";

export default function Featuredpost({props}){
  return(
    <>
      {/* Top level anchor wrapper for on click behavior and redirection*/}
      <a className = {featuredStyles.linkWrapper} href = {props.post_link}>

        {/* Container for all elements of a featured post */}
        <article className = {featuredStyles.postContainer}>

          {/* Container for the main image, currently redundant */}
          <div className = {featuredStyles.imageContainer}>
            <img className = {featuredStyles.featuredImage} src = {props.post_path}>
            </img>
          </div>

          {/* Container for all the content of a featured post */}
          <div className = {featuredStyles.contentContainer}>

            {/* Container to put the main information of title and author on the same level */}
            <div className = {featuredStyles.mainInformation}>

              {/* Title for the featured post */}
              <div className = {featuredStyles.textCenter}>
                <h4 className = {featuredStyles.featuredTitle}>{props.post_title}</h4>
                {/* Time element to store date of post */}
                <time className = {featuredStyles.featuredDate}>{props.post_date}</time>
              </div>

            </div>

            {/* Image container for the author image, properly scales and fits the image to the page */}
            <div className = {featuredStyles.authorImageContainer}>
              <img className = {featuredStyles.featuredAuthorImage} src = {props.post_auth}></img>
            </div>

          </div>

        </article>

      </a>
    </>
  )
}
