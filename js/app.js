 // Initialize Firebase
var config = {
    apiKey: "AIzaSyBGdbOP4-7nGCpjZrsm-IXQ17jiyd9_pKM",
    authDomain: "olud-43cbe.firebaseapp.com",
    databaseURL: "https://olud-43cbe.firebaseio.com",
    projectId: "olud-43cbe",
    storageBucket: "olud-43cbe.appspot.com",
    messagingSenderId: "172724188141",
    appId: "1:172724188141:web:9189f3d0ef74a9d15bade4",
    measurementId: "G-93STHW8N59"
};
firebase.initializeApp(config);

firebase.firestore().enablePersistence()
    .catch(function(err) {
        if (err.code == 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled
            // in one tab at a a time.
            // ...
        } else if (err.code == 'unimplemented') {
            // The current browser does not support all of the
            // features required to enable persistence
            // ...
        }
    });


const tabla = document.getElementById("tablaclientes");
const db = firebase.firestore();
const forma = document.querySelector('#nuevocliente')
const receta = document.querySelector('#nuevareceta')
const recetas = document.querySelector('#recetas')
const clienteview = document.querySelector('#impresion')

const editar = document.querySelector('#editarcliente')

const editformreceta = document.querySelector('#editformreceta')

var folio = 1;
var cliente = {};
var previd = null;
var loadingcliente = true;
var loadingmain = true;
var recetasloading = false;
var citaloading = false;
var notaloading = false;
var noclientes = true;


function collect() {
    db.collection('clientes').orderBy("folio", "desc").onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        loadingmain = false;
        changes.forEach(change => {
            if (change.type == 'added') {
                createtable(change.doc);
                folio++;
                noclientes = false;
            } else if (change.type == 'removed') {
                let li = tabla.querySelector('[id="' + change.doc.id + '"]');
                tabla.removeChild(li);
            } else if (change.type == 'modified') {
                let li = tabla.querySelector('[id="' + change.doc.id + '"]');
                tabla.removeChild(li);
                createtable(change.doc);
            }
        });
    });
}



function createtable(doc) {
    let tr = document.createElement('tr');
    var folio = document.createElement('th');
    var cita = document.createElement('td');
    var nombre = document.createElement('td');
    var telefono = document.createElement('td');
    var email = document.createElement('td');
    var ver = document.createElement('td');
    var trimmed = doc.id.substring(0, 4);

    tr.setAttribute('id', doc.id);

    folio.textContent = trimmed;
    cita.textContent = doc.data().ultimacita;
    nombre.textContent = doc.data().nombre;
    telefono.textContent = doc.data().telefono;
    email.textContent = doc.data().correo;
    ver.innerHTML = '<button type="button" onClick="rendercliente(this.id)" id="' + doc.id + '"class="btn btn-primary btn-sm" data-toggle="modal" data-target=".cliente">Ver</button>'

    tabla.appendChild(tr);
    tr.appendChild(folio);
    tr.appendChild(cita);
    tr.appendChild(nombre);
    tr.appendChild(telefono);
    tr.appendChild(email);
    tr.appendChild(ver);

}

