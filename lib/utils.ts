import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as math from 'mathjs'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hyperstatic_encast_calculation(f:number, P:number, L:number, a:number, d:number){
  let n = L/d
  let ak = []
  let xk = []
  let MVa = math.zeros(1,n)
  let MHa = math.zeros(1,n)
  let MMa = math.zeros(1,n)
  let Y = math.zeros(n,1)
  let X = math.zeros(n,1)
  let m_Mp = math.zeros(n)

  for (let i = 0; i <= n; i++) {
    ak.push(i*d)
    xk.push(i*d)
  }
  for (const a of ak) {
    let phi = a/L
    let X1 = (phi**2 - 2*phi**3 + phi**4)*(15 * L)/(4*f)
    let X2 = -3*phi**2 + 2*phi**3
    let X3 = 0.5 * L * phi**2
    let LMa = X3 - 0.5 * X2 * L + (2/3)*(X1*f) - a
    let LVa = 1 + X2
    let LHa = X1
    // @ts-ignore
    MMa.set([0,ak.indexOf(a)],LMa) /*[ak.indexOf(a)] = f*/
    // Va = np.append(Va,[[LVa]], axis=1)
    // Ha = np.append(Ha,[[LHa]], axis=1)
    // Y = np.concatenate((np.array([[a*(L - a)*4*f/L**2]]),Y), axis=0)
    // X = np.concatenate((np.array([[a]]),X), axis=0)
    // for x in xk: 
    //     if a <= x :
    //         m_Mp[xk.index(x),ak.index(a)] = LMa + LVa * x - ( x- a)
    //     else:
    //         m_Mp[xk.index(x),ak.index(a)] = LMa + LVa * x
    
  }
}
