let stepIsNow = 1;
let isOpening = false;

const texto_plano_start = `
Com o plano <b>START</b> você conta com os seguintes recursos:
<ul>
	<li>1 Foto</li>
	<li>Numero de contato</li>
	<li>Breve descrição</li>
	<li>Localização</li>
</ul>
`;

const texto_plano_premium = `
Com o plano <b>START</b> você conta com os seguintes recursos:
<ul>
	<li>1 Foto</li>
	<li>Numero de contato</li>
	<li>Breve descrição</li>
	<li>Localização</li>
</ul>
`;

$(document).on('submit', '#search-help', function(e){
	e.preventDefault();
});

$(document).on('submit', '#formEmail', function(e){
	e.preventDefault();
	$(':input[type="submit"]').prop('disabled', true);

	$.ajax({
		url: 'sendEmailSuport.php',
		type: 'POST',
		dataType: 'JSON',
		data: $(this).serializeArray(),
		success:function(data){
			if(data.success){
				isOpening = false;

				$('#formContent').addClass('title-desativate');
				$('#SearchContent, #header').removeClass('title-desativate');
			}else{
				alert(data.error);
			}
		}
	});
});

$(document).on('click', '#sendEmailButtonInSuport', function(){
	isOpening = true;

	$('#SearchContent, #header').addClass('title-desativate');
	$('#formContent').removeClass('title-desativate');

	$('.linkBackControl').click(function(e){
		if(isOpening){
			isOpening = false;
			e.preventDefault();

			$('#formContent').addClass('title-desativate');
			$('#SearchContent, #header').removeClass('title-desativate');
		}else{
			return true;
		}
	});

});

$(document).ready(function() {
	$('#searchInputHelpMe').on('input', function(e){
		e.preventDefault();

		let search = $(this).val().toLowerCase().trim();

		if(search.length == 0 || search == ""){
			$('#helpme .helpme h3').removeClass('title-desativate');
			$('.searchTermList').show();
		}else{
			$('#helpme .helpme h3').addClass('title-desativate');

			$(".searchTermList").each(function(index) {
		        if ($(this).attr('searchTerm').toLowerCase().trim().indexOf(search) != -1) {
		            $(this).show();
		        }else {
		            $(this).hide();  
		        }
		    });
		}
	});

	$('.helpReasonInput').on('input', function(){
		$(this).val() != "" ? $('.helpFormCamps').removeClass('title-desativate') : $('.helpFormCamps').addClass('title-desativate');
	});
});

$('[data-menu-toggle]').click(function(){
	$('nav.menu').fadeToggle(200);
	$('header section.right > *').toggleClass('active');
	$(this).toggleClass('mdi-menu mdi-close');
	$('body').toggleClass('active');
});

$('[data-li]').click(function(){
	const a = $(this);
	let b = a.attr('data-li');
	$('[data-li]').removeClass('active');
	$(this).addClass('active');
	$('.structure .li').removeClass('active');
	$('.structure .li:nth-child('+b+')').addClass('active');
});

$(document).on('click', '#open-modal', function(e){
	e.preventDefault();

	$('#talk-modal').css('z-index', '10000000').animate({'opacity': '1'}, function(){
		$('#talk-modal .box').removeClass('bounceOutUp').addClass('bounceInDown');
	});

});

$('#talk-modal .close').click(function(){
	$('#talk-modal .box').addClass('animated bounceOutUp', function(){
		setTimeout(function(){
			$('#talk-modal').animate({'opacity': '0'}, function(){
				$(this).css({'z-index': '-100000'});
			});
		}, 600);
	}).removeClass('bounceInDown');;
});

$(document).on('click', '.option-company', function(e){
	e.preventDefault();

	const titleBox = $('.main-company > .title-box');
	const descriptionBox = $('.main-company > .description-box');
	const option = $(this).attr('value');

	$(this).addClass('animated zoomOut', function(){
		setTimeout(function() {
			$('.main-company > .information').animate({'opacity': 0}, function(){
				$(this).remove();

				titleBox.html('Insira seus dados');
				descriptionBox.html('Primeiro nos informe os dados solicitados abaixo');
			})

			$('.main-company > .select-option').animate({'opacity': 0}, function(){
				$(this).remove();
				option == 'fisica' ? formFisico() : formJuridico();
			});
		}, 50);
	});

});

