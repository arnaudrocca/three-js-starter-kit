import THREE from 'three'
import Wagner from '@superguigui/wagner'
import BloomPass from '@superguigui/wagner/src/passes/bloom/MultiPassBloomPass'
import OrbitControls from './OrbitControls'

class Scene {

    /**
     * @constructor
     */
    constructor(width, height) {

        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0x111111);

        this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 2000);
        this.camera.position.z = 1000;

        this.controls = new OrbitControls(this.camera);

        this.initPostProcessing();

    }

    /**
     * @method
     * @name initPostProcessing
     */
    initPostProcessing() {

        this.composer = new Wagner.Composer(this.renderer);

        this.bloomPass = new BloomPass({
            applyZoomBlur: true,
            zoomBlurStrength: 2,
            blurAmount: 1
        });

    }

    /**
     * @method
     * @name add
     * @description Add a child to the scene
     * @param {object} child - A THREE object
     */
    add(child) {

        this.scene.add(child);

    }

    /**
     * @method
     * @name remove
     * @description Remove a child from the scene
     * @param {object} child - A THREE object
     */
    remove(child) {

        this.scene.remove(child);

    }

    /**
     * @method
     * @name render
     * @description Renders/Draw the scene
     */
    render() {

        this.renderer.autoClearColor = true;
        // this.renderer.render(this.scene, this.camera);

        this.composer.reset();
        this.composer.render(this.scene, this.camera);
        this.composer.pass(this.bloomPass);
        this.composer.toScreen();

    }

    /**
     * @method
     * @name resize
     * @description Resize the scene according to screen size
     * @param {number} newWidth
     * @param {number} newHeight
     */
    resize(newWidth, newHeight) {

        this.camera.aspect = newWidth / newHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(newWidth, newHeight);

    }

}

export default Scene
