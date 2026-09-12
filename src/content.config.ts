import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Field Notes. One markdown file per post in src/content/blog/.
 *
 * `evidence` is not decoration: CLAIMS.md requires every technical claim to
 * trace to an EVIDENCE.md entry in the mngd repo, so a post declares the entries
 * it rests on in its frontmatter and the post layout prints them. A Field Note
 * with no evidence IDs is allowed — a post about a decision rather than a
 * measurement has none — but it has to be a deliberate empty list rather than a
 * forgotten field.
 */
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    /** Field Note number, printed as the dateline's first half. */
    number: z.number().int().positive().optional(),
    /** Drafts build locally and are excluded from the published list. */
    draft: z.boolean().default(false),
    /** EVIDENCE.md entry IDs this post rests on, e.g. ["E-130"]. */
    evidence: z.array(z.string()).default([]),
    /**
     * The post writes its own built-on section in its own voice, so the layout
     * must not append a second one. CLAIMS.md's rule is that the credits are
     * VISIBLE on every post, not that they are always the same component: a post
     * setting this is promising to carry them itself, and the footer's Built on
     * link is still on the page either way.
     */
    creditsInBody: z.boolean().default(false),
  }),
});

export const collections = { blog };
