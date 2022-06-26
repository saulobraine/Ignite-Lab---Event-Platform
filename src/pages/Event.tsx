import { useParams } from "react-router-dom";

import { Header } from "../components/Header";
import { Logo } from "../components/Logo";
import { Sidebar } from "../components/Sidebar";
import { Video } from "../components/Video";

export function Event() {

  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        {slug
          ? <Video lessonSlug={slug} />
          : <div className="flex flex-1 flex-col items-center justify-center gap-10">
            <h1 className="font-medium text-2xl pb-6 mb-6 border-b border-gray-500">Bem vindo ao <Logo /></h1>
            <p className="text-gray-200 text-small">Selecione uma aula e inicie sua jornada.</p>
          </div>
        }
        <Sidebar className="hidden lg:block" />
      </main>
    </div>
  )
}