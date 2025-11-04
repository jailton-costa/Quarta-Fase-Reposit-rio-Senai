
export function NovasNotes() {
  return (
    <section className="py-20 md:py-32 bg-card border-y border-border/40">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-light tracking-tight">Fique por dentro</h2>

          <p className="text-muted-foreground text-2xl leading-relaxed">
            Receba semanalmente informações sobre café, dicas de preparo e histórias diretamente na sua caixa de entrada. Junte-se à nossa comunidade de amantes de café.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
            <input type="email" placeholder="SeuEmail@email.com" className="flex-1 text-center bg-background " />
            <button type="submit" className="text-xl bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
              Inscrever-se
            </button>
          </form>

          <p className="text-xl text-muted-foreground">Sem spam, cancele a inscrição quando quiser. Respeitamos a sua privacidade.</p>
        </div>
      </div>
    </section>
  )
}
