---
marp: true
theme: tailwind
transition: fade 0.1s
size: 16:9
---

<!-- 
_class: title
 -->

<script src="scripts/hidden-toggle.js"></script>

# Marp Tailwind Template

<div class='grid grid-cols-2 gap-4'>

> [!CARD HIDDEN] **Tailwind CSS Integration (Hover Me)**
>
> ```html
> <div class='grid grid-cols-2 gap-4'>
>   <div class='bg-gray-200 p-4 rounded shadow hover:bg-gray-300'>1</div>
>   <div class='bg-gray-200 p-4 rounded shadow hover:bg-gray-300'>2</div>
> </div>
> ```

<div class='grid grid-cols-2 gap-4'>
  <div class='bg-gray-200 p-4 rounded shadow hover:bg-gray-300'>1</div>
  <div class='bg-gray-200 p-4 rounded shadow hover:bg-gray-300'>2</div>
</div>

</div>

To get started, run the following commands:

```bash
npm install
npm start
```

---

# Markdown

<div class='grid grid-cols-2 gap-4'>

> [!]
> 
> | Markdown            | Result            |
> | ------------------- | ----------------- |
> | `**Bold**`          | **Bold**          |
> | `*Italic*`          | *Italic*          |
> | `~~Strikethrough~~` | ~~Strikethrough~~ |
> | `==Highlight==`     | ==Highlight==     |
> | \`Code\`            | `Code`            |
>
> Blockquotes are also supported, and can start with `[!...]` to create custom elements (card, callout) like `[!]` (empty box), `[!CALLOUT NOTE`, `[!CARD]`, etc.


> [!]
> > Blockquote
> > `> Blockquote`
>
> > [!] Simple box
> > `> [!] Simple box`
>
> > [!CALLOUT NOTE] Callout Note
> > `> [!CALLOUT NOTE] Callout Note`
>
> > [!CARD] Card
> > `> [!CARD] Card`

</div>

---

<!-- 
_class: no-margin
 -->

<div class='grid grid-cols-2 h-full gap-4'>

  <div class='bg-gradient-to-r from-primary to-secondary flex h-full items-center px-20'>

  # Title { .text-background }

  </div>

  > [!]
  >
  > Test

</div>