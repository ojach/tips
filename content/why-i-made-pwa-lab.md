## PWA LABを作った理由

OJappでPWAやホーム画面追加の仕組みを触っていると、何度も同じことを思いました。

「仕様を読んだだけでは、実際の動きが分からない」

manifest.jsonを書けば終わり。Service Workerを登録すればPWAになる。displayをstandaloneにすればアプリっぽく開く。

たしかに、説明としてはそうです。

でも実際にiPhoneやAndroidで試すと、そんなに単純ではありませんでした。

そこで作ったのが、OJapp PWA LABです。

PWA LABは、PWAの設定や状態を実際に見ながら試すための実験場所です。

## 教科書通りに書いても、同じようには動かない

PWAは、HTML、manifest.json、Service Workerを用意すれば作れます。

ただ、実際にはブラウザやOSによって挙動がかなり変わります。

Android Chromeではうまく動くのに、iPhone Safariでは思ったように動かない。

PC Chromeでは確認できるのに、スマホでは表示が違う。

Service WorkerはACTIVEになっているのに、オフラインでは期待通りに表示されない。

こういうことが普通に起きます。

だから、PWAは「書き方を覚える」だけでは足りないと感じました。

実際に端末で見て、どこが反映されて、どこが無視されるのかを確かめる場所が必要でした。

## 一番見たかったのは「今どういう状態なのか」

PWAで困るのは、失敗していても画面だけは普通に表示されることです。

manifest.jsonが読めていなくても、ページ自体は開けます。

Service Workerが登録されていなくても、見た目は変わらないことがあります。

ホーム画面に追加できる状態なのか、ただのWebページとして開いているのかも、初心者には分かりにくいです。

そこでPWA LABでは、状態を見えるようにしました。

- MODE：PWAとして開いているか
- ONLINE：通信できているか
- SERVICE WORKER：Service Workerが有効か
- PUSH：通知の許可状態
- OS：どの環境で見ているか
- INSTALLABLE：インストール候補として判定されているか

 	
 	
 	
 	
 	
 	

この表示があるだけで、PWAの確認がかなり楽になります。

特にMODEは大事です。

同じページでも、ブラウザで開いているときと、ホーム画面から開いているときでは意味が変わります。

「PWA対応しているページ」と「今PWAとして起動している状態」は別物です。

![](4e558bbb-7828-4fdc-9afb-5788f286118b.png)

## Android ChromeとiPhone Safariは、かなり別物だった

PWA LABを作って改めて感じたのは、Android ChromeとiPhone Safariの違いです。

Android Chromeは、manifestの設定が比較的分かりやすく反映されます。

displayをstandaloneにすればPWAらしくなり、fullscreenにするとかなりアプリ感が出ます。

theme_colorやbackground_colorも、見た目に反映されやすいです。

一方で、iPhone Safariはかなり独特です。

ホーム画面追加はできますが、Androidのようなインストール案内とは違います。

manifestの一部設定も、思ったほど効かないことがあります。

displayやorientationの効き方も、Androidとは別物に近いです。

この差は、説明だけ読んでもなかなか実感できません。

実際にホーム画面へ追加して、開いて、消して、また追加して、やっと見えてくる部分です。

## manifestの1文字ミスで全部崩れる

PWA LABを作っている途中で、かなりしょうもないミスもしました。

manifestのパスを、本来は /lab/manifest.json と書くところを、/leb/manifest.json と書いていました。

たった1文字です。

でも、これだけでmanifestは読まれません。

ページは表示されるので、一瞬どこが悪いのか分かりませんでした。

こういうミスがPWAでは本当に多いです。

ファイルの場所、Content-Type、キャッシュ、Service Workerのスコープ。

どこか1つズレるだけで、PWAとしての判定が崩れます。

だからこそ、PWA LABのように「今どうなっているか」を見える化する意味があります。

## Service Workerは登録されても、万能ではない

Service Workerも、PWAで誤解されやすい部分です。

Service WorkerがACTIVEになっていると、なんとなくPWAが完成したように見えます。

でも実際には、Service Workerが登録されていることと、オフラインでちゃんと動くことは別です。

fetchイベントで何を返すのか。

どのファイルをキャッシュするのか。

更新時に古いキャッシュをどう扱うのか。

そこまで決めないと、オフライン対応としては不十分です。

PWA LABでは、こうした違いを実験できるようにしたいと思いました。

Service Workerがあるだけなのか、Cache Firstなのか、Network Firstなのか、Stale-While-Revalidateなのか。

同じService Workerでも、設計によって使い心地はかなり変わります。

## キャッシュは便利だけど、普通に地獄にもなる

PWAで一番ややこしいのは、キャッシュかもしれません。

キャッシュできると、オフラインでも表示できます。

表示も速くなります。

でも、更新したはずのファイルが反映されないこともあります。

古いmanifestが残ったり、古いService Workerが残ったり、アイコンが変わらなかったりします。

特にChromeはmanifestのキャッシュが強く残ることがあります。

iPhone Safariも、アイコンやホーム画面追加まわりで古い状態が残ることがあります。

このあたりは、きれいな説明だけでは分かりにくいです。

実際に壊して、直して、また壊してみる方が理解が早いです。

## PWA LABは、OJappのための実験場でもある

OJappは、Webサイトをスマホのホーム画面へ追加し、アプリのような入口にするサービスです。

ただし、OJappがやりたいことは、PWA技術そのものを見せることではありません。

大事なのは、URLをもっと自然にホーム画面へ置けるようにすることです。

人のページ、サービス、ツール、名刺。

そういうものを、アプリストアを通さずにホーム画面へ置く。

そのためには、iPhoneでは何ができて、Androidでは何ができて、PWAではどこまでできるのかをちゃんと知っておく必要があります。

PWA LABは、その確認場所でもあります。

## 関連記事

PWAの基本から知りたい場合は、[PWAとは？スマホのWebサイトを“アプリ化”する仕組みをわかりやすく解説](https://tips.ojapp.app/what-is-pwa/)が参考になります。

実際にPWAを作る流れは、[PWAの作り方｜manifest.json・Service Worker・ホーム画面対応を丁寧に解説](https://tips.ojapp.app/how-to-pwa/)でまとめています。

iPhone側の制限が気になる場合は、[SafariのPWA制限とは？できること・できないことまとめ【2026】](https://tips.ojapp.app/safari-pwa-limitations/)も近い内容です。

## まとめ

PWA LABを作った理由は、PWAの本当の挙動を実機で確認したかったからです。

PWAは、仕様だけを見るとシンプルに見えます。

でも実際には、Android Chrome、iPhone Safari、Service Worker、manifest、キャッシュ、ホーム画面追加の挙動が複雑に絡みます。

だから、説明だけでは足りません。

実際に試して、表示を見て、失敗して、直す場所が必要です。

PWA LABは、そのための小さな実験場です。

これからPWAやホーム画面追加を触る人にとっても、「今、自分のページがどういう状態なのか」を確かめる入口になればいいと思っています。