function createreceta(doc) {
    let table = document.createElement('table');
    let tr = document.createElement('tr');
    let trod = document.createElement('tr');
    let troi = document.createElement('tr');

    let row = document.createElement('div')
    let rowbotones = document.createElement('div')

    row.setAttribute('class', 'row')
    rowbotones.setAttribute('class', 'row')

    let colimprimir = document.createElement('div')
    colimprimir.setAttribute('class','col-md-2')

    let colborrar = document.createElement('div')
    colborrar.setAttribute('class','col-md-2 offset-md-6')


    let coleditar = document.createElement('div')
    coleditar.setAttribute('class','col-md-2')

    let thead = document.createElement('thead');
    let thempy = document.createElement('th');
    let sph = document.createElement('th');
    let cil = document.createElement('th');
    let eje = document.createElement('th');
    let add = document.createElement('th');
    let diam = document.createElement('th');
    let altura = document.createElement('th');
    let avsc = document.createElement('th');
    let avce = document.createElement('th');
    let quera = document.createElement('th');

    let imprimir = document.createElement('button')
    let editar = document.createElement('button')
    let borrar = document.createElement('button')
    let col = document.createElement('div');
    let pfecha = document.createElement('p');
    let pnota = document.createElement('p');

    let tbody = document.createElement('tbody');
    let od = document.createElement('th');
    let oi = document.createElement('th');

    let sphod = document.createElement('th');
    let sphoi = document.createElement('th');

    let cilod = document.createElement('th');
    let ciloi = document.createElement('th');

    let ejeod = document.createElement('th');
    let ejeoi = document.createElement('th');

    let addod = document.createElement('th');
    let addoi = document.createElement('th');

    let diamod = document.createElement('th');
    let diamoi = document.createElement('th');

    let alturaod = document.createElement('th');
    let alturaoi = document.createElement('th');

    let avscod = document.createElement('th');
    let avscoi = document.createElement('th');

    let avceod = document.createElement('th');
    let avceoi = document.createElement('th');

    let queraod = document.createElement('th');
    let queraoi = document.createElement('th');

    let destroy = document.createElement('div')

    col.setAttribute('class', 'col col-md-12');
    pfecha.innerText = doc.data().fecha
    pnota.innerText = doc.data().nota
    destroy.setAttribute('id', doc.id)

    table.setAttribute('class', 'table table-striped');

    thempy.innerText=''
    sph.innerText = 'SPH';
    cil.innerText='CIL';
    eje.innerText='EJE';
    add.innerText='ADD';
    diam.innerText='DIAM';
    altura.innerText='NOTA';
    avsc.innerText='AVSC';
    avce.innerText='AVCE';
    quera.innerText='QUERATOMETRIA';

    sph.setAttribute('style', 'text-align:center')
    cil.setAttribute('style', 'text-align:center')
    eje.setAttribute('style', 'text-align:center')
    add.setAttribute('style', 'text-align:center')
    diam.setAttribute('style', 'text-align:center')
    altura.setAttribute('style', 'text-align:center')
    avsc.setAttribute('style', 'text-align:center')
    avce.setAttribute('style', 'text-align:center')
    quera.setAttribute('style', 'text-align:center')

    sphod.setAttribute('style', 'text-align:center')
    cilod.setAttribute('style', 'text-align:center')
    ejeod.setAttribute('style', 'text-align:center')
    addod.setAttribute('style', 'text-align:center')
    diamod.setAttribute('style', 'text-align:center')
    alturaod.setAttribute('style', 'text-align:center')
    avscod.setAttribute('style', 'text-align:center')
    avceod.setAttribute('style', 'text-align:center')
    queraod.setAttribute('style', 'text-align:center')

    sphoi.setAttribute('style', 'text-align:center')
    ciloi.setAttribute('style', 'text-align:center')
    ejeoi.setAttribute('style', 'text-align:center')
    addoi.setAttribute('style', 'text-align:center')
    diamoi.setAttribute('style', 'text-align:center')
    alturaoi.setAttribute('style', 'text-align:center')
    avscoi.setAttribute('style', 'text-align:center')
    avceoi.setAttribute('style', 'text-align:center')
    queraoi.setAttribute('style', 'text-align:center')


    od.innerText='OD'
    oi.innerText='OI'

    cilod.innerText = doc.data().cilod
    ciloi.innerText = doc.data().ciloi

    ejeod.innerText = doc.data().ejeod
    ejeoi.innerText = doc.data().ejeoi

    addod.innerText = doc.data().addod
    addoi.innerText = doc.data().addoi

    diamod.innerText = doc.data().diamod
    diamoi.innerText = doc.data().diamoi

    alturaod.innerText=doc.data().alturaod
    alturaoi.innerText = doc.data().alturaoi

    avscod.innerText = doc.data().avscod
    avscoi.innerText = doc.data().avscoi

    avceod.innerText = doc.data().avceod
    avceoi.innerText = doc.data().avceoi

    queraod.innerText = doc.data().xeratometriaod;
    queraoi.innerText = doc.data().xeratometriaoi;

    sphod.innerText=doc.data().sphod
    sphoi.innerText=doc.data().sphoi

    let parameter = "imprimirreceta('#"+doc.id+"')"

    let parameterborrar = "borrarreceta('"+doc.id+"')"

    let parametereditar = "editarreceta('"+doc.id+"')"

    rowbotones.setAttribute('style','margin-bottom:32px')
    imprimir.setAttribute('type','button')
    imprimir.setAttribute('onClick',parameter)
    imprimir.setAttribute('class','btn btn-primary btn-sm')
    rowbotones.setAttribute('data-html2canvas-ignore', 'true')
    imprimir.innerText="Imprimir"

    borrar.setAttribute('type','button')
    borrar.setAttribute('onClick',parameterborrar)
    borrar.setAttribute('class','btn btn-danger btn-sm')
    borrar.innerText="Borrar"

    editar.setAttribute('type','button')
    editar.setAttribute('onClick',parametereditar)
    editar.setAttribute('class','btn btn-success btn-sm')
    editar.innerText="Editar"
    // imprimir.innerHTML = '<button type="button" onClick="imprimir(#'+doc.id+')" class="btn btn-primary btn-sm">Imprimir</button>'


    recetas.appendChild(destroy);
    destroy.appendChild(col);
    col.appendChild(pfecha);
    col.appendChild(pnota);
    row.appendChild(table);
    destroy.appendChild(row);

    table.appendChild(thead);
    table.appendChild(tbody);

    thead.appendChild(tr);
    tr.appendChild(thempy);
    tr.appendChild(sph);
    tr.appendChild(cil);
    tr.appendChild(eje);
    tr.appendChild(add);
    tr.appendChild(diam);
    tr.appendChild(quera);
    tr.appendChild(avsc);
    tr.appendChild(avce);
    tr.appendChild(altura);

    tbody.appendChild(trod);
    tbody.appendChild(troi);
    trod.appendChild(od);
    trod.appendChild(sphod);
    trod.appendChild(cilod)
    trod.appendChild(ejeod)
    trod.appendChild(addod)
    trod.appendChild(diamod)
    trod.appendChild(queraod)
    trod.appendChild(avscod)
    trod.appendChild(avceod)
    trod.appendChild(alturaod)

    troi.appendChild(oi);
    troi.appendChild(sphoi);
    troi.appendChild(ciloi)
    troi.appendChild(ejeoi)
    troi.appendChild(addoi)
    troi.appendChild(diamoi)
    troi.appendChild(queraoi)
    troi.appendChild(avscoi)
    troi.appendChild(avceoi)
    troi.appendChild(alturaoi)

    rowbotones.appendChild(colborrar)
    rowbotones.appendChild(colimprimir)
    rowbotones.appendChild(coleditar)
    colimprimir.appendChild(imprimir)
    coleditar.appendChild(editar)
    colborrar.appendChild(borrar)

    destroy.appendChild(rowbotones)
    recetasloading = true;
}

