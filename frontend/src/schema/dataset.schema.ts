import z from "zod";

export const SearchDatasetSchema = z.object({
  query: z.string().default(""),
  limit: z.number().default(1000),
  offset: z.number().default(0),
  groups: z.array(z.string()).default([]),
  orgs: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  sort: z.string().optional(),
  include_private: z.boolean().optional(),
});

export const ResourceSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  package_id: z.string(),
  type: z.enum(["file", "doc"]),
  url: z.string().url(),
});

export const DatasetSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .regex(
      /^[^\(\) +]+$/,
      "The name cant have spaces nor the dot(.) character, it needs to be URL Compatible"
    ),
  title: z.string(),
  notes: z.string().optional().nullable(),
  tags: z.array(z.string()),
  userRepresents: z.boolean().default(false),
  sources: z.array(z.object({
    name: z.string(),
    url: z.string().url().optional(),
  })),
  language: z.string().optional(),
  referencePeriodStart: z.date(),
  referencePeriodEnd: z.date(),
  countries: z.array(z.string()).default([]),
  region: z.string().optional(),
  license: z.string().optional(),
  private: z.boolean().default(true),
  resources: z.array(ResourceSchema),
});

export type SearchDatasetType = z.infer<typeof SearchDatasetSchema>;
export type DatasetFormType = z.infer<typeof DatasetSchema>;
export type ResourceFormType = z.infer<typeof ResourceSchema>;
