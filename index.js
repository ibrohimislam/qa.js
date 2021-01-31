#!/usr/bin/env node

const fs = require('fs');
const args = process.argv.slice(2);
const sourceFile = args[0];

const md = require('markdown-it')();

const removeMd = require('remove-markdown');
const removeMdOptions = { stripListLeaders: false}

const Handlebars = require('handlebars');
Handlebars.registerHelper("md", (it) => md.renderInline(it));

const template = `
{{#each this}}
<section>
    <h3>{{md header}}</h3>
    {{#each questions}}
    <section>
        <h4>Tanya: {{md question}}</h4>
        {{#each answer}}
        {{#if @first}}
        <p>Jawab: {{md this}}</p>
        {{else}}
        <p>{{md this}}</p>
        {{/if}}
        {{/each}}
    </section>
    <span style="text-align: center;">----------</span>
    {{/each}}
</section>
{{/each}}`

const templateHandlebars = Handlebars.compile(template, {noEscape: true, preventIndent: false});

if (sourceFile === undefined) {
    console.log("usage: qa [source-file]");
    process.exit(1);
}

const toJsonLD = (qa) => ({
    "@context":"http://schema.org/",
    "@type":"Question",
    "text": removeMd(qa.question, removeMdOptions),
    "acceptedAnswer": {
        "@type": "Answer",
        "text": qa.answer.map(it => removeMd(it, removeMdOptions)).join("\n")
    }
})

const content = JSON.parse(fs.readFileSync(sourceFile));

console.log(`
<script type="application/ld+json">
${JSON.stringify(content.flatMap((it) => it.questions).map(it => toJsonLD(it)), null, 4)}
</script>
${templateHandlebars(content)}
`);
