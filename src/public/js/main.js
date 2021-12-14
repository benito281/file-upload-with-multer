let form = document.querySelector("#upload-file");
let url = document.location.href;
let inputFile = document.querySelector("#form-file");
let alert = document.getElementById("alert-message");

//Carga de archivo y validación
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (inputFile.value === '') {
        message(alert,'Elija un archivo por favor','warning');
    }
    else{
        await sendFile(form);
    }
});

//Proceso de carga de archivo
const sendFile = async (formSend) => {
    try {
        let response = await fetch(url + 'data', {
            method: 'POST',
            body: new FormData(formSend)
          });
          let result = await response.json();
          message(alert,result.message,result.type);
    } catch (error) {
        message(alert,'Ingrese un archivo menor a 8MB o con las siguientes extensiones: jpeg, jpg, png, gif.','danger');
    }
}

//Mensaje de alerta
function message(div,message,type){
    return div.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}