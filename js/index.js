
      
VanillaTilt.init(document.querySelectorAll('.header__niche'), {

    // reverse:                false,  // reverse the tilt direction
    max:                    14,     // max tilt rotation (degrees)
    // startX:                 0,      // the starting tilt on the X axis, in degrees.
    // startY:                 0,      // the starting tilt on the Y axis, in degrees.
    perspective:            1500,   // Transform perspective, the lower the more extreme the tilt gets.
    scale:                  1.06,      // 2 = 200%, 1.5 = 150%, etc..
    speed:                  500,    // Speed of the enter/exit transition
    //transition:             true,   // Set a transition on enter/exit.
    // axis:                   null,   // What axis should be disabled. Can be X or Y.
    // reset:                  true,    // If the tilt effect has to be reset on exit.
    easing:                 "cubic-bezier(.28,1.02,.71,.94)",    // Easing on enter/exit.
    glare:                  true,   // if it should have a "glare" effect
    'max-glare':            .4
});

// document.querySelector('.container').style.height = document.querySelector('.container').getBoundingClientRect.height + window.innerHeight

