Web App Manifestには `id` という項目があります。</p>

`name` や `icons`、`start_url` と比べると、普段ユーザーから見えるものではありません。

そのため、Manifestを書いていても「これ本当に必要？」となりやすい項目です。

さらに複数のPWAを同じサイトに作ろうとすると、話が急に面白くなります。

**idはPWAそのものをブラウザが識別するための値だからです。**

ではidを省略したらPWAとして成立しないのでしょうか。

結論から言うと、省略できます。

今回は `id` の役割、省略時の挙動、`start_url` との関係、そして1P1Aのように同じサイトへ複数のPWAを作る時に何が起きるのかを整理します。

## idはPWAの識別子

まず基本です。

例えばManifestには次のように書けます。

```json
{
  "id": "/my-app/",
  "name": "My App",
  "start_url": "/my-app/",
  "display": "standalone"
}
```

`id` は、ブラウザがそのWebアプリを識別するための一意な識別子です。

名前が同じかどうかを見るための項目ではありません。

アイコンが同じかどうかでもありません。

ブラウザ側から見て「このManifestが説明しているWebアプリはどのアプリなのか」を判断するために使われます。

現在のMDNでも、`id` はWebアプリケーションの一意な識別子を指定するManifestメンバーとして定義されています。

## 同じidなら同じPWAとして扱える

`id` の意味が分かりやすくなるのは、Manifestを変更した時です。

例えば最初は、

```json
{
  "id": "/my-app/",
  "start_url": "/old-app/"
}
```

だったとします。

その後、起動ページを変更して、

```json
{
  "id": "/my-app/",
  "start_url": "/new-app/"
}
```

にします。

この場合、`id` が同じなので、対応ブラウザは同じPWAのManifest更新として扱えます。

つまりidを明示しておくと、PWAの識別を `start_url` そのものへ依存させずに済みます。

## idが違えば別のPWAとして識別できる

逆に、同じ場所からManifestを配信していても、異なる有効なidを持っていれば別のWebアプリとして識別できます。

```json
{
  "id": "/app-a/",
  "start_url": "/tool/"
}
```

と、

```json
{
  "id": "/app-b/",
  "start_url": "/tool/"
}
```

ではidが違います。

MDNでは、既にインストールされたアプリと一致しないidを持つManifestは、同じURLから配信されていても別のアプリケーションとして扱われると説明されています。

ここだけ見ると、複数PWAを作るなら「全部に別idを付ければいい」と思います。

でも、私が1P1Aを作っていて面白いと思ったのはここからです。

## 実はidは省略できる

`id` はManifestへ必ず書かなければならない項目ではありません。

では省略するとどうなるのでしょうか。

現在の仕様では、有効な `id` が指定されていない場合、<strong>`start_url` がアプリの識別子として使われます。</strong>

例えば、

```json
{
  "name": "Timer",
  "start_url": "/timer/",
  "display": "standalone"
}
```

のようにidがなくても、それだけで壊れるわけではありません。

Chrome for Developersでも、idを指定しなかった場合はブラウザが `start_url` をもとにidを生成すると説明されています。

<div class="balloon balloon-boder">
<figure class="balloon__img balloon__img-left">
<div><img src="/images/appin2.webp" alt=""></div>
<figcaption class="balloon__name">アッピン</figcaption></figure>

<div class='balloon__text balloon__text-right'>idを書かなかったら「識別子なし」になるんじゃなくて、start_urlがその役目をするんだね👻</div>
</div>

## idを省略するとstart_urlの設計が重要になる

ここで前回までの記事と話がつながります。

例えば、

```text
"start_url": "/timer/"
```

なら、そのURLが起動先であると同時に、id省略時にはアプリ識別にも関係します。

別のManifestが、

```text
"start_url": "/compressor/"
```

なら、別の値になります。

つまりページごとに異なるstart_urlを持つ構成では、idを明示しなくても結果としてアプリ識別子が分かれる設計が成立する場合があります。

