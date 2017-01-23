var productId,
	scripts = document.getElementsByTagName('script');

function generateProductIdFromScriptContent(scriptContent) {
    var tempArray = scriptContent.split('/');
    tempArray = tempArray[tempArray.length - 1].split("'");
    return tempArray[0];
}

for (var i = scripts.length - 1; i >= 0; i--) {
    if(scripts[i].innerHTML.indexOf('window.mobileAppUrl') !== -1) {
        productId = generateProductIdFromScriptContent(scripts[i].innerHTML);
        break;
    }
}

productId;