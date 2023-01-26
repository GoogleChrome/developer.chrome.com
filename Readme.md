
Su cuenta ha sido marcada.
Por eso, su perfil está oculto al público. Si cree que se trata de un error, póngase en contacto con el servicio de asistencia para que revisen el estado de su cuenta.
Google Chrome
/
desarrollador.chrome.com
Público
Desarrolladores de cromo

desarrollador.chrome.com
Licencia
 Ver licencia
 1.2k estrellas 1.2k tenedores 
Código
Asuntos
283
Solicitudes de extracción
78
Comportamiento
Proyectos
6
wiki
Seguridad
Perspectivas
Google Chrome/desarrollador.chrome.com
Última confirmación
@jpmedley
jpmedley
…
hace 4 horas
Estadísticas de Git
archivos
LÉAME.md
desarrollador.chrome.com
developer.chrome.com es el recurso definitivo para que los desarrolladores de todos los orígenes aprendan las novedades de Chrome.

¿Encontraste un error?👷‍♀️
¡Gracias por dejarnos saber! Presente un problema y un miembro del equipo debería responder en breve.

Si está enviando una solicitud de extracción para corregir un error, lea las pautas de contribución .

Contenido de autoría✍️
Antes de comenzar a escribir, tómese un momento para consultar el manual de developer.chrome.com y familiarizarse con el proceso.

Construyendo el sitio🏗
Necesitará una versión reciente de Node : v14 (LTS) o superior. Para verificar la versión de su nodo, ejecute node -ven su terminal.

Si no tiene un nodo o si necesita actualizarlo, le recomendamos que utilice el Administrador de versiones de nodos (nvm) .

Clonar el repositorio
⚠️Si desea contribuir (y no es miembro del equipo central), asegúrese de bifurcar el repositorio primero y clonar la bifurcación.

git clone https://github.com/GoogleChrome/developer.chrome.com.git
Instalar dependencias
npm ci
Configurar indicadores de compilación
Crear todo el sitio puede llevar un tiempo porque tiene más de mil páginas. Si desea acelerar enormemente sus tiempos de compilación, le sugerimos configurar algunos indicadores de compilación para ignorar ciertas secciones.

ADVERTENCIA: De manera predeterminada, en desarrollo ignoramos todos los documentos traducidos (todos los documentos fuera del directorio /en/). Para volver a incluirlos, use la ELEVENTY_INCLUDE_TRANSLATED=truevariable env.

Cree un .envarchivo en la raíz de su proyecto
Opcionalmente agregue lo siguiente:
# Ignore ALL /docs/
ELEVENTY_IGNORE_DOCS=true

# Only ignore /docs/android/
ELEVENTY_IGNORE_ANDROID=true

# Only ignore /docs/apps/
ELEVENTY_IGNORE_APPS=true

# Only ignore /docs/devtools/
ELEVENTY_IGNORE_DEVTOOLS=true

# Only ignore /docs/extensions/
ELEVENTY_IGNORE_EXTENSIONS=true

# Only ignore /docs/handbook/
ELEVENTY_IGNORE_HANDBOOK=true

# Only ignore /docs/lighthouse/
ELEVENTY_IGNORE_LIGHTHOUSE=true

# Only ignore /docs/multidevice/
ELEVENTY_IGNORE_MULTIDEVICE=true

# Only ignore /docs/native-client/
ELEVENTY_IGNORE_NACL=true

# Only ignore /docs/privacy-sandbox/
ELEVENTY_IGNORE_PRIVACY_SANDBOX=true

# Only ignore /docs/versionhistory/
ELEVENTY_IGNORE_VERSIONHISTORY=true

# Only ignore /docs/webstore/
ELEVENTY_IGNORE_WEBSTORE=true

# Only ignore /docs/workbox/
ELEVENTY_IGNORE_WORKBOX=true

# Ignore BLOG /blog/
ELEVENTY_IGNORE_BLOG=true
Inicie un servidor local para obtener una vista previa del sitio
npm run dev
Abrir http://localhost:8080/para ver el sitio localmente. Los cambios en los activos reconstruirán el sitio. Actualice para ver sus cambios.

Ejecute filtros para corregir errores
Antes de impulsar su rama, busque y corrija cualquier error.

npm run lint
Entornos🌳
Para hacer una compilación de producción del sitio e iniciar la ejecución del servidor local npm run production && npm start.

Puesta en escena🕺
Cuando envíe una solicitud de extracción, se preparará automáticamente para usted. Esté atento al bot de netlify para comentar sobre la solicitud de extracción con su URL única.

(Solo Googlers) Si desea organizar sus cambios locales en una URL única, ejecute el comando npm run stage:personal. Esto puede ser útil si aún no está listo para crear una solicitud de extracción o si necesita preparar algo privado.

☝️Deberá ser miembro de nuestro proyecto GCP para que este comando funcione.

Desplegando el sitio🚀
Despliegues automáticos
El sitio creará e implementará la mainsucursal automáticamente cada hora, de lunes a viernes. Si acaba de fusionar un artículo, debería publicarse en la parte superior de la próxima hora.
