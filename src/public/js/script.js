
/* Valida Campos de Formulario */
var validador = (dato) => {
    var elements = document.getElementById(dato.form).elements;
    var message = '';
    for (var i = 0, element; element = elements[i++];) {
        if(element.dataset.valida != undefined) {
            if (element.value === "" || element.value === null){
                message += `- ${element.dataset.valida}\n`;
                document.getElementById(element.id).classList.add('is-invalid');
                document.querySelector("label[for='" + element.id + "']").classList.add('text-danger');
            }
        }
    }
    if(message == ""){ return false; }
    message += '\n Por favor completar los campos mencionados.';
    return message;
};


/* Plantilla Modal */
var modaLGral = '<div class="modal fade" id="modalGral" role="dialog" tabindex="-1" aria-hidden="true" aria-labelledby="modalGral">';
    modaLGral += '    <div class="modal-dialog">';
    modaLGral += '        <div class="modal-content">';
    modaLGral += '            <div class="shadow"></div>';
    modaLGral += '            <div class="modal-header bg-secondary">';
    modaLGral += '                <h5 class="modal-title" id="mdlTitle"></h5>';
    modaLGral += '                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>';
    modaLGral += '            </div>';
    modaLGral += '            <div class="modal-body" id="mdlContent">';
    modaLGral += '            </div>';
    modaLGral += '            <div class="modal-footer" id="mdlFooter">';
    modaLGral += '                <button type="button" id="btnAceptar" class="btn btn-secondary">Aceptar</button>';
    modaLGral += '                <button type="button" id="btnCerrar" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>';
    modaLGral += '            </div>';
    modaLGral += '        </div>';
    modaLGral += '    </div>';
    modaLGral += '</div>';


var cleanModal = () => {
    var preModal = document.getElementById("preModal");
    if (preModal != null) { preModal.remove(); }

    var templateModal = document.createElement("div");
    templateModal.id = "preModal";
    templateModal.innerHTML = modaLGral;
    document.body.appendChild(templateModal);
};


var onOverlay = () => {
    document.querySelector('.shadow').classList.add("overlay");

    var shadow = '<div class="d-flex justify-content-center z-index-3">';
        shadow += '    <div class="spinner-border text-light" role="status">';
        shadow += '        <span class="visually-hidden">Loading...</span>';
        shadow += '    </div>';
        shadow += '</div>';

    document.querySelector('.overlay').innerHTML = shadow;

    $(".overlay").resize().each(function() {
        var h = $(this).parent().outerHeight();
        var w = $(this).parent().outerWidth();
        $(this).css("height", h);
        $(this).css("width", w);
    });
};


var offOverlay = () => {
    document.querySelector('.shadow').innerHTML = "";
    document.querySelector('.shadow').removeAttribute("style");
    document.querySelector('.shadow').classList.remove("overlay");
};


var execAjax = (config) => {
    var retorno = "";
    $.ajax({
        url: config.url,
        data: config.params,
        type: config.type,
        async: false,
        beforeSend: function(){
            // Ejecuta Loader
        },
        success: function(e){
            retorno = e;
            if(config.parse != undefined && config.parse == true){ retorno = JSON.parse(e); }
        }
    });

    return retorno;
};


var onButtonLoad = (myBtn) => {
    const btn = document.getElementById(myBtn);
    var load = '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span><span role="status">&nbsp;Loading...</span>';
    btn.disabled = true;
    btn.innerHTML = load;
};


var alertShow = (data) => {
    var params = { color: "success", title: "Exito", subtitle: "" };

    if(!data.success) {
        params = { color: "warning", title: "Atención", subtitle: "Revisa los datos e intenta nuevamente." };
    }

    var alertMsg = `<div class="alert alert-${params.color}" role="alert">`;
    alertMsg += `    <h4 class="alert-heading">${params.title}!</h4>`;
    alertMsg += `    <p>${data.message}</p>`;
    if(params.subtitle != "") {
        alertMsg += `    <hr><p class="mb-0">${params.subtitle}</p>`;
    }
    alertMsg += '</div>';

    document.getElementById(data.iddom).innerHTML = alertMsg;
};


var toastShow = (message) => {
    var toastMsg = '<div id="MyToast" class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">';
    toastMsg += '    <div class="d-flex">';
    toastMsg += `        <div class="toast-body">${message}</div>`;
    toastMsg += '        <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>';
    toastMsg += '    </div>';
    toastMsg += '</div>';

    var myDiv = document.getElementById("page-content-wrapper");

    var nuevoDiv = document.createElement("div");
    nuevoDiv.classList.add("toast-container", "position-fixed", "bottom-0", "end-0", "p-3");

    nuevoDiv.innerHTML = toastMsg
    myDiv.appendChild(nuevoDiv);

    var myToast = new bootstrap.Toast(document.getElementById("MyToast"));
    myToast.show();
};


/* window load */
window.addEventListener('DOMContentLoaded', event => {    
    // Toggle the sidebar
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', event => {
            document.body.classList.toggle('sb-sidenav-toggled');
        });
    }
});


/* Eventos */
document.addEventListener('DOMContentLoaded', function () {
});
