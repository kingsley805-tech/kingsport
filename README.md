├── .gitattributes
├── .gitignore
├── CNAME
├── README.md
├── package-lock.json
├── package.json
├── public
    ├── _redirects
    ├── index.html
    └── robots.txt
├── src
    ├── App.js
    ├── App.module.scss
    ├── components
    │   ├── BaseLayout.js
    │   ├── BaseLayout.module.scss
    │   ├── MultiPageRoutes.js
    │   ├── Navbar.js
    │   ├── Navbar.module.scss
    │   ├── SinglePageRoutes.js
    │   ├── about
    │   │   ├── About.js
    │   │   ├── About.module.scss
    │   │   ├── Terminal.js
    │   │   └── Terminal.module.scss
    │   ├── home
    │   │   ├── EmojiBullet.js
    │   │   ├── Home.js
    │   │   ├── Home.module.scss
    │   │   ├── SocialIcon.js
    │   │   └── Toggler.js
    │   └── portfolio
    │   │   ├── IconLink.js
    │   │   ├── Portfolio.js
    │   │   └── PortfolioBlock.js
    ├── hooks
    │   └── useScrollObserver.js
    ├── img
    │   ├── mcube.png
    │   ├── me.png
    │   ├── mock1.png
    │   ├── mock2.png
    │   ├── mock3.png
    │   ├── mock4.png
    │   ├── mock5.png
    │   ├── mockup.png
    │   ├── mockup1.png
    │   ├── mockup2.png
    │   ├── mockup3.png
    │   ├── mockup4.png
    │   ├── mockup5.png
    │   ├── mockup6.png
    │   ├── pt1.jpg
    │   └── self.png
    ├── index.js
    ├── info
    │   └── Info.js
    └── variables.modules.scss
└── yarn.lock


/.gitattributes:
--------------------------------------------------------------------------------
1 | # Auto detect text files and perform LF normalization
2 | * text=auto
3 | 


--------------------------------------------------------------------------------
/.gitignore:
--------------------------------------------------------------------------------
 1 | # See https://help.github.com/articles/ignoring-files/ for more about ignoring files.
 2 | 
 3 | # dependencies
 4 | /node_modules
 5 | */node_modules
 6 | /.pnp
 7 | .pnp.js
 8 | 
 9 | # testing
