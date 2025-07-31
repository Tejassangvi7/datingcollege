import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, Stars } from "@react-three/drei";

const Disconnected = () => {
  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center text-center">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        {/* 3D background stars */}
        <Stars radius={100} depth={50} count={5000} factor={4} fade speed={2} />

        {/* Floating 3D Text */}
        <Html center>
          <h1 className="text-5xl font-bold text-white">🚫 Disconnected</h1>
          <p className="text-lg text-gray-400 mt-2">
            You seem to be offline or on the wrong route.
          </p>
        </Html>

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
      </Canvas>

      <button
        onClick={() => (window.location.href = "/")}
        className="mt-8 px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-800 text-white text-lg transition"
      >
        Go Home
      </button>
    </div>
  );
};

export default Disconnected;