var editareceta = false;
var recetaid = null;

function editarreceta (id){
    recetaid = id;
    console.log(recetaid)

    db.collection('clientes').doc(previd).collection("recetas").doc(id).get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        $$.single("#sphodeditreceta").setAttribute("value", doc.data().sphod )

        $$.single("#cilodeditreceta").setAttribute("value", doc.data().cilod )

        $$.single("#ejeodeditreceta").setAttribute("value", doc.data().ejeod)

        $$.single("#addodeditreceta").setAttribute("value", doc.data().addod)

        $$.single("#diamodeditreceta").setAttribute("value", doc.data().diamod)

        $$.single("#alturaodeditreceta").setAttribute("value", doc.data().alturaod)

        $$.single("#xeratometriaodeditreceta").setAttribute("value", doc.data().xeratometriaod)


        $$.single("#sphoieditreceta").setAttribute("value", doc.data().sphoi)

        $$.single("#ciloieditreceta").setAttribute("value", doc.data().ciloi)

        $$.single("#ejeoieditreceta").setAttribute("value", doc.data().ejeoi)

        $$.single("#addoieditreceta").setAttribute("value", doc.data().addoi)

        $$.single("#diamoieditreceta").setAttribute("value", doc.data().diamoi)

        $$.single("#alturaoieditreceta").setAttribute("value", doc.data().alturaoi)

        $$.single("#xeratometriaoieditreceta").setAttribute("value", doc.data().xeratometriaoi)

        $$.single("#avscodeditreceta").setAttribute("value", doc.data().avscod)

        $$.single("#avscoieditreceta").setAttribute("value", doc.data().avscoi)

        $$.single("#avceodeditreceta").setAttribute("value", doc.data().avceod)

        $$.single("#avceoieditreceta").setAttribute("value", doc.data().avceoi)

        $$.single("#datepickereditreceta").setAttribute("value", doc.data().fecha)

        $$.single("#notaeditreceta").innerText = doc.data().nota
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});


    editareceta = true;

         $('.cliente').modal('hide')
             $('.cliente').on('hidden.bs.modal', function() {
                 if (editareceta == true) {
                 $('.editreceta').modal('show')
                 editareceta = false;
                 }
             })
}

editformreceta.addEventListener('submit', (e) => {
    e.preventDefault();
    editareceta = true;

    db.collection('clientes').doc(previd).collection("recetas").doc(recetaid).update({
            sphod: editformreceta.sphodeditreceta.value,
            cilod: editformreceta.cilodeditreceta.value,
            ejeod: editformreceta.ejeodeditreceta.value,
            addod: editformreceta.addodeditreceta.value,
            diamod: editformreceta.diamodeditreceta.value,
            alturaod: editformreceta.alturaodeditreceta.value,
            xeratometriaod: editformreceta.xeratometriaodeditreceta.value,
            sphoi: editformreceta.sphoieditreceta.value,
            ciloi: editformreceta.ciloieditreceta.value,
            ejeoi: editformreceta.ejeoieditreceta.value,
            addoi: editformreceta.addoieditreceta.value,
            diamoi: editformreceta.diamoieditreceta.value,
            alturaoi: editformreceta.alturaoieditreceta.value,
            xeratometriaoi: editformreceta.xeratometriaoieditreceta.value,
            avscod: editformreceta.avscodeditreceta.value,
            avscoi: editformreceta.avscoieditreceta.value,
            avceod: editformreceta.avceodeditreceta.value,
            avceoi: editformreceta.avceoieditreceta.value,
            nota: editformreceta.notaeditreceta.value,
            fecha: editformreceta.datepickereditreceta.value,
        })
        .then(function() {
            console.log("Document successfully written!");
            $('.editreceta').modal('hide')
                 $('.editreceta').on('hidden.bs.modal', function() {
                     if (editareceta == true) {
                     rendercliente(previd);
                     editareceta = false;
                     }
                 })
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
            $("#actualizarerror").show(200);
            $("#actualizarerror").hide(5500);
        });
})


