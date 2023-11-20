
/* get Rols */
var rolRequest = (params) => {
    $.get('/rols/getRols').then( (res) => {
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
    const btnAddRol = document.getElementById("btnAddRol");

    const btnUpdUser = document.getElementById("btnUpdUser");

    // bootstrap-table
    const $table = $('#listRols');
 
    /* add User */
    if(btnAddRol) btnAddRol.addEventListener("click", () => {
        var idUser = document.getElementById("idUser");
        if(idUser.value.trim() == "") {
            alertShow({success: false, message: "Indicar número de usuario.", iddom: "formAddUser"});
        }

        $.ajax({
            url: "/rols/add",
            data: $("#formAddRol").serialize(),
            type: "post",
            beforeSend: () => { onButtonLoad("btnAddRol"); },
            success: (e) => {
                if(e.success == true){
                    toastShow(e.message);
                    console.log("redireccionar");
                    window.location.href = `/users/details?id=${e.id}&e=false`;
                } else {
                    alertShow({success: false, message: e.message, iddom: "formAddRols"});
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

});
