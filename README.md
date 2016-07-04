# gulpを使ったフロントエンド開発DEMO
### これは何？
おすすめのgulp設計です 😊

## おおまかな流れ
[node.js](https://nodejs.org/en/)をインストール。  
インストールが完了したら以下のcommandを実行。
```bash
$ git clone このリポジトリ
$ cd this_project		#プロジェクトフォルダに移動
$ npm install gulp -g	#gulpをグローバルにインストールする
$ npm install			#npmプラグインをインストール
$ gulp					#これで動きます
```

### フォルダ構成
```
あとで書く。
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

## gulpfile.jsの説明
タスク・プラグインの説明です。
### パスの設定
```JavaScript
var paths = {
		devDir: 	"",
		assetsDir: 	"assets",
		scssDir: 	"assets/style",		//修正するScss
		spriteDir: 	"assets/sprite",	//修正するJavaScript
		jsDir:		"assets/js",		//修正するJavaScript
		templateDir: "template",		//修正するHTML
		buildDir: 	"build",			//build先ディレクトリ
	};
```

### 各タスクの説明
#### CSS
* Bourbon - このプラグインでできることを簡単に記載。
* Bourbon-neat - 
* gulp-pleeease -   

タスクが完了したら、ブラウザをreloadする。

#### Sprite
PC/SP各フォルダで、スプライト画像の生成を行います。
* gulp.spritesmith - 

#### JavaScript
JSの圧縮・最適化を行います。
* gulp-uglify

#### TEMPLATE
HTML内でincludeできるようにする、 コメントアウト箇所`<!-- -->`の削除、インデント整形。

* gulp-file-include - 
* gulp-html-prettify - 
* gulp-strip-comments - 

タスクが完了したら、ブラウザをreloadする。

#### browser-sync

### 共通で使っているプラグインの説明
* gulp-plumber - エラーが置きても監視をやめない。
* gulp-notify - エラー内容を通知する。
* run-sequence - タスクの実行順序を指定する。
* del - 削除を行う。

