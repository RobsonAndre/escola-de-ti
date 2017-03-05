/*
 * Iniciacao das variaveis
 **/
menuPrincipal = true; //Habilita a abertura do menu principal
menuRelatorio = true; //Habilita a abertura do menu relatorios
menuCompra    = true; //Habilita a abertura do menu compras
menuVendas    = true; //Habilita a abertura do menu vendas
produtos      = [];   //Array de produtos
compras		  = [];   //Array de compras 
vendas        = [];   //Array de vendas
margem		  = 1.25; //Define a margem de lucro dos produtos

//---------------- Funcoes -----------------------------// 

/*
 * boolean init() 
 * 
 * Exibe o menu principal na tela 
 * 
 **/

function init(){

	while(menuPrincipal){
		
		var opcao = prompt("\n*** MENU PRINCIPAL\nEscolha uma opca\n1 - Novo Produto\n2 - Compra\n3 - Venda\n4 - Relatorios\n0 - Sair");
		//console.log("Principal " + opcao);
		switch(parseInt(opcao)){
			case 0 : sair(1);
			break
			case 1 : inserirProduto();
					 menuCompra = true; // possibilita abrir o menu novamente
			break
			case 2 : compraProduto();
			break
			case 3 : vendaProduto();
					 menuVendas = true; // possibilita abrir o menu novamente
			break
			case 4 : relatorios();
					 menuRelatorio = true; // possibilita abrir o menu novamente
			break
			case 9 : iniciaArray(); 
			break
			/**/
		}
	}
	
	return(menuPrincipal);		
}

/*
 * boolean relatorios() 
 * 
 * Exibe o submenu relatorios na tela 
 * 
 **/
function relatorios(){
	while(menuRelatorio){
		var opcao = prompt("\n*** MENU RELATORIOS\nEscolha uma opca\n1 - Produtos\n2 - Compras\n3 - Vendas\n0 - Sair");
		//console.log("Relatorio " + opcao);
		switch(parseInt(opcao)){
			case 0 : sair(2);
			break
			case 1 : relProdutos();
			break
			case 2 : relCompras();
			break
			case 3 : relVendas();
			break
		}
	}
	return(menuRelatorio)
}
/*
 * boolean sair(int) 
 * 
 * Fecha o menu atual (desempilha) 
 * 
 **/
function sair(opc){
	//console.log('Saindo...');
	switch(opc){
		case 1 : menuPrincipal = false;
		break;
		case 2 : menuRelatorio = false;
		break;
		case 3 : menuCompra    = false;
		break;
		case 4 : menuVendas    = false;
		break;
	}
	return(0);
}

/*
 * boolean inserirProduto() 
 * 
 * 1 - Verifica se o codigo e valido e já nao esta cadastrado 
 * 2 - Verifica se o nome e valido e já nao esta cadastrado 
 * 3 - cria o objeto produto 
 * 4 - insere o produto no fim do array 
 *  
 **/
function inserirProduto(){
	/*
	 * Variaveis de controle
	 * local
	 **/
	var validaCodigo = false;
	var validaNome = false;
	/*
	 * Pegando e validando o codigo do produto
	 **/	
	while(!validaCodigo){	
		
		var codigo  = prompt("Codigo do Produto com 4 digitos, ou digite 0 para sair:");
		
		if(codigo == "0"){
			return(0);
		}else{
			if(codigo.length != 4){
				alert("Error\nO codigo deve conter 4 digitos");
			}else if(pesquisaProduto(codigo,'cod')==codigo){
				alert("Error\nO codigo: " + codigo + " ja esta cadastrado!");
			}else{
				validaCodigo = true;
			}
		}
	}
	
	/*
	 * Pegando e validando o nome do produto
	 **/	
	while(!validaNome){	
		
		var nome  = prompt("Nome do Produto com mais de 2 caracteres, ou digite 0 para sair:");
		
		if(nome == "0"){
			return(0);
		}else{
			if(nome.length < 3){
				alert("Error\nO nome deve conter 3 ou mais caracteres");
			}else if(pesquisaProduto(nome,'nome')==nome){
				alert("Error\nO nome : " + nome+ " ja esta cadastrado!");
			}else{
				validaNome = true;
			}
		}
	}
	
	var preco   = 0;//prompt("Preco do Produto:");
	var estoque = 0;//prompt("Estoque do Produto:");
	
	/*
	 * Objeto Produto
	 **/
	var prd = {
			cod : codigo, 
			nom : nome, 
			prc : parseFloat(preco), 
			etq : parseInt(estoque) 
		};
	
	produtos.push(prd);
	
	alert("Produto " + codigo + " cadastrado com sucesso!");
	//console.log(produtos);
	
	if(confirm("Deseja inserir um novo Produto?")){
		inserirProduto();
	}
	
	return(0);
}

