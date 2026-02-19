/**
 * Spacing scale for consistent margin and padding.
 * Maps to Chakra's default scale: 1=4px, 2=8px, 3=12px, 4=16px, 5=20px, 6=24px, 8=32px, 10=40px
 */
export const spacing = {
  /** Page horizontal padding */
  page: 6,
  /** Page top padding */
  pageVertical: 10,
  /** Card/surface inner padding */
  card: 10,
  /** Between form sections */
  section: 6,
  /** Vertical stack gap (e.g. form fields) */
  stack: 6,
  /** Vertical stack gap in cards (e.g. not-found content) */
  stackCard: 8,
  /** Margin below a field block (label + input) */
  field: 6,
  /** Margin below a label */
  label: 1,
  /** Gap between icon and text (tight) */
  inline: 2,
  /** Gap between logo and title, or small inline groups */
  inlineTight: 3,
  /** Small vertical gap (e.g. between form footer and link) */
  footer: 2,
} as const