10 | /coverage
11 | 
12 | # production
13 | /build
14 | 
15 | # misc
16 | .DS_Store
17 | .env.local
18 | .env.development.local
19 | .env.test.local
20 | .env.production.local
21 | .idea
22 | */.idea/*
23 | */.idea/*/*
24 | .idea/
25 | .idea/*
26 | .idea/*/*/*
27 | 
28 | npm-debug.log*
29 | yarn-debug.log*
30 | yarn-error.log*
31 | 


--------------------------------------------------------------------------------
/CNAME:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/kingsley805-tech/kingsport/3f11644be9ce8e5d542952b01b51aa2c8e684a72/CNAME


--------------------------------------------------------------------------------
/README.md:
--------------------------------------------------------------------------------
1 | # Portfolio
2 |  
3 | # kingsport
4 | 


--------------------------------------------------------------------------------
/package.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "name": "portfolioTemplate",
 3 |   "version": "2.0.0",
 4 |   "private": true,
 5 |   "dependencies": {
 6 |     "@emotion/react": "^11.9.0",
 7 |     "@emotion/styled": "^11.8.1",
 8 |     "@mui/icons-material": "^5.6.2",
 9 |     "@mui/material": "^5.6.3",
10 |     "@testing-library/jest-dom": "^5.14.1",
11 |     "@testing-library/react": "^11.2.7",
12 |     "@testing-library/user-event": "^13.1.9",
13 |     "ajv": "^8.11.0",
14 |     "classnames": "^2.2.6",
15 |     "moment": "^2.29.4",
16 |     "node-forge": ">=1.3.0",
17 |     "object-path": "^0.11.8",
18 |     "postcss": "^8.4.14",
19 |     "postcss-normalize": "^10.0.1",
20 |     "react": "^17.0.2",
21 |     "react-dom": "^17.0.2",
22 |     "react-intersection-observer": "^9.4.2",
23 |     "react-router-dom": "^6.3.0",
24 |     "react-router-hash-link": "^2.4.3",
25 |     "react-scripts": "^5.0.1",
26 |     "sass": "^1.54.5",
27 |     "typescript": "^4.7.4"
28 |   },
29 |   "scripts": {
30 |     "start": "react-scripts start",
31 |     "build": "react-scripts build",
32 |     "test": "react-scripts test",
33 |     "eject": "react-scripts eject"
34 |   },
35 |   "eslintConfig": {
36 |     "extends": "react-app"
37 |   },
38 |   "browserslist": {
39 |     "production": [
40 |       ">0.2%",
41 |       "not dead",
42 |       "not op_mini all"
43 |     ],
44 |     "development": [
45 |       "last 1 chrome version",
46 |       "last 1 firefox version",
47 |       "last 1 safari version"
48 |     ]
49 |   }
50 | }
51 | 


--------------------------------------------------------------------------------
/public/_redirects:
--------------------------------------------------------------------------------
1 | /*    /index.html   200
2 | 


--------------------------------------------------------------------------------
/public/index.html:
--------------------------------------------------------------------------------
 1 | <!DOCTYPE html>
 2 | <html lang="en">
 3 |   <head>
 4 |     <meta charset="utf-8" />
 5 |     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" media="screen">
 6 |     <meta name="viewport" content="width=device-width, initial-scale=1" />
 7 |     <meta name="theme-color" content="#000000" />
 8 | 
 9 |     <base href="/">
10 |     <meta
11 |       name="description"
12 |       content="developer portfolio"
13 |     />
14 |     <meta name="keyword" content="portfolio, javascript, developer, frontend, react, dev, front-end, tech, programmer">
15 |     <title>Kingsley</title>
16 |   </head>
17 |   <body>
18 |     <noscript>You need to enable JavaScript to run this app.</noscript>
19 |     <div id="root"></div>
20 |     
21 |   </body>
22 | </html>
23 | 


--------------------------------------------------------------------------------
/public/robots.txt:
--------------------------------------------------------------------------------
1 | # https://www.robotstxt.org/robotstxt.html
2 | User-agent: *
3 | Disallow:
4 | 


--------------------------------------------------------------------------------
/src/App.js:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 | import './App.module.scss';
 3 | import BaseLayout from "./components/BaseLayout";
 4 | import {BrowserRouter} from "react-router-dom";
 5 | 
 6 | function App() {
 7 |    return (
 8 |       <div>
 9 |          <BrowserRouter>
10 |             <BaseLayout/>
11 |          </BrowserRouter>
12 |       </div>
13 |    );
14 | }
15 | 
16 | 
17 | export default App;
18 | 


--------------------------------------------------------------------------------
/src/App.module.scss:
--------------------------------------------------------------------------------
 1 | @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap');
 2 | @import "./variables.modules";
 3 | 
 4 | 
 5 | body {
 6 |     font-family: 'Roboto', Helvetica, sans-serif;
 7 |     font-size: 1.5vh;
 8 |     width: 100%;
 9 |     height: 100%;
10 |     color: $dark;
11 |     background-color: $white;
12 |     box-sizing: border-box;
13 | }
14 | 
15 | li {
16 |     color: $dark;
17 | }
18 | 
19 | * {
20 |     margin: 0;
21 |     padding: 0;
22 |     box-sizing: border-box;
23 | }
24 | 
25 | a,
26 | a:link,
27 | a:hover,
28 | a:visited,
29 | a:active {
30 |     text-decoration: none;
31 | }
32 | 
33 | img {
34 |     max-width: 100%;
35 | }
36 | 
37 | ul {
38 |     list-style-type: none;
39 | }


--------------------------------------------------------------------------------
/src/components/BaseLayout.js:
--------------------------------------------------------------------------------
 1 | import React, { useEffect, useState } from 'react';
 2 | import Style from './BaseLayout.module.scss'
 3 | import Navbar from "./Navbar";
 4 | import { useLocation } from "react-router-dom";
 5 | import { Box, Grid } from "@mui/material";
 6 | import MultiPageRoutes from './MultiPageRoutes';
 7 | import { singlePage } from '../info/Info';
 8 | import SinglePageRoutes from './SinglePageRoutes';
 9 | import useScrollObserver from '../hooks/useScrollObserver';
10 | 
11 | export default function BaseLayout() {
12 |    const location = useLocation()
13 | 
14 |    const [active, setActive] = useState(location.pathname === '/' ? 'home' : location.pathname.slice(1, location.pathname.length));
15 |    const refHome = useScrollObserver(setActive);
16 |    const refAbout = useScrollObserver(setActive);
17 |    const refPortfolio = useScrollObserver(setActive);
18 |    let [darkMode, setDarkMode] = useState(false);
19 | 
20 | 
21 | 
22 |    function handleToggleDarkMode() {
23 |       let oppositeOfCurrentDarkMode = !darkMode
24 |       console.log(oppositeOfCurrentDarkMode)
25 |       localStorage.setItem('darkMode', `${oppositeOfCurrentDarkMode}`)
26 |       setDarkMode(oppositeOfCurrentDarkMode)
27 |    }
28 | 
29 |    useEffect(() => {
30 |       let detectedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
31 | 
32 |       if (detectedDarkMode) {
33 |          setDarkMode(detectedDarkMode)
34 |       } else {
35 |          localStorage.setItem('darkMode', 'false')
36 |       }
37 |    }, [])
38 | 
39 |    return (
40 |       <Box className={darkMode ? Style.dark : Style.light}>
41 |          <Grid container display={'flex'} flexDirection={'column'} minHeight={'100vh'}
42 |             justifyContent={'space-between'}>
43 |             <Grid item>
44 |                <Navbar darkMode={darkMode} handleClick={handleToggleDarkMode} active={active} setActive={setActive} />
45 |             </Grid>
46 |             <Grid item flexGrow={1}>
47 |                {singlePage ? <SinglePageRoutes refs={{refHome, refAbout, refPortfolio}}/> : <MultiPageRoutes />}
48 |             </Grid>
49 |             <Grid item>
50 |                <Box component={'footer'} display={'flex'} flexDirection={'column'} alignItems={'center'}
51 |                   py={'1.5rem'} sx={{ opacity: 0.7 }} width={'100%'}>
52 |                   
53 |                   <p>&copy; 2025</p>
54 |                </Box>
55 |             </Grid>
56 |          </Grid>
57 |       </Box>
58 |    )
59 | }
60 | 
61 | 


--------------------------------------------------------------------------------
/src/components/BaseLayout.module.scss:
--------------------------------------------------------------------------------
 1 | @import "../variables.modules";
 2 | 
 3 | footer {
 4 |   color: $dark;
 5 | }
 6 | 
 7 | .dark {
 8 |   background-color: $dark;
 9 |   color: $white;
10 |   transition: all 400ms;
11 | 
12 |   a, i, li {
13 |     color: $white;
14 |     transition: color 400ms;
15 |   }
16 | 
17 |   a:visited {
18 |     color: $white;
19 |   }
20 | 
21 |   footer {
22 |     color: $white;
23 |   }
24 | }
25 | 
26 | .light {
27 |   background-color: $white;
28 |   color: $dark;
29 |   transition: all 400ms;
30 | }
31 | 
32 | 
33 | //.dark {
34 | //  background-color: $dark;
35 | //  color: $white;
36 | //  transition: all 400ms;
37 | //  a, i {
38 | //    color: $white;
39 | //    transition: color 400ms;
40 | //  }
41 | //  a:visited {
42 | //    color: $white;
43 | //  }
44 | //  i:hover {
45 | //    color: $purple;
46 | //  }
47 | //  footer {
48 | //    color: $white;
49 | //  }
50 | //
51 | //  nav {
52 | //    background-color: $dark;
53 | //    transition: $transition;
54 | //  }
55 | //
56 | //  div > section > div:first-child {
57 | //    background-color: #575e64;
58 | //    i:first-child {
59 | //      color: $red;
60 | //    }
61 | //    i:nth-child(2) {
62 | //      color: $yellow;
63 | //    }
64 | //    i:nth-child(3) {
65 | //      color: $green;
66 | //    }
67 | //  }
68 | //
69 | //
70 | //  & > div div {
71 | //    i {
72 | //      color: white;
73 | //    }
74 | //  }
75 | //}


--------------------------------------------------------------------------------
/src/components/MultiPageRoutes.js:
--------------------------------------------------------------------------------
 1 | import Home from "./home/Home";
 2 | import About from "./about/About";
 3 | import Portfolio from "./portfolio/Portfolio";
 4 | import React from 'react';
 5 | import { Route, Routes } from 'react-router-dom';
 6 | 
 7 | export default function MultiPageRoutes() {
 8 |     return (
 9 |         <Routes>
10 |             <Route exact path={'/'} element={<Home />} />
11 |             <Route exact path={'/about'} element={<About />} />
12 |             <Route exact path={'/portfolio'} element={<Portfolio />} />
13 |         </Routes>
14 |     )
15 | }


--------------------------------------------------------------------------------
/src/components/Navbar.js:
--------------------------------------------------------------------------------
 1 | import React, { useState } from 'react';
 2 | import Style from './Navbar.module.scss';
 3 | import Toggler from "./home/Toggler";
 4 | import { useLocation } from "react-router-dom";
 5 | import { HashLink as Link } from 'react-router-hash-link';
 6 | import { Box } from "@mui/material";
 7 | import { info } from "../info/Info";
 8 | import { singlePage } from '../info/Info';
 9 | 
10 | const links = [
11 |     {
12 |         name: 'Home',
13 |         to: '',
14 |         active: 'home'
15 |     },
16 |     {
17 |         name: 'About Me',
18 |         to: 'about',
19 |         active: 'about'
20 |     },
21 |     {
22 |         name: info.initials,
23 |         type: 'initials',
24 |         to: '',
25 |         active: 'home'
26 |     },
27 |     {
28 |         name: 'Portfolio',
29 |         to: 'portfolio',
30 |         active: 'portfolio'
31 |     }
32 | ]
33 | 
34 | // This function is used to create a scroll offset to compensate for the navbar
35 | // when you click on the nav buttons to scroll down.
36 | const scrollWidthOffset = (el) => {
37 |     const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
38 |     const yOffset = -80; 
39 |     window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
40 | }
41 | 
42 | 
43 | export default function Navbar({ darkMode, handleClick, active, setActive }) {
44 | 
45 |     return (
46 |         <Box component={'nav'} width={'100%'} position={singlePage ? 'fixed' : 'relative'} className={darkMode? Style.dark : Style.light}>
47 |             <Box component={'ul'} display={'flex'} justifyContent={'center'} alignItems={'center'}
48 |                 gap={{ xs: '2rem', md: '8rem' }}
49 |                 textTransform={'lowercase'} fontSize={'1rem'}>
50 |                 {links.map((link, index) => (
51 |                     <Box key={index} component={'li'} className={(link.active === active && !link.type) && Style.active}
52 |                         sx={{ borderImageSource: info.gradient }}>
53 |                         <Link to={singlePage ? `#${link.to}` : `/${link.to}`}
54 |                         scroll={el => scrollWidthOffset(el)}
55 |                             smooth
56 |                             onClick={() => setActive(link.active)} className={Style.link}>
57 |                             {!link.type && <p style={{ padding: '0.5rem 0' }}>{link.name}</p>}
58 |                             {link.type && <h1>{link.name}</h1>}
59 |                         </Link>
60 |                     </Box>
61 |                 ))}
62 |                 <li>
63 |                     <Toggler darkMode={darkMode} handleClick={handleClick} />
64 |                 </li>
65 |             </Box>
66 |         </Box>
67 |     )
68 | }


--------------------------------------------------------------------------------
/src/components/Navbar.module.scss:
--------------------------------------------------------------------------------
 1 | @import "../variables.modules";
 2 | 
 3 | nav {
 4 |   transition: all 400ms;
 5 |   z-index: 1;
 6 | }
 7 | 
 8 | .dark {
 9 |   background-color: $dark;
10 | }
11 | 
12 | 
13 | .light {
14 |   background-color: $white;
15 | }
16 | 
17 | .active {
18 |   border-bottom: 5px solid;
19 |   border-image-slice: 1;
20 | }
21 | 
22 | li {
23 |   transition: $transition;
24 | 
25 |   &:hover {
26 |     transform: translateY(-3px);
27 |     transition: $transition;
28 |   }
29 | }
30 | 
31 | .link:hover {
32 |   color: unset;
33 | }


--------------------------------------------------------------------------------
/src/components/SinglePageRoutes.js:
--------------------------------------------------------------------------------
 1 | import Home from "./home/Home";
 2 | import About from "./about/About";
 3 | import Portfolio from "./portfolio/Portfolio";
 4 | import React from 'react';
 5 | import { Box } from "@mui/material";
 6 | 
 7 | export default function SinglePageRoutes({refs}) {
 8 |     return (<Box mt={'3rem'}>
 9 |         <Home innerRef={refs.refHome}/>
10 |         <About innerRef={refs.refAbout}/>
11 |         <Portfolio innerRef={refs.refPortfolio}/>
12 |     </Box>)
13 | }


--------------------------------------------------------------------------------
/src/components/about/About.js:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 | import Style from './About.module.scss';
 3 | import Terminal from "./Terminal";
 4 | import {Box} from "@mui/material";
 5 | import {info} from "../../info/Info";
 6 | 
 7 | 
 8 | export default function About({innerRef}) {
 9 |     const firstName = info.firstName.toLowerCase()
10 | 
11 |     function aboutMeText() {
12 |         return <>
13 |             <p><span style={{color: info.baseColor}}>{firstName}{info.lastName.toLowerCase()} 
lt;/span> cat
14 |                 about{firstName} </p>
15 |             <p><span style={{color: info.baseColor}}>about{firstName} <span
16 |                 className={Style.green}>(main)</span> $ </span>
17 |                 {info.bio}
18 |             </p>
19 |         </>;
20 |     }
21 | 
22 |     function skillsText() {
23 |         return <>
24 |             <p><span style={{color: info.baseColor}}>{firstName}{info.lastName.toLowerCase()} 
lt;/span> cd skills/tools
25 |             </p>
26 |             <p><span style={{color: info.baseColor}}>skills/tools <span
27 |                 className={Style.green}>(main)</span> 
lt;/span> ls</p>
28 |             <p style={{color: info.baseColor}}> proficient FrontEnd With</p>
29 |             <ul className={Style.skills}>
30 |                 {info.skills.proficientWith.map((proficiency, index) => <li key={index}>{proficiency}</li>)}
31 |             </ul>
32 |             <p style={{color: info.baseColor}}> proficient Backend With</p>
33 |             <ul className={Style.skills}>
34 |                 {info.skills.exposedTo.map((skill, index) => <li key={index}>{skill}</li>)}
35 |             </ul>
36 |         </>;
37 |     }
38 | 
39 |     function miscText() {
40 |         return <>
41 |             <p><span style={{color: info.baseColor}}>{firstName}{info.lastName.toLowerCase()} 
lt;/span> cd
42 |                 hobbies/interests</p>
43 |             <p><span style={{color: info.baseColor}}>hobbies/interests <span
44 |                 className={Style.green}>(main)</span> 
lt;/span> ls</p>
45 |             <ul>
46 |                 {info.hobbies.map((hobby, index) => (
47 |                     <li key={index}><Box component={'span'} mr={'1rem'}>{hobby.emoji}</Box>{hobby.label}</li>
48 |                 ))}
49 |             </ul>
50 |         </>;
51 |     }
52 | 
53 |     return (
54 |         <Box ref={innerRef} display={'flex'} flexDirection={'column'} alignItems={'center'} mt={'3rem'} id={'about'}>
55 |             <Terminal text={aboutMeText()}/>
56 |             <Terminal text={skillsText()}/>
57 |             <Terminal text={miscText()}/>
58 |         </Box>
59 |     )
60 | }


--------------------------------------------------------------------------------
/src/components/about/About.module.scss:
--------------------------------------------------------------------------------
 1 | @import "../../variables.modules";
 2 | 
 3 | .pink {
 4 |   color: $pink;
 5 | }
 6 | 
 7 | .green {
 8 |   color: $green;
 9 | }
10 | 
11 | .skills {
12 |   columns: 1;
13 |   @media only screen and (min-width: 940px) {
14 |     columns: 2;
15 |   }
16 | 
17 |   li {
18 |     margin: 0;
19 |     line-height: 1.75;
20 |   }
21 | }


--------------------------------------------------------------------------------
/src/components/about/Terminal.js:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 | import Style from "./Terminal.module.scss";
 3 | import classNames from "classnames";
 4 | import {Box} from "@mui/material";
 5 | 
 6 | const iconClass = "fa fa-circle";
 7 | 
 8 | function Terminal(props) {
 9 |    const {text} = props;
10 | 
11 |    return (
12 |       <Box component={'section'} className={classNames(Style.terminal, Style.shadowed)}
13 |            width={{xs: '80%', md: '50%'}} borderRadius={'0.5rem'} mb={'4rem'}>
14 |          <Box sx={{backgroundColor: '#8c8c8c'}} p={'0.5rem'} borderRadius={'0.5rem 0.5rem 0 0'}
15 |               fontSize={'1rem'}>
16 |             <i className={classNames(iconClass, Style.red)}/>
17 |             <i className={classNames(iconClass, Style.amber)}/>
18 |             <i className={classNames(iconClass, Style.green)}/>
19 |          </Box>
20 |          <Box py={{xs: '1rem', md: '2rem'}} px={{xs: '2rem', md: '3rem'}} borderRadius={'0 0 0.5rem 0.5rem'}
21 |               sx={{backgroundColor: '#27242f'}} fontSize={'1.5rem'} fontFamily={'Courier New, Courier, monospace'}>
22 |             {text}
23 |          </Box>
24 |       </Box>
25 |    );
26 | }
27 | 
28 | export default Terminal;


--------------------------------------------------------------------------------
/src/components/about/Terminal.module.scss:
--------------------------------------------------------------------------------
 1 | @import "../../variables.modules";
 2 | 
 3 | i {
 4 |   padding-left: 0.5rem;
 5 | 
 6 |   &.red {
 7 |     color: $red;
 8 |   }
 9 | 
10 |   &.amber {
11 |     color: $yellow;
12 |   }
13 | 
14 |   &.green {
15 |     color: $green;
16 |   }
17 | }
18 | 
19 | .terminal {
20 |   p, li {
21 |     margin: 1rem 0;
22 |     color: $white;
23 |   }
24 | 
25 |   a, a:visited {
26 |     animation: changeColors 3s infinite;
27 |     font-weight: bold;
28 |   }
29 | }
30 | 
31 | @keyframes changeColors {
32 |   0% {
33 |     color: #00a47f;
34 |   }
35 |   33.3% {
36 |     color: #1d91e3;
37 |   }
38 |   66.6% {
39 |     color: #d419fe;
40 |   }
41 |   100% {
42 |     color: #00a47f;
43 |   }
44 | }


--------------------------------------------------------------------------------
/src/components/home/EmojiBullet.js:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 | import {Box} from "@mui/material";
 3 | 
 4 | function EmojiBullet(props) {
 5 |     const {emoji, text} = props;
 6 | 
 7 |     return (
 8 |         <Box component={'li'} fontSize={'1rem'} lineHeight={1.5} style={{cursor: 'default'}}>
 9 |             <Box component={'span'} aria-label="cheese"
10 |                  role="img"
11 |                  mr={{xs: '0.5rem', md: '1rem'}} fontSize={'1.5rem'}>{emoji}</Box> {text}
12 |         </Box>
13 |     );
14 | }
15 | 
16 | export default EmojiBullet;


--------------------------------------------------------------------------------
/src/components/home/Home.js:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 | import Style from './Home.module.scss';
 3 | import me from '../../img/me.png';
 4 | import classNames from 'classnames';
 5 | import EmojiBullet from "./EmojiBullet";
 6 | import SocialIcon from "./SocialIcon";
 7 | import {Box} from "@mui/material";
 8 | import {info} from "../../info/Info";
 9 | 
10 | export default function Home({innerRef}) {
11 | 
12 |    return (
13 |       <Box ref={innerRef} component={'main'} display={'flex'} flexDirection={{xs: 'column', md: 'row'}} alignItems={'center'}
14 |            justifyContent={'center'} minHeight={'calc(100vh - 175px)'} id={'home'}>
15 |          <Box className={classNames(Style.avatar, Style.shadowed)} alt={'image of developer'} style={{background: info.gradient}} component={'img'} src={me} width={{xs: '37vh', md: '40vh'}}
16 |               height={{xs: '35vh', md: '40vh'}}
17 |               borderRadius={'50%'} p={'0.75rem'} mb={{xs: '1rem', sm: 0}} mr={{xs: 0, md: '2rem'}}/>
18 |          <Box>
19 |             <h1>Hi, I'm <span style={{background: info.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{info.firstName}</span><span className={Style.hand}>🤚</span>
20 |             </h1>
21 |             <h2>I'm {info.position}.</h2>
22 |             <Box component={'ul'} p={'0.8rem'}>
23 |                {info.miniBio.map((bio, index) => (
24 |                   <EmojiBullet key={index} emoji={bio.emoji} text={bio.text}/>
25 |                ))}
26 |             </Box>
27 |             <Box display={'flex'} gap={'1.5rem'} justifyContent={'center'} fontSize={{xs: '2rem', md: '2.5rem'}}>
28 |                {info.socials.map((social, index) => (
29 |                   <SocialIcon key={index} link={social.link} icon={social.icon} label={social.label} />
30 |                ))}
31 |             </Box>
32 |          </Box>
33 |       </Box>
34 |    )
35 | }
36 | 
37 | 
38 | 
39 | 


--------------------------------------------------------------------------------
/src/components/home/Home.module.scss:
--------------------------------------------------------------------------------
 1 | @import "../../variables.modules";
 2 | 
 3 | h1 {
 4 |   font-size: 2rem;
 5 |   text-align: center;
 6 |   @media only screen and (min-width: 940px) {
 7 |     font-size: 3rem;
 8 |     text-align: left;
 9 |   }
10 | }
11 | 
12 | h2 {
13 |   font-size: 1.25rem;
14 |   text-align: center;
15 |   @media only screen and (min-width: 940px) {
16 |     font-size: 2rem;
17 |     text-align: left;
18 |   }
19 | }
20 | 
21 | 
22 | .hand {
23 |   animation-name: wave;
24 |   animation-duration: 2.5s;
25 |   animation-iteration-count: infinite;
26 |   transform-origin: 70% 70%;
27 |   display: inline-block;
28 | }
29 | 
30 | a {
31 |   color: $dark;
32 |   transition: color 200ms ease;
33 | }
34 | 
35 | a:hover {
36 |   color: $lightgray;
37 |   transition: color 200ms ease;
38 | }
39 | 
40 | @keyframes wave {
41 |   0% { transform: rotate( 0.0deg) }
42 |   10% { transform: rotate(14.0deg) }
43 |   20% { transform: rotate(-8.0deg) }
44 |   30% { transform: rotate(14.0deg) }
45 |   40% { transform: rotate(-4.0deg) }
46 |   50% { transform: rotate(10.0deg) }
47 |   60% { transform: rotate( 0.0deg) }
48 |   100% { transform: rotate( 0.0deg) }
49 | }


--------------------------------------------------------------------------------
/src/components/home/SocialIcon.js:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 | 
 3 | function SocialIcon(props) {
 4 |     const {link, icon, label} = props;
 5 |     return (
 6 |         <a target="_blank" aria-label={label}
 7 |            rel="noopener noreferrer" href={link}>
 8 |             <i className={icon} aria-hidden="true"/>
 9 |         </a>
10 |     );
11 | }
12 | 
13 | export default SocialIcon;


--------------------------------------------------------------------------------
/src/components/home/Toggler.js:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 | import {Box} from "@mui/material";
 3 | 
 4 | export default function Toggler({darkMode, handleClick}) {
 5 |     const transition = 'all 250ms ease'
 6 | 
 7 |    return (
 8 |       <Box fontSize={'1.5rem'} sx={{cursor: 'pointer', ":hover": {transform: 'translateY(-3px)', transition: transition}}}>
 9 |          {
10 |             darkMode ?
11 |                <span onClick={handleClick} aria-label="Full Moon" role="img">🌕</span>
12 |                :
13 |                <span onClick={handleClick} aria-label="New Moon" role="img">🌑</span>
14 |          }
15 |       </Box>
16 |    )
17 | }


--------------------------------------------------------------------------------
/src/components/portfolio/IconLink.js:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 | 
 3 | function IconLink(props) {
 4 |    const {link, title, icon} = props;
 5 |    return (
 6 |       <a href={link} target={"_blank"} rel="noopener noreferrer">
 7 |          <i className={icon}/> {title}
 8 |       </a>
 9 |    );
10 | }
11 | 
12 | export default IconLink;


--------------------------------------------------------------------------------
/src/components/portfolio/Portfolio.js:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 | import PortfolioBlock from "./PortfolioBlock";
 3 | import {Box, Grid} from "@mui/material";
 4 | import {info} from "../../info/Info";
 5 | 
 6 | export default function Portfolio({innerRef}) {
 7 |     return (
 8 |         <Box 
 9 |             id={'portfolio'} 
10 |             ref={innerRef}
11 |             sx={{
12 |                 marginTop: { xs: '2rem', md: '4rem' } // Responsive margin top
13 |                 // Alternatively, you could use theme spacing:
14 |                 // marginTop: { xs: 4, md: 8 }
15 |             }}
16 |         >
17 |             <Grid container display={'flex'} justifyContent={'center'} spacing={6}>
18 |                 {info.portfolio.map((project, index) => (
19 |                    <Grid item xs={10} md={3.5} key={index} sx={{ padding: { xs: '10px', md: '0' } }}>
20 |                        <PortfolioBlock image={project.image} live={project.live} source={project.source} title={project.title} />
21 |                    </Grid>
22 |                 ))}
23 |             </Grid>
24 |         </Box>
25 |     );
26 | };


--------------------------------------------------------------------------------
/src/components/portfolio/PortfolioBlock.js:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 | import IconLink from "./IconLink";
 3 | import {Box} from "@mui/material";
 4 | 
 5 | function PortfolioBlock(props) {
 6 |    const {image, live, source, title} = props;
 7 |    return (
 8 |       <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
 9 |          <Box component={'img'} src={image} alt={'mockup'}/>
10 |          <h1 style={{fontSize: '1.5rem'}}>{title}</h1>
11 |          <Box className={'portfolio'} display={'flex'} flexDirection={'column'} gap={'0.5rem'}
12 |               alignItems={'center'} fontSize={'1.5rem'} py={'1rem'}>
13 |             <Box p={0.5} border={'2px solid black'} borderRadius={'15px'}>
14 |                <IconLink link={live} title={'Live Demo'} icon={'fa fa-safari'}/>
15 |             </Box>
16 |             <Box p={0.5} border={'2px solid black'} borderRadius={'15px'}>
17 |                <IconLink link={source} title={'Source Code'} icon={'fa fa-code'}/>
18 |             </Box>
19 |          </Box>
20 |       </Box>
21 |    );
22 | }
23 | 
24 | export default PortfolioBlock;


--------------------------------------------------------------------------------
/src/hooks/useScrollObserver.js:
--------------------------------------------------------------------------------
 1 | import { useEffect } from "react";
 2 | import { useInView } from "react-intersection-observer";
 3 | 
 4 | /**
 5 |  * This hook will take a function, and returns a ref.
 6 |  * ref can be assigned to any JSX element as prop, and
 7 |  * when the element reaches 50% of the viewport, the passed
 8 |  * in function will be called with the element id as parameter.
 9 |  * @param {function} action 
10 |  * @returns {funciton} ref
11 |  */
12 | export default function useScrollObserver(action) {
13 |     const {ref, inView, entry} = useInView({
14 |         rootMargin: '-50% 0% -50% 0%'
15 |     })
16 |     useEffect(() => {
17 |         if (entry && inView) {
18 |             action(entry.target.id);
19 |         }
20 |     }, [entry, action, inView])
21 |     return ref
22 | }


