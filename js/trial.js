

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


const init = function () {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 10000 );
    // camera.position.set(-30, 3, 30);
    // camera.lookAt(0, 0, 100);

    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    document.querySelector('.canvas').appendChild(renderer.domElement);

    scene.background = new THREE.Color('rgb(222,222,222)');
    scene.fog = new THREE.Fog(0xffffff, 100, 200); // firmamentRadius * 5, firmamentRadius * 10);
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
















    /////////WALL OF BOXES


    wall = new THREE.Object3D();
    scene.add(wall);
    // wall.rotation.x = Math.PI/2;
    wall.position.set(0, 0, 0);

    wallSide = 270;
    boxesPerSide = 55;
    boxSide = wallSide * .3 / boxesPerSide;
    boxMargin = wallSide * .7 / (boxesPerSide - 1);
    boxLength = 100;
    boxGeo = new THREE.SphereBufferGeometry(boxSide / 2, 50, 50);
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
                metalness: .9,
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
        // theta += Math.PI / boxesPerSide
    }

    console.log(scene, wall);

    







    

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
    // scene.add(pointLight);

    pointLight2 = new THREE.PointLight(0xaa10cc, 1);
    // pointLight2.position.set(0, 0, 0);
    // scene.add(pointLight2);

    pointLight3 = new THREE.DirectionalLight(0x34ebba, .5);
    pointLight3.position.set(0, 50, 20);
    // scene.add(pointLight3);














    camera.position.set(0,0,160);
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

    // if(Math.random() > .7) {
    //    gsap.to(world.rotation, {
    //        y: Math.PI / 2,
    //        duration: 1,
    //        repeat: 3
    //    });
    // }

    for (let i = 0; i < boxes.length; i++) {
        box = boxes[i];
        factor = perlin.noise(box.position.x * .01 + now * .4, box.position.y * .01 + now * .2) * 3;
        box.scale.x = factor / 5 + .1;
        box.scale.y = factor / 5 + .1;
        box.scale.z = factor / 5 + .1;
        
    }
    
    // particles.rotation.y += 0.0006;
    // particles.rotation.x += 0.001;
    // particles.rotation.z += 0.0001;

    // pointLight.position.set(
    //     (Math.sin(now + 100)) * firmamentRadius * .35 , 
    //     (Math.cos(now + 100)) * 2 - firmamentRadius * .35, 
    //     (Math.cos(now + 100)) * firmamentRadius * .45 
    // );
    // pointLight2.position.set(
    //     (Math.sin(now)) * firmamentRadius * .35 , 
    //     (Math.cos(now)) * 2 + firmamentRadius * .35, 
    //     (Math.cos(now)) * firmamentRadius * .35 
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
// animate();







