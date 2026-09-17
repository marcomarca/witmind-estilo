# Witmind Next en Home Assistant

Esta carpeta es el árbol de despliegue para `/config` en Home Assistant OS. No crea una segunda base de datos en el PC: el único SQLite se crea en `/config/witmind/witmind.db` por `witmind_core`.

La guía completa para colaborar y migrar paneles antiguos está en [`docs/HOME_ASSISTANT_PANEL_MIGRATION.md`](../docs/HOME_ASSISTANT_PANEL_MIGRATION.md).

1. Copia `custom_components/witmind_core` a `/config/custom_components/witmind_core`.
2. Copia `www/witmind-ui-panel.js` a `/config/www/witmind-ui-panel.js`.
3. Copia `www/witmind-ui/current.json` y las releases generadas a `/config/www/witmind-ui/`.
4. Fusiona `configuration.yaml.snippet.yaml` con la configuración existente sin duplicar `panel_custom:`.
5. Reinicia Home Assistant y abre `Witmind Next` desde el sidebar.

El bridge mantiene la interfaz estable y versiona la aplicación visual. `STABLE` usa `current.json`, `PREVIEW` carga una release explícita y `DEV` prueba el Vite del PC; si DEV no responde en 4 segundos, vuelve a STABLE. La release activa actual es `0.1.8` e incluye el panel paralelo `Witmind Lobby` aislado a sus cuatro circuitos y escenas, junto al panel estático `Witmind General`.
