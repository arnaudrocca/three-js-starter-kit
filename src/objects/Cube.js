import THREE from 'three'

export default class Cube {

    /**
     * @constructor
     */
    constructor() {

        this.size = 10;
        this.rotationSpeed = 1;

        this.geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
        this.material = new THREE.MeshBasicMaterial({
            color: 0x0000FF,
            wireframe: true
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);

    }

    /**
     * @method
     * @name update
     * @description Triggered on every frame
     * @param {number} dt - DELTA_TIME
     */
    update(dt) {

        this.mesh.rotation.x += this.rotationSpeed * dt;
        this.mesh.rotation.y += this.rotationSpeed * dt;
        this.mesh.rotation.z += this.rotationSpeed * dt;

    }

}
