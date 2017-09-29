
var 	QTD_BALOES = 40;
var 	QTD_BALOES_ESTOURADOS = 0;
var		TIMERID = null;

//Encaminha o usuário para a página do jogo, levando consigo o nível selecionado
function iniciaJogo() {
	var nivel = document.getElementById('nivel').value;
	window.location.href = 'jogo.html?' + nivel;
}

//Carrega as informações necessárias para o início do jogo
function setup () {
	var url = window.location.search;
	var nivel = url.replace('?', '');
	var tempo;

	//Inicialmente, nenhum balão vai estar estourado
	document.getElementById('qtd_baloes_estourados').innerHTML = QTD_BALOES_ESTOURADOS;

	// Determina a quantidade de tempo disponível para estourar os balões, com base no nível selecionado. Se tentar acessar
	// diretamente a url sem escolher um nível, redireciona para a tela principal.
	switch (nivel) {
		case '1':
			tempo = 120;
			break;
		case '2':		
			tempo = 60;
			break;
		case '3':
			tempo = 30;
			break;
		default:
			 window.location.href = "index.html"
	}

	if ( tempo != null ) {
		document.getElementById('cronometro').innerHTML = tempo;
	}

	//Define a quantidade de balões a serem estourados
	criaBaloes(QTD_BALOES);
	document.getElementById('qtd_baloes').innerHTML = QTD_BALOES;

	//Começa a função update() com base no tempo determinado anteriormente
	update(tempo);
}

//Cria os balões na tela como elementos 'img' filhos do canvas do jogo
function criaBaloes (qtd) {

	var balao;

	for (var i = 0; i < qtd; i++) {
		balao = document.createElement('img');
		balao.src = "imagens/balao_azul_pequeno.png";
		balao.id = "balao" + i;
		balao.className = "balao";

		balao.onclick = function () {
			estouraBalao(this);
		};

		document.getElementById('canvas-jogo').appendChild(balao);
	}
}

//Estoura os balões que foram gerados. Cada vez que um balão for estourado, incrementa a quantidade de balões estourados
//e decrementa a quantidade de balões restantes
function estouraBalao (balao) {
	balao.src = "imagens/balao_azul_pequeno_estourado.png"
	document.getElementById('qtd_baloes_estourados').innerHTML = ++QTD_BALOES_ESTOURADOS;
	document.getElementById('qtd_baloes').innerHTML = --QTD_BALOES;

	balao.onclick = "";

	//Se tiver removido todos os balões, acaba com o jogo
	if ( QTD_BALOES == 0 ) {
		gameOver(true);
		pararJogo();
	}
}

//Atualiza, a cada 1 segundo (1000 milissegundos), as informações relacionadas ao jogo (cronômetro e gameOver)
function update (tempo) {

	document.getElementById('cronometro').innerHTML = tempo--;

	//Se acabar o tempo, fim de jogo!
	if (tempo < 0) {
		pararJogo();
		gameOver(false);
		return false;
	}

	TIMERID = setTimeout('update(' + tempo + ')', 1000);
}

//Função para exibir a mensagem de fim de jogo, dependendo da situação do mesmo
function gameOver( sucesso ) {
	
	if (sucesso) {
		alert ("FIM DE JOGO. Parabéns! Você conseguiu!");
	} else {
		alert ("FIM DE JOGO. Você não conseguiu estourar todos os balões a tempo...");
	}
}

//Função para encerrar o cronômetro
function pararJogo () {
	clearTimeout(TIMERID);
}