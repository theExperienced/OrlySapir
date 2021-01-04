

let scene, camera, renderer;
let planeGeometry, planeMaterial, plane;
let cubeGeometry, cubeMaterial, cube;
let frame;



let planeSize = 2200;
let pointLight;

// let snake, snakeGeo, snakeCube, snakePositions = [[0,0,0]]; 

// let satellite, satelight, satellites, satelights, satellitesFactor;
let planeGeo;
let radius;
let phi = 0, theta = 0;
let xOffset = 0; yOffset = 0;


let mass;
let outerGlobeGeo, outerGlobe;
const noise3d = new perlinNoise3d();
let sphereGeo;
let sphereLight;
let spot, directionalLight;
let globe;
let globePosition;
let satellitesNum, satellites, satelights, satellitesFactor;

let sphereVerticesNum;
let firmamentRadius = 130;
let world;
let ringRadius;
let particles;
let ringGeo;
let ringComplex2, ringComplex3, ringComplex4;
let ringComplexes;
let cameraChanged = true;
let afterLoad = false;



const init = function () {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 10000 );
    // camera.position.set(-30, 3, 30);
    // camera.lookAt(0, 0, 100);

    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    document.querySelector('.canvas').appendChild(renderer.domElement);

    scene.background = new THREE.Color('rgb(33, 30, 30)');
    scene.fog = new THREE.Fog(0x211e1e, firmamentRadius * .15, firmamentRadius * .65); // firmamentRadius * 5, firmamentRadius * 10);
    // scene.fog = new THREE.FogExp2(0x870316, .0262);





    ////////////////////////////////////DANIEL MIZRACHI TITLE

    // const loader = new THREE.FontLoader();
    //     loader.load( 'fonts/helvetiker_bold.typeface.json', function ( font ) {

            // const textGeo = new THREE.TextBufferGeometry( "Daniel", {

            //     // font: font,

            //     size: 200,
            //     height: 50,
            //     curveSegments: 12,

            //     bevelThickness: 2,
            //     bevelSize: 5,
            //     bevelEnabled: true

            // } );

            // textGeo.computeBoundingBox();
            // const centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

            // const textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );

            // const mesh = new THREE.Mesh( textGeo, textMaterial );
            // // mesh.position.x = centerOffset;
            // // mesh.position.y = FLOOR + 67;

            // mesh.castShadow = true;
            // mesh.receiveShadow = true;

            // scene.add( mesh );

        // } );

















    ///////////////////////////////////ROTATING GLOBE




    world = new THREE.Object3D();
    
    world.rotation.order = "YXZ";
    world.rotation.y += Math.PI / 3.5;
    scene.add(world);

    const firmamentGeo = new THREE.SphereBufferGeometry(firmamentRadius, 32, 32);
    // firmamentGeo.thetaStart = 3;
    const firmamentMat = new THREE.MeshPhongMaterial( {color: 0x5d0f46, 
    side: THREE.DoubleSide} );
    const firmament = new THREE.Mesh( firmamentGeo, firmamentMat );
    firmament.receiveShadow = true;
    // world.add( firmament );


    


    
    planeSide = firmamentRadius * 15;
    planeGeo = new THREE.PlaneGeometry(planeSide, planeSide, 60, 85);
    planeMat = new THREE.MeshBasicMaterial({
        color: 0x01010b,  
        // metalness: .9,
        // emissive: 0x000,
    //    opacity: .1,
    //    blending: THREE.NoBlending,
        side: THREE.DoubleSide,
    //    transparent: false,
    //    depthTest: false,
            // wireframe: true, 
      });
    plane = new THREE.Mesh(planeGeo, planeMat);
    // world.add(plane);
    plane.rotation.x = Math.PI / 2;
    plane.position.set(0, -5, 0);
    plane.receiveShadow = true;
    
    plane2 = new THREE.Mesh(planeGeo, planeMat);
    // world.add(plane2);
    // plane2.rotation.x = Math.PI / 2;
    plane2.position.set(0, 0, 0);
    plane2.receiveShadow = true;




    /////PEDESTAL + RING

    ringComplex = new THREE.Object3D();
    ringComplex2 = new THREE.Object3D();
    ringComplex3 = new THREE.Object3D();
    ringComplex4 = new THREE.Object3D();
    ringComplexes = [ringComplex, ringComplex2, ringComplex3, ringComplex4];
    world.add(ringComplex);
    world.add(ringComplex2);
    world.add(ringComplex3);
    world.add(ringComplex4);
    ringComplex3.rotation.z = Math.PI;
    ringComplex4.rotation.z = Math.PI;
    ringComplex.position.set(0, 0, firmamentRadius* .4);
    ringComplex2.position.set(111,111,111);
    ringComplex3.position.set(111,111,111);
    ringComplex4.position.set(111,111,111);

    


    
    ringRadius = 8;
    ringGeo = new THREE.TorusGeometry(ringRadius, 3.35, 50 ,50, 0);
    ringGeo.dynamic = true;
    ringMat = new THREE.MeshPhongMaterial({
        color: 0x050403,  
        flatShading: true,
    //    opacity: .1,
    //    blending: THREE.NoBlending,
        roughness: .1,
        metalness: .9,
        side: THREE.FrontSide,
    //    transparent: false,
    //    depthTest: false,
            // wireframe: true, 
    });
    console.log(ringGeo.parameters)
    ring = new THREE.Mesh(ringGeo, new THREE.MeshPhongMaterial({
        color: 0x050403,  
        // flatShading: true,
    //    opacity: .1,
    //    blending: THREE.NoBlending,
        roughness: .1,
        metalness: .9,
        side: THREE.FrontSide,
    //    transparent: false,
    //    depthTest: false,
            wireframe: true, 
    }));
    ringComplex.add(ring);
    // ring.position.set(0,0,0)
    ringComplex2.add( new THREE.Mesh(new THREE.OctahedronBufferGeometry(ringRadius, 0), ringMat));
    ringComplex3.add( new THREE.Mesh(new THREE.OctahedronBufferGeometry(ringRadius, 1), ringMat));
    ringComplex4.add( new THREE.Mesh(new THREE.OctahedronBufferGeometry(ringRadius, 2), ringMat));
    // ring.position.set(0, 0, 0);
    // ring.rotation.x = .5;
    // ring.rotation.x = .4731;
    ring.receiveShadow = true;
    ring.castShadow = true;




    pedestalHeight = 1.5;
    pedestalGeo = new THREE.CylinderBufferGeometry( 1, 3, pedestalHeight, 3);
    pedestalMat = new THREE.MeshPhysicalMaterial({
        color: 0x91797c,  
    //    opacity: .1,
    //    blending: THREE.NoBlending,
    side: THREE.DoubleSide,
    metalness: .8,
    roughness: .55
    //    transparent: false,
    //    depthTest: false,
            // wireframe: true, 
    });

    numOfPedestals = 2;
    base = 12;
    pedestalHeight = .75;
    // lastHeight;
    for (let i = numOfPedestals; i > 0; i--) {
        pedestalGeo = new THREE.CylinderBufferGeometry(base - 1, base, pedestalHeight, 5);
        if(i === numOfPedestals) {
            pedestalGeo = new THREE.CylinderBufferGeometry(base - 11, base - 4, pedestalHeight * 20, 3);
        }
        pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
        // ringComplex.add(pedestal);
        // ringComplex2.add(pedestal);
        // ringComplex3.add(pedestal);
        // ringComplex4.add(pedestal);
        if(i === numOfPedestals - 1) {
            // ring.position.set(0, ringRadius * 2.5,base / 2);
        }
        pedestal.position.set(0, pedestalHeight * i,base / 2);
        base *= i/numOfPedestals * .3 + 1;
        pedestal.receiveShadow = true;
        pedestal.castShadow = true;
        
    }
    // pedestal2 = new THREE.Mesh(pedestalGeo, pedestalMat);
    // ringComplex.add(pedestal2);
    // pedestal2.position.set(0, -pedestalHeight * 3,0);
    // pedestal.lookAt(ring.position);
    // pedestal2.lookAt(ring.position);
    // pedestal2.receiveShadow = true;
    // pedestal2.castShadow = true;






    /////////PARTICLES - STOLEN FROM LAB CITY CODEPEN



    particles = new THREE.Object3D();
    scene.add(particles);




    gmaterial = new THREE.MeshToonMaterial({color:0xf4f4f4, side:THREE.BackSide});
    gparticular = new THREE.CircleGeometry(0.015, 3);
    aparticular = 15;
    
    for (var h = 1; h<150; h++) {
        var particular = new THREE.Mesh(gparticular, gmaterial);
        particular.position.set(mathRandom(aparticular), mathRandom(aparticular),mathRandom(aparticular));
        particular.rotation.set(mathRandom(),mathRandom(),mathRandom());
        particles.add(particular);
    };





    // createCarPos = false;

    // var createCars = function(cScale = 2, cPos = 20, cColor = 0xFFFF00) {
    //     var cMat = new THREE.MeshToonMaterial({color:cColor, side:THREE.DoubleSide});
    //     var cGeo = new THREE.CubeGeometry(1, cScale/40, cScale/40);
    //     var cElem = new THREE.Mesh(cGeo, cMat);
    //     var cAmp = 3;
        
    //     if (createCarPos) {
    //       createCarPos = false;
    //       cElem.position.x = -cPos;
    //       cElem.position.z = (mathRandom(-cAmp, cAmp));
      
    //       gsap.to(cElem.position, {x:cPos, repeat:-1, yoyo:true, delay:mathRandom(0, 6), duration: 2});
    //     } else {
    //       createCarPos = true;
    //       cElem.position.x = (mathRandom(-cAmp, cAmp));
    //       cElem.position.z = -cPos;
    //       cElem.rotation.y = 90 * Math.PI / 180;
        
    //       gsap.to(cElem.position, {z:cPos, repeat:-1, yoyo:true, delay:mathRandom(0, 6), ease:Power1.easeInOut, duration: 3});
    //     };
    //     cElem.receiveShadow = true;
    //     cElem.castShadow = true;
    //     cElem.position.y = Math.abs(mathRandom(-cAmp, 5));
    //     particles.add(cElem)
    //     // city.add(cElem);
    //   };
      
    //   var generateLines = function() {
    //     for (var i = 0; i<15; i++) {
    //       createCars(0.1, 20);
    //       console.log(particles)
    //     };
    //   };

    //   generateLines()










    /////////WALL OF BOXES


    wall = new THREE.Object3D();
    // scene.add(wall);
    // wall.rotation.x = Math.PI/2;
    wall.position.set(0, 0, firmamentRadius * -1.9);

    wallSide = 300;
    boxesPerSide = 20;
    boxSide = wallSide * .99 / boxesPerSide;
    boxMargin = wallSide * .01 / (boxesPerSide - 1);
    boxLength = 100;
    boxGeo = new THREE.BoxBufferGeometry(boxSide, boxSide, boxLength);
    boxes = [];
    boxMaterials = [];
    // boxColors = [ 0x38040e, 0x640d14, 0x800e13, 0xad2831, 0xffffff];
    boxColors = [0x030303];
    // phi, theta = 0;
    // for (let i = 0; i < boxesPerSide; i++) {
    //     for (let j = 0; j < boxesPerSide; j++) {
        
    for (let i = 0; i < boxesPerSide; i++) {
        for (let j = 0; j < boxesPerSide; j++) {
            boxMat = new THREE.MeshStandardMaterial({
                color: 0xf40866,
                rounghness: .9,
                metalness: .9
                // transparency: true,
                // opacity: 0
            });
            boxMat.roughness = 0;
            box = new THREE.Mesh(boxGeo, boxMat);
            boxMat.color.setHex(boxColors[Math.floor(Math.random() * 1)]);
            // box.position.set(Math.random() * 110 - 55, Math.random() * 110 - 55, -Math.random() * 110);
            x = -wallSide / 2 + i * (boxSide + boxMargin);
            y = -wallSide / 2 + j * (boxSide + boxMargin);
            box.position.set(x, y, 0);
            boxes.push(box);
            boxMaterials.push(boxMat);
            // box.lookAt(50, -50, -100);
            wall.add(box);
        }
        theta += Math.PI / boxesPerSide
    }

    console.log(scene, wall);

    


    numOfNuggets = 50;
    nuggetGeo = null;
    nuggetMat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        // color: 0x0
    });
    nugget = null;
    nuggets = [];
    nuggetMass = new THREE.Object3D();

    for (let i = 0; i < numOfNuggets; i++) {
        luck = Math.random();
        if(luck < .3) {
            nuggetGeo = new THREE.OctahedronBufferGeometry(Math.random() * 1.5 + .5, 1);
        } else if(luck < .7) {
            nuggetGeo = new THREE.OctahedronBufferGeometry(Math.random() * 1.5 + .5, 0);
        } else {
            nuggetGeo = new THREE.OctahedronBufferGeometry(Math.random() * 1.5 + .5, 0);
        }
        nugget = new THREE.Mesh(nuggetGeo, nuggetMat);
        nuggets.push(nugget);
        nuggetMass.add(nugget);
        // console.log(camera.position)
        nugget.position.set(randomPos(50), random(-50, 30), Math.random() * 1.5 + 1);
        nugget.castShadow = true;
        nugget.receiveShadow = true;
        nugget.scale.y = Math.random() * 1 + 1.1;
        nugget.scale.x = .7;
    }

    // scene.add(nuggetMass);






    // ring = new THREE.RingGeometry(30, 3, 30, 12, 0, 6.3);
    // ring.rotateX(Math.PI / 2);
    // ringVertices = ring.vertices;
    // dotGeo = new THREE.SphereBufferGeometry(.1, 50, 50);
    // dotMat = new THREE.MeshLambertMaterial({
    //     color: 0xffffff
    // });
    // dotMass = new THREE.Object3D();
    // dots = ringVertices.map(vertex => {
    //     dot = new THREE.Mesh(dotGeo, dotMat);
    //     dotMass.add(dot);
    //     dot.position.set(vertex.x, 0, vertex.z);
    //     radius = Math.ceil(vertex.length());
    //     // console.log(dot.position)

    //     return {
    //         dot,
    //         radius,
    //         speed: random(113) + 1,
    //         height: random(3) + 1
    //     };
    // });
    // // scene.add(dotMass);
    // dotMass.position.set(0, 0, 0);
    // // console.log('DOTS', dotMass.children);








    

    mainLight = new THREE.AmbientLight(0xff10ed, 2.5);
    // scene.add( mainLight );

    directionalLight = new THREE.SpotLight(0xff9ef0, 2, 100, 150);
    // scene.add(directionalLight);
    directionalLight.position.set(0, 115, 0);
    directionalLight.castShdaow = true;
    directionalLight.shadowCameraVisible = true;
    lightTarget = new THREE.Object3D();
    lightTarget.position.set(11, 0, 0);
    scene.add(lightTarget);
    directionalLight.target.position.set(0,0,0);
    spotLightHelper = new THREE.SpotLightHelper(directionalLight);
    // scene.add(spotLightHelper);

    pointLight = new THREE.PointLight(0x5dcf9b, 1);
    // pointLight.position.set(10, 32, 0);
    scene.add(pointLight);

    pointLight2 = new THREE.PointLight(0xaa10cc, 1);
    // pointLight2.position.set(0, 0, 0);
    scene.add(pointLight2);

    pointLight3 = new THREE.DirectionalLight(0x34ebba, .5);
    pointLight3.position.set(0, 50, 20);
    // scene.add(pointLight3);









    lightMass = new THREE.Object3D();
    // scene.add(lightMass);
    lightMass.position.set(0, 0, -600);

    box = new THREE.Mesh(new THREE.SphereGeometry(5, 10, 10), new THREE.MeshPhongMaterial({color: 0x000000}));
    lightMass.add(box)
    boxHelper = new THREE.BoxHelper( box, 0xffff00 );
