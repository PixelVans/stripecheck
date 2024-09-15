"use client"; // Enable client-side rendering

import localFont from "next/font/local";
import "./globals.css";
import { Provider } from 'react-redux'; // Import Provider
import store from './redux/store'; // Adjust the path to your store


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}> {/* Wrap with Provider */}
   
            {children}
          
        </Provider>
      </body>
    </html>
  );
}
