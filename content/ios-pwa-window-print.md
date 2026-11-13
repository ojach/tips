PWA用のちょっとしたWebツールを作っていて、印刷ボタンを付けようと思いました。</p>

JavaScriptなら`window.print()`を呼ぶだけです。

「これは一瞬で終わるやろ。」

……と思ったら、終わりましぇーん

Safariでは普通に印刷画面が開くのに、同じページをiPhoneのホーム画面からPWAとして起動すると、ボタンを押しても何も起きません。

最初は自分のコードを疑いました。ただ、こういうときにSafariだけ、PWAだけ、と順番に切り分けていくと結構おもしろい結果が出ます。今回はiOS 27の実機で、`window.print()`の前後まで追ってみました。

## まずSafariでwindow.print()を試す

今回使ったのは同じHTMLです。Safariで普通に開いた場合と、ホーム画面へ追加して`standalone`で起動した場合だけを変えて比較しました。

まずSafariで`window.print()`を実行すると、予想通り印刷画面が表示されます。

さらに、印刷処理がどこまで進んでいるのかを見るために、次の3つも確認しました。

- `beforeprint`
- `matchMedia('print')`
- `afterprint`

Safariでは、これらも確認できました。

つまり少なくとも今回使ったページでは、印刷ボタンや`window.print()`の書き方そのものが原因ではなさそうです。

## 同じページをPWAで開くと何も起きない

次に、同じページをホーム画面から起動して試しました。

結果はかなり分かりやすく、**ボタンを押しても印刷画面が出ません。**

ただし、JavaScriptそのものが止まっているわけではありません。ログを確認すると`window.print()`を呼び出したところまでは通っており、そこで例外が発生して処理が落ちるような動きでもありませんでした。

ところが、その先で期待していた

- `beforeprint`
- `matchMedia('print')`
- `afterprint`

は、今回のPWA環境ではどれも反応しませんでした。

<div class="balloon balloon-boder">
<figure class="balloon__img balloon__img-left">
<div><img src="/images/appin2.webp" alt=""></div>
<figcaption class="balloon__name">アッピン</figcaption></figure>

<div class='balloon__text balloon__text-right'>print()でエラーが出るというより、その先の印刷処理へ入っていないように見えるのが今回のポイントです。</div>
</div>

## 本当にPWAで起動しているのかも確認した

ここで一応、「そもそも本当にPWAとして起動しているのか？」も確認しました。

`display-mode`を調べると、Safariでは次のようになります。

```text
browser
```

ホーム画面から起動した状態では、

```text
standalone
```

となりました。

ちゃんとホーム画面からPWAとして起動している状態です。`display-mode: standalone`の判定方法については、[PWAをホーム画面から開いたか判定する方法](https://tips.ojapp.app/pwa-detect-standalone-launch/)でも詳しく紹介しています。

つまり今回の比較では、同じページ、同じJavaScriptでも、Safariのブラウザ表示とホーム画面からのstandalone起動で`window.print()`の挙動が変わりました。

## Safariでは2回目の印刷で確認画面まで出た

検証中にもう一つ面白かったのが、Safari側の挙動です。

Safariで続けて印刷を実行していると、「このウェブサイトから自動的に印刷することは禁止されています。」という確認が表示されました。

![](IMG_2505.jpeg)

そこで許可すると、そのまま印刷画面へ進めます。

つまりSafariのブラウザ表示では、少なくとも今回の実機では、印刷を実行すると印刷用のUIだけでなく、連続実行に対する確認処理も動いていました。

ところがPWAでは、印刷画面だけでなく、この確認も表示されませんでした。ここを突破できれば印刷まで進めそうな気がするんですが、これは調べようがない部分になってしまいましたね。

ここまで来ると、単純に「印刷ダイアログだけ表示されていない」というより、Safariで動いている印刷フロー自体にstandalone側が入っていないようにも見えます。

これが今回の実機検証から見えた挙動です。なぜそうなるのか、iOS 27側で意図された制限なのか、不具合なのかまでは今回の検証だけでは断定できません。

## SafariとPWAの結果を並べるとかなりはっきりする

<table><thead><tr><th>確認項目</th><th>Safari</th><th>PWA（standalone）</th></tr></thead><tbody><tr><td><code>window.print()</code>の呼び出し</td><td>通る</td><td>通る</td></tr><tr><td><code>beforeprint</code></td><td>確認できた</td><td>反応なし</td></tr><tr><td><code>matchMedia('print')</code></td><td>確認できた</td><td>反応なし</td></tr><tr><td><code>afterprint</code></td><td>確認できた</td><td>反応なし</td></tr><tr><td>印刷画面</td><td>表示</td><td>表示されない</td></tr></tbody></table>

この結果を見ると、少なくとも今回のiOS 27環境では、`window.print()`というJavaScriptの呼び出しそのものが失敗しているようには見えません。

呼び出した後に始まるはずの印刷処理が、standaloneでは開始されていないように見えます。

iPhoneのPWAにはほかにもSafariとは挙動が異なる部分があります。現在確認している制限については、[SafariのPWA制限とは？できること・できないことまとめ](https://tips.ojapp.app/safari-pwa-limitations/)にも整理しています。

## ではPWAから印刷したいときはどうするか

今回の環境では、PWAの中から`window.print()`をそのまま使って印刷画面を出す方法は確認できませんでした。

そのため実際にツールへ印刷機能を入れるなら、現時点では**Safari側で開いて印刷してもらう**か、用途によっては**印刷用データをPDFとして生成・表示する**ような別ルートを用意する方が現実的です。

もちろん、これは「PWAでは印刷できない」とすべてのiOSや将来のバージョンまで断定する話ではありません。今回確認できたのは、iOS 27の実機でSafariでは動作し、ホーム画面からstandaloneで起動した同じページでは動作しなかった、という結果です。

PWAが動かないときは、いきなりコードを全部書き直すより、[PWAの状態を確認する方法](https://tips.ojapp.app/pwa-status-check/)のように、まずブラウザ表示とstandaloneを分けて確認すると原因をかなり絞れます。

## print()くらい一瞬だと思っていた

正直、最初は`window.print()`を1行書いて終わると思っていました。

それが、Safariでは動く。PWAでは動かない。イベントまで見てもPWA側だけ反応しない。さらにSafari側には連続印刷の確認まで出る。

なかなかiPhoneらしいハマり方でした。

ただ、こういう挙動は「PWAでは動かなかった」で終わらせるより、どこまでは動いていて、どこから反応しなくなるのかを残しておく方が後から役に立ちます。

今後iOSやWebKitの更新で挙動が変わった場合は、また同じテストをして追記していこうと思います。
