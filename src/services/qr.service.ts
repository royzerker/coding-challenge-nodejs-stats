import { Inject, Service } from "typedi";
import type { Logger } from 'winston'; 
import math from 'mathjs';
import { AxiosInstance } from "axios";

@Service()
export class QrService {
    #_logger: Logger;
    #_axiosInstance: AxiosInstance;

    constructor(
        @Inject('logger') logger: Logger,
        @Inject("axios") axiosInstance: AxiosInstance
    ) {
        this.#_logger = logger;
        this.#_axiosInstance = axiosInstance;
    }

    async rotate(qMatrix: number[][], rMatrix: number[][]): Promise<{ rotatedQ: number[][]; rotatedR: number[][] }> {
        this.#_logger.log({ level: 'info', message: `inside ${this.constructor.name} rotate` });

        if (!qMatrix || !rMatrix) {
            throw new Error('Missing QR matrices');
        }
    
        try {
            const rotatedQ = this.#_rotateMatrix(qMatrix);
            const rotatedR = this.#_rotateMatrix(rMatrix);
            return { rotatedQ, rotatedR };
        } catch (error) {
            console.error('Error rotating matrices:', error);
            throw new Error('Internal server error');
        }
    }

    async factorize(matrix: number[][]): Promise<{ Q: number[][]; R: number[][]; stats: any }> {
        this.#_logger.log({ level: 'info', message: `inside ${this.constructor.name} factorize` });

        this.#_logger.info({ message: `matrix ${JSON.stringify(matrix)}` });

        try {
            const { Q, R } = this.#_qrFactorization(matrix);

            this.#_logger.info({ message: `Q ${JSON.stringify(Q)}` });
            this.#_logger.info({ message: `R ${JSON.stringify(R)}` });

            // const STATS_API_URL = process.env.STATS_API_URL

            // if (!STATS_API_URL) {
            //     throw new Error('Missing STATS_API_URL environment variable');
            // }
 
            // const response = await this.#_axiosInstance.post(`${STATS_API_URL}/qr`, {
            //   Q,
            //   R
            // })

            return {
                Q,
                R,
                stats: []
            }
          

        }catch (error) {
            this.#_logger.log({ level: 'error', message: `Error in ${this.constructor.name} factorize` });
            throw new Error('Internal server error');
        }
       
    }
    
    #_rotateMatrix(matrix: number[][]): number[][] {
        this.#_logger.log({ level: 'info', message: `inside ${this.constructor.name} _rotateMatrix` });

        const rows = matrix.length;
        this.#_logger.info({ message: `rows ${rows}` });

        const cols = matrix[0].length;
        this.#_logger.info({ message: `cols ${cols}` });
        
        const rotated = Array.from({ length: cols }, () => Array(rows));

        this.#_logger.info({ message: `rotated ${JSON.stringify(rotated)}` });

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                rotated[j][rows - 1 - i] = matrix[i][j];
            }
        }

        return rotated;
    }

    #_dot(a: number[], b: number[]): number {
        return a.reduce((sum, val, i) => sum + val * b[i], 0);
      }
      
    #_norm(v: number[]): number {
        return Math.sqrt(this.#_dot(v, v));
      }
      
    #_scalarMultiply(scalar: number, v: number[]): number[] {
        return v.map(x => x * scalar);
      }
      
    #_subtract(a: number[], b: number[]): number[] {
        return a.map((x, i) => x - b[i]);
      }
      
    #_transpose(matrix: number[][]): number[][] {
        return matrix[0].map((_, i) => matrix.map(row => row[i]));
      }
      
    #_qrFactorization(A: number[][]): { Q: number[][]; R: number[][] } {
        const m = A.length;
        const n = A[0].length;
      
        const Q: number[][] = [];
        const R: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
      
        const A_cols = this.#_transpose(A);
      
        const u: number[][] = [];
      
        for (let i = 0; i < n; i++) {
          let v = [...A_cols[i]];
          for (let j = 0; j < i; j++) {
            const r = this.#_dot(Q[j], A_cols[i]);
            R[j][i] = r;
            const proj = this.#_scalarMultiply(r, Q[j]);
            v = this.#_subtract(v, proj);
          }
      
          const normV = this.#_norm(v);
          R[i][i] = normV;
          const q = this.#_scalarMultiply(1 / normV, v);
          Q.push(q);
        }
      
        const Q_matrix = this.#_transpose(Q);
        return { Q: Q_matrix, R };
      }  
          
}