--------------------------------------------------------------------------------
/src/img/mcube.png:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/kingsley805-tech/kingsport/3f11644be9ce8e5d542952b01b51aa2c8e684a72/src/img/mcube.png


--------------------------------------------------------------------------------
/src/img/me.png:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/kingsley805-tech/kingsport/3f11644be9ce8e5d542952b01b51aa2c8e684a72/src/img/me.png


--------------------------------------------------------------------------------
/src/img/mock1.png:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/kingsley805-tech/kingsport/3f11644be9ce8e5d542952b01b51aa2c8e684a72/src/img/mock1.png


--------------------------------------------------------------------------------
/src/img/mock2.png:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/kingsley805-tech/kingsport/3f11644be9ce8e5d542952b01b51aa2c8e684a72/src/img/mock2.png


--------------------------------------------------------------------------------
/src/img/mock3.png:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/kingsley805-tech/kingsport/3f11644be9ce8e5d542952b01b51aa2c8e684a72/src/img/mock3.png


--------------------------------------------------------------------------------
/src/img/mock4.png:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/kingsley805-tech/kingsport/3f11644be9ce8e5d542952b01b51aa2c8e684a72/src/img/mock4.png


--------------------------------------------------------------------------------
/src/img/mock5.png:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/kingsley805-tech/kingsport/3f11644be9ce8e5d542952b01b51aa2c8e684a72/src/img/mock5.png


