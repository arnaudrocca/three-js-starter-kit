import 'TweenMax'
import * as THREE from 'three'
import Stats from 'stats.js'
import bindAll from 'lodash.bindall'
import Scene from './utils/Scene'
import Sphere from './objects/Sphere'

export default class App {

    /**
     * @constructor
     */
    constructor() {

        const $root = document.body.querySelector('.app');

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.DELTA_TIME = 0;
        this.CURRENT_TIME = 0;
        this.clock = new THREE.Clock();

        this.stats = new Stats();
        $root.appendChild(this.stats.dom);

        this.scene = new Scene({usePostProcessing: true}, this.width, this.height);

        this.sphere = new Sphere();
        this.scene.add(this.sphere.mesh);

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

        this.stats.begin();

        this.DELTA_TIME = this.clock.getDelta();
        this.CURRENT_TIME = this.clock.getElapsedTime();

        this.sphere.update(this.DELTA_TIME);
        this.scene.render();

        this.stats.end();

        requestAnimationFrame(this.update);

    }

}
