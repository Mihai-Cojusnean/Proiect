let carsContent = null;

var images = {
    'light': "https://static-assets.tesla.com/configurator/compositor?&options=$WTAS,$PBSB,$MTS03&view=STUD_3QTR_V2&model=ms&size=1441&bkba_opt=1&version=v0027d2020214789990&version=v0027d2020214789990",
    'dark': "https://static-assets.tesla.com/configurator/compositor?&options=$WTAS,$PPSW,$MTS03&view=STUD_3QTR_V2&model=ms&size=1441&bkba_opt=1&version=v0027d2020214789990&version=v0027d2020214789990",
    'light1': "https://static-assets.tesla.com/configurator/compositor?&options=$W38B,$PBSB,$DV2W,$MT308,$IN3B2&view=STUD_3QTR&model=m3&size=1441&bkba_opt=1&version=v0027d202004093351&version=v0027d202004093351",
    'dark1': "https://static-assets.tesla.com/configurator/compositor?&options=$W38B,$PPSW,$DV2W,$MT308,$IN3B2&view=STUD_3QTR&model=m3&size=1441&bkba_opt=1&version=v0027d202004093351&version=v0027d202004093351",
    'red': "https://static-assets.tesla.com/configurator/compositor?&options=$WY19B,$PPMR,$DV4W,$MTY03,$INYPB&view=STUD_3QTR&model=my&size=1441&bkba_opt=1&version=v0027d202004093351&version=v0027d202004093351",
    'blue': "https://static-assets.tesla.com/configurator/compositor?&options=$WY19B,$PPSB,$DV4W,$MTY03,$INYPB&view=STUD_3QTR&model=my&size=1441&bkba_opt=1&version=v0027d202004093351&version=v0027d202004093351"
};

function setImageUrl(color) {
    document.getElementById("myImg").src = images[color];
}

window.onload = () => fetch('json/data.json')
    .then(response => response.json())
.then(summary => {
    initCars(summary.cars);
loadContent(summary.cars);
});

function initCars(c) {
    carsContent = c;
    return carsContent;
}

const content = document.getElementById('tovar');
const modal   = document.getElementById('modal');


let selectOptionTraction  = null;
let selectOptionCutie     = null;
let selectsoptionMotor    = null;
let selectOptionParbrize  = null;

const loadContent = (cars) => {
    content.innerText = '';

    for (let i = 0; i < cars.length; i++) {
        let tovCont = document.createElement('div');
        tovCont.className = "tovContainer";

        tovCont.innerHTML =
            `<div class="col mb-4">
    <div class="card" style="width: 20rem;">
        <img class="card-img-top"
             src=${cars[i].image} alt="Card image cap">
        <div class="card-block">
            <center><h4 class="card-title">${cars[i].name}</h4>
                <p>Vitesse maximale: ${cars[i].speed}/h</p>
                <p class="card-text">Pret: $${cars[i].price}</p>
                   <button class="btn btn-success" onclick="let carObj = carsContent[${i}]; isOnCart(carObj)" 
                   data-toggle="modal" data-target=".bd-example-modal-lg" style="background-color: #2980B9">
<i class=" fas fa-shopping-cart"></i>Confuguratie personala
</button>
                <a href="buy.html" class="btn btn-primary"
                   style="margin:5px; background-color: #C40707; border: #FFDC00"
                >Cumpara</a></center>
            </div>
        </div>
    </div>`;
        content.appendChild(tovCont);
    }
}

