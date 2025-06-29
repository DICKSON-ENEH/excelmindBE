-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('APPROVED', 'DECLINED', 'PENDING');

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "lecturerId" INTEGER NOT NULL,
    "syllabus" TEXT,
    "status" "CourseStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_lecturerId_fkey" FOREIGN KEY ("lecturerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
