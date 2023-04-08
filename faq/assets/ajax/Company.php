<?php 
require '../../vendor/autoload.php';

//Configuration for MegadoPago payment
MercadoPago\SDK::setClientId('8215488031208705');
MercadoPago\SDK::setClientSecret('3okQMyfAhJnkW3lX6heHtLYPtbW2QOkc');

$planoData = array(
	"Start" => "89.90",
	"Premium" => "169.90"
);

if($_POST){
	$nome = $_POST['name'];
	$email = $_POST['email'];
	$plano = $_POST['plano'];
	$cidade = $_POST['cidade'];
	$telefone = $_POST['phone'];
	$endereco = $_POST['endereco'];
	$descricao = $_POST['descricao'];
	$razaoroname = isset($_POST['cpf']) ? 'Nome:' : 'Razão social:';
	$plano_assinado = $plano == 'start' ? 'Start' : 'Premium';
	$documento = isset($_POST['cpf']) ? 'CPF: ' . $_POST['cpf'] : 'CNPJ: ' . $_POST['cnpj'];

	$uploads = array();
	$uploads[0] = $_FILES['upload_logo'];
	$uploads[1] = $_FILES['upload_empresa_1'];
	$uploads[2] = $_FILES['upload_empresa_2'];

	// fazendo o upload das imagens para o servidor
	$saves = array();
	$images = array();
	$extension = array("jpeg","jpg","png","gif","bmp","pjpeg", "fw", "PNG");

	for($i = 0; $i < count($uploads); $i++){
		$file_name = $uploads[$i]["name"];
		$file_tmp = $uploads[$i]["tmp_name"];
		
		$ext = pathinfo($file_name, PATHINFO_EXTENSION);
		$new_name = md5($file_name.time()) . '.' . $ext;

		$images[$i] = $new_name;
		$mdir = "../../uploads/" . $new_name;
		$saves[$i] = move_uploaded_file($file_tmp, $mdir);
	}

	// verificando se todas as imagens foram salvas e enviando os e-mails
	if(isset($saves[0]) && $saves[0] && isset($saves[1]) && $saves[1] && isset($saves[2]) && $saves[2]){
		$emailEmpresa = "suporteflow@gmail.com";
		$headers = "From: Guiaflow@guiaflow.com\r\n";
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
		$subject = "Nova empresa cadastrada - " . $nome;

		$message = <<<EOT
		<h1>Uma nova empresa foi cadastrada!</h1>
		<hr>
		<section>
		<p>$razaoroname <strong>$nome</strong></p>
		<p>E-mail: <strong>$email</strong></p>
		<p>Telefone: <strong>$telefone</strong></p>
		<p>Plano assinado: <strong>$plano_assinado</strong></p>
		<p>Documento: <strong>$documento</strong></p>
		<p>Cidade: <strong>$cidade</strong></p>
		<p>Endereço: <strong>$endereco</strong></p>
		<p>Descrição da empresa: <strong>$descricao</strong></p>
		</section>

		<section style="width: 100%; display: flex; flex-direction: column; justify-content: space-between;">
			<img src="http://guiaflow.com/uploads/$images[0]" style="max-width: 30%;">
			<img src="http://guiaflow.com/uploads/$images[1]" style="max-width: 30%;">
			<img src="http://guiaflow.com/uploads/$images[2]" style="max-width: 30%;">
		</section>
EOT;
	
		mail($emailEmpresa, $subject, $message, $headers);

		// Gerando link para pagamento
		// Creating settings
		$preference = new MercadoPago\Preference();
		$preference->back_urls = array("success" => "http://guiaflow.com");
		$preference->notification_url = "http://guiaflow.com";
		$preference->external_reference = time();

		// Creating item for order
		$item = new MercadoPago\Item();
		$item->id = time();
		$item->title = "Guiaflow - Plano " . $plano_assinado . " (" . $nome . ")";
		$item->quantity = 1;
		$item->currency_id = "BRL";
		$item->unit_price = $planoData[$plano_assinado];

		$preference->items = array($item);
		$preference->save();
		$urlPagamento = $preference->init_point;

		$variables = array();
		$variables['link'] = $urlPagamento;

		$template = file_get_contents("http://guiaflow.com/email_model.php");

		foreach($variables as $key => $value){
			$template = str_replace('{{ '.$key.' }}', $value, $template);
		}

		$emailCadastrante = $email;
		$headers2 = "From: suporteflow@gmail.com\r\n";
		$headers2 .= "MIME-Version: 1.0\r\n";
		$headers2 .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
		$subject2 = "Guiaflow - Cadastro realizado!";

		mail($emailCadastrante, $subject2, $template, $headers2);

		echo json_encode(array(
			"success" => "Enviado com succeso",
			"url" => $urlPagamento
		));

	}else{
		echo json_encode(array(
			"error" => "Não foi possível enviar todas as imagens, atualize a página e tente novamente!" 
		));
	}

}
?>