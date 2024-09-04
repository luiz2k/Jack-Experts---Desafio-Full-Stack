import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Componente que será exibido sempre que acessar uma rota que não existe
export function NotFound() {
	return (
		<section className="h-screen flex items-center justify-center flex-col gap-5">
			<h1 className="text-3xl flex flex-col text-center font-semibold">
				<span className="text-4xl uppercase">Ops!</span>
				<span className="text-2xl">Página não encontrada</span>
			</h1>

			<Button asChild>
				<Link to="/" className="uppercase">
					Voltar ao Início
				</Link>
			</Button>
		</section>
	);
}
