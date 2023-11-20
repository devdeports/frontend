
var deleteTag = (data) => {
    var dialog = confirm(`delete tag?`);
    if (dialog) {
        const cnfDt = { url: '/settings/tags', params: {tag:data}, type: 'delete' };
        const delTag = execAjax(cnfDt);
        if(!delTag.success){
            alert(delTag.message);
            return false;
        }
        location.reload();
    }
};


/* Events */
document.addEventListener('DOMContentLoaded', function () {

    /* buttons */
    const btnAddTag = document.getElementById("btnAddTag");
    let btnDelTag = document.querySelectorAll(".tagDelete");

    /* add tag */
    if(btnAddTag) btnAddTag.addEventListener("click", () => {
        onOverlay();
        const cnfTg = { url: '/settings/tags', params: $("#formTag").serialize(), type: 'post' };
        const addTag = execAjax(cnfTg);

        if(!addTag.success){
            alert(addTag.message);
            return false;
        }
        location.reload();
    });

    /* delete tag */
    if(btnDelTag) {
        btnDelTag.forEach((item) => {
            item.setAttribute("onclick", `deleteTag(${item.dataset.tag})`);
        });
    }
});