これは[PWAのstart_urlは何を指定すべき？トップ・現在ページ・専用URLの違い](https://tips.ojapp.app/pwa-start-url-top-current-page-dedicated-url/)で扱った設計とも直結します。

## 1P1Aではidを省略する設計がシンプルだった

私が1P1A（One Page. One App.）でやりたいことは非常に単純です。

```text
ページA
↓
App A

ページB
↓
App B

ページC
↓
App C
```

それぞれのページを別のホーム画面Appとして扱いたい。

この時、ページごとに、

```text
"id": "/page-a/"
"id": "/page-b/"
"id": "/page-c/"
```

と個別idを生成することもできます。

でも、ページごとに異なる有効なstart_urlを持ち、それを識別にも利用できる構成なら、idをもう1つ生成して管理する必要がない場合があります。

そのため私の1P1Aでは、idを必須項目として扱わず、できるだけManifestをシンプルにする設計を使っています。

## idを省略することと「idが存在しない」は違う

ここはかなり大事です。

Manifestに、

```text
"id": "..."
```

を書いていないからといって、ブラウザがそのPWAを識別していないわけではありません。

対応する処理ではstart_urlから識別子が決定されます。

つまり、

```text
idを明示する
↓
自分で安定した識別子を決める

idを省略する
↓
start_urlをもとに識別される
```

という違いです。

## ではidは書かない方がいいのか

そういう意味でもありません。

サイト全体を1つのPWAとして長期間運用するなら、idを明示しておくメリットがあります。

特に大きいのが、将来 `start_url` を変更したい場合です。

例えば、

```text
現在
start_url: /app/

将来
start_url: /dashboard/
```

と変更するとします。

明示したidが安定していれば、start_urlを変えてもPWAの識別子を維持できます。

Chrome for Developersでも、idを追加するメリットとして、アプリ識別をstart_urlやManifestの場所への依存から切り離せることが説明されています。

## 固定Appならidを明示する意味は大きい

例えば1S1A（One Site. One App.）なら、

```json
{
  "id": "/my-app/",
  "start_url": "/",
  "scope": "/",
  "name": "My App"
}
```

のように、サイト全体を表す安定したidを決めておく設計は分かりやすいです。

将来トップページの構造や起動先が変わっても、アプリそのものの識別子は変えない。

**idをアプリの身分証、start_urlをアプリの入口**と考えると、この違いが分かりやすくなります。

## 複数PWAでは同じidを使い回さない

逆に注意したいのが、複数のPWAへ同じidを付けることです。

例えば、

```text
Timer
id: /my-app/

Compressor
id: /my-app/
```

のようにしてしまうと、こちらは別Appのつもりでも、Manifest上では同じ識別子を宣言しています。

別のAppとして扱いたいなら、idも別にする必要があります。

または、私の1P1Aのようにidを明示せず、ページごとに異なるstart_urlを識別へ利用する構成も考えられます。

## scopeとidは役割が違う

前回の記事で扱った `scope` と `id` も混同しやすい項目です。

かなり単純化すると、

```text
id
↓
これは何というAppなのかを識別する

start_url
↓
そのAppをどこから起動するか

scope
↓
どこまでをそのAppのナビゲーション範囲にするか
```

です。

例えば、

```json
{
  "id": "/shop-app/",
  "start_url": "/shop/home/",
  "scope": "/shop/"
}
```

なら、

```text
Appの識別子 → /shop-app/
起動ページ → /shop/home/
Appの範囲 → /shop/
```

と、それぞれ別の役割を持っています。

[PWAのscopeとは？設定すると何が変わるのかiPhone・Androidで比較](https://tips.ojapp.app/pwa-scope-iphone-android-difference/)と合わせて見ると、Manifestの設計がかなり整理しやすくなります。

## idはURL形式だが、開くためのURLではない

idにはURL形式の値を使います。

```text
"id": "/my-app/"
```

ただし、このURLはstart_urlのように「ここを開く」という意味ではありません。

MDNでも、idはURLとして処理されるものの、アクセス可能なリソースを指す必要はないと説明されています。

あくまで識別子です。

また、idはstart_urlと同一オリジンである必要があります。

## idにはクエリも使える

idはURL形式なので、クエリパラメータも識別子の一部として保持できます。

```text
"id": "/timer/?time=5"

"id": "/timer/?time=10"
```

この2つは異なるidとして扱える形になります。

これは、URLの状態を使ってAppを定義する設計では面白い特徴です。

一方、フラグメントはidの処理では無視されます。

```text
"id": "/timer/#five"
"id": "/timer/#ten"
```

のようにフラグメントだけを変えて、別idとして区別することはできません。

URL状態をアプリの識別へ使う場合、この違いは覚えておいた方がいいです。

## UDAではidを使う設計も考えられる

私が実験しているUDA（User Defined App）では、ユーザーがURLによって自分のAppの状態を定義します。

例えば、

```text
/timer/?time=5&mode=down
/timer/?time=20&mode=up
```

のようなURLです。

この時、クエリをstart_urlだけでなくidにも反映する設計なら、それぞれを異なる識別子として扱う考え方もできます。

ただし、UDAそのものは「idへクエリを書く技術」ではありません。

ユーザーがURLによって自分の入口や状態を定義するという設計思想で、その実装方法の1つとしてidやstart_urlを利用できます。

## idを省略するか明示するかは設計で決める

ここまでを整理すると、idは「必ず書く」「絶対に書かない」のどちらでもありません。

<table>
<thead>
<tr><th>設計</th><th>idの考え方</th></tr>
</thead>
<tbody>
<tr><td>サイト全体を1つの固定PWAにする</td><td>安定したidを明示するメリットが大きい</td></tr>
<tr><td>start_urlを将来変更する可能性がある</td><td>idを固定すると識別を維持しやすい</td></tr>
<tr><td>ページごとに動的PWAを作る</td><td>start_urlによる識別を利用してidを省略する設計も可能</td></tr>
<tr><td>複数の固定PWAを作る</td><td>それぞれ異なるidを設定する</td></tr>
<tr><td>URL状態ごとに識別したい</td><td>クエリを含むidも設計可能</td></tr>
</tbody>
</table>

## 「idを省略すると壊れる」は2026年の正しい理解ではない

Manifestのサンプルを見ていると、idが入っているものと入っていないものがあります。

そのため「最近のPWAではidも必須になったのでは？」と思うかもしれません。

でも、idは省略できます。

省略した場合はstart_urlが識別に使われます。

一方、明示したidには、start_urlを変更してもアプリの識別子を安定させられるという大きな意味があります。

**idはPWAを成立させるために何となく追加する項目ではなく、「このPWAを何として識別し続けるか」を決める項目です。**

固定された1つのAppならidを持つ。

ページごとに動的にAppを作るなら、start_urlを識別へ利用する。

複数Appなら同じidを使い回さない。

この3つを理解しておくだけでも、id・start_url・scopeの関係はかなり見えやすくなります。

次は、Manifestの中でもさらに見た目に近い項目、`screenshots` を見ていきます。Chromeのインストール画面で何が変わるのか、実際の表示をもとに整理します。
