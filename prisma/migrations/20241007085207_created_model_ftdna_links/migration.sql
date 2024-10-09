-- CreateTable
CREATE TABLE "ftdna_links" (
    "ftdna_links_id" SERIAL NOT NULL,
    "url" VARCHAR(300),
    "target" VARCHAR(300),

    CONSTRAINT "ftdna_links_pkey" PRIMARY KEY ("ftdna_links_id")
);
