-- CreateEnum
CREATE TYPE "EnumOrderStatus" AS ENUM ('PENDING', 'PAYED');

-- CreateEnum
CREATE TYPE "UnitMeasure" AS ENUM ('PIECES', 'PACKAGING', 'GRAMS', 'METERS');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "name" TEXT NOT NULL DEFAULT 'Не указано',
    "picture" TEXT NOT NULL DEFAULT '/uploads/no-user-image.png',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "images" TEXT[],
    "user_id" TEXT,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "component" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER,
    "images" TEXT[],
    "seller_link" TEXT,
    "remainder" INTEGER,
    "unit_measure" "UnitMeasure" NOT NULL,
    "length" INTEGER,
    "width" INTEGER,
    "height" INTEGER,
    "diameter" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "component_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_component" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "product_id" TEXT NOT NULL,
    "component_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "product_component_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_component" ADD CONSTRAINT "product_component_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_component" ADD CONSTRAINT "product_component_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
