# JM Cook: author website (working draft)

Plain HTML, CSS and JavaScript. No build step, no framework. It's live at jmcook-author.co.uk through GitHub Pages (see `CNAME`).

## Where things live

| To change… | Edit |
|---|---|
| Any words on the page (bio, headings, newsletter text, books) | `js/content.js` |
| Colours and fonts | Top of `css/styles.css`, section 1 "Design tokens" |
| Page structure / section order | `index.html` |
| Behaviour (menu, form, palette previewer) | `js/main.js` |

## Trying out colour palettes

Add `?palette` to the address, for example `index.html?palette`. A small panel appears in the corner with four trial palettes. It's an ordinary radio-button group, so it works by keyboard and screen reader. Choosing one updates the address (e.g. `?palette=coastal`), so you can share that exact link.

To make a palette permanent, copy its values into the `:root` block at the top of `css/styles.css`.

## Adding a book

In `js/content.js`, add an entry to `books.items`. There's a commented example in the file. Always fill in `coverAlt` with a real description of the cover.

## Accessibility notes

- Semantic landmarks (header, nav, main, footer), one `h1`, sections labelled by their headings, and a skip link.
- Every text/background colour pair in all four palettes meets WCAG AA contrast (4.5:1 or better).
- Decorative flourishes (coffee mug, book mock-up, flower divider) are hidden from screen readers. The logo in the header has empty alt text because the name sits right next to it. The large logo has a full description.
- Animations switch off when the visitor's device asks for reduced motion.
- The newsletter form reads out its errors and success message. **It isn't connected to a mailing service yet.**
