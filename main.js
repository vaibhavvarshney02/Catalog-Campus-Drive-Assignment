const fs = require('fs');

function decodeYValues(jsonData) {
    const points = [];
    Object.keys(jsonData).forEach((key) => {
        if (!isNaN(key)) {
            const x = parseInt(key);  
            const y = parseInt(jsonData[key].value, parseInt(jsonData[key].base));
            points.push({ x, y });
        }
    });
    return points;
}

function lagrangeInterpolation(points) {
    const k = points.length;
    let constantTerm = 0;

    for (let i = 0; i < k; i++) {
        let term = points[i].y;
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                term *= -points[j].x / (points[i].x - points[j].x);
            }
        }
        constantTerm += term;
    }

    return Math.round(constantTerm);
}

function main() {
    const data1 = fs.readFileSync('testcase1.json');
    const data2 = fs.readFileSync('testcase2.json');
    const jsonData1 = JSON.parse(data1);
    const jsonData2 = JSON.parse(data2);

    const points1 = decodeYValues(jsonData1);
    const points2 = decodeYValues(jsonData2);

    
    const secret1 = lagrangeInterpolation(points1);
    const secret2 = lagrangeInterpolation(points2);

    console.log(`Secret for Test Case 1: ${secret1}`);
    console.log(`Secret for Test Case 2: ${secret2}`);
}

main();
