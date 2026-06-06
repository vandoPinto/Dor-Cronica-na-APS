const API_URL = "https://script.google.com/macros/s/AKfycbyDAqkTL_uIKH_yXdIw2nlTTbiGsCyW_WLrhfmc-Hh1YJuT203kdcOYdkgWOXHIYYjx6g/exec";
let hashAtual = "";
let ignorarProximaAtualizacao = false;

let scrollSalvo = 0;
let modulosAbertos = [];

// alert('versao 2.0');

async function carregarDados() {
    salvarEstadoTela();

    const container = document.getElementById("modulos");

    container.innerHTML = `
            <div class="text-center p-5">
                <div class="spinner-border"></div>
            </div>
        `;

    try {

        const response = await fetch(API_URL);
        const registros = await response.json();
        hashAtual = JSON.stringify(registros);
        const itensValidos = registros.filter(
            item => item.id !== "-"
        );

        const totalItens = itensValidos.length;

        const totalFinalizados = itensValidos.filter(
            item => item.finalizado === true
        ).length;

        const totalAjuste = itensValidos.filter(
            item => item.ajuste === true &&
                item.finalizado !== true
        ).length;

        const totalPendentes =
            totalItens -
            totalFinalizados -
            totalAjuste;

        const percentual =
            totalItens > 0
                ? ((totalFinalizados / totalItens) * 100)
                    .toFixed(1)
                : 0;

        document.getElementById("totalItens").textContent =
            totalItens;

        document.getElementById("totalFinalizados").textContent =
            totalFinalizados;

        document.getElementById("totalAjuste").textContent =
            totalAjuste;

        document.getElementById("totalPendentes").textContent =
            totalPendentes;

        document.getElementById("percentualConclusao").textContent =
            percentual + "%";

        document.getElementById("barraConclusao").style.width =
            percentual + "%";

        document.getElementById("barraConclusao").textContent =
            percentual + "%";

        const dados = {};

        registros.forEach(item => {

            if (!dados[item.modulo]) {
                dados[item.modulo] = [];
            }

            dados[item.modulo].push(item);

        });

        container.innerHTML = "";

        Object.keys(dados).forEach(modulo => {

            let linhas = "";

            dados[modulo].forEach(item => {

                linhas += `
                    <tr
                        data-modulo="${item.modulo}"
                        data-id="${item.id}">

                        <td>${item.id}</td>

                        <td>
                            <a href="${item.url}" target="_blank">
                                ${item.link}
                            </a>
                        </td>

                        <td>
                            <input
                                class="form-check-input ajuste"
                                type="checkbox"
                                ${item.ajuste ? "checked" : ""}
                                onchange="atualizarAjuste(
                                    '${item.modulo}',
                                    '${item.id}',
                                    this.checked
                                )">
                        </td>

                        <td>
                            <input
                                class="form-check-input finalizado"
                                type="checkbox"
                                ${item.finalizado ? "checked" : ""}
                                onchange="atualizarFinalizado(
                                    '${item.modulo}',
                                    '${item.id}',
                                    this.checked
                                )">
                        </td>

                        <td>

                            ${item.relatorio
                        ? `
                                <a
                                    href="${item.relatorio}"
                                    target="_blank"
                                    class="btn btn-sm btn-outline-primary"
                                >
                                    <i class="fa-solid fa-file-word"></i>
                                    Abrir Relatório
                                </a>
                                `
                        : "-"
                    }

                        </td>

                      <td>

                   <textarea
                        class="campo-observacao"
                        oninput="salvarObservacao(
                            '${item.modulo}',
                            '${item.id}',
                            this.value,
                            this
                        )"
                    >${item.observacao || ''}</textarea>

                    </td>

                    </tr>
                    `;

            });


            const totalModulo = dados[modulo].filter(
                item => item.id !== "-"
            ).length;

            const finalizadosModulo = dados[modulo].filter(
                item => item.id !== "-" &&
                    item.finalizado === true
            ).length;

            const ajustesModulo = dados[modulo].filter(
                item => item.id !== "-" &&
                    item.ajuste === true &&
                    item.finalizado !== true
            ).length;


            container.innerHTML += `

                <div class="module-card">
                
                    <div class="module-header"
                    onclick="toggleModulo(this)">

                    <span>
                        <i class="fa-solid fa-book"></i>
                        ${modulo}
                    </span>

                   <span class="d-flex align-items-center gap-3 flex-wrap">

                        <span class="badge bg-primary">
                            Itens: ${totalModulo}
                        </span>

                        <span class="badge bg-success">
                            Finalizados: ${finalizadosModulo}/${totalModulo}
                        </span>

                        <span class="badge bg-warning text-dark">
                            Ajustes: ${ajustesModulo}/${totalModulo}
                        </span>

                        <i class="fa-solid fa-chevron-down seta-modulo"></i>

                    </span>

                </div>

                    <div class="table-responsive modulo-conteudo">

                        <table class="table table-hover align-middle mb-0">

                            <thead>

                                <tr>

                                    <th>ID</th>
                                    <th>Link</th>
                                    <th>Ajuste</th>
                                    <th>Finalizado</th>
                                    <th>Relatório</th>
                                    <th>Observações</th>

                                </tr>

                            </thead>

                            <tbody>

                                ${linhas}

                            </tbody>

                        </table>

                    </div>

                </div>

                `;

        });

        restaurarEstadoTela();

    } catch (erro) {

        container.innerHTML = `
                <div class="alert alert-danger">
                    Erro ao carregar os dados.
                </div>
            `;

        console.error(erro);

    }

}

