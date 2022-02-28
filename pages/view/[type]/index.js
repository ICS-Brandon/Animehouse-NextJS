import { useRouter } from 'next/router'
import Head from 'next/head'
import React, { useCallback, useRef, useState, useEffect } from 'react'
import Navbar from '../../../components/navbar/navbar'
import Sidebar from '../../../components/sidebar/sidebar'
import AnimeCard from "../../../components/view/animecard"
import SearchNav from "../../../components/searchnav/searchnav"
import indexStyles from '../../index.module.scss'
import sidebarStyles from '../../../components/sidebar/sidebar.module.scss'
import searchStyles from '../../../components/navbar/searchoptions.module.scss'
import viewStyles from '../../../components/view/view.module.scss'
import searchNavStyles from "../../../components/searchnav/searchnav.module.scss"

//Function that adds back the class that hides the sidebar
function hideSidebar(){
  let sidebar = document.getElementById("sidebarCont");
  let wrapper = document.getElementById("bodyWrapper");

  sidebar.classList.add(sidebarStyles.sidebarHide);
  wrapper.classList.remove(indexStyles.wrapperFade);
}

//Function that adds back the class that hides the search bar and drop down results
function hideSearch(){

  //Inverse logic to functions explained in ../components/navbar/searchoption.js
  let searchBar = document.getElementById("navSearch");
  if(!searchBar.classList.contains(searchStyles.searchHide)){
    searchBar.classList.add(searchStyles.searchHide);

    let searchIcon = document.getElementById("searchIcon");
    searchIcon.classList.remove(searchStyles.searchSpace);

    let searchResults = document.getElementById("searchResultCont");
    searchResults.classList.remove(searchStyles.dropDownVisible);
  }
}

//Function used to reset the arrows for the two filter options
//More code will be added once drop down menus are implemented
function hideFilters(){
  let genre = document.getElementById("genreFilter");
  let arrow = genre.children[1].children[0];
  arrow.classList.remove(searchNavStyles.rotation);
  let type = document.getElementById("typeFilter");
  arrow = type.children[1].children[0];
  arrow.classList.remove(searchNavStyles.rotation);
}

const View = ({cardResults}) => {

  //Build cards for the results
  const cards = cardResults.map(card => {
    return <AnimeCard key = {card.pid} props = {card}/>
  })

  const router = useRouter();
  const { type } = router.query;

  let props = {
    "homePath" : "/",
    "animePath" : "/view/Anime",
    "mangaPath" : "/posts/first_post",
    "lightnovelPath" : "/posts/first_post",
    "helpPath" : "/posts/69420",
    "title" : type
  };

  return(
    <>
      <Sidebar aPath="/posts/first_post" mPath="/posts/first_post" lnPath="/posts/first_post" hpath="/posts/first_post" home = "./"/>

      <Head>
        <title>AnimeHouse Testing</title>
      </Head>

      <div id ="bodyWrapper" className = {indexStyles.bodyWrapper} onClick={() =>{hideSidebar();hideSearch();hideFilters();}}>
        <Navbar props = {props}/>
        <div className = {indexStyles.contentWrapper}>
          <div className = {indexStyles.contentWrapper + ' ' + indexStyles.gridFix}>
            <SearchNav/>
            <div className = {viewStyles.gridContainer}>
              {cards}
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  let fetchQuery = 'http://localhost:8081/get-'+context.query.type.toLowerCase()+'-results';
  const cardRes = await fetch(fetchQuery)
  const cardResults = await cardRes.json();
  return{
    props:{
      cardResults,
    },
  }
}


export default View;
