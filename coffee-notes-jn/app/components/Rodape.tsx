import { Coffee } from "lucide-react"

export function Rodape() {
  return (
    <footer className="border-t-muted-foreground  border-border/40 py-12 flex justify-center items-center hove:border-2-foreground transition transform border rounded-2xl bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-20 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Coffee className="h-5 w-5 text-primary" />
              <span className="font-semibold">Coffee Notes</span>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explorando o mundo do café especial, uma xícara de cada vez.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-2xl">Contente</h3>
            <ul className="space-y-2 text-lg text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Artigos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Guias de fabricação de cerveja
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Avaliações
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Receitas
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-2xl">Sobre</h3>
            <ul className="space-y-2 text-lg text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Nossa história
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Equipe
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Conectar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Anunciar
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-2xl">Conectar</h3>
            <ul className="space-y-2 text-lg text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  YouTube
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Newsletter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/40 flex flex-col 2xl:flex-row justify-between items-center gap-4 text-lg text-muted-foreground">
          <p>© 2025 Coffee Notes. Todos os direitos reservados.</p>
          <div className="flex gap-6 text-lg">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacidade
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Termos
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
