# Plan de migracion a shadcn sin impacto visual

Objetivo: migrar de CSS tradicional a componentes/utilidades shadcn + Tailwind sin alterar la apariencia actual.

## Regla principal

Cada fase debe cumplir estas condiciones:

1. No cambiar HTML semantico ni estructura visual.
2. No eliminar clases legacy hasta validar pantalla por pantalla.
3. Mantener build en verde en cada commit.
4. Si hay duda visual, se revierte solo ese cambio.

## Estado actual

- Estilos globales en CSS real:
  - `src/styles/global/base.css`
  - `src/styles/global/seo.css`
- Layout styles separados:
  - `src/styles/layout/header.css`
  - `src/styles/layout/footer.css`
- Estilos de landing en:
  - `src/styles/components/landing.css`
- Base shadcn/tailwind ya presente:
  - `src/styles/shadcn.css`
  - `tailwind.config.ts`

## Fase 0 (sin riesgo, recomendada primero)

1. Congelar baseline visual (capturas de desktop + mobile de home/header/footer).
2. Definir checklist visual obligatorio:
   - Header: logo, menu, redes, hover, responsive.
   - Footer: columnas, iconos, rights text, responsive.
   - Home: banner, marcas, nav blocks, steps, CTA, SEO text.
3. Migrar por micro-pasos de 1 componente por PR/cambio.

Resultado esperado: cero cambios de UI, solo control de calidad para evitar regresiones.

## Fase 1 (componentes UI, impacto muy bajo)

Migrar solo piezas atomicas, no layout completo:

1. Botones (ya iniciado con `src/components/ui/button.tsx`).
2. Links con variantes de estilo reutilizable.
3. Wrappers de tipografia para titulos y texto comun.

Estrategia:

- Mantener clases legacy activas.
- Agregar utilidades shadcn de forma aditiva.
- No borrar reglas CSS antiguas en esta fase.

## Fase 2 (bloques de landing)

Orden sugerido:

1. `CtaSection`
2. `Steps`
3. `NavSection`
4. `BrandCarousel`
5. `Banner`

Regla:

- Migrar clases por bloque y validar inmediatamente.
- Si una vista cambia 1px de forma no deseada, restaurar ese fragmento.

## Fase 3 (header/footer)

Header y footer se migran al final porque tienen mas riesgo responsive.

1. Reemplazar estilos internos por utilidades gradualmente.
2. Conservar `header.css` y `footer.css` como fallback temporal.
3. Eliminar reglas legacy solo cuando el bloque este 100% estable.

## Criterios de aceptacion por fase

1. `pnpm build` exitoso.
2. Sin errores de TypeScript/diagnostics.
3. Misma estructura visual desktop/mobile en checklist.
4. Sin regresion en interacciones (menu, links, botones).

## Que NO hacer (para no romper nada)

1. Migrar todo en un solo cambio.
2. Eliminar CSS legacy antes de validar.
3. Mezclar refactor visual con cambios de logica/datos.
4. Cambiar breakpoints o espaciados globales en bloque.

## Siguiente paso recomendado

Comenzar Fase 1 solo con una pieza:

- Estandarizar links de CTA con variante reusable y validar que no cambie ni color, ni peso, ni espaciado.
