# Propuesta Técnica y Comercial: Nueva Plataforma Digital, CMS & AI Suite — VMG NeXT Construction

**Cliente:** VMG NeXT Construction _(Melanie & Victor Galvan · Sandy, Salt Lake City & Park City, Utah)_  
**Enfoque:** Reingeniería desde cero de `vmgnext.com` en arquitectura moderna (React + TypeScript + Cloud), Panel Admin 360° de Equipo, Estudio de Blogs con IA Auto-Publisher e Integración con Software de Estimaciones (`ocv1_...`)  
**Infraestructura Recurrente:** **$0 USD / mes** _(Google Cloud / Firebase Spark Tier & GitHub Edge CDN)_

---

## 1. Resumen Ejecutivo y Auditoría del Sitio Actual (`vmgnext.com`)

Tras auditar a nivel de código, base de datos y servidor la instalación actual de **VMG NeXT** en WordPress 7.0 sobre SiteGround (`vmg-next-theme` v3.6.0), identificamos **5 cuellos de botella críticos** que esta nueva plataforma resuelve de raíz:

1. **Vulnerabilidad Crítica de Seguridad (Inyecciones PHP):** Se detectó y limpió en el tema actual un script malicioso tipo _self-healing backdoor_ (`updater.php` inyectado en `header.php`). Al depender de PHP, WordPress y plugins como _WP File Manager_ o _Simple Custom CSS & JS_, el sitio sigue expuesto a reinfecciones. **La nueva arquitectura compilada en React + TypeScript elimina el motor PHP por completo, haciendo imposible cualquier inyección de código.**
2. **Fricción y Errores al Actualizar el Equipo (`/team/`):** Actualmente el listado del equipo está _hardcodeado_ en HTML puro dentro de un carrusel Swiper (Página ID 242), mientras que cada perfil individual vive en una página separada con campos ACF (`team-member-template.php`). Ocultar o actualizar integrantes (como Savannah, Zachariah, Levi, Abner, Rene Villanueva o Eduardo Galvan) requiere comentar código HTML manualmente, provocando etiquetas rotas (`<!--`) y bloqueos por caché de SiteGround (`Purge SG Cache`).
3. **Publicación Manual y Lenta de Blogs (`/blog/`):** El sitio solo cuenta con 3 artículos desde diciembre de 2025 porque redactar, maquetar y configurar SEO manualmente toma horas por publicación.
4. **Desconexión del Software de Estimaciones (`ocv1_...`):** Los formularios actuales (_Contact Form 7_) envían correos planos sin conectarse con la API Key del software de estimaciones (`ocv1_bBAB9MUQVzEagJKFYOmhIhwFItKDx3L0vvZlKgDTEs8=`) en el botón _"Request Consultation"_.
5. **Costos Fijos de Hosting y Mantenimiento:** Renta anual de servidor SiteGround (~$360 – $600 USD/año) más horas recurrentes de soporte técnico para cambios básicos de texto, fotos o personal.

---

## 2. Réplica Visual 1:1 Mejorada y Nuevas Capacidades Incluidas

La nueva aplicación replica fielmente la identidad visual corporativa de **VMG NeXT** (negro carbón `#121214`, rojo vibrante `#E70000`, tipografías _Sora_, _DM Sans_ y _JetBrains Mono_) e incluye todas las páginas y activos reales auditados:

- **Home & Services (`/`, `/services`):** Hero con video de fondo responsivo (`Vmg-Next-WebsiteV4-1920X640.mp4`), métricas animadas (**220+ Proyectos**, **20+ Años**, **100% Satisfacción**), las 6 divisiones activas (_Tilt-Up, Slabs, Cast-In-Place, Educational Facilities, Commercial Construction, Water Treatment_) más _High-End Homes_ activable en 1 clic desde `/admin`, y carrusel continuo con los 8 testimonios reales (_Brandon M. Dawson, Tom Widener, Bora Erbilen, Bank OZK_, etc.).
- **Projects Portfolio Interactivo (`/projects`):** Los 8 proyectos emblemáticos (_Tow/Plow Manila, Tow/Plow Tabiona, Promontory Place, K&B Apartments, Timpview High School $5M–$5.5M, Ogden 5 Light Bay, Canyon Creek Fairfield Inn y The Grove Buildings 1 & 2_) con **nuevo filtro instantáneo por sector**, rangos de presupuesto, pies cuadrados (`SF`), General Contractor (`GC`), carrusel por tarjeta y **visor Lightbox a pantalla completa**.
- **About Us & Restoration Division (`/about-us`, `/restoration`):** Misión, Visión ($125M / 360 integrantes), los 6 valores corporativos y la galería interactiva filtrable con las **24 fotografías reales de restauración estructural** (_Foundation Wall Repairs, Concrete Pourbacks, Concrete Additions, Wood Decks_).
- **Careers inspirado en Cardone Ventures (`/careers`):** Hero con video, KPIs de cultura (_"We win together"_), 6 bloques de beneficios, vacantes abiertas con marcado automático `JobPosting` para **Google Jobs**, red directa de talento con Yolanda Galvan (`yolanda@vmgnext.com`) y los **3 testimonios reales en video vertical** (_Valerie, Victor Galvan y Scott Longhurst_).