$('.box-new-company > .header-company > .close-modal').click(function(){
	$('.box-new-company').addClass('animated bounceOutUp', function(){
		setTimeout(function(){
			$('section.modal-company').animate({'opacity': '0'}, function(){
				$(this).css({'z-index': '-100'});
				$('.main-company').html(`
					<h4 class="title-box">Vamos começar</h4>
					<p class="description-box">Cadastre sua empresa no Guia Flow seguindos os simples passos abaixo.</p>

					<div class="select-option">
						<li class="option-company" value="fisica">Pessoa Física</li>
						<li class="option-company" value="juridica">Pessoa Jurídica</li>
					</div>

					<form id="formSendNewCompany"></form>

					<div class="information">
						<h4 class="title">Baixe o aplicativo!</h4>
						<div class="platforms">
							<a href="https://play.google.com/store/apps/details?id=com.grupoflow.flow" target="_blank" class="android">
								<img class="imgs" src="assets/img/btn_android.png">
							</a>
							<a href="https://play.google.com/store/apps/details?id=com.grupoflow.flow" target="_blank" class="ios">
								<img class="imgs" src="assets/img/btn_ios.png">
							</a>
						</div>
					</div>
				`);
			});
		}, 700);
	}).removeClass('bounceInDown');
	stepIsNow = 1;
});

$(document).on('click', '#modalCadastrar', function(){
	$('section.modal-company').css({'z-index': '100'});
	$('section.modal-company').animate({'opacity': '1'});
	setTimeout(function() {
		$('.box-new-company').addClass('animated bounceInDown').removeClass('bounceOutUp');
	}, 300);
});

