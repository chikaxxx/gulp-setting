# gulpを使ったフロントエンド開発DEMO
### これはなに？
おすすめのgulp設計です 😊

## gulp実行のおおまかな流れ
[node.js](https://nodejs.org/en/)をインストール。  
インストールが完了したら以下のcommandを実行。
```bash
$ git clone https://github.com/chikaxxx/gulp-setting.git 	#このリポジトリをcloneする
$ cd this_project		#プロジェクトフォルダに移動
$ npm install gulp -g	#gulpをグローバルにインストールする
$ npm install			#npmプラグインをインストール
$ gulp					#これで動きます
```

## 実行
#### gulpを実行する。
```bash
$ gulp		#ファイルの監視がスタートする
```
#### sprite画像を生成する。
```
$ gulp sprite	
```
* 画像読み込み元	`assets/sprite/pc,sp/`  
* 画像生成先	`build/img/pc,sp/sprite.png`
* scss生成先		`assets/style/pc,sp/_sprite.scss`


## フォルダ構成
```
├── README.md 
├── assets 	
│   ├── sprite 
│   │   ├── pc 	- PCでpriteにする画像を格納
│   │   └── sp 	- SPでpriteにする画像を格納
│   └── style 	- Scssファイルの格納
│       ├── _common.scss 	
│       ├── _reset.scss 		- リセットCSS
│       ├── _sprite_pc.scss 	- 自動生成される、PCスプライト用のscss
│       ├── _sprite_sp.scss 	- 自動生成される、SPスプライト用のscss
│       ├── pc.scss 			- PCのscss
│       └── sp.scss 			- SPのscss
├── build						- ビルド先フォルダ
├── gulpfile.js 	
├── package.json 	
└── template					- HTML格納フォルダ
    ├── include				- includeフォルダ
    │   ├── footer.html 	
    │   └── header.html 	
    └── index.html			- 修正するHTMLファイル
```

## gulpfile.jsの説明
タスク・プラグインの説明です。
### パスの設定
```JavaScript
var paths = {
		devDir: 	"",
		assetsDir: 	"assets",
		scssDir: 	"assets/style",		//SCSSディレクトリ
		spriteDir: 	"assets/sprite",	//Sprite画像用のディレクトリ
		jsDir:		"assets/js",		//修正するJavaScriptディレクトリ
		templateDir: "template",		//修正するHTMLディレクトリ
		buildDir: 	"build",			//buildディレクトリ
	};
```

### 各タスクの説明
#### CSS
* [Bourbon](http://bourbon.io/) - 軽量なCSSフレームワーク。Sassのmixin・function集。
* [Bourbon Neat](http://neat.bourbon.io/) - Bourbonを用いたグリッドシステム。
* [gulp-pleeease](https://www.npmjs.com/package/gulp-pleeease) - ベンダープレフィックスの付与、CSS圧縮など。

タスクが完了したら、ブラウザをreloadする。

#### Sprite
PC/SP各フォルダで、スプライト画像の生成を行います。
* [gulp.spritesmith](https://www.npmjs.com/package/gulp.spritesmith) - スプライト画像の生成。
```JS
gulp.task("sprite", function () {
	var spriteData = ["pc","sp"] 		//pc,spディレクトリ
	for (var i = 0, len = spriteData.length; i < len; i++) {
		console.log(spriteData[i]);
		var img = gulp.src([paths.spriteDir + "/" + spriteData[i] + "/*.*"])
		.pipe(spritesmith({
			imgName: "sprite.png",							//生成する画像名
			cssName: "_img_" + spriteData[i] + ".scss",		//生成するSCSSファイル名
			imgPath: "img/" + spriteData[i] + "sprite.png",	//生成するSCSSファイルに記載する、スプライト画像のパス
			cssFormat: "scss",								//生成するcssの形式
			padding: 20,									//各画像間の余白
			cssVarMap: function (sprite) {
				sprite.name = sprite.name;
			}
		}));
		img.img.pipe(gulp.dest( paths.buildDir + "/img/"));	//スプライト画像のビルド先
		img.css.pipe(gulp.dest( paths.scssDir ));			//SCSSのビルド先
	}
});
```
###### くわしくは以下参照
[CSS Sprite を自動生成する - Gulp で作る Web フロントエンド開発環境 #8](https://tech.recruit-mp.co.jp/front-end/post-6844/#gulpspritesmith)

#### JavaScript
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) - JavaScriptの圧縮。

#### TEMPLATE

* [gulp-file-include](https://www.npmjs.com/package/gulp-file-include) - includeを可能にする。ex.) `@@include('include/header.html')`
* [gulp-html-prettify](https://www.npmjs.com/package/gulp-html-prettify) - インデント整形。
* [gulp-strip-comments](https://www.npmjs.com/package/gulp-strip-comments) - コメントアウト箇所`<!-- -->`の削除。

タスクが完了したら、ブラウザをreloadする。

#### browser-sync
* [browser-sync](https://www.npmjs.com/package/browser-sync) - ローカルサーバー立ち上げ、ライブリロード、同URLを開いている複数のブラウザ/デバイスで、スクロール/ページ遷移など、動作を同期する。  

###### くわしくは以下参照
[Browsersyncを利用してお手軽ブラウザ確認環境をつくろう](http://tech.medpeer.co.jp/entry/2015/06/09/071758)  
[複数ブラウザ/端末を同期してくれるBrowserSyncが便利](http://qiita.com/yuichiroharai/items/b3daf45ff209f303bf50)

### 共通で使っているプラグインの説明
* [gulp-plumber](https://www.npmjs.com/package/gulp-plumber) - エラーが置きても監視を中止しない。
* [gulp-notify](https://www.npmjs.com/package/gulp-notify) - 実行エラーの内容を通知する。
* [run-sequence](https://www.npmjs.com/package/run-sequence) - タスクの実行順序を指定する。
* [del](https://www.npmjs.com/package/del) - ファイル・ディレクトリの削除を行う。

