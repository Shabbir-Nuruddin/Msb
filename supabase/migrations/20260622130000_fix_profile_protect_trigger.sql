-- Fix: the protect_profile_sensitive_fields() trigger referenced subscription
-- columns (dodo_subscription_id, dodo_customer_id, subscription_status) that were
-- never added to public.profiles in this schema. Because the trigger runs BEFORE
-- UPDATE for every non-service_role caller, ANY profile update (e.g. finishing
-- onboarding, changing settings) failed with:
--   "record \"new\" has no field \"dodo_subscription_id\""
--
-- MSB Smart Revision has no paid subscriptions, so we keep the guard only for the
-- privilege columns that actually exist (is_admin, is_pro, plan, trial_start_date).

CREATE OR REPLACE FUNCTION public.protect_profile_sensitive_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.role() = 'service_role' THEN
    RETURN NEW;
  END IF;

  NEW.is_admin         := OLD.is_admin;
  NEW.is_pro           := OLD.is_pro;
  NEW.plan             := OLD.plan;
  NEW.trial_start_date := OLD.trial_start_date;

  RETURN NEW;
END;
$$;
