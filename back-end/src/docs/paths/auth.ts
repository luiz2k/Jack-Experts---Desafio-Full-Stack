export const auth = {
	"/auth/login": {
		post: {
			tags: ["auth"],
			summary: "Realiza o login.",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/login",
						},
					},
				},
			},
			responses: {
				200: {
					description: "Token de acesso gerado.",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/logged",
							},
						},
					},
				},
				401: {
					description: "E-mail ou senha inválidoos.",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/error",
							},
						},
					},
				},
			},
		},
	},
	"/auth/logout": {
		post: {
			tags: ["auth"],
			security: [{ bearerAuth: [] }],
			summary: "Realiza o logout.",
			responses: {
				200: {
					description: "Token de acesso gerado.",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/loggedOut",
							},
						},
					},
				},
				401: {
					description: "Token inválido.",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/error",
							},
						},
					},
				}
			},
		},
	},
};