/*
 * boolean vendaProduto() 
 * 
 * faz a vendo do produto caso tenha em estoque 
 *  
 **/

function vendaProduto(){
	while(menuVendas){
			var codigo = prompt("\n*** MENU VENDAS\nDigite o codigo do produto ou 0 (zero) para sair.");
			
			if(codigo=="0"){
				sair(4);
			}else{
				var ind = pesquisaProduto(codigo, 'ind');
				//console.log(ind);
				if(ind != null){
					var preco = contabilizaPreco(codigo)*margem;
					var quantidade = prompt("\n*** MENU VENDAS\nDigite a quantidade a ser vendida do produto "+ produtos[ind]["nom"] + " ao preço de "+preco+" :");
					if(quantidade <= contabilizaQuantidade(produtos[ind]['cod'])) {
					var dt  = new Date();
					vend = {
							cod: codigo,
							prc: preco,
							qtd: quantidade,
							dta: dt.getDay() +"/"+ dt.getMonth() +"/" + dt.getYear() +" - " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds()
						}
					//console.log(compras);
					vendas.push(vend);
					alert("Venda com sucesso!");
					} else {
						alert("Quantidade indisponivel!");
					}
				}else{
					alert("Produto nao encontrado!");
				}
			}
		}
}
/*
 * boolean relProdutos() 
 * 
 * mostra a lista de procutos cadastrados  
 *  
 **/
function relProdutos(){
	
	var pdts = "Cod     Nome          Preco Compra     Preço Venda     Qtde Estoque";;
	var tam  = 0;
	for(var i = 0; i<produtos.length; i++){
		/*
		 * Contabilizando custo, preco de venda e quantidade em estoque
		 *
		 **/
		var preco      = contabilizaPreco(produtos[i]['cod']);
		var venda      = preco*margem;// preco de vende com 25% acima do preco de compra
		var quantidade = contabilizaQuantidade(produtos[i]['cod']);
	
		pdts += "\n";
		pdts += produtos[i]['cod'] + " ".repeat(( 8 - produtos[i]['cod'].length));
		pdts += produtos[i]['nom'] + " ".repeat((15 - produtos[i]['nom'].length));
		pdts += preco + "           ";
		pdts += venda + "           ";
		pdts += quantidade;
	}
	
	alert(pdts);
	
	return(0);
}

/*
 * boolean relCompras() 
 * 
 * mostra o relatorio de produtos comprados 
 * mostra a lista de procutos que foram comprados  
 *  
 **/
function relCompras(){
	
	/*
	 * Relatorios de compras
	 **/
	var compr = "Cod     Nome           Preco     Estoque   Data      ";
	
	for(var i = 0; i<compras.length; i++){
		var nome = pesquisaProduto(compras[i]['cod'],'nom');
		//console.log(nome);
		
		compr += "\n";
		compr += compras[i]['cod'] + " ".repeat((8 - compras[i]['cod'].length));
		compr += nome = pesquisaProduto(compras[i]['cod'],'nom') + " ".repeat((15- nome.length));
		
		compr += compras[i]['prc'] + " ".repeat(10);
		compr += compras[i]['qtd'] + " ".repeat(10);
		compr += compras[i]['dta'] + " ".repeat(1);
	}
	alert(compr);
	/**/
	console.log(compras.length);
	
	return(0);
}

