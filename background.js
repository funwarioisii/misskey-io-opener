const INSTANCE_NAME = 'misskey.io';

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "openInMisskey",
        title: "Open in misskey.io",
        contexts: ["link", "page"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "openInMisskey") {
        const url = new URL(info.linkUrl || info.pageUrl);
        if (url.href.includes('@')) {
            const parts = url.href.split('@');
            const username = parts[1].split('/')[0];
            const hostname = url.hostname;
            const misskeyUrl = `https://${INSTANCE_NAME}/@${username}@${hostname}`;
            chrome.tabs.create({url: misskeyUrl});
        }
    }
});
