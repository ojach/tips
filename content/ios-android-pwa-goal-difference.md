PWAの話になると、よくこう説明されます。

AndroidはPWAに対応している。

iPhoneはPWAにあまり対応していない。

たしかに、PWAの仕様だけを見ると、この説明は分かりやすいです。

Android Chromeはmanifest.json、Service Worker、インストール、通知、ショートカットなどがしっかり効きます。

一方でiPhone Safariは、Androidと同じようには動きません。

でも、実際にiPhoneとAndroidの両方でPWAを検証していると、少し違う見え方をしてきます。

**正確には、AndroidとiPhoneはPWAに求めているゴールが違う。**

これが、PWA LABで何度も検証してきて感じた一番大きな違いです。

## AndroidはWebページをアプリ化しようとしている

AndroidのPWAは、かなり分かりやすく「Webページをアプリに近づける」方向で作られています。

ブラウザで開いているWebサイトを、ネイティブアプリのような体験へ持っていく。

この思想がかなり強いです。

そのため、PWAに必要な仕組みも揃っています。

- manifest.json
- Service Worker
- Push通知
- Install Prompt
- Shortcuts
- theme_color
- background_color
- maskableアイコン
- displayモード
- orientation

    
    
    
    
    
    
    
    
    
    

もちろん、すべてが完璧というわけではありません。

manifestのキャッシュが強かったり、同じドメイン内の複数PWAで判定がややこしくなったり、実機で試すと普通にハマります。

それでも、PWAの仕様に沿って作ったとき、Androidはかなり素直に反応します。

たとえば、`display: fullscreen`を指定すれば全画面感が強くなります。

`theme_color`はツールバー色に反映されやすいです。

`orientation`もAndroidではしっかり反映されます。

つまりAndroidにとってPWAは、**Webから作るアプリ**です。

## iPhoneはWebページをホーム画面に置く体験から始まっている

一方で、iPhoneは少し違い、iOSには、PWAという言葉が広まる前から、Webページをホーム画面に追加する文化がありました。

いわゆるWebClip的な考え方です。

Safariで見ているページを、ホーム画面にアイコンとして置く。

次からは、そのアイコンをタップして直接開く。

これは「Webをアプリ化する」というより、**よく使うWebページをホーム画面の一部にする**という体験です。

だからiPhoneのPWAは、AndroidのPWAとはゴールが違って見えます。

Androidは、Webをネイティブアプリに近づけようとする。

iPhoneは、Webページをホーム画面に自然に置けるようにする。

この違いを理解すると、iOSの独特な挙動も少し見え方が変わります。

## iPhoneはPWAを無視しているわけではない

iPhoneのPWAは、よく「対応していない」と言われます。

でも実際には、何も効かないわけではありません。

iPhoneでも、ホーム画面追加、アプリ風表示、`short_name`、`start_url`、`scope`、アイコン指定などは意味があります。

特に`scope`は、実際に触ってみるととても重要です。

scope内にいる間はアプリ扱いの見た目を維持しやすく、scope外へ出るとSafariのミニUIが出ます。

これは、iOSがPWAを完全に無視しているなら起きにくい挙動です。

ただし、Androidと同じようには効きません。

`display: fullscreen`や`orientation`を指定しても、Androidほど素直には反映されません。

このあたりが、iPhone独自のホーム画面文化を感じる部分です。

## なぜiPhoneのPWAは独特な挙動をするのか

PWA開発者がiPhoneで混乱しやすいポイントはいくつかあります。

- `start_url`が思った通りに見えない
- `scope`の扱いがAndroidと違う
- `apple-touch-icon`がmanifest iconsより先に見える
- manifest.jsonの一部が効いていないように見える
- Androidで効くdisplayやorientationがiPhoneではほぼ変わらない

    
    
    
    
    

これを単純に「iPhoneはPWAに対応していない」と言ってしまうのは簡単です。

でも、実際にはもう少し複雑です。

Appleは、PWAをAndroidのような「Webから作るアプリ」として見るより、ホーム画面に置かれたWebページとして見ているように感じます。

