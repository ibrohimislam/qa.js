# QA.js

this package is used to generate JSON-LD (structured data) and HTML for question-and-answer from json source file.

## How to Install

```
npm install -g qa.js
```

## How to Use

```
qa source.json > result.html
```

## JSON source

```
[
    {
        "question": "bla bla bla",
        "answer": [
            "bla bla [bla](https://www.google.com)",
            "**bla** bla bla",
            "bla *bla* bla"
        ]
    },
    {
        "question": "bla bla bla",
        "answer": [
            "bla bla bla"
        ]
    }
]
```

## Result

```
<script type="application/ld+json">
[
    {
        "@context": "http://schema.org/",
        "@type": "Question",
        "text": "bla bla bla",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "bla bla bla\nbla bla bla\nbla bla bla"
        }
    },
    {
        "@context": "http://schema.org/",
        "@type": "Question",
        "text": "bla bla bla",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "bla bla bla"
        }
    }
]
</script>

<section>
    <h4>Tanya: <p>bla bla bla</p></h4>
    <p>Jawab: <p>bla bla <a href="https://www.google.com">bla</a></p></p>
    <p><p><strong>bla</strong> bla bla</p></p>
    <p><p>bla <em>bla</em> bla</p></p>
</section>
<span style="text-align: center;">----------</span>
<section>
    <h4>Tanya: <p>bla bla bla</p></h4>
    <p>Jawab: <p>bla bla bla</p></p>
</section>
<span style="text-align: center;">----------</span>
```
