const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-md text-gray-800 py-1.5 sm:py-2 shadow-lg z-50 border-t border-gray-200">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex justify-center items-center">
          {/* Copyright */}
          <div>
            <p className="text-xs sm:text-sm text-center">
              &copy; {new Date().getFullYear()}{' '}
              <a 
                href="https://instagram.com/rendiichtiar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors underline"
              >
                Rendiichtiar
              </a>
              . All rights reserved | Roast Yourself | Support by Gemini AI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
