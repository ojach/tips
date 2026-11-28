iOS 27でホーム画面に追加したPWAを開くと、画面上部に広いブラーが表示されるようになってしまいました。

時計や電波、バッテリーが表示されるステータスバーだけではなく、その下にあるヘッダー付近までぼかされるため、サイトによってはロゴやボタンがにじんで見えます。

この表示はWebページ側で作っているブラーではありません。iOSがPWAの上部に重ねているシステム側の表現です。

そのため、通常のCSSで`backdrop-filter: none`などを指定しても消せません。

ところが実機で検証している途中、**ハンバーガーメニューを一度開閉すると、このブラーが消れる**ことに気づきました。

今回は、偶然見つけた挙動から原因を切り分け、ハンバーガーメニューを表示せずに上部ブラーだけを消せるか検証した記録です。

**注意：この記事の内容は、iOS 27環境で確認したWebKitの描画挙動を利用する実験です。Appleが提供する正式なAPIや推奨実装ではありません。OSアップデートによって動作が変わる可能性があります。**

## 最初に試したのは「透明度を下げる」設定

iPhoneには、次のアクセシビリティ設定があります。

**設定 → アクセシビリティ → 画面表示とテキストサイズ → 透明度を下げる**

これを有効にすると、PWA上部の広いブラーは消え、ほぼ単色の背景になります。

つまり、問題のブラーがWebページ内のCSSではなく、iOSのシステム描画であることは確認できました。

しかし、Webサイト側からユーザーのアクセシビリティ設定を強制的に変更することはできません。

`prefers-reduced-transparency`のような仕組みも、ユーザー設定を読み取るためのものであり、サイト側から設定を有効にするものではありません。

## 古いステータスバー用metaも効果なし

次に疑ったのが、iOSのホーム画面Webアプリで使われている独自metaです。

```html
<meta name='apple-mobile-web-app-status-bar-style' content='default'>
```

`black-translucent`が指定されている場合は表示へ影響する可能性がありますが、今回の広いブラーは`default`を指定しても変わりませんでした。

ステータスバーの基本スタイルではなく、iOS 27のPWA描画そのものに関係しているようです。

## Search Consoleのメニューを開くとブラーが消えた

転機になったのは、Google Search Consoleをホーム画面へ追加して使っていたときでした。

起動直後は上部にブラーが表示されています。しかし、左側のドロワーメニューを開くとブラーが消え、メニューを閉じても消えた状態が維持されました。

特定サイトだけの挙動かと思いましたが、WordPressで運営しているOJapp Tipsでも同じ現象を確認できました。

Tipsではハンバーガーメニューを開くと、本文側に半透明の黒いカバーが表示されます。メニューを閉じると本文は元に戻りますが、iOSのステータスバー領域には薄いグレーが残りました。

この時点で、ハンバーガーメニューが作る固定レイヤーやアニメーションが、iOS上部の描画状態を切り替えている可能性が出てきました。

<div class="balloon balloon-boder">
<figure class="balloon__img balloon__img-left">
<div><img src="/images/appin2.webp" alt=""></div>
<figcaption class="balloon__name">アッピン</figcaption></figure>

<div class='balloon__text balloon__text-right'>まさかハンバーガーメニューを開いたら消えるとは思わんよね👻 こういうのは実機で触ってる時にしか見つからない。</div>
</div>

## メニューのCSSを確認してみる

OJapp Tipsで使用しているテーマでは、背景カバーとドロワー本体がおおよそ次のように実装されていました。

```css
.menuBtn__unshown {
  display: none;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
  z-index: 999999;
  animation: fade 0.3s;
}

.menuBtn__checkbox:checked ~ .menuBtn__unshown {
  display: block;
}

.menuBtn__content {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 90%;
  height: 100%;
  transform: translateX(110%);
  transition: 0.3s;
}

.menuBtn__checkbox:checked ~ .menuBtn__content {
  transform: translateX(0%);
}
```

