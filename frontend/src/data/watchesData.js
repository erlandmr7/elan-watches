/**
 * Catálogo demostrativo de piezas maestras de Élan Watches.
 * Cada pieza cuenta con especificaciones de alta relojería suiza.
 */

export const WATCHES = [
  {
    id: 'elan-chronographe-or-rose',
    name: 'Élan Chronographe Royal Or Rose',
    collection: 'Chronographe',
    category: 'cronografos',
    price: 34500,
    priceFormatted: '$34,500 USD',
    tag: 'Pieza Emblemática',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Caja en oro rosa de 18 quilates con esfera pizarra satinada y complicación de cronógrafo flyback.',
    description: 'El Élan Chronographe Royal Or Rose encarna la cúspide de la elegancia deportiva suiza. Equipado con nuestro calibre de manufactura É-880, esta pieza ofrece una complicación de cronógrafo con rueda de pilares y embrague vertical, alojada en una armoniosa caja de oro rosa cepillada y pulida a mano.',
    specs: {
      caja: 'Oro Rosa 18K (41 mm)',
      calibre: 'Manufactura É-880 Automático',
      reserva: '72 horas',
      frecuencia: '28,800 alt/h (4 Hz)',
      rubies: '35 rubíes',
      cristal: 'Zafiro antirreflejante doble curvatura',
      fondo: 'Zafiro transparente con masa oscilante en oro 22K',
      correa: 'Piel de aligátor de Luisiana cosida a mano',
      hermeticidad: '100 metros (10 bar)'
    }
  },
  {
    id: 'elan-tourbillon-squelette',
    name: 'Élan Tourbillon Squelette Noire',
    collection: 'Haute Horlogerie',
    category: 'haute-horlogerie',
    price: 68000,
    priceFormatted: '$68,000 USD',
    tag: 'Edición Limitada (25 pzas)',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Tourbillon volante de un minuto con arquitectura calada a mano en titanio Grado 5 con tratamiento DLC negro.',
    description: 'Una auténtica proeza de microingeniería que desafía la gravedad. Su tourbillon de 60 segundos oscila en el corazón de una jaula esqueletada minuciosamente achaflanada a mano por nuestros maestros relojeros en Ginebra.',
    specs: {
      caja: 'Titanio Grado 5 con revestimiento DLC negro (42 mm)',
      calibre: 'Calibre É-910 Tourbillon de Carga Manual',
      reserva: '90 horas con doble barrilete',
      frecuencia: '21,600 alt/h (3 Hz)',
      rubies: '29 rubíes',
      cristal: 'Cristal de zafiro de alta pureza',
      fondo: 'Zafiro transparente con grabado individual',
      correa: 'Caucho vulcanizado negro con cierre desplegable de titanio',
      hermeticidad: '50 metros (5 bar)'
    }
  },
  {
    id: 'elan-patrimoine-or-blanc',
    name: 'Élan Patrimoine Automatique Platine',
    collection: 'Héritage',
    category: 'clasicos',
    price: 28900,
    priceFormatted: '$28,900 USD',
    tag: 'Clásico Atemporal',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Pureza estética en platino 950 con esfera esmalte Grand Feu y agujas estilo Feuille azuladas al fuego.',
    description: 'La máxima expresión del minimalismo clásico. La esfera de esmalte blanco Grand Feu requiere múltiples cocciones a más de 800 grados Celsius, logrando un brillo eterno y una profundidad que nunca envejecerá.',
    specs: {
      caja: 'Platino 950 macizo (39 mm ultraplana, 7.8 mm)',
      calibre: 'Calibre É-620 Extraplano Automático',
      reserva: '48 horas',
      frecuencia: '28,800 alt/h',
      rubies: '27 rubíes',
      cristal: 'Zafiro abombado con tratamiento antirreflejos',
      fondo: 'Fondo ciego grabado con el blasón de Élan Watches',
      correa: 'Cuero de becerro francés baranil negro',
      hermeticidad: '30 metros (3 bar)'
    }
  },
  {
    id: 'elan-nautique-diver-ceramique',
    name: 'Élan Nautique Diver 300M Céramique',
    collection: 'Plongée Professionnelle',
    category: 'deportivos',
    price: 19800,
    priceFormatted: '$19,800 USD',
    tag: 'Instrumento Profesional',
    image: 'https://images.unsplash.com/photo-1547996160-71dfabb1d252?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Caja monolítica de cerámica de alta tecnología con bisel giratorio unidireccional y válvula de escape de helio.',
    description: 'Diseñado para conquistar las profundidades abisales sin renunciar a la distinción en tierra firme. Su caja cerámica inalterable ante el agua salada protege un movimiento de alta precisión certificado como cronómetro.',
    specs: {
      caja: 'Cerámica técnica negra mate con acentos dorados (43 mm)',
      calibre: 'Calibre É-730 Automático Antimagnético',
      reserva: '65 horas',
      frecuencia: '28,800 alt/h',
      rubies: '31 rubíes',
      cristal: 'Zafiro de 3.5 mm de espesor',
      fondo: 'Titanio Grado 5 atornillado',
      correa: 'Brazalete híbrido de caucho y tela náutica impermeable',
      hermeticidad: '300 metros (30 bar) / Válvula de helio'
    }
  },
  {
    id: 'elan-astrale-lunaire',
    name: 'Élan Astrale Phase de Lune',
    collection: 'Haute Horlogerie',
    category: 'haute-horlogerie',
    price: 46200,
    priceFormatted: '$46,200 USD',
    tag: 'Complicación Céleste',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Fase lunar astronómica precisa durante 122 años con esfera de aventurina que emula el cosmos nocturno.',
    description: 'Una ventana al infinito. La esfera de aventurina natural destella como una noche estrellada en el Jura suizo. El disco de la luna, esculpido en oro macizo, refleja los ciclos lunares con exactitud astronómica sin precedentes.',
    specs: {
      caja: 'Oro Blanco 18K (40.5 mm)',
      calibre: 'Calibre É-940 Complicación Astronómica',
      reserva: '60 horas',
      frecuencia: '28,800 alt/h',
      rubies: '33 rubíes',
      cristal: 'Zafiro con tratamiento antirreflejante selectivo',
      fondo: 'Zafiro con visión de los acabados Côtes de Genève',
      correa: 'Aligátor azul noche con pespuntes en hilo de oro',
      hermeticidad: '50 metros (5 bar)'
    }
  },
  {
    id: 'elan-grand-complication',
    name: 'Élan Grand Complication Chrono-Rattrapante',
    collection: 'Editions Limitées',
    category: 'haute-horlogerie',
    price: 89500,
    priceFormatted: '$89,500 USD',
    tag: 'Obra Maestra (10 pzas)',
    image: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Cronógrafo rattrapante con calendario perpetuo y sonería de paso de hora. El cénit de Élan.',
    description: 'La máxima demostración del virtuosismo técnico de la Maison Élan. Compuesto por más de 540 componentes ensamblados y regulados enteramente a mano por un único maestro relojero galardonado.',
    specs: {
      caja: 'Platino 950 y Oro Rosa 18K bicolor (43 mm)',
      calibre: 'Calibre É-990 Grand Complication de Cuerda Manual',
      reserva: '55 horas',
      frecuencia: '21,600 alt/h',
      rubies: '48 rubíes',
      cristal: 'Zafiro antirreflejante de grado óptico',
      fondo: 'Fondo de zafiro exhibidor con sonería visible',
      correa: 'Cuero genuino cosido en punto de silla a mano',
      hermeticidad: '30 metros (3 bar)'
    }
  }
];

