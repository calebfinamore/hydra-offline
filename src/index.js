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
        a.setBins(10)
        a.setCutoff(1)
        a.setScale(5)
        a.setSmooth(.97)
        a.show()
        
        osc(4, 0.1, 0.8).color(1.04, 0, -1.1)
            .rotate(0.30, 0.1).pixelate(2, 20)
            .modulate(noise(2.5), () => 1.5 * Math.sin(0.08 * time))
            .out(o0);
    }

    function hydraSketch2() {
        // solid().out() clears canvas — do not remove
        solid().out();
        // Hydra Sketch goes below
        a.setBins(10)
        a.setCutoff(1)
        a.setScale(5)
        a.setSmooth(.97)
        a.show()

        osc(100, -0.0018, 0.17).diff(osc(20, 0.00008).rotate(Math.PI / 0.00003))
            .modulateScale(noise(1.5, () => -1 + a.fft[0] * .006,).modulateScale(osc(() => a.fft[0] * .05).rotate(() => Math.sin(time / 22))), 5)
            .color(11, 0.5, 0.4, 0.9, 0.2, 0.011, 5, 22, 0.5, -1).contrast(() => Math.pow((a.fft[9] * 10), 2))
            .add(src(o0).modulate(o0, .04), .6, .9)
            //.pixelate(0.4, 0.2, 0.1)
            .invert().brightness(0.0003, 2).contrast(0.5, 2, 0.1, 2).color(4, -2, 0.1)
            .modulateScale(osc(2), -0.2, 2, 1, 0.3)
            .posterize(200).rotate(1, 0.2, 0.01, 0.001)
            .color(22, -2, 0.5, 0.5, 0.0001, 0.1, 0.2, 8).contrast(0.18, 0.3, 0.1, 0.2, 0.03, 1).brightness(0.0001, -1, 10)
            .out()
    }

    function hydraSketch3() {
        // solid().out() clears canvas — do not remove
        solid().out();
        // Hydra sketch goes below
        a.setBins(10)
        a.setCutoff(1)
        a.setScale(5)
        a.setSmooth(.97)
        a.show()

        osc(100, 0.01, 1.4)
            .rotate(0, 0.1)
            .mult(osc(10, 0.1).modulate(osc(10).rotate(0, -0.1), 1))
            .color(() => a.fft[2] * 4, () => a.fft[4] * 4, () => a.fft[6] * 4)
            .out(o0)
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
            detectAudio: true,

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