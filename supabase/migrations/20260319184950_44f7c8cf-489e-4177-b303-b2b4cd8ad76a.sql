
-- Create update_updated_at function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- User roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  url TEXT NOT NULL DEFAULT '',
  github_url TEXT NOT NULL DEFAULT '',
  tools TEXT[] NOT NULL DEFAULT '{}',
  display_order INT NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view visible projects" ON public.projects
  FOR SELECT USING (visible = true);
CREATE POLICY "Admins can do everything with projects" ON public.projects
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Networking tools table
CREATE TABLE public.networking_tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  external_url TEXT,
  display_order INT NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.networking_tools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view visible tools" ON public.networking_tools
  FOR SELECT USING (visible = true);
CREATE POLICY "Admins can do everything with tools" ON public.networking_tools
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_networking_tools_updated_at
  BEFORE UPDATE ON public.networking_tools
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Section content table
CREATE TABLE public.section_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT NOT NULL UNIQUE,
  title TEXT,
  subtitle TEXT,
  body TEXT,
  visible BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.section_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view visible sections" ON public.section_content
  FOR SELECT USING (visible = true);
CREATE POLICY "Admins can do everything with sections" ON public.section_content
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_section_content_updated_at
  BEFORE UPDATE ON public.section_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed default section content
INSERT INTO public.section_content (section_key, title, subtitle, body) VALUES
  ('hero', 'Kingsley Atta Yeboah', 'Software Engineer · Network Engineer · IT Technician', 'Building robust software, designing resilient networks, and crafting immersive 3D experiences from Accra, Ghana.'),
  ('about', 'Crafting Digital Excellence', 'About Me', 'Based in Accra, Ghana, I bring a multidisciplinary approach to technology — combining software engineering, networking infrastructure, and hands-on IT expertise to deliver end-to-end solutions.'),
  ('projects', 'Software Projects', 'Portfolio', NULL),
  ('networking', 'Networking Tools & Expertise', 'Infrastructure', NULL),
  ('contact', 'Get In Touch', 'Contact', 'Have a project in mind or want to discuss opportunities? Reach out and let''s build something great together.');
