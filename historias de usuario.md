# ÉLAN WATCHES — ESPECIFICACIÓN DE HISTORIAS DE USUARIO

Sistema de Comercio Electrónico para la Venta y Distribución de Relojes de Alta Gama

---

### 📋 Información del Proyecto Académico

| Campo | Detalle |
| :--- | :--- |
| **Grupo** | **Grupo 22** |
| **Asignatura** | **Ingeniería de Software (SIS 324)** |
| **Docente** | **Ing. Ramiro Alberto Duran Quiroga** |
| **Carrera** | **Ingeniería de Sistemas** |
| **Universitarios (Integrantes)** | • **Chumacero Steffany**<br>• **Anagua Muñoz Jhaqueline**<br>• **Monasterios Rojas Erland Mauricio** |
| **Lugar y Fecha** | **Sucre, 16 de octubre de 2026** |

---

## 📑 Tabla de Contenidos
1. [Introducción y Contexto](#1-introducción-y-contexto)
2. [Método y Criterios](#2-método-y-criterios)
   - [2.1 Roles del Sistema](#21-roles-del-sistema)
   - [2.2 Criterios de Priorización](#22-criterios-de-priorización)
3. [Historias de Usuario por Rol](#3-historias-de-usuario-por-rol)
   - [3.1 Rol Cliente (HU01 – HU12)](#31-rol-cliente)
   - [3.2 Rol Administrador (HU13 – HU18)](#32-rol-administrador)
   - [3.3 Rol Encargado de Almacén (HU19 – HU22)](#33-rol-encargado-de-almacén)
   - [3.4 Rol Repartidor (HU23 – HU24)](#34-rol-repartidor)
   - [3.5 Rol Gerente (HU25 – HU26)](#35-rol-gerente)
   - [3.6 Historias Transversales del Sistema (HU27 – HU28)](#36-historias-transversales-del-sistema)
4. [Matriz de Trazabilidad (RF vs. HU)](#4-matriz-de-trazabilidad-con-los-requisitos-funcionales)
5. [Referencias Bibliográficas](#5-referencias)

---

## 1. Introducción y Contexto

El presente documento recopila la especificación formal de las **Historias de Usuario** para **Élan Watches**, una plataforma integral de comercio electrónico especializada en la comercialización, gestión de inventario y distribución de piezas de alta relojería. 

El ecosistema de software se compone de:
- **Aplicación Móvil** (Flutter / Dart): Orientada a clientes finales para navegación de catálogo, carrito de compras y seguimiento de pedidos.
- **Plataforma Web Administrativa** (JavaScript / React / Flask / SQLite): Destinada a la gestión interna de catálogo, usuarios, almacén, logística y reportes gerenciales.

Las historias se derivan de los requisitos funcionales, perfiles de usuario y restricciones definidos en el documento de visión del proyecto (Grupo 22, 2026) y constituyen el marco de referencia ágil para la planificación, estimación y desarrollo del producto durante el periodo académico.

> [!NOTE]
> Cada historia describe una necesidad funcional desde la perspectiva del usuario siguiendo la estructura canónica:  
> **«Como [rol], quiero [funcionalidad], para [beneficio]»** (Cohn, 2004).  
> Asimismo, incorporan criterios de aceptación verificables bajo el principio **INVEST** (*Independent, Negotiable, Valuable, Estimable, Small, Testable*) propuesto por Wake (2003).

---

## 2. Método y Criterios

### 2.1 Roles del Sistema

Los roles considerados corresponden a las partes interesadas identificadas en el análisis del negocio. La **Tabla 1** resume cada rol, la plataforma tecnológica principal que utiliza y el número de historias de usuario asociadas.

#### Tabla 1  
*Roles del sistema y número de historias de usuario*

| Rol | Plataforma Principal | Tecnologías | Historias Asignadas |
| :--- | :--- | :--- | :---: |
| **Cliente** | Aplicación móvil | Flutter / Dart | **HU01 – HU12** |
| **Administrador** | Plataforma web | JavaScript / React | **HU13 – HU18** |
| **Encargado de almacén** | Plataforma web | JavaScript / React | **HU19 – HU22** |
| **Repartidor** | Plataforma web | JavaScript / React | **HU23 – HU24** |
| **Gerente** | Plataforma web | JavaScript / React | **HU25 – HU26** |
| **Sistema (Transversales)** | Backend & Base de Datos | Python (Flask) / SQLite | **HU27 – HU28** |

*Nota. Elaboración propia a partir de Grupo 22 (2026).*

### 2.2 Criterios de Priorización

La prioridad expresa la relevancia de cada historia para la consecución del Producto Mínimo Viable (**MVP**):
- **Alta**: Funcionalidades esenciales e indispensables para el flujo crítico de compra, seguridad y distribución.
- **Media**: Funcionalidades que enriquecen la experiencia de usuario, optimizan la búsqueda o profundizan el control administrativo.
- **Baja**: Opciones complementarias que pueden posponerse sin comprometer el flujo operativo principal.

---

## 3. Historias de Usuario por Rol

### 3.1 Rol: Cliente

El cliente interactúa con la aplicación móvil para explorar colecciones, personalizar su carrito y concretar la compra de relojes hasta la entrega.

#### Tabla 2  
*Historias de usuario del rol Cliente*

| ID | Historia de Usuario | Criterios de Aceptación | RF Vinculado | Prioridad |
| :---: | :--- | :--- | :---: | :---: |
| **HU01** | **Como** cliente,<br>**quiero** registrarme en la aplicación,<br>**para** poder realizar compras y consultar mis pedidos. | • Se solicitan los datos obligatorios (nombre, correo y contraseña).<br>• No se permite registrar un correo ya existente.<br>• La contraseña se almacena mediante hash criptográfico seguro. | RF01<br>RF22 | **Alta** |
| **HU02** | **Como** cliente,<br>**quiero** iniciar y cerrar sesión,<br>**para** acceder de forma segura a mi cuenta. | • Con credenciales válidas se concede el acceso a la aplicación.<br>• Con credenciales inválidas se muestra un mensaje de error comprensible.<br>• Al cerrar sesión se invalida el token/sesión de acceso. | RF02 | **Alta** |
| **HU03** | **Como** cliente,<br>**quiero** consultar el catálogo de relojes organizado por categorías o colecciones,<br>**para** conocer los productos disponibles. | • Se listan los relojes con imagen de alta calidad, nombre y precio.<br>• Se puede navegar fluidamente entre categorías o colecciones de lujo. | RF04 | **Alta** |
| **HU04** | **Como** cliente,<br>**quiero** buscar relojes por nombre o características,<br>**para** encontrar rápidamente la pieza de mi interés. | • La búsqueda devuelve los productos que coinciden con el texto ingresado.<br>• Si no existen coincidencias, se informa amablemente al usuario. | RF05 | **Media** |
| **HU05** | **Como** cliente,<br>**quiero** filtrar los relojes por categoría, colección o precio,<br>**para** reducir las opciones según mis preferencias personales. | • Los filtros pueden combinarse entre sí.<br>• El listado se actualiza dinámicamente con los productos que cumplen los filtros. | RF06 | **Media** |
| **HU06** | **Como** cliente,<br>**quiero** ver el detalle de un reloj y su disponibilidad,<br>**para** decidir informadamente si realizo la compra. | • Se visualizan especificaciones técnicas, precio y galería de imágenes.<br>• Se indica claramente si el producto cuenta con stock o está agotado. | RF07<br>RF08 | **Alta** |
| **HU07** | **Como** cliente,<br>**quiero** agregar, modificar y quitar productos de mi carrito,<br>**para** preparar y revisar mi compra antes del pago. | • Se puede ajustar la cantidad sin superar el stock físico disponible.<br>• El subtotal se recalcula automáticamente ante cada cambio. | RF09 | **Alta** |
| **HU08** | **Como** cliente,<br>**quiero** confirmar mi pedido indicando dirección y método de entrega,<br>**para** formalizar y registrar mi compra. | • Antes de confirmar se verifica la disponibilidad de stock en tiempo real.<br>• Se desglosan subtotal, descuentos, costos de envío y monto total.<br>• Se genera un pedido con un código identificador único. | RF10<br>RF11<br>RF12 | **Alta** |
| **HU09** | **Como** cliente,<br>**quiero** realizar el pago simulado de mi pedido,<br>**para** completar la transacción de forma confiable. | • Se permite seleccionar el método de pago deseado.<br>• Se registra el estado de la transacción (aprobado o rechazado).<br>• No se almacenan datos financieros sensibles ni tarjetas reales. | RF13 | **Alta** |
| **HU10** | **Como** cliente,<br>**quiero** consultar el estado de mi pedido,<br>**para** conocer en qué etapa se encuentra hasta su recepción final. | • Se muestran los estados: confirmado, en preparación, en distribución y entregado.<br>• El estado visible permanece sincronizado con el backend. | RF18 | **Alta** |
| **HU11** | **Como** cliente,<br>**quiero** revisar mi historial de compras,<br>**para** consultar detalles de adquisiciones previas. | • Se listan cronológicamente las órdenes del cliente con fecha, total y estado.<br>• Cada cliente tiene visibilidad estricta y exclusiva sobre sus propios pedidos. | RF18<br>RF21 | **Media** |
| **HU12** | **Como** cliente,<br>**quiero** cancelar un pedido que aún no ha sido preparado,<br>**para** desistir de una compra no deseada a tiempo. | • Solo se admite cancelación cuando el pedido está en estado preliminar permitido.<br>• Al cancelar, el inventario retenido se libera y vuelve al stock disponible. | RF11<br>RF14 | **Baja** |

*Nota. RF = Requisito Funcional. Elaboración propia a partir de Grupo 22 (2026).*

---

### 3.2 Rol: Administrador

El administrador gestiona el catálogo de productos, las cuentas y roles de usuarios, y supervisa el flujo operativo general desde la plataforma web.

#### Tabla 3  
*Historias de usuario del rol Administrador*

| ID | Historia de Usuario | Criterios de Aceptación | RF Vinculado | Prioridad |
| :---: | :--- | :--- | :---: | :---: |
| **HU13** | **Como** administrador,<br>**quiero** registrar, modificar y desactivar relojes,<br>**para** mantener actualizado el catálogo de la tienda. | • Se registran nombre, descripción, precio, imagen, categoría y estado.<br>• Los relojes desactivados dejan de mostrarse en la aplicación del cliente. | RF04<br>RF07 | **Alta** |
| **HU14** | **Como** administrador,<br>**quiero** administrar categorías y colecciones,<br>**para** organizar adecuadamente las piezas del catálogo. | • Se pueden dar de alta, editar y eliminar categorías o colecciones.<br>• Se bloquea la eliminación de categorías que contengan relojes asociados. | RF06 | **Media** |
| **HU15** | **Como** administrador,<br>**quiero** gestionar usuarios y asignarles roles,<br>**para** controlar el acceso a cada función del sistema. | • Se permite crear, editar y desactivar lógicamente usuarios.<br>• Cada usuario cuenta con un único rol activo que rige sus permisos.<br>• Se impide la auto-desactivación del administrador en sesión. | RF03<br>RF21 | **Alta** |
| **HU16** | **Como** administrador,<br>**quiero** consultar y gestionar los pedidos,<br>**para** supervisar el flujo integral de ventas. | • Se listan pedidos con filtros por rango de fechas y estado operativo.<br>• Se puede examinar el detalle de productos y el resultado del pago. | RF15 | **Alta** |
| **HU17** | **Como** administrador,<br>**quiero** asignar pedidos a repartidores,<br>**para** organizar de forma eficiente la logística de entrega. | • Solo es posible asignar órdenes con preparación concluida.<br>• El pedido pasa a estar visible de inmediato en la cuenta del repartidor. | RF17 | **Alta** |
| **HU18** | **Como** administrador,<br>**quiero** consultar reportes de ventas, inventario y pedidos,<br>**para** evaluar el desempeño del negocio. | • Se consolidan ventas totales, productos agotados y pedidos completados.<br>• Los reportes admiten filtrado interactivo por rangos de tiempo. | RF20 | **Media** |

*Nota. Elaboración propia a partir de Grupo 22 (2026).*

---

### 3.3 Rol: Encargado de Almacén

El encargado de almacén tiene a su cargo el inventario físico, el abastecimiento y la preparación técnica de los pedidos confirmados.

#### Tabla 4  
*Historias de usuario del rol Encargado de almacén*

| ID | Historia de Usuario | Criterios de Aceptación | RF Vinculado | Prioridad |
| :---: | :--- | :--- | :---: | :---: |
| **HU19** | **Como** encargado de almacén,<br>**quiero** consultar las existencias de cada reloj,<br>**para** conocer el stock disponible en tiempo real. | • Se exhibe el conteo de stock exacto por pieza de relojería.<br>• Dispone de buscador por nombre de reloj o referencia técnica. | RF08 | **Alta** |
| **HU20** | **Como** encargado de almacén,<br>**quiero** registrar entradas y movimientos de inventario,<br>**para** mantener la trazabilidad de los ingresos de fábrica. | • Cada movimiento almacena fecha, tipo de entrada, unidades y responsable.<br>• El stock del producto se actualiza con consistencia transaccional. | RF14 | **Alta** |
| **HU21** | **Como** encargado de almacén,<br>**quiero** recibir alertas de stock bajo,<br>**para** solicitar reposición a manufactura antes del desabastecimiento. | • Se estipula un umbral de stock mínimo por modelo.<br>• Se genera alerta visual cuando la existencia es menor o igual al umbral. | RF14<br>RF20 | **Media** |
| **HU22** | **Como** encargado de almacén,<br>**quiero** ver los pedidos confirmados y actualizar su estado de preparación,<br>**para** prepararlos para despacho. | • Se listan exclusivamente las órdenes confirmadas pendientes de empaque.<br>• Al marcarlo como "preparado", la orden queda lista para asignación a ruta. | RF16 | **Alta** |

*Nota. Elaboración propia a partir de Grupo 22 (2026).*

---

### 3.4 Rol: Repartidor

El repartidor gestiona la última milla, garantizando la entrega segura y puntual de las piezas a los compradores.

#### Tabla 5  
*Historias de usuario del rol Repartidor*

| ID | Historia de Usuario | Criterios de Aceptación | RF Vinculado | Prioridad |
| :---: | :--- | :--- | :---: | :---: |
| **HU23** | **Como** repartidor,<br>**quiero** consultar mis pedidos asignados y la información de entrega,<br>**para** planificar mi ruta de despacho. | • Se filtran únicamente los pedidos asignados a la cuenta del repartidor.<br>• Se detallan dirección exacta, observaciones y teléfono del comprador. | RF17 | **Alta** |
| **HU24** | **Como** repartidor,<br>**quiero** actualizar el estado del pedido y confirmar la entrega,<br>**para** registrar el cierre de la orden. | • Permite cambiar el estado operativo a "en camino" y posteriormente a "entregado".<br>• Al confirmar la entrega, el cliente y el panel web ven el cambio al instante. | RF18<br>RF19 | **Alta** |

*Nota. Elaboración propia a partir de Grupo 22 (2026).*

---

### 3.5 Rol: Gerente

El gerente accede a vistas ejecutivas consolidadas para la evaluación estratégica de ventas e inventario.

#### Tabla 6  
*Historias de usuario del rol Gerente*

| ID | Historia de Usuario | Criterios de Aceptación | RF Vinculado | Prioridad |
| :---: | :--- | :--- | :---: | :---: |
| **HU25** | **Como** gerente,<br>**quiero** consultar las ventas consolidadas y los productos más demandados,<br>**para** identificar tendencias de mercado. | • Se presentan métricas de facturación por período y ranking de piezas.<br>• El perfil cuenta exclusivamente con permisos de lectura (modo consulta). | RF20 | **Media** |
| **HU26** | **Como** gerente,<br>**quiero** supervisar el inventario crítico y el cumplimiento de entregas,<br>**para** detectar incidencias operativas. | • Se identifican relojes con stock crítico o agotados.<br>• Se contrastan pedidos despachados versus entregas pendientes de cierre. | RF20 | **Media** |

*Nota. Elaboración propia a partir de Grupo 22 (2026).*

---

### 3.6 Historias Transversales del Sistema

Estas historias rigen los requisitos no funcionales y de seguridad que aplican a todas las capas de la arquitectura técnica, con énfasis en el backend.

#### Tabla 7  
*Historias transversales del sistema*

| ID | Historia de Usuario | Criterios de Aceptación | RF Vinculado | Prioridad |
| :---: | :--- | :--- | :---: | :---: |
| **HU27** | **Como** sistema,<br>**quiero** restringir el acceso a las funciones según el rol del usuario,<br>**para** proteger la información administrativa y sensible. | • Toda solicitud sin permisos adecuados recibe una respuesta `401/403`.<br>• La autorización se valida rigurosamente en el servidor (decoradores Flask). | RF03<br>RF21 | **Alta** |
| **HU28** | **Como** sistema,<br>**quiero** validar los datos recibidos antes de persistirlos en la base de datos,<br>**para** garantizar la integridad referencial y de inventario. | • Los datos incompletos o maliciosos son rechazados con mensajes estructurados.<br>• Se impide confirmar pedidos si el stock físico no cubre la solicitud. | RF10<br>RF22 | **Alta** |

*Nota. Elaboración propia a partir de Grupo 22 (2026).*

---

## 4. Matriz de Trazabilidad con los Requisitos Funcionales

La **Tabla 8** asegura la cobertura total de los requisitos funcionales identificados en la visión del proyecto respecto a las historias de usuario redactadas.

#### Tabla 8  
*Trazabilidad entre requisitos funcionales e historias de usuario*

| Requisito Funcional | Denominación del Requisito | Historias de Usuario Asociadas |
| :---: | :--- | :--- |
| **RF01** | Registro de usuarios | `HU01` |
| **RF02** | Autenticación y control de sesiones | `HU02` |
| **RF03** | Gestión y asignación de roles | `HU15`, `HU27` |
| **RF04** | Consulta y navegación de catálogo | `HU03`, `HU13` |
| **RF05** | Búsqueda por texto o características | `HU04` |
| **RF06** | Filtrado por colecciones, categorías o precio | `HU05`, `HU14` |
| **RF07** | Visualización de ficha detallada del producto | `HU06`, `HU13` |
| **RF08** | Control y visualización de stock | `HU06`, `HU19` |
| **RF09** | Gestión de carrito de compras | `HU07` |
| **RF10** | Verificación transaccional de stock previo a la compra | `HU08`, `HU28` |
| **RF11** | Generación de pedido con identificador único | `HU08`, `HU12` |
| **RF12** | Cálculo automatizado de subtotales, envío y total | `HU08` |
| **RF13** | Registro y simulación de transacciones de pago | `HU09` |
| **RF14** | Actualización y movimiento de existencias de inventario | `HU12`, `HU20`, `HU21` |
| **RF15** | Consulta y administración global de órdenes | `HU16` |
| **RF16** | Control de empaque y preparación en bodega | `HU22` |
| **RF17** | Asignación y planificación logística de distribución | `HU17`, `HU23` |
| **RF18** | Seguimiento continuo del estado de la orden | `HU10`, `HU11`, `HU24` |
| **RF19** | Confirmación formal y firma de entrega | `HU24` |
| **RF20** | Generación de reportes analíticos para la gestión | `HU18`, `HU21`, `HU25`, `HU26` |
| **RF21** | Seguridad, cifrado y privacidad de accesos | `HU11`, `HU15`, `HU27` |
| **RF22** | Validación estricta y saneamiento de datos en el backend | `HU01`, `HU28` |

*Nota. Cobertura del 100% de los requisitos funcionales del proyecto. Elaboración propia a partir de Grupo 22 (2026).*

---

## 5. Referencias

- Cohn, M. (2004). *User stories applied: For agile software development*. Addison-Wesley.
- Grupo 22. (2026). *Visión del proyecto: Sistema de comercio electrónico para la venta y distribución de relojes (Élan Watches)* [Documento de cátedra no publicado]. Asignatura de Ingeniería de Software (SIS 324), Carrera de Ingeniería de Sistemas, Universidad Mayor, Real y Pontificia de San Francisco Xavier de Chuquisaca, Sucre.
- Wake, B. (2003, 17 de agosto). *INVEST in good stories, and SMART tasks*. XP123. https://xp123.com/invest-in-good-stories-and-smart-tasks/

---
*Élan Watches — Documentación de Ingeniería de Software elaborada con altos estándares de calidad académica y técnica.*
