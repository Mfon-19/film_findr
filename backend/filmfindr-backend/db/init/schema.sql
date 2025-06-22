ALTER SCHEMA public OWNER TO filmfindr_user;
CREATE TABLE public.content (
                                id character varying(255) NOT NULL,
                                item_type character varying(255) NOT NULL,
                                title character varying(255) NOT NULL,
                                rating double precision,
                                overview character varying(255),
                                created_at timestamp with time zone DEFAULT now(),
                                poster_path character varying(255),
                                CONSTRAINT content_item_type_check CHECK (((item_type)::text = ANY (ARRAY['movie'::text, 'show'::text])))
);


ALTER TABLE public.content OWNER TO filmfindr_user;

--
-- Name: TABLE content; Type: COMMENT; Schema: public; Owner: filmfindr_user
--

COMMENT ON TABLE public.content IS 'Canonical catalog of all movies & shows';


--
-- Name: COLUMN content.id; Type: COMMENT; Schema: public; Owner: filmfindr_user
--

COMMENT ON COLUMN public.content.id IS 'Prefixed external ID (mov…, sho…)';


--
-- Name: COLUMN content.item_type; Type: COMMENT; Schema: public; Owner: filmfindr_user
--

COMMENT ON COLUMN public.content.item_type IS 'Discriminator: movie | show';


--
-- Name: users; Type: TABLE; Schema: public; Owner: filmfindr_user
--

CREATE TABLE public.users (
                              id uuid NOT NULL,
                              email character varying(255) NOT NULL,
                              password_hash character varying(255) NOT NULL,
                              roles character varying(255),
                              username character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO filmfindr_user;

--
-- Name: watchlist; Type: TABLE; Schema: public; Owner: filmfindr_user
--

CREATE TABLE public.watchlist (
                                  user_id uuid NOT NULL,
                                  content_id character varying(15) NOT NULL,
                                  created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.watchlist OWNER TO filmfindr_user;

--
-- Name: TABLE watchlist; Type: COMMENT; Schema: public; Owner: filmfindr_user
--

COMMENT ON TABLE public.watchlist IS 'Many‑to‑many link: users → saved movies/shows';


--
-- Name: content content_pkey; Type: CONSTRAINT; Schema: public; Owner: filmfindr_user
--

ALTER TABLE ONLY public.content
    ADD CONSTRAINT content_pkey PRIMARY KEY (id);


--
-- Name: users uk6dotkott2kjsp8vw4d0m25fb7; Type: CONSTRAINT; Schema: public; Owner: filmfindr_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk6dotkott2kjsp8vw4d0m25fb7 UNIQUE (email);


--
-- Name: users ukr43af9ap4edm43mmtq01oddj6; Type: CONSTRAINT; Schema: public; Owner: filmfindr_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT ukr43af9ap4edm43mmtq01oddj6 UNIQUE (username);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: filmfindr_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: watchlist watchlist_pkey; Type: CONSTRAINT; Schema: public; Owner: filmfindr_user
--

ALTER TABLE ONLY public.watchlist
    ADD CONSTRAINT watchlist_pkey PRIMARY KEY (user_id, content_id);


--
-- Name: watchlist watchlist_content_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: filmfindr_user
--

ALTER TABLE ONLY public.watchlist
    ADD CONSTRAINT watchlist_content_id_fkey FOREIGN KEY (content_id) REFERENCES public.content(id) ON DELETE CASCADE;


--
-- Name: watchlist watchlist_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: filmfindr_user
--

ALTER TABLE ONLY public.watchlist
    ADD CONSTRAINT watchlist_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;