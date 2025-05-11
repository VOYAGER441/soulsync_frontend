import { Button } from "@/components/ui/button";
import Spline from '@splinetool/react-spline/next';
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white text-gray-900 px-4 sm:px-6 md:px-12 lg:px-24">
      {/* Navigation */}
      <nav className="absolute top-4  flex items-center space-x-3 text-gray-700 text-sm z-10">
        <Image src="/assets/logo1.webp" alt="Soulsync Logo" width={50} height={50} />
        <span className="text-lg sm:text-xl font-semibold text-blue-600">Soulsync</span>
      </nav>

      {/* Spline Scene */}
      <div className="absolute inset-0 z-0 w-full h-full">
        {/* Desktop/Large Screen Scene */}
        <div className="hidden md:block h-full w-full">
          <Spline scene="https://prod.spline.design/LUEnOr4vr6cDHYo2/scene.splinecode" />
        </div>
        {/* Mobile/Small Screen Scene */}
        <div className="block md:hidden h-full w-full">
          <Spline scene="https://prod.spline.design/e1B-TXUnUOGetDLq/scene.splinecode" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-left w-full flex flex-col items-start px-4 sm:px-12">
        {/* Buttons */}
        <div className="mt-70 sm:ms-5 sm:mt-30 flex flex-col sm:flex-row justify-start gap-4 w-full">
          <Link href="/login">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium shadow-md w-full sm:w-auto">
              Start Your Healing Journey →
            </Button>
          </Link>
          <Link href="/seo">
            <Button className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg text-sm font-medium shadow-md w-full sm:w-auto" >
              Learn More →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
