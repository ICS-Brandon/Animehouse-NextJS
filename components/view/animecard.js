import Link from 'next/link'
import cardStyles from "./view.module.scss"

export default function Animecard(){
  return(
    <>
      {/* Top level anchor element for on click behavior */}
      <Link href = "/">

        {/* Article element to contain content for each search result */}
        <article className = {cardStyles.parentContainer}>

          {/* Div for proper sizing of search result image */}
          <div className={cardStyles.imageContainer}>
            <img className = {cardStyles.mainImage} src ="https://lh3.googleusercontent.com/bZU_p3O9GzJqH7-a8lBPs0QuJ0BHD02xE2JKTyLGBlHKwIky8SblsvEBMSZ70Pk4dvyFmNPwomLDvIUBrmIKVCFAcn7flsToNnj6JI5Er4jZ_VSks-7RANxGnKi2iiuyyY-9L2Qleg=w2400"/>
          </div>

          {/* Header element to house all information for a given element in a search result */}
          <header className = {cardStyles.contentContainer}>

            {/* Div for housing post title and date */}
            <div className = {cardStyles.postInfoWrapper}>
              <div className = {cardStyles.spacingWrapper}>
                <h4 className = {cardStyles.resultTitle}>Vivy: Fluorite Eye's Song Episode 12</h4>
                <time className = {cardStyles.resultDate}>July 32, 3029</time>
              </div>
            </div>

            {/* Div used to implement proper top level positioning for author image */}
            <div className = {cardStyles.positionWrapper}>

              {/* Container used for proper positioning of author image */}
              <div className = {cardStyles.authorImageContainer}>
                <img className = {cardStyles.authorImage} src = "https://lh3.googleusercontent.com/7MpxdyTQ7bCFeC-KlUnAG7crRjK61curPF6wheLj7RfjBMAZInp3QOZnddRo_pAR-16LBN9xFZdzlL_3hvxqXcSrDwNWcuJXLqZEuh8ex8fP2ZmHfSYo-Bcmx3sP_9lY8__MfiTgdA=w2400"/>
              </div>

            </div>

          </header>

        </article>

      </Link>
    </>
  )
}
