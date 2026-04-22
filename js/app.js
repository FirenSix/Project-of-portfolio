// ABRIR GALERIA
document.getElementById("abrirGaleria").onclick = () => {
  document.getElementById("galeriaModal").style.display = "block";
};

// IMAGENS (img1.png até img5.png)
const imagens = [];

for (let i = 1; i <= 5; i++) {
  imagens.push(`assets/images/teste/img${i}.png`);
}

// PEGAR LINHAS
const linhas = document.querySelectorAll(".linha");

// LOOP INFINITO REAL
linhas.forEach((linha, index) => {

  const listaBase = index % 2 === 0 ? imagens : [...imagens].reverse();

  // DUPLICA PRA LOOP PERFEITO
  const listaFinal = [...listaBase, ...listaBase];

  listaFinal.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    linha.appendChild(img);
  });

});

// PROJETOS FAKE
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
