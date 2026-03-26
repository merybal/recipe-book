/// <reference types="node" />
import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

// ISO 3166-1 alpha-2 codes with names in English and Spanish
const COUNTRIES: { code: string; name_en: string; name_es: string }[] = [
  { code: 'AD', name_en: 'Andorra', name_es: 'Andorra' },
  {
    code: 'AE',
    name_en: 'United Arab Emirates',
    name_es: 'Emiratos Árabes Unidos',
  },
  { code: 'AF', name_en: 'Afghanistan', name_es: 'Afganistán' },
  { code: 'AG', name_en: 'Antigua and Barbuda', name_es: 'Antigua y Barbuda' },
  { code: 'AL', name_en: 'Albania', name_es: 'Albania' },
  { code: 'AM', name_en: 'Armenia', name_es: 'Armenia' },
  { code: 'AO', name_en: 'Angola', name_es: 'Angola' },
  { code: 'AR', name_en: 'Argentina', name_es: 'Argentina' },
  { code: 'AT', name_en: 'Austria', name_es: 'Austria' },
  { code: 'AU', name_en: 'Australia', name_es: 'Australia' },
  { code: 'AZ', name_en: 'Azerbaijan', name_es: 'Azerbaiyán' },
  {
    code: 'BA',
    name_en: 'Bosnia and Herzegovina',
    name_es: 'Bosnia y Herzegovina',
  },
  { code: 'BB', name_en: 'Barbados', name_es: 'Barbados' },
  { code: 'BD', name_en: 'Bangladesh', name_es: 'Bangladesh' },
  { code: 'BE', name_en: 'Belgium', name_es: 'Bélgica' },
  { code: 'BF', name_en: 'Burkina Faso', name_es: 'Burkina Faso' },
  { code: 'BG', name_en: 'Bulgaria', name_es: 'Bulgaria' },
  { code: 'BH', name_en: 'Bahrain', name_es: 'Baréin' },
  { code: 'BI', name_en: 'Burundi', name_es: 'Burundi' },
  { code: 'BJ', name_en: 'Benin', name_es: 'Benín' },
  { code: 'BN', name_en: 'Brunei', name_es: 'Brunéi' },
  { code: 'BO', name_en: 'Bolivia', name_es: 'Bolivia' },
  { code: 'BR', name_en: 'Brazil', name_es: 'Brasil' },
  { code: 'BS', name_en: 'Bahamas', name_es: 'Bahamas' },
  { code: 'BT', name_en: 'Bhutan', name_es: 'Bután' },
  { code: 'BW', name_en: 'Botswana', name_es: 'Botsuana' },
  { code: 'BY', name_en: 'Belarus', name_es: 'Bielorrusia' },
  { code: 'BZ', name_en: 'Belize', name_es: 'Belice' },
  { code: 'CA', name_en: 'Canada', name_es: 'Canadá' },
  {
    code: 'CD',
    name_en: 'Democratic Republic of the Congo',
    name_es: 'República Democrática del Congo',
  },
  {
    code: 'CF',
    name_en: 'Central African Republic',
    name_es: 'República Centroafricana',
  },
  {
    code: 'CG',
    name_en: 'Republic of the Congo',
    name_es: 'República del Congo',
  },
  { code: 'CH', name_en: 'Switzerland', name_es: 'Suiza' },
  { code: 'CI', name_en: 'Ivory Coast', name_es: 'Costa de Marfil' },
  { code: 'CL', name_en: 'Chile', name_es: 'Chile' },
  { code: 'CM', name_en: 'Cameroon', name_es: 'Camerún' },
  { code: 'CN', name_en: 'China', name_es: 'China' },
  { code: 'CO', name_en: 'Colombia', name_es: 'Colombia' },
  { code: 'CR', name_en: 'Costa Rica', name_es: 'Costa Rica' },
  { code: 'CU', name_en: 'Cuba', name_es: 'Cuba' },
  { code: 'CV', name_en: 'Cape Verde', name_es: 'Cabo Verde' },
  { code: 'CY', name_en: 'Cyprus', name_es: 'Chipre' },
  { code: 'CZ', name_en: 'Czech Republic', name_es: 'República Checa' },
  { code: 'DE', name_en: 'Germany', name_es: 'Alemania' },
  { code: 'DJ', name_en: 'Djibouti', name_es: 'Yibuti' },
  { code: 'DK', name_en: 'Denmark', name_es: 'Dinamarca' },
  { code: 'DM', name_en: 'Dominica', name_es: 'Dominica' },
  {
    code: 'DO',
    name_en: 'Dominican Republic',
    name_es: 'República Dominicana',
  },
  { code: 'DZ', name_en: 'Algeria', name_es: 'Argelia' },
  { code: 'EC', name_en: 'Ecuador', name_es: 'Ecuador' },
  { code: 'EE', name_en: 'Estonia', name_es: 'Estonia' },
  { code: 'EG', name_en: 'Egypt', name_es: 'Egipto' },
  { code: 'ER', name_en: 'Eritrea', name_es: 'Eritrea' },
  { code: 'ES', name_en: 'Spain', name_es: 'España' },
  { code: 'ET', name_en: 'Ethiopia', name_es: 'Etiopía' },
  { code: 'FI', name_en: 'Finland', name_es: 'Finlandia' },
  { code: 'FJ', name_en: 'Fiji', name_es: 'Fiyi' },
  { code: 'FR', name_en: 'France', name_es: 'Francia' },
  { code: 'GA', name_en: 'Gabon', name_es: 'Gabón' },
  { code: 'GB', name_en: 'United Kingdom', name_es: 'Reino Unido' },
  { code: 'GD', name_en: 'Grenada', name_es: 'Granada' },
  { code: 'GE', name_en: 'Georgia', name_es: 'Georgia' },
  { code: 'GH', name_en: 'Ghana', name_es: 'Ghana' },
  { code: 'GM', name_en: 'Gambia', name_es: 'Gambia' },
  { code: 'GN', name_en: 'Guinea', name_es: 'Guinea' },
  { code: 'GQ', name_en: 'Equatorial Guinea', name_es: 'Guinea Ecuatorial' },
  { code: 'GR', name_en: 'Greece', name_es: 'Grecia' },
  { code: 'GT', name_en: 'Guatemala', name_es: 'Guatemala' },
  { code: 'GW', name_en: 'Guinea-Bissau', name_es: 'Guinea-Bisáu' },
  { code: 'GY', name_en: 'Guyana', name_es: 'Guyana' },
  { code: 'HN', name_en: 'Honduras', name_es: 'Honduras' },
  { code: 'HR', name_en: 'Croatia', name_es: 'Croacia' },
  { code: 'HT', name_en: 'Haiti', name_es: 'Haití' },
  { code: 'HU', name_en: 'Hungary', name_es: 'Hungría' },
  { code: 'ID', name_en: 'Indonesia', name_es: 'Indonesia' },
  { code: 'IE', name_en: 'Ireland', name_es: 'Irlanda' },
  { code: 'IL', name_en: 'Israel', name_es: 'Israel' },
  { code: 'IN', name_en: 'India', name_es: 'India' },
  { code: 'IQ', name_en: 'Iraq', name_es: 'Irak' },
  { code: 'IR', name_en: 'Iran', name_es: 'Irán' },
  { code: 'IS', name_en: 'Iceland', name_es: 'Islandia' },
  { code: 'IT', name_en: 'Italy', name_es: 'Italia' },
  { code: 'JM', name_en: 'Jamaica', name_es: 'Jamaica' },
  { code: 'JO', name_en: 'Jordan', name_es: 'Jordania' },
  { code: 'JP', name_en: 'Japan', name_es: 'Japón' },
  { code: 'KE', name_en: 'Kenya', name_es: 'Kenia' },
  { code: 'KG', name_en: 'Kyrgyzstan', name_es: 'Kirguistán' },
  { code: 'KH', name_en: 'Cambodia', name_es: 'Camboya' },
  { code: 'KI', name_en: 'Kiribati', name_es: 'Kiribati' },
  { code: 'KM', name_en: 'Comoros', name_es: 'Comoras' },
  {
    code: 'KN',
    name_en: 'Saint Kitts and Nevis',
    name_es: 'San Cristóbal y Nieves',
  },
  { code: 'KR', name_en: 'South Korea', name_es: 'Corea del Sur' },
  { code: 'KW', name_en: 'Kuwait', name_es: 'Kuwait' },
  { code: 'KZ', name_en: 'Kazakhstan', name_es: 'Kazajistán' },
  { code: 'LA', name_en: 'Laos', name_es: 'Laos' },
  { code: 'LB', name_en: 'Lebanon', name_es: 'Líbano' },
  { code: 'LC', name_en: 'Saint Lucia', name_es: 'Santa Lucía' },
  { code: 'LI', name_en: 'Liechtenstein', name_es: 'Liechtenstein' },
  { code: 'LK', name_en: 'Sri Lanka', name_es: 'Sri Lanka' },
  { code: 'LR', name_en: 'Liberia', name_es: 'Liberia' },
  { code: 'LS', name_en: 'Lesotho', name_es: 'Lesoto' },
  { code: 'LT', name_en: 'Lithuania', name_es: 'Lituania' },
  { code: 'LU', name_en: 'Luxembourg', name_es: 'Luxemburgo' },
  { code: 'LV', name_en: 'Latvia', name_es: 'Letonia' },
  { code: 'LY', name_en: 'Libya', name_es: 'Libia' },
  { code: 'MA', name_en: 'Morocco', name_es: 'Marruecos' },
  { code: 'MC', name_en: 'Monaco', name_es: 'Mónaco' },
  { code: 'MD', name_en: 'Moldova', name_es: 'Moldavia' },
  { code: 'ME', name_en: 'Montenegro', name_es: 'Montenegro' },
  { code: 'MG', name_en: 'Madagascar', name_es: 'Madagascar' },
  { code: 'MH', name_en: 'Marshall Islands', name_es: 'Islas Marshall' },
  { code: 'MK', name_en: 'North Macedonia', name_es: 'Macedonia del Norte' },
  { code: 'ML', name_en: 'Mali', name_es: 'Malí' },
  { code: 'MM', name_en: 'Myanmar', name_es: 'Birmania' },
  { code: 'MN', name_en: 'Mongolia', name_es: 'Mongolia' },
  { code: 'MR', name_en: 'Mauritania', name_es: 'Mauritania' },
  { code: 'MT', name_en: 'Malta', name_es: 'Malta' },
  { code: 'MU', name_en: 'Mauritius', name_es: 'Mauricio' },
  { code: 'MV', name_en: 'Maldives', name_es: 'Maldivas' },
  { code: 'MW', name_en: 'Malawi', name_es: 'Malaui' },
  { code: 'MX', name_en: 'Mexico', name_es: 'México' },
  { code: 'MY', name_en: 'Malaysia', name_es: 'Malasia' },
  { code: 'MZ', name_en: 'Mozambique', name_es: 'Mozambique' },
  { code: 'NA', name_en: 'Namibia', name_es: 'Namibia' },
  { code: 'NE', name_en: 'Niger', name_es: 'Níger' },
  { code: 'NG', name_en: 'Nigeria', name_es: 'Nigeria' },
  { code: 'NI', name_en: 'Nicaragua', name_es: 'Nicaragua' },
  { code: 'NL', name_en: 'Netherlands', name_es: 'Países Bajos' },
  { code: 'NO', name_en: 'Norway', name_es: 'Noruega' },
  { code: 'NP', name_en: 'Nepal', name_es: 'Nepal' },
  { code: 'NR', name_en: 'Nauru', name_es: 'Nauru' },
  { code: 'NZ', name_en: 'New Zealand', name_es: 'Nueva Zelanda' },
  { code: 'OM', name_en: 'Oman', name_es: 'Omán' },
  { code: 'PA', name_en: 'Panama', name_es: 'Panamá' },
  { code: 'PE', name_en: 'Peru', name_es: 'Perú' },
  { code: 'PG', name_en: 'Papua New Guinea', name_es: 'Papúa Nueva Guinea' },
  { code: 'PH', name_en: 'Philippines', name_es: 'Filipinas' },
  { code: 'PK', name_en: 'Pakistan', name_es: 'Pakistán' },
  { code: 'PL', name_en: 'Poland', name_es: 'Polonia' },
  { code: 'PT', name_en: 'Portugal', name_es: 'Portugal' },
  { code: 'PW', name_en: 'Palau', name_es: 'Palaos' },
  { code: 'PY', name_en: 'Paraguay', name_es: 'Paraguay' },
  { code: 'QA', name_en: 'Qatar', name_es: 'Catar' },
  { code: 'RO', name_en: 'Romania', name_es: 'Rumania' },
  { code: 'RS', name_en: 'Serbia', name_es: 'Serbia' },
  { code: 'RU', name_en: 'Russia', name_es: 'Rusia' },
  { code: 'RW', name_en: 'Rwanda', name_es: 'Ruanda' },
  { code: 'SA', name_en: 'Saudi Arabia', name_es: 'Arabia Saudita' },
  { code: 'SB', name_en: 'Solomon Islands', name_es: 'Islas Salomón' },
  { code: 'SC', name_en: 'Seychelles', name_es: 'Seychelles' },
  { code: 'SD', name_en: 'Sudan', name_es: 'Sudán' },
  { code: 'SE', name_en: 'Sweden', name_es: 'Suecia' },
  { code: 'SG', name_en: 'Singapore', name_es: 'Singapur' },
  { code: 'SI', name_en: 'Slovenia', name_es: 'Eslovenia' },
  { code: 'SK', name_en: 'Slovakia', name_es: 'Eslovaquia' },
  { code: 'SL', name_en: 'Sierra Leone', name_es: 'Sierra Leona' },
  { code: 'SM', name_en: 'San Marino', name_es: 'San Marino' },
  { code: 'SN', name_en: 'Senegal', name_es: 'Senegal' },
  { code: 'SO', name_en: 'Somalia', name_es: 'Somalia' },
  { code: 'SR', name_en: 'Suriname', name_es: 'Surinam' },
  { code: 'SS', name_en: 'South Sudan', name_es: 'Sudán del Sur' },
  {
    code: 'ST',
    name_en: 'Sao Tome and Principe',
    name_es: 'Santo Tomé y Príncipe',
  },
  { code: 'SV', name_en: 'El Salvador', name_es: 'El Salvador' },
  { code: 'SY', name_en: 'Syria', name_es: 'Siria' },
  { code: 'SZ', name_en: 'Eswatini', name_es: 'Esuatini' },
  { code: 'TD', name_en: 'Chad', name_es: 'Chad' },
  { code: 'TG', name_en: 'Togo', name_es: 'Togo' },
  { code: 'TH', name_en: 'Thailand', name_es: 'Tailandia' },
  { code: 'TJ', name_en: 'Tajikistan', name_es: 'Tayikistán' },
  { code: 'TL', name_en: 'Timor-Leste', name_es: 'Timor Oriental' },
  { code: 'TM', name_en: 'Turkmenistan', name_es: 'Turkmenistán' },
  { code: 'TN', name_en: 'Tunisia', name_es: 'Túnez' },
  { code: 'TO', name_en: 'Tonga', name_es: 'Tonga' },
  { code: 'TR', name_en: 'Turkey', name_es: 'Turquía' },
  { code: 'TT', name_en: 'Trinidad and Tobago', name_es: 'Trinidad y Tobago' },
  { code: 'TV', name_en: 'Tuvalu', name_es: 'Tuvalu' },
  { code: 'TW', name_en: 'Taiwan', name_es: 'Taiwán' },
  { code: 'TZ', name_en: 'Tanzania', name_es: 'Tanzania' },
  { code: 'UA', name_en: 'Ukraine', name_es: 'Ucrania' },
  { code: 'UG', name_en: 'Uganda', name_es: 'Uganda' },
  { code: 'US', name_en: 'United States', name_es: 'Estados Unidos' },
  { code: 'UY', name_en: 'Uruguay', name_es: 'Uruguay' },
  { code: 'UZ', name_en: 'Uzbekistan', name_es: 'Uzbekistán' },
  { code: 'VA', name_en: 'Vatican City', name_es: 'Ciudad del Vaticano' },
  {
    code: 'VC',
    name_en: 'Saint Vincent and the Grenadines',
    name_es: 'San Vicente y las Granadinas',
  },
  { code: 'VE', name_en: 'Venezuela', name_es: 'Venezuela' },
  { code: 'VN', name_en: 'Vietnam', name_es: 'Vietnam' },
  { code: 'VU', name_en: 'Vanuatu', name_es: 'Vanuatu' },
  { code: 'WS', name_en: 'Samoa', name_es: 'Samoa' },
  { code: 'YE', name_en: 'Yemen', name_es: 'Yemen' },
  { code: 'ZA', name_en: 'South Africa', name_es: 'Sudáfrica' },
  { code: 'ZM', name_en: 'Zambia', name_es: 'Zambia' },
  { code: 'ZW', name_en: 'Zimbabwe', name_es: 'Zimbabue' },
];

