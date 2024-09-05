import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createQueryString } from "@/modules/shared/utils/createQueryString";
import { createUserSchema } from "@/modules/shared/validations/userValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "./services";

import type { z } from "zod";

// Página de registro de usuário
export function SignUpPage() {
	const navigate = useNavigate();

	// State responsável pelo feedback de erro/sucesso
	const [status, setStatus] = useState({
		message: "Preencha os dados abaixo para criar sua conta",
		color: "",
	});

	const form = useForm<z.infer<typeof createUserSchema>>({
		resolver: zodResolver(createUserSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof createUserSchema>) => {
		try {
			await createUser(data);

			const query = createQueryString("status", "created");

			navigate(`/entrar?${query}`);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Ocorreu um erro inesperado.";

			// Define o status de acordo com a resposta do back-end
			setStatus({ message: errorMessage, color: "text-red-500" });
		}
	};

	return (
		<main className="flex items-center justify-center min-h-screen">
			<div className="w-full h-screen sm:h-fit sm:max-w-md p-6 space-y-6 bg-card rounded-lg shadow-lg">
				<div className="text-center">
					<h1 className="text-3xl font-bold">Crie sua conta</h1>
					<p className={`text-muted-foreground ${status.color}`}>
						{status.message}
					</p>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>E-mail</FormLabel>
									<FormControl>
										<Input placeholder="@" type="email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Senha</FormLabel>
									<FormControl>
										<Input placeholder="••••••••" type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirme sua senha</FormLabel>
									<FormControl>
										<Input placeholder="••••••••" type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							disabled={form.formState.isSubmitting}
							className="w-full"
						>
							{form.formState.isSubmitting && (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							Criar conta
						</Button>
					</form>
				</Form>

				<div className="text-center text-muted-foreground">
					Você ja tem uma conta?{" "}
					<Link to="/entrar" className="font-medium underline">
						Entrar
					</Link>
				</div>
			</div>
		</main>
	);
}