forma.addEventListener('submit', (e) => {
    e.preventDefault();
    var fecha = new Date()
    var diabetes;
    var hipertension;
    var sinusitis;
    var dolordecabeza;
    var alergias;
    var cataratas;
    var glaucoma;
    var ceguera;
    var dolorojos;
    var ojosllorosos;
    var comezon;
    var secresion;
    var traumatismo;
    var miodesopsia;
    var anillos;
    var hipersensibilidad;
    var carnosidad;


    if (forma.diabetes.checked) {
        diabetes = forma.diabetes.value
    } else {
        diabetes = "Diabetes:";
    }

    if (forma.hipertension.checked) {
        hipertension = forma.hipertension.value
    } else {
        hipertension = "Hipertensión:";
    }

    if (forma.sinusitis.checked) {
        sinusitis = forma.sinusitis.value
    } else {
        sinusitis = "Sinusitis:";
    }

    if (forma.dolordecabeza.checked) {
        dolordecabeza = forma.dolordecabeza.value
    } else {
        dolordecabeza = "Dolor de Cabeza:";
    }

    if (forma.alergias.checked) {
        alergias = forma.alergias.value
    } else {
        alergias = "Alergias:";
    }

    if (forma.cataratas.checked) {
        cataratas = forma.cataratas.value
    } else {
        cataratas = "Cataratas:";
    }

    if (forma.glaucoma.checked) {
        glaucoma = forma.glaucoma.value
    } else {
        glaucoma = "Glaucoma:";
    }

    if (forma.ceguera.checked) {
        ceguera = forma.ceguera.value
    } else {
        ceguera = "Ceguera:";
    }

    if (forma.carnosidad.checked) {
        carnosidad = forma.carnosidad.value
    } else {
        carnosidad = "Carnosidad:";
    }

    if (forma.dolorojos.checked) {
        dolorojos = forma.dolorojos.value
    } else {
        dolorojos = "Dolor de Ojos:";
    }

    if (forma.ojosllorosos.checked) {
        ojosllorosos = forma.ojosllorosos.value
    } else {
        ojosllorosos = "Ojos Llorosos:";
    }

    if (forma.comezon.checked) {
        comezon = forma.comezon.value
    } else {
        comezon = "Comezón:";
    }

    if (forma.secresion.checked) {
        secresion = forma.secresion.value
    } else {
        secresion = "Secresión:";
    }

    if (forma.traumatismo.checked) {
        traumatismo = forma.traumatismo.value
    } else {
        traumatismo = "Traumatismo:";
    }

    if (forma.miodesopsia.checked) {
        miodesopsia = forma.miodesopsia.value
    } else {
        miodesopsia = "Miodesopsia:";
    }

    if (forma.anillos.checked) {
        anillos = forma.anillos.value
    } else {
        anillos = "Anillos o Halos:";
    }

    if (forma.hipersensibilidad.checked) {
        hipersensibilidad = forma.hipersensibilidad.value
    } else {
        hipersensibilidad = "Hipersensibilidad Solar:";
    }

    db.collection('clientes').add({
            nombre: forma.nombre.value,
            telefono: forma.telefono.value,
            correo: forma.correo.value,
            folio: folio,
            edad: forma.edad.value,
            ocupacion: forma.ocupacion.value,
            direccion: forma.direccion.value,
            sexo: forma.sexo.value,
            diabetes: diabetes,
            hipertension: hipertension,
            sinusitis: sinusitis,
            dolordecabeza: dolordecabeza,
            alergias: alergias,
            cataratas: cataratas,
            glaucoma: glaucoma,
            ceguera: ceguera,
            otro: forma.otro.value,
            dolorojos: dolorojos,
            ojosllorosos: ojosllorosos,
            comezon: comezon,
            secresion: secresion,
            traumatismo: traumatismo,
            miodesopsia: miodesopsia,
            anillos: anillos,
            carnosidad: carnosidad,
            hipersensibilidad: hipersensibilidad,
            sphod: forma.sphod.value,
            cilod: forma.cilod.value,
            ejeod: forma.ejeod.value,
            addod: forma.addod.value,
            diamod: forma.diamod.value,
            alturaod: forma.alturaod.value,
            xeratometriaod: forma.xeratometriaod.value,
            sphoi: forma.sphoi.value,
            ciloi: forma.ciloi.value,
            ejeoi: forma.ejeoi.value,
            addoi: forma.addoi.value,
            diamoi: forma.diamoi.value,
            alturaoi: forma.alturaoi.value,
            xeratometriaoi: forma.xeratometriaoi.value,
            proximacita: forma.proximacita.value,
            avscod: forma.avscod.value,
            avscoi: forma.avscoi.value,
            avceod: forma.avceod.value,
            avceoi: forma.avceoi.value,
            nota: forma.nota.value,
            ultimacita: forma.ultimacita.value,
            fecha: forma.ultimacita.value
        })
        .then(function() {
            console.log("Document successfully written!");
            forma.reset()
            $("#clienteregistrado").show(200);
            $("#clienteregistrado").hide(5500);
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
            $("#alertaerror").show(200);
            $("#alertaerror").hide(5500);
        });
})

