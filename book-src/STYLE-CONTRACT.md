# Chapter build contract — follow EXACTLY

You are writing ONE chapter fragment of a single-file HTML statistics textbook.
Output a **fragment only**: no `<!doctype>`, no `<html>`, `<head>`, `<body>`, no `<style>`, no `<script>`.
The shell already provides all CSS, MathJax, and the figure engine. Use ONLY the classes listed here.

## Absolute rules

1. **Never invent a question.** Every exercise must come from the extract file you were given.
   The teaching prose is yours to write well, but every formula, number, worked example and
   exercise must trace back to the extract.
2. **Math is MathJax.** Inline `$...$`, display `$$...$$`. Write real LaTeX (`\bar{x}`, `\sigma`,
   `\hat{y}`, `\chi^2`, `\sum`, `\frac{}{}`). Never write math as plain text like "x-bar".
3. **NO HTML comments and no `//` comments anywhere in your output.** Not one. They ship to the page.
4. Do not use `<h1>` except in the chapter header block. Every `<h2>` MUST have a unique `id`.
5. Write in plain, warm, beginner-friendly language. Explain *why* a tool exists before the formula.
   Short sentences. No condescension. Assume a smart student who has never met the topic.

## Required skeleton

```html
<section id="chN" class="wrap">
  <div class="chapter-open">
    <div class="kicker">Chapter N</div>
    <h1>Title</h1>
    <p>One sentence saying what the reader will be able to DO by the end.</p>
  </div>

  <p class="lead">A short orientation paragraph — the big idea in everyday words, no jargon.</p>

  <h2 id="chN-s1">N.1 · Section title</h2>
  ...
  <h2 id="chN-exercises">N.x · Practice questions</h2>
  <button class="revealall">Reveal all solutions</button>
  ...exercises...

  <div class="recap">
    <h4>Chapter recap</h4>
    <ul><li>...</li></ul>
  </div>
</section>
```

## Building blocks

**Callouts** — `<div class="box def|note|tip|warn|plain"><span class="lbl">LABEL</span> ...content... </div>`
- `def` = a formal definition · `note` = a slide's own note, verbatim · `tip` = exam technique
- `warn` = a common mistake · `plain` = "in plain English" restatement of something technical.
- Use `plain` generously right after every hard formula. That is the whole point of this book.

**Formulas** — always this block, never a bare `$$`:
```html
<div class="formula">
  <div class="name">Standard error of the mean</div>
  $$ \sigma_{\bar{x}} = \frac{\sigma}{\sqrt{n}} $$
  <div class="where"><b>σ</b> the population standard deviation · <b>n</b> the sample size · <b>σ<sub>x̄</sub></b> how much sample means bounce around</div>
</div>
```
The `.where` line is mandatory: every symbol glossed in plain words.

**Worked example** (from the slides — solution always visible, this is teaching):
```html
<div class="example">
  <div class="hd">Worked example 1 — what it is testing</div>
  <div class="bd">
    <p>The question, verbatim from the slide.</p>
    <div class="given"><b>Given</b> μ = 100 · σ = 15 · n = 25</div>
    <ol class="steps">
      <li><b>Name the tool.</b> One line on why this formula and not another.</li>
      <li>Substitution shown in full: $z = \frac{110-100}{15/\sqrt{25}} = 3.33$</li>
      <li>Table lookup stated exactly: "from the Z-table, $\Phi(3.33) = 0.9996$".</li>
    </ol>
    <div class="final">P(X̄ > 110) = 0.0004</div>
  </div>
</div>
```

**Exercise** (solution HIDDEN behind the button — this is the required structure):
```html
<div class="exercise">
  <div class="hd">Question 1</div>
  <div class="bd">
    <p>Question verbatim from the extract.</p>
    <div class="given"><b>Given</b> ...</div>
    <p class="hint">Hint: which distribution is this, and is σ known?</p>
    <button class="reveal-btn">Reveal solution</button>
    <div class="solution">
      <ol class="steps"><li>...</li></ol>
      <div class="final">final answer</div>
    </div>
  </div>
</div>
```
The `<button>` and `<div class="solution">` MUST be siblings inside the same `.bd`. Do not nest them.

**Figures** — the engine draws them. You only place them. Caption auto-fills if you leave it empty:
```html
<figure data-fig="NAME" data-param="value"><figcaption></figcaption></figure>
```
To write your own caption instead, use `<figcaption data-custom="1">your words</figcaption>`.

### Available figures

| name | params | shows |
|---|---|---|
| `normal-empirical` | `data-mu` `data-sigma` | bell curve with 68–95–99.7 bands |
| `normal-compare` | — | three normals, different μ and σ |
| `i-normal` | `data-mu` `data-sigma` | **INTERACTIVE** probability explorer with sliders |
| `sampling-dist` | `data-mu` `data-sigma` | how x̄ tightens as n grows |
| `i-clt` | — | **INTERACTIVE** Central Limit Theorem machine |
| `uniform` | `data-a` `data-b` | uniform density rectangle |
| `exponential` | `data-lambda` | exponential decay curve |
| `memoryless` | `data-lambda` `data-s` | memoryless property |
| `chebyshev` | `data-k` | Chebyshev k-sigma bounds |
| `t-vs-z` | — | t curves vs the normal |
| `ci-coverage` | `data-conf` | 25 confidence intervals, some missing μ |
| `chisq` | `data-df` | chi-square curves |
| `fdist` | `data-d1` `data-d2` | F distribution |
| `errors` | `data-shift` `data-crit` | Type I α vs Type II β overlap |
| `tails` | `data-alpha` | left / right / two-tailed rejection regions |
| `i-test` | — | **INTERACTIVE** hypothesis-test lab |
| `scatter-r` | — | four scatter plots at different r |
| `sst-decomp` | — | SST / SSR / SSE decomposition |
| `i-regress` | — | **INTERACTIVE** drag-the-points regression sandbox |

Place a figure wherever the extract said `FIGURE:` and wherever a picture would genuinely help.
Aim for one figure roughly every two screens of text. Do not place the same figure twice.

**Data tables** — wrap every table: `<div class="tw"><table>...</table></div>`, numeric cells `class="num"`.

## Tone examples

Bad: "The CLT states that the sampling distribution of the sample mean approaches normality asymptotically."
Good: "Take a sample, write down its average, put it back, do it again a thousand times. Those averages,
plotted, make a bell curve — even when the thing you sampled from was nowhere near a bell. That is the
Central Limit Theorem, and it is the reason almost everything later in this course works."

Every section should feel like a good teacher talking, then a box that says exactly what to write in an exam.
