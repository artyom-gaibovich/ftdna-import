-- CreateTable
CREATE TABLE "marker" (
    "mkid" SERIAL NOT NULL,
    "mktype" INTEGER NOT NULL,
    "mkname" VARCHAR(200) NOT NULL,
    "mkorigname" VARCHAR(200),
    "parts" INTEGER NOT NULL,
    "mkcmt" VARCHAR(1000),

    CONSTRAINT "marker_pkey" PRIMARY KEY ("mkid")
);

-- CreateIndex
CREATE UNIQUE INDEX "marker_mkname_key" ON "marker"("mkname");
