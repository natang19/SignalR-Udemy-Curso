var connection = new signalR.HubConnectionBuilder().withUrl("/PromoHub").build();

connection.start().then(function () {
    console.info("connected!");
}).catch(function (erro) {
    console.error(erro.toString());
});

connection.on("CadastradoSucesso", function () {
    var mensagem = document.getElementById("Mensagem");
    mensagem.innerHTML = "Cadastrado de promoção realizado com sucesso!";
});

connection.on("ReceberPromocao", function (promocao) {
    var containerLoginDiv = document.getElementById("container-login");

    var containerPromoDiv = document.createElement("div");
    containerPromoDiv.setAttribute("class", "container-promo");

    var containerChamadaDiv = document.createElement("div");
    containerChamadaDiv.setAttribute("class", "container-chamada");

    var h1Titulo = document.createElement("h1");
    h1Titulo.innerText = promocao.empresa;

    var p1 = document.createElement("p");
    p1.innerText = promocao.chamada;

    var p2 = document.createElement("p");
    p2.innerText = promocao.regras;

    var containerBotao = document.createElement("div");
    containerBotao.setAttribute("class", "container-botao");

    var link = document.createElement("a");
    link.setAttribute("href", promocao.enderecoUrl);
    link.setAttribute("target", "_blank");
    link.innerText = "Pegar";

    containerChamadaDiv.appendChild(h1Titulo);
    containerChamadaDiv.appendChild(p1);
    containerChamadaDiv.appendChild(p2);

    containerBotao.appendChild(link);

    containerPromoDiv.appendChild(containerChamadaDiv);
    containerPromoDiv.appendChild(containerBotao);

    containerLoginDiv.appendChild(containerPromoDiv);

    console.info(promocao);
});

var btnCadastrar = document.getElementById("BtnCadastrar");

if (btnCadastrar != null) {
    btnCadastrar.addEventListener("click", function () {
        var empresa = document.getElementById("Empresa").value;
        var chamada = document.getElementById("Chamada").value;
        var regras = document.getElementById("Regras").value;
        var enderecoUrl = document.getElementById("EnderecoURL").value;

        var promocao = { Empresa: empresa, Chamada: chamada, Regras: regras, EnderecoURL: enderecoUrl }

        connection.invoke("CadastrarPromocao", promocao).then(function () {
            console.info("Promoção cadastrada com sucesso!");
        }).catch(function (erro) {
            console.error(erro.toString());
        });
    })
}
