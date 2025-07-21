

import self from "../img/self.png"
import mock1 from "../img/mockup1.png"
import mock2 from "../img/mockup2.png"
import mock3 from "../img/mockup3.png"
import mock4 from "../img/mockup4.png"
import mock5 from "../img/mockup5.png"
import mock6 from "../img/mockup6.png"
import mock from "../img/mockup.png"
import mcube from "../img/mcube.png"

/* Hi there! Thanks for checking out my portfolio template. Be sure to read the comments to get a better understanding of
how to make this template work best for you! */

export let colors = ["rgb(0,255,164)", "rgb(166,104,255)"];
/*
I highly recommend using a gradient generator like https://gradientgenerator.paytonpierce.dev/ to generate a pair of colors that you like.
These colors will be used to style your name on the homepage, the background of your picture, and some other accents throughout
the site.
 */

/* 
This variable will change the layout of the website from multipage to single, scrollable page
*/
export let singlePage = false;

/*
So let's get started! Some of the info below is pretty self-explanatory, like 'firstName' and 'bio'. I'll try to explain anything
that might not be obvious right off the bat :) I recommend looking at the template example live using "npm start" to get an idea
of what each of the values mean.
 */

export const info = {
    firstName: "Kingsley",
    lastName: "Yeboah",
    initials: "js", // the example uses first and last, but feel free to use three or more if you like.
    position: "a Full Stack Developer",
    selfPortrait: self, // don't change this unless you want to name your self-portrait in the "img" folder something else!
    gradient: `-webkit-linear-gradient(135deg, ${colors})`, // don't change this either
    baseColor: colors[0],
    miniBio: [ // these are just some "tidbits" about yourself. You can look at mine https://paytonjewell.github.io/#/ for an example if you'd like
       
        {
            emoji: '🌎',
            text: 'based in Ghana'
        },
       
        {
            emoji: "📧",
            text: "kingsleyyeboah805@gmail.com"
        }
    ],
    socials: [
        {
            link: "https://facebook.com",
            icon: 'fa fa-facebook',
            label: 'facebook'
        },
        {
            link: "https://instagram.com",
            icon: 'fa fa-instagram',
            label: 'instagram'
        },
        {
            link: "https://github.com/kingsley805-tech",
            icon: "fa fa-github",
            label: 'github'
        },
        {
            link: "https://www.linkedin.com/in/kingsley-atta-yeboah-a27579246/",
            icon: "fa fa-linkedin",
            label: 'linkedin'
        },
        {
            link: "https://twitter.com",
            icon: "fa fa-twitter",
            label: 'twitter'
        }
// Feel free to remove any of these that you don't have. I'll write an FAQ on how to add new ones later, let me know if you have a request for an icon!
// Just change the links so that they lead to your social profiles.

    ],
    bio: "Hello! I'm Kingsley. I'm a software engineer. I studied CompSci at University of the people, I enjoy long walks on the beach, and I believe artificial intelligence will inevitably rule us all one day. You should hire me!",
    skills:
        {
            proficientWith: ["javascript",
      "react",
      "Typescript",
      "Nextjs",
      "git",
      "github",
      "bootstrap",
      "html5",
      "css3",
      "figma",
      "tailwindcss",
      "React-Native","Wordpress","Material-UI",],
            exposedTo: ["nodejs",
      "Expressjs",
      "Postgresql",
      "Mysql",
      "MongoDB",
      "python",
      "PHP",
      "Laravel",]
        }
    ,
    hobbies: [
        {
            label: 'reading',
            emoji: '📖'
        },
        {
            label: 'theater',
            emoji: '🎭'
        },
        {
            label: 'movies',
            emoji: '🎥'
        },
        {
            label: 'cooking',
            emoji: '🌶'
        }
// Same as above, change the emojis to match / relate to your hobbies or interests.
// You can also remove the emojis if you'd like, I just think they look cute :P
    ],
    portfolio: [ // This is where your portfolio projects will be detailed
        {
            title: "connecthubs Marketting",
            live: "https://coonnecthubsmarket.netlify.app/", //this should be a link to the live version of your project, think github pages, netlify, heroku, etc. Or your own domain, if you have it.
            source: "https://github.com/kingsley805-tech/lisasite-original", // this should be a link to the **repository** of the project, where the code is hosted.
            image: mock1
        },
        {
            title: "Travelling & Tour(Frontend)",
            live: "https://poetic-twilight-5a4f9e.netlify.app/",
            source: "https://github.com/kingsley805-tech/Travelling-Agency",
            image: mock2
        },
        {
            title: "Sleek Company site",
            live: "https://sleeksp.netlify.app/",
            source: "https://github.com/kingsley805-tech/sleek-site",
            image: mock3
        },
        {
            title: "Aifa Services.",
            live: "https://aifaservices.net/",
            source: "https://github.com/kingsley805-tech/AifaServicesnet",
            image: mock4
        },
        {
            title: "Online Banking System",
            live: "https://aussie-investments.com.silverbacktech.solutions/",
            source: "https://github.com/kingsley805-tech/BANK-USERS",
            image: mock6
        },
        {
            title: "Sleek Health System (Currently working on)",
            live: "",
            source: "",
            image: mock5
        },
         {
            title: "Lixbel Studio",
            live: "https://lixbe-studio-5oyd.vercel.app/",
            source: "https://github.com/kingsley805-tech/LixbeStudio",
            image: mock
        },
         {
            title: "Mcubecollections",
            live: "https://mcubecollections.com/",
            source: "https://github.com/kingsley805-tech/mcubeweb",
            image: mcube
        },
       
    ]
}
