gsap.registerPlugin(ScrollTrigger);



///////////////LANDING 

const width = window.innerWidth,
      height = window.innerHeight;
const numOfBoxes = 320;
const side = Math.sqrt(width * height / numOfBoxes);
const landing = document.querySelector('.landing');
console.log(side)

for (let i = 0; i < numOfBoxes; i++) {
    box = document.createElement('div');
    box.className = 'landing__stripe';
    // landing.appendChild(box);
    box.style.backgroundColor = 'black';
    // box.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`;
    // box.style.height = box.style.width = `${side}px`;
}

isUp = false;
gsap.to('.landing__minus', {
    // yPercent: () => {
    //     isUp = !isUp;
    //     return isUp? -100: 100;
    // },
    duration: 1,
    repeat: -1,
    yoyo: true,
    x: 100,
    ease: 'back.inOut'
    // opacity: /0,
    // backgroundColor: () => `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 10)},${Math.floor(Math.random() * 255)})`,
    // rotateY: 90,
    // scaleY: .8,
    // delay: 1,
    // stagger: {
    //     amount: 1,
    //     from: 'random',
    //     // grid: 'auto',
    //     // ease: "out",
    //     // direction: 'random'  
    // },
    // onComplete: () => landing.parentElement.removeChild(landing)
})



/////////////////////HEADER

const header = document.querySelector('.header');

gsap.to(['.header__heading-span--upper', '.header__subheading', '.header__field-button'], {
    scrollTrigger: {
        trigger: '.header',
        start: 'center 45%',
        // end: 'center 40%',
        toggleActions: 'play none none reverse'
    },
    duration: .2,
    stagger: .06,
    opacity: 0
});

gsap.to('.header__heading-span--bottom', {
    scrollTrigger: {
        trigger: '.header',
        start: 'center 45%',
        // pin: true,
        // end: 'center 40%',
        toggleActions: 'play none none reverse',
        onUpdate: () => {
            console.log(header.getBoundingClientRect().top, header.getBoundingClientRect().bottom)
        }
    },
    // y: (i, target) => window.scrollY,
    duration: .3,
    // stagger: .06,
    // opacity: 0
});


// const timeline = gsap.timeline({
//     delay: 2
// })
// .from('.landing__p-sapn', {
//     stagger: .1,
//     opacity: 0,
//     duration: 2
// })
// .to();



console.log(gsap)
const loadTimeline = gsap.timeline({
    delay: 1.15,
    onComplete: () => {
        sliderTimeline.play();
    }
})
.from('.landing__span', {
    opacity: 0,
    stagger: .37,
    duration: 3,
    ease: Power1.easeIn
})
.to('.polish', {
    yPercent: -150,
    ease: Power2.easeOut,
    duration: 1.85
}, '> -.15')
.to('.polish', {
    borderWidth: 0,
    duration: .5
}, '> -.3')
.set('.landing', {
    // display: 'none'
}, '<-.6')
.set('.container', {
    display: 'block'
}, '<')
.addLabel('siteIsOn');

loadTimeline.seek('siteIsOn');
// .from('.navbar__link', {
//     x: 10,
//     opacity: 0,
//     duration: 1,
//     stagger: .1
// })
// .from('.header__subheading', {
//     y: 10,
//     opacity: 0,
//     duration: 1
// }, '< .4')
// .from('.header__slider', {
//     y: 10,
//     opacity: 0,
//     duration: 1
// }, '< .2');

const sliderTimeline = gsap.timeline({
    paused: true,
    repeat: -1,
    // onComplete: () => {
    //     console.log('COMPLETED SLIDER TIMELINE');
    //     setTimeout(() => sliderTimeline.play(), 2000);
    // }
})

// sliderTimeline
// .set('.header__slider', {
//     backgroundColor: 'purple',
//     duration: 1
// })
// .to('.header__slider', {
//     backgroundColor: 'red',
//     duration: 1
// }, '> 2')
// .to('.header__slider', {
//     backgroundColor: 'cyan',
//     duration: 1,
    
