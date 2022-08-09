import builder from "@daybrush/builder";
import cssbundle from "rollup-plugin-css-bundle";
import scss from 'rollup-plugin-scss'



export default builder([
    {
        input: "src/index.ts",
        output: "./dist/index.js",
        format: "iife",
        exports: "named",
        plugins: [scss({
            output: true,
            output: './dist/index.css',
        })],
        resolve: true,
        // uglify: true,
    },
]);
