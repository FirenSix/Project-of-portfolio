// CONTATO
document.querySelector(".btn-contato").onclick = () => {
  document.getElementById("contatoModal").style.display = "block";
};

// LOGIN ABRIR
document.getElementById("adminBtn").onclick = () => {
  document.getElementById("loginModal").style.display = "block";
};

// LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: senha
  });

  if (error) return alert("Erro login");

  document.getElementById("loginModal").style.display = "none";
  document.getElementById("adminPanel").style.display = "block";
}

// MOSTRAR FORM
function mostrarForm() {
  document.getElementById("formProjeto").style.display = "block";
}

// UPLOAD
async function publicarProjeto() {
  const nome = document.getElementById("projNome").value;
  const desc = document.getElementById("projDesc").value;
  const files = document.getElementById("fotos").files;

  let urls = [];

  for (let file of files) {
    const nomeArq = Date.now() + file.name;

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
