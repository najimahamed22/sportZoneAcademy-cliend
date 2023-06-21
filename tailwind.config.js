// module.exports = {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         light: {
//           background: "#ffffff",
//           text: "#000000",
//         },
//         dark: {
//           background: "#1a202c",
//           text: "#ffffff",
//         },
//       },
//     },
//   },
//   plugins: [require("daisyui")],
// };

module.exports = {
  purge: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"], // Enable dark mode support

  plugins: [require("daisyui")],
};
