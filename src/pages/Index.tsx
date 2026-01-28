import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    // Redirect to the static landing page in public folder
    window.location.href = '/360-landing/index.html';
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-[#d4a853] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#a3a3a3]">Carregando...</p>
      </div>
    </div>
  );
};

export default Index;
