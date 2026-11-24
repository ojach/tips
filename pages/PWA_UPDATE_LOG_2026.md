# PWAアップデートログ 2026

PWA、ホーム画面UX、Web Appのインストール挙動、Web App Manifestに関する主な変更を時系列で記録しています。

仕様書の更新をすべて掲載するのではなく、PWAの制作・運用・実機検証に影響するものを中心にまとめます。詳しい検証記事を公開した項目には、記事へのリンクを追加します。

> **最終更新：2026年11月24日**  
> 新しい情報を上に追加しています。

---

## 2026年11月23日｜Chrome 158が正式リリース

**対象：Chrome／Web Install**

Chrome 158のデスクトップ版がStableチャンネルへ正式に公開されました。Chrome 158では、Webページ内からPWAのインストールを開始できる`<install>`要素と`navigator.install()`が導入されています。

これにより、現在開いているPWAだけでなく、別サイトのPWAを紹介ページやアプリカタログから直接インストールさせる仕組みを作れるようになりました。インストールの最終確認は、必ずブラウザが表示します。

### PWA LABで確認したこと

- `<install>`だけでブラウザ標準のインストールボタンを表示できる
- 外部ドメインのManifestを指定したPWAもインストール画面まで進める
- 1ページで有効になるPermission Elementは最大24個
- 24個を超えると、単純に上から順ではなく一部のボタンが無効になる場合がある
- Data URLで生成したManifestは`<install manifest="...">`に指定できない
- 大量のPWAを並べる場合は、個数制限のない`navigator.install()`が向いている
- idの指定がないManifestは`<install manifestid="...">`で指定することができる。指定は`start_url`
- CSSでボタンの領域に重なるものがあると動かない場合がある。

### 関連記事

- [Chrome 158でPWA紹介サイトが増える？作る側・使う側が知っておきたい注意点](https://tips.ojapp.app/chrome-158-pwa-install-catalog-safety/)

### 一次資料

- [Chrome 158 Release Notes](https://chromestatus.com/release-notes/158)
- [Chrome 158 Stable Channel Update](https://chromereleases.googleblog.com/2026/11/stable-channel-update-for-desktop_01734282054.html)
- [Installing web applications — Chrome for Developers](https://developer.chrome.com/docs/modern-web-guidance/guides/pwa/install-web-app)

---

## 2026年11月19日｜Microsoft Edge 158がWeb Installに対応

**対象：Microsoft Edge／Web Install**

Microsoft Edge 158で、`<install>`要素と`navigator.install()`が正式に追加されました。

Chromeだけの独自機能ではなく、Chromium系ブラウザで共通して利用できるインストール手段になり始めています。PWA紹介サイトやWeb上のアプリカタログを実際に運用できる可能性が高まりました。

`<install>`はブラウザが表示を管理する簡単なボタンです。`navigator.install()`は独自デザインのボタンや動的なアプリ一覧に組み込めます。外部PWAを`navigator.install()`でインストールする場合は、インストール確認の前にサイト権限の確認が入ります。

### PWA LABで確認したこと

- 基本的にはChromeと同じ。

### 一次資料

- [Microsoft Edge 158 web platform release notes](https://learn.microsoft.com/en-us/microsoft-edge/web-platform/release-notes/158)

---

## 2026年11月18日｜Web App Manifest仕様を更新

**対象：W3C／Web App Manifest／shortcuts**

Web App ManifestのWorking Draftが更新され、`shortcuts`に指定したURLがPWAの`scope`内にあるかを、Manifest共通のURL scope判定で処理する形に整理されました。

`shortcuts.url`を`scope`内に限定するルールは以前から存在しており、正常なManifestの実動作が大きく変わる更新ではありません。ブラウザ間で判定方法がずれないよう、仕様を明確にした変更と見られます。

なお、scope内のURLからscope外へリダイレクトすること自体は可能です。ただし移動後はscope外として扱われ、ブラウザのアドレス表示や警告UIが出る可能性があります。

### 次に確認する点

- scope内のShortcut URLから同一ドメイン上層へリダイレクトした場合
- scope内のShortcut URLから外部ドメインへリダイレクトした場合
- Androidとデスクトップでscope外表示がどう変わるか

### 一次資料

- [Web Application Manifest — W3C Working Draft](https://www.w3.org/TR/appmanifest/)

---

## このログについて

掲載内容は、公開された仕様・ブラウザの公式資料と、PWA LABでの実機検証をもとにしています。

ブラウザの段階的な配信、OS、端末、インストール済みの状態によって挙動が異なる場合があります。検証後に判明した差異は、各項目へ追記します。
