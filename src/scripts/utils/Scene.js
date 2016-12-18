import * as THREE from 'three'
import Wagner from '@superguigui/wagner'
import VignettePass from '@superguigui/wagner/src/passes/vignette/VignettePass'
import OrbitControls from './OrbitControls'

export default class Scene extends THREE.Scene {

    /**
     * @constructor
     * @param {Object} options
     * @param {number} width
     * @param {number} height
     */
    constructor(options = {}, width, height) {

        super();

        this.options = options;

        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.renderer.setClearColor(0xFFFFFF, 1);
        this.renderer.autoClear = false;
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;

        this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
        this.camera.position.z = 50;
        this.controls = new OrbitControls(this.camera);

        this.initLights();
        this.initPostProcessing();

    }

    /**
     * @method
     * @name initLights
     */
    initLights() {

        this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
        this.add(this.ambientLight);

        this.pointLight = new THREE.PointLight(0xFFFFFF, 1);
        this.pointLight.position.set(100, 100, 100);
        this.add(this.pointLight);

    }

    /**
     * @method
     * @name initPostProcessing
     */
    initPostProcessing() {

        this.composer = new Wagner.Composer(this.renderer);

        this.vignettePass = new VignettePass({
            boost: 1.0,
            reduction: 1.5
        });

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
        this.composer.setSize(newWidth, newHeight);

    }

    /**
     * @method
     * @name render
     * @description Renders/Draw the scene
     */
    render() {

        this.composer.reset();
        this.composer.render(this, this.camera);
        if (this.options.usePostProcessing === true) {
            this.composer.pass(this.vignettePass);
        }
        this.composer.toScreen();

    }

}
