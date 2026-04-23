// CONTATO
document.querySelector(".btn-contato").onclick = () => {
  document.getElementById("contatoModal").style.display = "block";
};

// LOGIN
document.getElementById("adminBtn").onclick = () => {
  document.getElementById("loginModal").style.display = "block";
};

// FECHAR
function fecharModal(id) {
  document.getElementById(id).style.display = "none";
}

window.onclick = function(e) {
  document.querySelectorAll(".modal").forEach(modal => {
    if (e.target === modal) modal.style.display = "none";
  });
};

// GALERIA LOOP
const imagens = [];
for (let i = 1; i <= 5; i++) {
  imagens.push(`assets/images/teste/img${i}.png`);
}

const linhas = document.querySelectorAll(".linha");

linhas.forEach((linha, index) => {
  const base = index % 2 === 0 ? imagens : [...imagens].reverse();
  const final = [...base, ...base];

  final.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    linha.appendChild(img);
  });
});

// BOTÃO GALERIA
document.getElementById("abrirGaleria").onclick = () => {
  alert("Aqui vai abrir os projetos 😏");
};

// LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: senha
  });

  if (error) return alert(error.message);

  document.getElementById("loginModal").style.display = "none";
  document.getElementById("adminPanel").style.display = "block";
}

// FORM
function mostrarForm() {
  document.getElementById("formProjeto").style.display = "block";
}

// PUBLICAR
async function publicarProjeto() {
  const nome = document.getElementById("projNome").value;
  const desc = document.getElementById("projDesc").value;
  const files = document.getElementById("fotos").files;

  let urls = [];

  for (let file of files) {
    const nomeArq = Date.now() + "-" + file.name;

    await supabase.storage.from("imagens").upload(nomeArq, file);

    const { data } = supabase.storage.from("imagens").getPublicUrl(nomeArq);

    urls.push(data.publicUrl);
  }

  await supabase.from("projetos").insert({
    nome,
    descricao: desc,
    capa_url: urls[0]
  });

  alert("Projeto publicado!");
}
