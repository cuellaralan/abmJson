<?php

require_once("clases\producto.php");
$tituloVentana = "PRODUCTOS - con archivos, AJAX, JQUERY y JSON -";
?>
<html>
<head>
	<title> <?php echo $tituloVentana; ?> </title>
	  
		<!-- jQuery library -->
        <script src="bower_components/jquery/dist/jquery.min.js"></script>
		<script type="text/javascript" src="./JavaScript/funciones.js"></script>
		
		<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="estilo.css">
</head>
<body>
	<div class="container">
		<div class="page-header">
			<h1>PRODUCTOS</h1>      
		</div>
		<div class="CajaInicio" style="width:1100px">
			<h1>Ejemplo ABM-LISTADO - con archivos, AJAX, JQUERY y JSON - </h1>
			<table>
				<tbody>
					<tr>
						<td width="50%">
							<div id="divFrm" style="height:250px;overflow:auto;margin-top:20px">
								<input type="text" name="codBarra" id="codBarra" placeholder="Ingrese c&oacute;digo de barras" />
								<input type="text" name="nombre" id="nombre" placeholder="Ingrese nombre" />
								Perecedero: <input type="radio" id="perecedero" name="perecedero" value="perecedero" checked>
								No perecedero: <input type="radio" id="perecedero" name="perecedero" value="NoPerecedero" >	
								<input type="file" name="archivo" id="archivo" onchange="SubirFoto()" />
							 
								
								<input type="button" class="MiBotonUTN" onclick="AgregarProducto()" value="Guardar"  />
								<input type="hidden" id="hdnQueHago" value="agregar" />
							</div>
						</td>
						<td rowspan="2">
							<div id="divGrilla" style="height:610px;overflow:auto;border-style:solid">
							
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div id="divFoto" style="height:350px;overflow:auto">
							
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</body>
</html>