$(document).on('submit', '#formSendNewCompany', function(e){
	e.preventDefault();

	if(stepIsNow == 1){
		$('.first-step').animate({'oapcity': 0, 'height': 0}, function(){
			$(this).css('overflow', 'hidden');
			$(this).parent().append('<div class="second-step"></div>');

			setTimeout(function() {
				$('.second-step').append('<textarea required minlength="5" maxlength="300" class="animated bounceIn textarea-company" name="descricao" placeholder="(Max. 300 caracteres)"></textarea>');
			}, 0);

			setTimeout(function() {
				$('.second-step').append('<button class="animated bounceIn button-company" type="submit">PROXÍMO</button>');
			}, 100);

			$('.description-box').html('Escreva uma breve descrição da sua empresa.');
			$('.box-new-company').css('min-height', 'auto');

			stepIsNow = 2;
		});
	}else if(stepIsNow == 2){
		$('.second-step').animate({'oapcity': 0, 'height': 0}, function(){
			$(this).css('overflow', 'hidden');
			$(this).parent().append('<div class="three-step"><div class="uploads" style="display: flex;"></div></div>');

			setTimeout(function() {
				$('.three-step> .uploads').append(`
					<div class="animated bounceIn contentUpload">
						<div class="title-upload">Logo</div>

						<div class="upload-ball">
							<img style="opacity: 0;" class="upload_logo" />

							<button class="upload-button">
								<i class="mdi mdi-camera"></i>
							</button>
							<input required type="file" accept="image/png, image/jpeg" name="upload_logo" class="upload-file-hidden" />
						</div>
					</div>
				`);
			}, 0);

			setTimeout(function() {
				$('.three-step> .uploads').append(`
					<div class="animated bounceIn contentUpload">
						<div class="title-upload">Empresa</div>

						<div class="upload-ball">
							<img style="opacity: 0;" class="upload_empresa_1" />

							<button class="upload-button">
								<i class="mdi mdi-camera"></i>
							</button>
							<input required type="file" accept="image/png, image/jpeg" name="upload_empresa_1" class="upload-file-hidden" />
						</div>
					</div>
				`);
			}, 50);

			setTimeout(function() {
				$('.three-step> .uploads').append(`
					<div class="animated bounceIn contentUpload">
						<div class="title-upload">Empresa</div>

						<div class="upload-ball">
							<img style="opacity: 0;" class="upload_empresa_2" />

							<button class="upload-button">
								<i class="mdi mdi-camera"></i>
							</button>
							<input required type="file" accept="image/png, image/jpeg" name="upload_empresa_2" class="upload-file-hidden" />
						</div>
					</div>
				`);
			}, 100);

			setTimeout(function() {
				$('.three-step').append(`
					<p class="description-box-down">Agora falta pouco para sua empresa está disponível na plataforma. O tempo estimado é de 72 horas.</p>
					<button class="animated bounceIn button-company" type="submit">PROXÍMO</button>
				`);
			}, 200);

			$(document).on('change', "input[name='upload_logo']", function(){
				setFilePreview(this, '.upload_logo');	
			});

			$(document).on('change', "input[name='upload_empresa_1']", function(){
				setFilePreview(this, '.upload_empresa_1');	
			});

			$(document).on('change', "input[name='upload_empresa_2']", function(){
				setFilePreview(this, '.upload_empresa_2');	
			});

			$('.description-box').html('Falta pouco para terminar seu cadastro. Envie uma foto da logo da sua empresa, e duas fotos da empresa.');
			stepIsNow = 3;
		});
	}else if(stepIsNow == 3){
		$('.three-step').animate({'oapcity': 0, 'height': 0}, function(){
			$(this).css('overflow', 'hidden');
			$(this).parent().append('<div class="four-step"><div class="plans-company"></div></div>');

			$('.title-box').html('Escolha um plano');
			$('.description-box').html('Escolha seu plano, enviaremos o boleto de pagamento para seu endereço de e-mail após você finalizar o cadastro.');
			
			setTimeout(function() {
				$('.four-step > .plans-company').append(`
				<div class="plano-box animated bounceIn tip" title="${texto_plano_start}">
					<div class="plano-information">
						<div class="title-palno">START</div>
						<div class="desc-palno">A partir de</div>

						<div class="preco active" for="plano_start">
							<div class="brl">R$</div>
							<div class="valor">89,90</div>
							<div class="tempo">/ANO</div>
						</div>
					</div>

					
					<button type="button" class="select-plan">
						<input checked id="plano_start" type="radio" name="plano" value="start" />
						<label for="plano_start">Assinar</label>
					</button>
				</div>
				`);
			}, 0);

			setTimeout(function() {
				$('.four-step > .plans-company').append(`
				<div class="plano-box animated bounceIn tip" title="${texto_plano_premium}">
					<div class="plano-information">
						<div class="title-palno">PREMIUM</div>
						<div class="desc-palno">A partir de</div>

						<div class="preco" for="plano_premium">
							<div class="brl">R$</div>
							<div class="valor">169,90</div>
							<div class="tempo">/ANO</div>
						</div>
					</div>

					
					<button type="button" class="select-plan">
						<input id="plano_premium" type="radio" name="plano" value="premium" />
						<label for="plano_premium">Assinar</label>
					</button>
				</div>
				`);
			}, 100);


			$(document).on('click', "input[type='radio']", function(){
				let plano = $(this).attr('id');

				$('div.preco').removeClass('active');
				$(`div.preco[for='${plano}']`).addClass('active');
			});

			setTimeout(function() {
				$('.four-step').append(`
					<p class="description-box-down">Agora falta pouco para sua empresa está disponível na plataforma. O tempo estimado é de 72 horas.</p>
					<button class="animated bounceIn button-company" type="submit">Enviar</button>
				`);
				
				Tipped.create('[title]');
			}, 200);

			stepIsNow = 4
		});

	}else{
		let formTag = $(this);
		let formData = new FormData(this);
		$('button[type=submit], input[type=submit]').prop('disabled',true);

		$.ajax({
			url: 'assets/ajax/Company.php',
			type: 'POST',
			dataType: 'JSON',
		    data: formData,
		    mimeType:"multipart/form-data",
		    contentType: false,
		    cache: false,
		    processData:false,
		    beforeSend: function(){
		    	formTag.animate({'opacity': 0.5});
		    },
		    success: function(data){
		    	if(data.success){
		    		formTag.animate({'opacity': 1});

		    		$('.four-step').animate({'oapcity': 0, 'height': 0}, function(){
						$(this).css('overflow', 'hidden');
						$(this).parent().append('<div class="five-step"></div>');

						$('.title-box').html('Parabéns!').animate({'color': "#47CD87"});
						$('.description-box').html('Seu cadastro foi concluido com sucesso. Verifique sua caixa de e-mail para mais informações!');

						$('.five-step').append('<img src="/assets/img/gif_animated.gif" style="max-width: 100%;" class="animated bounceIn"/>');
					});
		    	}else{
		    		alert(data.error);
		    	}

		    }
		});
		
	}

});

