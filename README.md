# Modern.js App

## Setup

Install the dependencies:

```bash
pnpm install
```

## Get Started

Start the start server:

```bash
pnpm start
```

Build the app for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm serve
```

For more information, see the [Modern.js documentation](https://modernjs.dev/en).

## Contentstack (Logo del Header)

El proyecto ya esta preparado para leer el logo desde Contentstack y usarlo en header y footer.

1. Copia `.env.example` a `.env`.
2. Llena estas variables:
	- `CONTENTSTACK_API_KEY`
	- `CONTENTSTACK_DELIVERY_TOKEN`
	- `CONTENTSTACK_ENVIRONMENT`
	- `CONTENTSTACK_BRANCH` (por ejemplo `main`)
	- `CONTENTSTACK_REGION` (por ejemplo `US` o `EU`)
	- `CONTENTSTACK_CONTENT_TYPE_UID` (por defecto `global_header`)
	- `CONTENTSTACK_LOGO_FIELD_UID` (por defecto `media`)
3. Asegurate de que el campo `CONTENTSTACK_LOGO_FIELD_UID` sea tipo Asset.
4. Corre el proyecto con `pnpm dev`.

Si falta configuracion o la consulta falla, se usa el fallback local `img/Logo.png`.

