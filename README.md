# Next.js 15 + React Three Fiber + TypeScript

A modern Next.js application showcasing React Three Fiber integration with TypeScript support.

## 🚀 Features

- **Next.js 15.3.4** with React 19
- **React Three Fiber v9.x** for 3D graphics
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **Interactive 3D scenes** with animations
- **Client-side rendering** for WebGL content

## 🎯 Demo Scenes

Navigate to `/3d` to see two different 3D scenes:

1. **Basic Scene**: Interactive spinning boxes with hover effects and click interactions
2. **Advanced Scene**: Sphere with environment lighting, shadows, and orbit controls

## 🛠️ Technologies Used

- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Helper components for React Three Fiber
- **@react-three/postprocessing**: Post-processing effects
- **three**: 3D graphics library
- **TypeScript**: Static type checking

## 🏃 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000)** in your browser

4. **Navigate to the 3D demo**: Click on "React Three Fiber" card or visit `/3d`

## 🔧 Key Configuration

### Next.js Configuration
- `transpilePackages: ['three']` for Three.js compatibility
- Custom webpack configuration for WebGL support

### TypeScript Configuration
- `moduleResolution: "bundler"` for better ESM support
- Three.js type definitions included
- Custom JSX intrinsic elements for Three.js components

## 📁 Project Structure

```
├── app/
│   ├── 3d/page.tsx          # 3D demo page
│   ├── page.tsx             # Homepage
│   └── layout.tsx           # Root layout
├── components/
│   ├── Scene.tsx            # Basic 3D scene
│   ├── AdvancedScene.tsx    # Advanced 3D scene
│   └── ClientOnly.tsx       # SSR wrapper
├── types/
│   └── three.d.ts           # Three.js type definitions
├── next.config.js           # Next.js configuration
└── tsconfig.json            # TypeScript configuration
```

## 🎮 Interaction Guide

### Basic Scene
- **Hover**: Change box color from orange to pink
- **Click**: Scale boxes up/down
- **Auto-rotation**: Boxes spin continuously

### Advanced Scene
- **Mouse drag**: Rotate the camera around the scene
- **Scroll**: Zoom in/out
- **Environment lighting**: Realistic sunset environment
- **Shadows**: Contact shadows for depth

## 🚀 Deployment

This app is configured for deployment on Railway.app but can be deployed to any platform that supports Next.js.

## 📚 Resources

- [React Three Fiber Documentation](https://r3f.docs.pmnd.rs/)
- [Three.js Documentation](https://threejs.org/docs/)
- [Drei Helpers](https://github.com/pmndrs/drei)
- [Next.js Documentation](https://nextjs.org/docs)

## ⚠️ Compatibility Notes

- Uses React 19 with React Three Fiber v9.x
- Some peer dependency warnings from older packages are expected
- WebGL support required for 3D rendering
- Client-side rendering used for 3D content to avoid SSR issues
