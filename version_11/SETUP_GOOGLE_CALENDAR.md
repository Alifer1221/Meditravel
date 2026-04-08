# Guía de Configuración: Agendamiento Real con Google Meet

Para que el sistema cree citas reales en Google Calendar y envíe correos, necesitas configurar credenciales de Google Cloud.

## 1. Instalar Dependencias
Ejecuta este comando en tu terminal (si falló antes, inténtalo de nuevo):
```bash
npm install googleapis nodemailer
```

## 2. Configurar Google Cloud
1. Ve a [Google Cloud Console](https://console.cloud.google.com/).
2. Crea un nuevo proyecto.
3. Habilita la **Google Calendar API**.
4. Ve a **Credenciales** -> **Crear Credenciales** -> **Cuenta de Servicio**.
5. Crea la cuenta y descarga el archivo **JSON de claves** (Key).
6. Copia el `client_email` y el `private_key` del JSON.

## 3. Configurar Variables de Entorno
Crea un archivo `.env.local` en la raíz del proyecto y agrega esto:

```env
# Google Calendar Credentials
GOOGLE_CLIENT_EMAIL="tu-cuenta-de-servicio@tu-proyecto.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTuClavePrivada...\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID="primary" 
# Nota: Para usar 'primary', debes compartir tu calendario personal con el email de la cuenta de servicio (client_email) y darle permisos de "Hacer cambios en eventos".

# Email Sender Settings (Gmail App Password recomendado)
EMAIL_USER="tu-email@gmail.com"
EMAIL_PASS="tu-contraseña-de-aplicación"
```

> **Nota sobre Gmail**: Si usas Gmail para enviar correos, debes crear una "Contraseña de Aplicación" en la configuración de seguridad de tu cuenta Google, no uses tu contraseña normal.

Una vez configurado esto, el sistema:
1. Creará el evento en tu Calendario.
2. Generará un enlace único de Google Meet.
3. Enviará un correo al usuario y a ti con la confirmación.
