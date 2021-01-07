

let scene, camera, renderer;
let planeGeometry, planeMaterial, plane;
let cubeGeometry, cubeMaterial, cube;
let frame;

// let width = window.innerWidth,
//     height = window.innerHeight;


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
let wallSide = 20;
let planks = [];


let ringBall;
let rings = [];


let pointingTowers = [];
let pointingTowersVels = [];



const init = function () {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 10000 );
    // camera.position.set(-30, 3, 30);
    // camera.lookAt(0, 0, 100);

    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    document.querySelector('.canvas').appendChild(renderer.domElement);

    scene.background = new THREE.Color(0x1a0107);
    // scene.fog = new THREE.Fog(0x1a0107, 20, 60); // firmamentRadius * 5, firmamentRadius * 10);
    // scene.fog = new THREE.FogExp2(0x000000, .0262);





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
















    /////////WALL OF BOXES


    wall = new THREE.Object3D();
    // scene.add(wall);
    wall.rotation.x = Math.PI/2;
    wall.rotation.order = "YXZ";
    wall.position.set(0, 0, 0);

    boxesPerSide = 55;
    boxSide = wallSide * .1 / boxesPerSide;
    boxMargin = wallSide * .9 / (boxesPerSide - 1);
    boxLength = 100;
    boxGeo = new THREE.SphereBufferGeometry(boxSide / 2, 50, 50);
    boxes = [];
    boxMaterials = [];
    // boxColors = [ 0x38040e, 0x640d14, 0x800e13, 0xad2831, 0xffffff];
    boxColors = [0xfff];
    // phi, theta = 0;
    // for (let i = 0; i < boxesPerSide; i++) {
    //     for (let j = 0; j < boxesPerSide; j++) {
        
    for (let i = 0; i < boxesPerSide; i++) {
        for (let j = 0; j < boxesPerSide; j++) {
            boxMat = new THREE.MeshPhongMaterial({
                // emissive: 0xf609a3,
                color: 0xf3f3f3,
                // roughness: .8,
                // metalness: .9,
                // transparency: true,
                // opacity: 0
            });
            // boxMat.roughness = 0;
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
        // theta += Math.PI / boxesPerSide
    }

    // console.log(scene, wall);

    



    ///////////////////////////////ROW OF PLANKS

    plankMass = new THREE.Object3D();
    // scene.add(plankMass);
    plankMass.position.set(0, 0, -20);

    numOfPlanks = 30;
    plankSide = 1;
    plankLength = 10;

    for (let i = 0; i < numOfPlanks; i++) {
        plankGeo = new THREE.BoxBufferGeometry(plankSide, plankLength, plankSide);
        plankMat = new THREE.MeshNormalMaterial({
            // color: 0x0ff2ff8
        });

        plank = new THREE.Mesh(plankGeo, plankMat);
        plankMass.add(plank);
        // plank.rotation.order = 'YXZ';
        // plank.rotation.y += Math.PI / 2;
        plank.position.set(0, 0, -i * (plankSide + 1));

        planks.push(plank);
        
    }



    //////////////////TOWERS


    
    city = new THREE.Object3D();
    // scene.add(city);
    // city.rotation.x = Math.PI/2;
    // city.rotation.order = "YXZ";
    city.position.set(0, -40, -40);
    planeGeo = new THREE.PlaneBufferGeometry(300, 300);
    planeMat = new THREE.MeshPhongMaterial({
        color: 0xfc26e0
    });
    plane = new THREE.Mesh(planeGeo, planeMat);
    plane.position.y = 0;
    plane.rotation.x += 11;
    city.add(plane);

    wall = new THREE.Mesh(planeGeo, planeMat);
    wall.position.set(10,10,-10);
    city.add(wall);

    towerMaxSide = 3;
    towerMaxHeight = 65;
    numOfTowers = 100;
    takenSlots = [];
    towers = [];
    towerColors = [0xffffff, 0x1a002b, 0x4f0045, 0x8f0026];
        
    for (let i = 0; i < numOfTowers; i++) {
        towerObject = new THREE.Object3D();
        towerHeight = towerMaxHeight * Math.random() + 25;
        currSide = towerMaxSide * Math.random() + 1;
        towerGeo = new THREE.BoxBufferGeometry(currSide, towerHeight, currSide, 25, 25, 5);
        towerMat = new THREE.MeshStandardMaterial({
            color: towerColors[Math.floor(Math.random()* towerColors.length)],
            // wireframe: true,
            roughness: .5,
            metalness: .9,
        });
        tower = new THREE.Mesh(towerGeo, towerMat);
        
        frameGeo = new THREE.BoxBufferGeometry(currSide, towerHeight, currSide, Math.random() * 10 + 5, Math.random() * 10 + 5, Math.random() * 10 + 5);
        frameMat = new THREE.MeshPhongMaterial({
            color: towerColors[Math.floor(Math.random()* towerColors.length)],
            wireframe: true,
            // roughness: .8,
            // metalness: .9,
        });
        frame = new THREE.Mesh(frameGeo, frameMat);

        x = (Math.random() -.5) * 40;
        // y = Math.random() * 50;
        z = (Math.random() - .5) * 40;
        tower.position.set(x, 0, z);
        frame.position.set(x, 0, z);
        towers.push(tower);
        towerObject.add(tower);
        towerObject.add(frame);

        currTopSide = Math.random() * currSide * .3 + currSide * .5;
        topYPos = Math.random() * .3 + .1;
        topGeo = new THREE.BoxBufferGeometry(currTopSide,topYPos, currTopSide);
        topMat = new THREE.MeshBasicMaterial({
            color: 0x101010,
            // roughness: .8,
            // metalness: .9,
        });
        towerTop = new THREE.Mesh(topGeo, topMat);
        towerObject.add(towerTop);
        towerTop.position.set(x, towerHeight / 2 + .1, z);
        if(i % 3 === 0) {
            antenaGeo = new THREE.BoxBufferGeometry(Math.random() * .2 + .05, Math.random() * 15 + 3, Math.random() * .2 + .05);
            antenaMat = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                // roughness: .8,
                // metalness: .9,
            });
            antena = new THREE.Mesh(antenaGeo, antenaMat);
            towerObject.add(antena);
            antena.position.set(x, towerHeight / 2 + .1 + topYPos, z);
        }
        city.add(towerObject)
        towerObject.lookAt(-1330, -60, -10);
    }

    // console.log(city)
    // console.log(scene.children)




    ///////////////////BALL WITH RINGS

    ringBall = new THREE.Object3D();
    // scene.add(ringBall);
    ringBall.position.set(0, 0, -20);

    ballRadius = 10;
    ballGeo = new THREE.SphereBufferGeometry(ballRadius * .35, 50, 50);
    ballMat = new THREE.MeshStandardMaterial({
        color: 0xff21e1
    });

    ball = new THREE.Mesh(ballGeo, ballMat);
    ball.castShadow = true;
    ball.receiveShadow = true;
    ringBall.add(ball);

    
    edgePosition = .2;
    // ringGap = ballRadius * 2 * (1 - edgePosition) * 2 / (numOfRings - 1) * .5;
    ringTube = ballRadius / 75;

    edgeAngle = Math.PI / 20;
    angleGap = Math.PI / 28;
    for (let i = edgeAngle; i <= Math.PI - edgeAngle; i += angleGap) {
        ringRadius = Math.sin(i) * ballRadius * 1.1;
        ringGeo = new THREE.TorusBufferGeometry(ringRadius, ringTube, 50, 50);
        ringMat = new THREE.MeshStandardMaterial({
            color: 0xfff444
        });
    
        ring = new THREE.Mesh(ringGeo, ringMat);
        rings.push(ring);
        ringBall.add(ring);
        ring.position.set(0, ballRadius * Math.cos(i), 0);
        ring.rotation.x += Math.PI / 2;
        ring.castShadow = true;
        ring.receiveShadow = true;
    }

    // ball.position.set()




    ///////PARTICLES

    
    particles = new THREE.Object3D();
    // scene.add(particles);
    particles.position.set(-10,-30,-30);//copy(city.position);




    gmaterial = new THREE.MeshNormalMaterial({color:0xf4f4f4, side:THREE.BackSide});
    gparticular = new THREE.CircleGeometry(0.015, 3);
    aparticular = 15;
    
    for (var h = 1; h<1150; h++) {
        var particular = new THREE.Mesh(gparticular, gmaterial);
        particular.position.set(mathRandom(aparticular), mathRandom(aparticular),mathRandom(aparticular));
        particular.rotation.set(mathRandom(),mathRandom(),mathRandom());
        particles.add(particular);
    };



    //////////////////////// BALL OF TOWERS

    
    
    
    towerBall = new THREE.Object3D();
    scene.add(towerBall);
    towerBall.position.set(0, 0, 0);
    towerBall.rotation.order = "YXZ"
    // towerBall.rotation.z += 1.9685;

    ballRadius = 10;

    diamondBody = new THREE.Object3D();

    diamondGeo = new THREE.OctahedronBufferGeometry(ballRadius * .16, 1);
    diamondProperMat = new THREE.MeshPhysicalMaterial({
        color: 0xfff0ff,
        flatShading: true,
        side: THREE.BackSide
    });

    diamondFrameMat = new THREE.MeshPhysicalMaterial({
        color: 0xfaf0af,
        wireframe: true,
        side: THREE.BackSide
    });
    
    diamond = new THREE.Mesh(diamondGeo, diamondProperMat);
    diamondFrame = new THREE.Mesh(diamondGeo, diamondFrameMat);
    diamondBody.add(diamond);
    diamondBody.add(diamondFrame);



    diamond.castShadow = true;
    diamond.receiveShadow = true
    towerBall.add(diamondBody);


    
    firmamentGeo = new THREE.SphereBufferGeometry(ballRadius * 22, 30, 30, 0, Math.PI * 2, 0, Math.PI );
    firmamentMat = new THREE.MeshPhongMaterial({
        color: 0x010203,
        flatShading: true,
        side: THREE.BackSide
    });
    
    firmament = new THREE.Mesh(firmamentGeo, firmamentMat);
    firmament.position.set(0, 0, -200);
    // firmament.rotation.x = Math.PI ;
    scene.add(firmament);
    
    // ballGeo = new THREE.SphereBufferGeometry(ballRadius * .35, 50, 50);
    // ballMat = new THREE.MeshStandardMaterial({
    //     color: 0xff21e1
    // });

    // ball = new THREE.Mesh(ballGeo, ballMat);
    // ball.castShadow = true;
    // ball.receiveShadow = true;
    // towerBall.add(ball);

    
    numOfTowers = 400;
    maxTower = 2;
    ballRadius = 10;
    towerColors = [0xf72585, 0xd00000, 0xe85d04, 0xf48c06, 0xffba08];
    mouse = {
        x: 0,
        y: 0
    }

    for (let i = 0; i < numOfTowers; i++) {
        towerGeo = new THREE.BoxBufferGeometry(.05, .05, .5);//OctahedronBufferGeometry(.5);
        towerMat = new THREE.MeshPhongMaterial({
            color: towerColors[Math.floor(Math.random() * towerColors.length)],
            roughness: .9
        });
    
        tower = new THREE.Mesh(towerGeo, towerMat);
        towerBall.add(tower);
        phi = Math.random() * Math.PI;
        theta = Math.random() * Math.PI * 2;
        // tower.position.set(
        //     (Math.random() - .5) * 50,
        //     (Math.random() - .5) * 50,
        //     Math.random() * 50
        // );
        tower.position.set(
            Math.sin(phi) * Math.cos(theta) * ballRadius,
            Math.sin(phi) * Math.sin(theta) * ballRadius,
            Math.cos(phi) * ballRadius
        );
        tower.scale.z *= 3.8;
        tower.lookAt(0, 0, 0);
        tower.castShadow = true;
        tower.receiveShadow = true;
        pointingTowers.push(tower);
        // console.log(pointingTowers)
    }
    
    pointingTowersVels = pointingTowers.map(() => {
        return Math.random() * 3;
    })



    ////////////////////EMPIRE STATE



    empireState = new THREE.Object3D();

    currentBlockMat = new THREE.MeshLambertMaterial({color: 0xffffff});
    currentBlockGeo = new THREE.BoxBufferGeometry(1, 10, 4);
    currentBlock = new THREE.Mesh(currentBlockGeo, currentBlockMat);
    empireState.add(currentBlock);

    currentBlockGeo = new THREE.BoxBufferGeometry(1, 10, 4);
    currentBlock = new THREE.Mesh(currentBlockGeo, currentBlockMat);









    ///////LIGHTS   




    mainLight = new THREE.AmbientLight(0xffffff, .5);
    scene.add( mainLight );

    directionalLight = new THREE.SpotLight(0xffffff, 22);
    // scene.add(directionalLight);
    directionalLight.position.set(wallSide, wallSide * 3, -wallSide);
    directionalLight.castShdaow = true;
    directionalLight.shadowCameraVisible = true;
    lightTarget = ringBall;
    lightTarget.position.set(0, 0, 0);
    // scene.add(lightTarget);
    directionalLight.target.position.set(0,0,0);
    spotLightHelper = new THREE.SpotLightHelper(directionalLight);
    // scene.add(spotLightHelper);

    pointLight = new THREE.PointLight(0xeb34d8, 1);
    // pointLight.position.set(10, 32, 0);
    scene.add(pointLight);
    const sphereSize = 1;
    const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
    // scene.add( pointLightHelper );

    pointLight2 = new THREE.PointLight(0x42f587, .5);
    // pointLight2.position.set(0, 0, 0);
    scene.add(pointLight2);
    // const sphereSize = 1;
    const pointLightHelper2 = new THREE.PointLightHelper( pointLight2, sphereSize );
    scene.add( pointLightHelper2 );














    camera.position.set(0, 0, 55);
    // camera.position.set(wallSide * .45, 1, 20);
    // camera.lookAt(0, 0, firmamentRadius);
    camera.lookAt(110, -20, -100);

    const axisHelper = new THREE.AxesHelper(2);
    // scene.add(axisHelper);

    const controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.update();
    // controls.enabled = false;
    controls.enabled = true;
    // controls.target = new THREE.Vector3(0, 10, 100);
    
    // const controls = new THREE.OrbitControls( camera, renderer.domElement );
    // controls.update();
    // controls.enabled = false;
    // controls.enabled= true;
    // controls.target = new THREE.Vector3(0, 10, 100);
    // console.log(scene.children)
    
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
        camera.position.set(0, 0, 45);
        camera.lookAt(-1, 2, 0);
        // camera.target = ringBall;
        cameraChanged = false;
    }

    // console.log(camera.position, camera.target)
    // wall.rotation.y += .0001;
    // for (let i = 0; i < boxes.length; i++) {
    //     box = boxes[i];
    //     factor = perlin.noise(box.position.x * .076 + now * .08, box.position.y * .1351 + now * .07) * .5;
    //     box.position.z = factor;
    //     box.scale.x = (factor) * 1.9 + .1;
    //     box.scale.y = (factor) * 1.9 + .1;
    //     box.scale.z = (factor) * 1.9 + .1;
        
    // }

    // for (let i = 0; i < planks.length; i++) {
    //     factor = perlin.noise(planks[i].position.x * .016 + now * .4, planks[i].position.y * .0351 + now * .2) * 4;
    //     planks[i].rotation.z += Math.cos(now + i * .012) * Math.sin(now + i * .012) * .01;
    //     // planks[i].rotation.z = Math.cos(now + i * .012) * Math.sin(now + i * .012);
    //     planks[i].scale.y = planks[i].rotation.z * factor;


    //     // box = boxes[i];
    //     // box.position.z = factor;
    //     // box.scale.x = (factor) * .9 + .1;
    //     // box.scale.y = (factor) * .9 + .1;
    //     // box.scale.z = (factor) * .9 + .1;
    // }


    if(mouseMove) {
        // for (let i = 0; i < pointingTowers.length; i++) {
        //     pointingTowers[i].lookAt(mouse.x, mouse.y, 100);
        // }
    }



    // ringBall.rotation.x += .003;
    // ringBall.rotation.z += .001;
    // for (let i = 0; i < rings.length; i++) {
    //     // rings[i].scale.x = (Math.sin(now * 3 + i / 3.3) / 2 + 1) * .1 + .8;
    //     // rings[i].scale.z = (Math.sin(now * 3 + i / 3.3) / 2 + 1) * .1 + .8;
    //     rings[i].position.y += Math.sin((now + i / 105) * 10) * .1;
    //     // ring[i].geometry.radius = (Math.sin(now) / 2 + 1) */
    // }
    


    /////////////////////POINTING TOWERS SPIN

    towerBall.rotation.y += .0002;
    towerBall.rotation.z += .0003;

    diamondBody.position.set(
        Math.sin(now * .35) * ballRadius * .2, 
        Math.cos(now * .5) * ballRadius * .2, 
        Math.cos(now * .25) * ballRadius * .2
    )
    for (let i = 0; i < pointingTowers.length; i++) {
        pointingTowers[i].scale.z = (Math.sin(now * pointingTowersVels[i])  / 2 + .5) * 3 + 1;
        // pointingTowers[i].position.x = Math.cos(now * pointingTowersVels[i]) * ballRadius;
        pointingTowers[i].lookAt(diamond.position.x, diamond.position.y, diamond.position.z);
    }
    



    particles.rotation.x += .001;
    particles.rotation.z += .001;
    pointLight.position.set(
        Math.sin(now + Math.PI) * ballRadius, 
        Math.cos(now + Math.PI) * ballRadius * .5, 
        Math.cos(now + Math.PI) * ballRadius
    );
    
    pointLight2.position.set(
        Math.sin(now) * ballRadius * 10, 
        Math.cos(now) * 100, 
        -550
    );

    ///////////////// BELONGS TO TOWERS
    // pointLight.position.set(
    //     (Math.sin(now + Math.PI)) * 40, 
    //     20, 
    //     (Math.cos(now + Math.PI) / 2 + 1) * -40
    // );
    // pointLight2.position.set(
    //     (Math.sin(now)) * wallSide * .65, 
    //     -10, 
    //     (Math.cos(now)) * wallSide * .65 
    // );
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

let mouseMoved = false;

const mouseMove = ({ clientX, clientY }) => {
    // console.log(clientX, clientY)
    mouse.x = (clientX / width - .5) * 1000;
    mouse.y = (clientY / height - .5) * 1000;
    mouseMoved = true;
}


document.addEventListener('mousemove', mouseMove);

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