// }, '> 2')

// const scrollTimeline = gsap.timeline({
//     scrollTrigger: {
//         scrub: .3,
//         trigger: '.header',
//         pin: true,
//         start: 0,
//         end: 'bottom top-=500px',
//       },
// })
// .to('.header__bg-component', {
//     x: -80,
//     opacity: 0,
//     stagger: .08,
//     ease: 'elastic.in(1.4, 1)'
// })
// .to('.header__heading', {
//     y: -60,
//     opacity: 0
// }, '<.5')
// .to('.header__subheading', {
//     y: -60,
//     opacity: 0
// }, '< .07');



// const headerTimeline = gsap.timeline({
//     delay: 1
// })
// .from('.header__heading-part', {
//     // x: -5,
//     // y: 5,
//     // scaleY: .55,
//     // opacity: 0,
//     duration: .65,
//     stagger: .03,
//     // ease: 'elastic.out(, 1)'
// })
// .from('.header__heading-part', {
//     // x: -5,
//     opacity: 0,
//     duration: 5,
//     stagger: .0455,
//     // ease: 'elastic.out(, 1)'
// }, '< .35')
// .from('.header__subheading', {
//     x: 20,
//     opacity: 0,
//     duration: 1 ,
//     ease: Power1.easeOut
// }, '< .45')
// .set('.header__subheading', {
//     scaleY: 1.1,
//     skewX: -5
// }, '<')
// .from('.menu__toggle-minus', {
//     opacity: 0,
//     y: 100,
//     duration: .2,
//     ease: Elastic.easeOut.config(1, 1),
//     stagger: .1,
//     // scale: .9
// }, '< .15')
// .from('.header__pointer > svg', {
//     opacity: 0,
//     duration: 1
// }, '< 2')
// .from('.header__pointer > svg', {
//     repeat: -1,
//     y: -20,
//     duration: 4,
//     ease: Bounce.easeOut
// }, '<')

document.querySelector('.menu__toggle').addEventListener('change', ({target: { checked }}) => {
    if(checked) {
        console.log('CHECKED')
        gsap.timeline({})
        .to('.menu', {
            opacity: 1,
            visibility: 'visible',
            duration: .4
        })
        .from('.menu__item', {
            y: 10,
            scale: .97,
            opacity: 0,
            duration: .3,
            stagger: .06,
            // ease: Power2.easeOut
        }, '<.2')
    }
    else {
        console.log('UNCHECKED')
        gsap.timeline({})
        .to('.menu', {
            opacity: 0,
            visibility: 'hidden',
            duration: .1
        })
        //.from('.menu__item', {
        //     y: 20,
        //     duration: .4,
        //     stagger: .1
        // })
    }
})

// ScrollTrigger.crea
// document.querySelector('.menu__item').addEventListener('mouseover', e => {
//     gsap.to(e.target, {
//         textFillColor: '#FFFFFF',
//         duration: .3
//     })
// });

// document.querySelector('.menu__item').addEventListener('mouseout', e => {
//     gsap.to(e.target, {
//         textFillColor: '#000',
//         duration: .14
//     })
// })


// gsap.timeline({
//     scrollTrigger: {
//         trigger: '.fields__container',
//         start: '10% 50%',
//         end: '70% 50%',
//         scrub: 1,
//         pin: true
//     }
// })
// .from('.fields__img-container', {
//     x: -100,
//     duration: .3,
    
// })
// .from('.fields__desc', {
//     y: 50,
//     duration: .3,
    
// })
// .fromTo('.fields__title', {
//     xPercent: 100,
    
// }, { 
//     xPercent: -100,

// })

// gsap.from('.fields__title', {
//     scrollTrigger: {
//         trigger: '.fields__container',
//         start: 'top 20%',
//         end: '90% 10%',
//         scrub: 2,
//         pin: true
//     },
//     xPercent: 100
// }, {
//     xPercent: -100
// })

