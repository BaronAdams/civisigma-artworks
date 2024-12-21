"use client"

import { MathJax, MathJaxContext } from "better-react-mathjax";
import * as math from 'mathjs'

const MathComponent = () => {
  let matrix1 = math.matrix([[1,2],[3,4]])
  let matrix2 = math.matrix([[5,6],[7,8]])
  let pmatrix = math.multiply(matrix1,matrix2)
  let gamma_Tg = math.matrix([
    [1, 0, 0, 0,0 ],
    [-1, 1, 0, 0,0],
    [0, -1, 1, 0,0],
    [0, 0, -1, 1,0],
    [0, 0, 0, -1,0]
])

let gamma_Td = math.matrix([
    [-1, 1, 0, 0, 0 ],
    [0,-1, 1, 0, 0,],
    [0,0, -1, 1, 0],
    [0,0, 0, -1, 1],
    [0,0, 0, 0, -1]
])
  return (
    <div>
        <MathJaxContext>
            <MathJax>
                {`\\(${math.parse(`${pmatrix}`).toTex()}\\)`}
            </MathJax>
            <MathJax>
                {`\\(\\gamma_{T}^{d} = ${math.parse(`${gamma_Td}`).toTex()}\\)`}
            </MathJax>
            <MathJax className="mt-4">
                {`\\(\\gamma_{T}^{g} = ${math.parse(`${gamma_Tg}`).toTex()}\\)`}
            </MathJax>
        </MathJaxContext>
    </div>
  )
}

export default MathComponent