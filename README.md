# Small Steps · lofi coder

A tiny, cozy TODO app for one small next step. 🌱

This is the runnable source companion to a two-hour simulated coding presentation. The on-screen typing, snippets, navigation, and pauses were staged from a deterministic source-event timeline. The twelve chapter snapshots were reconstructed from that same current timeline; they are not a record of a live, uninterrupted coding session.

## Start your little task garden

No build step or package installation is needed. In this folder, start a local server:

```sh
python3 -m http.server 5173 --bind 127.0.0.1
```

In a modern browser, open localhost on port 5173. Use a local HTTP server rather than double-clicking the HTML file, because the app uses JavaScript modules. Stop the server with Ctrl+C when you are done.

## Small things it can do

- Add a task with **Add task** or Enter
- Mark tasks complete, delete them, or clear completed tasks
- Switch between All, Active, and Done
- See how many active tasks remain
- Keep tasks in this browser with localStorage
- Press `/` to focus the input; Escape clears the input and removes focus
- Adapt to a narrow, phone-sized screen with a stacked entry form

Tasks stay in the browser and origin where you added them. They do not sync between devices. Clearing browser site data removes saved tasks. If storage is unavailable, tasks can still be used for the current session.

## A little room for every language

Try a task such as **日本語 🌸 مرحبا café**. The input and task text choose their direction automatically, including right-to-left text. With a modern browser that supports `Intl.Segmenter`, task text is limited to 120 grapheme clusters, keeping joined emoji and combining accents together. Older browsers fall back to 120 Unicode code points, which may split complex grapheme clusters.

The mobile layout was checked at a 375-pixel viewport with no horizontal overflow. This is a browser viewport check, not a physical-phone test. To inspect it locally, use your browser's responsive mode and select a narrow width.

Native operating-system IME Enter conversion has **not been verified**. Synthetic composition-key checks passed, including keeping composition text intact when Escape is pressed, but they do not establish how a real OS input method handles Enter. Finish conversion before using **Add task** if you are unsure.

## Run the small checks

With a current Node.js version available:

```sh
npm test
```

Four model tests cover text cleanup, non-mutating filters, safe restoration, and intact Unicode graphemes. The grapheme test needs `Intl.Segmenter` support.

The matching final source also passed 22 automated browser checks with zero failures and no page errors. Native OS IME Enter remains the one unverified check. See `verification.json` for the concise results and exact source hashes.

## Follow the twelve chapters

`chapters.json` lists the chapter times and checkpoint folders. The snapshots under `checkpoints/` are work-in-progress source stages. The six application files at this folder's root are the complete version; the final checkpoint matches them byte for byte. All application edits finish before the presentation's final one-minute browser demonstration.

This is a source-only bundle. It contains no recordings, account details, credentials, personal links, or repository history. Make a small change, try it, and take a breath. 🌿
