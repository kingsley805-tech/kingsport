
-- Fix projects RLS: Change restrictive to permissive policies
DROP POLICY IF EXISTS "Anyone can view projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can update projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can delete projects" ON public.projects;

CREATE POLICY "Anyone can view projects"
ON public.projects FOR SELECT
USING (true);

CREATE POLICY "Admins can insert projects"
ON public.projects FOR INSERT
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update projects"
ON public.projects FOR UPDATE
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete projects"
ON public.projects FOR DELETE
USING (is_admin(auth.uid()));

-- Create about_content table for editable About page
CREATE TABLE public.about_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view about content"
ON public.about_content FOR SELECT
USING (true);

CREATE POLICY "Admins can update about content"
ON public.about_content FOR UPDATE
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can insert about content"
ON public.about_content FOR INSERT
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can delete about content"
ON public.about_content FOR DELETE
USING (is_admin(auth.uid()));

-- Trigger for updated_at
CREATE TRIGGER update_about_content_updated_at
BEFORE UPDATE ON public.about_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed default about content
INSERT INTO public.about_content (section_key, content) VALUES
('bio', '{"text": "Hello! I am a developer.", "mini_bio": "A passionate developer who loves building things."}'),
('skills', '{"items": ["JavaScript", "React", "TypeScript", "Node.js", "Python"]}'),
('hobbies', '{"items": ["Coding", "Reading", "Gaming"]}');

-- Create github_access_requests table for notification/approval system
CREATE TABLE public.github_access_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  requester_name TEXT NOT NULL,
  requester_email TEXT NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  request_type TEXT NOT NULL DEFAULT 'project_code',
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  responded_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.github_access_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a request (INSERT)
CREATE POLICY "Anyone can submit access requests"
ON public.github_access_requests FOR INSERT
WITH CHECK (true);

-- Only admins can view requests
CREATE POLICY "Admins can view access requests"
ON public.github_access_requests FOR SELECT
USING (is_admin(auth.uid()));

-- Only admins can update requests (approve/deny)
CREATE POLICY "Admins can update access requests"
ON public.github_access_requests FOR UPDATE
USING (is_admin(auth.uid()));

-- Only admins can delete requests
CREATE POLICY "Admins can delete access requests"
ON public.github_access_requests FOR DELETE
USING (is_admin(auth.uid()));
