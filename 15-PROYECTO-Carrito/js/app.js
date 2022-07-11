//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners(){
    //cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', addCurso);

    //eliminar curso
    carrito.addEventListener('click', eliminarCurso);

    //vacialr el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        console.log('vaciando carrito');
        articulosCarrito = [];

        limpiarHTML(); //eliminamos todo el html
    
    });
}

//funciones 
function addCurso(e){
    e.preventDefault(); //previene la accion por deefecto
    //solamente va agregar si contiene el #agregar-carrito
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//elimina curso
function eliminarCurso(e)
{
    // console.log(e.target.classList.contains('borrar-curso'));
    if(e.target.classList.contains('borrar-curso')){
    //   console.log(e.target.getAttribute('data-id')); 
      
      const cursoId = e.target.getAttribute('data-id');

      //eliminar curso del carrito
      articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

      console.log(articulosCarrito);

      carritoHTML();
    }
}

//lee el contenido del html y extrae la informacion
function leerDatosCurso(curso)
{
    
    //creo un objeto
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //revisa si ya existe el elemnto en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    
    if(existe){
        // actualisamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++; 
                return curso; //retorna el objtedo actualizado
            }else{
                return curso;
            }
        });
        articulosCarrito = [...cursos]
    }else {
        //agregamod el curso
        //agrega elementos al carrito 
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

   

    
    console.log(articulosCarrito);

    carritoHTML();
}

//muestra el carrito  de compras en html
function carritoHTML()
{
    //limpiar el html
    limpiarHTML();
    //recorre el carrito y genera el html
    articulosCarrito.forEach(curso => {
        console.log(curso);
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo} </td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;
        //agregar el html  del carrito  en el tbody
        contenedorCarrito.appendChild(row);
    });
}

//elimina los curso del tbody
function limpiarHTML()
{
    //forma lenta
    // contonedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}