const UNITS = [
  {
    abbreviation_singular: 'g',
    abbreviation_plural: null,
    name_en: 'gram',
    name_es: 'gramos',
    synonyms: ['grams', 'gramo', 'gramos', 'g'],
  },
  {
    abbreviation_singular: 'kg',
    abbreviation_plural: null,
    name_en: 'kilogram',
    name_es: 'kilogramo',
    synonyms: ['kilogram', 'kg', 'kilo', 'kilos', 'kilogramo', 'kilogramos'],
  },
  {
    abbreviation_singular: 'pzc',
    abbreviation_plural: 'pzcs',
    name_en: 'pinch',
    name_es: 'pizca',
    synonyms: ['pinch', 'pizca', 'pzc'],
  },
  {
    abbreviation_singular: 'cdta',
    abbreviation_plural: 'cdtas',
    name_en: 'teaspoon',
    name_es: 'cucharadita',
    synonyms: ['teaspoon', 'cdta', 'cucharadita', 'cucharadita de té'],
  },
  {
    abbreviation_singular: 'cda',
    abbreviation_plural: 'cdas',
    name_en: 'tablespoon',
    name_es: 'cucharada sopera',
    synonyms: ['tablespoon', 'cda', 'cucharada', 'cucharada sopera'],
  },
  {
    abbreviation_singular: 'c/n',
    abbreviation_plural: null,
    name_en: 'amount needed',
    name_es: 'cantidad necesaria',
    synonyms: ['amount_needed', 'c/n', 'cantidad necesaria'],
  },
  {
    abbreviation_singular: 'ml',
    abbreviation_plural: null,
    name_en: 'milliliter',
    name_es: 'mililitros',
    synonyms: ['mililiter', 'mililitre', 'ml', 'mililitro', 'mililitros'],
  },
  {
    abbreviation_singular: 'l',
    abbreviation_plural: null,
    name_en: 'liter',
    name_es: 'litros',
    synonyms: ['liter', 'litre', 'l', 'litro', 'litros'],
  },
  {
    abbreviation_singular: 'cc',
    abbreviation_plural: null,
    name_en: 'cubic centimeter',
    name_es: 'centímetros cúbicos',
    synonyms: [
      'cubic_centimeter',
      'cubic centimeter',
      'cubic centimetre',
      'cc',
      'cm3',
      'centímetro cúbico',
      'centímetros cúbicos',
    ],
  },
  {
    abbreviation_singular: 'cubo',
    abbreviation_plural: 'cubos',
    name_en: 'cube',
    name_es: 'cubo',
    synonyms: ['cube', 'cubes', 'cubo', 'cubos'],
  },
  {
    abbreviation_singular: 'taza',
    abbreviation_plural: 'tazas',
    name_en: 'cup',
    name_es: 'taza',
    synonyms: ['cup', 'taza', 'tazas'],
  },
  {
    abbreviation_singular: 'vaso',
    abbreviation_plural: 'vasos',
    name_en: 'glass',
    name_es: 'vaso',
    synonyms: ['glass', 'glasses', 'vaso', 'vasos'],
  },
  {
    abbreviation_singular: 'dado',
    abbreviation_plural: 'dados',
    name_en: 'dice',
    name_es: 'dado',
    synonyms: ['dice', 'dado', 'dados'],
  },
  {
    abbreviation_singular: 'dedal',
    abbreviation_plural: 'dedales',
    name_en: 'thimble',
    name_es: 'dedal',
    synonyms: ['thimble', 'thimbles', 'dedal', 'dedales'],
  },
  {
    abbreviation_singular: 'diente',
    abbreviation_plural: 'dientes',
    name_en: 'clove',
    name_es: 'diente',
    synonyms: ['clove', 'diente', 'dientes'],
  },
  {
    abbreviation_singular: 'rodaja',
    abbreviation_plural: 'rodajas',
    name_en: 'slice',
    name_es: 'rodaja',
    synonyms: ['slice', 'slices', 'rodaja', 'rodajas', 'rebanada', 'rebanadas'],
  },
  {
    abbreviation_singular: 'atado',
    abbreviation_plural: 'atados',
    name_en: 'bunch',
    name_es: 'atado',
    synonyms: ['bunch', 'bunches', 'atado', 'atados', 'ramo', 'ramos'],
  },
  {
    abbreviation_singular: 'plancha',
    abbreviation_plural: 'planchas',
    name_en: 'sheet',
    name_es: 'plancha',
    synonyms: [
      'sheet',
      'sheets',
      'plancha',
      'planchas',
      'lasagna sheet',
      'lasagna sheets',
      'pasta sheet',
      'pasta sheets',
    ],
  },
  {
    abbreviation_singular: 'tapa',
    abbreviation_plural: 'tapas',
    name_en: 'layer',
    name_es: 'tapa',
    synonyms: ['layer', 'layers', 'tapa', 'tapas'],
  },
  {
    abbreviation_singular: 'hoja',
    abbreviation_plural: 'hojas',
    name_en: 'leaf',
    name_es: 'hoja',
    synonyms: ['hoja', 'hojas', 'leaf', 'leaves'],
  },
];