async function atualizarAjuste(
    modulo,
    id,
    valor
) {

    try {

        ignorarProximaAtualizacao = true;

        await fetch(
            `${API_URL}?acao=ajuste` +
            `&modulo=${encodeURIComponent(modulo)}` +
            `&id=${encodeURIComponent(id)}` +
            `&valor=${valor}`
        );

    } catch (erro) {

        console.error(erro);

    }

}

async function atualizarFinalizado(
    modulo,
    id,
    valor
) {

    try {

        ignorarProximaAtualizacao = true;

        await fetch(
            `${API_URL}?acao=finalizado` +
            `&modulo=${encodeURIComponent(modulo)}` +
            `&id=${encodeURIComponent(id)}` +
            `&valor=${valor}`
        );

    } catch (erro) {

        console.error(erro);

    }

}

const timersObservacao = {};

function salvarObservacao(
    modulo,
    id,
    observacao,
    elemento
) {

    const chave = `${modulo}_${id}`;

    elemento.classList.remove("salvo");
    elemento.classList.add("salvando");

    clearTimeout(timersObservacao[chave]);

    timersObservacao[chave] = setTimeout(async () => {

        try {

            ignorarProximaAtualizacao = true;

            await fetch(
                `${API_URL}?acao=observacao` +
                `&modulo=${encodeURIComponent(modulo)}` +
                `&id=${encodeURIComponent(id)}` +
                `&observacao=${encodeURIComponent(observacao)}`
            );

            // carregarDados();

            elemento.classList.remove("salvando");
            elemento.classList.add("salvo");

        } catch (erro) {

            console.error(erro);

            elemento.classList.remove("salvando");

        }

    }, 800);

}

async function verificarAtualizacoes() {

    try {

        const response = await fetch(API_URL);
        const registros = await response.json();

        const novoHash =
            JSON.stringify(registros);

        if (
            hashAtual &&
            novoHash !== hashAtual
        ) {

            if (ignorarProximaAtualizacao) {

                hashAtual = novoHash;
                ignorarProximaAtualizacao = false;
                return;

            }

            document
                .getElementById("toastAtualizacao")
                .style.display = "flex";

        }

    } catch (erro) {

        console.error(erro);

    }

}

function forcarAtualizacao() {

    document
        .getElementById(
            "toastAtualizacao"
        )
        .style.display = "none";

    carregarDados();

}

function toggleModulo(header) {

    const card = header.closest(".module-card");
    const conteudo = card.querySelector(".modulo-conteudo");

    if (card.classList.contains("aberto")) {

        conteudo.style.maxHeight = "0";
        card.classList.remove("aberto");

    } else {

        card.classList.add("aberto");

        conteudo.style.maxHeight =
            conteudo.scrollHeight + "px";

        setTimeout(() => {

            const posicao =
                card.getBoundingClientRect().top +
                window.pageYOffset - 20;

            window.scrollTo({
                top: posicao,
                behavior: "smooth"
            });

        }, 300);

    }

}

function salvarEstadoTela() {

    scrollSalvo = window.scrollY;

    modulosAbertos = [];

    document
        .querySelectorAll(".module-card")
        .forEach((card, indice) => {

            if (card.classList.contains("aberto")) {
                modulosAbertos.push(indice);
            }

        });

}

function restaurarEstadoTela() {

    document
        .querySelectorAll(".module-card")
        .forEach((card, indice) => {

            if (modulosAbertos.includes(indice)) {

                card.classList.add("aberto");

                const conteudo =
                    card.querySelector(".modulo-conteudo");

                conteudo.style.maxHeight =
                    conteudo.scrollHeight + "px";

            }

        });

    setTimeout(() => {

        window.scrollTo({
            top: scrollSalvo
        });

    }, 100);

}

carregarDados();

setInterval(() => {

    verificarAtualizacoes();

}, 10000);