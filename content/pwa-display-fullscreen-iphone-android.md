
PWAのmanifest.jsonには、`display`という項目があります。

ここでは、PWAをホーム画面から開いたときに、どんな表示モードで起動するかを指定できます。

よく使われるのは`standalone`ですが、設定値の中には`fullscreen`というものもあります。

名前だけ見ると、かなり強そうです。

ブラウザの余計なバーが消えて、完全にアプリみたいに見えるなら、PWAには最高なんじゃないかと思います。

でも実際にPWA LABで試してみると、かなり現実的な差がありました。

**結論から言うと、Androidではかなりアプリ感が出ます。ただし、iPhoneではほぼ期待しない方がいいです。**

## display とは何か

`display`は、manifest.jsonの中で指定するPWAの表示モードです。

例えば、以下のように書きます。

```json
{
 "name": "OJapp PWA LAB",
 "start_url": ".",
 "display": "fullscreen",
 "background_color": "#f5f7fb",
 "theme_color": "#2dd7ff"
}
```

この`display`を変えることで、PWAを開いたときの見た目が変わります。

主な値としては、次のようなものがあります。

- `standalone`：普通のPWAらしい表示
- `fullscreen`：できるだけ全画面で表示
- `minimal-ui`：最小限のブラウザUIを残す表示
- `browser`：通常のブラウザ表示

 	
 	
 	
 	

今回試したのは、この中の`fullscreen`です。

## Androidではかなりアプリっぽくなる

Android Chromeで`display: fullscreen`を試すと、かなり分かりやすく変化がありました。

通常の`standalone`では、上部にPWAらしいバーやシステム側の表示が残ることがあります。

しかし`fullscreen`にすると、そのあたりがかなり消えて、画面全体をアプリのように使える感じになります。

これはかなり気持ちいいです。

特に、ゲーム、展示用ページ、縦長のツール、操作画面を広く使いたいWebアプリでは、fullscreenの良さが出ます。

正直、Androidだけを見るなら「これでええやん」と思うくらいアプリ感があります。

![](Screenshot_20260521_161120.png)

![](Screenshot_20260521_160107.png)

## iPhoneではほぼ変化がなかった

一方で、iPhoneでは全く変化がありません。

`display: fullscreen`にしても、Androidのような分かりやすい全画面化はほぼ感じませんでした。

これはPWA LABで試していて、かなり大きな差だと思った部分です。

同じmanifestを書いているのに、Androidでは効く。iPhoneではあまり効かない。

この差が、PWAを実機で試さないと分からないところです。

iPhoneのホーム画面追加は、PWAというよりWebClipに近い挙動も残っています。

なので、manifestに書いた値が全部そのまま反映されると思って作ると、かなりズレます。

## standaloneとの違い

実用面で比べるなら、`standalone`と`fullscreen`の違いが一番大事です。

`standalone`は、PWAで一番よく使う表示モードです。

ブラウザのタブ感を減らしつつ、アプリっぽく開けます。

AndroidではPWAとしての見た目が出やすく、iPhoneでもホーム画面から開いたときの基本形として使いやすいです。

一方で、`fullscreen`はAndroidではかなり強いですが、iPhoneでは効果が薄いです。

つまり、両方のOSを考えるなら、基本は`standalone`の方が無難です。

## fullscreen が向いているケース

`fullscreen`が向いているのは、画面全体を使うことに意味があるPWAです。

- ゲーム系のWebアプリ
- 展示・デモ用ページ
- 全画面で見せたいビジュアルページ
- 横画面固定と組み合わせたい実験ページ
- Android向けに強いアプリ感を出したいツール

 	
 	
 	
 	
 	

特にAndroid向けに絞れるなら、fullscreenはかなり面白い選択肢です。

画面の没入感が出るので、普通のWebページとは違う印象になります。

ただし、iPhoneでも同じ見た目になると思って使うのは危険です。

## fullscreen が向いていないケース

逆に、普通のWebツールや情報ページでは、fullscreenは少し強すぎることがあります。

例えば、記事、フォーム、設定画面、名刺ページ、プロフィールページなどです。

こういうページでは、完全な没入感よりも、安定して違和感なく使えることの方が大事です。

OJappやPetalのように「ホーム画面に入口を置く」タイプでは、基本は`standalone`の方が合いやすいと感じます。

fullscreenにするとアプリ感は増えますが、その分、戻る導線やOSごとの差が気になりやすくなります。

## minimal-ui と browser も試した感想

PWA LABでは、`fullscreen`以外の表示モードも試しました。

`minimal-ui`は、PCでは戻るボタンやリロードボタンのような最小限のUIが見えることがあります。

ただ、AndroidやiPhoneではあまり大きな変化を感じませんでした。

`browser`は、そもそもPWAとしてのインストール候補から外れることもあります。

なので、PWAとして使わせたいなら、基本的には`standalone`か`fullscreen`のどちらかで考えるのが分かりやすいです。

## 実験して分かったこと

今回の比較で一番大きかったのは、同じmanifestでもiPhoneとAndroidで見え方が全然違うということです。

Androidはmanifestの指定がかなり見た目に反映されます。

`display`、`theme_color`、`orientation`あたりは、試すと変化が分かりやすいです。

一方で、iPhoneはかなり独自です。

ホーム画面追加はできますが、Android ChromeのPWAとは別物として考えた方が安全です。

PWAは「仕様ではこう書ける」より、「その端末でどう見えるか」の方が大事だと改めて感じました。

## 結論：基本は standalone、Android特化なら fullscreen もあり

`display: fullscreen`は、Androidではかなり効果があります。

ブラウザ感が減って、かなりアプリっぽく見えます。

ただし、iPhoneでは同じような変化は期待しにくいです。

そのため、iPhoneとAndroidの両方を想定するなら、基本は`display: standalone`が一番実用的です。

Android向けの実験、ゲームっぽい画面、展示用ページなどでは`fullscreen`を選ぶ価値があります。

でも、一般向けのPWAやホーム画面追加ツールでは、無理にfullscreenを使うより、standaloneで安定させる方が使いやすいと思います。

## 関連記事

PWAの基本から知りたい場合は、[PWAとは？スマホのWebサイトを“アプリ化”する仕組みをわかりやすく解説](https://tips.ojapp.app/what-is-pwa/)が参考になります。

manifest.jsonやService Workerを含めた作り方は、[PWAの作り方｜manifest.json・Service Worker・ホーム画面対応を丁寧に解説](https://tips.ojapp.app/how-to-pwa/)でまとめています。

iPhone側の挙動が気になる場合は、[SafariのPWA制限とは？できること・できないことまとめ【2026】](https://tips.ojapp.app/safari-pwa-limitations/)も近い内容です。

## まとめ

`display: fullscreen`は、名前の通りかなり強い表示モードです。

Androidでは完全フルスクリーンに近い見た目になり、アプリ感がかなり増します。

しかし、iPhoneではほぼ見た目の変化がなく、Androidと同じ感覚では使えません。

実用性で見るなら、基本は`standalone`。

Androidで全画面体験を作りたいときだけ、`fullscreen`を検討する。

このくらいの距離感が、今のところ一番現実的だと思います。