// gsap.from('.fields__')

// gsap.to('.fields__title-container', {
//     scrollTrigger: {
//         trigger: '.fields',
//         pin: true,
//         start: 'top top',
//         end: 'bottom bottom',
//         // pinSpacing: false
//     }
// });




// var fieldBefore = CSSRulePlugin.getRule('.fields__field:before');
// gsap.utils.toArray('.fields__field')
// const tl = gsap.timeline({
// 	scrollTrigger: {
// 		trigger: ".fields__content",
// 		start: "top center",
// 		end: "bottom top",
//         scrub: true,
//         pin: true
// 	}
// });

// gsap.utils.toArray(".parallax").forEach(layer => {
// 	const depth = layer.dataset.depth;
// 	const movement = -(layer.offsetHeight * depth )
// 	tl.to(layer, {y: movement, ease: "none"}, 0)
// });




// gsap.from('.fields__bg', {
//     yPercent: 110,
//     opacity: 0,
//     // x: -200,
//     scrollTrigger: {
//         trigger: '.fields__field',
//         start: 'top top',
//         end: 'bottom bottom',
//         pin: true,
//         scrub: .1
//     }

// });

// gsap.from('.fields__content', {
//     yPercent: 10,
//     // x: -200,
//     scrollTrigger: {
//         trigger: '.fields__field',
//         start: 'center center',
//         end: 'bottom bottom',
//         pin: true,
//         // scrub: .3
//     }

// });

// gsap.timeline({
//     scrollTrigger: {
//         trigger: '.fields__field',
//         start: 'center 60%'
//     }
// })
// .from('.fields__img-container', {
//     scaleY: 0,
//     // opacity: 0,
//     duration: .5,
//     ease: Power2.easeOut
// })
// .from('.fields__desc', {
//     y: 140,
//     opacity: 0,
//     rotateY: 10,
//     duration: 1,
//     ease: Power2.easeOut
// }, '<.1')
// // .to('.fields__img-cover', {
// //     backgroundPosition: '100%',
// //     duration: .5,
// //     ease: Power2.easeIn
// // }, '<1.5')
// .from('.fields__img', {
//     opacity: 0,
//     duration: .5,
//     ease: Power2.easeIn
// }, '<.1');

// gsap.to('.fields__img-cover', {
//     backgroundPosition: 'right',
//     scrollTrigger: {
//         trigger: '.fields__field',
//         start: 'top 20%',
//         end: 'bottom 20%',
//         // pin: true,
//         scrub: .3
//     }

// });





//////SCROLLTRIGGER AWAY FROM HEADER


// gsap.timeline({
//     scrollTrigger: {
//         trigger: '.header',
//         start: 'center 45%',
//         end: 'bottom center',
//         scrub: 1,
//         toggleActions: 'play reverse none none'
//     }
// })
// .to('.header__heading-span-text', {
//     // y: -110,
//     opacity: 0,
//     stagger: .05,
//     duration: .25
// })
// .to('.header__subheading', {
//     // y: -110,
//     opacity: 0,
//     duration: .25
// }, '< ')
// .to('.header__field-buttons', {
//     // y: -110,
//     opacity: 0,
//     duration: .25
// }, '< ');





//////////////////////FIELDS


gsap.timeline({
    scrollTrigger: {
        trigger: '.fields__content',
        start: 'top 40%',
        // toggleActions: 'play none reverse play'
    }
})
.from('.fields__img-container', {
    xPercent: i => i? 20: -20,
    duration: .5,
    ease: 'power1.out'    
})
.to('.fields__img-cover', {
    scaleX: i => i? 0: 0,
    duration: .3,
    ease: 'power1.out'    
}, '<.2')
.from('.fields__desc', {
    y: 20,
    opacity: 0,
    duration: 1.4
}, '< .1')

