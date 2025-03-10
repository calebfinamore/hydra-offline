/**
 * @file index.js
 * @description This script initializes Hydra sketches and manages switching between them on a webpage.
 * @author Caleb Finamore
 */

// makes sure page is loaded before triggering Hydra
document.addEventListener('DOMContentLoaded', (event) => {
    function hydraSketch1() {
        // solid().out() clears canvas — do not remove
        solid().out();
        // Hydra Sketch goes below
        osc(4, 0.1, 0.8).color(1.04, 0, -1.1)
            .rotate(0.30, 0.1).pixelate(2, 20)
            .modulate(noise(2.5), () => 1.5 * Math.sin(0.08 * time))
            .out(o0);
    }

    function hydraSketch2() {
        // solid().out() clears canvas — do not remove
        solid().out();
        // Hydra Sketch goes below
        shape(3).add(osc(1, 0.5, 1), 1)
            .add(o1, () => (Math.sin(time / 4) * 0.7 + 0.1))
            .scale(() => Math.sin(time / 16)).rotate(0, -0.1)
            .out(o1);

        src(o1)
            .rotate(0, 0.1)
            .out();
    }

    function hydraSketch3() {
        // solid().out() clears canvas — do not remove
        solid().out();
        // Hydra sketch goes below
        osc(15, 0.1, 0.8)
            .rotate(0, 0.1)
            .kaleid()
            .color(-1, 1)
            .out();
    }

    // initializes hydra, calls patches, and manages switching
    function hydraRunner() {
        // set canvas size to adapt to display window size
        const myCanvas = document.getElementById("canvas");
        myCanvas.width = window.innerWidth;
        myCanvas.height = window.innerHeight;

        // create a new Hydra Synth instance
        var hydra = new Hydra({
            canvas: myCanvas,
            detectAudio: false,

        });

        // switches between Hydra sketches
        // to add another sketch, create a new function hydraSketch[n]
        // then update the switch statement here and the modulo statement below
        function hydraSwitcher(scriptIndex) {
            switch (scriptIndex) {
                case 1:
                    hydraSketch1();
                    break;
                case 2:
                    hydraSketch2();
                    break;
                case 3:
                    hydraSketch3();
                    break;
                default:
                    hydraSketch1();
            }
        }

        // starts by displaying hydraSketch1
        let currentScript = 1;
        hydraSwitcher(currentScript);

        myCanvas.addEventListener("click", () => {
            // set modulo value to number of hydraSketches to cycle through properly
            currentScript = (currentScript % 3) + 1;
            hydraSwitcher(currentScript);
        });
    }

    hydraRunner();
});