/*
 * boolean relVendas() 
 * 
 * mostra o relatorio de produtos vendidos ou nao 
 * mostra todos os produtos os vendidos oo nao  
 *  
 **/

function relVendas(){
	
	var pdts = "Cod     Nome          Preco Compra     Preço Venda     Lucro			Qtde. Vendida";;
	var tam  = 0;
	for(var i = 0; i<produtos.length; i++){
		//pdts += "\n"+produtos[i]['cod']+"      "+produtos[i]['nom']+"          "+produtos[i]['prc']+"     "+produtos[i]['etq'];
		var preco = contabilizaPreco(produtos[i]['cod']);
		var venda = preco*margem;
		pdts += "\n";
		pdts += produtos[i]['cod'] + " ".repeat((8 - produtos[i]['cod'].length));
		pdts += produtos[i]['nom'] + " ".repeat((15- produtos[i]['nom'].length));
		pdts += preco + "         ";
		pdts += venda + "         ";
		pdts += venda - preco + "         ";
		pdts += contabilizaQuantidadeVendas(produtos[i]['cod']);
		/** /
		pdts += produtos[i]['etq'] + " ".repeat((17- produtos[i]['qtd'].length));
		/**/
	}
	
	alert(pdts);
	
	return(0);
}

/*
 * int contabilizaQuantidadeVendas(codigo) 
 * 
 * conta no for quantidade de um produtos vendidos 
 * do codigo passado por parametro
 **/
function contabilizaQuantidadeVendas(cod){
	
	var temp = 0;
	var cont = 0;
	for(var i=0; i<vendas.length; i++){
		if(vendas[i]['cod']==cod){
			temp += parseInt(vendas[i]['qtd']);
			cont++;
		}
	}
	return temp;
}

/*
 * float contabilizaPreco(codigo) 
 * 
 * conta no for quantidade e o preco pago de um produtos 
 * atraves do codigo passado por parametro
 *
 * O preco do produto é a media dos precos de compras
 **/
function contabilizaPreco(cod){
	
	var temp = 0;
	var cont = 0;
	for(var i=0; i<compras.length; i++){
		if(compras[i]['cod']==cod){
			temp += parseFloat(compras[i]['prc']);
			cont++;
		}
	}
	return parseFloat(temp/cont);
	
}

/*
 * int contabilizaQuantidade(codigo) 
 * 
 * conta no for quantidade exitente de um produtos 
 * atraves do codigo passado por parametro
 *
 * Realiza o calculo (soma das qtdes compradas menos as quantidades vendidas)
 **/
function contabilizaQuantidade(cod){

	var temp = 0;
	var cont = 0;
	
	/*
	 * Compras
	 **/
	for(var i=0; i<compras.length; i++){
		if(compras[i]['cod']==cod){
			temp += parseInt(compras[i]['qtd']);
			cont++;
		}
	}
	/*
	 * Vendas
	 **/
	for(var i=0; i<vendas.length; i++){
		if(vendas[i]['cod']==cod){
			temp -= parseInt(vendas[i]['qtd']);
		}
	}
	return temp;
	
}

/*
 * ret pesquisaProduto(cod, ret)
 *
 * cod pode ser:
 *
 * 1 -  codigo do produto (string)
 * 2 -  nome do produto (string)
 *
 * ret pode ser:
 *
 * 1 -  indice do array (int)
 * 2 -  codigo do produto (string)
 * 3 -  nome do produto (string)
 *
 * Pesquisa se o produto existe por codigo ou nome
 * retorna o valor solicitado na variavel ret (indice, codigo ou nome) 
 **/

