// ABRIR GALERIA
document.getElementById("abrirGaleria").onclick = () => {
  document.getElementById("galeriaModal").style.display = "block";
};

// IMAGENS TESTE
const imagens = [
  "assets/images/teste/img1.jpg",
  "assets/images/teste/img2.jpg",
  "assets/images/teste/img3.jpg",
  "assets/images/teste/img4.jpg"
];

const linhas = document.querySelectorAll(".linha");

// DUPLICA PRA FAZER LOOP SUAVE
linhas.forEach((linha, i) => {
  const lista = i % 2 === 0 ? imagens : [...imagens].reverse();

  for (let j = 0; j < 2; j++) {
    lista.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      linha.appendChild(img);
    });
  }
});

// PROJETOS FAKE
const projetos = [
  {
    nome: "Casamento Ana & João",
    capa: "assets/images/teste/img1.jpg",
    desc: "Um casamento inesquecível cheio de emoção."
  },
  {
    nome: "Ensaio Urbano",
    capa: "assets/images/teste/img2.jpg",
    desc: "Fotos urbanas com estilo moderno."
  }
];

const lista = document.getElementById("listaProjetos");

projetos.forEach(p => {
  lista.innerHTML += `
    <div class="card" onclick="alert('${p.desc}')">
      <img src="${p.capa}">
      <h4>${p.nome}</h4>
    </div>
  `;
});