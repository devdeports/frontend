
/* get Users */
var userRequest = (params) => {
    $.get('/users/getUsers').then( (res) => {
        params.success(res)
    });
};

var rowsOptionsUsers = (value, row, index) => {
    return [`<div class="btn-group" role="group" aria-label="client options">
            <a href="/users/details?id=${row.Id}&e=false" class="btn btn-sm btn-outline-primary"><i class="fa-solid fa-person-walking-arrow-right"></i></a>
            </div>`].join('');
};


/* Events */
document.addEventListener('DOMContentLoaded', function () {

    /* buttons */
    const btnAddUser = document.getElementById("btnAddUser");
    const btnUpdUser = document.getElementById("btnUpdUser");
    const btnAddUser2 = document.getElementById("btnAddUser2");

    // bootstrap-table
    const $table = $('#listUsers');
 
    /* add User */
    if(btnAddUser) btnAddUser.addEventListener("click", () => {
        var idUser = document.getElementById("idUser");
        if(idUser.value.trim() == "") {
            alertShow({success: false, message: "Indicar número de usuario.", iddom: "formAddUser"});
        }

        $.ajax({
            url: "/users/add",
            data: $("#formAddUser").serialize(),
            type: "post",
            beforeSend: () => { onButtonLoad("btnAddUser"); },
            success: (e) => {
                if(e.success == true){
                    toastShow(e.message);
                    console.log("redireccionar");
                    window.location.href = `/users/details?id=${e.id}&e=false`;
                } else {
                    alertShow({success: false, message: e.message, iddom: "formAddUser"});
                }
            }
        });
    });

    /* upd User */
    if(btnUpdUser) btnUpdUser.addEventListener("click", () => {
        var id = document.getElementById("id").value;
        var ckActive = document.getElementById("ckActive");
        document.getElementById("isActive").value = (ckActive.checked) ? 1: 0;

        $.ajax({
            url: "/users/details",
            data: $("#formUpdUser").serialize(),
            type: "put",
            beforeSend: () => { onButtonLoad("btnUpdUser"); },
            success: (e) => {
                if(e.success == true){
                    toastShow(e.message);
                    setTimeout(function() {
                        window.location.href = `/users/details?id=${id}&e=false`;
                    }, 2000);
                } else {
                    alertShow({success: false, message: e.message, iddom: "formUpdUser"});
                }
            }
        });
    });




    if(btnAddUser2) btnAddUser2.addEventListener("click", () => {
        cleanModal();

        // load Regions
        const cnfRg = { url: '/regions', params: '', type: 'get' };
        const listRegion = execAjax(cnfRg);

        var contenido = '<form id="formAddClient" class="row g-3">';
        contenido += '    <div class="col-6">';
        contenido += '        <label for="field" class="form-label">id</label>';
        contenido += '        <input type="text" class="form-control" name="uid" id="uid">';
        contenido += '    </div>';
        contenido += '    <div class="col-6">';
        contenido += '        <label for="field" class="form-label">region</label>';
        contenido += '        <select class="form-select select2" aria-label="region client" name="idRegion" id="idRegion">';
        contenido += '            <option value="" disabled selected>Select...</option>';
        listRegion.map((region) => {
        contenido += `            <option value="${region.IdRegion}" data-reg="${JSON.stringify(region)}">${region.City} - ${region.State}</option>`;
        });
        contenido += '        </select>';
        contenido += '    </div>';
        contenido += '    <div class="col-6">';
        contenido += '        <label for="field" class="form-label">access level</label>';
        contenido += '        <select class="form-select" aria-label="access client" name="accessLevel" id="accessLevel">';
        contenido += '            <option value="" disabled selected>Select...</option>';
        contenido += '            <option value="1">All</option>';
        contenido += '            <option value="2">Web</option>';
        contenido += '            <option value="3" selected>App</option>';
        contenido += '        </select>';
        contenido += '    </div>';
        contenido += '    <div class="col-6">';
        contenido += '        <label for="field" class="form-label">user type</label>';
        contenido += '        <select class="form-select" aria-label="usertype client" name="userType" id="userType">';
        contenido += '            <option value="1" disabled selected>Admin</option>';
        contenido += '            <option value="2">Client</option>';
        contenido += '            <option value="3" selected>Customer</option>';
        contenido += '        </select>';
        contenido += '    </div>';
        contenido += '    <div class="col-6">';
        contenido += '        <label for="field" class="form-label">first Name</label>';
        contenido += '        <input type="text" class="form-control" name="firstName" id="firstName">';
        contenido += '    </div>';
        contenido += '    <div class="col-6">';
        contenido += '        <label for="field" class="form-label">last Name</label>';
        contenido += '        <input type="text" class="form-control" name="lastName" id="lastName">';
        contenido += '    </div>';
        contenido += '    <div class="col-6">';
        contenido += '        <label for="field" class="form-label">email</label>';
        contenido += '        <input type="text" class="form-control" name="email" id="email">';
        contenido += '    </div>';
        contenido += '    <div class="col-6">';
        contenido += '        <label for="field" class="form-label">phone Number</label>';
        contenido += '        <input type="text" class="form-control" name="phoneNumber" id="phoneNumber">';
        contenido += '    </div>';
        contenido += '</form>';

        const cls = ["text-white"];
        document.querySelector('.modal-header').classList.add(...cls);
        document.querySelector('.modal-title').innerHTML = "add client";
        document.querySelector('.modal-body').innerHTML = contenido;

        // select2
        $('.select2').select2({ dropdownParent: $('#modalGral') });

        var myModal = new bootstrap.Modal(document.querySelector('.modal'), { keyboard: false, backdrop: "static" });
        myModal.show();

        // aceptar
        document.getElementById("btnAceptar").addEventListener("click", () => {
            $.ajax({
                url: "/clients/add",
                data: $("#formAddClient").serialize(),
                type: "post",
                beforeSend: () => { onOverlay(); },
                success: (e) => {
                    if(e.success == true){
                        myModal.hide();
                        $table.bootstrapTable('refresh');
                    } else {
                        offOverlay();
                        var notfound = '<div class="alert alert-warning" role="alert">';;
                        notfound += '    <h4 class="alert-heading">Alert!</h4>';
                        notfound += `    <p>${e.message}</p>`
                        notfound += '    <hr><p class="mb-0">check the data and try again</p>';
                        notfound += '</div>';
                        document.getElementById("formAddClient").innerHTML = notfound;
                        document.getElementById("btnAceptar").remove();
                    }
                }
            });
        });
    });

});