var cerrado = false;

function cerrar() {
    cerrado = true
    $('.cliente').modal('hide')
        $('.cliente').on('hidden.bs.modal', function() {
            if (cerrado == true) {
            $('.edit').modal('show')
            cerrado = false;
            }
        })


    $$.single("#nombrecliente").setAttribute("value", cliente.nombre)
    $$.single("#telefonocliente").setAttribute("value", cliente.telefono)
    $$.single("#correocliente").setAttribute("value", cliente.correo)
    $$.single("#direccioncliente").setAttribute("value", cliente.direccion)
    $$.single("#ocupacioncliente").setAttribute("value", cliente.ocupacion)
    $$.single("#edadcliente").setAttribute("value", cliente.edad)
    $$.single("#ultimacitaclientepicker").setAttribute("value", cliente.ultimacita)
    if (cliente.sexo == "Masculino") {
        $('#masculinocliente').prop('checked', true);
        $('#femeninocliente').prop('checked', false);
    } else {
        $('#femeninocliente').prop('checked', true);
        $('#masculinocliente').prop('checked', false);
    }

    if (cliente.diabetes == "Diabetes: <i class='fa fa-check'></i>") {
        $('#diabetescliente').prop('checked', true);
    } else {
        $('#diabetescliente').prop('checked', false);
    }

    if (cliente.hipertension == "Hipertensión: <i class='fa fa-check'></i>") {
        $('#hipertensioncliente').prop('checked', true);
    } else {
        $('#hipertensioncliente').prop('checked', false);
    }

    if (cliente.sinusitis == "Sinusitis: <i class='fa fa-check'></i>") {
        $('#sinusitiscliente').prop('checked', true);
    } else {
        $('#sinusitiscliente').prop('checked', false);
    }

    if (cliente.carnosidad == "Carnosidad: <i class='fa fa-check'></i>") {
        $('#carnosidadcliente').prop('checked', true);
    } else {
        $('#carnosidadcliente').prop('checked', false);
    }

    if (cliente.dolordecabeza == "Dolor de Cabeza: <i class='fa fa-check'></i>") {
        $('#dolordecabezacliente').prop('checked', true);
    } else {
        $('#dolordecabezacliente').prop('checked', false);
    }

    if (cliente.alergias == "Alergias: <i class='fa fa-check'></i>") {
        $('#alergiascliente').prop('checked', true);
    } else {
        $('#alergiascliente').prop('checked', false);
    }

    if (cliente.cataratas == "Cataratas: <i class='fa fa-check'></i>") {
        $('#cataratascliente').prop('checked', true);
    } else {
        $('#cataratascliente').prop('checked', false);
    }

    if (cliente.glaucoma == "Glaucoma: <i class='fa fa-check'></i>") {
        $('#glaucomacliente').prop('checked', true);
    } else {
        $('#glaucomacliente').prop('checked', false);
    }

    if (cliente.ceguera == "Ceguera: <i class='fa fa-check'></i>") {
        $('#cegueracliente').prop('checked', true);
    } else {
        $('#cegueracliente').prop('checked', false);
    }


    $$.single("#otrocliente").setAttribute("value", cliente.otro)

    if (cliente.dolorojos == "Dolor de Ojos: <i class='fa fa-check'></i>") {
        $('#dolorojoscliente').prop('checked', true);
    } else {
        $('#dolorojoscliente').prop('checked', false);
    }

    if (cliente.ojosllorosos == "Ojos Llorosos: <i class='fa fa-check'></i>") {
        $('#ojosllorososcliente').prop('checked', true);
    } else {
        $('#ojosllorososcliente').prop('checked', false);
    }

    if (cliente.comezon == "Comezón: <i class='fa fa-check'></i>") {
        $('#comezoncliente').prop('checked', true);
    } else {
        $('#comezoncliente').prop('checked', false);
    }

    if (cliente.secresion == "Secresión: <i class='fa fa-check'></i>") {
        $('#secresioncliente').prop('checked', true);
    } else {
        $('#secresioncliente').prop('checked', false);
    }

    if (cliente.traumatismo == "Traumatismo: <i class='fa fa-check'></i>") {
        $('#traumatismocliente').prop('checked', true);
    } else {
        $('#traumatismocliente').prop('checked', false);
    }

    if (cliente.miodesopsia == "Miodesopsia: <i class='fa fa-check'></i>") {
        $('#miodesopsiacliente').prop('checked', true);
    } else {
        $('#miodesopsiacliente').prop('checked', false);
    }

    if (cliente.anillos == "Anillos o Halos: <i class='fa fa-check'></i>") {
        $('#anilloscliente').prop('checked', true);
    } else {
        $('#anilloscliente').prop('checked', false);
    }

    if (cliente.hipersensibilidad == "Hipersensibilidad Solar: <i class='fa fa-check'></i>") {
        $('#hipersensibilidadcliente').prop('checked', true);
    } else {
        $('#hipersensibilidadcliente').prop('checked', false);
    }

    $$.single("#sphodcliente").setAttribute("value", cliente.sphod)

    $$.single("#cilodcliente").setAttribute("value", cliente.cilod)

    $$.single("#ejeodcliente").setAttribute("value", cliente.ejeod)

    $$.single("#addodcliente").setAttribute("value", cliente.addod)

    $$.single("#diamodcliente").setAttribute("value", cliente.diamod)

    $$.single("#alturaodcliente").setAttribute("value", cliente.alturaod)

    $$.single("#xeratometriaodcliente").setAttribute("value", cliente.xeratometriaod)


    $$.single("#sphoicliente").setAttribute("value", cliente.sphoi)

    $$.single("#ciloicliente").setAttribute("value", cliente.ciloi)

    $$.single("#ejeoicliente").setAttribute("value", cliente.ejeoi)

    $$.single("#addoicliente").setAttribute("value", cliente.addoi)

    $$.single("#diamoicliente").setAttribute("value", cliente.diamoi)

    $$.single("#alturaoicliente").setAttribute("value", cliente.alturaoi)

    $$.single("#xeratometriaoicliente").setAttribute("value", cliente.xeratometriaoi)

    $$.single("#avscodcliente").setAttribute("value", cliente.avscod)

    $$.single("#avscoicliente").setAttribute("value", cliente.avscoi)

    $$.single("#avceodcliente").setAttribute("value", cliente.avceod)

    $$.single("#avceoicliente").setAttribute("value", cliente.avceoi)

    $$.single("#datepickercliente").setAttribute("value", cliente.proximacita)

    $$.single("#notacliente").innerText = cliente.nota


}

