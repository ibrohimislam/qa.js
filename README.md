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
    "header": "some header",
    "questions": [
      {
        "question": "bla bla bla?",
        "answer": [
          "bla bla [bla](https://www.google.com)",
          "**bla** bla bla",
          "bla *bla* bla"
        ]
      },
      {
        "question": "bla bla bla?",
        "answer": ["bla bla bla"]
      }
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
        "text": "bla bla bla?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "bla bla bla\nbla bla bla\nbla bla bla"
        }
    },
    {
        "@context": "http://schema.org/",
        "@type": "Question",
        "text": "bla bla bla?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "bla bla bla"
        }
    }
]
</script>

<section>
    <h3>some header</h3>
    <section>
        <h4>Tanya: bla bla bla?</h4>
        <p>Jawab: bla bla [bla](https://www.google.com)</p>
        <p>**bla** bla bla</p>
        <p>bla *bla* bla</p>
    </section>
    <span style="text-align: center;">----------</span>
    <section>
        <h4>Tanya: bla bla bla?</h4>
        <p>Jawab: bla bla bla</p>
    </section>
    <span style="text-align: center;">----------</span>
</section>
```
