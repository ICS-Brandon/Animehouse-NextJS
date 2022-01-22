import favoriteStyles from "./currentfavorite.module.scss"

export default function Currentfavorite(){
  return(
    <>
      {/* Top level container for the current favorites element */}
      <div className = {favoriteStyles.favoriteContainer}>

        {/* Container for favorite image */}
        <div className = {favoriteStyles.favoriteImageContainer}>
          <img className = {favoriteStyles.favoriteImage} src = "https://lh3.googleusercontent.com/SNc3ZHVVX18Ogcbs7XQlzukWoJ2qp4j09zmo7bNZZjrFkIs1LngYjYy7bbBTOTpAVYFYt_iv-Npo6FoWwZXHCIYC_RBwSqRHCKouz9t22TeKxxg0yOaL2hqVqX2srX0e496VoT4QpA=w2400"></img>
        </div>

        {/* Container for all favorites information, namely title and studio */}
        <div className = {favoriteStyles.favoriteInformationContainer}>
          <a className = {favoriteStyles.titleLink}><h5 className = {favoriteStyles.favoriteTitle}>Vanitas No Carte</h5></a>
          <p className = {favoriteStyles.favoriteStudio}>Bones</p>
        </div>
        
      </div>

    </>
  )
}