--------------------------------------------------------------------------------
/src/img/mockup.png:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/kingsley805-tech/kingsport/3f11644be9ce8e5d542952b01b51aa2c8e684a72/src/img/mockup.png


--------------------------------------------------------------------------------
/src/img/mockup1.png:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/kingsley805-tech/kingsport/3f11644be9ce8e5d542952b01b51aa2c8e684a72/src/img/mockup1.png


--------------------------------------------------------------------------------
/src/img/mockup2.png:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/kingsley805-tech/kingsport/3f11644be9ce8e5d542952b01b51aa2c8e684a72/src/img/mockup2.png


--------------------------------------------------------------------------------
/src/img/mockup3.png:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/kingsley805-tech/kingsport/3f11644be9ce8e5d542952b01b51aa2c8e684a72/src/img/mockup3.png


--------------------------------------------------------------------------------
/src/img/mockup4.png:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/kingsley805-tech/kingsport/3f11644be9ce8e5d542952b01b51aa2c8e684a72/src/img/mockup4.png


--------------------------------------------------------------------------------
/src/img/mockup5.png:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/kingsley805-tech/kingsport/3f11644be9ce8e5d542952b01b51aa2c8e684a72/src/img/mockup5.png


--------------------------------------------------------------------------------
/src/img/mockup6.png:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/kingsley805-tech/kingsport/3f11644be9ce8e5d542952b01b51aa2c8e684a72/src/img/mockup6.png


