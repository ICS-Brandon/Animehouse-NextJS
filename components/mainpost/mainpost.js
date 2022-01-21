import postStyles from "./mainpost.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

export default function Mainpost(){
  return(
    <>
      {/* Top level container for the post */}
      <article className = {postStyles.postContainer}>

        {/* Header for storing important information such as title and date */}
        <header className = {postStyles.postHeader}>

          {/* Parent container for left hand side of header */}
          <div className = {postStyles.titleCont}>
            <h1 className = {postStyles.postTitle}>Girls Last Tour Episode 6</h1>
            <p className = {postStyles.postBlurb}>Comfort In Hopelessness</p>
          </div>

          {/* Parent container for right hand side of header */}
          <div className = {postStyles.metaCont}>

            <time className = {postStyles.postDate}>January 20, 2021</time>

            {/* Container for author information so it displays on the same line */}
            <div className = {postStyles.authorContainer}>
              <a className = {postStyles.authorLink}>Piro</a>
              <img className = {postStyles.authorImage} src = "https://lh3.googleusercontent.com/7MpxdyTQ7bCFeC-KlUnAG7crRjK61curPF6wheLj7RfjBMAZInp3QOZnddRo_pAR-16LBN9xFZdzlL_3hvxqXcSrDwNWcuJXLqZEuh8ex8fP2ZmHfSYo-Bcmx3sP_9lY8__MfiTgdA=w2400"></img>
            </div>

          </div>

        </header>

        {/* Div used to house "main" content of the post, namely the image and a small paragraph introducing it */}
        <div className = {postStyles.mainContent}>

          {/* Container used for image so that padding isn't applied to hover behavior on image */}
          <div className = {postStyles.imageContainer}>
            <img className = {postStyles.postImage} src = "https://lh3.googleusercontent.com/5U3Ybm8Xc1CxlmzRPISNeEdKTdy_Pu7clf6lXD93A25JXhcP8FeUBf3hdAxT654uMBzSaMjcUF5-lBtOpB8omXaLO1R1tp_ZB09wV7iTf7w9P7GZkznw5aisvHY-CJnBgl2-TaRprg=w2400"></img>
          </div>

          {/* Paragraph used to house an introduction to the post */}
          <p className = {postStyles.postParagraph}>Our pair of main characters continue to move forward and find themselves another human, an inventor-slash-engineer that teaches them the value of acceptance in the face of despair.Our pair of main characters continue to move forward and find themselves another human, an inventor-slash-engineer that teaches them the value of acceptance in the face of despair.Our pair of main characters continue to move forward and find themselves another human, an inventor-slash-engineer that teaches them the value of acceptance in the face of despair.Our pair of main characters continue to move forward and find themselves another human, an inventor-slash-engineer that teaches them the value of acceptance in the face of despair.
          </p>

        </div>

        {/* Footer that houses all buttons and links */}
        <footer className = {postStyles.postFooter}>

          {/* Div might be redundant, but button used to redirect to the given post */}
          <div className = {postStyles.buttonContainer}>
            <button className = {postStyles.postButton}>Continue Reading</button>
          </div>

          {/* Separate div container for link and button on the right hand side of footer */}
          <div className = {postStyles.postInfo}>

            {/* Wrapper for genre link to define styles properly */}
            <div className = {postStyles.genreWrapper}>
              <a className = {postStyles.genreLink}>Test</a>
            </div>

            {/* Font Awesome Icon for liking the post */}
            <FontAwesomeIcon icon = {faThumbsUp} className = {postStyles.likeIcon}></FontAwesomeIcon>
          </div>

        </footer>

      </article>
    </>
  )
}
