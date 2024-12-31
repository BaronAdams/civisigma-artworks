import React from 'react'
import { Latex, Tailwind } from '@fileforge/react-print';
import "katex/dist/katex.min.css"
import * as math from 'mathjs'


function round_number(val: number, precision: number = 2) {
    return Math.round(val * Math.pow(10, precision)) / Math.pow(10, precision)
}

function calcul_Mp(L: number, d: number, f: number, ak: number, beta = 0) {
    let points = L / d
    let x: number[] = []
    let a: number[] = []
    for (let i = 1; i < points; i++) {
        x.push(i * d)
        a.push(i * d)
    }

    function Single_a_calculation(a: number, x: number[], L: number) {
        let Mp_arr: number[] = []
        for (let i = 0; i < x.length; i++) {
            let Mp = 0
            let value = 0
            if (a < x[i]) {
                value = (1 - a / L) * x[i] - (x[i] - a)
            }
            else {
                value = (1 - a / L) * x[i]
            }
            Mp = round_number(value);
            Mp_arr.push(Mp)
        }
        let headLines = "|c|"
        for (let i = 0; i < x.length; i++) {
            headLines += "c|"
        }
        const firstRow = ["x", ...x].join('&'); // Ligne des nombres
        const secondRow = ["M^{p}", ...Mp_arr].join('&'); // Ligne des résultats

        let str = (<div className='my-7'>
            <p>Pour <Latex>{String.raw`\hspace{0.1cm}a = ${a} m `}</Latex>:</p>
            <div className='katex-display'>
                <Latex>{`
                    \\begin{array}{${headLines}}
                    \\hline
                    ${firstRow} \\\\ \\hline
                    ${secondRow} \\\\ \\hline
                    \\end{array}
                    `}
                </Latex>
            </div>
        </div>)

        return { str, Mp_arr };
    }

    function y(x: number) {
        return Math.round(x * (L - x) * 4 * f / (L * L) * 100) / 100
    }

    function y_prime(x: number) {
        return Math.round((L - 2 * x) * 4 * f / (L * L) * 100) / 100
    }

    function calculateAngleFromTangent(tangentValue: number) {
        // Calculer l'angle en radians
        const angleInRadians = Math.atan(tangentValue);
        // Convertir l'angle en degrés
        const angleInDegrees = round_number(angleInRadians * (180 / Math.PI));
        return angleInDegrees;
    }

    function calcul_positions() {
        let pos_arr = []
        let Y_matrix = math.matrix()
        Y_matrix.resize([x.length, 1])

        let Gc_matrix = math.matrix()
        Gc_matrix.resize([x.length, x.length])

        let Gs_matrix = math.matrix()
        Gs_matrix.resize([x.length, x.length])

        let Gt_matrix = math.matrix()
        Gt_matrix.resize([x.length, 1])

        let Gn_matrix = math.matrix()
        Gn_matrix.resize([x.length, 1])

        let gamma_Tg_matrix = math.matrix()
        gamma_Tg_matrix.resize([x.length, x.length])

        let gamma_Td_matrix = math.matrix()
        gamma_Td_matrix.resize([x.length, x.length])


        for (let i = 0; i < x.length; i++) {
            let y_val = round_number(y(x[i]));
            Y_matrix.set([i, 0], y_val)

            let tan_val = round_number(y_prime(x[i]), 3);
            let angle = calculateAngleFromTangent(tan_val)
            let sin_val = round_number(Math.sin(Math.atan(tan_val)), 3);
            let cos_val = round_number(Math.cos(Math.atan(tan_val)), 3);
            Gt_matrix.set([i, 0], sin_val - Math.tan(beta) * cos_val)
            Gn_matrix.set([i, 0], cos_val + Math.tan(beta) * sin_val)

            pos_arr.push([x[i], y_val, tan_val, angle, sin_val, cos_val])
            for (let j = 0; j < x.length; j++) {
                if (i == j) {
                    Gc_matrix.set([i, j], cos_val)
                    Gs_matrix.set([i, j], sin_val)
                    gamma_Tg_matrix.set([i, j], 1)
                    gamma_Td_matrix.set([i, j], -1)
                }

                if (i - j == 1) gamma_Tg_matrix.set([i, j], -1)
                if (j - i == 1) gamma_Td_matrix.set([i, j], 1)

            }
        }

        const firstRow = ["x", "y", "\\tan(\\alpha_k)", "\\alpha_k", "\\sin(\\alpha_k)", "\\cos(\\alpha_k)"].join('&'); // Ligne des nombres

        let latex = "\\begin{array}{|" + "c|".repeat(pos_arr[0].length) + "}\n";
        latex += "\\hline\n"
        latex += firstRow + "\\\\ \\hline"

        // Parcourir les lignes du tableau
        pos_arr.forEach((row, rowIndex) => {
            latex += row.join(" & "); // Convertir chaque ligne en une ligne LaTeX avec des "&"
            if (rowIndex !== pos_arr.length - 1) {
                latex += " \\\\ \\hline"; // Ajouter "\\" pour séparer les lignes sauf la dernière
            }
        });
        latex += "\\\\ \\hline\n"
        // Fin de la structure LaTeX
        latex += "\n\\end{array}";

        let str = (<div className='my-7'>
            <p>Le calcul des positions sur l'arc nous donne le tableau suivant</p>
            <div className='katex-display'>
                <Latex>{`${latex} `}
                </Latex>
            </div>
        </div>)

        return { str, Y_matrix, Gc_matrix, Gs_matrix, Gt_matrix, Gn_matrix, gamma_Tg_matrix, gamma_Td_matrix }
    }


    let { str, Y_matrix, Gc_matrix, Gs_matrix, Gt_matrix, Gn_matrix, gamma_Tg_matrix, gamma_Td_matrix } = calcul_positions()

    let additionalComp = []
    additionalComp.push(str)
    additionalComp.push(<div className="my-8">
        <Latex>
            {String.raw`
                M^{p} = \begin{cases}
                (1 - \frac{a}{L})x - (x - a) & \text{si } a \leq x, \\
                (1 - \frac{a}{L})x & \text{si } a > x.
                \end{cases}
            `}
        </Latex>
    </div>)
    let Mp_matrix_output = math.matrix()
    Mp_matrix_output.resize([a.length, x.length])
    for (let i = 0; i < a.length; i++) {
        let { str, Mp_arr } = Single_a_calculation(a[i], x, L)
        additionalComp.push(str)
        for (let j = 0; j < x.length; j++) {
            Mp_matrix_output.set([i, j], Mp_arr[j])
        }
        // Mp_matrix_output = math.concat(Mp_matrix_output, math.matrix([Single_a_calculation(a[i], x, L).Mp_arr]), 0);
    }

    additionalComp.push(<div className='mt-3 mb-7'>
        <p>Lorsqu'on empile chaque ligne, on a donc la matrice suivante :</p>
        <div className="katex-display">
            <Latex>
                {String.raw`\mathcal{M}(M^{p}) = ${math.parse(`${Mp_matrix_output}`).toTex()}`}
            </Latex>
        </div>
    </div>)

    let theta_h = math.matrix()
    theta_h.resize([1, x.length])
    theta_h.set([0, x.indexOf(ak)], 1 / f)
    theta_h = theta_h.map((val, index, matrix) => round_number(val))

    let theta_M = math.add(math.identity(x.length, x.length), math.multiply(math.multiply(Y_matrix, -1), theta_h)) as math.Matrix
    theta_M = theta_M.map((val, index, matrix) => round_number(val))

    let theta_T = math.add(math.multiply(math.multiply(Gc_matrix, 1 / d), gamma_Tg_matrix), math.multiply(math.multiply(Gt_matrix, -1), theta_h)) as math.Matrix
    theta_T = theta_T.map((val, index, matrix) => round_number(val))

    let theta_N_g = math.add(math.multiply(Gs_matrix, gamma_Tg_matrix), math.multiply(Gn_matrix, theta_h)) as math.Matrix
    theta_N_g = theta_N_g.map((val, index, matrix) => round_number(val))

    let theta_N_d = math.add(math.multiply(Gs_matrix, gamma_Td_matrix), math.multiply(Gn_matrix, theta_h)) as math.Matrix
    theta_N_d = theta_N_d.map((val, index, matrix) => round_number(val))

    additionalComp.push(<div className='my-9'>
        <strong>La matrice d'influence de la poussée H est donnée par :</strong>
        <div className="katex-display">
            <Latex>
                {String.raw`\mathcal{M}(H) = \{\theta_H\}.\mathcal{M}(M^{p})`}
            </Latex>
        </div>
        <p>Avec
            <Latex>
                {String.raw`
                    \hspace{0.1cm}
                    \begin{aligned}
                    \{\theta_H\} & = \frac{1}{${f}} ${math.parse(`${math.matrix().resize([1, x.length]).set([0, x.indexOf(ak)], 1)}`).toTex()}
                               & = ${math.parse(`${theta_h}`).toTex()}
                    \end{aligned}
                    `}
            </Latex>
        </p>
        <p>Ce qui donne : </p>
        <div className="katex-display">
            <Latex>
                {String.raw`\mathcal{M}(H) = ${math.parse(`${math.multiply(theta_h, Mp_matrix_output).map((val, index, matrix) => round_number(val))}`).toTex()}`}
            </Latex>
        </div>
    </div>)

    additionalComp.push(<div className='my-9'>
        <strong>La matrice d'influence des moments est donnée par :</strong>
        <div className="katex-display mb-8">
            <Latex>
                {String.raw`
                \begin{aligned}
                \mathcal{M}(M) & = \mathcal{M}(M^{p}) - \{Y\}.\mathcal{M}(H) \\
                             & = \mathcal{M}(M^{p}) - \{Y\}.\{\theta_H\}.\mathcal{M}(M^{p}) \\
                             & = [I_{${x.length}} - \{Y\}.\{\theta_H\}].\mathcal{M}(M^{p}) \\
                             & = \{\theta_M\}.\mathcal{M}(M^{p})
                \end{aligned}
                `}
            </Latex>
        </div>
        <p className='mb-8'>Avec
            <Latex>
                {String.raw`
                \hspace{0.1cm}
                \{Y\} = ${math.parse(`${Y_matrix}`).toTex()}
                \hspace{0.1cm}
                \{\theta_H\}
                \hspace{0.1cm}
                `}
            </Latex>
            est donné plus haut
        </p>

        <p className='mb-8'>
            <Latex>
                {String.raw`
                \hspace{0.1cm}
                \begin{aligned}
                & \{\theta_M\} = I_{${x.length}} - \{Y\}.\{\theta_H\} \\
                & \{\theta_M\} = ${math.parse(`${theta_M}`).toTex()}
                \end{aligned}
                `}
            </Latex>
        </p>
        <p>Ce qui donne : </p>
        <div className="katex-display">
            <Latex>
                {String.raw`\mathcal{M}(M) = ${math.parse(`${math.multiply(theta_M, Mp_matrix_output).map((val, index, matrix) => round_number(val))}`).toTex()}`}
            </Latex>
        </div>
    </div>)

    additionalComp.push(<div className='my-9'>
        <strong>La matrice d'influence des efforts tranchants est donnée par :</strong>
        <div className="katex-display">
            <Latex>
                {String.raw`
                \begin{aligned}
                \mathcal{M}(T) & = \frac{1}{d}[G_c][\gamma_{T}^{g}]\mathcal{M}(M^{p}) - \{G_t\}[\theta_{H}]\mathcal{M}(M^{p}) \\
                             & = [\frac{1}{d}[G_c][\gamma_{T}^{g}] - \{G_t\}[\theta_{H}]].\mathcal{M}(M^{p}) \\
                             & = [\theta_T].\mathcal{M}(M^{p})
                \end{aligned}
                `}
            </Latex>
        </div>
        <p className='mb-8'>Avec
            <Latex>
                {String.raw`
                \hspace{0.1cm}
                [G_c] = ${math.parse(`${Gc_matrix}`).toTex()}
                `}
            </Latex>
        </p>
        <p className='mb-4'>Et
            <Latex>
                {String.raw`
                \hspace{0.1cm}
                \{G_t\} = ${math.parse(`${Gt_matrix}`).toTex()}
                \hspace{0.1cm}
                [\gamma_{T}^{g}] = ${math.parse(`${gamma_Tg_matrix}`).toTex()}
                `}
            </Latex>
        </p>
        <p className="mb-8">
            <Latex>
                {String.raw`
                \{\theta_H\}
                \hspace{0.1cm}
                `}
            </Latex>
            est donné plus haut
        </p>

        <p className="mb-8">
            <Latex>
                {String.raw`
                \hspace{0.1cm}
                \begin{aligned}
                & \{\theta_T\} = \frac{1}{d}[G_c][\gamma_{T}^{g}] - \{G_t\}[\theta_{H}] \\
                & \{\theta_T\} = ${math.parse(`${theta_T}`).toTex()}
                \end{aligned}
                `}
            </Latex>
        </p>
        <p>Ce qui donne : </p>
        <div className="katex-display">
            <Latex>
                {String.raw`\mathcal{M}(T) = ${math.parse(`${math.multiply(theta_T, Mp_matrix_output).map((val, index, matrix) => round_number(val))}`).toTex()}`}
            </Latex>
        </div>
    </div>)

    additionalComp.push(<div className='my-9'>
        <strong>La matrice d'influence des efforts normaux  :</strong>
        <div className="my-8">A gauche :
            <div className="katex-display">
                <Latex>
                    {String.raw`
                    \begin{aligned}
                    \mathcal{M}(N^g) & = [G_s][\gamma_{T}^{g}]\mathcal{M}(M^{p}) + \{G_N\}[\theta_{H}]\mathcal{M}(M^{p}) \\
                                & = [[G_s][\gamma_{T}^{g}] + \{G_N\}[\theta_{H}]].\mathcal{M}(M^{p}) \\
                                & = [\theta_N^g].\mathcal{M}(M^{p})
                    \end{aligned}
                    `}
                </Latex>
            </div>
        </div>
        <p className='mb-8'>Avec
            <Latex>
                {String.raw`
                \hspace{0.1cm}
                [G_s] = ${math.parse(`${Gs_matrix}`).toTex()}
                `}
            </Latex>
        </p>
        <p className='mb-4'>Et
            <Latex>
                {String.raw`
                \hspace{0.1cm}
                \{G_N\} = ${math.parse(`${Gn_matrix}`).toTex()}
                \hspace{0.1cm}
                [\gamma_{T}^{g}] = ${math.parse(`${gamma_Tg_matrix}`).toTex()}
                `}
            </Latex>
        </p>
        <p className="mb-8">
            <Latex>
                {String.raw`
                \{\theta_H\}
                \hspace{0.1cm}
                `}
            </Latex>
            est donné plus haut
        </p>

        <p className="mb-8">
            <Latex>
                {String.raw`
                \hspace{0.1cm}
                \begin{aligned}
                & [\theta_N^g] = [G_s][\gamma_{T}^{g}] + \{G_N\}[\theta_{H}] \\
                & [\theta_N^g] = ${math.parse(`${theta_N_g}`).toTex()}
                \end{aligned}
                `}
            </Latex>
        </p>
        <p>Ce qui donne : </p>
        <div className="katex-display">
            <Latex>
                {String.raw`\mathcal{M}(N^g) = ${math.parse(`${math.multiply(theta_N_g, Mp_matrix_output).map((val, index, matrix) => round_number(val))}`).toTex()}`}
            </Latex>
        </div>

        <div className="my-8">A droite :
            <div className="katex-display">
                <Latex>
                    {String.raw`
                    \begin{aligned}
                    \mathcal{M}(N^d) & = [G_s][\gamma_{T}^{d}]\mathcal{M}(M^{p}) + \{G_N\}[\theta_{H}]\mathcal{M}(M^{p}) \\
                                & = [[G_s][\gamma_{T}^{d}] + \{G_N\}[\theta_{H}]].\mathcal{M}(M^{p}) \\
                                & = [\theta_N^d].\mathcal{M}(M^{p})
                    \end{aligned}
                    `}
                </Latex>
            </div>
        </div>
        <p className='mb-4'>Avec
            <Latex>
                {String.raw`
                \hspace{0.1cm}
                [\gamma_{T}^{d}] = ${math.parse(`${gamma_Td_matrix}`).toTex()}
                `}
            </Latex>

        </p>
        <p className="mb-8">
            <Latex>
                {String.raw`
                \{G_N\},\hspace{0.1cm}[G_s]\hspace{0.1cm}et\hspace{0.1cm}
                \{\theta_H\}
                \hspace{0.1cm}
                `}
            </Latex>
            sont donnés plus haut
        </p>

        <p className="mb-8">
            <Latex>
                {String.raw`
                \hspace{0.1cm}
                \begin{aligned}
                & [\theta_N^d] = [G_s][\gamma_{T}^{d}] + \{G_N\}[\theta_{H}] \\
                & [\theta_N^d] = ${math.parse(`${theta_N_d}`).toTex()}
                \end{aligned}
                `}
            </Latex>
        </p>
        <p>Ce qui donne : </p>
        <div className="katex-display">
            <Latex>
                {String.raw`\mathcal{M}(N^d) = ${math.parse(`${math.multiply(theta_N_d, Mp_matrix_output).map((val, index, matrix) => round_number(val))}`).toTex()}`}
            </Latex>
        </div>
    </div>)


    const mainDiv = React.createElement(
        "div", // Le type d'élément
        { className: "main-container" }, // Les props
        ...additionalComp // Les enfants
    );

    return mainDiv;


}

