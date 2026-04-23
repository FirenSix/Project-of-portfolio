// CONTATO
document.querySelector(".btn-contato").onclick = () => {
  document.getElementById("contatoModal").style.display = "block";
};

// LOGIN
document.getElementById("adminBtn").onclick = () => {
  document.getElementById("loginModal").style.display = "block";
};

function fecharModal(id) {
  document.getElementById(id).style.display = "none";
}

// GALERIA BOTÃO
document.getElementById("abrirGaleria").onclick = carregarGaleria;

// LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const { error } = await supabaseClient.auth.signInWithPassword({
    email,
    password: senha
  });

  if (error) return alert(error.message);

  fecharModal("loginModal");
  document.getElementById("adminPanel").style.display = "block";
  carregarAdmin();
}

// PUBLICAR
async function publicarProjeto() {
  const nome = document.getElementById("projNome").value;
  const desc = document.getElementById("projDesc").value;
  const files = document.getElementById("fotos").files;

  let urls = [];

  for (let file of files) {
    const nomeArq = Date.now() + file.name;
    await supabaseClient.storage.from("imagens").upload(nomeArq, file);
    const { data } = supabaseClient.storage.from("imagens").getPublicUrl(nomeArq);
    urls.push(data.publicUrl);
  }

  await supabaseClient.from("projetos").insert({
    nome,
    descricao: desc,
    capa_url: urls[0],
    imagens: urls
  });

  alert("Projeto publicado!");
  carregarAdmin();
}

// GALERIA
async function carregarGaleria() {
  document.getElementById("galeriaModal").style.display = "block";

  const { data } = await supabaseClient.from("projetos").select("*");

  const container = document.getElementById("listaProjetos");
  container.innerHTML = "";

  data.forEach(p => {
    const div = document.createElement("div");
    div.className = "card-projeto";

    div.innerHTML = `
      <img src="${p.capa_url}">
      <span>${p.nome}</span>
    `;

    container.appendChild(div);
  });
}

// ADMIN
async function carregarAdmin() {
  const { data } = await supabaseClient.from("projetos").select("*");

  const lista = document.getElementById("listaAdmin");
  lista.innerHTML = "";

  data.forEach(p => {
    const div = document.createElement("div");

    div.innerHTML = `
      <b>${p.nome}</b>
      <button onclick="editarProjeto('${p.id}')">Editar</button>
      <button onclick="deletarProjeto('${p.id}')">Excluir</button>
    `;

    lista.appendChild(div);
  });
}

// EDITAR
async function editarProjeto(id) {
  const novoNome = prompt("Novo nome:");
  if (!novoNome) return;

  await supabaseClient.from("projetos").update({ nome: novoNome }).eq("id", id);
  carregarAdmin();
}

// DELETAR
async function deletarProjeto(id) {
  if (!confirm("Excluir?")) return;

  await supabaseClient.from("projetos").delete().eq("id", id);
  carregarAdmin();
}
