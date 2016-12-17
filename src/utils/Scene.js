import THREE from 'three'
import Wagner from '@superguigui/wagner'
import BloomPass from '@superguigui/wagner/src/passes/bloom/MultiPassBloomPass'
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

        this.renderer.setClearColor(0x111111, 1);
        this.renderer.autoClear = false;
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;

        this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
        this.camera.position.z = 50;
        this.controls = new OrbitControls(this.camera);

        this.initLights();
        this.initHelpers();
        this.initPostProcessing();

    }

    /**
     * @method
     * @name initLights
     */
    initLights() {

        this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);

    }

    /**
     * @method
     * @name initHelpers
     */
    initHelpers() {

        this.axisHelper = new THREE.AxisHelper(10);
        this.add(this.axisHelper);
        this.axisHelper.visible = this.options.useHelpers || false;

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

        this.usePostProcessing = this.options.usePostProcessing || false;

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
            this.composer.pass(this.bloomPass);
        }
        this.composer.toScreen();

    }

}
