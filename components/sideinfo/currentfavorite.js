import favoriteStyles from "./currentfavorite.module.scss"

export default function Currentfavorite({props}){
  return(
    <>
      {/* Top level container for the current favorites element */}
      <div className = {favoriteStyles.favoriteContainer}>

        {/* Container for favorite image */}
        <div className = {favoriteStyles.favoriteImageContainer}>
          <img className = {favoriteStyles.favoriteImage} src = {props.fav_path}></img>
        </div>

        {/* Container for all favorites information, namely title and studio */}
        <div className = {favoriteStyles.favoriteInformationContainer}>
          <a className = {favoriteStyles.titleLink}><h5 className = {favoriteStyles.favoriteTitle}>{props.fav_name}</h5></a>
          <p className = {favoriteStyles.favoriteStudio}>{props.fav_studio}</p>
        </div>

      </div>

    </>
  )
}
