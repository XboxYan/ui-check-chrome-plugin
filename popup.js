
function sendMessageToContentScript(message, callback)
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		chrome.tabs.sendMessage(tabs[0].id, message, function(response)
		{
			if(callback) callback(response);
		});
	});
}


chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
	chrome.tabs.executeScript(tabs[0].id, {file: 'content-script.js'});
});



var group = document.getElementById('btn-group');

group.querySelectorAll('button').forEach(function(btn){
    btn.onclick = function(){
        sendMessageToContentScript(btn.dataset.info);
    }
})
