import infoStyles from "./sideinfo.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Featuredpost from "./featuredpost"
import Currentfavorite from "./currentfavorite"

//Class used to build the side info panel
export default function Sideinfo(){
  return(
    <>
      {/* Top level parent used to house all side panel elements */}
      <section className = {infoStyles.tempStuff}>

        {/* Container used to house the title of the side panel */}
        <div className = {infoStyles.titleContainer}>

          {/* Create image alongside title, plus small blurb about the website */}
          <img className = {infoStyles.titleImage} src = "https://lh3.googleusercontent.com/9lR_9KbOPe9Fs3UJLV_EaTreqZVhJoL3ef2MzvnF9p0DEuLi6eJVtiu6MPgBdfAXrioGMe81svYwD_ljUdO64u4DoaBREzUl6i3Uvn_XelDbOvfJ8TW_Dz0-62G9Z_q5w3h5Ze9nsA=w2400"></img>
          <h2 className = {infoStyles.sideInfoTitle}>Anime House</h2>
          <p className = {infoStyles.titleParagraph}>A place where I post my thoughts and reviews of various Anime, Manga, and Light Novels.</p>

        </div>

        {/* Container used to house the featured posts of the side panel */}
        <div className = {infoStyles.featuredContainer}>

          {/* Header for list of featured posts */}
          <h2 className = {infoStyles.sideInfoTitle}>Featured Reviews</h2>

          {/* Unorderd list for featured posts, needs post style and HTML defined */}
          <ul className = {infoStyles.featuredList}>
            <Featuredpost></Featuredpost>
            <Featuredpost></Featuredpost>
            <Featuredpost></Featuredpost>
          </ul>

        </div>

        {/* Container used to house current favorite series of the side panel */}
        <div className = {infoStyles.favoriteContainer}>

          {/* Header for list of current favorites */}
          <h2 className = {infoStyles.sideInfoTitle}>Current Favorites</h2>

          {/* Unordered List for current favorites, needs favorites styles and HTML defined */}
          <ul className = {infoStyles.favoritesList}>
            <Currentfavorite></Currentfavorite>
            <Currentfavorite></Currentfavorite>
            <Currentfavorite></Currentfavorite>
            <Currentfavorite></Currentfavorite>
            <Currentfavorite></Currentfavorite>
          </ul>

        </div>

        {/* Container used to house Discord iframe and information */}
        <div className = {infoStyles.discordContainer}>

          {/* Header and enticing line for Discrd iframe, tagline needs work */}
          <h2 className = {infoStyles.sideInfoTitle}>Join Our Discord</h2>
          <p className = {infoStyles.discordBlurb}>Join us and have some fun! IDK yet.</p>

          {/* iframe used to show Discord to people outside of the app */}
          <iframe className = "discord" src="https://discord.com/widget?id=831001494265921536&theme=dark" width="100%" height="500em" allowtransparency="true" frameBorder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>

        </div>

        {/* Container used to house the About Me (will be 'us' later) information of the side panel */}
        <div className = {infoStyles.aboutContainer}>

          {/* Header for the about me/us information alongside a quick background */}
          <h2 className = {infoStyles.sideInfoTitle}>About Me</h2>
          <p className = {infoStyles.aboutMeBlurb}>
            I'm a university student with no shortage of hobbies, anime being one of them. When looking for a project I thought, "What better an idea than one that combines Anime with Programming", so here we are.
          </p>

          {/* Learn more button to take readers to the About Me page */}
          <button className = {infoStyles.learnMoreButton}>Learn More</button>

        </div>

        {/* Container used to house all FontAwesome Icons used for exterior site traversal in the side panel */}
        <div className = {infoStyles.buttonsContainer}>

          {/* Wrap icon in an anchor and attach desired target location */}
          <a className = {infoStyles.iconContainer} href = "https://twitter.com/Animehouse_Ca" target = "_blank">
            <FontAwesomeIcon icon = {["fab","twitter"]} className = {infoStyles.icon}></FontAwesomeIcon>
          </a>
          <a className = {infoStyles.iconContainer} href = "https://discord.com/invite/Y8uvvcKJJA" target = "_blank">
            <FontAwesomeIcon icon = {["fab","discord"]} className = {infoStyles.icon}></FontAwesomeIcon>
          </a>
          <a className = {infoStyles.iconContainer} href = "https://www.instagram.com/animehouse_ca/" target = "_blank">
            <FontAwesomeIcon icon = {["fab","instagram"]} className = {infoStyles.icon}></FontAwesomeIcon>
          </a>
          <a className = {infoStyles.iconContainer} href="mailto:admin@animehouse.ca">
            <FontAwesomeIcon icon = {["fas","envelope"]} className = {infoStyles.icon}></FontAwesomeIcon>
          </a>

        </div>

      </section>
    </>
  )
}
