import postStyles from "./mainpost.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

export default function Mainpost(props){
  return(
    <>
      {/* Top level container for the post */}
      <article id = {props.postInfo.post_id} className = {postStyles.postContainer + " " + props.postInfo.pid}>

        {/* Header for storing important information such as title and date */}
        <header className = {postStyles.postHeader}>

          {/* Parent container for left hand side of header */}
          <div className = {postStyles.titleCont}>
            <h1 className = {postStyles.postTitle}>{props.postInfo.post_title}</h1>
            <p className = {postStyles.postBlurb}>{props.postInfo.post_blurb}</p>
          </div>

          {/* Parent container for right hand side of header */}
          <div className = {postStyles.metaCont}>

            <time className = {postStyles.postDate}>{props.postInfo.post_date}</time>

            {/* Container for author information so it displays on the same line */}
            <div className = {postStyles.authorContainer}>
              <a className = {postStyles.authorLink}>Piro</a>
              <img className = {postStyles.authorImage} src = {props.postInfo.post_auth}></img>
            </div>

          </div>

        </header>

        {/* Div used to house "main" content of the post, namely the image and a small paragraph introducing it */}
        <div className = {postStyles.mainContent}>

          {/* Container used for image so that padding isn't applied to hover behavior on image */}
          <div className = {postStyles.imageContainer}>
            <img className = {postStyles.postImage} src = {props.postInfo.img_path}></img>
          </div>

          {/* Paragraph used to house an introduction to the post */}
          <p className = {postStyles.postParagraph}>
            {props.postInfo.post_paragraph}
          </p>

        </div>

        {/* Footer that houses all buttons and links */}
        <footer className = {postStyles.postFooter}>

          {/* Div might be redundant, but button used to redirect to the given post */}
          <div className = {postStyles.buttonContainer}>
            <a href = {props.postInfo.link}><button className = {postStyles.postButton}>Continue Reading</button></a>
          </div>

          {/* Separate div container for link and button on the right hand side of footer */}
          <div className = {postStyles.postInfo}>

            {/* Wrapper for genre link to define styles properly */}
            <div className = {postStyles.genreWrapper}>
              <a className = {postStyles.genreLink}>{props.postInfo.genre}</a>
            </div>

            {/* Font Awesome Icon for liking the post */}
            <FontAwesomeIcon icon = {faThumbsUp} className = {postStyles.likeIcon}></FontAwesomeIcon>
          </div>

        </footer>

      </article>
    </>
  )
}
