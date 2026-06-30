CREATE TABLE public.users (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    is_email_verified boolean NOT NULL DEFAULT false,
    settings jsonb NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    last_logged_out bigint DEFAULT '0'::bigint,
    last_logged_in_at timestamp with time zone NOT NULL,
    salt text NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

CREATE UNIQUE INDEX user_email_idx
    ON public.users USING btree
    (email)
    TABLESPACE pg_default;
