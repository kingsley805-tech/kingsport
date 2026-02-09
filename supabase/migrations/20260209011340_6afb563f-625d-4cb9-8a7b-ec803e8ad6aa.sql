-- Drop the existing SELECT policy that exposes admin data
DROP POLICY IF EXISTS "Users can check their own admin status" ON public.admin_users;

-- Create a restrictive policy that denies all direct SELECT access
-- The is_admin() SECURITY DEFINER function handles admin verification securely
CREATE POLICY "No direct access to admin_users"
  ON public.admin_users
  FOR SELECT
  USING (false);