const ThreeArticulatedIsostaticArc = () => {
    let L = 60
    let f = 5
    let P = 2
    let a = 12
    let d = 6

    return (
        <React.Fragment>
            <Tailwind>
                <div className="mb-8">
                    <div className='w-full flex justify-center'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 500 500"
                            width="500px"
                            height="500px"
                            className='w-[370px] h-[350px] scale-105'
                        >
                            <g
                                transform="matrix(1.225018, 0, 0, 1.233247, -87.876198, -34.138283)"
                                style={{}}
                            >
                                <path
                                    style={{
                                        fill: "rgb(216, 216, 216)",
                                        stroke: "rgb(0, 0, 0)",
                                        transformBox: "fill-box",
                                        transformOrigin: "50% 50%",
                                    }}
                                    transform="matrix(0, -1.044583, 1.011474, 0, -259.839072, -252.333434)"
                                    d="M 455 358.5 A 138 138 0 1 1 455 634.5 A 138 138 0 1 0 455 358.5 Z"
                                    bbox="crescent 455 496.5 138 180 1 1@6293fb72"
                                />
                                <ellipse
                                    style={{
                                        fill: "rgb(216, 216, 216)",
                                        stroke: "rgb(0, 0, 0)",
                                    }}
                                    cx={126.25}
                                    cy={321.203}
                                    rx={11.25}
                                    ry={10.833}
                                />
                                <ellipse
                                    style={{
                                        fill: "rgb(216, 216, 216)",
                                        stroke: "rgb(0, 0, 0)",
                                    }}
                                    cx={210.787}
                                    cy={184.104}
                                    rx={11.25}
                                    ry={10.833}
                                />
                                <ellipse
                                    style={{
                                        fill: "rgb(216, 216, 216)",
                                        stroke: "rgb(0, 0, 0)",
                                    }}
                                    cx={403.691}
                                    cy={324.783}
                                    rx={11.25}
                                    ry={10.833}
                                />
                                <text
                                    style={{
                                        fill: "rgb(51, 51, 51)",
                                        fontFamily: "Arial, sans-serif",
                                        fontSize: 14,
                                        whiteSpace: "pre",
                                    }}
                                    x={109.427}
                                    y={306.143}
                                >
                                    {"A"}
                                </text>
                                <text
                                    style={{
                                        fill: "rgb(51, 51, 51)",
                                        fontFamily: "Arial, sans-serif",
                                        fontSize: 14,
                                        whiteSpace: "pre",
                                    }}
                                    x={412.9}
                                    y={305.413}
                                >
                                    {"B"}
                                </text>
                                <path
                                    style={{
                                        fill: "rgb(255, 255, 255)",
                                        fillOpacity: 0,
                                        stroke: "rgb(0, 0, 0)",
                                    }}
                                    d="M 445.397 313.231 L 125.109 311.067 L 125.109 95.378"
                                />
                                <path
                                    d="M 125.082 85.92 L 129.803 95.623 L 120.361 95.623 L 125.082 85.92 Z"
                                    bbox="triangle 120.361 85.92 9.442 9.703 0.5 0 1@6da814f0"
                                    style={{
                                        stroke: "rgb(0, 0, 0)",
                                        fill: "rgb(14, 14, 14)",
                                    }}
                                />
                                <path
                                    d="M 196.852 87.676 L 201.573 97.379 L 192.131 97.379 L 196.852 87.676 Z"
                                    bbox="triangle 192.131 87.676 9.442 9.703 0.5 0 1@1c3a59cb"
                                    style={{
                                        stroke: "rgb(0, 0, 0)",
                                        fill: "rgb(14, 14, 14)",
                                        transformBox: "fill-box",
                                        transformOrigin: "50% 50%",
                                    }}
                                    transform="matrix(0, 1, -1, 0, 251.477383, 220.233711)"
                                />
                                <g>
                                    <path
                                        style={{
                                            fill: "rgb(216, 216, 216)",
                                            strokeWidth: "0.5px",
                                            stroke: "rgb(0, 0, 0)",
                                            transformBox: "fill-box",
                                            transformOrigin: "50% 50%",
                                        }}
                                        d="M 210.78 109.343 L 210.78 162.002"
                                        transform="matrix(1.000001, 0, 0, 1, -0.000177, 0)"
                                    />
                                    <path
                                        d="M -210.983 -163.55 L -208.466 -156.184 L -213.5 -156.184 L -210.983 -163.55 Z"
                                        bbox="triangle -213.5 -163.55 5.034 7.366 0.5 0 1@5fabf8b1"
                                        style={{
                                            stroke: "rgb(0, 0, 0)",
                                            fill: "rgb(14, 14, 14)",
                                            transformBox: "fill-box",
                                            transformOrigin: "50% 50%",
                                        }}
                                        transform="matrix(-1, 0, 0, -1, 421.966003, 319.734009)"
                                    />
                                </g>
                                <g
                                    transform="matrix(1.463428, 0, 0, 1.541106, -162.797653, -70.820557)"
                                    style={{}}
                                >
                                    <text
                                        style={{
                                            fill: "rgb(51, 51, 51)",
                                            fontFamily: "&quot",
                                            fontSize: 14,
                                            fontStyle: "italic",
                                            whiteSpace: "pre",
                                        }}
                                        x={260.965}
                                        y={141.002}
                                    >
                                        {"P"}
                                    </text>
                                    <path
                                        style={{
                                            fill: "rgb(216, 216, 216)",
                                            stroke: "rgb(0, 0, 0)",
                                        }}
                                        d="M 265.046 128.447 L 273.099 128.447"
                                    />
                                    <path
                                        d="M 111.872 43.201 L 113.512 46.934 L 110.231 46.934 L 111.872 43.201 Z"
                                        bbox="triangle 110.231 43.201 3.281 3.733 0.5 0 1@23dd4f26"
                                        style={{
                                            stroke: "rgb(0, 0, 0)",
                                            fill: "rgb(14, 14, 14)",
                                            transformBox: "fill-box",
                                            transformOrigin: "50% 50%",
                                        }}
                                        transform="matrix(0, 1, -1, 0, 162.828693, 83.051754)"
                                    />
                                </g>
                                <path
                                    style={{
                                        fill: "rgb(216, 216, 216)",
                                        stroke: "rgb(0, 0, 0)",
                                    }}
                                    d="M 124.717 344.486 L 405.437 345.988"
                                />
                                <path
                                    d="M 69.364 274.563 L 73.84 284.226 L 64.887 284.226 L 69.364 274.563 Z"
                                    bbox="triangle 64.887 274.563 8.953 9.663 0.5 0 1@3532c461"
                                    style={{
                                        stroke: "rgb(0, 0, 0)",
                                        fill: "rgb(14, 14, 14)",
                                        transformBox: "fill-box",
                                        transformOrigin: "50% 50%",
                                    }}
                                    transform="matrix(0, -1, 1, 0, 55.718124, 65.225521)"
                                />
                                <path
                                    d="M 400.53 340.067 L 405.006 349.73 L 396.053 349.73 L 400.53 340.067 Z"
                                    bbox="triangle 396.053 340.067 8.953 9.663 0.5 0 1@9d4721a9"
                                    style={{
                                        stroke: "rgb(0, 0, 0)",
                                        fill: "rgb(14, 14, 14)",
                                        transformOrigin: "400.53px 344.899px",
                                    }}
                                    transform="matrix(0, 1, -1, 0, 1.515533, 1.010342)"
                                />
                                <text
                                    style={{
                                        fill: "rgb(51, 51, 51)",
                                        fontFamily: "&quot",
                                        fontSize: 18,
                                        fontStyle: "italic",
                                        whiteSpace: "pre",
                                    }}
                                    x={262.744}
                                    y={365.051}
                                >
                                    {"L"}
                                </text>
                                <path
                                    style={{
                                        stroke: "rgb(0, 0, 0)",
                                        fill: "rgb(255, 255, 255)",
                                        fillOpacity: 0,
                                        strokeDasharray: 10,
                                        strokeWidth: "0.6px",
                                    }}
                                    d="M 199.865 311.791 L 199.445 188.157 L 125.213 188.157"
                                />
                                <text
                                    style={{
                                        fill: "rgb(51, 51, 51)",
                                        fontFamily: "&quot",
                                        fontSize: 20,
                                        fontStyle: "italic",
                                        whiteSpace: "pre",
                                    }}
                                    x={156.266}
                                    y={177.213}
                                >
                                    {"a"}
                                </text>
                                <text
                                    style={{
                                        fill: "rgb(51, 51, 51)",
                                        fontFamily: "Arial, sans-serif",
                                        fontSize: 14,
                                        whiteSpace: "pre",
                                    }}
                                    x={227.847}
                                    y={196.549}
                                >
                                    {"C"}
                                </text>
                                <g>
                                    <path
                                        style={{
                                            fill: "rgb(216, 216, 216)",
                                            stroke: "rgb(0, 0, 0)",
                                        }}
                                        d="M 166.469 305.343 L 166.469 318.15"
                                    />
                                    <text
                                        style={{
                                            fill: "rgb(51, 51, 51)",
                                            fontFamily: "&quot",
                                            fontSize: 19,
                                            fontStyle: "italic",
                                            whiteSpace: "pre",
                                        }}
                                        x={149.18}
                                        y={330}
                                        transform="matrix(0.78125, 0, 0, 0.777778, 27.614759, 68.40789)"
                                    >
                                        {"d"}
                                    </text>
                                </g>
                                <g transform="matrix(1, 0, 0, 1, 33.108852, 0.435643)">
                                    <path
                                        style={{
                                            fill: "rgb(216, 216, 216)",
                                            stroke: "rgb(0, 0, 0)",
                                        }}
                                        d="M 166.469 305.343 L 166.469 318.15"
                                    />
                                    <text
                                        style={{
                                            fill: "rgb(51, 51, 51)",
                                            fontFamily: "&quot",
                                            fontSize: 19,
                                            fontStyle: "italic",
                                            whiteSpace: "pre",
                                        }}
                                        x={149.18}
                                        y={330}
                                        transform="matrix(0.78125, 0, 0, 0.777778, 27.614759, 68.40789)"
                                    >
                                        {"d"}
                                    </text>
                                </g>
                                <g transform="matrix(1, 0, 0, 1, 64.718994, 0.436)">
                                    <path
                                        style={{
                                            fill: "rgb(216, 216, 216)",
                                            stroke: "rgb(0, 0, 0)",
                                        }}
                                        d="M 166.469 305.343 L 166.469 318.15"
                                    />
                                    <text
                                        style={{
                                            fill: "rgb(51, 51, 51)",
                                            fontFamily: "&quot",
                                            fontSize: 19,
                                            fontStyle: "italic",
                                            whiteSpace: "pre",
                                        }}
                                        x={149.18}
                                        y={330}
                                        transform="matrix(0.78125, 0, 0, 0.777778, 27.614759, 68.40789)"
                                    >
                                        {"d"}
                                    </text>
                                </g>
                                <text
                                    style={{
                                        fill: "rgb(51, 51, 51)",
                                        fontFamily: "&quot",
                                        fontSize: 19,
                                        fontStyle: "italic",
                                        whiteSpace: "pre",
                                    }}
                                    x={149.18}
                                    y={330}
                                    transform="matrix(0.78125, 0, 0, 0.777778, 264.537415, 68.843887)"
                                >
                                    {"d"}
                                </text>
                                <g transform="matrix(1, 0, 0, 1, 210.974503, 1.379582)">
                                    <path
                                        style={{
                                            fill: "rgb(216, 216, 216)",
                                            stroke: "rgb(0, 0, 0)",
                                        }}
                                        d="M 166.469 305.343 L 166.469 318.15"
                                    />
                                    <text
                                        style={{
                                            fill: "rgb(51, 51, 51)",
                                            fontFamily: "&quot",
                                            fontSize: 19,
                                            fontStyle: "italic",
                                            whiteSpace: "pre",
                                        }}
                                        x={149.18}
                                        y={330}
                                        transform="matrix(0.78125, 0, 0, 0.777778, 27.614759, 68.40789)"
                                    >
                                        {"d"}
                                    </text>
                                </g>
                                <g transform="matrix(1, 0, 0, 1, 185.026505, 1.38)">
                                    <path
                                        style={{
                                            fill: "rgb(216, 216, 216)",
                                            stroke: "rgb(0, 0, 0)",
                                        }}
                                        d="M 166.469 305.343 L 166.469 318.15"
                                    />
                                    <text
                                        style={{
                                            fill: "rgb(51, 51, 51)",
                                            fontFamily: "&quot",
                                            fontSize: 19,
                                            fontStyle: "italic",
                                            whiteSpace: "pre",
                                        }}
                                        x={149.18}
                                        y={330}
                                        transform="matrix(0.78125, 0, 0, 0.777778, 27.614759, 68.40789)"
                                    >
                                        {"d"}
                                    </text>
                                </g>
                                <g transform="matrix(1, 0, 0, 1, 94.441826, 0.907791)">
                                    <path
                                        style={{
                                            fill: "rgb(216, 216, 216)",
                                            stroke: "rgb(0, 0, 0)",
                                        }}
                                        d="M 166.469 305.343 L 166.469 318.15"
                                    />
                                    <text
                                        style={{
                                            fill: "rgb(51, 51, 51)",
                                            fontFamily: "&quot",
                                            fontSize: 19,
                                            fontStyle: "italic",
                                            whiteSpace: "pre",
                                        }}
                                        x={149.18}
                                        y={330}
                                        transform="matrix(0.78125, 0, 0, 0.777778, 27.614759, 68.40789)"
                                    >
                                        {"d"}
                                    </text>
                                </g>
                                <g>
                                    <path
                                        style={{
                                            fill: "rgb(216, 216, 216)",
                                            stroke: "rgb(0, 0, 0)",
                                        }}
                                        d="M 292.049 306.251 L 292.049 319.058"
                                    />
                                    <text
                                        style={{
                                            fill: "rgb(51, 51, 51)",
                                            fontFamily: "Arial",
                                            fontSize: 19,
                                            whiteSpace: "pre",
                                        }}
                                        transform="matrix(0.78125, 0, 0, 0.777778, 153.194962, 69.315887)"
                                        x={149.18}
                                        y={330}
                                    >
                                        {"...."}
                                    </text>
                                </g>
                                <g transform="matrix(1, 0, 0, 1, 28.779243, 0)">
                                    <path
                                        style={{
                                            fill: "rgb(216, 216, 216)",
                                            stroke: "rgb(0, 0, 0)",
                                        }}
                                        d="M 292.049 306.251 L 292.049 319.058"
                                    />
                                    <text
                                        style={{
                                            fill: "rgb(51, 51, 51)",
                                            fontFamily: "Arial",
                                            fontSize: 19,
                                            whiteSpace: "pre",
                                        }}
                                        transform="matrix(0.78125, 0, 0, 0.777778, 153.194962, 69.315887)"
                                        x={149.18}
                                        y={330}
                                    >
                                        {"...."}
                                    </text>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <p className='underline'>Paramètres :</p>
                    <p>
                        Longueur du support : <Latex>{String.raw`\hspace{0.1cm}L = ${L} m`}</Latex>
                    </p>
                    <p>
                        La flèche de l'arc : <Latex>{String.raw`\hspace{0.1cm}f = ${f} m`}</Latex>
                    </p>
                    <p>
                        Charge sur l'arc : <Latex>{String.raw`\hspace{0.1cm}P = ${P} t`}</Latex>
                    </p>
                    <p>
                        Position de la charge par rapport à A : <Latex>{String.raw`\hspace{0.1cm}a = ${a} m`}</Latex>
                    </p>
                    <p>
                        Pas de discrétisation : <Latex>{String.raw`\hspace{0.1cm}d = ${d} m`}</Latex>
                    </p>
                </div>
                <div className="mb-8">
                    <p className='underline'>Hypothèses :</p>
                    <p>
                        On considère des arcs dont <Latex>{String.raw`\hspace{0.1cm}\beta = 0`}</Latex>
                    </p>
                    <p>
                        Les arcs étudiés sont de type parabolique : <Latex>{String.raw`\hspace{0.1cm}y(x) = \frac{4f}{L^2} x(L-x)`}</Latex>
                    </p>
                </div>
                {calcul_Mp(L, d, f, a)}

            </Tailwind>
        </React.Fragment>
    );
}

export default ThreeArticulatedIsostaticArc