// scene.add( boxHelper );
    icos = new THREE.SphereGeometry(15, 8, 6, 3, 3.1, 5, .9);
    icosVertices = icos.vertices;
    // console.log(icosVertices)
    icosLights = icosVertices.map(vertex => {
        let light = new THREE.PointLight(0xffffff, 3);
        light.position.copy(vertex);
        // lightMass.add(light);

        return light;
    });






    camera.position.set(0,5,0);
    // camera.lookAt(0, 0, firmamentRadius);
    camera.lookAt(110, -20, -100);

    const axisHelper = new THREE.AxesHelper(2);
    scene.add(axisHelper);

    
    const controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.update();
    // controls.enabled = false;
    controls.enabled= true;
    // controls.target = new THREE.Vector3(0, 10, 100);
    console.log(scene.children)
    
}

const render = function () {
    renderer.render(scene, camera);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // renderer.shadowMap.type = THREE.PCFShadowMap; //THREE.PCFSoftShadowMap;
    renderer.shadowMap.needsUpdate = true;
}

let now;

const update = function () {
    now = Date.now() * .00045;
    if(cameraChanged) {
        cameraChanged = false;
        camera.lookAt(0, 0, 100);
    }
    if(afterLoad) {
        ring.rotation.y = now * .3;
        for (let i = 0; i < 4; i++) {
            ringComplexes[i].rotation.x += .0001;  
            ringComplexes[i].rotation.y += .00095;  
            
            // ringComplexes[i].position.x += .0001;  
            ringComplexes[i].position.y += Math.sin(now * 1.15) * .004;  
        }
    }

    // if(camera.position.z > 0)
        // camera.position.z -= .3;

    ringGeo.parameters.arc += .1;
    // console.log("🚀 ~ file: three.js ~ line 575 ~ update ~ ringGeo.parameters.arc", ringGeo.parameters.arc)
    ringGeo.verticesNeedUpdate = true;
    ringGeo.elementsNeedUpdate = true;

    // if(Math.random() > .7) {
    //    gsap.to(world.rotation, {
    //        y: Math.PI / 2,
    //        duration: 1,
    //        repeat: 3
    //    });
    // }
    
    particles.rotation.y += 0.0006;
    particles.rotation.x += 0.001;
    particles.rotation.z += 0.0001;

    pointLight.position.set(
        (Math.sin(now + 100)) * firmamentRadius * .35 , 
        (Math.cos(now + 100)) * 2 - firmamentRadius * .35, 
        (Math.cos(now + 100)) * firmamentRadius * .45 
    );
    pointLight2.position.set(
        (Math.sin(now)) * firmamentRadius * .35 , 
        (Math.cos(now)) * 2 + firmamentRadius * .35, 
        (Math.cos(now)) * firmamentRadius * .35 
    );
    // console.log(pointLight.position)
    if(Math.random() > .8) {
        // makeTunnelLight();
    }



    // camera.position.set(Math.sin() * now * 50, 10, Math.cos() * now * 50);
    // camera.lookAt(0,0,0);
    
    // console.log(camera.position)
    planeGeo.verticesneedsUpdate = true;
    // for (let i = 0; i < dots.length; i++) {
    //     dot = dots[i];
    //     dot.dot.position.x = Math.sin(now ) * dot.radius;
    //     dot.dot.position.z = Math.cos(now ) * dot.radius;
    //     dot.dot.position.y += Math.cos(now * 2 ) * .01* dot.height;
    // }


    // let r;
    // let K = .3;
    // let sphereVertex;
    // for (let i = 0; i < sphereGeo.vertices.length; i++) {
    //     sphereVertex = sphereGeo.vertices[i];
    //     r = Math.pow(Math.abs(i - ((now * 1) % sphereVerticesNum)) / sphereVerticesNum * 10, 1.2) + radius;
    //     // console.log('R', r);
    //     // r = radius * .98 + 1.4 * perlin.noise(sphereVertex.x * K + now * .18, sphereVertex.y * K, sphereVertex.z * K);
    //     // r = perlin.noise((sphereVertex.y) * .022 + now * .079 , (sphereVertex.x) * .012 + now * .0922) * 6 + radius * .995;
    //     // r = noise3d.get(sphereVertex.x + now * .00000001, sphereVertex.y + now * .0000001, sphereVertex.z + now * .0001) * radius  * 2.3;
    //     // if(i === 0)
    //     sphereGeo.vertices[i] = sphereVertex.normalize().multiplyScalar(r);
    //     // if(i === 0)
    //     // console.log(r);
    // }
    
    // // sphere.rotation.x -= .001;
    // // sphere.rotation.y -= .001;
    // // // sphere.material.color.set(new THREE.Color(`rgb(${Math.floor((Math.cos(now * 2) / 2 + .5)) * 140 + 100}, 40, ${Math.floor((Math.sin(now * 2) / 2 + .5) * 120 + 10)})`));
    // // sphere.material.color.set(new THREE.Color(`hsl(${Math.floor(Math.sin(now * .1) * 80 + 270)}, 90%, ${Math.floor(Math.cos(now * .8) * 15) + 70}%)`));

    // // // sphere.geometry.computeVertexNormals();
    // // // sphere.geometry.normalsNeedUpdate = true;
    // sphereGeo.verticesNeedUpdate = true;
    // sphereLight.position.x = Math.sin(now * .5) * radius * 3;
    // sphereLight.position.y = Math.cos(now * .5) * radius * 3;
    // sphereLight.position.z = Math.cos(now * .5) * radius * 3;

    // spot.position.z += Math.tan(now * 100);

    // camera.lookAt(0, 0, firmamentRadius);
}

