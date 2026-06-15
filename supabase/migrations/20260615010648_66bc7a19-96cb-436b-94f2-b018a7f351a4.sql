
-- Projects table
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  url text,
  github_url text,
  tools text[] NOT NULL DEFAULT '{}',
  visible boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view visible projects" ON public.projects FOR SELECT USING (visible = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage projects" ON public.projects FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Networking tools table
CREATE TABLE public.networking_tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  image_url text,
  external_url text,
  visible boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.networking_tools TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.networking_tools TO authenticated;
GRANT ALL ON public.networking_tools TO service_role;
ALTER TABLE public.networking_tools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view visible tools" ON public.networking_tools FOR SELECT USING (visible = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage tools" ON public.networking_tools FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_networking_tools_updated_at BEFORE UPDATE ON public.networking_tools FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Section content table
CREATE TABLE public.section_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text NOT NULL UNIQUE,
  title text,
  subtitle text,
  body text,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.section_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.section_content TO authenticated;
GRANT ALL ON public.section_content TO service_role;
ALTER TABLE public.section_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view visible sections" ON public.section_content FOR SELECT USING (visible = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage sections" ON public.section_content FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_section_content_updated_at BEFORE UPDATE ON public.section_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed default sections
INSERT INTO public.section_content (section_key, title, subtitle, body) VALUES
  ('hero', 'Welcome', 'Building modern web experiences', 'Edit this from the admin panel.'),
  ('about', 'About', 'A bit about me', 'Edit this from the admin panel.'),
  ('projects', 'Projects', 'Selected work', NULL),
  ('networking', 'Networking', 'Tools I use', NULL),
  ('contact', 'Contact', 'Get in touch', NULL)
ON CONFLICT (section_key) DO NOTHING;
