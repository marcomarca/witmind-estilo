# Regla Permanente de Mantenimiento del Historial de Fallas (Witmind)

Cualquier agente de IA o desarrollador que trabaje en este repositorio debe seguir obligatoriamente este protocolo:

1. **Lectura obligatoria antes de modificar código**:
   Antes de editar gestos (táctil o ratón), el workspace (`witmind-workspace.ts`), el bridge (`witmind-ui-panel.js`), o vistas de paneles, es mandatorio consultar:
   [`c:\dev\automatizacion-estilo\.agents\skills\witmind-failure-history\SKILL.md`](file:///c:/dev/automatizacion-estilo/.agents/skills/witmind-failure-history/SKILL.md)
   para verificar que los cambios no reintroduzcan regresiones pasadas.

2. **Registro obligatorio de nuevas fallas o mejoras de estabilidad**:
   Cada vez que se corrija un bug, se resuelva una regresión o se publique una release con mejoras funcionales:
   - Es **mandatorio añadir la nueva entrada** en la tabla y en las fichas técnicas de:
     [`c:\dev\automatizacion-estilo\.agents\skills\witmind-failure-history\SKILL.md`](file:///c:/dev/automatizacion-estilo/.agents/skills/witmind-failure-history/SKILL.md)
   - La entrada debe incluir:
     1. Versión con la falla y versión de corrección.
     2. Ruta y archivo exacto afectado.
     3. Síntoma real experimentado por el usuario.
     4. Causa técnica raíz comprobada.
     5. Solución implementada.
     6. Regla preventiva / lección aprendida.
