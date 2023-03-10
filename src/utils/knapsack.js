const buildTable = (n, max) => {
    let K = new Array(n + 1);
    for (let i = 0; i < K.length; i++) {
        K[i] = new Array(max + 1);
        for (let j = 0; j < max + 1; j++) {
            K[i][j] = 0;
        }
    }

    return K;
}

const fillTable = (n, max, values, weights) => {
    let K = buildTable(n, max);

    for (let i = 0; i <= n; i++) {
        for (let w = 0; w <= max; w++) {
            if (i == 0 || w == 0)
                K[i][w] = 0;
            else if (weights[i - 1] <= w)
                K[i][w] = Math.max(values[i - 1] +
                    K[i - 1][w - weights[i - 1]],
                    K[i - 1][w]);
            else
                K[i][w] = K[i - 1][w];
        }
    }

    return K;
}

const findSolution = (max, weights, values, n, K, result) => {
    const solution = [];
    let res = result;
    let w = max;

    for (let i = n; i > 0 && res > 0; i--) {
        if (res == K[i - 1][w]) continue;
        else {
            solution.push(weights[i - 1]);

            res = res - values[i - 1];
            w = w - weights[i - 1];
        }
    }

    return solution;
}

export const knapsack = (max, items) => {
    const n = items.length;
    const values = [];
    const weights = [];
    items.forEach(item => {
        values.push(item.price);
        weights.push(item.space);
    });

    const table = fillTable(n, max, values, weights);

    const result = table[n][max];
    const solution = findSolution(max, weights, values, n, table, result);
    const solutionItems = solution.map(weight => items.find(item => item.space == weight));

    return { result, solutionItems }
}
