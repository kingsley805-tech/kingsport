import React from 'react';
import Style from './Home.module.scss';
import me from '../../img/me.png';
import classNames from 'classnames';
import EmojiBullet from "./EmojiBullet";
import SocialIcon from "./SocialIcon";
import { Box } from "@mui/material";
import { info, singlePage } from "../../info/Info";
import { HashLink } from 'react-router-hash-link';
import { Link as RouterLink } from 'react-router-dom';

export default function Home({ innerRef }) {

   return (
      <Box
         ref={innerRef}
         component={'main'}
         id={'home'}
         className={Style.hero}
      >
         <Box className={Style.heroInner}>
            <Box className={Style.heroText}>
               <p className={Style.eyebrow}>Portfolio · {info.position}</p>
               <h1 className={Style.title}>
                  Hi, I'm{" "}
                  <span className={Style.gradientText}>
                     {info.firstName}
                  </span>
                  <span className={Style.hand}>🤚</span>
               </h1>
               <h2 className={Style.subtitle}>
                  I build clean, modern digital experiences that feel fast and intuitive.
               </h2>

               <Box component={'ul'} className={Style.bullets}>
                  {info.miniBio.map((bio, index) => (
                     <EmojiBullet key={index} emoji={bio.emoji} text={bio.text} />
                  ))}
               </Box>

               {singlePage ? (
                  <Box className={Style.actions}>
                     <HashLink
                        to="#portfolio"
                        smooth
                        className={classNames(Style.button, Style.buttonPrimary)}
                     >
                        View my works
                     </HashLink>
                     <HashLink
                        to="#about"
                        smooth
                        className={classNames(Style.button, Style.buttonGhost)}
                     >
                        View more
                     </HashLink>
                  </Box>
               ) : (
                  <Box className={Style.actions}>
                     <RouterLink
                        to="/portfolio"
                        className={classNames(Style.button, Style.buttonPrimary)}
                     >
                        View my works
                     </RouterLink>
                     <RouterLink
                        to="/about"
                        className={classNames(Style.button, Style.buttonGhost)}
                     >
                        View more
                     </RouterLink>
                  </Box>
               )}

               <Box className={Style.socials}>
                  {info.socials.map((social, index) => (
                     <SocialIcon key={index} link={social.link} icon={social.icon} label={social.label} />
                  ))}
               </Box>
            </Box>

            <Box className={Style.heroVisual}>
               <Box
                  className={classNames(Style.avatar, Style.shadowed)}
                  component={'img'}
                  src={me}
                  alt={'Portrait of the developer'}
               />
               <Box className={Style.floatingCard}>
                  <p className={Style.floatingLabel}>Currently available</p>
                  <p className={Style.floatingText}>Open to frontend & full‑stack opportunities.</p>
               </Box>
            </Box>
         </Box>
      </Box>
   )
}
