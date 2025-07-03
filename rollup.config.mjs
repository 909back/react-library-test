import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from '@rollup/plugin-typescript'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { postcss } from "postcss-prefixer"
import json from "@rollup/plugin-json"
import terser from "@rollup/plugin-terser"

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.scss']

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.cjs',
            format: 'cjs',
            sourcemap: true
        },
        {
            file: 'dist/index.ems.js',
            format: 'esm',
            sourcemap: true
        }
    ],
    watch: {
        include: '*',
        exclude: 'node_modules/**'
    },
    plugins: [
        json(),
        terser(),
        peerDepsExternal(), // Peer Dependencies는 번들에서 제외
        resolve(), // node_modules 처리
        commonjs({
            include: '/node/modules/'
        }), // CommonJS로 처리
        typescript({
            tsconfig: './tsconfig.json'
        }), // Typescript 컴파일러
        babel({
            babelHelpers: 'bundled',
            extensions,
            preset: ['@babel/env', '@babel/react', '@babel/preset-typescript']
        }),
        postcss({
            extract: true,
            modules: true,
            use: ['sass'],
            
        })
    ],
    external: ['react', 'react-dom']
}