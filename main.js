const urlobtenerPersonas = './obtenerPersonas.php';
const urlEditarPersonas = './editarPersonas.php';
const urlAgregarPersonas = './agregarPersonas.php';
const urlEliminarPersonas = './borrarPersonas.php';
const urlBuscarPersonas = './buscador.php';

const btndelete = document.querySelector('.btn-delete');
const btnedit = document.querySelector('.btn-edit');

const btn = document.querySelector('.btn');
const tablebody = document.querySelector('.table-body');
const formulario = document.querySelector('#formulario')

const inpuntId = document.getElementById('id');
const inpuntNombre = document.getElementById('txtNombre');
const inpuntApellido = document.getElementById('txtApellido');
const inpuntTelefono = document.getElementById('txtTelefono');
const inpuntDireccion = document.getElementById('txtDireccion');
const inpuntEmail = document.getElementById('txtCorreo');
const inpuntPais= document.getElementById('txtPais');
const inpuntCiudad = document.getElementById('txtCiudad');




let listaPersonas = []
let editando = false

const objPersonas = {
    nombre:"",
    apellido:'',
    direccion:'',
    telefono:'',
    email:'',
    pais:'',
    ciudad:'' 
}

formulario.addEventListener('submit',validarFormulario);
function validarFormulario(e) {
    e.preventDefault();
    if([inpuntNombre.value,inpuntApellido.value,
         inpuntTelefono.value, inpuntDireccion.value,
        inpuntPais.value, inpuntEmail.value, inpuntCiudad.value].includes('') ){
             alert('Todos los campos son requeridos');
             return;

     }

    if(editando){
        editarPersonas();
        editando = false;

    }else{
        objPersonas.nombre = inpuntNombre.value,
        objPersonas.apellido = inpuntApellido.value,
        objPersonas.direccion = inpuntDireccion.value,
        objPersonas.telefono = inpuntTelefono.value,
        objPersonas.email = inpuntEmail.value,
        objPersonas.pais = inpuntPais.value,
        objPersonas.ciudad = inpuntCiudad.value,
        agregarPersonas();
  
    }
    
}

 async function obtenerPersonas(){
    listaPersonas = await fetch(urlobtenerPersonas).then(res=> res.json()).then(datos=> datos);
    tablebody.innerHTML= '';
    listaPersonas.forEach(element => {
       tablebody.innerHTML += `
       <tr>
           <td>${element.nombre}</td>
           <td>${element.apellido}</td>
           <td> ${element.direccion}</td>
           <td>${ element.telefono}</td>
           <td> ${element.email}</td>
           <td> ${element.pais}</td>
           <td> ${element.ciudad}</td>
           <td>
               <button class="btn-delete btns" data-id="${element.id}">Eliminar</button>
               <button  class="btn-edit btns" data-id="${element.id}" >Editar</button>
           </td>
        </tr>
   `    
   });

}

async function cargarPersonas(element) {
    console.log(element);
    
}
async function agregarPersonas() {
    const res =  await fetch(urlAgregarPersonas,
    {
        method: 'POST',
        body: JSON.stringify(objPersonas)

    }).then(repuesta=> repuesta.json())
    .then(data=>data);
    
    if(res.msg === 'OK'){
        alert('Se Agrego Correctamente');
        limpiarHtml();
        obtenerPersonas();
        formulario.reset();
        limpiarObjeto();
    }
}



function limpiarHtml() {
    inpuntDireccion.value = ''
    inpuntTelefono.value = ''
    inpuntEmail.value = ''
    inpuntNombre.value = ''
    inpuntApellido.value = ''
    inpuntCiudad.value = ''
    inpuntPais.value = ''
}

function limpiarObjeto() {
    objPersonas.nombre = ''
    objPersonas.apellido = ''
    objPersonas.email = ''
    objPersonas.pais = ''
    objPersonas.direccion = ''
    objPersonas.telefono = ''
    objPersonas.ciudad = ''
}

obtenerPersonas();

tablebody.addEventListener('click', async (e) =>{
     await btnAccion(e);
 });


 async function btnAccion(e) {
    if(e.target.classList.contains("btn-edit")){
        let id = e.target.dataset.id;
        console.log(id);
        let lista = await fetch(urlBuscarPersonas,
            {
                method: 'POST',
                body: JSON.stringify({'id':id})
        
            }).then(repuesta=> repuesta.json())
            .then(data=>data);
            console.log(lista);

        lista.map(item => {
                inpuntId.value = parseInt( item.id),
                inpuntNombre.value = item.nombre,
                inpuntApellido.value = item.apellido,
                inpuntEmail.value = item.email,
                inpuntCiudad.value = item.ciudad,
                inpuntDireccion.value = item.direccion,
                inpuntTelefono.value = item.telefono,
                inpuntPais.value = item.pais
                editando = true
                btn.textContent = 'Actualizar'

            
        })

        
        
    }else if(e.target.classList.contains("btn-delete")){
        let id = e.target.dataset.id;
        const res =  await fetch(urlEliminarPersonas,
            {
                method: 'POST',
                body: JSON.stringify({'id':id})
        
            }).then(repuesta=> repuesta.json())
            .then(data=>data);

            if(res.msg === 'OK'){
                alert('Se Elimino Correctamente');
                obtenerPersonas();
                limpiarHtml()
                limpiarObjeto()
            }
      
    }
    
 }

 async function editarPersonas(){
    const personas ={
        id: parseInt(inpuntId.value),
        nombre : inpuntNombre.value,
        apellido : inpuntApellido.value,
        direccion : inpuntDireccion.value,
        telefono : inpuntTelefono.value,
        email : inpuntEmail.value,
        pais : inpuntPais.value,
        ciudad :inpuntCiudad.value
    }

    const res =  await fetch(urlEditarPersonas,
        {
            method: 'POST',
            body: JSON.stringify(personas)
    
        }).then(repuesta=> repuesta.json())
        .then(data=>data);
        
        if(res.msg === 'OK'){
            alert('Se Actualizo Correctamente');
            limpiarHtml();
            obtenerPersonas();
            formulario.reset();
            limpiarObjeto();
            btn.textContent = 'Agregar'
            editando = false
          
        }

 }

 async function deletePersonas(){

 }