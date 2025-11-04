import { Navbar } from "./components/Navbar"
import { DestaqueNotes } from "./components/DestaqueNotes"
import { NovasNotes } from "./components/NovasNotes"
import { Rodape } from "./components/Rodape"
import { InicioSite } from "./components/InicioSite"

export default function page() {
  return (
    <div className="min-h-screen bg-card">
      <Navbar />
      <main>
        <InicioSite />
        <DestaqueNotes />
        <NovasNotes />
      </main>
      <Rodape />
    </div>
  )
}
