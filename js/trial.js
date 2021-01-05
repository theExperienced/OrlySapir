

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


const init = function () {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 10000 );
    // camera.position.set(-30, 3, 30);
    // camera.lookAt(0, 0, 100);

    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    document.querySelector('.canvas').appendChild(renderer.domElement);

    scene.background = new THREE.Color(0xff2baa);
    // scene.fog = new THREE.Fog(0x000000, -10, 102); // firmamentRadius * 5, firmamentRadius * 10);
    scene.fog = new THREE.FogExp2(0x000000, .0262);





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
    scene.add(wall);
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
                roughness: .8,
                metalness: .9,
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
            color: 0x0ff2ff8
        });

        plank = new THREE.Mesh(plankGeo, plankMat);
        plankMass.add(plank);
        // plank.rotation.order = 'YXZ';
        // plank.rotation.y += Math.PI / 2;
        plank.position.set(0, 0, -i * (plankSide + 1));

        planks.push(plank);
        
    }






    

    mainLight = new THREE.AmbientLight(0xffffff, 11.5);
    // scene.add( mainLight );

    directionalLight = new THREE.SpotLight(0xffffff, 22);
    // scene.add(directionalLight);
    directionalLight.position.set(wallSide, wallSide * 3, -wallSide);
    directionalLight.castShdaow = true;
    directionalLight.shadowCameraVisible = true;
    lightTarget = new THREE.Object3D();
    lightTarget.position.set(0, 0, 0);
    scene.add(lightTarget);
    directionalLight.target.position.set(0,0,0);
    spotLightHelper = new THREE.SpotLightHelper(directionalLight);
    // scene.add(spotLightHelper);

    pointLight = new THREE.PointLight(0xffffff, 2.5);
    // pointLight.position.set(10, 32, 0);
    scene.add(pointLight);
    const sphereSize = 1;
    const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
    scene.add( pointLightHelper );

    pointLight2 = new THREE.PointLight(0xffffff, 11.5);
    // pointLight2.position.set(0, 0, 0);
    // scene.add(pointLight2);
    // const sphereSize = 1;
    const pointLightHelper2 = new THREE.PointLightHelper( pointLight2, sphereSize );
    scene.add( pointLightHelper2 );

    // pointLight3 = new THREE.DirectionalLight(0x34ebba, .5);
    // pointLight3.position.set(0, 50, 20);
    // // scene.add(pointLight3);














    camera.position.set(-5, 1, -5);
    // camera.position.set(wallSide * .45, 1, 20);
    // camera.lookAt(0, 0, firmamentRadius);
    camera.lookAt(110, -20, -100);

    const axisHelper = new THREE.AxesHelper(2);
    scene.add(axisHelper);

    const controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.update();
    // controls.enabled = false;
    controls.enabled= true;
    // controls.target = new THREE.Vector3(0, 10, 100);
    // console.log(scene.children)
    
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
        camera.lookAt(0, 0, 0);
        cameraChanged = false;
    }

    // console.log(camera.position, camera.target)
    wall.rotation.y += .0001;
    for (let i = 0; i < boxes.length; i++) {
        box = boxes[i];
        factor = perlin.noise(box.position.x * .076 + now * .08, box.position.y * .1351 + now * .07) * .5;
        box.position.z = factor;
        box.scale.x = (factor) * 1.9 + .1;
        box.scale.y = (factor) * 1.9 + .1;
        box.scale.z = (factor) * 1.9 + .1;
        
    }

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

    pointLight.position.set(
        (Math.sin(now + Math.PI)) * wallSide * .65, 
        10, 
        (Math.cos(now + Math.PI)) * wallSide * .65 
    );
    pointLight2.position.set(
        (Math.sin(now)) * wallSide * .65, 
        -10, 
        (Math.cos(now)) * wallSide * .65 
    );
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







