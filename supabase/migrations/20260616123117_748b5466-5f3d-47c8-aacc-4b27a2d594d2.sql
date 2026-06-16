CREATE TABLE public.project_access_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id TEXT NOT NULL UNIQUE,
  project_name TEXT,
  code TEXT NOT NULL,
  github_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_access_codes TO authenticated;
GRANT ALL ON public.project_access_codes TO service_role;

ALTER TABLE public.project_access_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage project access codes"
ON public.project_access_codes
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_project_access_codes_updated_at
BEFORE UPDATE ON public.project_access_codes
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