---

## 3. Estudio de Blogs con IA & Auto-Publisher (`/admin` → AI Blog Studio)

- **Generación y Publicación en 1 Clic desde un Prompt:** Desde el panel `/admin`, Melanie o Sophia Galvan solo escriben una instrucción o tema (ej. _"Why Tilt-Up Concrete Reduces Winter Construction Schedules in Salt Lake City"_), eligen la categoría, el tono editorial y las palabras clave SEO.
- **Redacción Técnica y Publicación Automática:** El motor de IA redacta el artículo completo con estructura jerárquica (`H2`, `H3`, listas técnicas, citas ejecutivas de liderazgo, llamado a la acción hacia estimaciones), asigna fotografía de portada optimizada, genera el `slug` amigable y **lo publica automáticamente en `/blog`** listo para indexarse en Google.
- **Compatibilidad Dual ($0 USD):** Funciona de inmediato con el motor de IA constructivo integrado sin costo y permite conectar una llave gratuita de **Google Gemini API** desde `/admin`.

---

## 4. Gestor 360° de Team Members (`/admin` → Team Members)

- **Directorio Visual Completo (18 Activos + 4 Ocultos/Archivados):** Incluye ya cargados y actualizados a **Victor Galvan, Yolanda Galvan, Mayra Gonzalez, Scott Longhurst, Abner Palacios** (_Director of Special Projects_), **Sophia Galvan** (_Marketing Director_), **Rene Villanueva** (_Lead Estimator_), **Eduardo Galvan** (_Assistant Project Manager_) y todo el equipo de estimación y operaciones.
- **Switch de Visibilidad en 1 Clic (Visible / Hidden):** Los perfiles de _Savannah, Zachariah Maynard, Levi Palacios y Valerie Diaz_ se conservan respaldados en la base de datos como `Hidden`. Si el cliente desea ocultarlos o reactivarlos, basta con presionar un botón sin comentar código HTML ni romper el sitio.
- **Edición Total de Fotos y Biografías:** Carga directa de **Foto de Tarjeta (`/team`)** y **Retrato de Detalle (`/team/:slug`)** desde la computadora (con compresión automática WebP en navegador), edición de nombre, puesto, departamento, biografía en 2 párrafos y reordenamiento con flechas (`↑` / `↓`).

---

## 5. Integración con Software de Estimaciones (`ocv1_...`) y Captación de Leads

- **Portal _"Request Consultation"_ Conectado:** El botón principal de la barra de navegación y de cada servicio/proyecto abre el modal de preconstrucción conectado a la API Key `ocv1_bBAB9MUQVzEagJKFYOmhIhwFItKDx3L0vvZlKgDTEs8=`.
- **Captura Calificada + Bandeja CRM en `/admin`:** Recopila nombre, empresa/GC, correo, teléfono, tipo de servicio, pies cuadrados estimados (`SF`), rango presupuestal, ubicación en Utah y fecha de movilización, enviando el payload al sistema de estimaciones y guardando el respaldo en `/admin` con control de estatus (`New`, `In Estimating`, `Proposal Sent`).

---

## 6. Arquitectura Tecnológica & Reducción de Costos a $0 USD / mes

- **Frontend & Compilación:** React 19 + Vite + TypeScript + Tailwind CSS (bundle estático ultrarrápido con calificación 98–100 en Google PageSpeed).
- **Base de Datos, Auth & Almacenamiento Multimedia ($0 USD):** Google Cloud Firestore + Firebase Auth (Plan Spark gratuito perpetuo: 50,000 lecturas/día, 20,000 escrituras/día y 1 GB libre). La compresión automática en navegador (~150 KB por imagen) permite almacenar más de 2,500 fotografías sin pagar servidores ni Cloud Storage.
- **Hosting, CI/CD & SSL ($0 USD):** Despliegue automatizado vía GitHub (`https://github.com/andrescorderor/vmg-next-platform`) con CDN global y certificado SSL perpetuo sin costo mensual.

