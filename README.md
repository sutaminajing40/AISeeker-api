# AISeeker-api

AISeeker プロジェクトのバックエンドAPIです。

## 概要

このリポジトリは、以前モノレポとして管理していたAISeekerプロジェクトから分離したバックエンド部分です。AI を活用した検索機能を提供するAPIを含んでいます。

## 関連リポジトリ

- フロントエンド: [AISeeker-app](https://github.com/sutaminajing40/AISeeker-app)
- 旧モノレポ: [AISeeker](https://github.com/sutaminajing40/AISeeker)

## セットアップ

1. リポジトリをクローン
   ```
   git clone https://github.com/sutaminajing40/AISeeker-api.git
   cd AISeeker-api
   ```

2. 依存関係をインストール
   ```
   npm install
   ```

3. 環境変数を設定
   `.env.sample` をコピーして `.env` を作成し、必要な環境変数を設定してください。

4. 開発サーバーを起動
   ```
   npm run dev
   ```

## 主な機能

- PDF文書の解析と保存
- AIを用いた文書検索
- クエリに基づく回答生成

## 今後の計画

- あとで追記

ご質問や提案がありましたら、Issueを作成してください。