"use strict";
chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
});
// 간단한 URL-마크다운 매핑
const markdownStorage = {
    'https://example.com': '# Example Page\nThis is a markdown content for Example Page.',
    'https://another-site.com': '## Another Site\nDetails for another site in markdown format.'
};
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'GET_MARKDOWN') {
        const currentUrl = message.url;
        const markdownContent = markdownStorage[currentUrl];
        if (markdownContent) {
            sendResponse({ data: markdownContent });
        }
        else {
            sendResponse({ data: 'No markdown content available for this URL.' });
        }
    }
    // 반드시 true를 반환하여 비동기 응답이 가능하게 함
    return true;
});
