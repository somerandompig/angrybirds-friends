var FacebookURL = 'https://apps.facebook.com/angrybirds/';
var _gaq = _gaq || [];
_gaq.push(['_setAccount', config.ga]); 
/*_gaq.push(['_setSampleRate', '100']);*/ // No this level sampling, using our own implementation
_gaq.push(['_addIgnoredRef', 'static.ak.facebook.com']);
if (_gaq.push && self.location == top.location) {	
	_gaq.push(['_trackPageview','/facebook/campaign-tracking/']);	
	setTimeout(top.location.href = FacebookURL, 200);
} else if (self.location == top.location) {	
	setTimeout(top.location.href = FacebookURL, 1000);
} else {
	_gaq.push(['_trackPageview']);
}

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

var sample1Percent = Math.random();
var sample10Percent = Math.random();

/*
 This is our own down sampling
*/
function trackEvent10Percent(eventCategory, eventAction, eventLabel, eventValue) {
	if (sample10Percent <= 0.1)
	{
		trackEvent(eventCategory, eventAction + " x 10", eventLabel, eventValue);
	}
}

/*
 This is our own down sampling
*/
function trackEvent1Percent(eventCategory, eventAction, eventLabel, eventValue) {
	if (sample1Percent <= 0.01)
	{
		trackEvent(eventCategory, eventAction + " x 100", eventLabel, eventValue);
	}
}


/*
 Tracks the event in Google Analytics.

 @eventCategory The category of the event as string. e.g. 'Links'. Cannot be empty.
 @eventAction The action of the event as string. e.g. 'Button'. Optional.
 @eventLabel The label of the event as string. e.g. 'MyButton'. Optional.
 @eventValue An integer value. Optional.
 */
function trackEvent(eventCategory, eventAction, eventLabel, eventValue) {
    if (eventCategory == null) {
        return;
    }
    if (eventAction == null) {
        eventAction = '';
    }
    if (eventLabel == null) {
        eventLabel = '';
    }

    if (eventValue == null) {
        _gaq.push(['_trackEvent', eventCategory, eventAction, eventLabel]);
    } else {
        _gaq.push(['_trackEvent', eventCategory, eventAction, eventLabel, eventValue]);
    }
}

function trackPageView(data) {
    _gaq.push(['_trackPageview', data]);
}

function trackTransaction(data) {
	_gaq.push(['_addTrans', data.orderId, data.shopName, data.price, data.tax, 0, data.city, data.state, data.country]);
	_gaq.push(['_addItem',data.orderId, data.sku, data.name, data.category, data.price, data.quantity]);
	_gaq.push(['_trackTrans']);
}

function trackTransactionItems(data, items) {	
	_gaq.push(['_addTrans', data.orderId, data.shopName, data.price, data.tax, 0, data.city, data.state, data.country]);
	
	for (var i = 0; i < items.length;i++) {
		_gaq.push(['_addItem',data.orderId, items[i].sku, items[i].name, data.category, items[i].price, items[i].quantity]);		
	}
	_gaq.push(['_trackTrans']);
}