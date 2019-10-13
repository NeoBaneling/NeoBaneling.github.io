let heading = document.querySelector('h1');
heading.style.background = '#7820A8';

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function topNavFunction() {
    var x = document.getElementById("homeTopNav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}