# amznLinkChrome
 
 AmazonのURLを短縮するchrome拡張
「パッケージ化されていない拡張機能を追加する」から追加する

## ブックマークレット
https://amzn-link.vercel.app/api/amznlink
以下のコードをコピーしてブックマークに登録。Amazonの商品ページでブックマークを押すと短縮URLが表示されたタブにとぶ。
```
javascript:var a=document.getElementById("ASIN");window.open("https://amzn-link.vercel.app/api/amznlink?ASIN="+a.value);
```