つまり、Appleが重視しているのは「仕様をどこまで満たすか」よりも、ユーザーが何をホーム画面に置こうとしたのか、という部分なのではないかと思います。

だから、iPhoneでは`apple-touch-icon`が強い。

ホーム画面のアイコンとして自然に見えることが大事だからです。

だから、scope外へ出るとSafariミニUIが出る。

ユーザーが今、ホーム画面に置いた対象の外へ出たことを示す必要があるからです。

この見方をすると、iOSの挙動は単なる未対応ではなく、かなりAppleらしい設計に見えてきます。

![manifest.jsonの基本。これさえ設定すればPWA](info2.png)

## PWAの仕様実装だけならAndroidが強い

PWAを仕様として見るなら、Androidの方が圧倒的に分かりやすいです。

manifest.jsonを書き、Service Workerを登録し、アイコンを用意し、displayやtheme_colorを指定する。

すると、かなり期待に近い形で反映されます。

開発者にとっても予測しやすいです。

Chrome DevToolsやLighthouseでも確認しやすく、PWAの教科書通りに進めやすい。

Webアプリを本当にアプリに近づけたいなら、Androidはかなり優秀です。

特に次のような用途ではAndroid PWAはかなり強いです。

- オフライン対応ツール
- 業務アプリ
- ダッシュボード
- 入力フォーム
- 通知を使うWebアプリ
- ゲームっぽいフルスクリーン体験

    
    
    
    
    
    

Androidは、Webをアプリに寄せていく方向に強い。

これは間違いないと思います。

## ホーム画面体験として見るとiPhoneも完成度が高い

ただし、PWAを「ホーム画面に置く体験」として見ると、iPhoneもかなり完成度が高いです。

Safariでページを開き、共有メニューからホーム画面に追加する。

ホーム画面にアイコンが並ぶ。

そこから開くと、URLバーのないアプリ風の見た目になる。

この体験はかなり自然です。

特に、一般ユーザーにとっては「manifestが効いているか」よりも、「ホーム画面に置いたものが自然に開くか」の方が大事です。

iPhoneは、その部分をかなり長く磨いてきたように感じます。

アイコンの角丸や並び方、ホーム画面との馴染み方も含めて、Webページをホーム画面の一部として扱う体験はかなり強いです。

だから、iPhoneのPWAはAndroidより劣っているだけではありません。

ゴールが違うのです。

## Androidはアプリ化、iPhoneはホーム画面化

ここまでをかなり単純にまとめると、こうなります。

<table>
<tbody>
<tr>
<th>項目</th>
<th>Android</th>
<th>iPhone</th>
</tr>
<tr>
<td>思想</td>
<td>Webをアプリ化する</td>
<td>Webページをホーム画面に置く</td>
</tr>
<tr>
<td>強い部分</td>
<td>PWA仕様の反映</td>
<td>ホーム画面体験</td>
</tr>
<tr>
<td>manifest</td>
<td>かなり素直に効く</td>
<td>一部効くが独自色が強い</td>
</tr>
<tr>
<td>アイコン</td>
<td>manifest icons / maskableが重要</td>
<td>apple-touch-iconが強い</td>
</tr>
<tr>
<td>display</td>
<td>fullscreenやstandaloneが分かりやすい</td>
<td>standalone中心で考えるのが現実的</td>
</tr>
<tr>
<td>向いている用途</td>
<td>Webから作るアプリ</td>
<td>ホーム画面に置くWebページ</td>
</tr>
</tbody>
</table>

Androidは、Webをアプリにしたい。

iPhoneは、Webページをホーム画面の一級市民にしたい。

この違いで見ると、PWAの挙動のズレがかなり理解しやすくなります。

## Petalのような使い方では、iPhoneの思想がかなり自然

この違いを考えたとき、PetalのようなサービスではiPhoneの思想がかなり自然に感じます。

Petalは、サービス本体のアプリをホーム画面に置くというより、人の名刺や個人ページをホーム画面に置く体験を重視しています。

