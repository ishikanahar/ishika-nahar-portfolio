/**
 * Site-wide identity, positioning, and verified contact links.
 * Empty string or "[Ishika..." placeholders are hidden from public UI.
 */

export const site = {
  name: 'Ishika',
  fullName: 'Ishika Nahar',
  role: 'Applied AI · Data Science · Machine Learning',
  school: 'UC San Diego',
  degree:
    'B.S. Cognitive Science (Machine Learning & Neural Computation) | B.S. Neurobiology',
  graduation: 'Expected June 2027',
  location: 'San Diego, CA',
  origin: 'Kolkata, India',
  tagline: 'Building practical, reliable AI systems from data to product.',
  intro:
    "Vedu I love u. I'm a UC San Diego student working across applied machine learning, data science, and AI product development. I've used behavioral, healthcare, conversational, wearable, and biomedical data to train models, evaluate AI systems, and turn technical results into tools people can use.",
  availability: 'Seeking internships · Fall 2026 & Summer 2027',
  email: 'inahar@ucsd.edu',
  links: {
    linkedin: 'https://www.linkedin.com/in/ishikanahar05/',
    github: 'https://github.com/ishikanahar',
    resume: '/IshikaNahar_Fall2026.pdf',
    scholar: '',
  },
} as const

export const socialLinks = {
  email: site.email,
  linkedin: site.links.linkedin,
  github: site.links.github,
} as const

/** Helper: is a link a real value (not empty, not a placeholder)? */
export function isRealLink(value: string | undefined): value is string {
  return Boolean(value) && !value!.startsWith('[Ishika')
}
