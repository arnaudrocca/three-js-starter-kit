import THREE from 'three'

class Cube {

    /**
     * @constructor
     */
    constructor(size) {

        this.geometry = new THREE.BoxGeometry(size, size, size),
        this.material = new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0x0000FF
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);

    }

    /**
     * @method
     * @name update
     * @description Triggered on every TweenMax tick
     */
    update() {

        const rotation = .01;

        this.mesh.rotation.x += rotation;
        this.mesh.rotation.y += rotation;
        this.mesh.rotation.z += rotation;

    }

}

export default Cube
