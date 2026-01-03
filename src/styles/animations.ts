export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,YEET@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@300;400;500;600&display=swap');
  
  .font-serif { font-family: 'Fraunces', serif; }
  .font-sans { font-family: 'Inter', sans-serif; }
  
  html { scroll-behavior: smooth; }
  
  .animate-fadeIn { 
    animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
  }
  
  .animate-fadeInUp { 
    animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
  }
  
  .animate-kenburns { 
    animation: kenburns 20s ease-out infinite alternate; 
  }
  
  @keyframes fadeIn { 
    from { opacity: 0; transform: translateY(10px); } 
    to { opacity: 1; transform: translateY(0); } 
  }
  
  @keyframes fadeInUp { 
    from { opacity: 0; transform: translateY(50px); } 
    to { opacity: 1; transform: translateY(0); } 
  }
  
  @keyframes kenburns { 
    0% { transform: scale(1.0); } 
    100% { transform: scale(1.1); } 
  }
`;
