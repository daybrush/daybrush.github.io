import builder from "@daybrush/builder";
import cssbundle from "rollup-plugin-css-bundle";



export default builder([
    {
        input: "src/index.ts",
        output: "./dist/index.js",
        format: "iife",
        exports: "named",
        plugins: [cssbundle({output: "./dist/index.css"})],
        resolve: true,
        // uglify: true,
    },
]);
