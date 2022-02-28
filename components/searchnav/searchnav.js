import searchNavStyles from "./searchnav.module.scss"
import Script from "next/script"

/*
  Function used to toggle on click between arrow orientations for each filter
*/
function filterChange(id){
  let filterItem = document.getElementById(id);
  let arrow = filterItem.children[1].children[0];
  arrow.classList.toggle(searchNavStyles.rotation);
}

export default function SearchNav({props}){

  return(
    <>
      {/* Top Level wrapper for the Search Nav component */}
      <div className = {searchNavStyles.searchNavParent}>

        {/* Title for Search Nav, needs work to change depending on which page is loaded*/}
        <h3>Anime Reviews</h3>

        {/* Wrapper for search bar, filters, and sort items */}
        <div className = {searchNavStyles.flexWrapper}>

          {/* Search Input, does not include onClick or anything. Needs Work. */}
          <input type = 'text' placeholder = 'Search...' className = {searchNavStyles.mainSearch}/>

          {/* Filter parent for genre */}
          <div className = {searchNavStyles.filterHeader} id = 'genreFilter' onClick = {(e) => {e.stopPropagation(); filterChange('genreFilter')}}>

            {/* Filter title and arrow image*/}
            <h2>Filter Genre</h2>
            <div className = {searchNavStyles.imageResize}>
              <img src = "https://lh3.googleusercontent.com/3YMfRPUm02KeVUYRyWS0aN6Y2-tI9wW39HqGcGg1ld4JnJdRlofNI9KS6i73ZLhy4cr_7IEI_oL8iKTI-w7p_E7Mdi2vWYWr0ewZdzA7AS3O9dyz5ecxt7VDeytbaKEEYstjOm_vZQ=w2400"/>
            </div>
          </div>

          {/* Filter parent for type */}
          <div className = {searchNavStyles.filterHeader} id = 'typeFilter' onClick = {(e) => {e.stopPropagation(); filterChange('typeFilter')}}>

            {/* Filter title and arrow image */}
            <h2>Filter Type</h2>
            <div className = {searchNavStyles.imageResize}>
              <img src = "https://lh3.googleusercontent.com/3YMfRPUm02KeVUYRyWS0aN6Y2-tI9wW39HqGcGg1ld4JnJdRlofNI9KS6i73ZLhy4cr_7IEI_oL8iKTI-w7p_E7Mdi2vWYWr0ewZdzA7AS3O9dyz5ecxt7VDeytbaKEEYstjOm_vZQ=w2400"/>
            </div>
          </div>

          {/* Parent div for sorting options, currently not including the icons for sorting */}
          <div className = {searchNavStyles.filterHeader}>

            {/* Div containers for each search option, will contain icons in the future */}
            <div>
              <h3>Genre</h3>
            </div>
            <div>
              <h3>Date</h3>
            </div>
            <div>
              <h3>Title</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
