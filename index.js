#!/usr/bin/env node

const fs = require('fs');
const args = process.argv.slice(2);
const sourceFile = args[0];
const md = require('markdown-it')();
const removeMd = require('remove-markdown');
const Handlebars = require('handlebars');
const removeMdOptions = {
    stripListLeaders: false
}

const template = `<section>
    <h4>Tanya: {{question}}</h4>
    {{#each answer}}
    {{#if @first}}
    <p>Jawab: {{this}}</p>
    {{else}}
    <p>{{this}}</p>
    {{/if}}
    {{/each}}
</section>
<span style="text-align: center;">----------</span>`

const templateHandlebars = Handlebars.compile(template, {noEscape: true, preventIndent: false});


if (sourceFile === undefined) {
    console.log("usage: qa [source-file]");
    process.exit(1);
}

const jsonLD = [];
const html = [];

const toJsonLD = (qa) => ({
    "@context":"http://schema.org/",
    "@type":"Question",
    "text": removeMd(qa.question, removeMdOptions),
    "acceptedAnswer": {
        "@type": "Answer",
        "text": qa.answer.map(it => removeMd(it, removeMdOptions)).join("\n")
    }
})

const toHtml = (qa) => (templateHandlebars({
    question: md.renderInline(qa.question),
    answer: qa.answer.map(it => md.renderInline(it))
}))

qaList = JSON.parse(fs.readFileSync(sourceFile));
for (qa of qaList) {
    jsonLD.push(toJsonLD(qa))
    html.push(toHtml(qa))
}

console.log(`
<script type="application/ld+json">
${JSON.stringify(jsonLD, null, 4)}
</script>
${html.join("\n")}
`);
