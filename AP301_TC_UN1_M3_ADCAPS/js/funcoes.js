/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var visitadas = [];

function getSearchParams(k) {
    var p = {};
    location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (s, k, v) {
        p[k] = v
    })
    return k ? p[k] : p;
}
function inicializaSistema() {


    // montaMenu();

    atualizaProgresso();
    $('#conteudo').load('slide/capa.html');
    $('#conteudo').css('height', '100vh');
    $('.alteraAula').on("click", function () {
        mudaAula(parseInt($(this).attr('ident')));
        return false;
    });



    $('#btVo').hide();
    $('#btAv').hide();
    $('.navbar ').hide();
    $('#progresso').hide();
    $('.timeline').hide();
    $('[data-toggle="tooltip"]').tooltip();

    //Verifica URL Página
    var pagina = getSearchParams("pagina");
    if (pagina) {
        mudaAula(pagina);
        $('#btInicio').hide();



    }


}

function iniciaCurso() {
    mudaAula(0);
    aulaAtual = 0;
    $('#btInicio').hide();
    $('#conteudo').css('height', '100vh');
    $('#conteudo').css('height', 'calc(100vh - var(--timeline-height))');
    $('.navbar ').show();
    $('#progresso').show();
    // $('#conteudo').css('height', '95vh');
    $('.timeline').show();
}

function montaMenu() {
    //Prepara Li para Adicionar
    retornoNav = '';
    retornoMenu = '';
    items.forEach(function (item, indice, array) {
        if (item.titulo)
            retornoMenu += '<a href=# class="alteraAula" ident=' + indice + ' >' + item.titulo + '</a>';
        retornoNav += '<i id="aA' + indice + '" class="alteraAula timeline--inner-pin  is-normal" ident=' + indice + ' data-title="' + item.nome + '   " data-toggle="tooltip" data-placement="top" title="Tela ' + (indice + 1) + '"></i>';
    });

    $('#menuAulas').append(retornoMenu);
    $('.timeline--inner').append(retornoNav);

}

function atualizaProgresso() {
    totalitems = items.length;
    totalconcluido = conclusao.length;
    progressoatual = (totalconcluido == 0) ? 0 : Math.round(((aulaAtual + 1) / totalitems) * 100);

    if (progressoatual > 100) {
        progressoatual = 100;
    }

    $('#progressoAtual').html(aulaAtual + 1);
    $('#totalProgresso').html(totalitems);
    $('#progress-bar').css('width', progressoatual + '%');
    // $('#classeProgress').removeClass();
    // $('#classeProgress').addClass('c100 small p' + progressoatual);
    // $('#valorProgresso').html(progressoatual + '%');

}

function mudaAula(aula) {
    if (conclusao.indexOf(aula) == -1) {
        conclusao.push(aula)
    }
    aulaAtual = aula;

    atualizaProgresso();
    $('#conteudo').load('slide/' + items[aula].arquivo + '?v3', function () { $('#dadosAula').html(nomeUnidade + "<br>" + nomeAula + "<b class='desenv'><br>Arq:" + items[aula].arquivo + "</b>"); });
    //Exibe os navegadores

    if (aulaAtual == 0) {
        // $('#btVo').hide();
        $('#btVo').show();
        $('#btVo').css('opacity', '.5');
        $('#btAv').show();
        // } else if (aulaAtual == items[items.length - 1].identificador) {
    } else if (aulaAtual == totalitems - 1) {
        $('#btVo').show();
        // $('#btAv').hide();
        $('#btAv').show();
        $('#btAv').css('opacity', '.5');
    } else {
        $('#btVo').show();
        $('#btVo').css('opacity', '1');
        $('#btAv').css('opacity', '1');
        $('#btAv').show();
    }
    closeNav();

    visitadas[aula] = true;
    for (let i = 0; i < visitadas.length; i++) {
        if (visitadas[i] === undefined) {
            visitadas[i] = false;
        }
    }
    visitadas.map((current, index) => {
        if (current) {
            $('.alteraAula').removeClass('current');
            $('.alteraAula[ident=' + index + ']').addClass('concluido');
        }
    })
    $('.alteraAula[ident=' + aulaAtual + ']').removeClass('concluido');

    $('.alteraAula[ident=' + aulaAtual + ']').addClass('current');

    $('html, body').animate({
        scrollTop: 0
    }, 50);
}

function Navega(opcao) {
    if (opcao == 'volta' && aulaAtual != 0) {
        mudaAula(aulaAtual - 1);
        console.log('voltando');

    } else if (opcao == 'avanca' && aulaAtual != items[items.length - 1].identificador) {
        mudaAula(aulaAtual + 1);
    }

}

//Menu lateral esquerdo
/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("menuAulas").style.width = "250px";

}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("menuAulas").style.width = "0";

}

$(document).keydown(function (e) {
    if (e.which == 37) {
        Navega('volta')
        return false;
    }
    if (e.which == 39) {
        Navega('avanca')
        return false;
    }
});

function imprimir(url) {
    const win = window.open(url, '_blank');

    win.onload = function () {
        win.focus();
        win.print();
    };
}

async function compartilharArquivo(urlArquivo) {
    const url = window.location.origin + urlArquivo;

    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Material do curso',
                text: 'Confira este material:',
                url: url
            });
        } catch (err) {
            console.log('Erro ao compartilhar:', err);
        }
    } else {
        // fallback (copia link)
        navigator.clipboard.writeText(url);
        alert('Link copiado para a área de transferência!');
    }
}