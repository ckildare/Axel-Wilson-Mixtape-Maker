import { Link } from "react-router-dom";

export const HowToPage = () => {
    return <div class="row">
    <div class="col-8 col-s-8">
        <p> 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent gravida nunc non iaculis sodales. Aliquam sit amet arcu vel lorem condimentum rutrum aliquet at orci. Nullam rhoncus sodales urna quis luctus. In libero ex, luctus non purus at, feugiat facilisis velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis consectetur pharetra scelerisque. Fusce sit amet condimentum augue, a ornare urna. Sed nec consequat augue. Nam nisi ligula, rutrum in rutrum non, consequat eget augue. Aenean at ex sit amet leo rhoncus tincidunt.
             Aenean feugiat in urna et sodales. Donec id scelerisque nunc. Donec feugiat felis at risus venenatis, a gravida elit laoreet. Maecenas sodales lacus ut tincidunt laoreet. Integer sagittis tempus tempor. Aliquam dignissim nunc aliquam sapien blandit, id blandit felis egestas. Maecenas porttitor pulvinar massa vitae vehicula. Quisque hendrerit faucibus commodo. Sed nec finibus metus. Pellentesque gravida lectus pellentesque augue ultrices aliquet.
            Proin nisl est, gravida in mauris eu, bibendum tincidunt massa. Phasellus vel efficitur nisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin bibendum sapien id ante vehicula consequat. Donec elementum odio at felis venenatis, nec luctus lorem sollicitudin. Cras mollis fringilla tellus ut egestas. Sed ultricies dignissim arcu quis ultrices. Suspendisse potenti. Donec lobortis magna nec mauris vehicula, vitae consectetur quam tempus. Fusce lorem mauris, porttitor id lectus vel, luctus mattis sem. Cras vel dignissim tortor, sit amet viverra enim. Aliquam et arcu eget dui maximus elementum.
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