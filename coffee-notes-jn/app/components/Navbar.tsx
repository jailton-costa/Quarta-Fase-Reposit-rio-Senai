import Image from "next/image"

export function Navbar() {
    return (
        <header className="flex justify-center items-center hove:border-2-foreground transition transform border rounded-2xl border-muted-foreground bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
            <div className="container px-7 py-3 flex items-center justify-baseline gap-10 md:gap-35">
                    <Image
                        src="/iconCoffeeNotesOutra.png"
                        alt="Coffee Notes"
                        width={180}
                        height={80}
                        className="h-20 w-auto"
                        priority
                    />

                <nav className="hidden md:flex items-center gap-20">
                    <a href="#" className="text-2xl text-muted-foreground hover:text-foreground transition-colors">
                        Artigos
                    </a>
                    <a href="#" className="text-2xl text-muted-foreground hover:text-foreground transition-colors">
                        Guias de fabricação de cerveja
                    </a>
                    <a href="#" className="text-2xl text-muted-foreground hover:text-foreground transition-colors">
                        Avaliações

                    </a>
                    <a href="#" className="text-2xl text-muted-foreground hover:text-foreground transition-colors">
                        Sobre
                    </a>
                </nav>

            </div>
                <div className="flex gap-10 bg-transparent">
                    <button className="text-2xl md:inline-flex bg-transparent">
                        Inscrever-se
                    </button>
                    <button className="text-2xl md:inline-flex bg-transparent">
                        Conectar-se
                    </button>
                </div>
        </header>
    )
}
