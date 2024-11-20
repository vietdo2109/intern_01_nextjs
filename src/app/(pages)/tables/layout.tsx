import AuthorProvider from "@/utils/AuthorProvider";
export default async function TablesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthorProvider>{children}</AuthorProvider>;
}
