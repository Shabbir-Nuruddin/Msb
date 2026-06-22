-- ============================================================================
-- MSB Smart Revision — Demo accounts (Student / Teacher / Parent)
-- ============================================================================
-- Creates the three demo accounts used by the "Try a demo" buttons on /auth.
-- Safe to run more than once (it skips users that already exist).
--
-- HOW TO RUN: Supabase Dashboard -> SQL Editor -> paste this -> Run.
--   Student: demo.student@msbdubai.com / Demo@Student1
--   Teacher: demo.teacher@msbdubai.com / Demo@Teacher1
--   Parent:  demo.parent@msbdubai.com  / Demo@Parent1
-- ============================================================================

do $$
declare
  v_student uuid;
  v_teacher uuid;
  v_parent  uuid;
begin
  -- ── helper: create a confirmed email user if it doesn't exist ──────────────
  -- STUDENT ------------------------------------------------------------------
  select id into v_student from auth.users where email = 'demo.student@msbdubai.com';
  if v_student is null then
    v_student := gen_random_uuid();
    insert into auth.users (instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data)
    values ('00000000-0000-0000-0000-000000000000', v_student, 'authenticated', 'authenticated',
      'demo.student@msbdubai.com', extensions.crypt('Demo@Student1', extensions.gen_salt('bf')),
      now(), now(), now(), '{"provider":"email","providers":["email"]}',
      jsonb_build_object('role','student','first_name','Demo','last_name','Student','display_name','Demo'));
    insert into auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
    values (v_student::text, v_student,
      jsonb_build_object('sub', v_student::text, 'email', 'demo.student@msbdubai.com'),
      'email', now(), now(), now());
  end if;

  -- TEACHER ------------------------------------------------------------------
  select id into v_teacher from auth.users where email = 'demo.teacher@msbdubai.com';
  if v_teacher is null then
    v_teacher := gen_random_uuid();
    insert into auth.users (instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data)
    values ('00000000-0000-0000-0000-000000000000', v_teacher, 'authenticated', 'authenticated',
      'demo.teacher@msbdubai.com', extensions.crypt('Demo@Teacher1', extensions.gen_salt('bf')),
      now(), now(), now(), '{"provider":"email","providers":["email"]}',
      jsonb_build_object('role','teacher','first_name','Demo','last_name','Teacher','display_name','Demo'));
    insert into auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
    values (v_teacher::text, v_teacher,
      jsonb_build_object('sub', v_teacher::text, 'email', 'demo.teacher@msbdubai.com'),
      'email', now(), now(), now());
  end if;

  -- PARENT -------------------------------------------------------------------
  select id into v_parent from auth.users where email = 'demo.parent@msbdubai.com';
  if v_parent is null then
    v_parent := gen_random_uuid();
    insert into auth.users (instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data)
    values ('00000000-0000-0000-0000-000000000000', v_parent, 'authenticated', 'authenticated',
      'demo.parent@msbdubai.com', extensions.crypt('Demo@Parent1', extensions.gen_salt('bf')),
      now(), now(), now(), '{"provider":"email","providers":["email"]}',
      jsonb_build_object('role','parent','first_name','Demo','last_name','Parent','display_name','Demo'));
    insert into auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
    values (v_parent::text, v_parent,
      jsonb_build_object('sub', v_parent::text, 'email', 'demo.parent@msbdubai.com'),
      'email', now(), now(), now());
  end if;

  -- ── profiles (the handle_new_user trigger created the rows) ────────────────
  insert into public.profiles (id, role, first_name, last_name, onboarded, grade, section, student_id, exam_board)
    values (v_student, 'student', 'Demo', 'Student', true, 'Year 12', 'A', 'MSB-DEMO-1001', 'cie')
  on conflict (id) do update set
    role = 'student', first_name = 'Demo', last_name = 'Student', onboarded = true,
    grade = 'Year 12', section = 'A', student_id = 'MSB-DEMO-1001', exam_board = 'cie';

  insert into public.profiles (id, role, first_name, last_name, onboarded)
    values (v_teacher, 'teacher', 'Demo', 'Teacher', true)
  on conflict (id) do update set role = 'teacher', first_name = 'Demo', last_name = 'Teacher', onboarded = true;

  insert into public.profiles (id, role, first_name, last_name, onboarded)
    values (v_parent, 'parent', 'Demo', 'Parent', true)
  on conflict (id) do update set role = 'parent', first_name = 'Demo', last_name = 'Parent', onboarded = true;

  -- ── give the student some subjects so the dashboard isn't empty ────────────
  delete from public.user_subjects where user_id = v_student;
  insert into public.user_subjects (user_id, subject, unit_number, unit_name, paper_duration_minutes, exam_date, target_grade, current_grade)
  values
    (v_student, 'mathematics', 1, 'Pure Mathematics 1',            110, current_date + 120, 'A',  'B'),
    (v_student, 'chemistry',   1, 'AS Chemistry (Papers 1, 2 & 3)', 230, current_date + 130, 'A',  'C'),
    (v_student, 'physics',     1, 'AS Physics (Papers 1, 2 & 3)',   230, current_date + 140, 'A*', 'B');

  -- ── link the demo parent to the demo student ──────────────────────────────
  insert into public.sia_parent_child (parent_id, child_id)
    values (v_parent, v_student)
  on conflict (parent_id, child_id) do nothing;

  raise notice 'MSB demo accounts ready: student=%, teacher=%, parent=%', v_student, v_teacher, v_parent;
end $$;

-- GoTrue scans these token columns into non-nullable strings; if they are NULL
-- (which a raw SQL insert leaves them), password sign-in fails with HTTP 500.
-- Force them to empty strings for the demo users.
update auth.users set
  confirmation_token         = coalesce(confirmation_token, ''),
  recovery_token             = coalesce(recovery_token, ''),
  email_change               = coalesce(email_change, ''),
  email_change_token_new     = coalesce(email_change_token_new, ''),
  email_change_token_current = coalesce(email_change_token_current, ''),
  phone_change               = coalesce(phone_change, ''),
  phone_change_token         = coalesce(phone_change_token, ''),
  reauthentication_token     = coalesce(reauthentication_token, '')
where email in ('demo.student@msbdubai.com', 'demo.teacher@msbdubai.com', 'demo.parent@msbdubai.com');
