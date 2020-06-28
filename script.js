(function(global){
    let mk = {};
    const homeHtml = "./code-snippets/homesnippet.html";

    let insertHtml = function(selector, html) {
        let targetElement = document.querySelector(selector);
        targetElement.innerHtml = html;
    }

    let showLoading = function (selector) {
        let html = '<div class="mx-auto">'
        html += '<img src="./assets/loader.png"></div>';
        insertHtml(selector,html);
    }

    document.addEventListener("DOMContentLoaded",function(event){

        //Show Loading gif before actually sending the request
        showLoading('.main');
        $ajaxUtils.sendGetRequest(homeHtml, function(responseText) {
            document.querySelector('.main').innerHTML = responseText;
            },
            false);
    });

    global.$mk = mk;

})(window);