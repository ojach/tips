PWAのWeb App Manifestには、アプリの見え方を決める `display` という項目があります。</p>

その中でもよく使われるのが `standalone` と `fullscreen` です。

名前だけ見ると、standaloneは「普通のアプリ表示」、fullscreenは「もっとアプリっぽく全画面」と何となく想像できます。

でも実際にiPhoneとAndroidで試してみると、**同じ設定でもOSによって見え方がかなり違いました。** PWA LABで何度も切り替えて確認した結果、普段使いなら私は基本 `standalone`、明確に全画面へしたい理由がある時だけ `fullscreen` でいいと思っています。

## standaloneとfullscreenはManifestのdisplayで指定する

設定自体はシンプルです。

standaloneなら、

```json
{
  "display": "standalone"
}
```

fullscreenなら、

```json
{
  "display": "fullscreen"
}
```

と書きます。

`display` は、ホーム画面などからPWAを起動した時に、ブラウザのUIをどの程度見せるかを指定する項目です。

Manifest全体の役割については、[PWAに必要なmanifest.jsonの基本｜iPhoneとAndroidで効く項目を実験ベースで解説](https://tips.ojapp.app/pwa-manifest-json-basics/)でも詳しくまとめています。

## Androidでは違いがかなり分かりやすい

PWA LABでAndroid実機を使って確認した時、standaloneとfullscreenの違いはかなり分かりやすく出ました。

### standalone

私の検証環境では、standaloneは一番「普通のPWA」らしい表示になりました。

ブラウザの大きなアドレスバーは出ず、独立したアプリのように見えます。

ただしAndroidでは上部にToolbarが残る表示になりました。

完全に画面を支配するというより、**Webアプリとしての使いやすさを残したアプリ表示**という印象です。

### fullscreen

一方 `fullscreen` にすると、AndroidではToolbarも消えて完全なフルスクリーン表示になりました。

PWA LABで実際に切り替えた時は、かなりアプリ感が強くなります。

画面いっぱいまでコンテンツを使えるので、ゲーム、映像、専用ツールなどには相性がよさそうです。

<div class="balloon balloon-boder">
<figure class="balloon__img balloon__img-left">
<div><img src="/images/appin2.webp" alt=""></div>
<figcaption class="balloon__name">アッピン</figcaption></figure>

<div class='balloon__text balloon__text-right'>fullscreenは名前どおり強いよ👻 でも「アプリっぽいから全部fullscreen！」じゃなくて、ブラウザUIを消す必要があるかで決めるのがポイント！</div>
</div>

## iPhoneでは見た目の違いがほとんど出なかった

面白かったのがiPhoneです。

PWA LABで `standalone` と `fullscreen` を切り替えてホーム画面から起動しましたが、私の検証環境では見た目に大きな違いは確認できませんでした。

standaloneでもfullscreenでも、ホーム画面から開いたWebアプリとして似た表示になります。

Androidでははっきり違うのに、iPhoneではほとんど変わらない。

このあたりは、PWAを仕様だけ読んで作っていると分かりにくい部分でした。

以前、[display: fullscreenは実用的なのか？iPhoneとAndroidでPWA表示を比較してみた](https://tips.ojapp.app/pwa-display-fullscreen-iphone-android/)でも、この実機差を詳しくまとめています。

## 違いを表にするとこうなる

<table>
<thead>
<tr><th>比較</th><th>standalone</th><th>fullscreen</th></tr>
</thead>
<tbody>
<tr><td>Android</td><td>アプリ表示。検証環境ではToolbarあり</td><td>完全フルスクリーン。Toolbarなし</td></tr>
<tr><td>iPhone</td><td>ホーム画面アプリとして表示</td><td>検証環境では見た目の大きな差なし</td></tr>
<tr><td>アプリ感</td><td>十分強い</td><td>Androidではかなり強い</td></tr>
<tr><td>画面領域</td><td>通常のPWA向け</td><td>最大限使いやすい</td></tr>
<tr><td>向いている用途</td><td>ブログ、EC、SaaS、Webツールなど</td><td>ゲーム、展示、専用画面、没入型ツールなど</td></tr>
</tbody>
</table>

特にAndroidでは、画面上部のUIを残すか完全に消すかが大きな違いになります。

## 普通のPWAならstandaloneで十分

私なら、特別な理由がなければ `standalone` を選びます。

理由は単純で、十分アプリらしく見えるうえに、fullscreenほど画面を強く制限しないからです。

例えば、

- ブログ
- 商品ページ
- 予約ページ
- プロフィール
- 管理画面
- 一般的なWebツール

なら、まずstandaloneで困ることは少ないと思います。

OJappの1P1Aでも、基本の考え方は「Webページをそのままホーム画面から使いやすくする」なので、無理にブラウザらしさを全部消すよりstandaloneの方が扱いやすいです。

## fullscreenを使いたいのは「画面全部を使う理由」がある時

fullscreenが悪いわけではありません。

むしろ用途が合えばかなり強いです。

例えば、

- ゲーム
- タイマー
- プレゼン表示
- デジタルサイネージ
- 施設内の専用端末
- 画面いっぱいを使いたい画像・映像ツール

のように、ブラウザUIが邪魔になる用途ならfullscreenを選ぶ意味があります。

逆に普通の記事やECページで、とにかくアプリっぽくしたいからfullscreenにする、という使い方は少し強すぎると感じます。

**「fullscreenにできる」ではなく、「fullscreenにする理由があるか」で決める。**

これくらいがちょうどいいです。

## displayは見た目だけでなくPWA判定にも使える

standaloneにはもう1つ実用的なメリットがあります。

JavaScriptから現在のdisplay modeを確認できます。

```js
const isStandalone =
  window.matchMedia('(display-mode: standalone)').matches;
```

これを使えば、PWAとしてstandalone表示されている時だけ処理を変えられます。

例えば、

- ホーム画面ユーザーだけメニューを変える
- 「ホーム画面に追加」の案内を消す
- 限定メッセージを出す
- ホーム画面起動だけ計測する

といった使い方ができます。

PWAがどのモードで動いているか確認する方法は、[PWAの状態を確認する方法｜MODE・Service Worker・Installableの意味](https://tips.ojapp.app/pwa-status-check/)でも紹介しています。

## displayを変えたら必ず実機で確認する

今回の検証で一番強く感じたのは、**displayは名前だけで挙動を想像しない方がいい**ということです。

standaloneとfullscreenは仕様上は別の表示モードですが、実機ではAndroidとiPhoneで結果がかなり違いました。

PWA LABでは、

- standalone
- fullscreen
- minimal-ui
- browser

まで一通り切り替えて試しました。

Androidでは違いがはっきり出る設定が多い一方、iPhoneではほとんど変わらないものもあります。

なのでManifestを書き換えたら、PCのDevToolsだけで終わらせず、実際にホーム画面へ追加して起動してみるのがおすすめです。

## 迷ったらstandalone、目的が明確ならfullscreen

結論はかなりシンプルです。

**普通のPWAならstandalone。**

**画面全体を使う明確な理由があるならfullscreen。**

AndroidではfullscreenにするとToolbarまで消えて、かなり強いアプリ表示になります。

一方、PWA LABで確認したiPhoneでは、standaloneとfullscreenで大きな見た目の差は出ませんでした。

だから「fullscreenの方が上位版」「standaloneよりアプリっぽいから正解」という関係ではありません。

どちらも用途が違うだけです。

個人的には、まず `display: standalone` で作ってみて、「このToolbar本当にいらんな」「もっと画面が欲しいな」と思った時にfullscreenを試すくらいが一番失敗しにくいと思います。
