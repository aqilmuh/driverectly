# driverectly

Turn a public Google Drive file into a direct download link or a website-ready image link.

No backend, no database, no uploads. Everything runs in your browser, so your files are never seen by anyone.

## How to use

1. In Google Drive, set the file's General access to **Anyone with the link** and the role to **Viewer**.
2. Copy the share link, for example:
   `https://drive.google.com/file/d/{FILE_ID}/view?usp=sharing`
3. Paste it into driverectly and choose a link type.
4. Copy the result.

## Link types

| Type | Format |
| --- | --- |
| Download link | `https://drive.google.com/uc?export=download&id={FILE_ID}` |
| Image preview link | `https://lh3.googleusercontent.com/d/{FILE_ID}` |

The image preview link can be used directly as an image source:

```html
<img src="https://lh3.googleusercontent.com/d/{FILE_ID}" alt="">
```

## Run locally

It's plain HTML, CSS and JavaScript, so there is nothing to install. Open `index.html` in your browser.

To serve it locally instead:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Project structure

```
driverectly/
├── index.html   # page structure
├── style.css    # styles
└── script.js    # link conversion and interactions
```

## Notes

- The file must be shared publicly, or the links won't work.
- Anyone with the converted link can open the file, so only convert files you're fine making public.
- Folder links aren't supported, only file links.
- Large files may show a Google virus-scan page before downloading.

## License

MIT
