function getMisskeyURL(info, tab) {
    const url = new URL(info.linkUrl || info.pageUrl);
    if (url.href.includes('@')) {
        const username = url.href.split('@')[1];
        const misskeyUrl = `https://misskey.io/@${username}`;
        chrome.tabs.create({url: misskeyUrl});
    }
}

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
            const misskeyUrl = `https://misskey.io/@${username}@${hostname}`;
            chrome.tabs.create({url: misskeyUrl});
        }
    }
});
