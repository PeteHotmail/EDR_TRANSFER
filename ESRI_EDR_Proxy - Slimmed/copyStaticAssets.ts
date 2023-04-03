import * as shell from "shelljs";

shell.cp("-R", "src/public/", "dist/public/");
shell.cp("-R", "./certificates", "dist/certificates/");
shell.cp("-R", "swagger.yaml", "dist/");
shell.cp("-R", "README.md", "dist/");
shell.cp("-R", "package.json", "dist/");