function pesquisaProduto(cod, ret){
	var retorno = null;//Retorna Null
	for(var i = 0; i<produtos.length; i++){
		//console.log("i: "+ i +"\nProd: "+parseInt(produtos[i]["cod"])+"\nCod: "+parseInt(cod));
		if(parseInt(produtos[i]["cod"])==parseInt(cod)){
			if(ret=='ind'){
				retorno = i;
			}else{
				retorno = produtos[i][ret] 
			}
			i = produtos.length+1;
			//console.log("Sim");
		}
	}
	/**/
	return(retorno);
}

/*
 * boolean compraProduto()
 *
 * 1 - verifica se o codigo confere com um produto cadastrado
 * 2 - solicita a quantidade comprada
 * 3 - solicita o preco de compra
 * 4 - cria o objeto compra
 * 5 - insere a compra no fim do array compras
 * 
 **/
function compraProduto(){
	
	while(menuCompra){
		var codigo = prompt("\n*** MENU COMPRAS\nDigite o codigo do produto com 4 digitos ou 0 (zero) para sair.");
		
		if(codigo=="0"){
			sair(3);
		}else{
			var ind = pesquisaProduto(codigo, 'ind');
			//console.log(ind);
			if(ind != null){
				var quantidade = prompt("\n*** MENU COMPRAS\nDigite a quantidade comprada do produto "+ produtos[ind]["nom"] + ":");
				var preco      = prompt("\n*** MENU COMPRAS\nDigite o preco unitario do produto "+ produtos[ind]["nom"] + ":");
				var dt  = new Date()
				compr = {
						cod: codigo,
						prc: preco,
						qtd: quantidade,
						dta: dt.getDay() +"/"+ dt.getMonth() +"/" + dt.getYear() +" - " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds()
					}
				//console.log(compras);
				compras.push(compr);
				
			}else{
				alert("Produto nao encontrado!");
			}
		}
	}
	return(menuCompra);
}
/*
 * boolean iniciaArray()
 *
 * inicia os array para facilitar os testa
 * por padrao a chamada da funcao no menu principal esta desabilitada
 *
 **/
function iniciaArray(){
	
	var dt = new Date();
	
	
	/**/
	produtos = [
			{cod:'1001',
			 nom:'Mesa'
			},
			{cod:'1002',
			 nom:'Cadeira'
			},
			{cod:'1003',
			 nom:'Cama'
			},
			{cod:'1004',
			 nom:'Sofa'
			},
			{cod:'1005',
			 nom:'Teve'
			},
		]
	/**/
	
	/**/
	
	compras = [
			{
				cod:'1001',
				prc:1000,
				qtd:100,
				dta:dt.getDay() +"/"+ dt.getMonth() +"/" + dt.getYear() +" - " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds()
			},
			{
				cod:'1002',
				prc:2000,
				qtd:200,
				dta:dt.getDay() +"/"+ dt.getMonth() +"/" + dt.getYear() +" - " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds()
			},
			{
				cod:'1003',
				prc:3000,
				qtd:300,
				dta:dt.getDay() +"/"+ dt.getMonth() +"/" + dt.getYear() +" - " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds()
			},
			{
				cod:'1004',
				prc:4000,
				qtd:400,
				dta:dt.getDay() +"/"+ dt.getMonth() +"/" + dt.getYear() +" - " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds()
			},
			{
				cod:'1005',
				prc:5000,
				qtd:500,
				dta:dt.getDay() +"/"+ dt.getMonth() +"/" + dt.getYear() +" - " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds()
			},
		]	
	/**/
	vendas = [
			{
				cod:'1001',
				prc:1250,
				qtd:1,
				dta:dt.getDay() +"/"+ dt.getMonth() +"/" + dt.getYear() +" - " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds()
			},
			{
				cod:'1002',
				prc:2600,
				qtd:2,
				dta:dt.getDay() +"/"+ dt.getMonth() +"/" + dt.getYear() +" - " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds()
			}
			]
	/**/
	
	return(0)
}