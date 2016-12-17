import 'TweenMax'
import THREE from 'three'
import bindAll from 'lodash.bindall'
import Scene from './utils/Scene'
import Cube from './objects/Cube'

class App {

    /**
     * @constructor
     */
    constructor() {

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.DELTA_TIME = 0;
        this.CURRENT_TIME = 0;
        this.clock = new THREE.Clock();

        this.scene = new Scene(this.width, this.height);
        this.cube = new Cube();

        this.scene.add(this.cube.mesh);

        const $root = document.body.querySelector('.app');
        $root.appendChild(this.scene.renderer.domElement);

        bindAll(this, ['resizeHandler', 'update']);

        this.addListeners();

        requestAnimationFrame(this.update);

    }

    /**
     * @method
     * @name addListeners
     */
    addListeners() {

        window.addEventListener('resize', this.resizeHandler);

    }

    /**
     * @method
     * @name resizeHandler
     * @description Triggered when window is resized
     */
    resizeHandler() {

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.scene.resize(this.width, this.height);

    }

    /**
     * @method
     * @name update
     * @description Triggered on every frame
     */
    update() {

        this.DELTA_TIME = this.clock.getDelta();
        this.CURRENT_TIME = this.clock.getElapsedTime();

        this.cube.update(this.DELTA_TIME);

        this.scene.render();

        requestAnimationFrame(this.update);

    }

}

export default App
