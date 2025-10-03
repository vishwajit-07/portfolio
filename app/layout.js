// // app/layout.js
// import './globals.css'
// import Navbar from '@/components/Navbar' // Assuming this path is correct
// import { AuthProvider } from "@/context/UserContext";
// import { Toaster } from 'react-hot-toast' // Import Toaster

// export const metadata = {
//   title: 'My Portfolio',
//   description: 'Frontend Developer Portfolio'
// }

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         {/* Global Toaster for displaying notifications */}
//         <Toaster position="top-center" />
//         <AuthProvider>
//           <Navbar />
//           <main className="w-full">
//             {children}
//           </main>
//         </AuthProvider>

//       </body>
//     </html>
//   )
// }
import './globals.css';
import Navbar from '@/components/Navbar';
import { AuthProvider } from "@/context/UserContext";
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" />
        <AuthProvider>
          <main className="w-full">
            <Navbar />
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
