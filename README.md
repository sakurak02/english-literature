# 英語で文学

文学作品を原文で読みながら、わからなかった単語や構文、自分なりの訳を記録する個人サイトです。

公開URL：<https://sakurako02.github.io/english-literature/>

## 日々の英語読書記録

日常的に編集するのは `reading/` 内のMarkdownと画像だけです。

サキ「開いた窓」の1件目は、次の構成にします。

```text
reading/
└── saki-open-window/
    └── 001/
        ├── 001.md
        └── images/
            ├── 001-note-01.webp
            └── 001-note-02.webp
```

Markdownの定型は `_templates/reading-record.md` にあります。新しい記事は、原文全文、日本語訳、注目した一節、添削前後の訳、英文解説、単語・言い回し、英語と文学についての感想という順序で記録します。

「今日読む原文」はテンプレートに含まれる折りたたみ欄へテキストで入力します。読書範囲は、使用しているPDFのページ番号を `PDF pp. 12–16` の形式で記録します。

本文が空の定型見出しは、サイト生成時に表示されません。自由な小見出しも利用できます。

Goodnotes画像は必須ではありません。通常の記事では使用せず、将来必要になった場合だけ、WebP形式で記録フォルダ内の `images/` に置いて標準Markdown記法で参照できます。

```markdown
![Goodnotesの書き込み](./images/001-note-01.webp)
```

front matter、ページタイトル、記録番号、日付、URLは書きません。

## 日々の更新手順

1. ObsidianでMarkdownを書く
2. 必要ならWebP画像を同じ記録フォルダの `images/` に入れる
3. GitHub Desktopでcommitする
4. pushする

push後、GitHub Actionsが次の内容を自動生成してGitHub Pagesへ公開します。

- 読書記録の個別ページ
- トップページの最近の記録
- 作品ページの記録一覧
- 記録件数と最終更新日
- `sitemap.xml`
- `robots.txt`

生成先の `dist/` はGit管理に含めません。

## 更新日

各読書記録フォルダに対して、次のGit情報を取得します。

```text
git log -1 --format=%cI -- reading/saki-open-window/001
```

そのため、Markdownだけでなく同じ記録フォルダ内の画像を変更した場合も更新日が変わります。GitHub Actionsでは `.github/workflows/pages.yml` のcheckoutに `fetch-depth: 0` を指定し、履歴を省略せずに取得します。

Gitはpush日時を保存しないため、サイトに表示されるのは最新のcommit日時です。

## 新しい作品を追加する場合

1. `works/<作品ID>/work.json` に作品情報を登録する
2. `works/<作品ID>/guide.html` に固定作品ガイドを置く
3. `reading/<作品ID>/001/001.md` から記録を始める

トップページ、作品一覧、件数、最終更新日、サイトマップを手作業で変更する必要はありません。読了時のみ `work.json` の `status` を `読書中` から `読了` へ変更します。

## 自動チェック

サイト生成時には、次の不整合を検出すると公開を停止します。

- 未登録の作品ID
- 3桁でない記録フォルダ
- フォルダ番号とMarkdownファイル名の不一致
- 同じ記録フォルダ内に複数のMarkdownがある状態
- front matterの混入
- `images/` 外の画像参照
- WebP以外の記録画像
- 存在しない画像や内部リンク

## ローカルで確認する場合

Node.js 24以降を使用します。

```text
npm ci
npm run build
```

生成結果は `dist/` に出力されます。日々の更新ではローカルビルドは必須ではありません。

## GitHub Pagesの初回設定

GitHub上でリポジトリを作成し、最初のpushを行った後に一度だけ設定します。

1. GitHubのリポジトリで `Settings` を開く
2. `Pages` を開く
3. `Build and deployment` の `Source` を `GitHub Actions` にする

commitとpushはサイト所有者がGitHub Desktopから行います。このプロジェクトの自動処理は、ソースファイルへのcommitやpushを行いません。
