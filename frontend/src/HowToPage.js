import { Link } from "react-router-dom";

export const HowToPage = () => {
    return <div class="row">
    <div class="col-8 col-s-8">
        <p class="c"> 
            Hey dudes! Welcome to my <em>totally excellent</em> mixtape maker! <br/>
            <br/>
            This generator will start with entering the song name and title of your choice to begin the recommendations.<br/>
            <br/>
            After the intial song, you can choose from the recommendations given to you by checking the checkbox next to the song.<br/>
            These songs will be used to recommend the next songs. There are some things to keep in mind when choosing songs.<br/>
            <br/>
            Songs that are passed through the generator or left behind will not be recommended in the same session<br/>
            <br/>
            You can view the songs on Spotify by clicking on the song name.<br/>
            <br/>
            At the end, the songs will be compiled into a list for you to view the path you have taken!<br/>
            <br/>
            I hope you find some radical beats!<br/>
            <br/>
            <br/>
            <br/>
            Elijah Smith <br/>
            Instagram: @lijah.q <br/>
            GitHub: @elijahquentin <br/>
            LinkedIn: https://www.linkedin.com/in/elijah-smith-lincoln/ <br/>
            <br/>
            AJ Richerson <br/>
            GitHub: @CodeCricut <br/>
            LinkedIn: https://www.linkedin.com/in/aj-richerson/ <br/>
            <br/>
            Connor Kildare <br/>
            GitHub: @ckildare <br/>
            LinkedIn: www.linkedin.com/in/connor-kildare <br/>
            
        </p>
    </div>
   

    <div class="col-2 col-s-2">
        <a href="index.html">
        <div class="button center">
            <Link to="/">
           Go back
            </Link>
        </div>
        </a>
    </div>

    <div class="col-2 col-s-2">
        <img src="img/axel.jpg" alt="Mugshot of Alex Wilson"/>
        <a href="https://open.spotify.com/">
            <img src="img/spotify-logo.png" alt="Spotify Logo"/>
        </a>
    </div>
</div >
};