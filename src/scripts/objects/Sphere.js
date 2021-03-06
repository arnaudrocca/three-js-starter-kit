import * as THREE from 'three';

export default class Sphere {

    /**
     * @constructor
     * @param {Object} options
     */
    constructor(options = {}) {

        this.radius = 10;
        this.segments = 10;
        this.rotationSpeed = 1;

        this.geometry = new THREE.SphereGeometry(this.radius, this.segments, this.segments);
        this.material = new THREE.MeshPhongMaterial({
            color: 0x00007F,
            shading: THREE.FlatShading
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.name = 'sphere';

    }

    /**
     * @method
     * @name update
     * @description Triggered on every frame
     * @param {number} time - CURRENT_TIME
     * @param {number} delta - DELTA_TIME
     */
    update(time, delta) {

        this.mesh.rotation.x += this.rotationSpeed * delta;
        this.mesh.rotation.y += this.rotationSpeed * delta;
        this.mesh.rotation.z += this.rotationSpeed * delta;

    }

}