ここで気になったのは、次の組み合わせです。

- 画面全体を覆う`position: fixed`のカバー
- `transform`で画面内外へ移動する固定パネル
- パネルを閉じても削除せず、画面外に残す構造

そこで、この動きだけを再現してみることにしました。

## 透明なカバーだけではブラーが戻った

最初は、透明に近い全画面カバーを一瞬表示すれば同じ状態を作れると考えました。

```css
position: fixed;
inset: 0;
background: rgba(255, 255, 255, 0.01);
```

結果は惜しいところまでいきました。

カバーを表示している間はブラーが消えます。

しかし、カバーを削除するとすぐに元のブラーへ戻りました。

カバーを表示したまま残す方法も試しましたが、それだけではブラーを安定して消せませんでした。

つまり、単純に透明な`position: fixed`要素を置くだけでは条件が足りないようです。

## 固定パネルをスライドさせるとブラーが消えた

そこで次に、実際のハンバーガーメニューと同じように、固定パネルを画面内へ移動させ、その後画面外へ戻す動きを再現しました。

背景はほとんど見えない透明度にして、操作を妨げないように`pointer-events: none`を指定します。

```html
<style>
#ojapp-blur-cover {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 2147483646;
  background: rgba(255, 255, 255, 0.01);
  pointer-events: none;
  animation: ojapp-cover-fade 0.3s;
}

#ojapp-blur-panel {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 90%;
  height: 100%;
  z-index: 2147483647;
  background: rgba(255, 255, 255, 0.01);
  pointer-events: none;
  transform: translateX(110%);
  transition: transform 0.3s;
}

@keyframes ojapp-cover-fade {
  from { opacity: 0; }
  to   { opacity: 1; }
}
</style>

<script>
window.addEventListener('load', () => {
  const isStandalone =
    matchMedia('(display-mode: standalone)').matches ||
    navigator.standalone === true;

  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);

  if (!isStandalone || !isIOS) return;

  const cover = document.createElement('div');
  cover.id = 'ojapp-blur-cover';

  const panel = document.createElement('div');
  panel.id = 'ojapp-blur-panel';

  document.body.append(cover, panel);

  void panel.offsetWidth;

  requestAnimationFrame(() => {
    cover.style.display = 'block';
    panel.style.transform = 'translateX(0%)';

    setTimeout(() => {
      cover.style.display = 'none';
      panel.style.transform = 'translateX(110%)';

      // パネルは削除せず、画面外に残す
    }, 500);
  });
});
</script>
```

この処理をPWAで実行すると、画面上にはメニューを表示していないにもかかわらず、iOS上部の広いブラーが消れました。

時計や電波、バッテリーの領域自体は残りますが、背景は薄い単色になり、下にあるロゴやコンテンツが広範囲にぼける状態を回避できました。

## ポイントはパネルを削除しないことだった

今回の検証で面白かったのがここです。

一度パネルを動かした後、その要素自体を削除してしまうのではなく、

```text
transform: translateX(110%);
```

で画面外へ戻して残しておきます。

見た目には何も表示されていません。

`pointer-events: none`なので通常のタップ操作も妨げません。

しかし、この状態では今回の実機環境で上部ブラーが消えた状態を維持できました。

## 何が起きているのか

WebKitの内部実装を確認したわけではないため、ここからは断定できません。

今回の結果からは、次のような流れが起きている可能性があります。

1. iOS 27がPWA上部にシステム側のブラーを描画する
2. 固定パネルの移動によってWebKitの合成レイヤーが切り替わる
3. その過程で上部のライブブラーが単色背景へ切り替わる
4. パネルを画面外に残すことで、その描画状態が維持される

重要なのは、ページ側からiOSのアクセシビリティ設定を変更したわけでも、ステータスバーAPIを操作したわけでもないことです。

Webページ内の合成レイヤーを動かした結果として、iOS側の表示が変化しています。

## これは正式な解決方法ではない

