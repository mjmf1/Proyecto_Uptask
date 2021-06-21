EventListener();

function EventListener (){
    document.querySelector('#formulario').addEventListener('submit', validarRegistro);
}

function validarRegistro(e) {
    e.preventDefault();
    
    var usuario = document.querySelector('#usuario').value,
        password = document.querySelector('#password').value;

        //console.log(usuario + " " + password); // comprobacion de envio formulario

        if(usuario === '' || password === ''){
            Swal({
                type: 'error',
                title: 'error...',
                text: 'Ambos campos son obligatorios!',
                //footer: '<a href="">Why do I have this issue?</a>'
              })
        }else{
            Swal.fire({
                type: 'success',
                title: 'correcto!',
                text: 'escribiste ambos campos!',
                //footer: '<a href="">Why do I have this issue?</a>'
              })
        }

}