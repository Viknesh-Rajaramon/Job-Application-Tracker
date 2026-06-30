CREATE TABLE public.applications (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    company text NOT NULL,
    role text NOT NULL,
    req_id text,
    location text NOT NULL,
    status text NOT NULL,
    link text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    user_id uuid NOT NULL,
    CONSTRAINT app_pkey PRIMARY KEY (id),
    CONSTRAINT applications_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) TABLESPACE pg_default;

CREATE INDEX application_user_idx
    ON public.applications USING btree
    (user_id)
    TABLESPACE pg_DEFAULT;

CREATE INDEX application_user_status_idx
    ON public.applications USING btree
    (user_id, status)
    TABLESPACE pg_DEFAULT;
