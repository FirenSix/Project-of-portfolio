// BOTÃO ABRIR GALERIA
document.getElementById("abrirGaleria").onclick = () => {
  document.getElementById("galeriaModal").style.display = "block";
};

// LISTA DE IMAGENS (img1.png até img5.png)
const imagens = [];

for (let i = 1; i <= 5; i++) {
  imagens.push(`assets/images/teste/img${i}.png`);
}

// PEGAR LINHAS DA GALERIA
const linhas = document.querySelectorAll(".linha");

// CRIAR EFEITO DE LOOP SUAVE
linhas.forEach((linha, index) => {

  // alterna direção (pra ficar mais bonito)
  const lista = index % 2 === 0 ? imagens : [...imagens].reverse();

  // duplicar imagens (pra não ficar vazio no loop)
  for (let i = 0; i < 2; i++) {
    lista.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      linha.appendChild(img);
    });
  }

});

// PROJETOS FAKE (pra modal)
const projetos = [
  {
    nome: "Projeto 1",
    capa: "assets/images/teste/img1.png",
    desc: "Descrição do projeto 1"
  },
  {
    nome: "Projeto 2",
    capa: "assets/images/teste/img2.png",
    desc: "Descrição do projeto 2"
  }
];

// LISTAR PROJETOS
const listaProjetos = document.getElementById("listaProjetos");

projetos.forEach(p => {
  listaProjetos.innerHTML += `
    <div class="card" onclick="alert('${p.desc}')">
      <img src="${p.capa}">
      <h4>${p.nome}</h4>
    </div>
  `;
});
