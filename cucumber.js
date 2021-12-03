const worldParameters = {
    appUrl: process.env.BASE_URL || "http://localhost:3000/"
}
const common = `--require-module ts-node/register --require 'support/**/*./ts' --world-parameters '${JSON.stringify(worldParameters)}'`

module.exports = {
    'default': "--format progress-bar --format json:./cucumber-report.json --publish-quiet",
    'pretty': "--format progress --format html:./cucumber-report.html --publish-quiet",
    'ci': `${common} --format html:./cucumber-report.html --publish-quiet`
}