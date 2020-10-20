# 開発

## DB起動
```brew services start mongodb-community```

## localhost:3000で確認
```npm run dev```

## 初期設定画面表示させる
```window.localStorage.removeItem('initializeFinished')```

# 反省・今後
- リファクタ
    - server.jsが肥大化してしまった→pages/api/をうまく使いたい
    - SSRされるべきもの、そうでないもの、の違いを意識せず実装してしまった
    - 一つで良いデータ（目標体重・合計ポイント）をどう保持するか？
- 追加機能
    - 体重のグラフ表示
- その他
    - ネイティブアプリにしたい