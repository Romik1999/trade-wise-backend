/*
  Warnings:

  - Changed the type of `unit_measure` on the `component` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EnumUnitMeasure" AS ENUM ('PIECES', 'PACKAGING', 'GRAMS', 'METERS');

-- AlterTable
ALTER TABLE "component" DROP COLUMN "unit_measure",
ADD COLUMN     "unit_measure" "EnumUnitMeasure" NOT NULL;

-- DropEnum
DROP TYPE "UnitMeasure";
