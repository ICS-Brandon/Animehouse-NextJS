import React, { useCallback, useRef, useState, useEffect } from 'react'
import searchStyle from './searchoptions.module.scss'


export default function Simplesearchbar(){

  const searchRef = useRef(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);

  const grab = async(query) =>{
    setQuery(query);
    console.log(query);
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
      console.log(response);
    } else{
      console.log("nothing");
    }
  };

  useEffect(() => {
    console.log(query);
    const timeOutId = setTimeout(() => grab(query), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  return(
    <>
      <input id ="navSearch" className ={searchStyle.simpleSearch + ' ' + searchStyle.searchHide} type="text" placeholder ="Quick Find" onClick={(e) => {e.stopPropagation();showSearch()}} onKeyDown={escapeSearch}/>
    </>
  )
}