今回の方法は、iOS 27の特定環境で確認できた実験的な回避策です。

- OSアップデートで突然動かなくなる可能性がある
- 端末やiOSのバージョンによって結果が異なる可能性がある
- 透明な固定レイヤーを残すため、描画負荷への影響を確認する必要がある
- 他のモーダルや固定UIと干渉する可能性がある
- Appleが意図した公開仕様ではない

そのため、すべてのPWAへ無条件に入れるより、上部ブラーがUI上の問題になっているサイトだけで試す方が安全です。

## こういう挙動こそ実機でしか見つからない

今回の発見のきっかけは、仕様書でもWebKitのドキュメントでもありませんでした。

Google Search ConsoleをPWAとして使っていて、たまたまメニューを開いたことです。

そこで「ブラー消えた？」となり、OJapp Tipsでも試したら同じ現象が起きました。

そこからCSSを分解して、透明カバーだけを試し、固定パネルを動かし、最終的にハンバーガーメニューを表示しなくても同じ状態を再現できました。

PWAはManifestだけを見ていても分からないことがかなりあります。

特にiPhoneでは、OSとWebKitとホーム画面起動が組み合わさった時にだけ見える挙動があります。

## iOS 27のPWA上部ブラーは固定パネル操作で消せるケースがあった

今回の検証では、iOS 27のPWA上部に表示される広いブラーを、Webページ側の固定パネル操作によって消せるケースを確認しました。

単純な背景色やmeta指定では変わらず、透明な全画面カバーだけでは一時的にしか消えませんでした。

しかし、ハンバーガーメニューと同様に固定パネルをスライドイン・スライドアウトさせて画面外へ残すことで、ブラーが消えた状態を維持できました。

**正式な制御方法ではありませんが、PWAの見た目はManifestやCSSだけで決まるわけではなく、OSとWebKitの描画処理にも大きく左右される。**

今回の実験は、それがかなり分かりやすく出た例でした。

その他にもやり方はあるかもしれませんし、もう少し透明化できないか模索してみたいと思います。(何か情報あればコメントよろしくお願いします)

こういう挙動は、やっぱり実際にホーム画面へ追加して触り続けないと見つからないですね。

## 追記：JavaScriptを使わずにぼかしを消す方法

この記事ではJavaScriptを使った方法を紹介しましたが、その後、**JavaScriptを使わずにCSSだけで対応する方法**もあることが分かりました。

私もいろいろ試していたので、おしいところまではいってたんですけどねｗ

### 方法1：headerをsafe areaまで広げる

Redditのコメントで教えてもらった次の方法も実機で試してみました。

```css
header {
  position: sticky;
  top: 0;
  background-color: #ffffff;
  padding-top: env(safe-area-inset-top);
}
```

これでも、iOS 27のPWA上部に表示されていたぼかしが消えることを確認できました。

`header`を`sticky`で画面上部に固定し、`env(safe-area-inset-top)`を使ってsafe areaまで背景を広げる方法です。

専用のHTML要素を追加する必要がなく、すでに固定ヘッダーを使っているサイトなら、かなりシンプルな方法だと思います。

ただし、上の例では`background-color: #ffffff;`で背景色を固定しています。ダークモードを使っていたり、スクロールによってヘッダーの背景色が変わったりするサイトでは、そのデザインに合わせた調整が必要です。

### 方法2：画面上部に専用の要素を置く

ヘッダーの構造を変更したくない場合は、画面上部に固定した要素を1つ追加する方法も使えます。

```html
<div class="remove-blur" aria-hidden="true"></div>
```

そして、ホーム画面から起動した`standalone`時だけ、この要素を画面上部に配置します。

```css
@media (display-mode: standalone) {
  .remove-blur {
    position: fixed;
    inset: 0 0 auto;
    height: 11px;
    pointer-events: none;
    background: #fff;
    -webkit-background-clip: text;
    background-clip: text;
  }
}
```

