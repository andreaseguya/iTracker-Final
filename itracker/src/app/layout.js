import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./redux-provider";
const inter = Inter({ subsets: ["latin"] });
// import store from "./Redux/store";
export const metadata = {
  title: "iTracker",
  description: "Created by Andrea Seguya",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
        </ReduxProvider>

      </body>
    </html>
  );
}