// gsap.utils.toArray('.fields__img-container').forEach((container, i) => {
//     console.log(container, i)
//     gsap.timeline({
//         scrollTrigger: {
//             trigger: `.fields__field--${i+1}`,
//             scrub: 1,
//             start: 'top bottom',
//             end: 'bottom top',
//             // toggleActions: 'play none reverse none',
//             markers: true,
//             onUpdate: (x, y, z) => {
//             }
//         }
//     })
//     .fromTo(`.fields__img-container--${i+1}`, {
//         rotationX: -15,
//         rotationY: -10,
//         yPercent: 10,
//         opacity: 0
//     })
//     .addLabel('start')

//     // .set(`.fields__img-container--${i+1}`, {
//     //     rotationX: -15,
//     //     rotationY: -10,
//     //     // y: 100,
//     //     yPercent: 25,
//     //     opacity: 0
//     // })
//     // .fromTo(`.fields__img-container--${i+1}`, {
//     //     rotationX: -15,
//     //     rotationY: -10,
//     //     // y: 100,
//     //     yPercent: 10,
//     //     opacity: 0
//     // }, {
//     //     rotationX: 15,
//     //     rotationY: 10,
//     //     // y: 100,
//     //     yPercent: -10,
//     //     opacity: 1
//     // }, '>')
//     // .from(`.fields__img-container--${i+1}`, {
//     //     yPercent: 10,
//     //     rotationX: -15,
//     //     rotationY: -10,
//     //     // y: -100,
//     //     opacity: 0
//     // })
//     // .to(`.fields__img-container--${i+1}`, {
//     //     yPercent: -10,
//     //     rotationX: 15,
//     //     rotationY: 10,
//     //     // y: -100,
//     //     opacity: 1
//     // }, '> -.1')
//     .from(`.fields__desc--${i+1}`, {
//         opacity: 0,
//         // y: 100
//     }, 'start')
//     .to(`.fields__desc--${i+1}`, {
//         opacity: 1,
//         // y: -100
//     }, '>')
//     .to(`.fields__field`, {
//         // y: -500
//     }, 'start');    
// })

// gsap.to('.fields__container', {
//     scrollTrigger: {
//         trigger: `.fields`,
//             scrub: 2,
//             start: 'top center',
//             end: 'bottom center',
//             // toggleActions: 'play none reverse none',
//             markers: true,
        
//     },
//     y: -400
// })



// const imgTilt = {
//     x: 0,
//     y: 0
// }

// document.querySelectorAll('.fields__img-container').forEach(container => {
//     container.addEventListener('mouseover', e => {
//         console.log("🚀 ~ file: gsap.js ~ line 436 ~ container.addEventListener ~ 'hovered'", container)
        
//         imgTilt.x = container.style.rotateX;
//         imgTilt.y = container.style.rotateY;
//         gsap.to(container, {
//             rotationX: 0,
//             rotationY: 0
//         })
//     });
//     container.addEventListener('mouseleave', e => {
//         console.log("🚀 ~ file: gsap.js ~ line 436 ~ container.addEventListener ~ 'hovered'", 'hovered')
        
//         gsap.to(container, {
//             rotationX: imgTilt.x,
//             rotationY: imgTilt.y
//         })
//     });
// });





///////////////////////////////ARTICLES



// gsap.from('.articles__grid-item', {
//     scrollTrigger: {
//         trigger: '.articles__container',
//         start: 'top top'
//     },
//     y: 20,
//     opacity: 0,
//     stagger: .03,
//     duration: 1
// })

ScrollTrigger.batch('.articles__grid-item', {
    onEnter: batch => gsap.to(batch, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: .1,
        immediateRender: true
    }),
    toggleActions: 'play none reverse play',
    start: 'top 70%'
});





/////////////////////SET CANVAS BELOW ALL ELSE WHEN SCROLLING PAST HEADER

gsap.to('.canvas', {
    scrollTrigger: {
        trigger: '.header',
        start: 'bottom top',
        onUpdate: () => {
            console.log('set canvas to hidden')
        }
    },
    visibility: 'hidden',
    opacity: 0
})