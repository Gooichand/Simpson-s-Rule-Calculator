function calculateSimpsonsRule() {
    // Get input values
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const n = parseInt(document.getElementById('n').value);
    const functionStr = document.getElementById('function').value;

    // Validate input
    if (n % 2 !== 0) {
        alert("Number of strips (n) must be even!");
        return;
    }

    // Calculate Δx
    const deltaX = (b - a) / n;

    // Create the function from input string
    const func = new Function('x', 'return ' + functionStr);

    // Calculate Simpson's Rule
    let sum = 0;
    let resultHTML = `
        <div class="formula-section">
            <h4 class="explanation">Simpson's Rule Formula:</h4>
            <div class="formula">
                ∫ₐᵇ f(x) dx ≈ (Δx / 3) [f(x₀) + 4f(x₁) + 2f(x₂) + 4f(x₃) + ... + 4f(xₙ₋₁) + f(xₙ)]
            </div>
        </div>
        
        <div class="step-by-step">
            <h4>Step-by-Step Calculation:</h4>
            <p class="explanation">Step 1: Calculate Δx (Width of each subinterval)</p>
            <p>Δx = (b - a) / n = ${deltaX}</p>
            <p class="explanation">Step 2: Determine the number of intervals</p>
            <p>Number of intervals (n) = ${n}</p>
        </div>
    `;

    // Coefficients pattern: 1, 4, 2, 4, 2, ..., 4, 1
    for (let i = 0; i <= n; i++) {
        const x = a + i * deltaX;
        const coefficient = i === 0 || i === n ? 1 : (i % 2 === 1 ? 4 : 2);
        const y = func(x);
        
        sum += coefficient * y;
        
        resultHTML += `
            <div class="step-by-step">
                <p class="explanation">Step ${i + 1}: Calculate f(x${i}) and apply coefficient</p>
                <p>x${i} = ${x.toFixed(4)}</p>
                <p>f(x${i}) = ${y.toFixed(4)}</p>
                <p>Coefficient: ${coefficient}</p>
        <p>Contribution: ${(coefficient * y).toFixed(4)}</p>
                <hr>
            </div>
        `;
    }

    // Final calculation
    const finalResult = (deltaX / 3) * sum;

    // Display results
    const resultDiv = document.getElementById('result');
    resultHTML += `
        <div class="step-by-step">
            <p class="explanation">Final Step: Calculate the approximate integral</p>
            <p>Sum of contributions = ${sum.toFixed(4)}</p>
            <p>Approximate Integral ≈ (Δx / 3) * Sum = ${finalResult.toFixed(4)}</p>
        </div>
    `;
    
    resultDiv.innerHTML = `
        <h3>Final Result:</h3>
        <p style="font-size: 1.2em; color: #4CAF50; margin-bottom: 20px;">
            Approximate Integral ≈ ${finalResult.toFixed(4)}
        </p>
        ${resultHTML}
    `;
    resultDiv.style.display = 'block';
}