const isOnCart = (obj) => {
    modal.innerHTML = `
    <div class="row">
    <div class="col-sm-6">
        <div class="card h-100">
            <div class="card-body">
                <img class="card-img-top" id="myImg" src="${obj.image}" max-height="650">
                <center><pre style="font-size: large"><b>Vitesse maximale:</b> ${obj.speed} km/h<br><b>Acceleratie:</b> 2.2s</pre></center>
            </div>
        </div>
    </div>
    <div class="col-sm-6">
        <div class="card">
            <div class="card-body" style="background-color: #5499C7;">
                <h5>Configura?ia automobilului</h5>

                <select id="optionTraction${obj.id}" style="margin:5px;">
                    <option value="0"> TIPUL TRACTIUNII </option>
                </select><br>
                <select id="optionCutie${obj.id}" style="margin:5px;">
                    <option value="0"> TIPUL CUTII DE VITEZE </option>
                </select><br>
                <select id="optionMotor${obj.id}" style="margin:5px;">
                    <option value="0"> TIPUL MOTORULUI </option>
                </select><br>
                <select id="optionParbrize${obj.id}" style="margin:5px;">
                    <option value="0"> TIPUL PARBRIZELOR </option>
                </select><br>

                <h5 class="card-title">Culoarea exterioara</h5>
                <button type="button" class="btn btn-light btn-circle btn-sm" onclick="setImageUrl('dark')"></button>
                <button type="button" class="btn btn-dark btn-circle btn-sm" onclick="setImageUrl('light')"></button><br>

                <h5>Suma finala</h5>
                
                
                <pre id="suma" style="border: 1px solid #BBBBBB; padding: 0px 3px; font-size: large;">${obj.price} zeleonah, tobish $</pre>
                <a href="#" class="btn btn-primary" style="margin:5px; background-color: #283747;" onclick="price();">Cumpara</a>
            </div>
        </div>
    </div>
</div>`;
    initComponents(obj.id);
    loadTraction(obj);
    loadCutie(obj);
    loadMotor(obj);
    loadParbrize(obj);
    changeOption(obj);
}

function initComponents(id) {
    selectOptionTraction    = document.getElementById('optionTraction' + id);
    selectOptionCutie       = document.getElementById('optionCutie' + id);
    selectsoptionMotor      = document.getElementById('optionMotor' + id);
    selectOptionParbrize    = document.getElementById('optionParbrize' + id);
}

function loadTraction(obj) {
    for (let i of obj.traction) {
        let opt = document.createElement('option');
        opt.appendChild(document.createTextNode(i.name));
        opt.value = i.price;
        selectOptionTraction.appendChild(opt)
    }
}

function loadCutie(obj) {
    for (let i of obj.cutie) {
        let opt = document.createElement('option');
        opt.appendChild(document.createTextNode(i.name));
        opt.value = i.price;
        selectOptionCutie.appendChild(opt)
    }
}

function loadMotor(obj) {
    for (let i of obj.motor) {
        let opt = document.createElement('option');
        opt.appendChild(document.createTextNode(i.name));
        opt.value = i.price;
        selectsoptionMotor.appendChild(opt)
    }
}

function loadParbrize(obj) {
    for (let i of obj.parbrize) {
        let opt = document.createElement('option');
        opt.appendChild(document.createTextNode(i.name));
        opt.value = i.price;
        selectOptionParbrize.appendChild(opt)
    }
}

function price(obj) {
    let a = parseInt(selectOptionTraction.options[selectOptionTraction.selectedIndex].value);
    let b = parseInt(selectOptionCutie.options[selectOptionCutie.selectedIndex].value);
    let c = parseInt(selectsoptionMotor.options[selectsoptionMotor.selectedIndex].value);
    let d = parseInt(selectOptionParbrize.options[selectOptionParbrize.selectedIndex].value);
    let price = obj.price;
    price += a + b + c + d;
    document.getElementById('suma').innerHTML = price + (" zeleonah, tobish $");
}

function changeOption(obj) {
    selectOptionTraction.addEventListener('change', function () {
        price(obj, selectOptionTraction);
    });
    selectOptionCutie.addEventListener('change', function () {
        price(obj, selectOptionCutie);
    });
    selectsoptionMotor.addEventListener('change', function () {
        price(obj, selectsoptionMotor);
    });
    selectOptionParbrize.addEventListener('change', function () {
        price(obj, selectOptionParbrize);
    });
}