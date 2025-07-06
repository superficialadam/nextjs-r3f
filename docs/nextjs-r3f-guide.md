# Next.js 15.x + React Three Fiber with TypeScript Implementation Guide

## 🚀 Compatibility Status (Updated July 2025)

✅ **FULLY COMPATIBLE** - React Three Fiber v9.x works perfectly with Next.js 15.x and TypeScript

### Version Requirements
- **Next.js**: 15.3+ or 15.4+
- **React**: 19.x (included with Next.js 15)
- **React Three Fiber**: 9.x (latest: 9.2.0)
- **TypeScript**: Fully supported

### Important Note
**Do NOT use React Three Fiber v8.x with Next.js 15** - this causes the infamous `ReactCurrentOwner` error. Always use v9.x for React 19 compatibility.

## 📦 Installation Steps

### 1. Create Next.js 15 Project (if needed)
```bash
npx create-next-app@latest my-3d-app --typescript --tailwind --eslint --app
cd my-3d-app
```

### 2. Install React Three Fiber Ecosystem
```bash
# Core React Three Fiber (React 19 compatible)
npm install @react-three/fiber@latest

# Essential Three.js library
npm install three

# TypeScript definitions for Three.js
npm install --save-dev @types/three

# Optional but recommended: Drei helpers
npm install @react-three/drei@latest

# Optional: Post-processing effects
npm install @react-three/postprocessing@latest
```

### 3. Update Next.js Configuration

Create or update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    });
    return config;
  },
};

module.exports = nextConfig;
```

For TypeScript config (`next.config.ts`):

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['three'],
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    });
    return config;
  },
};

export default nextConfig;
```

## 🔧 TypeScript Setup

### 1. Create TypeScript Declaration File

Create `types/three.d.ts`:

```typescript
import { ThreeElements } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}
```

### 2. Update tsconfig.json

Ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "types": ["three"],
    "moduleResolution": "bundler"
  },
  "include": [
    "types/**/*.d.ts"
  ]
}
```

## 🎨 Implementation Examples

### 1. Basic 3D Scene Component

Create `components/Scene.tsx`:

```typescript
'use client';

import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

interface BoxProps extends ThreeElements['mesh'] {
  position?: [number, number, number];
}

function Box(props: BoxProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
    }
  });

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export default function Scene() {
  return (
    <div className="w-full h-screen">
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          decay={0} 
          intensity={Math.PI} 
        />
        <pointLight 
          position={[-10, -10, -10]} 
          decay={0} 
          intensity={Math.PI} 
        />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </div>
  );
}
```

### 2. Advanced Scene with Drei Helpers

Create `components/AdvancedScene.tsx`:

```typescript
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';

function Sphere() {
  return (
    <mesh position={[0, 1, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#ff6b6b" roughness={0.1} />
    </mesh>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#f0f0f0" />
    </mesh>
  );
}

export default function AdvancedScene() {
  return (
    <div className="w-full h-screen">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 60 }}>
        <Suspense fallback={null}>
          <Environment preset="sunset" />
          <Sphere />
          <Ground />
          <ContactShadows 
            position={[0, -1, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={1.5} 
            far={10} 
          />
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

### 3. Page Implementation

Create `app/3d/page.tsx`:

```typescript
import Scene from '@/components/Scene';
import AdvancedScene from '@/components/AdvancedScene';

export default function ThreeDPage() {
  return (
    <main className="min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        <div className="border-r">
          <h2 className="p-4 text-xl font-bold">Basic Scene</h2>
          <Scene />
        </div>
        <div>
          <h2 className="p-4 text-xl font-bold">Advanced Scene</h2>
          <AdvancedScene />
        </div>
      </div>
    </main>
  );
}
```

### 4. Client-Side Only Component (if needed)

For SSR issues, create `components/ClientOnly.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return fallback;
  }

  return <>{children}</>;
}
```

Then wrap your 3D components:

```typescript
import ClientOnly from '@/components/ClientOnly';
import Scene from '@/components/Scene';

export default function Page() {
  return (
    <ClientOnly fallback={<div>Loading 3D scene...</div>}>
      <Scene />
    </ClientOnly>
  );
}
```

## 🔍 Troubleshooting

### Common Issues & Solutions

1. **"ReactCurrentOwner" Error**
   - **Cause**: Using React Three Fiber v8.x with React 19
   - **Solution**: Upgrade to `@react-three/fiber@latest` (v9.x)

2. **Three.js Import Errors**
   - **Cause**: Missing transpilation config
   - **Solution**: Add `transpilePackages: ['three']` to next.config.js

3. **Hydration Errors**
   - **Cause**: SSR mismatch with WebGL content
   - **Solution**: Use `ClientOnly` wrapper or `dynamic` imports with `ssr: false`

4. **TypeScript Errors**
   - **Cause**: Missing type definitions
   - **Solution**: Install `@types/three` and configure global types

### Performance Optimization

```typescript
// Use React.memo for static components
import { memo } from 'react';

const OptimizedBox = memo(function Box(props: BoxProps) {
  // Component logic
});

// Limit frame rate if needed
useFrame((state, delta) => {
  // Limit to 30fps
  if (state.clock.elapsedTime % (1/30) < delta) {
    // Update logic
  }
});
```

## 📚 Additional Resources

- [React Three Fiber Documentation](https://r3f.docs.pmnd.rs/)
- [Three.js Documentation](https://threejs.org/docs/)
- [Drei Helpers](https://github.com/pmndrs/drei)
- [Official Next.js Starter](https://github.com/pmndrs/react-three-next)

## 🎯 Best Practices

1. **Always use the latest versions** of React Three Fiber with Next.js 15
2. **Wrap 3D components in Suspense** for better loading states
3. **Use dynamic imports** for heavy 3D assets
4. **Implement proper error boundaries** for WebGL context issues
5. **Test on different devices** for performance and compatibility

## ✅ Verification Checklist

- [ ] Next.js 15.3+ installed
- [ ] React Three Fiber v9.x installed
- [ ] TypeScript types configured
- [ ] next.config.js updated with transpilePackages
- [ ] Basic 3D scene renders without errors
- [ ] No ReactCurrentOwner errors in console
- [ ] Proper TypeScript intelliSense for Three.js elements

---

**Status**: ✅ Ready for production with Next.js 15.x + React Three Fiber v9.x + TypeScript