const mouseClick = () => {
    gsap.to(pointLight.color, {
        r: .44,
        g: .111,
        b:.33,
        ease: 'elastic.out(2, .3)',
        duration: 3
    })
}
// document.addEventListener('click', mouseClick, {once: true});

const animate = function () {
    frame = requestAnimationFrame( animate );
    render();
    update();
    // console.log('SCENE CHILDREN', scene.children);
};



const random = (min = 0, max = 1) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const randomPos = (min = 0, max = 1) => {
    return random(min, max) * (Math.random() - .5) * 2 ;
}

const mathRandom = (num = 8) => {
    var numValue = - Math.random() * num + Math.random() * num;
    return numValue;
};

init();
animate();



//////////////GSAP


gsap.timeline({
    scrollTrigger: {
        trigger: '.fields',
        start: 'top center',
        end: 'bottom center',
        scrub: .2
    }
})
// .to(scene.fog.color, {
//     r: (18/255).toFixed(2),
//     g: (62/255).toFixed(2),
//     b: (82/255).toFixed(2),
// })
// .to(scene.background, {
//     r: (18/255).toFixed(2),
//     g: (62/255).toFixed(2), 
//     b: (82/255).toFixed(2),
// }, '<')




/////OPENING TIMELINE


// gsap.timeline({
//     // duration: 5
//     delay: 1
// })
// // .to(mainLight, {
// //     intensity: 1,
// //     duration: 5,
// //     ease: Power3.easeOut
// // })
// .to(scene.background.color, {
    
