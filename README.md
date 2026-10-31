# driverectly · share files without the hassle

[try it here! ↗](https://aqilmuh.github.io/driverectly/)

Direct link from Google Drive to download file or preview in web without having people to see your Drive.

No backend, no database, no uploads. Everything runs in your browser, so your files are never seen by anyone.

## How to use

1. In Google Drive, set the file's General access to **Anyone with the link** and the role to **Viewer**.
2. Copy the share link, for example:
   `https://drive.google.com/file/d/{FILE_ID}/view?usp=sharing`
3. Paste it into driverectly and choose a link type.
4. Copy the result.

## Link types

| Type | Usage |
| --- | --- |
| Download link | Use it in PDFs or Canva Presentation as a direct download |
| Image preview link | Use in website to preview image using `<img src="">` tag |

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
- **Folder links aren't supported, only file links.**
- Large files may show a Google virus-scan page before downloading.

## License

MIT
