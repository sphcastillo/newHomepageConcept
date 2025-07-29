/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
      { pattern: /^xs:.*/ },
    ],
    theme: {
      extend: {
        screens: {
          xxs: '414px',
          xxs430: '430px',
          xxs475: '475px',
          xxs500: '500px',
          xxs525: '525px',
          xs: '540px',
          xs600: '600px',
          md825: '825px',
          mdPlus: '875px',
          md925: '925px',
          lgPlus: '1105px',
          sixXLMax: '1152px',
          xl1175: '1175px',
          xlPlus: '1220px',
          xl: '1280px'
        }
      },
    },
    plugins: [],
  };
  