export const BRAND_VALUES = [
  {
    icon: 'Crown',
    title: 'Artesanía Suiza de Alta Gama',
    description: 'Cada componente es ensamblado, pulido y biselado a mano en nuestros talleres del cantón de Ginebra, siguiendo los estándares de la más alta tradición relojera.'
  },
  {
    icon: 'Compass',
    title: 'Precisión Cronométrica Inalterable',
    description: 'Nuestros calibres mecánicos son sometidos a 1,000 horas de rigurosos controles en cinco posiciones espaciales y tres variaciones térmicas para garantizar precisión absoluta.'
  },
  {
    icon: 'Gem',
    title: 'Materiales Nobles & Exclusividad',
    description: 'Oro macizo de 18 quilates, platino 950, titanio de grado aeroespacial y cristales de zafiro inmaculados. Nuestras piezas se producen en series rigurosamente limitadas.'
  },
  {
    icon: 'Award',
    title: 'Garantía & Atelier Vitalicio',
    description: 'Adquirir un reloj Élan es iniciar una relación generacional. Brindamos servicio de mantenimiento vitalicio, certificación de origen y custodia en nuestro registro histórico.'
  }
];

export const BOUTIQUES = [
  {
    city: 'Ginebra (Maison Mère)',
    address: 'Rue du Rhône 42, 1204 Genève, Suiza',
    phone: '+41 22 819 9000',
    hours: 'Lun - Sáb: 10:00 - 18:30 (Cita Previa)'
  },
  {
    city: 'Zúrich',
    address: 'Bahnhofstrasse 28, 8001 Zürich, Suiza',
    phone: '+41 44 211 4500',
    hours: 'Lun - Vie: 10:00 - 19:00'
  },
  {
    city: 'Ciudad de México',
    address: 'Avenida Presidente Masaryk 420, Polanco, CDMX',
    phone: '+52 55 5280 8820',
    hours: 'Mar - Dom: 11:00 - 20:00'
  }
];