//     r: (18/255).toFixed(2),
//     g: (62/255).toFixed(2),
//     b: (82/255).toFixed(2),
//     duration: 5,
//     ease: Power3.easeOut
// }, '<')
// .to(scene.fog, {
//     near: firmamentRadius * .5, 
//     far: firmamentRadius * 1.2,
//     duration: 5,
//     ease: Power3.easeOut
// }, '<')

camera.rotation.order = 'YXZ';
// gsap.to(world.rotation, {
//     scrollTrigger: {
//         trigger: '.fields__field--1',
//         // scrub: .1,
//         start: 'top center',
//         // end: 'bottom bottom',
//         // pin: true
//     },
//     // repeat: 3,
//     duration: 2.5,
//     ease: 'elastic.inOut(.85, 1)',
//     y: y => y - Math.PI / 2
// });

// gsap.to(world.rotation, {
//     scrollTrigger: {
//         trigger: '.fields__field--2',
//         // scrub: .1,
//         start: 'top center',
//         // end: 'bottom bottom',
//         // pin: true
//     },
//     // repeat: 3,
//     duration: 2.5,
//     ease: 'elastic.inOut(.85, 1)',
//     y: y => y - Math.PI / 2
// });

gsap.timeline({
    scrollTrigger: {
        trigger: '.fields__field--1',
        scrub: 1,
        start: 'top center',
        end: 'center bottom',
        // toggleActions: 'play pause reverse none'
        // end: 'bottom bottom',
        // pin: true
    }
}).to(world.rotation, {
    // repeat: 3,
    duration: 2.5,
    ease: 'elastic.Out(.85, 1)',
    y: world.rotation.y - Math.PI / 2,
    onComplete:(index, target) => {
        console.log("🚀 ~ file: three.js ~ line 777~ init ~ target", world.rotation.y)
            return world.rotation.y - Math.PI / 2;
        }
}).to(scene.background, {
    // repeat: 3,
    r: 240/255,
    g: 199/255,
    b: 210/255,
    duration: .65,
    // ease: 'elastic.inOut(.85, 1)',
    // y: y => y - Math.PI / 2
}, '<.2')
.to(scene.fog.color, {
    // repeat: 3,
    r: 240/255,
    g: 199/255,
    b: 201/255,
    duration: .65,
    // ease: 'elastic.inOut(.85, 1)',
    // y: y => y - Math.PI / 2
}, '<');