function formFisico(){

	const inputs = [
	'<input required autocomplete="false" class="animated bounceIn input-company" type="text" name="name" placeholder="Nome e sobrenome">',
	'<input required autocomplete="false" class="animated bounceIn input-company" type="text" name="phone" placeholder="(00) 00000-0000">',
	'<input required autocomplete="false" class="animated bounceIn input-company" type="email" name="email" placeholder="E-mail">',
	'<input required autocomplete="false" class="animated bounceIn input-company" type="text" name="cpf" placeholder="CPF">',
	'<input required autocomplete="false" class="animated bounceIn input-company" type="text" name="cidade" placeholder="Cidade">',
	'<input required autocomplete="false" class="animated bounceIn input-company" type="text" name="endereco" placeholder="Endereço">',
	'<button class="animated bounceIn button-company" type="submit">PROXÍMO</button>',
	];

	let i = 0;
	let interval = setInterval(function() {
		if(i == 0){
			$("#formSendNewCompany").append('<div class="first-step"></div>');
		}
		
		$("#formSendNewCompany > .first-step").append(inputs[i]);
		i++;

		if(i == inputs.length){
			clearInterval(interval);
		}
	}, i == 1 ? 0 : 100+(i*10));

	$("input.input-company[name='phone']").mask("(99) 99999-9999");
	$("input.input-company[name='cpf']").mask("999.999.999-99");

}

function formJuridico(){

	const inputs = [
	'<input required autocomplete="false" class="animated bounceIn input-company" type="text" name="name" placeholder="Razão Social">',
	'<input required autocomplete="false" class="animated bounceIn input-company" type="text" name="phone" placeholder="(00) 00000-0000">',
	'<input required autocomplete="false" class="animated bounceIn input-company" type="email" name="email" placeholder="E-mail">',
	'<input required autocomplete="false" class="animated bounceIn input-company" type="text" name="cnpj" placeholder="CNPJ">',
	'<input required autocomplete="false" class="animated bounceIn input-company" type="text" name="cidade" placeholder="Cidade">',
	'<input required autocomplete="false" class="animated bounceIn input-company" type="text" name="endereco" placeholder="Endereço">',
	'<button class="animated bounceIn button-company" type="submit">PROXÍMO</button>',
	];

	let i = 0;
	let interval = setInterval(function() {
		if(i == 0){
			$("#formSendNewCompany").append('<div class="first-step"></div>');
		}
		
		$("#formSendNewCompany > .first-step").append(inputs[i]);
		i++;

		if(i == inputs.length){
			clearInterval(interval);
		}
	}, i == 1 ? 0 : 100+(i*10));

	$("input.input-company[name='phone']").mask("(99) 99999-9999");
	$("input.input-company[name='cnpj']").mask("99.999.999/9999-99");

}

function setFilePreview(input, tag) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    
    reader.onload = function(e) {
      $(tag).attr('src', e.target.result).css({'opacity': 1, 'width': '200px'});
    }
    
    reader.readAsDataURL(input.files[0]);
  }
}