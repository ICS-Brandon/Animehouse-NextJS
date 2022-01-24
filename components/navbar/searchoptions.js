//Importing global FontAwesome Icons and SCSS Module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import searchStyle from './searchoptions.module.scss'
import sidebarStyles from '../sidebar/sidebar.module.scss'
import indexStyles from "../../pages/index.module.scss"
import Index from "../../pages/index";
import React, { useCallback, useRef, useState, useEffect } from 'react'

//Function to show sidebar
function showSidebar(){

  //Get required elements and remove/add desired classes
  let sidebar = document.getElementById("sidebarCont");
  let sidebarSearch = document.getElementById("sidebarSearch");
  let wrapper = document.getElementById("bodyWrapper");

  if(sidebar.classList.contains(sidebarStyles.sidebarHide)){
    sidebar.classList.remove(sidebarStyles.sidebarHide);
    sidebar.focus();
    wrapper.classList.add(indexStyles.wrapperFade);
  }

  hideSearch();
}

//Funcation that adds back the class that hides the search bar and drop down results
function hideSearch(){

  //Inverse logic to functions explained in showSearch
  let searchBar = document.getElementById("navSearch");
  if(!searchBar.classList.contains(searchStyle.searchHide)){
    searchBar.blur();
    searchBar.classList.add(searchStyle.searchHide);

    let searchIcon = document.getElementById("searchIcon");
    searchIcon.classList.remove(searchStyle.searchSpace);

    let searchResults = document.getElementById("searchResultCont");
    searchResults.classList.remove(searchStyle.dropDownVisible);
  }
}

//Function to show Search Bar and Drop Down for results
function showSearch(){

  //Get each element required and add or remove class
  let searchBar = document.getElementById("navSearch");
  let resultsList = document.getElementById("simpleSearchResults")
  if(searchBar.classList.contains(searchStyle.searchHide)){
    searchBar.classList.remove(searchStyle.searchHide);
    searchBar.value = "";
    resultsList.innerHTML = "";
    searchBar.focus();

    let searchIcon = document.getElementById("searchIcon");
    searchIcon.classList.add(searchStyle.searchSpace);

    let searchResults = document.getElementById("searchResultCont");
    searchResults.classList.add(searchStyle.dropDownVisible);
  }
}

async function escapeSearch(e){
  if(e.key === "Escape"){
    hideSearch();
  }
}



export default function SearchOptions(){


  const searchRef = useRef(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);

  const grab = async(query) =>{
    setQuery(query);
    if(query.length){
      let queryReq = {}
      queryReq.delim = query;
      let result = await fetch('http://localhost:8081/get-simple-search-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(queryReq)
      });
      let response = await result.json();
      setResults(response);
    } else{
      setResults([]);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => grab(query), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);


  return(
    <>
      {/* Style Wrapper */}
      <div className = {searchStyle.searchWrapper}>

        <div className = {searchStyle.separator} onClick={(e) => {e.stopPropagation();}}>

          {/* FontAwesome components that sandwich input text field, more to come */}
          <FontAwesomeIcon icon = "search" id = "searchIcon" className = {searchStyle.searchIcon + ' ' + searchStyle.iconFix} onClick={(e) => {e.stopPropagation();showSearch()}}/>
          <input id ="navSearch" className ={searchStyle.simpleSearch + ' ' + searchStyle.searchHide} type="text" placeholder ="Quick Find" onClick={(e) => {e.stopPropagation();showSearch()}} onChange = {(e) =>{setQuery(e.target.value)}} onKeyDown={escapeSearch} value = {query}/>

          {/* Div used to hold the search results tab */}
          <div id = "searchResultCont" className = {searchStyle.dropDown}>

            {/* Store search results in an unordered list of links */}
            <ul id = "simpleSearchResults" className = {searchStyle.simpleResults}>
              {results.map(({post_title, link, post_id, pid}) =>{
                return(
                  <li key = {post_id} id = {pid} className = {post_id}>
                    <a href={link}>{post_title}</a>
                  </li>
                )
              })}
            </ul>

          </div>

        </div>

        {/* Icon has onClick function for showing sidebar with animation, includes stopPropagation so that other elements don't trigger */}
        <FontAwesomeIcon icon = "bars" className = {searchStyle.barsIcon} onClick = {(e) => {e.stopPropagation();showSidebar()}}/>
      </div>
    </>
  )
}
