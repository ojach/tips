---
updated: 2026-11-06
---

# How to Create a Simple Web Page for Free — A Beginner-Friendly 10-Minute Guide

Want to make a web page but have no idea where to start? You can begin with a single HTML file.

You don't need paid software, a hosting account, or a development environment. **A basic text editor and a web browser** are enough to create a page you can open on your own computer.

This guide walks you through copying the code, saving it correctly, and viewing the result. If everything goes smoothly, it takes about 10 minutes.

> This tutorial creates a local web page on your computer. Publishing it on the internet is a separate step.

## What you'll need

- A Windows PC or Mac
- A text editor (Notepad on Windows or TextEdit on Mac)
- A browser such as Chrome, Safari, or Edge

You don't need to install VS Code or other developer tools.

## 1. Create a folder named `mypage`

Create a folder called `mypage` on your desktop or somewhere easy to find. This will hold your web page file.

## 2. Create `index.html`

Your page will live in a file named `index.html`. The `.html` extension tells your computer it's an HTML document.

**On Windows**, open Notepad. After pasting the code in the next step, choose **File → Save As**, enter `index.html`, set **Save as type** to **All Files**, and choose UTF-8 encoding. Save it inside `mypage`.

If you're renaming an existing text file instead, enable file-name extensions in File Explorer. A file named `index.html.txt` is still a text file, not the HTML file you intended.

**On Mac**, open TextEdit and choose **Format → Make Plain Text** before pasting the code. Save it as `index.html` in `mypage`. If prompted about adding `.txt`, keep the `.html` extension.

## 3. Paste this HTML code and save

Copy the entire example into your `index.html` file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Web Page</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 640px;
      margin: 60px auto;
      padding: 0 20px;
      line-height: 1.8;
    }
    h1 { color: #2b7bff; }
  </style>
</head>
<body>
  <h1>My First Web Page</h1>
  <p>This is the first web page I made myself.</p>
</body>
</html>
```

Save the file with `Ctrl + S` on Windows or `Command + S` on Mac.

HTML defines the content and structure of the page. The CSS inside `<style>` controls its appearance, including spacing and color. You don't need to understand every line yet.

## 4. Open your page in a browser

Find `index.html` in your `mypage` folder and double-click it. If your browser shows the heading “My First Web Page” and the paragraph underneath, it worked!

If a text editor opens instead, or the browser displays raw code, check that the file isn't actually named `index.html.txt`. You can also right-click the file and select **Open with** to choose your browser.

## 5. Change the text or color

Now try replacing the heading and paragraph with your own content:

```html
<h1>About Me</h1>
<p>Write a short introduction here.</p>
```

To change the heading color, replace `#2b7bff` in the CSS `color` declaration with another color code.

Save the file and refresh your browser. Your changes should appear immediately.

## Is your page online now?

Not yet. The `index.html` file is stored on your computer, so opening it locally doesn't make it accessible to other people through a public URL.

To share the page on the internet, you'll need to publish it using a web hosting service. **Creating a web page and publishing a web page are two different steps.**

## Conclusion

You can build your first web page for free with a text editor and a browser. Create a folder, save your code as `index.html`, and open the file to see the result.

There's no need to learn a complex tool first. Change a few words or colors and get comfortable with how editing, saving, and refreshing work.
