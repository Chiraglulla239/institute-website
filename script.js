(function(global){
    let mk = {};

    const homeHtml = "./code-snippets/homesnippet.html";
    const resultHtml = "./code-snippets/halloffame.html";
    const mechcourseHtml = "./code-snippets/mechcourse.html";
    const beecourseHtml = "./code-snippets/beecourse.html";
    const edcourseHtml = "./code-snippets/edcourse.html";
    const deskHtml = "./code-snippets/desk.html";
    const admissionHtml = "./code-snippets/Admission.html";
    const graphHtml = "./code-snippets/graph.html";
    const mechresultjson = "./JSON/mechresult.json";
    const edresultjson = "./JSON/edresult.json";
    const beeresultjson = "./JSON/beeresult.json";

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

        classes = document.querySelector("#mechresults").className;
        classes = classes.replace(new RegExp("active", "g"), "");
        document.querySelector("#mechresults").className = classes;

        classes = document.querySelector("#edresults").className;
        classes = classes.replace(new RegExp("active", "g"), "");
        document.querySelector("#edresults").className = classes;

        classes = document.querySelector("#beeresults").className;
        classes = classes.replace(new RegExp("active", "g"), "");
        document.querySelector("#beeresults").className = classes;

        classes = document.querySelector("#Admission").className;
        classes = classes.replace(new RegExp("active", "g"), "");
        document.querySelector("#Admission").className = classes;

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
    });

    document.querySelector('#mechresults').addEventListener('click', function(){
        showLoading('.main');
        switchToActive('#mechresults');
        $ajaxUtils.sendGetRequest(resultHtml, function(responseText){
            document.querySelector('.main').innerHTML = responseText;
            $ajaxUtils.sendGetRequest(mechresultjson, function(results){
                let html ='';
                for(let i = 0; i < 8; i++){
                    let name = results[i].name;
                    let score = results[i].score;
                    let image = results[i].img;

                    console.log(name);
                    console.log(score);
                    console.log(image);

                    html += '<section class="col-6 col-sm-4 col-md-3 mx-auto">';
                    html += '<div class="card">';
                    html += `<img class="card-image-top" src=" ${image} " alt=" ${name} ">`;
                    html += '<div class="card-body">';
                    html += `<p> ${name} </p>`;
                    html += `<p> ${score} <span>in Mechanics</span></p>`;
                    html += '</div> </div> </section>';
                }

                html += '</div> </div> <hr>';
                html += '<div class="container-fluid">';
                html += '<div class="row">';
                html += '<section class="col-sm-6 col-12" id="scoreTable1">';
                html += '<table class="table table-striped table-primary table-hover">';
                html += '<thead class="table-dark">';
                html += '<tr>';
                html += '<th scope="col">#</th>';
                html += '<th scope="col">Name</th>';
                html += '<th scope="col">Score <span>(/100)</span></th>';
                html += '</tr>';
                html += '</thead>';
                html += '<tbody>';

                for(let i = 0; i < results.length/2 ; i++){
                    let name = results[i].name;
                    let score = results[i].score;

                    console.log(name);
                    console.log(score);

                    html += '<tr>'
                    html += `<th scope="row"> ${i+1} </th>`;
                    html += `<td> ${name} </td>`;
                    html += `<td> ${score} </td>`;
                }

                html += '</tbody> </table> </section>';
                html += '<section class="col-sm-6 col-12" id="scoreTable2">';
                html += '<table class="table table-striped table-primary table-hover">';
                html += '<thead class="table-dark">';
                html += '<tr>';
                html += '<th scope="col">#</th>';
                html += '<th scope="col">Name</th>';
                html += '<th scope="col">Score <span>(/100)</span></th>';
                html += '</tr>';
                html += '</thead>';
                html += '<tbody>';

                for(let i = results.length/2; i < results.length ; i++){
                    let name = results[i].name;
                    let score = results[i].score;

                    console.log(name);
                    console.log(score);

                    html += '<tr>'
                    html += `<th scope="row"> ${i+1} </th>`;
                    html += `<td> ${name} </td>`;
                    html += `<td> ${score} </td>`;
                }

                html += '</tbody> </table> </section>';

                $ajaxUtils.sendGetRequest(graphHtml, function(responseText){
                    html += responseText;
                    document.querySelector('#toppers').innerHTML = html;
                },
                false);
            }, 
            true);
        }, 
        false);
    });

    document.querySelector('#edresults').addEventListener('click', function(){
        showLoading('.main');
        switchToActive('#edresults');
        $ajaxUtils.sendGetRequest(resultHtml, function(responseText){
            document.querySelector('.main').innerHTML = responseText;
            $ajaxUtils.sendGetRequest(edresultjson, function(results){
                let html ='';
                for(let i = 0; i < 8; i++){
                    let name = results[i].name;
                    let score = results[i].score;
                    let image = results[i].img;

                    console.log(name);
                    console.log(score);
                    console.log(image);

                    html += '<section class="col-6 col-sm-4 col-md-3 mx-auto">';
                    html += '<div class="card">';
                    html += `<img class="card-image-top" src=" ${image} " alt=" ${name} ">`;
                    html += '<div class="card-body">';
                    html += `<p> ${name} </p>`;
                    html += `<p> ${score} <span>in Engineering Drawing</span></p>`;
                    html += '</div> </div> </section>';
                }

                html += '</div> </div> <hr>';
                html += '<div class="container-fluid">';
                html += '<div class="row">';
                html += '<section class="col-sm-6 col-12" id="scoreTable1">';
                html += '<table class="table table-striped table-primary table-hover">';
                html += '<thead class="table-dark">';
                html += '<tr>';
                html += '<th scope="col">#</th>';
                html += '<th scope="col">Name</th>';
                html += '<th scope="col">Score <span>(/100)</span></th>';
                html += '</tr>';
                html += '</thead>';
                html += '<tbody>';

                for(let i = 0; i < results.length/2 ; i++){
                    let name = results[i].name;
                    let score = results[i].score;

                    console.log(name);
                    console.log(score);

                    html += '<tr>'
                    html += `<th scope="row"> ${i+1} </th>`;
                    html += `<td> ${name} </td>`;
                    html += `<td> ${score} </td>`;
                }

                html += '</tbody> </table> </section>';
                html += '<section class="col-sm-6 col-12" id="scoreTable2">';
                html += '<table class="table table-striped table-primary table-hover">';
                html += '<thead class="table-dark">';
                html += '<tr>';
                html += '<th scope="col">#</th>';
                html += '<th scope="col">Name</th>';
                html += '<th scope="col">Score <span>(/100)</span></th>';
                html += '</tr>';
                html += '</thead>';
                html += '<tbody>';

                for(let i = results.length/2; i < results.length ; i++){
                    let name = results[i].name;
                    let score = results[i].score;

                    console.log(name);
                    console.log(score);

                    html += '<tr>'
                    html += `<th scope="row"> ${i+1} </th>`;
                    html += `<td> ${name} </td>`;
                    html += `<td> ${score} </td>`;
                }

                html += '</tbody> </table> </section>';

                $ajaxUtils.sendGetRequest(graphHtml, function(responseText){
                    html += responseText;
                    document.querySelector('#toppers').innerHTML = html;
                },
                false);
            }, 
            true);
        }, 
        false);
    });

    document.querySelector('#beeresults').addEventListener('click', function(){
        showLoading('.main');
        switchToActive('#beeresults');
        $ajaxUtils.sendGetRequest(resultHtml, function(responseText){
            document.querySelector('.main').innerHTML = responseText;
            $ajaxUtils.sendGetRequest(beeresultjson, function(results){
                let html ='';
                for(let i = 0; i < 8; i++){
                    let name = results[i].name;
                    let score = results[i].score;
                    let image = results[i].img;

                    console.log(name);
                    console.log(score);
                    console.log(image);

                    html += '<section class="col-6 col-sm-4 col-md-3 mx-auto">';
                    html += '<div class="card">';
                    html += `<img class="card-image-top" src=" ${image} " alt=" ${name} ">`;
                    html += '<div class="card-body">';
                    html += `<p> ${name} </p>`;
                    html += `<p> ${score} <span>in BEE</span></p>`;
                    html += '</div> </div> </section>';
                }

                html += '</div> </div> <hr>';
                html += '<div class="container-fluid">';
                html += '<div class="row">';
                html += '<section class="col-12" id="scoreTable1">';
                html += '<table class="table table-striped table-primary table-hover">';
                html += '<thead class="table-dark">';
                html += '<tr>';
                html += '<th scope="col">#</th>';
                html += '<th scope="col">Name</th>';
                html += '<th scope="col">Score <span>(/100)</span></th>';
                html += '</tr>';
                html += '</thead>';
                html += '<tbody>';

                for(let i = 0; i < results.length ; i++){
                    let name = results[i].name;
                    let score = results[i].score;

                    console.log(name);
                    console.log(score);

                    html += '<tr>'
                    html += `<th scope="row"> ${i+1} </th>`;
                    html += `<td> ${name} </td>`;
                    html += `<td> ${score} </td>`;
                }

                html += '</tbody> </table> </section>';

                $ajaxUtils.sendGetRequest(graphHtml, function(responseText){
                    html += responseText;
                    document.querySelector('#toppers').innerHTML = html;
                },
                false);
            }, 
            true);
        }, 
        false);
    });

    document.querySelector('#Desk').addEventListener('click', function(){
        showLoading('.main');
        switchToActive('#Desk');
        $ajaxUtils.sendGetRequest(deskHtml, function(responseText) {
            document.querySelector('.main').innerHTML = responseText;
        },
        false);
    });

    document.querySelector('#mechcourse').addEventListener('click', function(){
        showLoading('.main');
        switchToActive('#mechcourse');
        $ajaxUtils.sendGetRequest(mechcourseHtml, function(responseText) {
            document.querySelector('.main').innerHTML = responseText;
        },
        false);
    });

    document.querySelector('#beecourse').addEventListener('click', function(){
        showLoading('.main');
        switchToActive('#beecourse');
        $ajaxUtils.sendGetRequest(beecourseHtml, function(responseText) {
            document.querySelector('.main').innerHTML = responseText;
        },
        false);
    });

    document.querySelector('#edcourse').addEventListener('click', function(){
        showLoading('.main');
        switchToActive('#edcourse');
        $ajaxUtils.sendGetRequest(edcourseHtml, function(responseText) {
            document.querySelector('.main').innerHTML = responseText;
        },
        false);
    });

    document.querySelector('#Admission').addEventListener('click', function(){
        showLoading('.main');
        switchToActive('#Admission');
        $ajaxUtils.sendGetRequest(admissionHtml, function(responseText) {
            document.querySelector('.main').innerHTML = responseText;
        },
        false);
    });

    global.$mk = mk;

})(window);