const toolbar = document.createElement('div')
toolbar.style.width = '100%'
toolbar.style.height = '35px'
toolbar.style.background = 'white'
const urlBox = document.createElement('textarea')
urlBox.style.width = '200px'
urlBox.style.height = '35px'
const apiButton = document.createElement('button')
apiButton.innerText = '短縮リンクを生成する'
apiButton.addEventListener('click', () => {
  console.log('api')
  urlBox.innerText = '読み込み中...'
  let ASIN = document.getElementById('ASIN').value
  // fetch('https://amzn-link.vercel.app/api/amznlink?ASIN=' + ASIN).then((e) => {
  //   console.log(e)
  //   return e.text()
  // })
  chrome.runtime.sendMessage(ASIN, function (response) {
    console.log('受け取ったデータ：', response)
  })
})
const copyButton = document.createElement('button')
copyButton.innerText = 'コピー'
copyButton.addEventListener('click', () => {
  navigator.clipboard.readText().then((e) => {
    console.log('copy')
    navigator.clipboard.writeText(urlBox.innerHTML)
  })
})
toolbar.append(urlBox)
toolbar.append(apiButton)
toolbar.append(copyButton)
const parentnode = document.getElementById('ap_container')
parentnode.prepend(toolbar)

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request)
  // メッセージとして送信されたクリップボードに貼り付けたいテキストをそのままレスポンスに設定して返却
  navigator.clipboard.writeText(request)
  // alert(request)
  urlBox.innerText = request
  sendResponse({
    value: request,
  })
})

document.addEventListener('contextmenu', () => {
  console.log('click')
  console.log(document.getElementById('ASIN').value)
  chrome.runtime.sendMessage(document.getElementById('ASIN').value, function (response) {
    console.log('受け取ったデータ：', response)
  })
})
