
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

var group = document.getElementById('btn-group');

group.querySelectorAll('button').forEach(function(btn){
    btn.onclick = function(){
        sendMessageToContentScript(btn.dataset.info);
    }
})
