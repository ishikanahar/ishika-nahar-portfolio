/**
 * ------------------------------------------------------------------
 * SITE CONFIG  —  Ishika, edit this file first.
 * ------------------------------------------------------------------
 * These values control your name, tagline, and all contact links.
 * Anything wrapped in "[Ishika: ...]" is a placeholder for you to
 * replace. Leave a link as an empty string ("") to hide that link.
 * ------------------------------------------------------------------
 */

export const site = {
  name: 'Ishika',
  // Full name shown in the footer / résumé. Add your last name.
  fullName: 'Ishika [Ishika: add last name]',
  role: 'Applied AI · Data Science · Machine Learning',
  school: 'UC San Diego',
  location: '[Ishika: City, State]',
  tagline: 'Building practical, reliable AI systems from data to product.',
  intro:
    "I'm a UC San Diego student working across applied machine learning, data science, and AI product development. I've used behavioral, healthcare, conversational, and biomedical data to train models, evaluate AI systems, and turn technical results into tools people can use.",
  // Availability banner shown in hero. Set to "" to hide.
  availability: 'Seeking internships · Fall 2026 & Summer 2027',

  // ---- Contact & social links -------------------------------------
  // Replace the placeholders. Set any value to "" to hide that link.
  email: '[Ishika: your@email.com]',
  links: {
    linkedin: '[Ishika: https://linkedin.com/in/your-handle]',
    github: '[Ishika: https://github.com/your-handle]',
    // Put your résumé PDF in the /public folder and point here,
    // e.g. '/ishika-resume.pdf'
    resume: '[Ishika: /ishika-resume.pdf]',
    scholar: '', // optional Google Scholar
  },
} as const

/** Helper: is a link a real value (not empty, not a placeholder)? */
export function isRealLink(value: string | undefined): value is string {
  return Boolean(value) && !value!.startsWith('[Ishika')
}