---

## 7. Metodología de Entrega y Cronograma (4 Semanas)

| Fase | Duración | Entregables Clave |
| :--- | :---: | :--- |
| **Fase 1: Migración Base y Réplica Visual 1:1** | 1 semana | Maquetación completa de Home, Services, About, Contact, Legal y activos multimedia de `vmgnext.com`. |
| **Fase 2: Directorio Team 360° y Portafolios** | 1 semana | Módulo `/team` y perfiles individuales dinámicos, `/projects` con Lightbox y `/restoration` filtrable. |
| **Fase 3: AI Blog Studio, Careers & API Leads** | 1 semana | Panel `/admin` con generador de blogs con IA auto-publicable, portal `/careers` y conexión API `ocv1_...`. |
| **Fase 4: Pruebas, SEO Redirects y Go-Live** | 1 semana | Conservación de URLs para SEO, pruebas en móvil/escritorio, cambio de DNS en dominio `vmgnext.com` y entrega. |
| **TOTAL** | **4 semanas** | **Plataforma productiva llave en mano con $0 USD/mes en servidores.** |

- **Garantía Post-Lanzamiento:** **3 semanas** de soporte técnico, capacitación para Melanie/Sophia y ajustes menores incluidos sin costo adicional.

---

## 8. Modelo Comercial, Inversión Modular y Condiciones

### A. Plataforma Web Base + Gestor Team 360° & AI Blog Auto-Publisher _(Mínimo Requerido)_

| Concepto | Alcance Técnico | Inversión |
| :--- | :--- | :---: |
| **Plataforma Web Base + Team CMS + AI Blog Studio** | Réplica 1:1 mejorada de `vmgnext.com` (Home, Services, About, Team + Perfiles individuales, Blog, Contact, Legal), arquitectura inmune a malware PHP, Hosting Cloud ($0 USD/mes), **Gestor 360° de Team Members** (fotos, biografías y ocultar/mostrar en 1 clic) y **AI Blog Studio** (redacción y autopublicación SEO desde un prompt). | **$1,450 USD** |

### B. Módulos Configurables Opcionales _(para Autonomía y Automatización Total)_

| Módulo Adicional | Alcance Técnico | Costo por Módulo |
| :--- | :--- | :---: |
| **1. Gestor Dinámico de Proyectos & Galería Restoration** | Alta, edición, filtros por mercado, rangos de presupuesto (`$30K–$5.5M`), `SF`, `GC`, visor Lightbox y galería Restoration desde `/admin`. | +$350 USD |
| **2. Integración API de Estimaciones (`ocv1_...`) & CRM** | Conexión del botón _"Request Consultation"_ con software de estimaciones vía API Key, modal interactivo de alcance (`SF`) y CRM de prospectos en `/admin`. | +$280 USD |
| **3. Portal Dinámico Careers ATS & Google Jobs Schema** | Diseño inspirado en Cardone Ventures, testimonios en video vertical, gestión de vacantes en `/admin` y marcado `JobPosting` para Google Jobs. | +$220 USD |
| **SUBTOTAL MÓDULOS OPCIONALES** | **Automatización comercial, portafolios y reclutamiento completo** | **+$850 USD** |

### Inversión Total y Retorno (ROI)

- **Proyecto Completo (Autonomía y Automatización Total):** **$2,300 USD** _(Pago único)_
- **Versión Esencial (Plataforma Base + Team 360° + AI Blog Studio):** **$1,450 USD** _(Pago único — se puede activar o descartar cualquier módulo opcional según las prioridades del cliente)_.
- **Costo Mensual de Servidores, Base de Datos y SSL:** **$0 USD / mes** _(Ahorro directo de ~$360 – $600 USD/año frente a SiteGround WordPress + ahorro de ~$1,500+ USD/año en tickets de mantenimiento para cambios de personal y blogs)_.
- **Dominio Web (`vmgnext.com`):** El cliente conserva su dominio actual sin costo adicional de migración.

### Esquema de Pagos

- **30% Anticipo** al autorizar el inicio del proyecto _($690 USD en versión completa / $435 USD en versión esencial)_.
- **70% Contra Entrega** y validación formal de funcionamiento en el dominio definitivo _($1,610 USD en versión completa / $1,015 USD en versión esencial)_.