これなら、こちらもJavaScriptを使わずに実装できます。

今回いくつかの方法を試したことで、**画面最上部に背景を持った要素を描画することが、ぼかしを消すポイントの1つになっていそう**です。

最初に試していたハンバーガーメニューの開閉でぼかしが消えた現象とも、少しつながってきた気がします。

### ただ、これだと少しアプリらしさが消える

実際に試してみると、上部を白で固定するだけでもぼかしへの対策はできます。

ただ、私の場合は起動直後の画面を黒ベースにしているため、最初から上部だけ白くしてしまうと少しアプリらしさが消えてしまいました。

そこで、**起動直後は黒、スクロールすると徐々に白へ変化する**ように少しアレンジしてみました。

HTMLは同じです。

```html
<div class="remove-blur" aria-hidden="true"></div>
```

CSSでは、起動直後とスクロール後の色をCSS変数として用意します。

```css
:root {
  --status-top: #000;          /* 起動直後の色 */
  --status-after-scroll: #fff; /* スクロール後の色 */
}

@media (display-mode: standalone) {
  .remove-blur {
    position: fixed;
    inset: 0 0 auto;
    height: 11px;
    pointer-events: none;
    background-color: var(--status-top);
    -webkit-background-clip: text;
    background-clip: text;
  }
}
```

そしてJavaScriptでスクロール量を取得し、2色の間を徐々に変化させます。

```js
(() => {
  const standalone =
    matchMedia("(display-mode: standalone)").matches ||
    navigator.standalone === true;

  if (!standalone) return;

  const strip = document.querySelector(".remove-blur");
  if (!strip) return;

  const readColor = (name) => {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(name).trim().replace("#", "");

    const hex = value.length === 3
      ? [...value].map((c) => c + c).join("")
      : value;

    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16)
    ];
  };

  const top = readColor("--status-top");
  const after = readColor("--status-after-scroll");

  // この距離までスクロールすると完全にスクロール後の色になる
  const changeDistance = 150;

  function update() {
    const progress = Math.min((scrollY + 12) / changeDistance, 1);

    const rgb = top.map((value, i) =>
      Math.round(value + (after[i] - value) * progress)
    );

    strip.style.backgroundColor = `rgb(${rgb.join(",")})`;
  }

  update();
  addEventListener("scroll", update, { passive: true });
})();
```

これで、起動直後はページ上部のデザインに馴染ませつつ、スクロールすると徐々に通常の背景色へ変化させられます。

整理すると、固定ヘッダーがあるサイトなら**headerをsafe areaまで広げる方法**が一番シンプルです。ヘッダーを触りたくない場合は、**専用の固定要素を追加するCSS方式**が使えます。

さらに、ダークモードやスクロールに合わせて上部の色も変化させたい場合は、**JavaScriptを組み合わせてデザインに合わせる**という使い分けもできそうです。

<video controls playsinline preload="metadata" style="width:100%;height:auto;">
  <source src="/images/remove-blur.mp4" type="video/mp4">
</video>

### 参考情報

今回のCSSによる対策を検証するにあたり、以下の記事も参考にしました。

- [Zenn：iOS 27 PWAのぼかしに関する記事](https://zenn.dev/uakihir0/articles/260920-ios27-pwa-blur)
- [Qiita：iOS PWAのぼかしに関する記事](https://qiita.com/na-trium-144/items/0add98a80ca2391e3f17)

<blockquote class="reddit-embed-bq" style="height:316px" data-embed-height="316">
<a href="https://www.reddit.com/r/PWA/comments/1woodbv/a_quick_workaround_for_the_ios_27_pwa_status_bar/">A quick workaround for the iOS 27 PWA status bar header blur glitch</a><br> by
<a href="https://www.reddit.com/user/OJapp/">u/OJapp</a> in
<a href="https://www.reddit.com/r/PWA/">PWA</a>
</blockquote><script async="" src="https://embed.reddit.com/widgets.js" charset="UTF-8"></script>