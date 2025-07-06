import Scene from '@/components/Scene';
import AdvancedScene from '@/components/AdvancedScene';
import ClientOnly from '@/components/ClientOnly';

export default function ThreeDPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">React Three Fiber Demo</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[80vh]">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600">
              <h2 className="text-xl font-bold text-white">Basic Scene</h2>
              <p className="text-blue-100 text-sm">Interactive spinning boxes - click to scale, hover to change color</p>
            </div>
            <div className="h-full">
              <ClientOnly fallback={<div className="flex items-center justify-center h-full">Loading 3D scene...</div>}>
                <Scene />
              </ClientOnly>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-green-500 to-teal-600">
              <h2 className="text-xl font-bold text-white">Advanced Scene</h2>
              <p className="text-green-100 text-sm">Sphere with environment lighting, shadows, and orbit controls</p>
            </div>
            <div className="h-full">
              <ClientOnly fallback={<div className="flex items-center justify-center h-full">Loading 3D scene...</div>}>
                <AdvancedScene />
              </ClientOnly>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Built with Next.js 15 + React Three Fiber v9 + TypeScript
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="/" 
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              ← Back to Home
            </a>
            <a 
              href="https://r3f.docs.pmnd.rs/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              R3F Documentation →
            </a>
          </div>
        </div>
      </div>
    </main>
  );
} 