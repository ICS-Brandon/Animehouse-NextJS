import '../styles/globals.css'
import '../styles/global.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from 'fortawesome-light/free-solid-svg-icons'
import { faChevronRight } from 'fortawesome-light/free-solid-svg-icons'
import { faChevronLeft } from 'fortawesome-light/free-solid-svg-icons'
import { faEnvelope } from 'fortawesome-light/free-solid-svg-icons'
import { faTwitter } from 'fortawesome-light/free-brands-svg-icons'
import { faInstagram } from 'fortawesome-light/free-brands-svg-icons'
import { faDiscord } from 'fortawesome-light/free-brands-svg-icons'
import { fontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react';

library.add(faSearch, faBars, faThumbsUp, faTwitter, faInstagram, faDiscord, faEnvelope, faChevronRight, faChevronLeft);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps}/>
}

export default MyApp
