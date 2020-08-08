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
    const mechresultjson2019 = "./JSON/mechresult2019.json";
    const edresultjson2019 = "./JSON/edresult2019.json";
    const beeresultjson2019 = "./JSON/beeresult2019.json";
    const mechresultjsonOld = "./JSON/mechresultold.json";
    const edresultjsonOld = "./JSON/edresultold.json";
    const beeresultjsonOld = "./JSON/beeresultold.json";


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

        classes = document.querySelector("#mechresults2019").className;
        classes = classes.replace(new RegExp("active", "g"), "");
        document.querySelector("#mechresults2019").className = classes;

        classes = document.querySelector("#edresults2019").className;
        classes = classes.replace(new RegExp("active", "g"), "");
        document.querySelector("#edresults2019").className = classes;

        classes = document.querySelector("#beeresults2019").className;
        classes = classes.replace(new RegExp("active", "g"), "");
        document.querySelector("#beeresults2019").className = classes;

        classes = document.querySelector("#Admission").className;
        classes = classes.replace(new RegExp("active", "g"), "");
        document.querySelector("#Admission").className = classes;

        classes = document.querySelector(idToActive).className;
        if (classes.indexOf("active") == -1) {
          classes += " active";
          document.querySelector(idToActive).className = classes;
        }
    };

    let switchToActiveNav = function (idToActive) {
        classes = document.querySelector("#new").className;
        classes = classes.replace(new RegExp("active", "g"), "");
        document.querySelector("#new").className = classes;

        classes = document.querySelector("#older").className;
        classes = classes.replace(new RegExp("active", "g"), "");
        document.querySelector("#older").className = classes;

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
        document.querySelector(".navbar-toggler").addEventListener("click", function(event){
            this.classList.toggle("change");
        })
    });

    mk.openHome = function(){
        showLoading('.main');
        switchToActive('#Home');
        $ajaxUtils.sendGetRequest(homeHtml, function(responseText) {
            document.querySelector('.main').innerHTML = responseText;
        },
        false);
    }

    let loadResults = function(main, json){
        let outOF = (json == edresultjson2019 ||json == edresultjsonOld) ? 75 : 100;
        let subject;
        let oldjson;
        let newjson;
        if(json == mechresultjson2019 || json == mechresultjsonOld){
            subject = 'Mechanics';
            oldjson = mechresultjsonOld;
            newjson = mechresultjson2019;
        }
        else if(json == edresultjson2019 || json == edresultjsonOld ){
            subject = 'Engineering Drawing';
            oldjson = edresultjsonOld;
            newjson = edresultjson2019
        }
        else{
            subject = "BEE";
            newjson = beeresultjson2019;
            oldjson = beeresultjsonOld;
        }
        $ajaxUtils.sendGetRequest(resultHtml, function(responseText){
            document.querySelector(main).innerHTML = responseText;
            $ajaxUtils.sendGetRequest(json, function(results){
                let html=`<h3 style:"padding: 2rem">Our Toppers in ${subject} </h3>` 
                html +='<ul class="nav nav-tabs">';
                html += '<li class="nav-item">';
                html += '<a class="nav-link" style="color: black;" id="new">2019-20</a>';
                html += '</li>';
                html += '<li class="nav-item">';
                html += '<a class="nav-link" style="color: black;" id="older">Older</a>';
                html += '</li>';
                html += '</ul>';
                html += '<div class="row" id="toppers">'
                document.querySelector('#nav').innerHTML = html;

                if(json.indexOf('2019') != -1){
                    switchToActiveNav('#new');
                }
                else{
                    switchToActiveNav('#older')
                }
                
                html = '';
                for(let i = 0; i < 8; i++){
                    let name = results[i].name;
                    let score = results[i].score;
                    let image = results[i].img;

                    html += '<section class="col-6 col-sm-4 col-md-3 mx-auto">';
                    html += '<div class="card">';
                    html += `<img class="card-image-top" src=" ${image} " alt=" ${name} ">`;
                    html += '<div class="card-body">';
                    html += `<h4> ${name} </h4>`;
                    html += `<p> ${score} <span>/ ${outOF}</span></p>`;
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
                html += `<th scope="col">Score <span>(/ ${outOF})</span></th>`;
                html += '</tr>';
                html += '</thead>';
                html += '<tbody>';

                for(let i = 0; i < results.length/2 ; i++){
                    let name = results[i].name;
                    let score = results[i].score;

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
                html += `<th scope="col">Score <span>(/ ${outOF})</span></th>`;
                html += '</tr>';
                html += '</thead>';
                html += '<tbody>';

                for(let i = results.length/2; i < results.length ; i++){
                    let name = results[i].name;
                    let score = results[i].score;

                    html += '<tr>'
                    html += `<th scope="row"> ${i+1} </th>`;
                    html += `<td> ${name} </td>`;
                    html += `<td> ${score} </td>`;
                }

                html += '</tbody> </table> </section>';

                document.querySelector('#toppers').innerHTML = html;
                document.querySelector('#new').addEventListener('click', function(){
                    showLoading('.main');
                    loadResults('.main', newjson);
                });
                document.querySelector('#older').addEventListener('click', function(){
                    showLoading('.main');
                    loadResults('.main', oldjson);
                });
            }, 
            true);
        }, 
        false);
    }

    mk.openMechResults = function(){
        showLoading('.main');
        switchToActive('#mechresults2019');
        loadResults('.main', mechresultjson2019);
    }

    mk.openEgResults = function(){
        showLoading('.main');
        switchToActive('#edresults2019');
        loadResults('.main',edresultjson2019);
    }

    mk.openBeeResults = function(){
        showLoading('.main');
        switchToActive('#beeresults2019');
        loadResults('.main',beeresultjson2019);
    }

    mk.openDesk = function(){
        showLoading('.main');
        switchToActive('#Desk');
        $ajaxUtils.sendGetRequest(deskHtml, function(responseText) {
            document.querySelector('.main').innerHTML = responseText;
        },
        false);
    }

    mk.openMech = function(){
        showLoading('.main');
        switchToActive('#mechcourse');
        $ajaxUtils.sendGetRequest(mechcourseHtml, function(responseText) {
            document.querySelector('.main').innerHTML = responseText;
        },
        false);
    }

    mk.openBee = function(){
        showLoading('.main');
        switchToActive('#beecourse');
        $ajaxUtils.sendGetRequest(beecourseHtml, function(responseText) {
            document.querySelector('.main').innerHTML = responseText;
        },
        false);

    }

    mk.openEg = function(){
        showLoading('.main');
        switchToActive('#edcourse');
        $ajaxUtils.sendGetRequest(edcourseHtml, function(responseText) {
            document.querySelector('.main').innerHTML = responseText;
        },
        false);

    }

    mk.openAdmission = function(){
        showLoading('.main');
        switchToActive('#Admission');
        $ajaxUtils.sendGetRequest(admissionHtml, function(responseText) {
            document.querySelector('.main').innerHTML = responseText;
        },
        false);
    }

    global.$mk = mk;

})(window);