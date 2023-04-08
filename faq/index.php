<!DOCTYPE html>
<html lang="pt-br">
	<head>
    <script language="JavaScript">
    function protegercodigo() {
    if (event.button==2||event.button==3){
        alert('Código protegido por: Systrom Safe');}
    }
    document.onmousedown=protegercodigo
</script>
<script>
if (document.addEventListener) {
    document.addEventListener("keydown", bloquearSource);
} else { //Versões antigas do IE
    document.attachEvent("onkeydown", bloquearSource);
}

function bloquearSource(e) {
    e = e || window.event;

    var code = e.which || e.keyCode;

    if (
        e.ctrlKey &&
        (code == 83 || code == 85) //83 = S, 85 = U
    ) {
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }

        return false;
    }
}
</script>

		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="title" content="">
		<meta name="description" content="">
		<title>Systrom - Ajuda</title>
			<!-- Favicon  -->
     <link rel="shortcut icon" href="https://systrom.online/favicon.png">
		<link rel="stylesheet" href="https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css" integrity="sha384-wXznGJNEXNG1NFsbm0ugrLFMQPWswR3lds2VeinahP8N0zJw9VWSopbjv2x7WCvX" crossorigin="anonymous">
		<link href="assets/css/global.css?<?php echo filemtime('../assets/css/global.css'); ?>" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Poppins:400,600,700&display=swap" rel="stylesheet">
		<link href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/3.8.95/css/materialdesignicons.min.css" rel="stylesheet">
		<link rel="stylesheet" href="assets/css/tipped.css">
	</head>
	<style>
            /* ===== Scrollbar CSS ===== */
          /* Firefox */
          * {
            scrollbar-width: auto;
            scrollbar-color: #00ACEC #ffffff;
          }
          
          /* Chrome, Edge, and Safari */
          *::-webkit-scrollbar {
            width: 13px;
          }
          
          *::-webkit-scrollbar-track {
            background: #ffffff;
          }
          
          *::-webkit-scrollbar-thumb {
            background-image: linear-gradient(180deg, #00ACEC 0%, #00CEDB 99%);
            border-radius: 10px;
            border: 3px solid #ffffff;
          }
          </style>    
	<body>
		
		<section id="helpme">
			<div class="helpme">
				<header>
					<a class="linkBackControl" href="https://systrom.online/">
						<i class="mdi mdi-chevron-left"></i>
					</a>

					<div>AJUDA</div>
				</header>

				<div id="header">
					<h1>Como podemos ajudar você?</h1>

					<form id="search-help">
						<i class="mdi mdi-magnify search-icon"></i>
						<input type="search" id="searchInputHelpMe" placeholder="Buscar">
					</form>
				</div>

				<section id="formContent" class="title-desativate">
					<form id="formEmail">
						<span style="font-weight: bold;">Motivo da Ajuda:</span>
						<select name="motivo" class="form-control helpReasonInput" required>
							<option value="">Selecione uma opção</option>
							<option value="Sem Motivo">Meu motivo não está aqui</option>
							<option value="Pagamento">Pagamento</option>
							<option value="Cancelamento">Cancelamento</option>
							<option value="Detalhes">Detalhes</option>
						</select>

						<div class="helpFormCamps title-desativate">
							<input type="text" name="name" placeholder="Nome" required>
							<input type="email" name="email" placeholder="E-mail" required>
							<input type="number" name="phone" placeholder="Telefone" required>
							<textarea name="question" placeholder="O que aconteceu?" required></textarea>

							<button type="submit">Enviar</button>
						</div>
					</form>
				</section>

				<div id="SearchContent">
				<?php 
				$i = 0;
				$json = json_decode(file_get_contents('https://systrom.online/faq/suporte.json'));

				foreach ($json as $helps):
				?>
				<ul>
					<h3><?php echo $helps->category_name; ?></h3>

					<?php 
					$n = 0;
					foreach ($helps->questions as $question):
					?>
					<div class="accordion md-accordion searchTermList" id="accordion-<?php echo $i.'-'.$n; ?>" role="tablist" aria-multiselectable="true" searchTerm="<?php echo strtolower($question->title); ?>">
					  <div class="card">
					    <div class="card-header" role="tab" id="heading-<?php echo $i; ?>">
					      <a class="collapsed" data-toggle="collapse" data-parent="#accordion-<?php echo $i.'-'.$n; ?>" href="#collapse-<?php echo $i.'-'.$n; ?>"
					        aria-expanded="false" aria-controls="collapse-<?php echo $i.'-'.$n; ?>">
					        <h5 class="mb-0">
					        	<div><?php echo $question->title; ?></div>
					        	<i class="mdi mdi-chevron-down rotate-icon"></i>
					        </h5>
					      </a>
					    </div>

					    <div id="collapse-<?php echo $i.'-'.$n; ?>" class="collapse" role="tabpanel" aria-labelledby="heading-<?php echo $i ?>"
					      data-parent="#accordion-<?php echo $i.'-'.$n; ?>">
					      <div class="card-body"><?php echo $question->response; ?></div>
					    </div>
					  </div>
					</div>

					<?php $n++; endforeach; ?>
				</ul>

				<?php $i++; endforeach; ?>

					<div class="questionar">
						<h4>
							Ainda precisa de ajuda?
						</h4>

						<p>Estamos aqui para isso.</p>

						<button id="sendEmailButtonInSuport">
							Enviar e-mail para o flow
						</button>
					</div>

				</div>

			</div>
		</section>

		<script src="assets/js/jquery.js" type="text/javascript"></script>
		<script src="assets/js/jquery-ui.js" type="text/javascript"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>
		<script src="https://unpkg.com/popper.js@1.12.6/dist/umd/popper.js" integrity="sha384-fA23ZRQ3G/J53mElWqVJEGJzU0sTs+SvzG8fXVWP+kJQ1lwFAOkcUOysnlKJC33U" crossorigin="anonymous"></script>
		<script src="https://unpkg.com/bootstrap-material-design@4.1.1/dist/js/bootstrap-material-design.js" integrity="sha384-CauSuKpEqAFajSpkdjv3z9t8E7RlpJ1UP0lKM/+NdtSarroVKu069AlsRPKkFBz9" crossorigin="anonymous"></script>
		<script>$(document).ready(function() { $('body').bootstrapMaterialDesign(); });</script>
		<script src="assets/js/tipped.js?10" type="text/javascript"></script>
		<script src="assets/js/principal.js?<?php echo filemtime('../assets/js/principal.js'); ?>"></script>
	</body>
</html>
