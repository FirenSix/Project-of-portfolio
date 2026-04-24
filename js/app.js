// modais
function abrirModal(id) {
  document.getElementById(id).style.display = "flex";
}

function fecharModal(id) {
  document.getElementById(id).style.display = "none";
}

document.querySelector(".btn-contato").onclick = () => {
  abrirModal("contatoModal");
};

document.getElementById("adminBtn").onclick = () => {
  abrirModal("loginModal");
};

window.onclick = function (e) {
  document.querySelectorAll(".modal").forEach(modal => {
    if (e.target === modal) modal.style.display = "none";
  });
};

// mural (linhas animadas com imagens)
async function carregarMural() {
  const linhas = document.querySelectorAll(".linha");
  linhas.forEach(l => l.innerHTML = "");

  let imagens = [];

  try {
    const { data } = await supabaseClient.from("projetos").select("*");

    if (data && data.length > 0) {
      data.forEach(p => {
        if (Array.isArray(p.imagens)) {
          p.imagens.forEach(img => {
            if (img?.startsWith("http")) {
              imagens.push(img);
            }
          });
        }
      });
    }
  } catch (e) {
    console.log("Erro supabase:", e);
  }

  // fallback caso não tenha imagens
  if (imagens.length === 0) {
    for (let i = 1; i <= 18; i++) {
      imagens.push(`assets/images/teste/img${i}.png`);
    }
  }

  linhas.forEach((linha, index) => {
    const base = index % 2 === 0 ? imagens : [...imagens].reverse();
    const final = [...base, ...base];

    final.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      linha.appendChild(img);
    });
  });
}

carregarMural();

// galeria de projetos
document.getElementById("abrirGaleria").onclick = carregarGaleria;

async function carregarGaleria() {
  abrirModal("galeriaModal");

  const container = document.getElementById("listaProjetos");
  container.innerHTML = "";

  const { data } = await supabaseClient.from("projetos").select("*");

  if (!data || data.length === 0) {
    container.innerHTML = "<p>Nenhum projeto ainda</p>";
    return;
  }

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

// login do admin
async function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const { error } = await supabaseClient.auth.signInWithPassword({
    email,
    password: senha
  });

  if (error) {
    alert(error.message);
    return;
  }

  fecharModal("loginModal");
  abrirModal("adminPanel");

  carregarAdmin();
}

// abrir formulário de projeto
function mostrarForm() {
  document.getElementById("formProjeto").style.display = "block";
}

// publicar projeto novo
async function publicarProjeto() {
  try {
    const nome = document.getElementById("projNome").value;
    const desc = document.getElementById("projDesc").value;
    const files = document.getElementById("fotos").files;

    if (!nome || files.length === 0) {
      alert("Preenche tudo primeiro");
      return;
    }

    let urls = [];

    for (let file of files) {
      const nomeArq = Date.now() + "-" + file.name;

      const { error: uploadError } = await supabaseClient
        .storage
        .from("images")
        .upload(nomeArq, file);

      if (uploadError) throw uploadError;

      const { data } = supabaseClient
        .storage
        .from("images")
        .getPublicUrl(nomeArq);

      urls.push(data.publicUrl);
    }

    const { error } = await supabaseClient
      .from("projetos")
      .insert({
        nome,
        descricao: desc,
        capa_url: urls[0],
        imagens: urls
      });

    if (error) throw error;

    alert("Projeto publicado!");

    carregarMural();
    carregarAdmin();

  } catch (err) {
    console.error(err);
    alert("Erro: " + err.message);
  }
}

// painel admin (listar projetos)
async function carregarAdmin() {
  const lista = document.getElementById("listaAdmin");
  lista.innerHTML = "";

  const { data } = await supabaseClient.from("projetos").select("*");

  if (!data) return;

  data.forEach(p => {
    const div = document.createElement("div");

    div.innerHTML = `
      <b>${p.nome}</b><br>
      <button onclick="editarProjeto('${p.id}')">Editar</button>
      <button onclick="deletarProjeto('${p.id}')">Excluir</button>
      <hr>
    `;

    lista.appendChild(div);
  });
}

// editar nome do projeto
async function editarProjeto(id) {
  const novoNome = prompt("Novo nome:");
  if (!novoNome) return;

  await supabaseClient
    .from("projetos")
    .update({ nome: novoNome })
    .eq("id", id);

  carregarAdmin();
}

// excluir projeto
async function deletarProjeto(id) {
  if (!confirm("Excluir projeto?")) return;

  await supabaseClient
    .from("projetos")
    .delete()
    .eq("id", id);

  carregarAdmin();
  carregarMural();
}
