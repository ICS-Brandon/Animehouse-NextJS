import featuredStyles from "./featuredpost.module.scss";

export default function Featuredpost(){
  return(
    <>
      {/* Top level anchor wrapper for on click behavior and redirection*/}
      <a className = {featuredStyles.linkWrapper}>

        {/* Container for all elements of a featured post */}
        <div className = {featuredStyles.postContainer}>

          {/* Container for the main image, currently redundant */}
          <div className = {featuredStyles.imageContainer}>
            <img className = {featuredStyles.featuredImage} src = "https://lh3.googleusercontent.com/HG1HcyfgYzecnVnXCna-8MbEiFo2EOx-PiNq9U2wqM20knNdF8776NcueQKtVy4Vk91fClvMDcjVjfag6aVr6G7__OoHQ1vsai9RcPKMzuE1f_LqKyhlLH4W8KVlh7_MIJypEnlMnw=w2400">
            </img>
          </div>

          {/* Container for all the content of a featured post */}
          <div className = {featuredStyles.contentContainer}>

            {/* Container to put the main information of title and author on the same level */}
            <div className = {featuredStyles.mainInformation}>

              {/* Title for the featured post */}
              <h4 className = {featuredStyles.featuredTitle}>Godzilla Singular Point Episode 1</h4>

              {/* Image container for the author image, properly scales and fits the image to the page */}
              <div className = {featuredStyles.authorImageContainer}>
                <img className = {featuredStyles.featuredAuthorImage} src = "https://lh3.googleusercontent.com/7MpxdyTQ7bCFeC-KlUnAG7crRjK61curPF6wheLj7RfjBMAZInp3QOZnddRo_pAR-16LBN9xFZdzlL_3hvxqXcSrDwNWcuJXLqZEuh8ex8fP2ZmHfSYo-Bcmx3sP_9lY8__MfiTgdA=w2400"></img>
              </div>

            </div>

            {/* Time element to store date of post */}
            <time className = {featuredStyles.featuredDate}>April 24, 2021</time>

          </div>

        </div>

      </a>
    </>
  )
}
