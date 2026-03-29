document.addEventListener("DOMContentLoaded", function () {

    let upload = document.getElementById("upload");
    let preview = document.getElementById("preview");
    let analyzeBtn = document.getElementById("analyzeBtn");

    // 🔒 Disable button initially
    if (analyzeBtn) analyzeBtn.disabled = true;

    // 📤 Image upload + preview
    if (upload && preview) {
        upload.addEventListener("change", function (e) {
            let file = e.target.files[0];

            if (file) {
                preview.src = URL.createObjectURL(file);
                preview.style.display = "block";

                // ✅ Enable diagnose button
                if (analyzeBtn) analyzeBtn.disabled = false;
            }
        });
    }

    // 🧠 Main analyze function
    window.analyze = function () {

        let blur = document.getElementById("blur").checked;
        let motion = document.getElementById("motion").checked;
        let distortion = document.getElementById("distortion").checked;
        let noise = document.getElementById("noise").checked;
        let dark = document.getElementById("dark").checked;

        let results = [];

        // 🔢 Base score
        let score = 0;
        if (blur) score += 20;
        if (motion) score += 25;
        if (distortion) score += 25;
        if (noise) score += 15;
        if (dark) score += 15;

        // 🎯 Confidence helper
        function getConfidence(base) {
            return Math.min(100, base + Math.floor(Math.random() * 10));
        }

        // 🔹 Rules
        if (blur && motion) {
            results.push({
                name: "Motion Artifact",
                confidence: getConfidence(score),
                suggestion: "Reduce patient movement during scan"
            });
        }

        if (distortion && dark) {
            results.push({
                name: "B0 Inhomogeneity Effects",
                confidence: getConfidence(score),
                suggestion: "Improve magnetic field uniformity"
            });
        }

        if (noise) {
            results.push({
                name: "Low Signal-to-Noise Ratio (Low SNR)",
                confidence: getConfidence(score - 10),
                suggestion: "Increase signal strength / adjust parameters"
            });
        }

        if (blur && distortion) {
            results.push({
                name: "Susceptibility Artifact",
                confidence: getConfidence(score),
                suggestion: "Check metal objects / field distortion"
            });
        }

        if (motion && noise) {
            results.push({
                name: "Eddy Current Artifact",
                confidence: getConfidence(score),
                suggestion: "Adjust gradient settings"
            });
        }

        if (blur && dark) {
            results.push({
                name: "RF Interference",
                confidence: getConfidence(score - 5),
                suggestion: "Check RF shielding"
            });
        }

        if (distortion && noise) {
            results.push({
                name: "Coil Sensitivity Variation",
                confidence: getConfidence(score),
                suggestion: "Recalibrate coil sensitivity"
            });
        }

        if (motion && blur && distortion) {
            results.push({
                name: "Severe Motion + Susceptibility Artifact",
                confidence: getConfidence(score + 5),
                suggestion: "Minimize motion + remove distortion sources"
            });
        }

        if (dark && distortion && noise) {
            results.push({
                name: "Parallel Imaging Artifact",
                confidence: getConfidence(score),
                suggestion: "Adjust parallel imaging factors"
            });
        }

        if (motion && distortion) {
            results.push({
                name: "Ghosting Artifact",
                confidence: getConfidence(score),
                suggestion: "Check phase encoding direction"
            });
        }

        if (noise && dark) {
            results.push({
                name: "Signal Dropout Artifact",
                confidence: getConfidence(score),
                suggestion: "Improve signal uniformity"
            });
        }

        if (blur && noise) {
            results.push({
                name: "Gibbs Ringing Artifact",
                confidence: getConfidence(score - 5),
                suggestion: "Increase resolution"
            });
        }

        if (distortion) {
            results.push({
                name: "Chemical Shift Artifact",
                confidence: getConfidence(score - 5),
                suggestion: "Adjust frequency encoding"
            });
        }

        if (results.length === 0) {
            results.push({
                name: "No clear artifact detected",
                confidence: 50,
                suggestion: "Try selecting more symptoms"
            });
        }

        // 📊 Sort by confidence
        results.sort((a, b) => b.confidence - a.confidence);

        // 🖥️ Output UI
        let output = "<h3 style='margin-bottom:15px;'>Diagnosis Result</h3>";

        results.forEach(r => {
            output += `
            <div style="margin-bottom:20px; padding:12px; border:1px solid #e0e0e0; border-radius:6px; background:#fafafa;">
                
                <div style="font-weight:600; font-size:15px; margin-bottom:8px;">
                    ${r.name}
                </div>

                <div style="background:#e6e6e6; width:100%; height:6px; border-radius:3px; overflow:hidden;">
                    <div style="background:#4a6fa5; width:${r.confidence}%; height:6px;"></div>
                </div>

                <div style="font-size:12px; color:#555; margin-top:6px;">
                    Confidence: ${r.confidence}%
                </div>

                <div style="font-size:13px; margin-top:10px;">
                    ${r.suggestion}
                </div>

            </div>
            `;
        });

        document.getElementById("result").innerHTML = output;
    };

});