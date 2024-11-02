const fs = require('fs');

function decodeValue(base, value) {
    return parseInt(value, base);
}

function lagrangeInterpolation(points) {
    let totalSum = 0;

    for (let i = 0; i < points.length; i++) {
        const [x_i, y_i] = points[i];
        let product = y_i;

        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                const [x_j] = points[j];
                product *= (0 - x_j) / (x_i - x_j);
            }
        }

        totalSum += product;
    }

    return totalSum;
}

function processTestCase(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading the file:", err);
            return;
        }

        const jsonData = JSON.parse(data);
        const k = jsonData.keys.k;

        const points = [];

        for (let i = 1; i <= jsonData.keys.n; i++) {
            const root = jsonData[i.toString()]; 
            if (root) { 
                const x = i; 
                const y = decodeValue(root.base, root.value); 
                points.push([x, y]);
            }
        }

        const kPoints = points.slice(0, k);
        const secretCode = lagrangeInterpolation(kPoints);

        console.log(`The constant term (c) of the polynomial from ${filePath} is:`, secretCode);
    });
}


processTestCase('sampletestcase.json');
processTestCase('secondtestcase.json');
