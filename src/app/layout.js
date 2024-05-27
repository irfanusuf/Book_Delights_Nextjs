import Navbar from "@/components/serverComponnets/Navbar";
import Copyright from "@/components/serverComponnets/Footer"
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

export const metadata = {
  // this is for seo
  title: "Book Delights",
  description: "This app is a bookstore for selling and buying old books",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
         <Navbar /> 

        <div className="main">{children}</div>

        <Copyright />
      </body>
    </html>
  );
}
