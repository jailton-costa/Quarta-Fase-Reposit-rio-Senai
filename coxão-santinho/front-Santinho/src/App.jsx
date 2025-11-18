// App.jsx — SPA mínima (React + axios)
// Entregas: 4 (login), 5 (principal), 6 (cadastro produto), 7 (gestão de estoque)

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./App.css";

const API = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 8000,
});


const notEmpty = (v) => String(v ?? "").trim().length > 0;
const toInt = (v, def = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : def;
};

export default function App() {

  const [view, setView] = useState("login");
  const [user, setUser] = useState(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginSenha, setLoginSenha] = useState("");

  const doLogin = async (e) => {
    e?.preventDefault();
    if (!notEmpty(loginEmail) || !notEmpty(loginSenha)) {
      return alert("Informe email e senha.");
    }
    try {
      const { data } = await API.post("/auth/login", {
        email: loginEmail.trim(),
        senha: loginSenha,
      });
      setUser(data);
      setView("home");
      setLoginEmail("");
      setLoginSenha("");
    } catch (err) {
      alert(err?.response?.data?.error || "Falha no login");
    }
  };

  const logout = () => {
    setUser(null);
    setView("login");
  };

  const [produtos, setProdutos] = useState([]);
  const [loadingProdutos, setLoadingProdutos] = useState(false);
  const [q, setQ] = useState("");

  // Formulário do produto
  const emptyProduto = { id: null, nome: "", quantidade: 0, estoque_minimo: 0 };
  const [produtoForm, setProdutoForm] = useState(emptyProduto);
  const [editandoId, setEditandoId] = useState(null);

  const carregarProdutos = async (term = q) => {
    setLoadingProdutos(true);
    try {
      const url = notEmpty(term)
        ? `/produtos?q=${encodeURIComponent(term)}`
        : "/produtos";

      const { data } = await API.get(url);
      setProdutos(Array.isArray(data) ? data : []);
    } catch {
      alert("Erro ao carregar produtos");
    } finally {
      setLoadingProdutos(false);
    }
  };

  useEffect(() => {
    if (["produtos", "estoque"].includes(view)) carregarProdutos();
  }, [view]);

  // Ordenação alfabética (7.1.1)
  const produtosOrdenados = useMemo(
    () =>
      [...produtos].sort((a, b) =>
        a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" })
      ),
    [produtos]
  );

  const validarProdutoForm = () => {
    const { nome, quantidade, estoque_minimo } = produtoForm;
    if (!notEmpty(nome)) return "Informe o nome.";
    if (toInt(quantidade) < 0) return "Quantidade inválida.";
    if (toInt(estoque_minimo) < 0) return "Estoque mínimo inválido.";
    return null;
  };

  const limparForm = () => {
    setProdutoForm(emptyProduto);
    setEditandoId(null);
  };

  const criarProduto = async () => {
    const msg = validarProdutoForm();
    if (msg) return alert(msg);

    try {
      await API.post("/produtos", {
        nome: produtoForm.nome.trim(),
        quantidade: toInt(produtoForm.quantidade),
        estoque_minimo: toInt(produtoForm.estoque_minimo),
      });
      await carregarProdutos();
      limparForm();
    } catch (e) {
      alert(e?.response?.data?.error || "Erro ao criar produto");
    }
  };

  const iniciarEdicao = (p) => {
    setEditandoId(p.id);
    setProdutoForm(p);
  };

  const salvarProduto = async () => {
    if (!editandoId) return;

    const msg = validarProdutoForm();
    if (msg) return alert(msg);

    try {
      await API.put(`/produtos/${editandoId}`, {
        nome: produtoForm.nome.trim(),
        quantidade: toInt(produtoForm.quantidade),
        estoque_minimo: toInt(produtoForm.estoque_minimo),
      });
      await carregarProdutos();
      limparForm();
    } catch (e) {
      alert(e?.response?.data?.error || "Erro ao salvar produto");
    }
  };

  const excluirProduto = async (id) => {
    if (!confirm("Excluir este produto?")) return;

    try {
      await API.delete(`/produtos/${id}`);
      await carregarProdutos();
    } catch (e) {
      alert("Erro ao excluir produto");
    }
  };

  const buscar = (e) => {
    e.preventDefault();
    carregarProdutos(q);
  };

  const [movProdutoId, setMovProdutoId] = useState("");
  const [movTipo, setMovTipo] = useState("entrada");
  const [movQuantidade, setMovQuantidade] = useState("");
  const [movData, setMovData] = useState("");
  const [movObs, setMovObs] = useState("");

  const enviarMovimentacao = async () => {
    if (!user) return alert("Faça login.");
    if (!movProdutoId) return alert("Selecione um produto.");
    if (toInt(movQuantidade) <= 0) return alert("Quantidade inválida.");

    try {
      const payload = {
        produto_id: Number(movProdutoId),
        usuario_id: user.id,
        tipo: movTipo,
        quantidade: toInt(movQuantidade),
        data_movimentacao: notEmpty(movData)
          ? new Date(movData).toISOString()
          : null,
        observacao: notEmpty(movObs) ? movObs.trim() : null,
      };

      const { data } = await API.post("/movimentacoes", payload);

      alert("Movimentação registrada!");

      if (data?.produto?.abaixo_do_minimo) {
        alert("⚠️ Estoque abaixo do mínimo!");
      }

      await carregarProdutos();

      // Reset parcial
      setMovQuantidade("");
      setMovObs("");
    } catch (e) {
      alert("Erro ao registrar movimentação");
    }
  };

  return (
    <div className="app-container">
      <header className="d1">
        <div className="h1inicio">
          <img src="/public/coxaoSantinho.png" className="imgPri" />
          <h1>COXÃO DO SANTINHO - CROSSFIT E GALETERIA</h1>
          <img src="/public/coxaoSantinho.png" className="imgPri" />
        </div>
        <h2>
          Treinos funcionais intensos + galeto suculento = empreendimento do
          Coxão do Santinho.
        </h2>
      </header>

      {/* LOGIN */}
      {view === "login" && (
        <section className="form">
          <h2>Login</h2>

          <div className="input-container">
            <label>Email</label>
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="ana@example.com"
            />
          </div>

          <div className="input-container">
            <label>Senha</label>
            <input
              type="password"
              value={loginSenha}
              onChange={(e) => setLoginSenha(e.target.value)}
              placeholder="•••••••"
            />
          </div>

          <button onClick={doLogin}>Entrar</button>
        </section>
      )}

      {/* HOME */}
      {view === "home" && (
        <section className="form">
          <h2 className="h1inicio">Olá,
            <img src="/public/coxao.png" className="img2" />
           <h2 className="h2user">{user?.nome}</h2>
            <img src="/public/coxao.png" className="img2" />
          </h2>
          <nav style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setView("produtos")}>
              Cadastro de Produtos
            </button>
            <button onClick={() => setView("estoque")}>
              Gestão de Estoque
            </button>
            <button onClick={logout}>Sair</button>
          </nav>
        </section>
      )}

      {/* PRODUTOS */}
      {view === "produtos" && (
        <section className="form">
          <h2 className="h1inicio">
            <img src="/public/logo.png" className="img2" />
            Cadastro de Produto
            <img src="/public/logo.png" className="img2" />
          </h2>

          {/* BUSCA */}
          <form onSubmit={buscar} style={{ display: "flex", gap: 8 }}>
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button type="submit">Buscar</button>
            <button
              type="button"
              onClick={() => {
                setQ("");
                carregarProdutos("");
              }}
            >
              Limpar
            </button>
          </form>
          <div className="flex1">
            {/* FORM PRODUTO */}
            <div style={{ display: "grid", gap: 8 }}>
              <div className="input-container">
                <label>Nome</label>
                <input
                  type="text"
                  value={produtoForm.nome}
                  onChange={(e) =>
                    setProdutoForm((s) => ({ ...s, nome: e.target.value }))
                  }
                />
              </div>

              <div className="input-container">
                <label>Quantidade</label>
                <input
                  type="number"
                  min={0}
                  value={produtoForm.quantidade}
                  onChange={(e) =>
                    setProdutoForm((s) => ({ ...s, quantidade: e.target.value }))
                  }
                />
              </div>

              <div className="input-container">
                <label>Estoque mínimo</label>
                <input
                  type="number"
                  min={0}
                  value={produtoForm.estoque_minimo}
                  onChange={(e) =>
                    setProdutoForm((s) => ({
                      ...s,
                      estoque_minimo: e.target.value,
                    }))
                  }
                />
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                {editandoId ? (
                  <>
                    <button onClick={salvarProduto}>Salvar</button>
                    <button onClick={limparForm}>Cancelar</button>
                  </>
                ) : (
                  <button onClick={criarProduto}>Cadastrar</button>
                )}

              </div>
            </div>

            {/* LISTAGEM */}
            {!loadingProdutos ? (
              <table className="tabela">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Qtd</th>
                    <th>Mín</th>
                    <th>Alerta</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {produtosOrdenados.length > 0 ? (
                    produtosOrdenados.map((p) => (
                      <tr key={p.id}>
                        <td>{p.nome}</td>
                        <td>{p.quantidade}</td>
                        <td>{p.estoque_minimo}</td>
                        <td>
                          {p.quantidade < p.estoque_minimo ? "⚠️" : "—"}
                        </td>

                        <td style={{ display: "flex", gap: 6 }}>
                          <button onClick={() => iniciarEdicao(p)}>Editar</button>
                          <button onClick={() => excluirProduto(p.id)}>
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5}>Nenhum produto encontrado.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <p>Carregando...</p>
            )}
          </div>
          <button onClick={() => setView("home")}>Voltar</button>

        </section>
      )}

      {/* ESTOQUE */}
      {view === "estoque" && (
        <section className="form">
          <h2 className="h1inicio">
            <img src="/public/logo.png" className="img2" />
            
            Gestão de Estoque
            <img src="/public/logo.png" className="img2" />
            
            </h2>

          <h3>Produtos</h3>
          <ul className="lista-produtos">
            {produtosOrdenados.map((p) => (
              <li key={p.id}>
                <span>{p.nome}</span>
                <span>Qtd: {p.quantidade}</span>
                <span>Mín: {p.estoque_minimo}</span>
                <span>
                  {p.quantidade < p.estoque_minimo ? "⚠️ Baixo" : ""}
                </span>
              </li>
            ))}
          </ul>

          {/* MOVIMENTAÇÃO */}
          <h3>Registrar movimentação</h3>
          <div className="flex1">
            <div className="input-container">
              <label>Produto</label>
              <select
                value={movProdutoId}
                onChange={(e) => setMovProdutoId(e.target.value)}
              >
                <option value="">Selecione...</option>
                {produtosOrdenados.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-container">
              <label>Tipo</label>
              <div style={{ display: "flex", gap: 10 }}>
                <label>
                  <input
                    type="radio"
                    value="entrada"
                    checked={movTipo === "entrada"}
                    onChange={() => setMovTipo("entrada")}
                  />
                  Entrada
                </label>
                <label>
                  <input
                    type="radio"
                    value="saida"
                    checked={movTipo === "saida"}
                    onChange={() => setMovTipo("saida")}
                  />
                  Saída
                </label>
              </div>
            </div>

            <div className="input-container">
              <label>Quantidade</label>
              <input
                type="number"
                min={1}
                value={movQuantidade}
                onChange={(e) => setMovQuantidade(e.target.value)}
                placeholder="6"
              />
            </div>

            <div className="input-container">
              <label>Data</label>
              <input
                type="date"
                value={movData}
                onChange={(e) => setMovData(e.target.value)}
              />
            </div>

            <div className="input-container">
              <label>Observação (opcional)</label>
              <input
                type="text"
                value={movObs}
                onChange={(e) => setMovObs(e.target.value)}
                placeholder="ex.: retirada para feira"
              />
            </div>
          </div>


          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={enviarMovimentacao}>Registrar</button>
            <button onClick={() => setView("home")}>Voltar</button>
          </div>
        </section>
      )}
    </div>
  );
}
