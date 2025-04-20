/**
 * @file index.js
 * @description This script initializes Hydra sketches and manages switching between them on a webpage.
 * @author Caleb Finamore
 */

// makes sure page is loaded before triggering Hydra
document.addEventListener('DOMContentLoaded', (event) => {
    // Warm Lightning
    function hydraSketch1() {
        // solid().out() clears canvas — do not remove
        solid().out();
        // Hydra Sketch goes below
        a.setBins(5)
        a.setCutoff(1)
        a.setScale(5)
        a.setSmooth(.97)
        a.show()

        osc(100, -0.0018, 0.7).diff(osc(20, 0.00008).rotate(Math.PI / 0.00003))
            .modulateScale(noise(1.5, () => -1 + a.fft[2] * .006,).modulateScale(osc(() => a.fft[0] * .05).rotate(() => Math.sin(time / 22))), 5)
            .color(11, 0.5, 0.4).contrast(() => Math.pow((a.fft[4] * 10), 2))
            .add(src(o0).modulate(o0, .04), .6, .9)
            .invert().contrast(0.5).color(4, -2, 0.1)
            .modulateScale(osc(2), -0.2, 2)
            .posterize(200).rotate(1, 0.2, 0.01)
            .color(22, -2, 0.5).contrast(0.2)
            .out()
    }

    // Kaleidescope
    function hydraSketch2() {
        // solid().out() clears canvas — do not remove
        solid().out();
        // Hydra Sketch goes below
        a.setBins(5)
        a.setCutoff(1)
        a.setScale(5)
        a.setSmooth(.97)
        a.show()

        let prevKick = 0;
        let prevSnare = 0;
        let prevHarmonic = 0;

        let smoothedKick = () => {
            prevKick = prevKick * 0.9 + a.fft[0] * 0.1;
            return prevKick;
        };

        let smoothedSnare = () => {
            prevSnare = prevSnare * 0.9 + a.fft[3] * 0.1;
            return prevSnare / 0.5;
        };

        let smoothedHarmonic = () => {
            prevHarmonic = prevHarmonic * 0.9 + a.fft[4] * 0.1;
            return prevHarmonic;
        };

        voronoi(5, -0.1, 5)
            .add(osc(1, () => 0.01 * smoothedSnare(), .1))
            .kaleid(21)
            .rotate(() => time * .4 + smoothedKick() * 3) // :repeat: gentle rotation added here


            .color(0.8, 0.1, 0.2)
            .contrast()
            .scale((() => Math.sin(time) + 1 * 1.5), 1, 2)
            .colorama(2)
            .saturate(0.6)
            .contrast(0.7)
            .out()
    }

    // Blue blobs
    function hydraSketch3() {
        // solid().out() clears canvas — do not remove
        solid().out();
        // Hydra sketch goes below
        a.setBins(5)
        a.setCutoff(1)
        a.setScale(5)
        a.setSmooth(0.7)
        a.show()

        let prevKick = 0;
        let prevSnare = 0;

        let smoothedKick = () => {
            prevKick = prevKick * 0.9 + a.fft[0] * 0.1;
            return prevKick;
        };

        let smoothedSnare = () => {
            prevSnare = prevSnare * 0.9 + a.fft[4] * 0.1;
            return prevSnare;
        };

        speed = 0.3

        shape(20, 0.2, 0.3)
            .color(0.5, 0.8, 50)
            .scale(() => Math.sin(time) + 1 + smoothedKick() * 0.5) // kicks = size pulse
            .repeat(() => Math.sin(time) * 10 + smoothedSnare() * 5) // snares = grid pulse
            .modulateRotate(o0)
            .scale(() => Math.sin(time) + 1 * 1.5) // still has built-in liveness
            .modulate(noise(2, 2))
            .rotate(1, 0.2)
            .out(o0)
    }

    // Peach Fuzz
    function hydraSketch4() {
        solid().out();

        a.setBins(5)
        a.setSmooth(0.5)
        a.setCutoff(1)
        a.show()


        let prevKick = 0, prevSnare = 0, prevHarm = 0;

        // Compressor-style smoothing (fast attack, slow release)
        let smoothedKick = () => {
            let v = a.fft[0]
            prevKick = v > prevKick ? v : prevKick * 0.95
            return prevKick
        }

        let smoothedSnare = () => {
            let v = a.fft[3]
            prevSnare = v > prevSnare ? v : prevSnare * 0.95
            return prevSnare
        }

        let smoothedHarm = () => {
            let v = a.fft[4]
            prevHarm = v > prevHarm ? v : prevHarm * 0.95
            return prevHarm
        }

        // Gate (returns 1 if above threshold, else 0)
        let snareGate = () => a.fft[3] > 0.2 ? 1 : 0
        let kickGate = () => a.fft[0] > 0.15 ? 1 : 0


        // peach base
        osc(18, 0.1, 0)
            .color(1.2, 0.8, 0.9)
            .mult(osc(20, 0.01, 0))
            .repeat(2, 20)
            .rotate(0.5)
            .modulate(o1)
            .scale(1, () => smoothedKick() * 0.4 + 1.8)
            .diff(o1)
            .rotate(() => smoothedSnare() * 0.1) // full-scene shake on snare
            .out(o0)

        // Mint mod layer
        osc(20, 0.2, 0)
            .color(0.6, 1.0, 0.9)
            .mult(osc(40))
            .modulateRotate(o0, () => 0.2 + smoothedHarm() * 5)
            .rotate(() => 0.2 + smoothedSnare() * 2)
            .brightness(() => 0.05 + smoothedHarm() * 0.1)
            .contrast(1.2)
            .out(o1)
    }

    // eyeball
    function hydraSketch5() {
        solid().out();

        a.setBins(5)
        a.setCutoff(1)
        a.setScale(6)
        a.setSmooth(0.5)
        a.show()

        // Smoothed FFT values
        let prevKick = 0;
        let prevSnare = 0;
        let prevHarmonic = 0;

        let smoothedKick = () => {
            prevKick = prevKick * 0.9 + a.fft[0] * 0.1;
            return prevKick;
        };

        let smoothedSnare = () => {
            prevSnare = prevSnare * 0.6 + a.fft[3] * 0.4;
            return prevSnare;
        };

        let smoothedHarmonic = () => {
            prevHarmonic = prevHarmonic * 0.9 + a.fft[4] * 0.1;
            return prevHarmonic;
        };

        // Smoothed snare saturation envelope (longer release)
        let snareSaturation = 0;
        setInterval(() => {
            snareSaturation = snareSaturation * 0.95 + a.fft[3] * 0.05;
        }, 16); // 60fps

        // Kick-driven growth offset with cooldown
        let growth = 0;
        let kickThreshold = 0.5;
        let kickCooldown = 0;
        let kickCooldownDuration = 500; // in ms

        setInterval(() => {
            const now = Date.now();
            const kick = a.fft[0];
            const slope = Math.cos(time / 6.2); // Direction of sine motion

            // Only trigger if above threshold and cooldown has expired
            if (kick > kickThreshold && now > kickCooldown) {
                growth += Math.sign(slope) * kick * 0.01;
                kickCooldown = now + kickCooldownDuration;
            }

            // Optional decay
            growth *= 0.9995;
        }, 16);

        // Visuals
        noise(6, 0.05)
            .mult(osc(9, 0, () => Math.sin(time / 1.5) + 2))
            .mult(
                noise(9, 0.03).brightness(1.2).contrast(2)
                    .mult(osc(9, 0, () => Math.sin(time / 3) + 13))
            )
            .diff(
                noise(12, 0.03).brightness(0.1).contrast(1.1)
                    .mult(osc(9, 0, () => Math.sin(time / 5) + 13))
                    .rotate(() => time / 33)
            )
            .diff(
                noise(12, 0.03).brightness(0.1).contrast(1.1)
                    .mult(osc(9, 0, () => Math.sin(time / 5) + 13))
                    .rotate(() => time / 33)
            )
            .scale(() => 0.2 + growth)
            .modulateScale(
                osc(3, 0, 0)
                    .mult(osc(3, 0, 0).rotate(Math.PI / 2))
                    .rotate(() => time / 25)
                    .scale(0.39)
                    .scale(1, 0.6, 1)
                    .invert(),
                () => Math.sin(time / 5.3) * 1.5 + 3 + smoothedKick() * 0.2
            )
            .mult(shape(100, 0.9, 0.3).scale(0.8, 1, 1))
            .saturate(() => 0.02 + snareSaturation * 6) // longer-release saturation
            .hue(() => smoothedHarmonic() * 4)
            .out()
    }

    // night lights
    function hydraSketch6() {
        a.setBins(5)
        a.setCutoff(1)
        a.setScale(5)
        a.setSmooth(0.97)
        a.show()

        osc(100, 0.01, 1.4)
            .rotate(0, 0.1)
            .mult(osc(10, 0.1).modulate(osc(10).rotate(0, -0.1), 1))
            .color(() => a.fft[0] * 4, () => a.fft[2] * 4, () => a.fft[4] * 4)
            .out(o0)

    }
    // initializes hydra, calls patches, and manages switching
    function hydraRunner() {
        // set canvas size to adapt to display window size
        const myCanvas = document.getElementById("canvas");
        let hydra;
        let isInitialClick = true; // Track if it's the first click

        function resizeCanvas() {
            myCanvas.width = window.innerWidth;
            myCanvas.height = window.innerHeight;

            // Reinitialize Hydra instance to adapt to new canvas size
            hydra = new Hydra({
                canvas: myCanvas,
                detectAudio: true,
            });
        }

        // Automatically resize canvas on window resize
        window.addEventListener("resize", () => {
            resizeCanvas();
        });
        resizeCanvas(); // Initial resize to fullscreen

        // Request fullscreen on user interaction
        myCanvas.addEventListener("click", () => {
            if (isInitialClick) {
                // On the first click, load the first patch and enter fullscreen
                isInitialClick = false;
                if (myCanvas.requestFullscreen) {
                    myCanvas.requestFullscreen().then(() => {
                        setTimeout(() => {
                            resizeCanvas();
                            hydraSketch1(); // Load the first patch
                        }, 100); // Add slight delay
                    });
                } else if (myCanvas.webkitRequestFullscreen) { // Safari compatibility
                    myCanvas.webkitRequestFullscreen();
                    setTimeout(() => {
                        resizeCanvas();
                        hydraSketch1(); // Load the first patch
                    }, 100);
                } else if (myCanvas.msRequestFullscreen) { // IE/Edge compatibility
                    myCanvas.msRequestFullscreen();
                    setTimeout(() => {
                        resizeCanvas();
                        hydraSketch1(); // Load the first patch
                    }, 100);
                }
            } else {
                // After the first click, switch between all 6 patches
                currentScript = (currentScript % 6) + 1; // Rotate between patches 1 to 6
                hydraSwitcher(currentScript);
            }
        }, { once: false }); // Allow multiple clicks for switching patches

        // switches between Hydra sketches
        function hydraSwitcher(scriptIndex) {
            resizeCanvas(); // Resize canvas and update Hydra instance every time a patch is switched
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
                case 4:
                    hydraSketch4();
                    break;
                case 5:
                    hydraSketch5();
                    break;
                case 6:
                    hydraSketch6();
                    break;
                default:
                    hydraSketch1();
            }
        }

        // Start with an empty canvas
        solid().out();

        // Initialize the script index for rotation
        let currentScript = 1; // Start rotation from the first patch
    }

    hydraRunner();
});