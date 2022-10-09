{
  chrome.runtime.onInstalled.addListener(() => {
    const copy = chrome.contextMenus.create({
      id: 'copy',
      title: 'コピー',
    })
  })

  var ASIN

  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message)
    ASIN = message
    fetch('https://amzn-link.vercel.app/api/amznlink?ASIN=' + ASIN)
      .then((e) => {
        // console.log(e);
        return e.text()
      })
      .then((data) => {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tab) => {
          console.log(tab[0])
          chrome.tabs.sendMessage(tab[0].id, data, function (response) {
            console.log(response)
          })
        })
      })
      .catch((error) => {
        console.error(error)
        // console.log("失敗しました");
      })
  })

  // メニューをクリック時に実行
  chrome.contextMenus.onClicked.addListener((item) => {
    const url = new URL(item.pageUrl)
    if (url.hostname === 'www.amazon.co.jp') {
      console.log('amzn')
      console.log(item)
      console.log(ASIN)
      fetch('https://amzn-link.vercel.app/api/amznlink?ASIN=' + ASIN)
        .then((e) => {
          // console.log(e);
          return e.text()
        })
        .then((data) => {
          chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tab) => {
            console.log(tab[0])
            chrome.tabs.sendMessage(tab[0].id, data, function (response) {
              console.log(response)
            })
          })
        })
        .catch((error) => {
          console.error(error)
          // console.log("失敗しました");
        })
    }
  })
}

function copyTextToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    function () {
      console.log('Async: Copying to clipboard was successful!')
    },
    function (err) {
      console.error('Async: Could not copy text: ', err)
    }
  )
}