gsap.timeline({
    scrollTrigger: {
        trigger: '.fields__field--2',
        scrub: 1,
        start: 'top center',
        end: 'center bottom',
        // toggleActions: 'play pause reverse none'
        // end: 'bottom bottom',
        // pin: true
    }
}).to(world.rotation, {
    // repeat: 3,
    duration: 2.5,
    ease: 'elastic.Out(.85, 1)',
    y: (index, target) => {
    console.log("🚀 ~ file: three.js ~ line 832 ~ init ~ target", world.rotation.y)
        return world.rotation.y - Math.PI / 2;
    }
}).to(scene.background, {
    // repeat: 3,
    r: 240/255,
    g: 199/255,
    b: 210/255,
    duration: .65,
    // ease: 'elastic.inOut(.85, 1)',
    // y: y => y - Math.PI / 2
}, '<.2')
.to(scene.fog.color, {
    // repeat: 3,
    r: 240/255,
    g: 199/255,
    b: 201/255,
    duration: .65,
    // ease: 'elastic.inOut(.85, 1)',
    // y: y => y - Math.PI / 2
}, '<');



gsap.timeline({
    delay: 1
})
// .from('.canvas', {
//     opacity: 0,
//     duration: 1.2,
//     ease: Power1.easeIn
// })
.from(ringGeo.parameters, {
    // repeat: 3,
    arc: 6.3,
    duration: 3.65,
    ease: 'power1.easeOut',
    // ease: 'elastic.inOut(.85, 1)',
    // y: y => y - Math.PI / 2,
    onComplete: () => {
        
        ringComplex2.position.set(0, 0, -firmamentRadius * .4);
        ringComplex3.position.set(-firmamentRadius * .4, 0, 0);
        ringComplex4.position.set(firmamentRadius * .4, 0, 0);
    }
})
// .to(scene.background, {
//     // repeat: 3,
//     r: 248/255,
//     g: 232/255,
//     b: 255/255,
//     duration: .65,
//     // ease: 'elastic.inOut(.85, 1)',
//     // y: y => y - Math.PI / 2
// })
// .to(scene.fog.color, {
//     // repeat: 3,
//     r: 248/255,
//     g: 232/255,
//     b: 255/255,
//     duration: .65,
//     // ease: 'elastic.inOut(.85, 1)',
//     // y: y => y - Math.PI / 2
// }, '<')
// .from(ringComplex.scale, {
//     x: 0,
//     y: 0,
//     z: 0,
//     duration: 7,
//     ease: Power1.easeOut
// }, '> -3')
// .from(ringComplex.rotation, {
//     x: 5,
//     y: .5,
//     duration: 8.5,
//     ease: Power2.easeOut
// }, '< .25')
.from('.header__heading-span-text', {
    yPercent: 50,
    opacity: 0,
    duration: 1.15,
    ease: 'elastic.out(1.2,1)',
    stagger: .065
})
.from('.header__subheading', {
    xPercent: 10,
    duration: .65,
    ease: Power1.easeIn,
}, '<.1')
.from('.header__field-button', {
    y: 30,
    opacity: 0,
    duration: .65,
    ease: 'elastic.out(1.1,1)',
    stagger: .04
}, '<.4')
.from('.menu__toggle-container', {
    opacity: 0,
    duration: .65,
    ease: Power1.easeIn,
}, '< .2')