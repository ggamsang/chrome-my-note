document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  const currentUrl = tab.url || ''

  // URL 기반 마크다운 불러오기
  chrome.runtime.sendMessage({ type: 'GET_MARKDOWN', url: currentUrl }, (response) => {
    const markdownElement = document.getElementById('markdown') as HTMLTextAreaElement
    markdownElement.value = response.markdown
  });

  document.getElementById('save')?.addEventListener('click', () => {
    console.log('Save button clicked') // 로그 추가
    const markdown = (document.getElementById('markdown') as HTMLTextAreaElement).value
   chrome.runtime.sendMessage({ type: 'SAVE_MARKDOWN', url: currentUrl, markdown }, (response) => {
    console.log('Save response:', response) // 로그 추가
      if (response) {
        alert(response.message)
      } else {
        alert('Failed to save markdown.')
      }
    })
  })
})

