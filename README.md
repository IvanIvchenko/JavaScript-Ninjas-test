To run the application, install Node.js, create a database and enter credentials in the /src/api/config/dbConfig.js file, then enter the following commands into the terminal at parent directory:

# npm install
# npm run packages
# npm run dev

DB structure:

BEGIN;


CREATE TABLE IF NOT EXISTS public."bookData"
(
    id integer NOT NULL DEFAULT nextval('"bookData_id_seq"'::regclass),
    author character varying(255) COLLATE pg_catalog."default",
    year_written integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "bookDatumId" integer,
    CONSTRAINT "bookData_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.books
(
    id integer NOT NULL DEFAULT nextval('books_id_seq'::regclass),
    title character varying(255) COLLATE pg_catalog."default",
    description character varying(255) COLLATE pg_catalog."default",
    image character varying(255) COLLATE pg_catalog."default",
    "imagePath" character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT books_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."bookData"
    ADD CONSTRAINT "bookData_bookDatumId_fkey" FOREIGN KEY ("bookDatumId")
    REFERENCES public.books (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;

END;