var editarcerrado = false;

editar.addEventListener('submit', (e) => {
    e.preventDefault();
    editarcerrado = true;
    var diabetes;
    var hipertension;
    var sinusitis;
    var dolordecabeza;
    var alergias;
    var cataratas;
    var glaucoma;
    var ceguera;
    var dolorojos;
    var ojosllorosos;
    var comezon;
    var secresion;
    var traumatismo;
    var miodesopsia;
    var anillos;
    var hipersensibilidad;
    var carnosidad;

    var fechanueva = new Date();

    if (cliente.fecha == fechanueva.toDateString()) {
        fechanueva = cliente.fecha
    }

    if (editar.diabetescliente.checked) {
        diabetes = editar.diabetescliente.value
    } else {
        diabetes = "Diabetes:";
    }

    if (editar.hipertensioncliente.checked) {
        hipertension = editar.hipertensioncliente.value
    } else {
        hipertension = "Hipertensión:";
    }

    if (editar.carnosidadcliente.checked) {
        carnosidad = editar.carnosidadcliente.value
    } else {
        carnosidad = "Carnosidad:";
    }

    if (editar.sinusitiscliente.checked) {
        sinusitis = editar.sinusitiscliente.value
    } else {
        sinusitis = "Sinusitis:";
    }

    if (editar.dolordecabezacliente.checked) {
        dolordecabeza = editar.dolordecabezacliente.value
    } else {
        dolordecabeza = "Dolor de Cabeza:";
    }

    if (editar.alergiascliente.checked) {
        alergias = editar.alergiascliente.value
    } else {
        alergias = "Alergias:";
    }

    if (editar.cataratascliente.checked) {
        cataratas = editar.cataratascliente.value
    } else {
        cataratas = "Cataratas:";
    }

    if (editar.glaucomacliente.checked) {
        glaucoma = editar.glaucomacliente.value
    } else {
        glaucoma = "Glaucoma:";
    }

    if (editar.cegueracliente.checked) {
        ceguera = editar.cegueracliente.value
    } else {
        ceguera = "Ceguera:";
    }


    if (editar.dolorojoscliente.checked) {
        dolorojos = editar.dolorojoscliente.value
    } else {
        dolorojos = "Dolor de Ojos:";
    }

    if (editar.ojosllorososcliente.checked) {
        ojosllorosos = editar.ojosllorososcliente.value
    } else {
        ojosllorosos = "Ojos Llorosos:";
    }

    if (editar.comezoncliente.checked) {
        comezon = editar.comezoncliente.value
    } else {
        comezon = "Comezón:";
    }

    if (editar.secresioncliente.checked) {
        secresion = editar.secresioncliente.value
    } else {
        secresion = "Secresión:";
    }

    if (editar.traumatismocliente.checked) {
        traumatismo = editar.traumatismocliente.value
    } else {
        traumatismo = "Traumatismo:";
    }

    if (editar.miodesopsiacliente.checked) {
        miodesopsia = editar.miodesopsiacliente.value
    } else {
        miodesopsia = "Miodesopsia:";
    }

    if (editar.anilloscliente.checked) {
        anillos = editar.anilloscliente.value
    } else {
        anillos = "Anillos o Halos:";
    }

    if (editar.hipersensibilidadcliente.checked) {
        hipersensibilidad = editar.hipersensibilidadcliente.value
    } else {
        hipersensibilidad = "Hipersensibilidad Solar:";
    }

    db.collection('clientes').doc(previd).update({
            nombre: editar.nombrecliente.value,
            telefono: editar.telefonocliente.value,
            correo: editar.correocliente.value,
            edad: editar.edadcliente.value,
            ocupacion: editar.ocupacioncliente.value,
            direccion: editar.direccioncliente.value,
            sexo: editar.sexocliente.value,
            diabetes: diabetes,
            hipertension: hipertension,
            sinusitis: sinusitis,
            dolordecabeza: dolordecabeza,
            alergias: alergias,
            cataratas: cataratas,
            glaucoma: glaucoma,
            ceguera: ceguera,
            carnosidad: carnosidad,
            otro: editar.otrocliente.value,
            dolorojos: dolorojos,
            ojosllorosos: ojosllorosos,
            comezon: comezon,
            secresion: secresion,
            traumatismo: traumatismo,
            miodesopsia: miodesopsia,
            anillos: anillos,
            hipersensibilidad: hipersensibilidad,
            sphod: editar.sphodcliente.value,
            cilod: editar.cilodcliente.value,
            ejeod: editar.ejeodcliente.value,
            addod: editar.addodcliente.value,
            diamod: editar.diamodcliente.value,
            alturaod: editar.alturaodcliente.value,
            xeratometriaod: editar.xeratometriaodcliente.value,
            sphoi: editar.sphoicliente.value,
            ciloi: editar.ciloicliente.value,
            ejeoi: editar.ejeoicliente.value,
            addoi: editar.addoicliente.value,
            diamoi: editar.diamoicliente.value,
            alturaoi: editar.alturaoicliente.value,
            xeratometriaoi: editar.xeratometriaoicliente.value,
            avscod: editar.avscodcliente.value,
            avscoi: editar.avscoicliente.value,
            avceod: editar.avceodcliente.value,
            avceoi: editar.avceoicliente.value,
            proximacita: editar.proximacitacliente.value,
            nota: editar.notacliente.value,
            ultimacita: editar.ultimacitacliente.value,
        })
        .then(function() {
            console.log("Document successfully written!");
            editar.reset()
            $("#clienteactualizado").show(200);
            $("#clienteactualizado").hide(5500);
            $('.edit').modal('hide')
                 $('.edit').on('hidden.bs.modal', function() {
                     if (editarcerrado == true) {
                     rendercliente(previd);
                     editarcerrado = false;
                     }
                 })
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
            $("#actualizarerror").show(200);
            $("#actualizarerror").hide(5500);
        });
})