async function main() {
  for (const c of COUNTRIES) {
    await prisma.countries.upsert({
      where: { code: c.code },
      update: { name_en: c.name_en, name_es: c.name_es },
      create: c,
    });
  }

  // Categories
  const sweet = await prisma.categories.upsert({
    where: { name_en: 'Sweet' },
    update: { name_es: 'Dulce' },
    create: { name_en: 'Sweet', name_es: 'Dulce' },
  });
  const savory = await prisma.categories.upsert({
    where: { name_en: 'Savory' },
    update: { name_es: 'Salado' },
    create: { name_en: 'Savory', name_es: 'Salado' },
  });
  const drinks = await prisma.categories.upsert({
    where: { name_en: 'Drinks' },
    update: { name_es: 'Bebida' },
    create: { name_en: 'Drinks', name_es: 'Bebida' },
  });

  // Subcategories (many-to-many with Categories)
  const SUBCATEGORIES: {
    name_en: string;
    name_es: string;
    categoryIds: number[];
  }[] = [
    {
      name_en: 'Pies & Empanadas',
      name_es: 'Tartas & Empanadas',
      categoryIds: [savory.id],
    },
    { name_en: 'Rice', name_es: 'Arroz', categoryIds: [savory.id] },
    { name_en: 'Beef', name_es: 'Carne', categoryIds: [savory.id] },
    { name_en: 'Chicken', name_es: 'Pollo', categoryIds: [savory.id] },
    { name_en: 'Pork', name_es: 'Cerdo', categoryIds: [savory.id] },
    { name_en: 'Muffins', name_es: 'Muffins', categoryIds: [savory.id] },
    {
      name_en: 'Muffins & Cupcakes',
      name_es: 'Muffins & Cupcakes',
      categoryIds: [sweet.id],
    },
    {
      name_en: 'Breakfast',
      name_es: 'Desayunos',
      categoryIds: [sweet.id],
    },
    {
      name_en: 'Cakes & Pies',
      name_es: 'Tortas & Tartas',
      categoryIds: [sweet.id],
    },
    { name_en: 'Ice Cream', name_es: 'Helado', categoryIds: [sweet.id] },
    {
      name_en: 'Cookies, Cookie Sandwiches & Biscuits',
      name_es: 'Cookies, Alfajores & Masitas',
      categoryIds: [sweet.id],
    },
    {
      name_en: 'Scones',
      name_es: 'Scones',
      categoryIds: [sweet.id, savory.id],
    },
    {
      name_en: 'Dressings & Dips',
      name_es: 'Aderezos & Dips',
      categoryIds: [sweet.id, savory.id],
    },
    {
      name_en: 'Sauces',
      name_es: 'Salsas',
      categoryIds: [sweet.id, savory.id],
    },
    {
      name_en: 'Spices & Seasonings',
      name_es: 'Especias & Condimentos',
      categoryIds: [savory.id],
    },
    {
      name_en: 'Pickled & Preserved',
      name_es: 'Conservas',
      categoryIds: [sweet.id, savory.id],
    },
    {
      name_en: 'Croquettes',
      name_es: 'Croquetas',
      categoryIds: [savory.id],
    },
    {
      name_en: 'Finger Food',
      name_es: 'Finger Food',
      categoryIds: [savory.id],
    },
    {
      name_en: 'Side Dishes',
      name_es: 'Guarniciones',
      categoryIds: [savory.id],
    },
    {
      name_en: 'Salads',
      name_es: 'Ensaladas',
      categoryIds: [savory.id],
    },
    {
      name_en: 'Stews, Soups & Casseroles',
      name_es: 'Guisos, Estofados, Sopas & Cazuelas',
      categoryIds: [savory.id],
    },
    {
      name_en: 'Baked Dishes',
      name_es: 'Platos al Horno',
      categoryIds: [savory.id],
    },
    {
      name_en: 'Cold Dishes',
      name_es: 'Platos Fríos',
      categoryIds: [savory.id],
    },
    {
      name_en: 'Sandwiches',
      name_es: 'Sandwiches',
      categoryIds: [savory.id],
    },
    {
      name_en: 'Fajitas & Wraps',
      name_es: 'Fajitas & Wraps',
      categoryIds: [savory.id],
    },
    {
      name_en: 'Pasta',
      name_es: 'Pasta',
      categoryIds: [savory.id],
    },
    {
      name_en: 'Pizza',
      name_es: 'Pizza',
      categoryIds: [savory.id],
    },
    {
      name_en: 'Crackers & Savory Biscuits',
      name_es: 'Galletas, Crackers & Bizcochos',
      categoryIds: [savory.id],
    },
    {
      name_en: 'Fish & Seafood',
      name_es: 'Pescado & Mariscos',
      categoryIds: [savory.id],
    },
    {
      name_en: 'Bruschettas',
      name_es: 'Bruschettas',
      categoryIds: [savory.id],
    },
    {
      name_en: 'Vegetables',
      name_es: 'Vegetales',
      categoryIds: [savory.id],
    },
    {
      name_en: 'Loaf Cakes',
      name_es: 'Budines',
      categoryIds: [sweet.id, savory.id],
    },
    {
      name_en: 'Mousses',
      name_es: 'Mousses',
      categoryIds: [sweet.id, savory.id],
    },
    {
      name_en: 'No-Bake Desserts',
      name_es: 'Postres Fríos',
      categoryIds: [sweet.id],
    },
    {
      name_en: 'Warm Desserts',
      name_es: 'Postres Calientes',
      categoryIds: [sweet.id],
    },
    {
      name_en: 'Brownies & Bars',
      name_es: 'Brownies & Cuadrados',
      categoryIds: [sweet.id],
    },
    {
      name_en: 'Fillings & Frostings',
      name_es: 'Rellenos & Coverturas',
      categoryIds: [sweet.id],
    },
    {
      name_en: 'Fillings',
      name_es: 'Rellenos',
      categoryIds: [savory.id],
    },
    {
      name_en: 'Fruit Desserts',
      name_es: 'Postres de Fruta',
      categoryIds: [sweet.id],
    },
    {
      name_en: 'Doughs',
      name_es: 'Masas',
      categoryIds: [sweet.id],
    },
    {
      name_en: 'Doughs & Breads',
      name_es: 'Masas & Panes',
      categoryIds: [savory.id],
    },
    {
      name_en: 'Recipe Components',
      name_es: 'Componentes de Receta',
      categoryIds: [sweet.id, savory.id],
    },
    // Bebida
    { name_en: 'Cocktails', name_es: 'Tragos', categoryIds: [drinks.id] },
    { name_en: 'Smoothies', name_es: 'Licuados', categoryIds: [drinks.id] },
    { name_en: 'Mocktails', name_es: 'Mocktails', categoryIds: [drinks.id] },
  ];

  // Remove Cookies from Savory (now only in Sweet)
  const cookiesSub = await prisma.subcategories.findUnique({
    where: { name_en: 'Cookies' },
  });
  if (cookiesSub) {
    await prisma.categorySubcategories.deleteMany({
      where: {
        subcategory_id: cookiesSub.id,
        category_id: savory.id,
      },
    });
  }

  // Remove Fillings & Frostings from Savory (now only in Sweet)
  const fillingsFrostingsSub = await prisma.subcategories.findUnique({
    where: { name_en: 'Fillings & Frostings' },
  });
  if (fillingsFrostingsSub) {
    await prisma.categorySubcategories.deleteMany({
      where: {
        subcategory_id: fillingsFrostingsSub.id,
        category_id: savory.id,
      },
    });
  }

  // Merge Cookie Sandwiches & Biscuits into Cookies -> Cookies, Alfajores & Masitas
  const cookieSandwichesBiscuitsSub = await prisma.subcategories.findUnique({
    where: { name_en: 'Cookie Sandwiches & Biscuits' },
  });
  if (cookiesSub && cookieSandwichesBiscuitsSub) {
    // Migrate recipes from Cookie Sandwiches & Biscuits to Cookies
    const recipesToMigrate = await prisma.recipeSubcategories.findMany({
      where: { subcategory_id: cookieSandwichesBiscuitsSub.id },
      select: { recipe_id: true, sort_order: true },
    });
    for (const rs of recipesToMigrate) {
      await prisma.recipeSubcategories.deleteMany({
        where: {
          recipe_id: rs.recipe_id,
          subcategory_id: cookieSandwichesBiscuitsSub.id,
        },
      });
      const existing = await prisma.recipeSubcategories.findFirst({
        where: {
          recipe_id: rs.recipe_id,
          subcategory_id: cookiesSub.id,
        },
      });
      if (!existing) {
        await prisma.recipeSubcategories.create({
          data: {
            recipe_id: rs.recipe_id,
            subcategory_id: cookiesSub.id,
            sort_order: rs.sort_order,
          },
        });
      }
    }
    await prisma.categorySubcategories.deleteMany({
      where: { subcategory_id: cookieSandwichesBiscuitsSub.id },
    });
    await prisma.subcategories.delete({
      where: { id: cookieSandwichesBiscuitsSub.id },
    });
    await prisma.subcategories.update({
      where: { id: cookiesSub.id },
      data: {
        name_en: 'Cookies, Cookie Sandwiches & Biscuits',
        name_es: 'Cookies, Alfajores & Masitas',
      },
    });
  }

  // Migrate Potatoes (Papas) to Vegetables (Vegetales) and remove Potatoes subcategory
  const potatoesSub = await prisma.subcategories.findUnique({
    where: { name_en: 'Potatoes' },
  });
  const vegetablesSub = await prisma.subcategories.findUnique({
    where: { name_en: 'Vegetables' },
  });
  if (potatoesSub && vegetablesSub) {
    const recipesToMigrate = await prisma.recipeSubcategories.findMany({
      where: { subcategory_id: potatoesSub.id },
      select: { recipe_id: true, sort_order: true },
    });
    for (const rs of recipesToMigrate) {
      await prisma.recipeSubcategories.deleteMany({
        where: {
          recipe_id: rs.recipe_id,
          subcategory_id: potatoesSub.id,
        },
      });
      const existing = await prisma.recipeSubcategories.findFirst({
        where: {
          recipe_id: rs.recipe_id,
          subcategory_id: vegetablesSub.id,
        },
      });
      if (!existing) {
        await prisma.recipeSubcategories.create({
          data: {
            recipe_id: rs.recipe_id,
            subcategory_id: vegetablesSub.id,
            sort_order: rs.sort_order,
          },
        });
      }
    }
    await prisma.categorySubcategories.deleteMany({
      where: { subcategory_id: potatoesSub.id },
    });
    await prisma.subcategories.delete({
      where: { id: potatoesSub.id },
    });
  }

  // Remove Pies (Tartas) from Savory (now only in Sweet; savory uses Pies & Empanadas)
  const piesSub = await prisma.subcategories.findUnique({
    where: { name_en: 'Pies' },
  });
  const piesEmpanadasSub = await prisma.subcategories.findUnique({
    where: { name_en: 'Pies & Empanadas' },
  });
  if (piesSub) {
    await prisma.categorySubcategories.deleteMany({
      where: {
        subcategory_id: piesSub.id,
        category_id: savory.id,
      },
    });
  }
  if (piesSub && piesEmpanadasSub) {
    const savoryRecipesWithPies = await prisma.recipeSubcategories.findMany({
      where: {
        subcategory_id: piesSub.id,
        recipe: { category_id: savory.id },
      },
      select: { recipe_id: true, sort_order: true },
    });
    for (const rs of savoryRecipesWithPies) {
      await prisma.recipeSubcategories.deleteMany({
        where: {
          recipe_id: rs.recipe_id,
          subcategory_id: piesSub.id,
        },
      });
      const existing = await prisma.recipeSubcategories.findFirst({
        where: {
          recipe_id: rs.recipe_id,
          subcategory_id: piesEmpanadasSub.id,
        },
      });
      if (!existing) {
        await prisma.recipeSubcategories.create({
          data: {
            recipe_id: rs.recipe_id,
            subcategory_id: piesEmpanadasSub.id,
            sort_order: rs.sort_order,
          },
        });
      }
    }
  }

  // Remove Doughs from Savory (now only in Sweet)
  const doughsSub = await prisma.subcategories.findUnique({
    where: { name_en: 'Doughs' },
  });
  if (doughsSub) {
    await prisma.categorySubcategories.deleteMany({
      where: {
        subcategory_id: doughsSub.id,
        category_id: savory.id,
      },
    });
  }

  // Remove Spices & Seasonings, Croquettes from Sweet (now only in Savory)
  for (const name of ['Spices & Seasonings', 'Croquettes']) {
    const sub = await prisma.subcategories.findUnique({
      where: { name_en: name },
    });
    if (sub) {
      await prisma.categorySubcategories.deleteMany({
        where: {
          subcategory_id: sub.id,
          category_id: sweet.id,
        },
      });
    }
  }

  // Rename legacy subcategory key (upsert uses name_en as unique)
  const browniesLegacy = await prisma.subcategories.findUnique({
    where: { name_en: 'Brownies' },
  });
  if (browniesLegacy) {
    await prisma.subcategories.update({
      where: { id: browniesLegacy.id },
      data: {
        name_en: 'Brownies & Bars',
        name_es: 'Brownies & Cuadrados',
      },
    });
  }

  const breakfastsLegacy = await prisma.subcategories.findUnique({
    where: { name_en: 'Breakfasts' },
  });
  if (breakfastsLegacy) {
    await prisma.subcategories.update({
      where: { id: breakfastsLegacy.id },
      data: {
        name_en: 'Breakfast',
        name_es: 'Desayunos',
      },
    });
  }

  for (const s of SUBCATEGORIES) {
    const sub = await prisma.subcategories.upsert({
      where: { name_en: s.name_en },
      update: { name_es: s.name_es },
      create: { name_en: s.name_en, name_es: s.name_es },
    });
    for (const catId of s.categoryIds) {
      await prisma.categorySubcategories.upsert({
        where: {
          category_id_subcategory_id: {
            category_id: catId,
            subcategory_id: sub.id,
          },
        },
        update: {},
        create: { category_id: catId, subcategory_id: sub.id },
      });
    }
  }

  // Merge legacy Dressings + Dips into Dressings & Dips / Aderezos & Dips
  const dressingsDipsMerged = await prisma.subcategories.findUnique({
    where: { name_en: 'Dressings & Dips' },
  });
  const dipsLegacy = await prisma.subcategories.findUnique({
    where: { name_en: 'Dips' },
  });
  const dressingsLegacy = await prisma.subcategories.findUnique({
    where: { name_en: 'Dressings' },
  });
  if (dressingsDipsMerged && (dipsLegacy || dressingsLegacy)) {
    for (const oldSub of [dipsLegacy, dressingsLegacy].filter(
      (s): s is NonNullable<typeof dipsLegacy> => s != null,
    )) {
      const links = await prisma.recipeSubcategories.findMany({
        where: { subcategory_id: oldSub.id },
      });
      for (const link of links) {
        await prisma.recipeSubcategories.deleteMany({
          where: {
            recipe_id: link.recipe_id,
            subcategory_id: oldSub.id,
          },
        });
        const existing = await prisma.recipeSubcategories.findFirst({
          where: {
            recipe_id: link.recipe_id,
            subcategory_id: dressingsDipsMerged.id,
          },
        });
        if (!existing) {
          await prisma.recipeSubcategories.create({
            data: {
              recipe_id: link.recipe_id,
              subcategory_id: dressingsDipsMerged.id,
              sort_order: link.sort_order,
            },
          });
        }
      }
      await prisma.categorySubcategories.deleteMany({
        where: { subcategory_id: oldSub.id },
      });
      await prisma.subcategories.delete({ where: { id: oldSub.id } });
    }
  }

  // Merge legacy Stews + Soups into Stews, Soups & Casseroles / Guisos, Estofados, Sopas & Cazuelas
  const stewsSoupsMerged = await prisma.subcategories.findUnique({
    where: { name_en: 'Stews, Soups & Casseroles' },
  });
  const stewsLegacy = await prisma.subcategories.findUnique({
    where: { name_en: 'Stews' },
  });
  const soupsLegacy = await prisma.subcategories.findUnique({
    where: { name_en: 'Soups' },
  });
  if (stewsSoupsMerged && (stewsLegacy || soupsLegacy)) {
    for (const oldSub of [stewsLegacy, soupsLegacy].filter(
      (s): s is NonNullable<typeof stewsLegacy> => s != null,
    )) {
      const links = await prisma.recipeSubcategories.findMany({
        where: { subcategory_id: oldSub.id },
      });
      for (const link of links) {
        await prisma.recipeSubcategories.deleteMany({
          where: {
            recipe_id: link.recipe_id,
            subcategory_id: oldSub.id,
          },
        });
        const existing = await prisma.recipeSubcategories.findFirst({
          where: {
            recipe_id: link.recipe_id,
            subcategory_id: stewsSoupsMerged.id,
          },
        });
        if (!existing) {
          await prisma.recipeSubcategories.create({
            data: {
              recipe_id: link.recipe_id,
              subcategory_id: stewsSoupsMerged.id,
              sort_order: link.sort_order,
            },
          });
        }
      }
      await prisma.categorySubcategories.deleteMany({
        where: { subcategory_id: oldSub.id },
      });
      await prisma.subcategories.delete({ where: { id: oldSub.id } });
    }
  }

  // Merge legacy Pies (Tartas) + Cakes (Tortas) into Cakes & Pies / Tortas & Tartas
  const cakesPiesMerged = await prisma.subcategories.findUnique({
    where: { name_en: 'Cakes & Pies' },
  });
  const piesSweetLegacy = await prisma.subcategories.findUnique({
    where: { name_en: 'Pies' },
  });
  const cakesLegacy = await prisma.subcategories.findUnique({
    where: { name_en: 'Cakes' },
  });
  if (cakesPiesMerged && (piesSweetLegacy || cakesLegacy)) {
    for (const oldSub of [piesSweetLegacy, cakesLegacy].filter(
      (s): s is NonNullable<typeof piesSweetLegacy> => s != null,
    )) {
      const links = await prisma.recipeSubcategories.findMany({
        where: { subcategory_id: oldSub.id },
      });
      for (const link of links) {
        await prisma.recipeSubcategories.deleteMany({
          where: {
            recipe_id: link.recipe_id,
            subcategory_id: oldSub.id,
          },
        });
        const existing = await prisma.recipeSubcategories.findFirst({
          where: {
            recipe_id: link.recipe_id,
            subcategory_id: cakesPiesMerged.id,
          },
        });
        if (!existing) {
          await prisma.recipeSubcategories.create({
            data: {
              recipe_id: link.recipe_id,
              subcategory_id: cakesPiesMerged.id,
              sort_order: link.sort_order,
            },
          });
        }
      }
      await prisma.categorySubcategories.deleteMany({
        where: { subcategory_id: oldSub.id },
      });
      await prisma.subcategories.delete({ where: { id: oldSub.id } });
    }
  }

  // Migrate savory recipes from Doughs to Doughs & Breads (Masas & Panes)
  const doughsBreadsSub = await prisma.subcategories.findUnique({
    where: { name_en: 'Doughs & Breads' },
  });
  if (doughsSub && doughsBreadsSub) {
    const savoryRecipesWithDoughs = await prisma.recipeSubcategories.findMany({
      where: {
        subcategory_id: doughsSub.id,
        recipe: { category_id: savory.id },
      },
      select: { recipe_id: true, sort_order: true },
    });
    for (const rs of savoryRecipesWithDoughs) {
      await prisma.recipeSubcategories.deleteMany({
        where: {
          recipe_id: rs.recipe_id,
          subcategory_id: doughsSub.id,
        },
      });
      await prisma.recipeSubcategories.create({
        data: {
          recipe_id: rs.recipe_id,
          subcategory_id: doughsBreadsSub.id,
          sort_order: rs.sort_order,
        },
      });
    }
  }

  // Remove Spices & Seasonings, Croquettes from Sweet recipes (no longer valid for Sweet)
  for (const name of ['Spices & Seasonings', 'Croquettes']) {
    const sub = await prisma.subcategories.findUnique({
      where: { name_en: name },
    });
    if (sub) {
      await prisma.recipeSubcategories.deleteMany({
        where: {
          subcategory_id: sub.id,
          recipe: { category_id: sweet.id },
        },
      });
    }
  }

  // Migrate savory recipes from Fillings & Frostings to Fillings (Rellenos)
  const fillingsSub = await prisma.subcategories.findUnique({
    where: { name_en: 'Fillings' },
  });
  if (fillingsFrostingsSub && fillingsSub) {
    const savoryRecipesWithFillingsFrostings = await prisma.recipeSubcategories.findMany({
      where: {
        subcategory_id: fillingsFrostingsSub.id,
        recipe: { category_id: savory.id },
      },
      select: { recipe_id: true, sort_order: true },
    });
    for (const rs of savoryRecipesWithFillingsFrostings) {
      await prisma.recipeSubcategories.deleteMany({
        where: {
          recipe_id: rs.recipe_id,
          subcategory_id: fillingsFrostingsSub.id,
        },
      });
      await prisma.recipeSubcategories.create({
        data: {
          recipe_id: rs.recipe_id,
          subcategory_id: fillingsSub.id,
          sort_order: rs.sort_order,
        },
      });
    }
  }

  const DIETARY_RESTRICTIONS = [
    { name: 'gluten_free', name_en: 'Gluten free', name_es: 'Sin gluten' },
    { name: 'dairy_free', name_en: 'Dairy free', name_es: 'Sin lactosa' },
    { name: 'vegan', name_en: 'Vegan', name_es: 'Vegano' },
    { name: 'vegetarian', name_en: 'Vegetarian', name_es: 'Vegetariano' },
  ];

  await prisma.dietaryRestrictions.createMany({
    data: DIETARY_RESTRICTIONS,
    skipDuplicates: true,
  });

  for (const u of UNITS) {
    await prisma.units.upsert({
      where: { abbreviation_singular: u.abbreviation_singular },
      update: {
        abbreviation_plural: u.abbreviation_plural,
        name_en: u.name_en,
        name_es: u.name_es,
        synonyms: u.synonyms,
      },
      create: u,
    });
  }

  console.log('Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
