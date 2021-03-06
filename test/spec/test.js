/* global assert, expect, describe, it */
/* eslint "no-unused-expressions": 0 */

(function () {
    'use strict';

    describe('homepage', function () {
        it('should have h1', function () {
            let title = document.getElementsByTagName('h1')[0];
            assert.equal('konquest', title.innerHTML);
        });
        it('should have map', function () {
            let map = document.getElementById('map');
            expect(map).to.exist;
        });
        it('should not have singularity', function () {
            let singularity = document.getElementsByClassName('singularity');
            expect(singularity.length).to.equal(0);
        });
        it('should have universe', function () {
            let universe = document.getElementsByClassName('universe');
            expect(universe).to.exist;
        });
        it('should have planets', function () {
            let planets = document.getElementsByClassName('planet');
            expect(planets.length).to.be.at.least(1);
        });
    }); // homepage

})();
