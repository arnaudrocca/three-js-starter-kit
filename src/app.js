import 'TweenMax'
import Scene from './utils/Scene'
import Cube from './objects/Cube'

class App {

    /**
     * @constructor
     */
    constructor() {

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.scene = new Scene();
        this.cube = new Cube();

        this.scene.add(this.cube.mesh);

        const root = document.body.querySelector('.app');
        root.appendChild(this.scene.renderer.domElement);

        this.addListeners();

    }

    /**
     * @method
     * @name onResize
     * @description Triggered when window is resized
     */
    onResize() {

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.scene.resize(this.width, this.height);

    }

    /**
     * @method
     * @name addListeners
     */
    addListeners() {

        window.addEventListener('resize', this.onResize.bind(this));
        TweenMax.ticker.addEventListener('tick', this.update.bind(this));

    }

    /**
     * @method
     * @name update
     * @description Triggered on every TweenMax tick
     */
    update() {

        this.cube.update();

        this.scene.render();

    }

}

export default App