receta.addEventListener('submit', (e) => {
    e.preventDefault();
var fecha = new Date();
id = fecha.toDateString()
    db.collection('clientes').doc(previd).collection('recetas').add({
            sphod: receta.sphodreceta.value,
            cilod: receta.cilodreceta.value,
            ejeod: receta.ejeodreceta.value,
            addod: receta.addodreceta.value,
            diamod: receta.diamodreceta.value,
            alturaod: receta.alturaodreceta.value,
            xeratometriaod: receta.xeratometriaodreceta.value,
            sphoi: receta.sphoireceta.value,
            ciloi: receta.ciloireceta.value,
            ejeoi: receta.ejeoireceta.value,
            addoi: receta.addoireceta.value,
            diamoi: receta.diamoireceta.value,
            alturaoi: receta.alturaoireceta.value,
            xeratometriaoi: receta.xeratometriaoireceta.value,
            avscod: receta.avscodreceta.value,
            avscoi: receta.avscoireceta.value,
            avceod: receta.avceodreceta.value,
            avceoi: receta.avceoireceta.value,
            nota: receta.notareceta.value,
            fecha: receta.fechareceta.value
        })
        .then(function() {
            console.log("Document successfully written!");
            receta.reset()
            $("#clienteactualizado").show(200);
            $("#clienteactualizado").hide(5500);
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
            $("#actualizarerror").show(200);
            $("#actualizarerror").hide(5500);
        });
});


