// Three.js Road and Valley Background
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.getElementById('hero');

    // Create Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.02); // Dark fog matching bg

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Fixed position to stay behind all content
    renderer.domElement.style.position = 'fixed'; // Changed from absolute to fixed
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.zIndex = '-1';
    renderer.domElement.id = 'three-canvas';

    // Append to body instead of hero to ensure it stays fixed across sections
    document.body.appendChild(renderer.domElement);
    // If it was already in hero, we should probably move it or just ensure styling handles it. 
    // Appending to body is safer for a fixed background.

    // --- Geometries ---

    // 1. Road
    // Infinite road illusion: Use a plane that we move texture on, or just a long plane
    const roadGeometry = new THREE.PlaneGeometry(4, 200, 20, 200);
    const roadMaterial = new THREE.MeshStandardMaterial({
        color: 0x1e1e1e,
        wireframe: false,
        roughness: 0.8,
    });
    const road = new THREE.Mesh(roadGeometry, roadMaterial);
    road.rotation.x = -Math.PI / 2;
    road.position.z = -50; // Extend far back
    scene.add(road);

    // Road Lines (Left and Right edges)
    const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-2, 0.05, 50),
        new THREE.Vector3(-2, 0.05, -150)
    ]);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x64ffda });
    const leftLine = new THREE.Line(lineGeo, lineMat);
    scene.add(leftLine);

    const rightLine = new THREE.Line(lineGeo.clone(), lineMat);
    rightLine.position.x = 4; // Shift to right side (since line is at -2, +4 makes it +2)
    // Actually simpler:
    const rightLineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(2, 0.05, 50),
        new THREE.Vector3(2, 0.05, -150)
    ]);
    const rightLineMesh = new THREE.Line(rightLineGeo, lineMat);
    scene.add(rightLineMesh);


    // 2. Terrain / Valleys
    // We create two large planes with noise for terrain
    function createTerrain(offsetX) {
        const geometry = new THREE.PlaneGeometry(40, 200, 30, 50);

        // Add random height (noise)
        const count = geometry.attributes.position.count;
        for (let i = 0; i < count; i++) {
            const x = geometry.attributes.position.getX(i);
            const y = geometry.attributes.position.getY(i);

            // Lift outer edges higher to create a "valley" effect
            // Closer to 0 (road) -> lower height
            let height = Math.random() * 2;

            // Make terrain higher as we go further from center
            const dist = Math.abs(x);
            height += dist * 0.5;

            geometry.attributes.position.setZ(i, height); // Z because plane is upright before rotation
        }

        geometry.computeVertexNormals();

        const material = new THREE.MeshBasicMaterial({
            color: 0x64ffda,
            wireframe: true,
            transparent: true,
            opacity: 0.15
        });

        const terrain = new THREE.Mesh(geometry, material);
        terrain.rotation.x = -Math.PI / 2;
        terrain.position.x = offsetX;
        terrain.position.z = -50;
        return terrain;
    }

    const leftTerrain = createTerrain(-22); // Road width is 4, so -2 - 20 = -22 center
    scene.add(leftTerrain);

    const rightTerrain = createTerrain(22);
    scene.add(rightTerrain);


    // --- Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Grid Helper for retro feel? Maybe too cluttered. Let's stick to wireframe terrain.

    // Camera Initial Pos
    camera.position.y = 3;
    camera.position.z = 10;
    camera.rotation.x = -0.1;

    // --- Interaction ---

    // Scroll interaction
    let scrollY = 0;
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) * 0.0005;
        mouseY = (event.clientY - windowHalfY) * 0.0005;
    });

    // Animation Loop
    const animate = () => {
        requestAnimationFrame(animate);

        // Move camera forward based on scroll
        // Map scrollY to Z position
        // e.g., start at z=10, move to z=-50 over document height
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollFraction = scrollY / (maxScroll || 1); // Avoid div/0

        const zPos = 10 - (scrollFraction * 100); // Travel 100 units forward

        camera.position.z = zPos;

        // Add subtle constant forward movement feels nice, but scroll controlled requested
        // Let's add infinite road effect later if needed. For now, finite journey usually matches portfolio sections better.

        // Parallax
        camera.rotation.y = -mouseX;
        camera.rotation.x = -0.1 - mouseY;

        // Animate Terrain (Flow effect - optional)
        // leftTerrain.position.z += 0.05;
        // if(leftTerrain.position.z > 10) leftTerrain.position.z = -90;

        renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
