$(document).ready(function(){
	
	MostrarGrilla();
	
});
 	
function MostrarGrilla(){
	
    var pagina = "./administracion.php";
	$.ajax({
		type: 'POST',
		url: pagina,
		data: {queHago:"mostrarGrilla"},//objeto,array json,
		dataType: 'html'
	})
	.done(function (datosRespuesta){
			$("#divGrilla").html(datosRespuesta);
		})
	.fail();
 
}

function SubirFoto(){
	
    var pagina = "./administracion.php";
	var foto = $("#archivo").val();
	
	if(foto === "")
	{
		return;
	}

	var archivo = $("#archivo")[0];
	var formData = new FormData(); //si no pongo esto no sube la foto
	formData.append("archivo",archivo.files[0]);
	formData.append("queHago", "subirFoto");

	$.ajax({
        type: 'POST',
        url: pagina,
        dataType: "json",
		cache: false,
		contentType: false,
		processData: false,
        data: formData,
        async: true
    })
	.done(function (objJson) {//funcion que recibe un delegado/manejador

		if(!objJson.Exito){
			alert(objJson.Mensaje);
			return;
		}
		$("#divFoto").html(objJson.Html);//.html escribe un pedazo de codigo
	})
	.fail(function (jqXHR, textStatus, errorThrown) {//recibe informacion de errores
        alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });   
}

function BorrarFoto(){

	var pagina = "./administracion.php";
	var foto = $("#hdnArchivoTemp").val();
	
	if(foto === "")
	{
		alert("No hay foto que borrar!!!");
		return;
	}
	
	$.ajax({
        type: 'POST',
        url: pagina,
        dataType: "json",
        data: {
			queHago : "borrarFoto",
			foto : foto
		},
        async: true
    })
	.done(function (objJson) {

		if(!objJson.Exito){
			alert(objJson.Mensaje);
			return;
		}
		
		$("#divFoto").html("");
		$("#hdnArchivoTemp").val("");
		$("#archivo").val("");
	})
	.fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });   	
	
	return;
}

function AgregarProducto(){
	 //alert($("input [type='radio']:checked").val());
	 alert($('input:radio[name=perecedero]:checked').val());
	//alert($("input [name: 'perecedero']") );
	//alert($("#perecedero").val());

	var radio = $('input:radio[name=perecedero]:checked').val();
    var pagina = "./administracion.php";
	var codBarra = $("#codBarra").val();
	var nombre = $("#nombre").val();
	var archivo = $("#hdnArchivoTemp").val();
	var queHago = $("#hdnQueHago").val();
	
	var producto = {};
	producto.nombre = nombre;
	producto.codBarra = codBarra;
	producto.archivo = archivo;
	producto.perecedero= radio;


	if(!Validar(producto)){
		alert("Debe completar TODOS los campos!!!");
		return;
	}
	
    $.ajax({
        type: 'POST',
        url: pagina,
        dataType: "json",
        data: {
			queHago : queHago,
			producto : producto
		},
        async: true
    })
	.done(function (objJson) {
		
		if(!objJson.Exito){
			alert(objJson.Mensaje);
			return;
		}
		
		alert(objJson.Mensaje);
		
		BorrarFoto();
		
		$("#codBarra").val("");
		$("#nombre").val("");
		
		MostrarGrilla();

		if(queHago !== "agregar"){
			$("#hdnQueHago").val("agregar");
			$("#codBarra").removeAttr("readonly");
		}
		
	})
	.fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });    
		
}

function EliminarProducto(producto){
	
	if(!confirm("Desea ELIMINAR el PRODUCTO "+producto.nombre+"??")){
		return;
	}
	
    var pagina = "./administracion.php";
	
    $.ajax({
        type: 'POST',
        url: pagina,
        dataType: "json",
        data: {
			queHago : "eliminar",
			producto : producto
		},
        async: true
    })
	.done(function (objJson) {
		
		if(!objJson.Exito){
			alert(objJson.Mensaje);
			return;
		}
		
		alert(objJson.Mensaje);
		
		MostrarGrilla();

	})
	.fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });    
	
}
function ModificarProducto(objJson){

	$("#codBarra").val(objJson.codBarra);
	$("#nombre").val(objJson.nombre);

	$("#hdnQueHago").val("modificar");
	
	$("#codBarra").attr("readonly", "readonly");
}

function Validar(objJson){

	alert("implementar validaciones...");
	//aplicar validaciones
	return true;
}