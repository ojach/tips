Web App Manifestには `scope` という項目があります。</p>

PWAを調べると「アプリとして扱うURLの範囲を指定するもの」と説明されることが多い設定です。

説明だけなら、それほど難しくありません。

ところが実際にiPhoneとAndroidでPWAを作り分けてみると、私はこの `scope` でかなりハマりました。

Androidでは複数のPWAを作りたい時に影響し、iPhoneではホーム画面から開いた後の表示にも影響する。

**同じManifestを書いているのに、scopeの意味がiPhoneとAndroidでまったく同じようには見えない。**

今回はPWA LABでの実機検証をもとに、`scope` を設定すると何が変わるのか整理します。

## scopeはPWAとして扱うURL範囲を指定する

まず基本的な役割です。

例えばManifestに次のように書きます。

```json
{
  "name": "My App",
  "start_url": "/app/",
  "scope": "/app/",
  "display": "standalone"
}
```

この場合、`/app/` 以下をそのPWAのナビゲーション範囲として指定しています。

```text
/app/
/app/page-a/
/app/page-b/
```

はscope内です。

一方で、

```text
/blog/
/product/
```

などはscope外になります。

つまりscopeは、単純に言えば<strong>「このPWAの中として扱うURLはここまで」</strong>という境界をブラウザへ伝える設定です。

## scopeを「/」にするとドメイン全体が範囲になる

例えば、

```text
"scope": "/"
```

とすると、そのオリジンのルート以下が広い範囲でPWAのscopeに入ります。

サイト全体を1つのPWAとして設計するなら、これは分かりやすい設定です。

```text
example.com/
├─ news/
├─ tools/
├─ products/
└─ profile/
```

これらをまとめて1つのAppとして扱いたいなら、ルートscopeには意味があります。

私が1S1A（One Site. One App.）と呼んでいる設計とも相性がいいです。

