---
updated: 2026-11-06
---

You have created an `index.html` file and opened it on your computer. Now you want to see how it looks on your phone.

There are **three free ways to do it**: publish the page with free hosting, preview it over your local Wi-Fi, or transfer the HTML file directly. The easiest choice depends on whether you want to share the page or simply test it.

| Method | Best for | Publicly accessible? |
| --- | --- | --- |
| GitHub Pages or another free host | Opening a URL on any phone and sharing it | Yes |
| Local Wi-Fi preview | Testing while you build | No, normally limited to your local network |
| Send the HTML file | Checking a very simple single-file page | No |

## Method 1: Publish Your Page for Free

**If you want a URL you can open on your phone, free static hosting is a straightforward option.** Once deployed, the page remains available even when your computer is turned off.

Two popular services are [GitHub Pages](https://pages.github.com/) and [Netlify](https://www.netlify.com/). Both can host static HTML pages. Check their current free-tier terms before signing up.

### Step-by-step: GitHub Pages

1. Create an account at [GitHub](https://github.com/) and sign in.
2. Create a new repository, for example `my-first-page`.
3. Choose **Add file → Upload files**, upload your `index.html`, and commit the change.
4. Open **Settings → Pages** in the repository.
5. Under **Build and deployment**, select **Deploy from a branch**, choose `main` and `/(root)`, and save.
6. Wait for deployment to finish, then open the published URL on your iPhone or Android browser.

Your URL will usually look like this:

```text
https://your-username.github.io/my-first-page/
```

Publishing is not always instant. If you see a 404 immediately after enabling Pages, check the deployment status and try again once it has completed.

**Important:** A GitHub Pages website is generally public. Do not upload passwords, private information, or files you do not want other people to see. A private repository does not necessarily make its published website private.

### Make sure the page fits a phone screen

Check that the `<head>` of your HTML includes:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

This tells the browser to use the device width for the layout viewport. It does not automatically make every design responsive, though. Fixed-width elements may still require CSS changes.

## Method 2: Preview It Over the Same Wi-Fi Network

**Want to test the page without putting it on the public internet?** Run a local web server on your computer and access it from your phone over Wi-Fi.

Both devices need to be on the same network, or at least a network that allows them to reach each other.

### Using VS Code and Live Server

1. Install [Visual Studio Code](https://code.visualstudio.com/) on your computer.
2. Open the folder containing `index.html`.
3. Install the **Live Server** extension.
4. Right-click `index.html` and choose **Open with Live Server**.
5. If necessary, configure Live Server to listen on a network-accessible address instead of only localhost.
6. Find your computer's local IP address and enter a URL like `http://192.168.1.10:5500/` on your phone.

`192.168.1.10` is only an example. **Replace it with your computer's actual local IP address.** Do not enter `localhost:5500` on your phone: on the phone, `localhost` means the phone itself, not your computer.

On Windows, you can check your local IP with `ipconfig`. On a Mac, look in the network settings.

### If the phone cannot connect

- Confirm both devices are on the same network.
- Make sure Live Server is not listening only on `127.0.0.1`.
- Check whether your computer's firewall is blocking the connection.
- Some guest Wi-Fi networks prevent devices from talking to each other.
- Verify the port number shown by Live Server.

This preview works only while the computer and server are running. It is not the same as publishing a website. A server listening on your local network may also be accessible to other devices there, so use a network you trust.

Live Server can automatically refresh the page when you edit files, which makes it useful for checking responsive layouts on a real phone.

## Method 3: Send the HTML File to Your Phone

For a simple single-file page, you can transfer `index.html` using AirDrop, email, or a cloud storage service.

However, **tapping an HTML attachment does not guarantee that it will open as a normal website in Safari or Chrome.** An iPhone might show a Files preview, while Android behavior depends on the file manager and browser.

If your HTML references `style.css` or `images/photo.jpg`, sending only `index.html` will not transfer those additional files. You need to preserve the folder structure as well.

Some JavaScript features, including certain `fetch()` requests, can also fail when a page is opened using a `file://` URL because of browser security restrictions.

In other words, **being able to view a file is not the same as running a functioning website**. Direct file transfer is best for quickly inspecting a small self-contained HTML page.

## Which Method Should a Beginner Choose?

Choose **free hosting** if you want to open the page from anywhere, bookmark it, or share it with friends. The published URL is easy to use on both iPhone and Android.

Choose **local Wi-Fi preview** if you are still editing the page and want to check its appearance on a real phone without publishing it. This is especially handy when making frequent CSS changes.

Choose **file transfer** only when the page is very simple and you are comfortable with the limitations of opening local files on mobile devices.

## Final Takeaway

You can view a web page you made on your computer from your phone without paying for hosting. **Use a free host for a shareable URL, local Wi-Fi for live testing, or file transfer for a basic one-file preview.**

For a first project, publishing a tiny `index.html` and opening its URL on your phone is a satisfying milestone. It also teaches an important distinction: a file that works on your own computer is not automatically a website other people can visit.
