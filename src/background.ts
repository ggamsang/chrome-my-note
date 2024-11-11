chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Received message:', message); // 로그 추가
  if (message.type === 'SAVE_MARKDOWN') {
    const { url, markdown } = message;
    chrome.storage.local.set({ [url]: markdown }, () => {
      console.log('Saved markdown:', markdown); // 로그 추가
      sendResponse({ status: 'success', message: 'Markdown saved' });
    });
    return true; // 비동기 응답 보장
  } else if (message.type === 'GET_MARKDOWN') {
    const { url } = message;
    chrome.storage.local.get([url], (result) => {
      console.log('Fetched markdown:', result[url]); // 로그 추가
      sendResponse({ markdown: result[url] || '' });
    });
    return true; // 비동기 응답 보장
  }
});

