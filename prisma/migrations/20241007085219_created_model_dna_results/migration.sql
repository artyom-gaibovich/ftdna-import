-- CreateTable
CREATE TABLE "dna_results" (
    "dna_results_id" SERIAL NOT NULL,
    "kit_number" VARCHAR(500),
    "name" VARCHAR(500),
    "paternal_ancestor" VARCHAR(500),
    "country" VARCHAR(500),
    "haplogroup" VARCHAR(500),
    "source_url" VARCHAR(500),

    CONSTRAINT "dna_results_pkey" PRIMARY KEY ("dna_results_id")
);
