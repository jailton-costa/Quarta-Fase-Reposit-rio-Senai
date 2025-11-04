export function InicioSite() {
    return (
        <section className="relative py-20 md:py-32 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <h1 className="text-5xl md:text-7xl font-light tracking-tight text-balance">
                        Cada xícara diz
                        <span className="block font-semibold italic text-primary">uma história </span>
                    </h1>

                    <p className="text-3xl text-muted-foreground leading-relaxed mx-auto text-pretty">
                        Explorando a arte, a ciência e a cultura por trás do café especial. Do grão à xícara, descubra as notas que
                        tornam cada xícara extraordinária.
                    </p>

                    <div className="pt-4">
                        <a
                            href="#featured"
                            className="inline-flex items-center gap-2 text-3xl text-primary hover:text-primary/80 transition-colors"
                        >
                            Comece a ler
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 -z-10 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
            </div>
        </section>
    )
}