つまり、「アプリを起動する」のではなく、「人を開く」感覚です。

この考え方は、Android的な「Webをアプリ化する」より、iPhone的な「Webページをホーム画面に置く」に近いです。

誰かのページを、自分のホーム画面にそっと置く。

必要なときにワンタップで開く。

通知で呼び出されるのではなく、自分から思い出して開く。

こういう弱いつながりの設計では、iPhoneのホーム画面文化はとても相性がいいです。

これは、PWAを作っているだけでは気づきにくい部分でした。

Petalを作って、実際にホーム画面へ置く体験を考えたから見えてきたことです。

## OJappもPWAというよりホーム画面の入口を作っている

OJappも同じです。

OJappは、PWAそのものを見せたいサービスではありません。

やりたいのは、URLをスマホのホーム画面へ置き、Webサイトをアプリのような入口にすることです。

つまり、Webをアプリ化するというより、ホーム画面に置ける入口を作る。

この考え方は、iPhoneの思想ともとても近いです。

もちろん、AndroidではPWAとしてより強く動きます。

でも、OJappの本質は「インストールできるか」だけではありません。

URLをホーム画面に置く文化そのものです。

そう考えると、iOSとAndroidの違いは単なる優劣ではなく、それぞれの得意分野の違いに見えてきます。

## PWA開発で大事なのは、どちらを正解にするかではない

PWAを作るとき、AndroidとiPhoneのどちらが正しいかを決めようとすると、だいたい苦しくなります。

Androidに合わせると、iPhoneでは一部効きません。

iPhoneに合わせると、Androidではscopeやインストール判定で困ることがあります。

今回のPWA LABでも、まさにその問題にぶつかりました。

iPhoneではscopeを広くしたい。

Androidではscopeを広げすぎると、複数PWAの境界が崩れやすい。

どちらかが正しくて、どちらかが間違っているわけではありません。

ゴールが違うだけです。

だから、本当に大事なのは、作りたい体験に合わせて設計を分けることです。

- AndroidではPWAらしいアプリ体験を活かす
- iPhoneではホーム画面に置く体験を丁寧に作る
- manifestやscopeはOSごとに挙動を確認する
- アイコンはAndroidとiPhoneで考え方を分ける
- 実機で確認する

    
    
    
    
    

この前提で作ると、かなり失敗しにくくなります。

## 関連記事

iPhoneでPWAがどこまで使えるかは、[PWA×iOSでできること完全まとめ【2026年版】](https://tips.ojapp.app/pwa-ios-2026/)で詳しく整理しています。

manifest.jsonの基本は、[PWAに必要なmanifest.jsonの基本](https://tips.ojapp.app/pwa-manifest-json-basics/)でまとめています。

PWAとWebClipの違いは、[PWAとWebClipの違いとは？iPhoneではどっちを使うべきか](https://tips.ojapp.app/pwa-vs-webclip/)も参考になります。

## まとめ

PWAは、Androidでは対応している。

iPhoneでは対応していない。

そう言われることが多いですが、実際に両方を触ってみると、もう少し違う見え方になります。

Androidは、Webをアプリ化する方向に強い。

iPhoneは、Webページをホーム画面に置く体験に強い。

AndroidにとってPWAは、Webから作るアプリです。

iPhoneにとってPWAは、ホーム画面に置かれたWebページに近いです。

だから挙動が違います。

だから、同じmanifest.jsonでも同じ結果になりません。

PWA LABで何度も検証して感じたのは、iPhoneがPWAを理解していないわけではないということです。

Appleは、Googleとは別の答えを出している。

そう考えると、iOSの独特な挙動も納得できるものになっています。

そしてPetalのように、人のページをホーム画面に置く使い方を考えると、実はiPhoneの思想の方が自然に感じる場面もあります。

PWAは、対応・非対応だけで見ると見誤ります。

AndroidとiPhoneは、PWAのゴールが違う。

ここから考えると、Webアプリの設計はとても面白くなります。
