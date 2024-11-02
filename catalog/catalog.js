const fs = require('fs');

function decodeBaseValue(base, encodedValue) {
    return parseInt(encodedValue, base);
}

function performLagrangeInterpolation(dataPoints) {
    let polynomialConstant = 0;

    for (let i = 0; i < dataPoints.length; i++) {
        const [xValue, yValue] = dataPoints[i];
        let termProduct = yValue;

        for (let j = 0; j < dataPoints.length; j++) {
            if (i !== j) {
                const [xOther] = dataPoints[j];
                termProduct *= (0 - xOther) / (xValue - xOther);
            }
        }

        polynomialConstant += termProduct;
    }

    return polynomialConstant;
}

function handleTestCase(filePath) {
    fs.readFile(filePath, 'utf8', (err, fileData) => {
        if (err) {
            console.error("Error reading the file:", err);
            return;
        }

        const jsonData = JSON.parse(fileData);
        const requiredPoints = jsonData.keys.k;

        const dataPoints = [];

        for (let idx = 1; idx <= jsonData.keys.n; idx++) {
            const root = jsonData[idx.toString()]; 
            if (root) { 
                const xCoord = idx; 
                const yCoord = decodeBaseValue(root.base, root.value); 
                dataPoints.push([xCoord, yCoord]);
            }
        }

        const selectedPoints = dataPoints.slice(0, requiredPoints);
        const secretValue = performLagrangeInterpolation(selectedPoints);

        console.log(`The constant term (c) of the polynomial from ${filePath} is:`, secretValue);
    });
}

handleTestCase('testcase1.json');
handleTestCase('testcase2.json');
