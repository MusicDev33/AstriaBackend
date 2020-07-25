// tslint:disable-next-line
require('tsconfig-paths/register');
import { Project } from 'ts-morph';
import { generateSchema } from '@gentools/schemablock.gen';
import fs from 'fs';
import CodeBlockWriter from 'code-block-writer';
import { getMongooseString } from '@gentools/type.map';


const writer = new CodeBlockWriter({
    newLine: "\r\n",
    indentNumberOfSpaces: 2,
    useTabs: true,
    useSingleQuote: true
});

const project = new Project({
  tsConfigFilePath: 'tsconfig.json',
    addFilesFromTsConfig: false
});



fs.readdir('src/models/', (err, files) => {
  files.forEach(async (file) => {
    const modelName = file.split('.')[0][0].toUpperCase() + file.split('.')[0].substring(1);

    project.addSourceFileAtPath(`src/models/${file}`);
    const sourceFile = project.getSourceFileOrThrow(file);
    const fileInterface = sourceFile.getInterfaces()[0];

    const properties = fileInterface.getProperties();

    generateSchema(file, modelName, properties);
  });
});
