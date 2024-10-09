-- CreateTable
CREATE TABLE "buff" (
    "buff_id" SERIAL,
    "kit_number" VARCHAR(200),
    "name" VARCHAR(200),
    "paternal_ancestor_name" VARCHAR(200),
    "country" VARCHAR(200),
    "haplogroup" VARCHAR(200),

    CONSTRAINT "buff_pkey" PRIMARY KEY ("buff_id")
);
