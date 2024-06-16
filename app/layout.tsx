import "./globals.css";
import TanstackQueryProvider from "./lib/contexts/TanstackQueryProvider";
import { AuthenticationPage } from "./components/AuthenticationPage";
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider";
import { Navbar } from "./components/Navbar";
import { Toaster } from "./components/ui/toaster";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-row">
        <TanstackQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ClerkProvider>
              <SignedOut>
                <AuthenticationPage />
              </SignedOut>

              <SignedIn>
                <Navbar>
                  <div className="p-12">{children}</div>
                </Navbar>
              </SignedIn>
              <Toaster />
            </ClerkProvider>
          </ThemeProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
