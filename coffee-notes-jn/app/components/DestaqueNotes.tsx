import { Clock, ArrowRight } from "lucide-react" //npm install lucide-react

const posts = [
  {
    title: "A Arte do Pour Over",
    excerpt:
      "Dominando o delicado equilíbrio entre temperatura da água, moagem e técnica de despejo para extrair a xícara perfeita.",
    category: "Guia de Preparo",
    readTime: "8 min de leitura",
    image: "/cafeFeito.jpg",
  },
  {
    title: "As Origens do Café Etíope",
    excerpt:
      "Viaje até o berço do café e descubra a rica herança da cultura cafeeira etíope e seus perfis de sabor únicos.",
    category: "Histórias de Origem",
    readTime: "12 min de leitura",
    image: "/graoCafe.jpg",
  },
  {
    title: "Entendendo as Notas de Sabor",
    excerpt:
      "Aprenda a identificar e apreciar os sabores complexos do seu café — de frutado e floral a achocolatado e amendoado.",
    category: "Educação",
    readTime: "6 min de leitura",
    image: "/notasCafe.jpg",
  },
]

export function DestaqueNotes() {
  return (
    <section id="featured" className="py-20 md:py-32">
      <div className="container mx-auto px-4 ">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-4xl font-light tracking-tight mb-2">Artigos em destaque</h2>
            <p className="text-muted-foreground text-3xl">Histórias selecionadas para entusiastas do café.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 bg-ring-0">
          {posts.map((post, index) => (
            <div
              key={index}
              className="group overflow-hidden border-2 rounded-2xl hover:border-primary/40 transition-all duration-300"
            >
              <div className="aspect-3/2 overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-2xl text-muted-foreground">
                  <span className="text-primary font-medium text-2xl">{post.category}</span>
                  <span className="text-2xl">•</span>
                  <span className="flex items-center text-2xl gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-4xl font-semibold leading-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                <p className="text-muted-foreground text-2xl leading-relaxed">{post.excerpt}</p>

                <a href="#" className="flex justify-center items-center gap-2 text-2xl text-primary hover:gap-4 transition-all">
                  Leia mais
                  <ArrowRight className="h-6 w-6" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}