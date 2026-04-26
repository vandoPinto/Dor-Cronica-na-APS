/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Arquivos de Configurações do material

//Array que registra todos os identificadores já concluídos
var conclusao = [];

//Array que possui a listagem de todos os items exitentes
var items = [];

var nomeUnidade = "";
var nomeAula = "";


items.push({
    'titulo': 'OBJETIVOS DE APRENDIZAGEM',
    'nome': 'Aula 1',
    'arquivo': '1.html',
    'identificador': '0'
});

items.push({
    'titulo': 'APRESENTAÇÃO',
    'nome': 'Aula 2',
    'arquivo': '2.html',
    'identificador': '1'
});
items.push({
    'titulo': '',
    'nome': 'Aula 3',
    'arquivo': '3.html',
    'identificador': '2'
});
items.push({
    'titulo': 'INTRODUÇÃO',
    'nome': 'Aula 4',
    'arquivo': '4.html',
    'identificador': '3'
});
items.push({
    'titulo': '',
    'nome': 'Aula 5',
    'arquivo': '5.html',
    'identificador': '4'
});
items.push({
    'titulo': 'ASPECTOS EPIDEMIOLÓGICOS, DEMOGRÁFICOS E SOCIAIS RELACIONADOS ÀS FERIDAS AGUDAS E CRÔNICAS NO SUS',
    'nome': 'Aula 6',
    'arquivo': '6.html',
    'identificador': '5'
});
items.push({
    'titulo': '',
    'nome': 'Aula 7',
    'arquivo': '7.html',
    'identificador': '6'
});
items.push({
    'titulo': '',
    'nome': 'Aula 8',
    'arquivo': '8.html',
    'identificador': '7'
});


items.push({
    'titulo': '', 'nome': 'Aula 9', 'arquivo': '9.html', 'identificador': '8'
});
items.push({
    'titulo': '', 'nome': 'Aula 10', 'arquivo': '10.html', 'identificador': '9'
});
items.push({
    'titulo': 'ASPECTOS EPIDEMIOLÓGICOS, DEMOGRÁFICOS E SOCIAIS RELACIONADOS ÀS FERIDAS NO SUS', 'nome': 'Aula 11', 'arquivo': '11.html', 'identificador': '10'
});
items.push({
    'titulo': '', 'nome': 'Aula 12', 'arquivo': '12.html', 'identificador': '11'
});
items.push({
    'titulo': 'CONSIDERAÇÕES FINAIS', 'nome': 'Aula 13', 'arquivo': '13.html', 'identificador': '12'
});
items.push({
    'titulo': '', 'nome': 'Aula 14', 'arquivo': '14.html', 'identificador': '13'
});
items.push({
    'titulo': 'REFERÊNCIAS', 'nome': 'Aula 15', 'arquivo': '15.html', 'identificador': '14'
});
items.push({
    'titulo': '', 'nome': 'Aula 16', 'arquivo': '16.html', 'identificador': '15'
});



items.push({
    'titulo': 'FICHA TÉCNICA', 'nome': 'Credito', 'arquivo': 'credito1.html', 'identificador': 'c1'
});
items.push({
    'titulo': '', 'nome': 'Credito', 'arquivo': 'credito2.html', 'identificador': 'c2'
});





//Variáveis para progresso
var totalitems = items.length;
var totalconcluido = conclusao.length;
var progressoatual = (totalconcluido == 0) ? 0 : (totalitems / totalconcluido);

var aulaAtual = 0;