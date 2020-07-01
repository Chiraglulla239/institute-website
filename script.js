(function(global){
    let mk = {};

    const homeHtml = "./code-snippets/homesnippet.html";
    const resultHtml = "./code-snippets/halloffame.html";
    const mechresultjson = "./JSON/mechresult.json";
    const edresultjson = "./JSON/edresult.json";
    const beeresultjson = "./JSON/beeresult.json";
    const resultphotos = "./code-snippets/resultsPhotos.html";


    let insertHtml = function(selector, html) {
        let targetElement = document.querySelector(selector);
        targetElement.innerHtml = html;
    }

    let showLoading = function (selector) {
        let html = '<div class="mx-auto">'
        html += '<img src="./assets/loader.png"></div>';
        insertHtml(selector,html);
    }

    let insertProperty = function (string, propName, propValue) {
        let propToReplace = "{{" + propName + "}}";
        string = string.replace(new RegExp(propToReplace, "g"), propValue);
        return string;
    }

    let switchToActive = function (idToActive) {
        let classes = document.querySelector("#Home").className;
        classes = classes.replace(new RegExp("active", "g"), "");
        document.querySelector("#Home").className = classes;

        classes = document.querySelector("#Desk").className;
        classes = classes.replace(new RegExp("active", "g"), "");
        document.querySelector("#Desk").className = classes;

        classes = document.querySelector("#beecourse").className;
        classes = classes.replace(new RegExp("active", "g"), "");
        document.querySelector("#beecourse").className = classes;

        classes = document.querySelector("#mechcourse").className;
        classes = classes.replace(new RegExp("active", "g"), "");
        document.querySelector("#mechcourse").className = classes;

        classes = document.querySelector("#edcourse").className;
        classes = classes.replace(new RegExp("active", "g"), "");
        document.querySelector("#edcourse").className = classes;

        classes = document.querySelector("#Results").className;
        classes = classes.replace(new RegExp("active", "g"), "");
        document.querySelector("#Results").className = classes;

        classes = document.querySelector(idToActive).className;
        if (classes.indexOf("active") == -1) {
          classes += " active";
          document.querySelector(idToActive).className = classes;
        }
    };

    document.addEventListener("DOMContentLoaded", function (event) {
        showLoading(".main");
        $ajaxUtils.sendGetRequest(homeHtml, function (responseText) {
            document.querySelector(".main").innerHTML = responseText;
        },
        false);
    });

    document.querySelector('#Home').addEventListener('click', function(){
        showLoading('.main');
        switchToActive('#Home');
        $ajaxUtils.sendGetRequest(homeHtml, function(responseText) {
            document.querySelector('.main').innerHTML = responseText;
        },
        false);
    })

    document.querySelector('#Results').addEventListener('click', function(){
        showLoading('.main');
        switchToActive('#Results');
        $ajaxUtils.sendGetRequest(mechresultjson, buildAndShowResultsHtml);
    });

    let buildAndShowResultsHtml = function(results) {
        $ajaxUtils.sendGetRequest(resultHtml, function (resultHtml) {
            $ajaxUtils.sendGetRequest(resultphotos, function (resultphotos) {
                let resultsViewHtml = buildResultsViewHtml(results,resultHtml,resultphotos);
                insertHtml(".main", resultsViewHtml);
            },
            false);
        },
        false);
    }

    function buildResultsViewHtml(results,resultHtml,resultphotos) {
            let finalHtml = resultHtml;

            for (let i = 0; i < 8; i++) {
                let html = resultphotos;
                let name = "" + results[i].name;
                let score = results[i].score;
                let img = results[i].img;
                html = insertProperty(html, "name", name);
                html = insertProperty(html, "score", score);
                html = insertProperty(html, "photo", img);
                finalHtml += html;
            }

            finalHtml += "</div>";
            finalHtml += "</div>";
            finalHtml += "</div>";
            return finalHtml;
    }

    global.$mk = mk;

})(window);