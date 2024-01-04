function callbackFunc(tabId, changeInfo){
    if(changeInfo.status == 'complete'){
        setTimeout(()=>{
            chrome.tabs.sendMessage(tabId, {
                message: 'callMain'
            });
        }, 1000)
    }
  
}

chrome.tabs.onUpdated.addListener(callbackFunc);