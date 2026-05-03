import {mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {build} from 'esbuild';

const frontendRoot = path.resolve(import.meta.dirname, '..');
const generatedDir = path.join(frontendRoot, '.generated');
const bundleFile = path.join(generatedDir, 'email-templates.bundle.cjs');
const outputDir = path.resolve(frontendRoot, '../src/main/resources/email-templates');
const require = createRequire(import.meta.url);

await mkdir(generatedDir, {recursive: true});

await build({
    entryPoints: [path.join(frontendRoot, 'email-templates', 'render.tsx')],
    outfile: bundleFile,
    bundle: true,
    format: 'cjs',
    platform: 'node',
    jsx: 'automatic',
    logLevel: 'silent'
});

delete require.cache[bundleFile];
const {renderEmailTemplates} = require(bundleFile);
const templates = renderEmailTemplates();

await mkdir(outputDir, {recursive: true});

await Promise.all(
    Object.entries(templates).map(([fileName, contents]) =>
        writeFile(path.join(outputDir, fileName), contents, 'utf8')
    )
);