[PWAの二極化：トップへ還る「1S1A」と、全ページをアプリ化する「1P1A」](https://tips.ojapp.app/pwa-1s1a-vs-1p1a/)でも、このアプリ単位の違いを整理しています。

## 問題は複数のPWAを同じサイトに置きたい時

PWA LABで問題になったのはここでした。

同じドメイン内に、別々のホーム画面Appとして扱いたいページやサービスがありました。

例えば、

```text
example.com/lab/
example.com/petal/
```

のような構成です。

それぞれ名前もアイコンも違うので、こちらとしては別のAppとしてホーム画面へ置きたい。

ところがAndroidでManifestに広い `scope: "/"` を設定していると、期待していたように独立したAppとして扱えないケースが出ました。

PWA LABでは、LABとPetalのManifestにどちらも `scope: "/"` を設定したことで、Android側では同じ広いアプリ領域を持つ構成になり、複数の独立したホーム画面Appとして扱いたい設計と衝突しました。

<div class="balloon balloon-boder">
<figure class="balloon__img balloon__img-left">
<div><img src="/images/appin2.webp" alt=""></div>
<figcaption class="balloon__name">アッピン</figcaption></figure>

<div class='balloon__text balloon__text-right'>別アプリのつもりで作ってるのに、scopeを広げすぎて自分から境界を重ねてたんだね👻</div>
</div>

## Androidではscopeが「どこまで同じAppか」に強く関わった

この実験から、Androidでページ単位やサービス単位のPWAを複数作る場合、scopeを何となく `/` にするのは危ないと感じました。

サイト全体を1つのAppにしたいなら問題ありません。

でも、

```text
/lab/ → LAB App
/petal/ → Petal App
```

のように分離したいなら、ルート全体を同じアプリ範囲として宣言する設計とは方向が合いません。

特に1P1Aのように、さらに細かくページごとのAppを作りたい場合はscopeを固定しない方が扱いやすいケースがあります。

## scopeは必ず書かなければいけない項目ではない

ここも昔のManifestサンプルを見ていると迷いやすいところです。

`scope` は、毎回手動で指定しなければPWAが成立しない項目ではありません。

Manifestでscopeを省略した場合は、`start_url` をもとにデフォルトのscopeが決定されます。

そのため、特別に広いナビゲーション範囲を指定する必要がなければ、あえてscopeを書かない設計もできます。

私は1P1AのAndroid向けManifestでは、この「scopeを固定しない」という考え方を使っています。

## 一方、iPhoneでは別の理由でscopeを使いたくなった

ここからがPWA LABで一番面白かった部分です。

Androidでは複数Appを成立させるため、scopeを広くしたくない。

ところがiPhoneでホーム画面から開いたWebページを試していると、scopeの範囲によって表示のされ方が変わるケースがありました。

PWA LABの実機検証では、目的のページをscope内に収めることで、ホーム画面から開いた時にSafari由来のミニUIが表示されにくい構成を確認しています。

つまり私の構成では、

```text
Android
↓
scopeを広げたくない

iPhone
↓
表示範囲を明確にするためscopeを使いたい
```

という逆方向の要求が出てきました。

## 同じManifestを全端末へ返すと都合が悪くなった

最初は当然、iPhoneもAndroidも同じManifestで動かそうとしていました。

でも実機で試すと、それでは両方に都合のいい設定になりませんでした。

iPhone側の表示を整えるためにscopeを強くすると、Android側では複数Appの境界と衝突する。

Android側を優先してscopeを外すと、今度はiPhone側で期待していた表示にならないケースがある。

ここで私は、Manifestを1種類に固定すること自体をやめました。

## 最終的にiPhoneとAndroidでManifestを出し分けた

PWA LABで採用した対策はかなり単純です。

```text
iPhone
↓
scopeあり

Android
↓
scopeなし
```

User-Agentなどで環境を判定し、それぞれに合ったManifestを返す形です。

例えば考え方としては、iPhone側では、

```json
{
  "start_url": ".",
  "scope": "/petal/",
  "display": "standalone"
}
```

Android側では、

```json
{
  "start_url": ".",
  "display": "standalone"
}
```

のようにscopeだけを変えます。

これはWeb標準として「iPhoneは必ずscopeあり、Androidは必ずscopeなし」という意味ではありません。

**同じサービスを両OSで実機検証した結果、私のページ単位PWAの構成ではこの出し分けが最も扱いやすかった**という話です。

## scopeはdisplayが効く範囲にも関係する

scopeを単なる「インストール可能なURLの範囲」と考えると分かりにくくなります。

scopeは、そのPWAのナビゲーション境界です。

そのためscope外へ移動した場合、ブラウザは「アプリ内部のページではない」と判断でき、表示の扱いが変わることがあります。

standaloneやfullscreenなどの表示方法を考える時も、この境界は無関係ではありません。

以前の[PWAのstandaloneとfullscreenの違い｜どっちを使うべき？](https://tips.ojapp.app/pwa-standalone-vs-fullscreen/)でも触れたように、Manifestで指定したdisplayが実際にどう見えるかはOSやブラウザによって差があります。

scopeも同じで、設定値だけを見て終わるのではなく、実際の遷移まで確認した方が安全です。

## scopeを狭くすればいいとも限らない

では、常にscopeを狭くすればいいのでしょうか。

そういうわけでもありません。

例えば、

```text
"scope": "/app/"
```

としたPWAから、通常利用するページが、

```text
/account/
/settings/
/help/
```

に存在していたら、それらはscope外になります。

アプリ内として自然に遷移させたいページまでscope外にしてしまうと、逆にUXを崩す可能性があります。

つまりscopeは、広ければ良いわけでも、狭ければ良いわけでもありません。

**そのPWAとしてどこまでを1つのナビゲーション領域にしたいか**で決めます。

## 1S1Aなら広いscopeは自然

サイト全体を1つのAppとして扱う1S1Aなら、広いscopeは理解しやすい設計です。

```text
example.com/
↓
全部My App
```

サイト内をどこへ移動しても同じAppの中。

この設計なら `scope: "/"` にする理由があります。

## 1P1Aではscopeの意味が変わってくる

一方、1P1Aではページごとに別のホーム画面Appを作ります。

```text
/timer/
↓
Timer App

/compressor/
↓
Compressor App

/profile/alice/
↓
Alice App
```

ここで全Appへ同じ `scope: "/"` を与えると、「ページごとに別App」という設計と「ルート以下をAppの範囲にする」という設定がぶつかりやすくなります。

だから私は1P1Aでは、scopeを当然のように書くのではなく、必要性を考えてから設定するようになりました。

## start_urlとscopeは別々に考えた方が分かりやすい

`start_url` と `scope` は一緒に登場することが多いため、混同しやすい項目です。

かなり単純化すると、

```text
start_url
↓
どこから始めるか

scope
↓
どこまでをそのAppのナビゲーション範囲として扱うか
```

です。

例えば、

```text
"start_url": "/app/dashboard/",
"scope": "/app/"
```

なら、最初はdashboardを開きますが、PWAとしてのナビゲーション範囲は `/app/` 以下です。

この2つは似ていますが、役割は違います。

## scopeは「とりあえず/」と書かない方がいい

PWAのサンプルManifestをコピーすると、`scope: "/"` が最初から入っていることがあります。

サイト全体を1つのAppにするなら、それで問題ない場合があります。

でも複数PWA、ページ単位PWA、ディレクトリ単位PWAを考えるなら、その1行がアプリ境界を大きく変える可能性があります。

私自身、PWA LABとPetalをAndroidで同一Appのような状態にしてしまったことで、scopeの強さを実感しました。

**scopeは「PWAだから書く項目」ではなく、「このAppをどこまでにするか決める項目」です。**

サイト全体なら広くする。

特定ディレクトリならその範囲にする。

ページ単位で複数Appを作るなら、省略も含めて考える。

そしてiPhoneとAndroidで同じ挙動になるとは決めつけず、最後は実機で確認する。

scopeはManifestの中では小さな1行ですが、PWAの「境界」を決めるかなり重要な設定です。

次は、scopeと並んで複数PWAを作る時に気になる `id` を見ていきます。「manifestのidは何のためにあるのか」「省略するとどうなるのか」を整理します。
