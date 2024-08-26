-- CreateTable
CREATE TABLE "Qualification" (
    "id" SERIAL NOT NULL,
    "donationId" TEXT NOT NULL,
    "donatorId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "qualityCalificationId" INTEGER NOT NULL,
    "timeCalificationId" INTEGER NOT NULL,
    "packagingCalificationId" INTEGER NOT NULL,
    "communicationCalificationId" INTEGER NOT NULL,
    "generalScore" DOUBLE PRECISION NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Qualification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QualityCalification" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "comments" TEXT NOT NULL,

    CONSTRAINT "QualityCalification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeCalification" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "comments" TEXT NOT NULL,

    CONSTRAINT "TimeCalification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackagingCalification" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "comments" TEXT NOT NULL,

    CONSTRAINT "PackagingCalification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunicationCalification" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "comments" TEXT NOT NULL,

    CONSTRAINT "CommunicationCalification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Qualification_qualityCalificationId_key" ON "Qualification"("qualityCalificationId");

-- CreateIndex
CREATE UNIQUE INDEX "Qualification_timeCalificationId_key" ON "Qualification"("timeCalificationId");

-- CreateIndex
CREATE UNIQUE INDEX "Qualification_packagingCalificationId_key" ON "Qualification"("packagingCalificationId");

-- CreateIndex
CREATE UNIQUE INDEX "Qualification_communicationCalificationId_key" ON "Qualification"("communicationCalificationId");

-- AddForeignKey
ALTER TABLE "Qualification" ADD CONSTRAINT "Qualification_qualityCalificationId_fkey" FOREIGN KEY ("qualityCalificationId") REFERENCES "QualityCalification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qualification" ADD CONSTRAINT "Qualification_timeCalificationId_fkey" FOREIGN KEY ("timeCalificationId") REFERENCES "TimeCalification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qualification" ADD CONSTRAINT "Qualification_packagingCalificationId_fkey" FOREIGN KEY ("packagingCalificationId") REFERENCES "PackagingCalification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qualification" ADD CONSTRAINT "Qualification_communicationCalificationId_fkey" FOREIGN KEY ("communicationCalificationId") REFERENCES "CommunicationCalification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