function rendercliente(id) {
    previd = id;
    var docRef = db.collection("clientes").doc(id);
    while (recetas.firstChild) {
        recetas.removeChild(recetas.firstChild);
    }

    docRef.get().then(function(doc) {
        if (doc.exists) {
            cliente = {
                nombre: doc.data().nombre,
                correo: doc.data().correo,
                sexo: doc.data().sexo,
                telefono: doc.data().telefono,
                edad: doc.data().edad,
                ocupacion: doc.data().ocupacion,
                direccion: doc.data().direccion,
                diabetes: doc.data().diabetes,
                hipertension: doc.data().hipertension,
                sinusitis: doc.data().sinusitis,
                dolordecabeza: doc.data().dolordecabeza,
                alergias: doc.data().alergias,
                cataratas: doc.data().cataratas,
                glaucoma: doc.data().glaucoma,
                ceguera: doc.data().ceguera,
                otro: doc.data().otro,
                dolorojos: doc.data().dolorojos,
                ojosllorosos: doc.data().ojosllorosos,
                comezon: doc.data().comezon,
                secresion: doc.data().secresion,
                traumatismo: doc.data().traumatismo,
                miodesopsia: doc.data().miodesopsia,
                anillos: doc.data().anillos,
                hipersensibilidad: doc.data().hipersensibilidad,
                sphod: doc.data().sphod,
                sphoi: doc.data().sphoi,
                cilod: doc.data().cilod,
                ciloi: doc.data().ciloi,
                ejeod: doc.data().ejeod,
                ejeoi: doc.data().ejeoi,
                addod: doc.data().addod,
                carnosidad: doc.data().carnosidad,
                addoi: doc.data().addoi,
                diamod: doc.data().diamod,
                diamoi: doc.data().diamoi,
                alturaod: doc.data().alturaod,
                alturaoi: doc.data().alturaoi,
                xeratometriaoi: doc.data().xeratometriaoi,
                xeratometriaod: doc.data().xeratometriaod,
                proximacita: doc.data().proximacita,
                avscod: doc.data().avscod,
                avscoi: doc.data().avscoi,
                avceod: doc.data().avceod,
                avceoi: doc.data().avceoi,
                previacita: doc.data().fecha,
                ultimacita: doc.data().ultimacita,
                nota: doc.data().nota,
                ids: "Folio - " + id.substring(0, 4)
            };
            if (doc.data().nuevafecha == undefined){
                cliente.proximacita = doc.data().proximacita
            } else {
                cliente.proximacita = doc.data().nuevafecha
            }
            loadingcliente = false;
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });


    db.collection('clientes').doc(id).collection('recetas').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type == 'added') {
                createreceta(change.doc);
            } else if (change.type == 'removed') {
                let li = recetas.querySelector('[id="' + change.doc.id + '"]');
                recetas.removeChild(li);
            }
        });
    });


}

function borrarcliente() {
    if (confirm("¿Quieres borrar a este cliente?")) {
        db.collection('clientes').doc(previd).delete();
        $("[data-dismiss=modal]").trigger({
            type: "click"
        });
    }
}

function borrarreceta(id) {
    if (confirm("¿Quieres borrar esta receta?")) {
        db.collection('clientes').doc(previd).collection('recetas').doc(id).delete();
    }
}

function imprimir(id) {
    const filename = cliente.nombre + '-' + previd.substring(0, 4) + '.pdf';
    let pdf = new jsPDF('1', 'mm', 'letter');

    html2canvas(document.querySelector(id), {
        scale: 1
    }).then(canvas => {
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 8,195,265);
        // pdf.save(filename);
        pdf.autoPrint();
        var url = pdf.output('bloburl')
        localStorage.setItem("storageName",url);
        window.open(url,"Pdf", "nodeIntegration=yes" );
    });


    $("#pdfguardado").show(2000);
    $("#pdfguardado").hide(4000);
}

function imprimirreceta(id) {
    console.log(id)
    const filename = cliente.nombre + '- receta - ' + previd.substring(0, 4) + '.pdf';

    html2canvas(document.querySelector(id), {
        scale: 1
    }).then(canvas => {
        let pdf = new jsPDF('1', 'mm', 'letter');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 8, 8);
        pdf.save(filename);
    });


    $("#pdfguardado").show(2000);
    $("#pdfguardado").hide(4000);
}

function sendmail() {

    if (cliente.correo != ''){
    $("[data-dismiss=modal]").trigger({
        type: "click"
    });
        smalltalk
            .prompt('Contactando a ' + cliente.nombre, 'Escribe tu mensaje', '', {
                buttons: {
                    ok: 'Enviar',
                    cancel: 'Cancelar',
                }
            })
            .then((value) => {
                Email.send({
                    Host: "mail.opticazeiss.com",
                    Username: "contacto@opticazeiss.com",
                    Password: "0pticaZe1ss",
                    To: cliente.correo,
                    From: "contacto@opticazeiss.com",
                    Subject: "Contacto - Optica Zeiss",
                    Body: value
                }).then(
                    message => alert("Correo Enviado")
                );
            })
            .catch(() => {
                console.log('cancel');
            });
    } else {
        alert("el Cliente no cuenta con correo electrónico")
    }
}


$.extend($.expr[":"], {
"containsIN": function(elem, i, match, array) {
return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
}
});
function buscar(query) {
    $('#tablaclientes tr:not(:containsIN("' + query + '"))').hide();
}

var searchbar = document.getElementById("search");
searchbar.onkeyup = function(e) {
    var busqueda = this.value;
    if (e.keyCode == 8) {
        $('#tablaclientes > tr').each(function() {
            $(this).show()
        });
        buscar(busqueda);
    } else {
        if (busqueda !== "") {
            buscar(busqueda);
        } else {
            console.log("Empty")
            $('#tablaclientes > tr').each(function() {
                $(this).show()
            });
        }
    }


}


// Create a var for Display.JS. You don't have to add the $ var, you can change the name.
var $$ = new DisplayJS(window);
$$.ready(function() {
    collect()
})
// Will render the var once



$$.var(100);
$$.target()