--------------------------------------------------------------------------------
/src/img/pt1.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/kingsley805-tech/kingsport/3f11644be9ce8e5d542952b01b51aa2c8e684a72/src/img/pt1.jpg


--------------------------------------------------------------------------------
/src/img/self.png:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/kingsley805-tech/kingsport/3f11644be9ce8e5d542952b01b51aa2c8e684a72/src/img/self.png


--------------------------------------------------------------------------------
/src/index.js:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 | import ReactDOM from 'react-dom';
 3 | import App from './App';
 4 | 
 5 | ReactDOM.render(
 6 |   <React.StrictMode>
 7 |     <App />
 8 |   </React.StrictMode>,
 9 |   document.getElementById('root')
10 | );
11 | 


--------------------------------------------------------------------------------
/src/info/Info.js:
--------------------------------------------------------------------------------
  1 | 
  2 | 
  3 | import self from "../img/self.png"
  4 | import mock1 from "../img/mockup1.png"
  5 | import mock2 from "../img/mockup2.png"
  6 | import mock3 from "../img/mockup3.png"
  7 | import mock4 from "../img/mockup4.png"
  8 | import mock5 from "../img/mockup5.png"
  9 | import mock6 from "../img/mockup6.png"
 10 | import mock from "../img/mockup.png"
 11 | import mcube from "../img/mcube.png"
 12 | 
 13 | /* Hi there! Thanks for checking out my portfolio template. Be sure to read the comments to get a better understanding of
 14 | how to make this template work best for you! */
 15 | 
 16 | export let colors = ["rgb(0,255,164)", "rgb(166,104,255)"];
 17 | /*
 18 | I highly recommend using a gradient generator like https://gradientgenerator.paytonpierce.dev/ to generate a pair of colors that you like.
 19 | These colors will be used to style your name on the homepage, the background of your picture, and some other accents throughout
 20 | the site.
 21 |  */
 22 | 
 23 | /* 
 24 | This variable will change the layout of the website from multipage to single, scrollable page
 25 | */
 26 | export let singlePage = false;
 27 | 
 28 | /*
 29 | So let's get started! Some of the info below is pretty self-explanatory, like 'firstName' and 'bio'. I'll try to explain anything
 30 | that might not be obvious right off the bat :) I recommend looking at the template example live using "npm start" to get an idea
 31 | of what each of the values mean.
 32 |  */
 33 | 
 34 | export const info = {
 35 |     firstName: "Kingsley",
 36 |     lastName: "Yeboah",
 37 |     initials: "js", // the example uses first and last, but feel free to use three or more if you like.
 38 |     position: "a Full Stack Developer",
 39 |     selfPortrait: self, // don't change this unless you want to name your self-portrait in the "img" folder something else!
 40 |     gradient: `-webkit-linear-gradient(135deg, ${colors})`, // don't change this either
 41 |     baseColor: colors[0],
 42 |     miniBio: [ // these are just some "tidbits" about yourself. You can look at mine https://paytonjewell.github.io/#/ for an example if you'd like
 43 |        
 44 |         {
 45 |             emoji: '🌎',
 46 |             text: 'based in Ghana'
 47 |         },
 48 |        
 49 |         {
 50 |             emoji: "📧",
 51 |             text: "kingsleyyeboah805@gmail.com"
 52 |         }
 53 |     ],
 54 |     socials: [
 55 |         {
 56 |             link: "https://facebook.com",
 57 |             icon: 'fa fa-facebook',
 58 |             label: 'facebook'
 59 |         },
 60 |         {
 61 |             link: "https://instagram.com",
 62 |             icon: 'fa fa-instagram',
 63 |             label: 'instagram'
 64 |         },
 65 |         {
 66 |             link: "https://github.com/kingsley805-tech",
 67 |             icon: "fa fa-github",
 68 |             label: 'github'
 69 |         },
 70 |         {
 71 |             link: "https://www.linkedin.com/in/kingsley-atta-yeboah-a27579246/",
 72 |             icon: "fa fa-linkedin",
 73 |             label: 'linkedin'
 74 |         },
 75 |         {
 76 |             link: "https://twitter.com",
 77 |             icon: "fa fa-twitter",
 78 |             label: 'twitter'
 79 |         }
 80 | // Feel free to remove any of these that you don't have. I'll write an FAQ on how to add new ones later, let me know if you have a request for an icon!
 81 | // Just change the links so that they lead to your social profiles.
 82 | 
 83 |     ],
 84 |     bio: "Hello! I'm Kingsley. I'm a software engineer. I studied CompSci at University of the people, I enjoy long walks on the beach, and I believe artificial intelligence will inevitably rule us all one day. You should hire me!",
 85 |     skills:
 86 |         {
 87 |             proficientWith: ["javascript",
 88 |       "react",
 89 |       "Typescript",
 90 |       "Nextjs",
 91 |       "git",
 92 |       "github",
 93 |       "bootstrap",
 94 |       "html5",
 95 |       "css3",
 96 |       "figma",
 97 |       "tailwindcss",
 98 |       "React-Native","Wordpress","Material-UI",],
 99 |             exposedTo: ["nodejs",
100 |       "Expressjs",
101 |       "Postgresql",
102 |       "Mysql",
103 |       "MongoDB",
104 |       "python",
105 |       "PHP",
106 |       "Laravel",]
107 |         }
108 |     ,
109 |     hobbies: [
110 |         {
111 |             label: 'reading',
112 |             emoji: '📖'
113 |         },
114 |         {
115 |             label: 'theater',
116 |             emoji: '🎭'
117 |         },
118 |         {
119 |             label: 'movies',
120 |             emoji: '🎥'
121 |         },
122 |         {
123 |             label: 'cooking',
124 |             emoji: '🌶'
125 |         }
126 | // Same as above, change the emojis to match / relate to your hobbies or interests.
127 | // You can also remove the emojis if you'd like, I just think they look cute :P
128 |     ],
129 |     portfolio: [ // This is where your portfolio projects will be detailed
130 |         {
131 |             title: "connecthubs Marketting",
132 |             live: "https://coonnecthubsmarket.netlify.app/", //this should be a link to the live version of your project, think github pages, netlify, heroku, etc. Or your own domain, if you have it.
133 |             source: "https://github.com/kingsley805-tech/lisasite-original", // this should be a link to the **repository** of the project, where the code is hosted.
134 |             image: mock1
135 |         },
136 |         {
137 |             title: "Travelling & Tour(Frontend)",
138 |             live: "https://poetic-twilight-5a4f9e.netlify.app/",
139 |             source: "https://github.com/kingsley805-tech/Travelling-Agency",
140 |             image: mock2
141 |         },
142 |         {
143 |             title: "Sleek Company site",
144 |             live: "https://sleeksp.netlify.app/",
145 |             source: "https://github.com/kingsley805-tech/sleek-site",
146 |             image: mock3
147 |         },
148 |         {
149 |             title: "Aifa Services.",
150 |             live: "https://aifaservices.net/",
151 |             source: "https://github.com/kingsley805-tech/AifaServicesnet",
152 |             image: mock4
153 |         },
154 |         {
155 |             title: "Online Banking System",
156 |             live: "https://aussie-investments.com.silverbacktech.solutions/",
157 |             source: "https://github.com/kingsley805-tech/BANK-USERS",
158 |             image: mock6
159 |         },
160 |         {
161 |             title: "Sleek Health System (Currently working on)",
162 |             live: "",
163 |             source: "",
164 |             image: mock5
165 |         },
166 |          {
167 |             title: "Lixbel Studio",
168 |             live: "https://lixbelstudio.vercel.app/",
169 |             source: "https://github.com/kingsley805-tech/LixbeStudio",
170 |             image: mock
171 |         },
172 |          {
173 |             title: "Mcubecollections",
174 |             live: "https://mcubecollections.com/",
175 |             source: "https://github.com/kingsley805-tech/mcubeweb",
176 |             image: mcube
177 |         },
178 |        
179 |     ]
180 | }
181 | 


--------------------------------------------------------------------------------
/src/variables.modules.scss:
--------------------------------------------------------------------------------
 1 | $purple: #8D53FF;
 2 | $pink: #CA6BE6;
 3 | $white: #f8f8f8;
 4 | $dark: #1f1f1f;
 5 | $red: #FF6057;
 6 | $yellow: #FFBD2E;
 7 | $green: #27C93F;
 8 | $lightgray: #c9c9c9;
 9 | 
10 | $transition: all 250ms ease;
11 | 
12 | .shadowed {
13 |   box-shadow: 0 .5rem 1rem rgba(0,0,0,0.4);
14 | }


--------------------------------------------------------------------------------