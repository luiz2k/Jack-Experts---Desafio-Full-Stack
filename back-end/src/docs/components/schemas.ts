export const schemas = {
	createUser: {
		type: "object",
		properties: {
			username: {
				type: "string",
				description: "Nome do usuário.",
			},
			email: {
				type: "string",
				description: "Email do usuário.",
			},
			password: {
				type: "string",
				description: "Senha do usuário.",
			},
			confirmPassword: {
				type: "string",
				description: "Confirmação da senha do usuário.",
			},
		},
		required: ["username", "email", "password", "confirmPassword"],
	},
	createdUser: {
		type: "object",
		properties: {
			statusCode: {
				type: "number",
				description: "Código do status HTTP.",
			},
			message: {
				type: "string",
				description: "Mensagem da resposta.",
			},
			data: {
				type: "object",
				properties: {
					username: {
						type: "string",
						description: "Nome do usuário.",
					},
					email: {
						type: "string",
						description: "Email do usuário.",
					},
				},
			},
		},
	},

	updateUser: {
		type: "object",
		properties: {
			username: {
				type: "string",
				description: "Nome do usuário.",
			},
			email: {
				type: "string",
				description: "Email do usuário.",
			},
			password: {
				type: "string",
				description: "Senha do usuário.",
			},
		},
	},
	updatedUser: {
		type: "object",
		properties: {
			statusCode: {
				type: "number",
				description: "Código do status HTTP.",
			},
			message: {
				type: "string",
				description: "Mensagem da resposta.",
			},
			data: {
				type: "object",
				properties: {
					username: {
						type: "string",
						description: "Nome do usuário.",
					},
					email: {
						type: "string",
						description: "Email do usuário.",
					},
					password: {
						type: "string",
						description: "Senha do usuário.",
					},
				},
			},
		},
	},

	createTask: {
		type: "object",
		properties: {
			description: {
				type: "string",
				description: "Descrição da tarefa.",
			},
		},
		required: ["task"],
	},
	updateTask: {
		type: "object",
		properties: {
			description: {
				type: "string",
				description: "Descrição da tarefa.",
			},
			status: {
				type: "string",
				enum: ["completed", "pending"],
				description: false,
			},
		},
	},
	task: {
		type: "object",
		properties: {
			statusCode: {
				type: "number",
				description: "Código do status HTTP.",
			},
			message: {
				type: "string",
				description: "Mensagem do retorno",
			},
			data: {
				type: "array",
				items: {
					type: "object",
					properties: {
						id: {
							type: "string",
							description: "ID da tarefa.",
						},
						description: {
							type: "string",
							description: "Descrição da tarefa.",
						},
						status: {
							type: "string",
							enum: ["completed", "pending"],
							description: "Status da tarefa.",
						},
						createdAt: {
							type: "string",
							format: "date",
							description: "Data de criação da tarefa.",
						},
					},
				},
			},
		},
	},
	updatedTask: {
		type: "object",
		properties: {
			statusCode: {
				type: "number",
				description: "Código do status HTTP.",
			},
			message: {
				type: "string",
				description: "Tarefa atualizada.",
			},
			data: {
				type: "object",
				properties: {
					description: {
						type: "string",
						description: "Descrição da tarefa.",
					},
					status: {
						type: "boolean",
						enum: ["completed", "pending"],
						description: "Status da tarefa.",
					},
				},
			},
		},
	},
	createdTask: {
		type: "object",
		properties: {
			statusCode: {
				type: "number",
				description: "Código do status HTTP.",
			},
			message: {
				type: "string",
				description: "Mensagem da resposta.",
			},
			data: {
				type: "object",
				properties: {
					id: {
						type: "string",
						description: "ID da tarefa.",
					},
					description: {
						type: "string",
						description: "Descrição da tarefa.",
					},
					status: {
						type: "string",
						enum: ["completed", "pending"],
						description: "Status da tarefa.",
					},
					createdAt: {
						type: "string",
						format: "date",
						description: "Data de criação da tarefa.",
					},
					user: {
						type: "object",
						properties: {
							id: {
								type: "string",
								description: "ID do usuário.",
							},
						},
					},
				},
			},
		},
	},
	taskDeleted: {
		type: "object",
		properties: {
			statusCode: {
				type: "number",
				description: "Código do status HTTP.",
			},
			message: {
				type: "string",
				description: "Mensagem do retorno.",
			},
		},
	},

	login: {
		type: "object",
		properties: {
			email: {
				type: "string",
				description: "Email do usuário.",
			},
			password: {
				type: "string",
				description: "Senha do usuário.",
			},
		},
		required: ["email", "password"],
	},
	logged: {
		type: "object",
		properties: {
			statusCode: {
				type: "number",
				description: "Código do status HTTP.",
			},
			message: {
				type: "string",
				description: "Mensagem do retorno.",
			},
			data: {
				type: "object",
				properties: {
					token: {
						type: "string",
						description: "Token de acesso.",
					},
					expiresIn: {
						type: "string",
						format: "date",
						description: "Data de expiração.",
					},
				},
			},
		},
	},

	loggedOut: {
		type: "object",
		properties: {
			email: {
				type: "string",
				description: "Email do usuário.",
			},
			password: {
				type: "string",
				description: "Senha do usuário.",
			},
		},
		required: ["email", "password"],
	},

	error: {
		type: "object",
		properties: {
			statusCode: {
				type: "number",
				description: "Código do status HTTP.",
			},
			message: {
				type: "string",
				description: "Mensagem da resposta.",
			},
		},
	},
	validationError: {
		type: "object",
		properties: {
			statusCode: {
				type: "number",
				description: "Código do status HTTP.",
			},
			message: {
				type: "string",
				description: "Mensagem da resposta.",
			},
			paths: {
				type: "array",
				description: "Caminhos dos erros.",
				items: {
					type: "object",
					properties: {
						path: {
							type: "string",
							description: "Em qual chave o erro aconteceu.",
						},
						message: {
							type: "string",
							description: "Mensagem da resposta.",
						},
					},
				},
			},
		},
	},
};
