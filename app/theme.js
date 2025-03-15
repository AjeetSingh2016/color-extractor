// theme.js
export const theme = {
    light: {
        background: "bg-gradient-to-br from-gray-50 to-blue-50",
        headline: "text-slate-800",
        paragraph: "text-slate-600",
        primary: "text-indigo-600",
        secondary: "text-emerald-500",
        accent: "text-fuchsia-500",
        button: "bg-indigo-600 hover:bg-indigo-700 text-white",
        // buttonOutline: "border border-indigo-600 text-indigo-600 hover:bg-indigo-50",
        card: "bg-white",
        header: "bg-white/80 backdrop-blur-lg",
        footer: "bg-slate-900"
      },
      dark: {
        background: "bg-gradient-to-br from-slate-900 to-slate-800",
        headline: "text-white",
        paragraph: "text-slate-300",
        primary: "text-indigo-400",
        secondary: "text-emerald-400",
        accent: "text-fuchsia-400",
        button: "bg-indigo-500 hover:bg-indigo-600 text-white",
        // buttonOutline: "border border-indigo-500 text-indigo-400 hover:bg-indigo-900/30",
        card: "bg-slate-800/80",
        header: "bg-slate-900/80 backdrop-blur-lg",
        footer: "bg-slate-950"
      }
  };
  
  // Animation variants
  export const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  export const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  };
  
  export const cardVariants = {
    hover: { 
      y: -5,
      boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
      transition: { type: "spring", stiffness: 300 }
    },
    initial: { 
      y: 0,
      boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
      transition: { type: "spring", stiffness: 300 }
    }
  };