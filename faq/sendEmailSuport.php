<?php 

if($_POST){
	$nome = $_POST['name'];
	$email = $_POST['email'];
	$motivo = $_POST['motivo'];
	$telefone = $_POST['phone'];
	$question = $_POST['question'];

	$emailEmpresa = "chillimarcos@gmail.com";
	$headers = "From: chillimarcos@gmail.com\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
	$subject = "Pedido de ajuda - " . $nome;

	$message = <<<EOT
	<h1>Pedido de ajuda solicitado!</h1>
	<hr>
	<section>
		<p>Nome: <strong>$nome</strong></p>
		<p>E-mail: <strong>$email</strong></p>
		<p>Telefone: <strong>$telefone</strong></p>
		<p>Motivo: <strong>$motivo</strong></p>
		<p>Duvida: <strong>$question</strong></p>
	</section>
EOT;

	if(mail($emailEmpresa, $subject, $message, $headers)){
		echo json_encode(array('success'=>'Enviado com sucesso!'));
	}else{
		echo json_encode(array('error'=>'Não foi possível enviar seu e-mail no momento!'));
	}

}
?>