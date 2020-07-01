(function(global){
    let ajaxUtils = {};


    //To get appropriate request object depending on browsers
    function getRequestObject() {
        if (window.XMLHttpRequest) {
            return (new XMLHttpRequest());
        } 
        else if (window.ActiveXObject) {
            // For very old IE browsers (optional)
            return (new ActiveXObject("Microsoft.XMLHTTP"));
        } 
        else {
            global.alert("Ajax is not supported!");
            return(null); 
        }
    } 

    //Send GET Request to the server
    ajaxUtils.sendGetRequest = function(requestURL, responseHandler, isJsonResponse) {
        let request = getRequestObject();
        request.onreadystatechange = function() {
            handleResponse(request, responseHandler, isJsonResponse);
        }
        request.open("GET", requestURL, true);
        request.send(null);
    }

    function handleResponse(request, responseHandler, isJsonResponse) {
        if ((request.readyState == 4) &&
            (request.status == 200)) {

            if (isJsonResponse == undefined) {
                isJsonResponse = true;
            }

            if (isJsonResponse) {
                responseHandler(JSON.parse(request.responseText));
            }
            else {
                responseHandler(request.responseText);
            }
        }
    }

    global.$ajaxUtils = ajaxUtils;

})(window);