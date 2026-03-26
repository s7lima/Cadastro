//Quando a minha tela carregar o conteúdo
document.addEventListener("DOMContentLoaded", function () {

    if (!verificarLogado()) {
        window.location.href = "login.html"
    }

    // inicia na tela de cadastro (sem carregar tabela)
    onCadastrarClick();

    // ❌ REMOVIDO: carregarTabela();

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            fecharPerfil();
        }
    });

    const perfil = document.getElementById("perfil");
    document.addEventListener("mousedown", function (e) {
        if (!perfil || !perfil.contains(e.target)) {
            fecharPerfil();
        }
    });
});

function voltar() {
    window.location.href = "login.html";
    logout();
}

// 👉 BOTÃO LISTAR (AGORA CARREGA A TABELA)
function onListarClick() {
    const element = document.getElementById("btn-listar");
    element.classList.remove("btn-aba");
    element.classList.add("btn-aba-selecionado");

    document.getElementById("btn-cadastrar").classList.add("btn-aba");
    document.getElementById("btn-cadastrar").classList.remove("btn-aba-selecionado");

    const listaCadastrados = document.getElementById("container-lista");
    listaCadastrados.style.display = "flex";

    const containerCadastro = document.getElementById("container-cadastro");
    containerCadastro.style.display = "none";

    // ✅ Só carrega aqui
    carregarTabela();
}

// 👉 BOTÃO CADASTRAR
function onCadastrarClick() {
    const element = document.getElementById("btn-cadastrar");
    element.classList.remove("btn-aba");
    element.classList.add("btn-aba-selecionado");

    document.getElementById("btn-listar").classList.add("btn-aba");
    document.getElementById("btn-listar").classList.remove("btn-aba-selecionado");

    const listaCadastrados = document.getElementById("container-lista");
    listaCadastrados.style.display = "none";

    const containerCadastro = document.getElementById("container-cadastro");
    containerCadastro.style.display = "flex";
}

// 👉 CADASTRAR ATLETA
function cadastrarAtleta(event) {
    event.preventDefault();

    let atleta = {
        nome: getElementValue("input-nome-atleta"),
        nacionalidade: getElementValue("input-nacionalidade"),
        dtNascimento: getElementValue("input-dtNascimento"),
        cpf: getElementValue("input-cpf"),
        modalidade: getElementValue("input-modalidade"),
        genero: getElementValue("input-genero"),
        categoria: getElementValue("input-categoria"),
        peso: getElementValue("input-peso"),
        altura: getElementValue("input-altura"),
        tipoSanguineo: getElementValue("input-tipoSanguineo"),
        alergias: getElementValue("input-alergias"),
        historico: getElementValue("input-historico")
    };

    let atletas = JSON.parse(localStorage.getItem("atletas")) || [];

    atletas.push(atleta);

    localStorage.setItem("atletas", JSON.stringify(atletas));

    setElementText("mensagem", "Dados do " + atleta.nome + " cadastrados!");
    setElementDisplay("overlay", "flex");

    resetFormCadastroAtleta();
}

// 👉 LIMPAR FORMULÁRIO
function resetFormCadastroAtleta() {
    document.getElementById("container-cadastro").reset();
}

// 👉 PERFIL
function abrirPerfil() {
    let menu = document.getElementById("perfil");
    if (menu.style.display != "flex")
        setElementDisplay("perfil", "flex");
}

function fecharPerfil() {
    setElementDisplay("perfil", "none");
}

// 👉 CARREGAR TABELA (SÓ QUANDO CHAMADO)
function carregarTabela() {
    let atletas = JSON.parse(localStorage.getItem("atletas")) || [];

    let body = document.getElementById("tabela-atletas-body");

    if (atletas.length === 0) {
        body.innerHTML = "<tr><td colspan='12'>Nenhum Atleta Encontrado.</td></tr>";
    } else {
        body.innerHTML = atletas.map(function (atleta) {
            return `
                <tr>
                    <td>${atleta.nome}</td>
                    <td>${atleta.nacionalidade}</td>
                    <td>${atleta.dtNascimento}</td>
                    <td>${atleta.cpf}</td>
                    <td>${atleta.modalidade}</td>
                    <td>${atleta.genero}</td>
                    <td>${atleta.categoria}</td>
                    <td>${atleta.peso}</td>
                    <td>${atleta.altura}</td>
                    <td>${atleta.tipoSanguineo}</td>
                    <td>${atleta.alergias}</td>
                    <td>${atleta.historico}</td>
                </tr>
            `;
        }).join("");
    }
}