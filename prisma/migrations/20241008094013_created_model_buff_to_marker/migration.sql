
-- CreateTable
CREATE TABLE "buff_to_marker" (
    "buff_id" INTEGER NOT NULL,
    "value" TEXT,
    "mkid" INTEGER NOT NULL,

    CONSTRAINT "buff_to_marker_pkey" PRIMARY KEY ("mkid","buff_id")
);

-- AddForeignKey
ALTER TABLE "buff_to_marker" ADD CONSTRAINT "buff_to_marker_buff_id_fkey" FOREIGN KEY ("buff_id") REFERENCES "buff"("buff_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buff_to_marker" ADD CONSTRAINT "buff_to_marker_mkid_fkey" FOREIGN KEY ("mkid") REFERENCES "marker"("mkid") ON DELETE CASCADE ON UPDATE CASCADE;
