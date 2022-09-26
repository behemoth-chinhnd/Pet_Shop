var iconToggle = document.querySelector('.menu-toggle');
var toggle_left = document.querySelector('.menu-left-toggle');

var iconMenu = document.querySelector('#menu-icon');

var menuLeft = document.querySelector('#menu-left');
var mainBody = document.querySelector('#main-body');


iconToggle.onclick = function () {
    iconMenu.classList.toggle('active');
    toggle_left.classList.remove('active');
    toggle_left.classList.add('start');


    var menuleftActive = document.querySelector('#menu-left.active');
    if(menuleftActive){
        menuleft.classList.remove('active');
        menuleft.style.display = "none"
        mainBody.classList.add('active');



    }
}

toggle_left.onclick = function () {
    iconMenu.classList.add('active');

        

    var menuLeft = document.querySelector('#menu-left');
    var menuLeftActive = document.querySelector('#menu-left.active');
    var toggleLeftStart = document.querySelector('.menu-left-toggle.start');


    if (window.innerWidth > 1200) {
        var menuLeftActive = document.querySelector('#menu-left.active');
        var toggleLeftStart = document.querySelector('.menu-left-toggle.start');
        var mainBodyActive = document.querySelector('#main-body.active');

        if(menuLeftActive){
            toggle_left.classList.add('start');
            menuLeft.style.display = "none"
            menuLeft.classList.remove('active');
            mainBody.classList.add('active');
            toggle_left.classList.remove('active');
        }else if(toggleLeftStart && mainBodyActive ){
        toggle_left.classList.add('active');
        menuLeft.style.display = "block"
        menuLeft.classList.add('active');
        mainBody.classList.remove('active');
        }else{
            toggle_left.classList.add('start');
            menuLeft.style.display = "none";
            mainBody.classList.add('active');
        }
    }else{
        if(menuLeftActive){
        toggle_left.classList.remove('active');
        menuLeft.style.display = "none"
        menuLeft.classList.remove('active');
        mainBody.classList.add('active');
        }else{
            toggle_left.classList.add('start');
            toggle_left.classList.add('active');
            menuLeft.classList.add('active');
            menuLeft.style.display = "block"
            mainBody.classList.remove('active');
        }
    } 
}

function activeMenu() {
let links = document.querySelector('#menu-icon');
if (window.innerWidth > 768) {
       links.classList.remove("active");
} 
}

// function activeMenuLeft() {
//     let linksleft = document.querySelector('#menu-left');
//     let linkstoggleleft = document.querySelector('.menu-left-toggle');
//     if (window.innerWidth > 1200) {
  
//         linksleft.classList.remove("active");
//         linkstoggleleft.classList.remove("active");
//         // linkstoggleleft.style.display = "none";


  
   
//     } 
// }


function startMenuLeft() {
let startMenuLeft = document.querySelector('.menu-left-toggle');
var mainBodyActive = document.querySelector('#main-body.active');

if (window.innerWidth < 1200) {
    startMenuLeft.classList.add("start"); 
}else if(mainBodyActive){
    startMenuLeft.classList.add("start"); 

}else{
    startMenuLeft.classList.remove("start"); 

}
}

// setInterval(activeMenuLeft, 500);
// setInterval(activeMenu, 500);

setInterval(startMenuLeft, 500);